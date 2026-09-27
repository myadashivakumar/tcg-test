import Link from "next/link";
import SignInForm from "@/components/SignInForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen max-w-5xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">TCG Community</h1>
          <p className="mt-3 max-w-md text-slate-600">
            Connect with Telugu families, events and services around Pune.
          </p>
          <ul className="mt-8 space-y-3">
            <li>
              <Link href="/family-directory" className="text-indigo-800 underline underline-offset-4 hover:text-indigo-950">
                Join the family directory
              </Link>
            </li>
            <li>
              <Link href="/families" className="text-indigo-800 underline underline-offset-4 hover:text-indigo-950">
                Browse registered families
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex justify-center md:justify-end">
          <SignInForm />
        </div>
      </div>
    </main>
  );
}
