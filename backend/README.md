# TCG Community — Backend

FastAPI + SQLAlchemy API backing the family directory.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

By default `DATABASE_URL` falls back to a local SQLite file (`tcg.db`) so you
can run the API without Postgres. Set `DATABASE_URL` in `.env` to a Postgres
connection string to use Postgres instead.

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## Endpoints

- `POST /api/v1/families` — register a family (matches `frontend/lib/api.js`)
- `GET /api/v1/families` — list registered families
- `GET /health` — health check
