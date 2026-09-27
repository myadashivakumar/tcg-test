import uuid
from datetime import date, datetime

from sqlalchemy import JSON, Boolean, Date, DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Family(Base):
    __tablename__ = "families"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))

    family_surname: Mapped[str] = mapped_column(String, nullable=False)
    primary_contact_name: Mapped[str] = mapped_column(String, nullable=False)
    gender: Mapped[str] = mapped_column(String, nullable=False)
    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)
    religion: Mapped[str | None] = mapped_column(String, nullable=True)
    community: Mapped[str | None] = mapped_column(String, nullable=True)

    mobile_number: Mapped[str] = mapped_column(String, nullable=False)
    whatsapp_number: Mapped[str | None] = mapped_column(String, nullable=True)
    email_address: Mapped[str | None] = mapped_column(String, nullable=True)
    preferred_communication: Mapped[str] = mapped_column(String, nullable=False)

    society_name: Mapped[str] = mapped_column(String, nullable=False)
    flat_number: Mapped[str] = mapped_column(String, nullable=False)
    current_location: Mapped[str] = mapped_column(String, nullable=False)
    city: Mapped[str] = mapped_column(String, nullable=False)
    state: Mapped[str] = mapped_column(String, nullable=False)
    pin_code: Mapped[str] = mapped_column(String, nullable=False)
    native_place: Mapped[str | None] = mapped_column(String, nullable=True)
    residence_type: Mapped[str] = mapped_column(String, nullable=False)

    family_count: Mapped[int] = mapped_column(Integer, nullable=False)
    children_count: Mapped[int] = mapped_column(Integer, nullable=False)

    profession: Mapped[str | None] = mapped_column(String, nullable=True)
    company_name: Mapped[str | None] = mapped_column(String, nullable=True)
    designation: Mapped[str | None] = mapped_column(String, nullable=True)
    business_name: Mapped[str | None] = mapped_column(String, nullable=True)
    work_location: Mapped[str | None] = mapped_column(String, nullable=True)
    work_from_home: Mapped[str | None] = mapped_column(String, nullable=True)
    professional_skills: Mapped[str | None] = mapped_column(String, nullable=True)
    can_volunteer: Mapped[str | None] = mapped_column(String, nullable=True)

    blood_group: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    emergency_contact_no: Mapped[str] = mapped_column(String, nullable=False)

    consent_to_share: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    status: Mapped[str] = mapped_column(String, nullable=False, default="pending")

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
