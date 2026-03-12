from fastapi import APIRouter

from db import get_stock_collection
from models import StockResponse

router = APIRouter()

INITIAL_STOCK = {
    "XS": 5,
    "S": 10,
    "M": 35,
    "L": 35,
    "XL": 17,
}


async def seed_stock():
    collection = get_stock_collection()
    for size, count in INITIAL_STOCK.items():
        await collection.update_one(
            {"size": size},
            {"$setOnInsert": {"size": size, "count": count}},
            upsert=True,
        )


@router.get("/", response_model=list[StockResponse])
async def get_stock():
    collection = get_stock_collection()
    docs = []
    async for doc in collection.find():
        docs.append(StockResponse(size=doc["size"], count=doc["count"]))
    return docs
