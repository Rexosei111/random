import uvicorn
from admin.main import admin_app
from certificates.main import certificate_app
from companies.main import authentication_and_authorization_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import add_pagination

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_functions():
    # await create_db_tables()
    ...


app.mount("/companies/", authentication_and_authorization_router)
app.mount("/admin/", admin_app)
app.mount("/certificates/", certificate_app)


add_pagination(app)
if __name__ == "__main__":
    uvicorn.run(
        app="main:app", log_level="info", reload=True, host="127.0.0.1", port=8000
    )
