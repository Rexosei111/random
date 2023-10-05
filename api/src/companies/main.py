from typing import List, Optional

from admin.utils import send_transaction_email
from database import get_async_session
from fastapi import BackgroundTasks, Depends, FastAPI
from sqlalchemy.ext.asyncio import AsyncSession

from .models import User
from .schemas import (
    CompanyCreateSchema,
    CompanyCredentialsRead,
    CompanyReadSchema,
    RecentRead,
    UserCreate,
    UserRead,
    UserUpdate,
)
from .services import (
    add_a_company,
    get_company_recent_certificates,
    verify_company_email,
)
from .utils import auth_backend, fastapi_users

authentication_and_authorization_router = FastAPI(title="Company API", version="0.1.0")

auth_router = fastapi_users.get_auth_router(auth_backend)
register_router = fastapi_users.get_register_router(UserRead, UserCreate)
verify_router = fastapi_users.get_verify_router(UserRead)
# reset_password_router = fastapi_users.get_reset_password_router()
users_router = fastapi_users.get_users_router(UserRead, UserUpdate)

users_router.routes = [route for route in users_router.routes if route.path != "/{id}"]

authentication_and_authorization_router.include_router(
    auth_router, prefix="/auth", tags=["Authentication"]
)
authentication_and_authorization_router.include_router(
    register_router, prefix="/auth", tags=["Authentication"]
)
authentication_and_authorization_router.include_router(
    verify_router, prefix="", tags=["Authentication"]
)
get_current_active_user = fastapi_users.current_user(active=True)


@authentication_and_authorization_router.post(
    "/register", response_model=CompanyReadSchema, tags=["Company"]
)
async def register_company(
    *,
    details: CompanyCreateSchema,
    session: AsyncSession = Depends(get_async_session),
    background_tasks: BackgroundTasks,
):
    company = await add_a_company(session=session, details=details)
    html_content = f"""
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- <link rel="stylesheet" href="./ticket.css" /> -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&family=Roboto+Condensed:wght@300;400;700&family=Secular+One&display=swap"
      rel="stylesheet"
    />
    <title>Email Verification</title>
    <style>
      
    </style>
  </head>
  <body>
    <div>
     <p>Click on verify to <a href="http://localhost:3000/verify?email={company.email}">verify</a> this email address!</p>

    </div>
  </body>
</html>
"""
    background_tasks.add_task(
        send_transaction_email,
        subject="Verification",
        to=[{"email": company.email, "name": company.name}],
        content=html_content,
    )
    return company


@authentication_and_authorization_router.post(
    "/verify-email", response_model=Optional[CompanyCredentialsRead], tags=["Company"]
)
async def verify_email_address(
    email: str, session: AsyncSession = Depends(get_async_session)
):
    return await verify_company_email(session=session, email=email)


@authentication_and_authorization_router.get(
    "/recents", response_model=List[RecentRead], tags=["Company"]
)
async def recent_certificates(
    session: AsyncSession = Depends(get_async_session),
    company: User = Depends(get_current_active_user),
):
    return await get_company_recent_certificates(session=session, company_id=company.id)
