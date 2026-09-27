"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Loader2, Pencil } from "lucide-react";

/*
  Family Directory registration form
  - Field keys match the column names in the TCG Website spreadsheet, so the
    submitted payload maps directly to your FastAPI / Pydantic model.
  - Pass `onSubmit(payload)` from your page to POST to the API.
    Without it, submission is simulated so the form can be previewed.
*/

const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];
const RELIGIONS = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist", "Other", "Prefer not to say"];
const COMM_METHODS = ["WhatsApp", "Email", "SMS"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const PUNE_AREAS = [
  "Aundh", "Balewadi", "Baner", "Hadapsar", "Hinjewadi", "Kharadi", "Kothrud",
  "Magarpatta", "Pimple Saudagar", "Ravet", "Tathawade", "Viman Nagar", "Wagholi", "Wakad",
];
const STATES = [
  "Andhra Pradesh", "Karnataka", "Kerala", "Maharashtra", "Tamil Nadu", "Telangana",
  "Delhi", "Gujarat", "Madhya Pradesh", "Odisha", "Rajasthan", "Uttar Pradesh", "West Bengal", "Other",
];

const INITIAL = {
  FamilySurname: "", PrimaryContactName: "", Gender: "", DateOfBirth: "", Religion: "", Community: "",
  MobileNumber: "", WhatsAppSameAsMobile: true, WhatsAppNumber: "", EmailAddress: "", PreferredCommunication: "WhatsApp",
  SocietyName: "", FlatNumber: "", CurrentLocation: "", City: "Pune", State: "Maharashtra", PINCode: "", NativePlace: "", ResidenceType: "",
  FamilyCount: "", ChildrenCount: "",
  Profession: "", CompanyName: "", Designation: "", BusinessName: "", WorkLocation: "", WorkFromHome: "", ProfessionalSkills: "", CanVolunteer: "",
  BloodGroup: [], EmergencyContactNo: "",
  ConsentToShare: false,
};

const STEPS = [
  { key: "basic", title: "Basic details", fields: ["FamilySurname", "PrimaryContactName", "Gender", "DateOfBirth"] },
  { key: "contact", title: "Contact", fields: ["MobileNumber", "WhatsAppNumber", "EmailAddress"] },
  { key: "address", title: "Address", fields: ["SocietyName", "FlatNumber", "CurrentLocation", "City", "State", "PINCode", "ResidenceType"] },
  { key: "family", title: "Family", fields: ["FamilyCount", "ChildrenCount"] },
  { key: "work", title: "Work", fields: [] },
  { key: "emergency", title: "Emergency", fields: ["BloodGroup", "EmergencyContactNo"] },
  { key: "review", title: "Review", fields: ["ConsentToShare"] },
];

const MOBILE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PIN_RE = /^[1-9]\d{5}$/;

function validateField(name, f) {
  const v = f[name];
  switch (name) {
    case "FamilySurname": return v.trim() ? "" : "Enter your family name.";
    case "PrimaryContactName": return v.trim() ? "" : "Enter the primary contact's name.";
    case "Gender": return v ? "" : "Select a gender.";
    case "DateOfBirth": {
      if (!v) return "Enter a date of birth.";
      const dob = new Date(v);
      const today = new Date();
      if (dob > today) return "Date of birth can't be in the future.";
      const age = today.getFullYear() - dob.getFullYear() - (today < new Date(today.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
      return age < 18 ? "The primary contact must be 18 or older." : "";
    }
    case "MobileNumber":
      if (!v) return "Enter a mobile number.";
      return MOBILE_RE.test(v) ? "" : "Enter a valid 10-digit mobile number.";
    case "WhatsAppNumber":
      if (f.WhatsAppSameAsMobile || !v) return "";
      return MOBILE_RE.test(v) ? "" : "Enter a valid 10-digit WhatsApp number.";
    case "EmailAddress":
      if (!v) return f.PreferredCommunication === "Email" ? "Enter an email, since you prefer email updates." : "";
      return EMAIL_RE.test(v) ? "" : "Enter a valid email address.";
    case "SocietyName": return v.trim() ? "" : "Enter your society name.";
    case "FlatNumber": return v.trim() ? "" : "Enter your wing and flat number.";
    case "CurrentLocation": return v.trim() ? "" : "Enter your area in Pune.";
    case "City": return v.trim() ? "" : "Enter your city.";
    case "State": return v ? "" : "Select a state.";
    case "PINCode":
      if (!v) return "Enter a PIN code.";
      return PIN_RE.test(v) ? "" : "Enter a valid 6-digit PIN code.";
    case "ResidenceType": return v ? "" : "Select owner or tenant.";
    case "FamilyCount": {
      const n = Number(v);
      if (!v) return "Enter the number of family members.";
      return Number.isInteger(n) && n >= 1 && n <= 30 ? "" : "Enter a number between 1 and 30.";
    }
    case "ChildrenCount": {
      if (v === "") return "Enter the number of children (0 if none).";
      const n = Number(v);
      if (!Number.isInteger(n) || n < 0) return "Enter 0 or a positive whole number.";
      return f.FamilyCount && n >= Number(f.FamilyCount) ? "Children must be fewer than total family members." : "";
    }
    case "BloodGroup": return v.length ? "" : "Select at least one blood group.";
    case "EmergencyContactNo":
      if (!v) return "Enter an emergency contact number.";
      if (!MOBILE_RE.test(v)) return "Enter a valid 10-digit number.";
      return v === f.MobileNumber ? "Use a different number from your own mobile." : "";
    case "ConsentToShare": return v ? "" : "Confirm consent to list your family in the directory.";
    default: return "";
  }
}

function toPayload(f) {
  return {
    FamilySurname: f.FamilySurname.trim(),
    PrimaryContactName: f.PrimaryContactName.trim(),
    Gender: f.Gender,
    DateOfBirth: f.DateOfBirth,
    Religion: f.Religion || null,
    Community: f.Community.trim() || null,
    MobileNumber: f.MobileNumber,
    WhatsAppNumber: f.WhatsAppSameAsMobile ? f.MobileNumber : f.WhatsAppNumber || null,
    EmailAddress: f.EmailAddress.trim() || null,
    PreferredCommunication: f.PreferredCommunication,
    SocietyName: f.SocietyName.trim(),
    FlatNumber: f.FlatNumber.trim(),
    CurrentLocation: f.CurrentLocation.trim(),
    City: f.City.trim(),
    State: f.State,
    PINCode: f.PINCode,
    NativePlace: f.NativePlace.trim() || null,
    ResidenceType: f.ResidenceType,
    FamilyCount: Number(f.FamilyCount),
    ChildrenCount: Number(f.ChildrenCount),
    Profession: f.Profession.trim() || null,
    CompanyName: f.CompanyName.trim() || null,
    Designation: f.Designation.trim() || null,
    BusinessName: f.BusinessName.trim() || null,
    WorkLocation: f.WorkLocation.trim() || null,
    WorkFromHome: f.WorkFromHome || null,
    ProfessionalSkills: f.ProfessionalSkills.trim() || null,
    CanVolunteer: f.CanVolunteer || null,
    BloodGroup: f.BloodGroup,
    EmergencyContactNo: f.EmergencyContactNo,
    ConsentToShare: f.ConsentToShare,
  };
}

/* ---------- Small UI building blocks ---------- */

const inputBase =
  "w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200";

function Field({ label, name, required, hint, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-slate-800">
        {label}
        {required ? <span className="text-red-600"> *</span> : <span className="font-normal text-slate-500"> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-sm text-red-700">{error}</p>
      ) : hint ? (
        <p className="text-sm text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}

function TextInput({ name, value, onChange, error, ...rest }) {
  return (
    <input
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      className={`${inputBase} ${error ? "border-red-500" : "border-slate-300"}`}
      {...rest}
    />
  );
}

function PhoneInput({ name, value, onChange, error }) {
  return (
    <div className={`flex overflow-hidden rounded-lg border bg-white focus-within:border-indigo-700 focus-within:ring-2 focus-within:ring-indigo-200 ${error ? "border-red-500" : "border-slate-300"}`}>
      <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-slate-600">+91</span>
      <input
        id={name}
        name={name}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        maxLength={10}
        placeholder="98765 43210"
        value={value}
        onChange={(e) => onChange(name, e.target.value.replace(/\D/g, "").slice(0, 10))}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none"
      />
    </div>
  );
}

function Select({ name, value, onChange, options, placeholder = "Select", error }) {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
      className={`${inputBase} ${error ? "border-red-500" : "border-slate-300"} ${value ? "" : "text-slate-400"}`}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o} value={o} className="text-slate-900">{o}</option>)}
    </select>
  );
}

function Segmented({ name, value, onChange, options, error }) {
  return (
    <div role="radiogroup" aria-labelledby={name} className={`inline-flex flex-wrap gap-2 ${error ? "rounded-lg ring-1 ring-red-500 p-1" : ""}`}>
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const lbl = typeof o === "string" ? o : o.label;
        const active = value === val;
        return (
          <button
            key={val}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(name, active ? "" : val)}
            className={`rounded-full border px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
              active ? "border-indigo-800 bg-indigo-800 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
            }`}
          >
            {lbl}
          </button>
        );
      })}
    </div>
  );
}

