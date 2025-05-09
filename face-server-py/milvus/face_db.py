import uuid
from datetime import datetime
from typing import Union, List

from pydantic import BaseModel
from pymilvus import FieldSchema, DataType

from milvus.init import MilvusEngine, FieldIndex


class FaceModel(BaseModel):
    id: str = None
    user_id: Union[str, int] = None
    id_list: List[str] = None


class FaceDB:
    def __init__(self):
        self.milvus_engine = MilvusEngine()
        self.collection()

    def collection(self):
        collection_name = "face_db"
        collection = self.milvus_engine.get_collection(collection_name)
        if collection is not None:
            return collection

        # 定义字段
        fields = [
            FieldSchema(name="id", dtype=DataType.VARCHAR, is_primary=True, max_length=64),
            FieldSchema(name="user_id", dtype=DataType.VARCHAR, max_length=64),
            FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=512),
            FieldSchema(name="create_time", dtype=DataType.VARCHAR, max_length=30)
        ]
        # 定义索引
        indexs = [
            FieldIndex(
                index_name="idx_embedding",
                field_name="embedding",
                index_params={"metric_type": "COSINE", "index_type": "IVF_FLAT", "params": {"nlist": 128}}
            ),
            FieldIndex(index_name="idx_user_id", field_name="user_id")
        ]

        # 初始化集合
        return self.milvus_engine.init_collection(collection_name, "人脸数据库", fields, indexs)

    def get_match_face_data(self, embedding):
        search_params = {"metric_type": "COSINE", "params": {"nprobe": 10}}
        search_result = self.collection().search(
            [embedding.tolist()],
            anns_field="embedding",
            param=search_params,
            limit=3,
            output_fields=["id", "user_id"]
        )

        # 判断是否存在 score > 0.99999 的匹配
        hits = search_result[0]
        match_data = list(
            {"id": hit.id, "user_id": hit.user_id, "score": hit.score}
            for hit in hits if hit.score > 0.999999
        )

        if len(match_data) == 0:
            return None
        return match_data[0]

    def insert_face_data(self, user_id: str, embedding: list[float]):
        uid = str(uuid.uuid1())
        create_time = str(datetime.now())
        insert_result = self.collection().insert([[uid], [user_id], [embedding], [create_time]])
        if insert_result.insert_count > 0:
            return uid
        return None

    def delete_face_data(self, body: FaceModel):
        # 构建表达式
        id_list_str = ', '.join([f'\"{u}\"' for u in body.id_list])
        expr = f"user_id == '{str(body.user_id)}' && id in [{id_list_str}]"
        # 删除数据
        mutation_result = self.collection().delete(expr)
        return mutation_result.delete_count > 0
