from typing import Union

from companies.models import Company, User
from companies.services import get_company, get_company_credentials
from companies.utils import create_user
from fastapi import HTTPException
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from .utils import (
    generate_random_password,
)


async def get_db_companies(
    session: AsyncSession, verified: Union[bool, None] = None, q: str = ""
):
    statement = select(Company).where(
        or_(Company.email.ilike(f"{q}%"), Company.name.ilike(f"%{q}%"))
    )
    if verified is not None:
        statement.where(Company.verified == verified)
    db_companies = await session.execute(statement=statement)
    companies = db_companies.scalars().all()
    return companies


async def get_db_company(session: AsyncSession, company_id: int):
    company = await get_company(session=session, company_id=company_id)
    return company


async def get_login_credentials(email: str, session: AsyncSession):
    # password = generate_random_password()
    statement = select(User).where(User.email == email)
    try:
        db_result = await session.execute(statement=statement)
        user = db_result.one_or_none()
        if user:
            raise HTTPException(400, detail="Comapany already exist")
        password = generate_random_password()
        await create_user(
            email=email, password=password, is_superuser=False, plain_password=password
        )
        return {"email": email, "password": password}
    except HTTPException as msg:
        print(msg.detail)
        raise HTTPException(500)


async def verify_db_company(session: AsyncSession, company_id: int):
    company = await get_company(session=session, company_id=company_id)
    if company is None:
        raise HTTPException(404, detail="Company not found")
    company.verified = True
    session.add(company)
    await session.commit()
    return company


async def delete_db_company(session: AsyncSession, company_id: int):
    company = await get_company(session=session, company_id=company_id)
    company_credentials = await get_company_credentials(
        session=session, email=company.email
    )
    if company is None:
        raise HTTPException(404, detail="Company not found")
    await session.delete(company)
    if company_credentials:
        await session.delete(company_credentials)
    await session.commit()
    return True
