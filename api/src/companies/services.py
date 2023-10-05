from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import Company, Recent, User
from .schemas import CompanyCreateSchema


async def add_a_company(session: AsyncSession, details: CompanyCreateSchema):
    new_company = Company(**details.model_dump())
    session.add(new_company)
    await session.commit()
    await session.refresh(new_company)
    return new_company


async def get_company_by_email(session: AsyncSession, email: str):
    statement = select(Company).where(Company.email == email)
    db_company = await session.execute(statement=statement)
    company = db_company.scalar_one_or_none()
    return company


async def get_company_credentials(session: AsyncSession, email: str):
    print(email)
    statement = select(User).where(User.email == email)
    db_company = await session.execute(statement)
    credentials = db_company.scalar_one_or_none()
    print(credentials)
    return credentials


async def verify_company_email(session: AsyncSession, email: str):
    company = await get_company_by_email(session=session, email=email)
    if company is None:
        raise HTTPException(404, detail="Company not found!")
    company.email_verified = True
    session.add(company)
    credentials = await get_company_credentials(session=session, email=email)
    await session.commit()
    return credentials


async def get_company(session: AsyncSession, company_id: int):
    statement = select(Company).where(Company.id == company_id)
    db_company = await session.execute(statement=statement)
    company = db_company.scalar_one_or_none()
    return company


async def get_company_recent_certificates(session: AsyncSession, company_id: int):
    statement = select(Recent).where(Recent.company_id == company_id)
    db_recent = await session.execute(statement=statement)
    recent = db_recent.scalars().all()
    return recent


async def insert_new_recent(session: AsyncSession, company_id, certificate_id):
    new_recent = Recent(company_id=company_id, certificate_id=certificate_id)
    session.add(new_recent)
    await session.commit()
    await session.refresh(new_recent)
    return new_recent
