# TCG Community – Frontend

Next.js (App Router) + Tailwind CSS web app for the TCG community portal.

## Getting started

```bash
cd frontend
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL to your FastAPI server
npm run dev
```

Open http://localhost:3000 and go to **/family-directory**.

If `NEXT_PUBLIC_API_URL` is empty, the Family Directory form simulates submission
and logs the payload to the browser console.

## Structure

```
frontend/
├── app/
│   ├── layout.js
│   ├── page.js                     # Home
│   └── family-directory/page.js    # Family directory registration
├── components/
│   └── family-directory/
│       ├── FamilyDirectoryForm.jsx   # Multi-step form (UI + validation)
│       └── FamilyDirectoryClient.jsx # Connects the form to the API
└── lib/
    └── api.js                      # API calls to the FastAPI backend
```

## API contract

`POST /api/v1/families` with a JSON body whose keys match the "Family Directory"
columns in the TCG Website spreadsheet (FamilySurname, PrimaryContactName, Gender,
DateOfBirth, MobileNumber, ... , BloodGroup[], EmergencyContactNo, ConsentToShare).
