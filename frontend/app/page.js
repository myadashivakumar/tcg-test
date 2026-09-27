import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-slate-900">TCG Community</h1>
      <p className="mt-3 text-slate-600">Connect with Telugu families, events and services around Pune.</p>
      <ul className="mt-8 space-y-3">
        <li>
          <Link href="/family-directory" className="text-indigo-800 underline underline-offset-4 hover:text-indigo-950">
            Join the family directory
          </Link>
        </li>
      </ul>
    </main>
  );
}
