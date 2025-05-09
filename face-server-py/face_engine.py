from io import BytesIO

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

    def detect_face(self, content):
        content_buf = np.frombuffer(content, np.uint8)
        img = cv2.imdecode(content_buf, cv2.IMREAD_COLOR)

        faces = self.model.get(img)
        results = []
        for face in faces:
            box = face.bbox.astype(int).tolist()
            results.append({
                'x': box[0],
                'y': box[1],
                'width': box[2] - box[0],
                'height': box[3] - box[1]
            })

        return results

    def detect_face_image(self, content):
        np_img = np.frombuffer(content, np.uint8)
        img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

        detections = self.detect_face(content)
        if len(detections) == 0:
            raise Exception("没有检测到人脸")

        for det in detections:
            x1 = det["x"]
            y1 = det["y"]
            x2 = x1 + det["width"]
            y2 = y1 + det["height"]
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # 编码为 JPEG 并写入 BytesIO
        _, buffer = cv2.imencode('.jpg', img)
        byte_io = BytesIO(buffer.tobytes())
        return byte_io
