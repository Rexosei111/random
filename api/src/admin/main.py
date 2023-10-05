from typing import Optional, Union

from database import get_async_session
from fastapi import BackgroundTasks, Depends, FastAPI, Query
from sqlalchemy.ext.asyncio import AsyncSession

from .models import User
from .schemas import UserCreate, UserRead, UserUpdate
from .services import (
    delete_db_company,
    get_db_companies,
    get_db_company,
    get_login_credentials,
    verify_db_company,
)
from .utils import auth_backend, fastapi_users, send_transaction_email

admin_app = FastAPI(title="Admin API", version="0.1.0")

auth_router = fastapi_users.get_auth_router(auth_backend)
register_router = fastapi_users.get_register_router(UserRead, UserCreate)
verify_router = fastapi_users.get_verify_router(UserRead)
# reset_password_router = fastapi_users.get_reset_password_router()
users_router = fastapi_users.get_users_router(UserRead, UserUpdate)

users_router.routes = [route for route in users_router.routes if route.path != "/{id}"]

admin_app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
admin_app.include_router(register_router, prefix="/auth", tags=["Authentication"])
admin_app.include_router(verify_router, prefix="", tags=["Authentication"])
# admin_app.include_router(
#     users_router, prefix="/users", tags=["Comap"]
# )
# admin_app.include_router(
#     reset_password_router, prefix="", tags=["Authentication"]
# )
get_current_active_user = fastapi_users.current_user(active=True)


@admin_app.get("/companies", tags=["Companies"])
async def get_companies(
    verified: Optional[Union[bool, None]] = Query(default=None),
    q: Optional[str] = "",
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(get_current_active_user),
):
    companies = await get_db_companies(session=session, verified=verified, q=q)
    return companies


@admin_app.get("/companies/{company_id}", tags=["Companies"])
async def get_company(
    company_id: int,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(get_current_active_user),
):
    return await get_db_company(session=session, company_id=company_id)


@admin_app.patch("/companies/{company_id}", tags=["Companies"])
async def verify_company(
    *,
    company_id: int,
    session: AsyncSession = Depends(get_async_session),
    background_task: BackgroundTasks,
    user: User = Depends(get_current_active_user),
):
    company = await verify_db_company(session=session, company_id=company_id)
    credentials = await get_login_credentials(email=company.email, session=session)
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
    <title>Event Ticket</title>
    <style>
      
    </style>
  </head>
  <body>
    <div>
      <p>Your login credentials</p>
      <p>Email: {credentials.get("email")}</p>
      <p>Password: {credentials.get("password")}</p>
    </div>
  </body>
</html>
"""
    background_task.add_task(
        send_transaction_email,
        subject="Login Credentials",
        content=html_content,
        to=[{"email": credentials.get("email"), "name": credentials.get("email")}],
    )
    return True


@admin_app.delete("/companies/{company_id}", tags=["Companies"])
async def delete_company(
    company_id: int,
    session: AsyncSession = Depends(get_async_session),
    user: User = Depends(get_current_active_user),
):
    return await delete_db_company(session=session, company_id=company_id)
