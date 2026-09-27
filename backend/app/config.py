import os

DATABASE_URL = os.environ["DATABASE_URL"]
CORS_ORIGINS = [o.strip() for o in os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",") if o.strip()]
