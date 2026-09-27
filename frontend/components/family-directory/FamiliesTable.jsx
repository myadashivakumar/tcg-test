"use client";

import { useEffect, useState } from "react";
import { listFamilies } from "@/lib/api";

export default function FamiliesTable() {
  const [families, setFamilies] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | done | error
  const [error, setError] = useState("");

  useEffect(() => {
    listFamilies()
      .then((data) => {
        setFamilies(data);
        setStatus("done");
      })
      .catch((e) => {
        setError(e?.message || "Something went wrong.");
        setStatus("error");
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-indigo-900">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">Registered families</h1>
          <p className="mt-2 max-w-xl text-indigo-100">
            All families submitted through the directory form.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {status === "loading" && <p className="text-slate-600">Loading…</p>}

        {status === "error" && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        {status === "done" && families.length === 0 && (
          <p className="text-slate-600">No families registered yet.</p>
        )}

        {status === "done" && families.length > 0 && (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Surname</th>
                  <th className="px-4 py-3 font-medium">Primary contact</th>
                  <th className="px-4 py-3 font-medium">Mobile</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {families.map((f) => (
                  <tr key={f.id}>
                    <td className="px-4 py-3 text-slate-500">{f.id}</td>
                    <td className="px-4 py-3 text-slate-900">{f.family_surname}</td>
                    <td className="px-4 py-3 text-slate-900">{f.primary_contact_name}</td>
                    <td className="px-4 py-3 text-slate-900">{f.mobile_number}</td>
                    <td className="px-4 py-3 text-slate-900">{f.email_address || <span className="text-slate-400">Not provided</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
