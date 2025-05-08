import uuid
from typing import Union

from fastapi import FastAPI, File, UploadFile
from fastapi import Query
from fastapi.responses import StreamingResponse
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
    """
    注册人脸
    :param file: 人脸图像
    :param user_id: 用户ID
    :return: 成功识别人脸信息返回人脸id
    """
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
    """
    人脸比对
    :param file:  人脸图像
    :return: 符合人脸匹配的用户信息
    """
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
    """
    删除人脸
    :param body: 依据用户ID和人脸ID列表的请求体
    :return: 是否删除成功
    """
    try:
        # 构建表达式
        id_list_str = ', '.join([f'\"{u}\"' for u in body.id_list])
        expr = f"user_id == '{body.user_id}' && id in [{id_list_str}]"
        # 删除数据
        mutation_result = face_collection.delete(expr)
        return success(data=mutation_result.delete_count > 0)
    except Exception as e:
        return error(msg=str(e), data=False)


@app.post("/detect_face")
async def detect_face(file: UploadFile = File(...)):
    """
    检测人脸
    :param file: 人脸图像
    :return: 人脸坐标
    """
    try:
        content = await file.read()
        coordinate = face_engine.detect_face(content)
        return success(data=coordinate)
    except Exception as e:
        return error(msg=str(e), data=False)


@app.post("/detect_face_image")
async def detect_face_image(file: UploadFile = File(...)):
    """
    检测人脸并返回标记人脸的图像
    :param file: 人脸图像
    :return: 标记人脸的图像
    """
    try:
        content = await file.read()
        result_img = face_engine.detect_face_image(content)
        return StreamingResponse(result_img, media_type="image/jpeg")
    except Exception as e:
        return error(msg=str(e), data=False)
