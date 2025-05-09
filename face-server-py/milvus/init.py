from typing import Optional, Dict

from pymilvus import connections, Collection, CollectionSchema, FieldSchema, utility


class FieldIndex:
    def __init__(self,
                 index_name: str,
                 field_name: str,
                 index_params: Optional[Dict] = None,
                 timeout: Optional[float] = None,
                 **kwargs):
        self.index_name = index_name
        self.field_name = field_name
        self.index_params = index_params
        self.timeout = timeout
        self.kwargs = kwargs


class MilvusEngine:

    def __init__(self):
        connections.connect(alias="default", host="localhost", port="19530")

    def get_collection(self, collection_name: str) -> Collection | None:
        if collection_name in utility.list_collections():
            collection = Collection(collection_name)
            collection.load()
            return collection

        return None

    def init_collection(self, collection_name: str,
                        desc: str,
                        fields: list[FieldSchema],
                        indexs: list[FieldIndex]) -> Collection:
        if collection_name not in utility.list_collections():
            schema = CollectionSchema(fields=fields, description=desc)
            collection = Collection(name=collection_name, schema=schema)
            # 为字段创建索引
            for index in indexs:
                collection.create_index(
                    index_name=index.index_name,
                    field_name=index.field_name,
                    index_params=index.index_params,
                    timeout=index.timeout,
                    kwargs=index.kwargs
                )

        else:
            collection = Collection(collection_name)

        collection.load()
        return collection
