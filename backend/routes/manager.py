from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from config import settings

router = APIRouter()


class LoginRequest(BaseModel):
    password: str


@router.post("/login")
async def manager_login(body: LoginRequest):
    if body.password != settings.MANAGER_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    return {"ok": True}
