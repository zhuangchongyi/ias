import uuid
from fastapi import FastAPI, File, UploadFile
from face_engine import FaceEngine
from milvus_helper import init_milvus

app = FastAPI()
face_engine = FaceEngine()
collection = init_milvus("face_db")


@app.post("/register_face")
def register_face(file: UploadFile = File(...)):
    embedding = face_engine.extract_embedding(file)
    uid = str(uuid.uuid4())
    collection.insert([[uid], [embedding.tolist()]])
    return {"status": "success", "id": uid}


@app.post("/compare_face")
def compare_face(file: UploadFile = File(...)):
    embedding = face_engine.extract_embedding(file)
    search_params = {"metric_type": "COSINE", "params": {"nprobe": 10}}
    results = collection.search([embedding.tolist()],
                                anns_field="embedding",
                                param=search_params,
                                limit=3,
                                output_fields=["id"])
    matches = [{"id": hit.id, "score": hit.distance} for hit in results[0]]
    return {"matches": matches}
