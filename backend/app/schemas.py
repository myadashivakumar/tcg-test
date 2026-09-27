import re
from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, EmailStr, Field, field_validator, model_validator

MOBILE_RE = re.compile(r"^[6-9]\d{9}$")
PIN_RE = re.compile(r"^[1-9]\d{5}$")

BLOOD_GROUPS = {"A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"}


class FamilyCreate(BaseModel):
    FamilySurname: str = Field(min_length=1)
    PrimaryContactName: str = Field(min_length=1)
    Gender: Literal["Male", "Female", "Other", "Prefer not to say"]
    DateOfBirth: date
    Religion: str | None = None
    Community: str | None = None

    MobileNumber: str
    WhatsAppNumber: str | None = None
    EmailAddress: EmailStr | None = None
    PreferredCommunication: Literal["WhatsApp", "Email", "SMS"]

    SocietyName: str = Field(min_length=1)
    FlatNumber: str = Field(min_length=1)
    CurrentLocation: str = Field(min_length=1)
    City: str = Field(min_length=1)
    State: str = Field(min_length=1)
    PINCode: str
    NativePlace: str | None = None
    ResidenceType: Literal["Owner", "Tenant"]

    FamilyCount: int = Field(ge=1, le=30)
    ChildrenCount: int = Field(ge=0)

    Profession: str | None = None
    CompanyName: str | None = None
    Designation: str | None = None
    BusinessName: str | None = None
    WorkLocation: str | None = None
    WorkFromHome: Literal["Y", "N"] | None = None
    ProfessionalSkills: str | None = None
    CanVolunteer: Literal["Y", "N"] | None = None

    BloodGroup: list[str] = Field(min_length=1)
    EmergencyContactNo: str

    ConsentToShare: bool

    @field_validator("MobileNumber", "WhatsAppNumber", "EmergencyContactNo")
    @classmethod
    def validate_mobile(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if not MOBILE_RE.match(v):
            raise ValueError("Enter a valid 10-digit mobile number.")
        return v

    @field_validator("PINCode")
    @classmethod
    def validate_pin(cls, v: str) -> str:
        if not PIN_RE.match(v):
            raise ValueError("Enter a valid 6-digit PIN code.")
        return v

    @field_validator("BloodGroup")
    @classmethod
    def validate_blood_group(cls, v: list[str]) -> list[str]:
        invalid = set(v) - BLOOD_GROUPS
        if invalid:
            raise ValueError(f"Unknown blood group(s): {', '.join(sorted(invalid))}")
        return v

    @model_validator(mode="after")
    def validate_cross_fields(self) -> "FamilyCreate":
        if self.ChildrenCount >= self.FamilyCount:
            raise ValueError("Children must be fewer than total family members.")
        if self.EmergencyContactNo == self.MobileNumber:
            raise ValueError("Emergency contact must be different from your own mobile number.")
        if not self.ConsentToShare:
            raise ValueError("Consent to share is required to register.")
        return self


class FamilyOut(BaseModel):
    id: str
    FamilySurname: str = Field(validation_alias="family_surname")
    PrimaryContactName: str = Field(validation_alias="primary_contact_name")
    PreferredCommunication: str = Field(validation_alias="preferred_communication")
    City: str = Field(validation_alias="city")
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
        populate_by_name = True
