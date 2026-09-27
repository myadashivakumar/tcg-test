from fastapi import APIRouter, HTTPException, Request
from psycopg2.extras import Json, RealDictCursor

from app.db import get_connection

router = APIRouter(prefix="/api/v1/families", tags=["families"])

REQUIRED_FIELDS = [
    "FamilySurname", "PrimaryContactName", "Gender", "DateOfBirth",
    "MobileNumber", "PreferredCommunication",
    "SocietyName", "FlatNumber", "CurrentLocation", "City", "State", "PINCode", "ResidenceType",
    "FamilyCount", "ChildrenCount",
    "BloodGroup", "EmergencyContactNo", "ConsentToShare",
]

INSERT_SQL = """
INSERT INTO families (
    family_surname, primary_contact_name, gender, date_of_birth, religion, community,
    mobile_number, whatsapp_number, email_address, preferred_communication,
    society_name, flat_number, current_location, city, state, pin_code, native_place, residence_type,
    family_count, children_count,
    profession, company_name, designation, business_name, work_location, work_from_home,
    professional_skills, can_volunteer,
    blood_group, emergency_contact_no, consent_to_share
) VALUES (
    %s, %s, %s, %s, %s, %s,
    %s, %s, %s, %s,
    %s, %s, %s, %s, %s, %s, %s, %s,
    %s, %s,
    %s, %s, %s, %s, %s, %s,
    %s, %s,
    %s, %s, %s
)
RETURNING id, family_surname, primary_contact_name, preferred_communication, city, status, created_at
"""

LIST_SQL = """
SELECT *
FROM families
ORDER BY created_at DESC
"""


@router.post("", status_code=201)
async def create_family(request: Request):
    payload = await request.json()

    missing = [f for f in REQUIRED_FIELDS if payload.get(f) in (None, "")]
    if missing:
        raise HTTPException(status_code=400, detail=f"Missing required field(s): {', '.join(missing)}")

    params = (
        payload.get("FamilySurname"), payload.get("PrimaryContactName"), payload.get("Gender"), payload.get("DateOfBirth"),
        payload.get("Religion"), payload.get("Community"),
        payload.get("MobileNumber"), payload.get("WhatsAppNumber"), payload.get("EmailAddress"), payload.get("PreferredCommunication"),
        payload.get("SocietyName"), payload.get("FlatNumber"), payload.get("CurrentLocation"), payload.get("City"),
        payload.get("State"), payload.get("PINCode"), payload.get("NativePlace"), payload.get("ResidenceType"),
        payload.get("FamilyCount"), payload.get("ChildrenCount"),
        payload.get("Profession"), payload.get("CompanyName"), payload.get("Designation"), payload.get("BusinessName"),
        payload.get("WorkLocation"), payload.get("WorkFromHome"),
        payload.get("ProfessionalSkills"), payload.get("CanVolunteer"),
        Json(payload.get("BloodGroup")), payload.get("EmergencyContactNo"), payload.get("ConsentToShare"),
    )

    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(INSERT_SQL, params)
            row = cur.fetchone()
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    return row


@router.get("")
def list_families():
    conn = get_connection()
    with conn.cursor(cursor_factory=RealDictCursor) as cur:
        cur.execute(LIST_SQL)
        rows = cur.fetchall()
    return rows
