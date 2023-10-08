from functools import lru_cache

from dotenv import load_dotenv
from pydantic import Field
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    db_url: str
    jwt_secret: str
    jwt_expire_time: int
    reset_password_token_secret: str
    verification_token_secret: str
    brevo_api_key: str
    sender_name: str = Field(default="University of Mines and Technology")
    sender_email: str = Field(default="kyei9189@gmail.com")

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()  # type: ignore
