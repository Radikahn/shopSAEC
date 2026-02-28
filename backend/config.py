from pathlib import Path

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "shop_saec"
    RESEND_API_KEY: str = ""
    RESEND_FROM_EMAIL: str = "SAEC Shop <orders@we-saec.me>"
    FRONTEND_URL: str = "http://localhost:3000"

    model_config = {
        "env_file": str(Path(__file__).resolve().parent.parent / ".env.local"),
        "env_file_encoding": "utf-8",
        "extra": "ignore",
    }


settings = Settings()
