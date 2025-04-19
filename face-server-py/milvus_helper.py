from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType, utility


def init_milvus(collection_name: str) -> Collection:
    connections.connect(alias="default", host="localhost", port="19530")

    id_field = FieldSchema(name="id", dtype=DataType.VARCHAR, is_primary=True, max_length=64)
    user_id_field = FieldSchema(name="user_id", dtype=DataType.VARCHAR, max_length=64)
    vector_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=512)
    schema = CollectionSchema(fields=[id_field, user_id_field, vector_field], description="Face embeddings")

    if collection_name not in utility.list_collections():
        collection = Collection(name=collection_name, schema=schema)
        # 为 embedding 字段创建索引
        collection.create_index(
            index_name="idx_embedding",
            field_name="embedding",
            index_params={"metric_type": "COSINE", "index_type": "IVF_FLAT", "params": {"nlist": 128}}
        )
        # 为 user_id 字段创建索引
        collection.create_index(index_name="idx_user_id", field_name="user_id")
    else:
        collection = Collection(collection_name)

    collection.load()
    return collection
