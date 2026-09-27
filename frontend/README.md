# TTCG — Frontend

Next.js (App Router) + Tailwind CSS web app for the TTCG (Telugu Community
Group) portal.

## Getting started

```bash
cd frontend
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL to your FastAPI server
npm run dev
```

Open http://localhost:3000 for the landing page (sign-in), or go straight to
**/family-directory** to register, or **/families** to browse registered
families.

If `NEXT_PUBLIC_API_URL` is empty, the Family Directory form simulates submission
and logs the payload to the browser console. The sign-in form on the landing
page is also UI-only for now — no SMS/OTP backend is wired up yet.

## Structure

```
frontend/
├── app/
│   ├── layout.js
│   ├── page.js                     # Landing page (hero + sign-in)
│   ├── family-directory/page.js    # Family directory registration
│   └── families/page.js            # Registered families table
├── components/
│   ├── branding/Logo.jsx           # TTCG logo lockup
│   ├── TeluguHeroBackground.jsx    # Illustrated hero background
│   ├── OtpSignInForm.jsx           # Mobile + OTP sign-in (UI only)
│   └── family-directory/
│       ├── FamilyDirectoryForm.jsx   # Multi-step form (UI + validation)
│       ├── FamilyDirectoryClient.jsx # Connects the form to the API
│       └── FamiliesTable.jsx         # Registered-families table
└── lib/
    └── api.js                      # API calls to the FastAPI backend
```

## API contract

`POST /api/v1/families` with a JSON body whose keys match the "Family Directory"
columns in the TCG Website spreadsheet (FamilySurname, PrimaryContactName, Gender,
DateOfBirth, MobileNumber, ... , BloodGroup[], EmergencyContactNo, ConsentToShare).

`GET /api/v1/families` returns every registered family record.