const YES_NO = [{ value: "Y", label: "Yes" }, { value: "N", label: "No" }];

/* ---------- Main form ---------- */

export default function FamilyDirectoryForm({ onSubmit }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error
  const [submitError, setSubmitError] = useState("");

  const set = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const stepHasErrors = (i) => STEPS[i].fields.some((n) => errors[n]);

  const goTo = (i) => {
    setStep(i);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Steps can be visited in any order; nothing blocks moving forward.
  const next = () => goTo(Math.min(step + 1, STEPS.length - 1));
  const back = () => goTo(Math.max(step - 1, 0));

  const submit = async () => {
    const all = {};
    STEPS.forEach((s) => s.fields.forEach((n) => {
      const msg = validateField(n, form);
      if (msg) all[n] = msg;
    }));
    setErrors(all);
    const firstBad = STEPS.findIndex((s) => s.fields.some((n) => all[n]));
    if (firstBad !== -1) {
      if (firstBad !== step) goTo(firstBad);
      const firstField = STEPS[firstBad].fields.find((n) => all[n]);
      setTimeout(() => document.getElementById(firstField)?.focus(), 50);
      return;
    }
    setStatus("submitting");
    setSubmitError("");
    try {
      const payload = toPayload(form);
      if (onSubmit) await onSubmit(payload);
      else {
        console.log("FamilyDirectory payload", payload);
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setSubmitError(e?.message || "The registration couldn't be saved. Check your connection and try again.");
    }
  };

  if (status === "done") {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <Check size={28} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">Family registered</h1>
          <p className="mt-3 text-slate-600">
            The {form.FamilySurname} family is now pending verification. You&apos;ll get a confirmation on {form.PreferredCommunication} once an admin approves the listing.
          </p>
          <button
            type="button"
            onClick={() => { setForm(INITIAL); setErrors({}); setStep(0); setStatus("idle"); }}
            className="mt-8 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            Register another family
          </button>
        </div>
      </div>
    );
  }

  const e = errors;
  const current = STEPS[step];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-indigo-900">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">Join the family directory</h1>
          <p className="mt-2 max-w-xl text-indigo-100">
            Help neighbours find and reach each other. Only verified community members can see your details.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-4">
        {/* Progress */}
        <nav aria-label="Form progress" className="md:col-span-1">
          <ol className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 md:mx-0 md:block md:space-y-1 md:overflow-visible md:px-0 md:sticky md:top-6">
            {STEPS.map((s, i) => {
              const active = i === step;
              const hasErr = stepHasErrors(i);
              return (
                <li key={s.key} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={active ? "step" : undefined}
                    className={`flex w-full items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                      active ? "bg-white font-medium text-indigo-900 shadow-xs" : "text-slate-700 hover:bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                        hasErr ? "bg-red-600 text-white" : active ? "bg-indigo-800 text-white" : "border border-slate-300 text-slate-500"
                      }`}
                    >
                      {hasErr ? "!" : i + 1}
                    </span>
                    {s.title}
                    {hasErr && <span className="sr-only"> (needs attention)</span>}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Step content */}
        <main className="md:col-span-3">
          <form
            noValidate
            onSubmit={(ev) => { ev.preventDefault(); step === STEPS.length - 1 ? submit() : next(); }}
            className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
          >
            <h2 className="mb-6 text-xl font-semibold text-slate-900">{current.title}</h2>

            {current.key === "basic" && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Family name / surname" name="FamilySurname" required error={e.FamilySurname}>
                  <TextInput name="FamilySurname" value={form.FamilySurname} onChange={set} error={e.FamilySurname} autoComplete="family-name" placeholder="e.g. Reddy" />
                </Field>
                <Field label="Primary contact name" name="PrimaryContactName" required error={e.PrimaryContactName}>
                  <TextInput name="PrimaryContactName" value={form.PrimaryContactName} onChange={set} error={e.PrimaryContactName} autoComplete="name" placeholder="Full name" />
                </Field>
                <Field label="Gender" name="Gender" required error={e.Gender}>
                  <Select name="Gender" value={form.Gender} onChange={set} options={GENDERS} error={e.Gender} />
                </Field>
                <Field label="Date of birth" name="DateOfBirth" required error={e.DateOfBirth}>
                  <TextInput name="DateOfBirth" type="date" value={form.DateOfBirth} onChange={set} error={e.DateOfBirth} max={new Date().toISOString().split("T")[0]} />
                </Field>
                <Field label="Religion" name="Religion">
                  <Select name="Religion" value={form.Religion} onChange={set} options={RELIGIONS} />
                </Field>
                <Field label="Community / caste" name="Community">
                  <TextInput name="Community" value={form.Community} onChange={set} />
                </Field>
              </div>
            )}

            {current.key === "contact" && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Mobile number" name="MobileNumber" required error={e.MobileNumber}>
                  <PhoneInput name="MobileNumber" value={form.MobileNumber} onChange={set} error={e.MobileNumber} />
                </Field>
                <Field label="WhatsApp number" name="WhatsAppNumber" error={e.WhatsAppNumber}>
                  {form.WhatsAppSameAsMobile ? (
                    <div className={`${inputBase} border-slate-200 bg-slate-100 text-slate-500`}>Same as mobile</div>
                  ) : (
                    <PhoneInput name="WhatsAppNumber" value={form.WhatsAppNumber} onChange={set} error={e.WhatsAppNumber} />
                  )}
                  <label className="mt-1 inline-flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={form.WhatsAppSameAsMobile}
                      onChange={(ev) => set("WhatsAppSameAsMobile", ev.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 accent-indigo-800 focus:ring-indigo-300"
                    />
                    Same as mobile number
                  </label>
                </Field>
                <Field label="Email address" name="EmailAddress" required={form.PreferredCommunication === "Email"} error={e.EmailAddress}>
                  <TextInput name="EmailAddress" type="email" value={form.EmailAddress} onChange={set} error={e.EmailAddress} autoComplete="email" placeholder="name@example.com" />
                </Field>
                <Field label="Preferred way to reach you" name="PreferredCommunication" required>
                  <Segmented name="PreferredCommunication" value={form.PreferredCommunication} onChange={(n, v) => set(n, v || form.PreferredCommunication)} options={COMM_METHODS} />
                </Field>
              </div>
            )}

            {current.key === "address" && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Society name" name="SocietyName" required error={e.SocietyName}>
                  <TextInput name="SocietyName" value={form.SocietyName} onChange={set} error={e.SocietyName} />
                </Field>
                <Field label="Wing / tower and flat number" name="FlatNumber" required error={e.FlatNumber}>
                  <TextInput name="FlatNumber" value={form.FlatNumber} onChange={set} error={e.FlatNumber} placeholder="e.g. B-1204" />
                </Field>
                <Field label="Area in Pune" name="CurrentLocation" required error={e.CurrentLocation} hint="Pick from the list or type your area.">
                  <TextInput name="CurrentLocation" list="pune-areas" value={form.CurrentLocation} onChange={set} error={e.CurrentLocation} />
                  <datalist id="pune-areas">{PUNE_AREAS.map((a) => <option key={a} value={a} />)}</datalist>
                </Field>
                <Field label="City" name="City" required error={e.City}>
                  <TextInput name="City" value={form.City} onChange={set} error={e.City} autoComplete="address-level2" />
                </Field>
                <Field label="State" name="State" required error={e.State}>
                  <Select name="State" value={form.State} onChange={set} options={STATES} error={e.State} />
                </Field>
                <Field label="PIN code" name="PINCode" required error={e.PINCode}>
                  <TextInput
                    name="PINCode" inputMode="numeric" maxLength={6} autoComplete="postal-code" placeholder="411057"
                    value={form.PINCode} onChange={(n, v) => set(n, v.replace(/\D/g, "").slice(0, 6))} error={e.PINCode}
                  />
                </Field>
                <Field label="Native place" name="NativePlace" hint="Your hometown, e.g. Guntur or Warangal.">
                  <TextInput name="NativePlace" value={form.NativePlace} onChange={set} />
                </Field>
                <Field label="Owner or tenant" name="ResidenceType" required error={e.ResidenceType}>
                  <Segmented name="ResidenceType" value={form.ResidenceType} onChange={set} options={["Owner", "Tenant"]} error={e.ResidenceType} />
                </Field>
              </div>
            )}

            {current.key === "family" && (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Total family members" name="FamilyCount" required error={e.FamilyCount} hint="Include yourself.">
                  <TextInput name="FamilyCount" type="number" min={1} max={30} inputMode="numeric" value={form.FamilyCount} onChange={set} error={e.FamilyCount} />
                </Field>
                <Field label="Number of children" name="ChildrenCount" required error={e.ChildrenCount} hint="Under 18. Enter 0 if none.">
                  <TextInput name="ChildrenCount" type="number" min={0} inputMode="numeric" value={form.ChildrenCount} onChange={set} error={e.ChildrenCount} />
                </Field>
              </div>
            )}

            {current.key === "work" && (
              <div className="grid gap-5 sm:grid-cols-2">
                <p className="text-sm text-slate-600 sm:col-span-2">
                  All fields here are optional. Sharing them helps members find professional help and job referrals within the community.
                </p>
                <Field label="Profession / occupation" name="Profession">
                  <TextInput name="Profession" value={form.Profession} onChange={set} placeholder="e.g. Software engineer" />
                </Field>
                <Field label="Company name" name="CompanyName">
                  <TextInput name="CompanyName" value={form.CompanyName} onChange={set} autoComplete="organization" />
                </Field>
                <Field label="Designation" name="Designation">
                  <TextInput name="Designation" value={form.Designation} onChange={set} />
                </Field>
                <Field label="Business name" name="BusinessName" hint="If self-employed.">
                  <TextInput name="BusinessName" value={form.BusinessName} onChange={set} />
                </Field>
                <Field label="Work location" name="WorkLocation">
                  <TextInput name="WorkLocation" value={form.WorkLocation} onChange={set} placeholder="e.g. Hinjewadi Phase 2" />
                </Field>
                <Field label="Work from home" name="WorkFromHome">
                  <Segmented name="WorkFromHome" value={form.WorkFromHome} onChange={set} options={YES_NO} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Professional skills / expertise" name="ProfessionalSkills" hint="Separate skills with commas, e.g. SQL Server, tax filing, carpentry.">
                    <textarea
                      id="ProfessionalSkills" rows={3} value={form.ProfessionalSkills}
                      onChange={(ev) => set("ProfessionalSkills", ev.target.value)}
                      className={`${inputBase} border-slate-300`}
                    />
                  </Field>
                </div>
                <Field label="Can volunteer for community activities" name="CanVolunteer">
                  <Segmented name="CanVolunteer" value={form.CanVolunteer} onChange={set} options={YES_NO} />
                </Field>
              </div>
            )}

            {current.key === "emergency" && (
              <div className="grid gap-5">
                <Field label="Blood groups in the family" name="BloodGroup" required error={e.BloodGroup} hint="Select every blood group present. This helps during urgent blood requests.">
                  <div id="BloodGroup" tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
                    {BLOOD_GROUPS.map((g) => {
                      const on = form.BloodGroup.includes(g);
                      return (
                        <button
                          key={g}
                          type="button"
                          aria-pressed={on}
                          onClick={() => set("BloodGroup", on ? form.BloodGroup.filter((x) => x !== g) : [...form.BloodGroup, g])}
                          className={`w-16 rounded-lg border py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                            on ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <div className="sm:max-w-sm">
                  <Field label="Emergency contact number" name="EmergencyContactNo" required error={e.EmergencyContactNo} hint="Someone other than you.">
                    <PhoneInput name="EmergencyContactNo" value={form.EmergencyContactNo} onChange={set} error={e.EmergencyContactNo} />
                  </Field>
                </div>
              </div>
            )}

            {current.key === "review" && (
              <ReviewStep form={form} onEdit={goTo} consentError={e.ConsentToShare} setConsent={(v) => set("ConsentToShare", v)} />
            )}

            {status === "error" && (
              <p role="alert" className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{submitError}</p>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={back}
                disabled={step === 0}
                className="inline-flex items-center gap-1 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:invisible focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                <ChevronLeft size={16} aria-hidden="true" /> Back
              </button>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-900 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
              >
                {step === STEPS.length - 1 ? (
                  status === "submitting" ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Registering…</> : "Register family"
                ) : (
                  <>Continue <ChevronRight size={16} aria-hidden="true" /></>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

function ReviewStep({ form, onEdit, consentError, setConsent }) {
  const yn = (v) => (v === "Y" ? "Yes" : v === "N" ? "No" : "");
  const sections = [
    { step: 0, title: "Basic details", rows: [
      ["Family name", form.FamilySurname], ["Primary contact", form.PrimaryContactName], ["Gender", form.Gender],
      ["Date of birth", form.DateOfBirth], ["Religion", form.Religion], ["Community", form.Community],
    ]},
    { step: 1, title: "Contact", rows: [
      ["Mobile", form.MobileNumber && `+91 ${form.MobileNumber}`],
      ["WhatsApp", form.WhatsAppSameAsMobile ? "Same as mobile" : form.WhatsAppNumber && `+91 ${form.WhatsAppNumber}`],
      ["Email", form.EmailAddress], ["Preferred", form.PreferredCommunication],
    ]},
    { step: 2, title: "Address", rows: [
      ["Flat", [form.FlatNumber, form.SocietyName].filter(Boolean).join(", ")], ["Area", form.CurrentLocation],
      ["City", [form.City, form.State, form.PINCode].filter(Boolean).join(", ")], ["Native place", form.NativePlace], ["Residence", form.ResidenceType],
    ]},
    { step: 3, title: "Family", rows: [["Members", form.FamilyCount], ["Children", form.ChildrenCount]] },
    { step: 4, title: "Work", rows: [
      ["Profession", form.Profession], ["Company", form.CompanyName], ["Designation", form.Designation], ["Business", form.BusinessName],
      ["Work location", form.WorkLocation], ["Work from home", yn(form.WorkFromHome)], ["Skills", form.ProfessionalSkills], ["Can volunteer", yn(form.CanVolunteer)],
    ]},
    { step: 5, title: "Emergency", rows: [
      ["Blood groups", form.BloodGroup.join(", ")], ["Emergency contact", form.EmergencyContactNo && `+91 ${form.EmergencyContactNo}`],
    ]},
  ];

  return (
    <div className="space-y-6">
      <p className="text-slate-600">Check your details before registering. You can edit any section.</p>
      {sections.map((s) => (
        <section key={s.title} className="rounded-xl border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h3 className="font-medium text-slate-900">{s.title}</h3>
            <button
              type="button"
              onClick={() => onEdit(s.step)}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-indigo-800 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <Pencil size={14} aria-hidden="true" /> Edit <span className="sr-only">{s.title}</span>
            </button>
          </div>
          <dl className="grid gap-x-6 gap-y-2 px-4 py-3 text-sm sm:grid-cols-2">
            {s.rows.map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="w-32 shrink-0 text-slate-500">{k}</dt>
                <dd className="text-slate-900">{v || <span className="text-slate-400">Not provided</span>}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <div>
        <label className={`flex items-start gap-3 rounded-xl border p-4 ${consentError ? "border-red-500 bg-red-50" : "border-slate-200 bg-amber-50"}`}>
          <input
            id="ConsentToShare"
            type="checkbox"
            checked={form.ConsentToShare}
            onChange={(ev) => setConsent(ev.target.checked)}
            aria-describedby={consentError ? "ConsentToShare-error" : undefined}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-indigo-800 focus:ring-indigo-300"
          />
          <span className="text-sm text-slate-800">
            I agree to list my family in the community directory. My contact details will be visible only to verified members, and I can ask an admin to remove them at any time.
          </span>
        </label>
        {consentError && <p id="ConsentToShare-error" className="mt-1.5 text-sm text-red-700">{consentError}</p>}
      </div>
    </div>
  );
}
