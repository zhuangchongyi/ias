from fastapi import FastAPI, File, UploadFile
from fastapi import Query
from fastapi.responses import StreamingResponse

from face_engine import FaceEngine
from milvus.face_db import FaceDB, FaceModel

app = FastAPI()
face_engine = FaceEngine()
face_db = FaceDB()


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
        data = face_db.insert_face_data(user_id, embedding.tolist())
        if data is not None:
            return success(data=data)
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
        data = face_db.get_match_face_data(embedding)
        return success(data=data)
    except Exception as e:
        return error(msg=str(e), data=None)


@app.post("/delete_face")
def delete_face(body: FaceModel):
    """
    删除人脸
    :param body: 依据用户ID和人脸ID列表的请求体
    :return: 是否删除成功
    """
    try:
        data = face_db.delete_face_data(body)
        return success(data=data)
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
        data = face_engine.detect_face(content)
        return success(data=data)
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
