import psycopg2

from app.config import DATABASE_URL

SCHEMA = """
CREATE TABLE IF NOT EXISTS families (
    id BIGSERIAL PRIMARY KEY,
    family_surname TEXT NOT NULL,
    primary_contact_name TEXT NOT NULL,
    gender TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    religion TEXT,
    community TEXT,
    mobile_number TEXT NOT NULL,
    whatsapp_number TEXT,
    email_address TEXT,
    preferred_communication TEXT NOT NULL,
    society_name TEXT NOT NULL,
    flat_number TEXT NOT NULL,
    current_location TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pin_code TEXT NOT NULL,
    native_place TEXT,
    residence_type TEXT NOT NULL,
    family_count INTEGER NOT NULL,
    children_count INTEGER NOT NULL,
    profession TEXT,
    company_name TEXT,
    designation TEXT,
    business_name TEXT,
    work_location TEXT,
    work_from_home TEXT,
    professional_skills TEXT,
    can_volunteer TEXT,
    blood_group JSONB NOT NULL,
    emergency_contact_no TEXT NOT NULL,
    consent_to_share BOOLEAN NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
"""

_conn = None


def get_connection():
    global _conn
    if _conn is None or _conn.closed:
        _conn = psycopg2.connect(DATABASE_URL)
    return _conn


def init_db():
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute(SCHEMA)
    conn.commit()
