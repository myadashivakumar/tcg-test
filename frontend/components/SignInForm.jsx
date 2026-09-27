"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // No auth backend yet — this is a UI placeholder.
    console.log("Sign in", { email, password });
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-800 text-lg font-semibold text-white">
          T
        </div>
        <h1 className="mt-4 text-2xl font-medium text-slate-900">Sign in</h1>
        <p className="mt-1 text-sm text-slate-600">to continue to TCG Community</p>
      </div>

      <form onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-700 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href="/family-directory"
            className="text-sm font-medium text-indigo-800 hover:text-indigo-950"
          >
            Register family
          </Link>
          <button
            type="submit"
            className="rounded-lg bg-indigo-800 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
