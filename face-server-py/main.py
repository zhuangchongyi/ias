import uuid
from typing import Union

from fastapi import FastAPI, File, UploadFile
from fastapi import Query
from pydantic import BaseModel

from face_engine import FaceEngine
from milvus_helper import init_milvus

app = FastAPI()
face_engine = FaceEngine()
face_collection = init_milvus("face_db")


class FaceData(BaseModel):
    user_id: Union[str, int]
    id_list: list[str]


def success(msg="操作成功", data=None):
    return {"code": 200, "data": data, "msg": msg}


def error(msg="操作失败", data=None):
    return {"code": 500, "data": data, "msg": msg}


@app.post("/register_face")
def register_face(file: UploadFile = File(...), user_id: str = Query(...)):
    try:
        embedding = face_engine.extract_embedding(file)
        if embedding is None:
            return error(msg="未检测到人脸")
        uid = str(uuid.uuid1())
        mutation_result = face_collection.insert([[uid], [user_id], [embedding.tolist()]])
        if mutation_result.insert_count > 0:
            return success(data=uid)
        return error(msg="人脸注册失败", data=None)
    except Exception as e:
        return error(msg=str(e), data=None)


@app.post("/compare_face")
def compare_face(file: UploadFile = File(...)):
    try:
        embedding = face_engine.extract_embedding(file)
        search_params = {"metric_type": "COSINE", "params": {"nprobe": 10}}
        results = face_collection.search(
            [embedding.tolist()],
            anns_field="embedding",
            param=search_params,
            limit=3,
            output_fields=["id", "user_id"]
        )

        # 判断是否存在 score > 0.999999 的匹配
        data_results = results[0]
        match_data = next(
            {"id": hit.entity.get("id"), "user_id": hit.entity.get("user_id"), "distance": hit.distance}
            for hit in data_results
            if hit.distance > 0.999999
        )
        return success(data=match_data)
    except Exception as e:
        return error(msg=str(e), data=None)


@app.post("/delete_face")
def delete_face(body: FaceData):
    try:
        # 构建表达式
        id_list_str = ', '.join([f'\"{u}\"' for u in body.id_list])
        expr = f"user_id == '{body.user_id}' && id in [{id_list_str}]"
        # 删除数据
        mutation_result = face_collection.delete(expr)
        return success(data=mutation_result.delete_count > 0)
    except Exception as e:
        return error(msg=str(e), data=False)
