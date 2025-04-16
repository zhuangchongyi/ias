from pymilvus import connections, Collection, CollectionSchema, FieldSchema, DataType, utility


def init_milvus(collection_name: str) -> Collection:
    connections.connect(alias="default", host="localhost", port="19530")

    id_field = FieldSchema(name="id", dtype=DataType.VARCHAR, is_primary=True, max_length=64)
    vector_field = FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=512)
    schema = CollectionSchema(fields=[id_field, vector_field], description="Face embeddings")

    if collection_name not in utility.list_collections():
        collection = Collection(name=collection_name, schema=schema)
        collection.create_index(
            field_name="embedding",
            index_params={"metric_type": "COSINE", "index_type": "IVF_FLAT", "params": {"nlist": 128}}
        )
    else:
        collection = Collection(collection_name)

    collection.load()
    return collection
