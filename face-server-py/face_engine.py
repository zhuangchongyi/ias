import cv2
import numpy as np
from fastapi import UploadFile
from insightface.app import FaceAnalysis


class FaceEngine:
    def __init__(self):
        self.model = FaceAnalysis(name="buffalo_l", providers=["CPUExecutionProvider"])
        self.model.prepare(ctx_id=0)

    def extract_embedding(self, file: UploadFile) -> np.ndarray:
        img_bytes = np.frombuffer(file.file.read(), np.uint8)
        img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)
        if img is None:
            raise Exception("图像格式无效")

        faces = self.model.get(img)
        if not faces:
            raise Exception("没有检测到人脸")
        return faces[0].embedding
