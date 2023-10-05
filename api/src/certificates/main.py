from fastapi import BackgroundTasks, Depends, FastAPI
from companies.services import insert_new_recent

from database import get_async_session
from .services import get_a_certificate, insert_certs_in_db
from companies.main import get_current_active_user
from companies.models import User
from sqlalchemy.ext.asyncio import AsyncSession

certificate_app = FastAPI(title="Certificates API")


@certificate_app.get("/{cert_id}")
async def get_certificate(
    *,
    cert_id: str,
    session: AsyncSession = Depends(get_async_session),
    company: User = Depends(get_current_active_user),
    background_tasks: BackgroundTasks
):
    certificate = await get_a_certificate(cert_id=cert_id, session=session)
    background_tasks.add_task(
        insert_new_recent,
        session=session,
        company_id=company.id,
        certificate_id=certificate.id,
    )
    # await insert_new_recent(
    #     session=session, company_id=company.id, certificate_id=certificate.id
    # )
    return certificate


@certificate_app.get("/certificates/insert")
async def insert_certs(
    # cert_id: str,
    session: AsyncSession = Depends(get_async_session),
    # company: User = Depends(get_current_active_user),
):
    # certificate = await get_a_certificate(cert_id=cert_id, session=session)
    # return certificate
    return await insert_certs_in_db(session=session)
