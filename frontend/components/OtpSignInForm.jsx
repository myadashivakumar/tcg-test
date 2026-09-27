"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Phone, ArrowRight } from "lucide-react";

const OTP_LENGTH = 4;

export default function OtpSignInForm() {
  const [step, setStep] = useState("mobile"); // mobile | otp | done
  const [showInput, setShowInput] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  const requestOtp = (e) => {
    e.preventDefault();
    // No SMS backend yet — this is a UI-only placeholder flow.
    setStep("otp");
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    setStep("done");
  };

  const setOtpDigit = (i, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (digit && i < OTP_LENGTH - 1) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    }
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-amber-200 bg-[#FDF8ED] p-8 shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900 text-amber-300">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            <path d="M12 2C8 2 6 5 6 8c0 4 3 7 6 12 3-5 6-8 6-12 0-3-2-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-emerald-900" style={{ fontFamily: "var(--font-playfair)" }}>
          Sign In
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Welcome back! Sign in to continue
          <br />
          to TTCG – Telugu Community Group
        </p>
      </div>

      {step === "mobile" && (
        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={() => setShowInput((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl border border-emerald-900/20 bg-white px-4 py-3 text-left text-sm font-medium text-emerald-900 hover:bg-emerald-50"
          >
            <span className="flex items-center gap-2">
              <Phone size={16} aria-hidden="true" />
              Login with Mobile Number
            </span>
            <ChevronRight size={16} className={`transition-transform ${showInput ? "rotate-90" : ""}`} aria-hidden="true" />
          </button>

          {showInput && (
            <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-emerald-700 focus-within:ring-2 focus-within:ring-emerald-200">
              <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-slate-600">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="98765 43210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-full px-3 py-2.5 text-slate-900 placeholder:text-slate-400 outline-none"
              />
            </div>
          )}

          <form onSubmit={requestOtp}>
            <button
              type="submit"
              disabled={showInput && mobile.length !== 10}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-950 disabled:opacity-50"
            >
              <Phone size={16} aria-hidden="true" />
              Get OTP
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </form>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-slate-200" />
            OR
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <p className="text-center text-sm text-slate-600">
            New here?{" "}
            <Link href="/family-directory" className="font-medium text-emerald-800 underline underline-offset-2 hover:text-emerald-950">
              Create an account
            </Link>
          </p>
          <p className="text-center text-sm text-slate-600">
            <Link href="/families" className="font-medium text-emerald-800 underline underline-offset-2 hover:text-emerald-950">
              Browse registered families
            </Link>
          </p>
        </div>
      )}

      {step === "otp" && (
        <form onSubmit={verifyOtp} className="mt-8 space-y-5">
          <p className="text-center text-sm text-slate-600">
            Enter the OTP sent to +91 {mobile || "98765 43210"}
          </p>
          <div className="flex justify-center gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => setOtpDigit(i, e.target.value)}
                className="h-12 w-12 rounded-lg border border-slate-300 text-center text-lg font-semibold text-slate-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={otp.some((d) => !d)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-950 disabled:opacity-50"
          >
            Verify &amp; Sign In
          </button>
          <button
            type="button"
            onClick={() => setStep("mobile")}
            className="w-full text-center text-sm text-slate-500 hover:text-slate-700"
          >
            Back
          </button>
        </form>
      )}

      {step === "done" && (
        <div className="mt-8 text-center">
          <p className="text-slate-700">Signed in as +91 {mobile || "98765 43210"}.</p>
          <button
            type="button"
            onClick={() => {
              setStep("mobile");
              setShowInput(false);
              setMobile("");
              setOtp(Array(OTP_LENGTH).fill(""));
            }}
            className="mt-4 text-sm font-medium text-emerald-800 hover:text-emerald-950"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
