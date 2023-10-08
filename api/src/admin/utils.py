import random
import secrets
import string
import uuid
from typing import Dict, List, Optional

import sib_api_v3_sdk
from config import get_settings
from fastapi_users import FastAPIUsers
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    JWTStrategy,
)
from sib_api_v3_sdk.rest import ApiException

from .models import User, get_user_manager

settings = get_settings()


bearer_transport = BearerTransport(tokenUrl="/admin/auth/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret=settings.jwt_secret, lifetime_seconds=settings.jwt_expire_time
    )


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

configuration = sib_api_v3_sdk.Configuration()
configuration.api_key["api-key"] = settings.brevo_api_key

api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
    sib_api_v3_sdk.ApiClient(configuration)
)
subject = "Login Credentials"
sender = {
    "name": settings.sender_name,
    "email": settings.sender_email,
}
replyTo = {
    "name": settings.sender_name,
    "email": settings.sender_email,
}
# to = [{"email": "kyeisamuel931@gmail.com", "name": "Samuel Kyei"}]
params = {"parameter": "My param value", "subject": "New Subject"}


def send_transaction_email(
    *,
    subject: str = subject,
    sender: Dict[str, str] = sender,
    to: List[Dict[str, str]],
    content: str,
    replyTo: Optional[Dict[str, str]] = replyTo,
):
    send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
        to=to, html_content=content, sender=sender, subject=subject
    )

    try:
        api_instance.send_transac_email(send_smtp_email)
    except ApiException as e:
        print("Exception when calling SMTPApi->send_transac_email: %s\n" % e)


def generate_random_password(length=12):
    # Generate a random password with letters, digits, and special characters
    characters = string.ascii_letters + string.digits + string.punctuation
    password = "".join(secrets.choice(characters) for _ in range(length))
    return password


def generate_random_user_id(length=8):
    # Generate a random string of letters and numbers
    characters = string.ascii_letters + string.digits
    return "".join(random.choice(characters) for _ in range(length))
