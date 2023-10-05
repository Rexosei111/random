import json
import os
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from certificates.models import Certificate


async def get_a_certificate(cert_id: str, session: AsyncSession):
    statement = select(Certificate).where(Certificate.certificate_id == cert_id)
    try:
        db_result = await session.execute(statement=statement)
        certificate = db_result.scalar_one_or_none()
        if certificate is None:
            raise HTTPException(404, detail=f"Certificate not found!")
        return certificate
    except SQLAlchemyError as msg:
        print(msg)
        raise HTTPException(500)


async def insert_certs_in_db(session: AsyncSession):
    root_folder = os.getcwd()
    with open(os.path.join(root_folder, "certificates", "certs.json"), "r") as file:
        certs = json.loads(file.read())

    for cert in certs:
        new_cert = Certificate(**cert)
        session.add(new_cert)
    await session.commit()
    return True
