from datetime import datetime, timezone
from enum import Enum

from pydantic import BaseModel, Field


class Size(str, Enum):
    XS = "XS"
    S = "S"
    M = "M"
    L = "L"
    XL = "XL"


class Affiliation(str, Enum):
    STUDENT = "SJSU Student"
    ALUMNI = "SJSU Alumni"
    FRIEND = "Friend of SAEC"


class CartItemSchema(BaseModel):
    item: str
    size: Size
    quantity: int = Field(ge=1)
    price: int = Field(ge=0)


class OrderCreate(BaseModel):
    email: str = Field(pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    phone: str = Field(min_length=7, max_length=20)
    venmo_username: str = Field(min_length=1, max_length=50)
    affiliation: Affiliation
    cart_item: CartItemSchema


class OrderUpdate(BaseModel):
    email: str | None = None
    phone: str | None = None
    venmo_username: str | None = None
    affiliation: Affiliation | None = None
    status: str | None = None


class OrderResponse(BaseModel):
    id: str
    email: str
    phone: str
    venmo_username: str
    affiliation: Affiliation
    cart_item: CartItemSchema
    total: int
    status: str
    created_at: datetime


class StockResponse(BaseModel):
    size: Size
    count: int
