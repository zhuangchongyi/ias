import uuid

from fastapi import FastAPI, File, UploadFile
from fastapi import Query

from face_engine import FaceEngine
from milvus_helper import init_milvus

app = FastAPI()
face_engine = FaceEngine()
face_collection = init_milvus("face_db")


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
        face_collection.insert([[uid], [user_id], [embedding.tolist()]])
        return success(data=uid)
    except Exception as e:
        return error(msg=str(e), data=None)


@app.post("/compare_face")
def compare_face(file: UploadFile = File(...), user_id: str = Query(...)):
    try:
        embedding = face_engine.extract_embedding(file)
        search_params = {"metric_type": "COSINE", "params": {"nprobe": 10}}
        expr = f"user_id == '{user_id}'"
        results = face_collection.search(
            [embedding.tolist()],
            anns_field="embedding",
            param=search_params,
            limit=3,
            expr=expr,
            output_fields=["id", "user_id"]
        )

        # 判断是否存在 score > 0.999999 的匹配
        data_results = results[0]
        is_match = any(hit.distance > 0.999999 for hit in data_results)
        return success(data=is_match)
    except Exception as e:
        return error(msg=str(e), data=False)
