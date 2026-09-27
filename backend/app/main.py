from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import Base, engine
from app.routers import families

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TCG Community API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(families.router)


@app.get("/health")
def health():
    return {"status": "ok"}
