# TTCG — Backend

FastAPI + raw `psycopg2` API backing the family directory, packaged to run on
AWS Lambda (via [Mangum](https://github.com/jordaneremieff/mangum)) or locally
with uvicorn.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` and set `DATABASE_URL` to your PostgreSQL instance (RDS or local),
e.g. `postgresql://postgres:password@your-endpoint.rds.amazonaws.com:5432/tcg`.
A plain PostgreSQL connection string — no SQLAlchemy dialect prefix.

## Run locally

```bash
uvicorn app.main:app --reload --port 8000 --env-file .env
```

API docs: http://localhost:8000/docs. The `families` table is created
automatically on startup if it doesn't exist (see `app/db.py`).

## Deploy to Lambda

The FastAPI app is wrapped with Mangum in `app/main.py`:

```python
handler = Mangum(app)
```

Package `app/` plus dependencies from `requirements.txt` (psycopg2-binary
needs to be built for Amazon Linux, e.g. via `pip install --platform
manylinux2014_x86_64 --target package --only-binary=:all: -r requirements.txt`)
into a Lambda deployment package or container image, set `app.main.handler`
as the Lambda handler, and set `DATABASE_URL` / `CORS_ORIGINS` as Lambda
environment variables. Put the Lambda in the same VPC as the RDS instance
(or keep RDS publicly accessible) so it can reach the database.

## Endpoints

- `POST /api/v1/families` — register a family (matches `frontend/lib/api.js`)
- `GET /api/v1/families` — list registered families
- `GET /health` — health check

## Notes

- No ORM: SQL lives directly in `app/routers/families.py` and
  `app/db.py` (`INSERT ... RETURNING`, plain `SELECT`), using parameterized
  queries via `psycopg2` (never string-formatted SQL).
- No Pydantic request models: request bodies are parsed as raw JSON and only
  checked for the presence of required fields — no format/range validation.
  If you need stronger request validation later, that trade-off should be
  revisited.
- The database connection is a single reused global connection (see
  `app/db.py`), which works with Lambda's warm-container reuse. It does not
  currently retry on a broken connection (e.g. after an RDS restart) — an
  Application Load Balancer or client retry pattern would need to handle
  that today.
