from motor.motor_asyncio import AsyncIOMotorClient

from config import settings

client: AsyncIOMotorClient | None = None


async def connect_db():
    global client
    client = AsyncIOMotorClient(settings.MONGO_URI)


async def close_db():
    global client
    if client:
        client.close()


def get_db():
    return client[settings.MONGO_DB_NAME]


def get_orders_collection():
    return get_db()["orders"]


def get_stock_collection():
    return get_db()["stock"]
