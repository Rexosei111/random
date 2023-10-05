from typing import Optional
from pydantic import BaseModel, EmailStr
from typing import Optional

from fastapi_users import models
from fastapi_users.schemas import CreateUpdateDictModel
from pydantic import BaseModel
from pydantic import EmailStr


class UserRead(BaseModel):
    id: models.ID  # type: ignore
    email: EmailStr

    class Config:
        from_attributes = True


class UserCreate(CreateUpdateDictModel):
    email: EmailStr
    password: str


class UserUpdate(CreateUpdateDictModel):
    password: Optional[str]
    email: Optional[EmailStr]
