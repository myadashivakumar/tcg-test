from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Family
from app.schemas import FamilyCreate, FamilyOut

router = APIRouter(prefix="/api/v1/families", tags=["families"])


@router.post("", response_model=FamilyOut, status_code=201)
def create_family(payload: FamilyCreate, db: Session = Depends(get_db)):
    family = Family(
        family_surname=payload.FamilySurname,
        primary_contact_name=payload.PrimaryContactName,
        gender=payload.Gender,
        date_of_birth=payload.DateOfBirth,
        religion=payload.Religion,
        community=payload.Community,
        mobile_number=payload.MobileNumber,
        whatsapp_number=payload.WhatsAppNumber,
        email_address=payload.EmailAddress,
        preferred_communication=payload.PreferredCommunication,
        society_name=payload.SocietyName,
        flat_number=payload.FlatNumber,
        current_location=payload.CurrentLocation,
        city=payload.City,
        state=payload.State,
        pin_code=payload.PINCode,
        native_place=payload.NativePlace,
        residence_type=payload.ResidenceType,
        family_count=payload.FamilyCount,
        children_count=payload.ChildrenCount,
        profession=payload.Profession,
        company_name=payload.CompanyName,
        designation=payload.Designation,
        business_name=payload.BusinessName,
        work_location=payload.WorkLocation,
        work_from_home=payload.WorkFromHome,
        professional_skills=payload.ProfessionalSkills,
        can_volunteer=payload.CanVolunteer,
        blood_group=payload.BloodGroup,
        emergency_contact_no=payload.EmergencyContactNo,
        consent_to_share=payload.ConsentToShare,
    )
    db.add(family)
    db.commit()
    db.refresh(family)
    return family


@router.get("", response_model=list[FamilyOut])
def list_families(db: Session = Depends(get_db)):
    return db.query(Family).order_by(Family.created_at.desc()).all()
