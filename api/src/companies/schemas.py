from typing import Optional

from certificates.schemas import CertificateRead
from fastapi_users import models
from fastapi_users.schemas import CreateUpdateDictModel
from pydantic import BaseModel, EmailStr, Field


class UserRead(BaseModel):
    id: models.ID  # type: ignore
    email: EmailStr
    phone_number: Optional[str]

    class Config:
        from_attributes = True


class UserCreate(CreateUpdateDictModel):
    email: EmailStr
    password: str
    plain_password: Optional[str]


class UserUpdate(CreateUpdateDictModel):
    password: Optional[str]
    email: Optional[EmailStr]


class CompanyCreateSchema(BaseModel):
    name: str
    email: EmailStr
    phone_number: Optional[str]
    location: Optional[str]
    digital_address: Optional[str]
    website_url: Optional[str]


class CompanyCredentialsRead(BaseModel):
    email: str
    password: str = Field(alias="plain_password")


class CompanyReadSchema(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone_number: Optional[str]
    location: Optional[str]
    digital_address: Optional[str]
    website_url: Optional[str]

    class Config:
        from_attributes = True


class RecentRead(BaseModel):
    id: int
    certificate: CertificateRead
