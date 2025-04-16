import cv2
import numpy as np
from insightface.app import FaceAnalysis
from fastapi import UploadFile, HTTPException


class FaceEngine:
    def __init__(self):
        self.model = FaceAnalysis(name="buffalo_l", providers=["CPUExecutionProvider"])
        self.model.prepare(ctx_id=0)

    def extract_embedding(self, file: UploadFile) -> np.ndarray:
        img_bytes = np.frombuffer(file.file.read(), np.uint8)
        img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)
        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image format")

        faces = self.model.get(img)
        if not faces:
            raise HTTPException(status_code=400, detail="No face detected")
        return faces[0].embedding
