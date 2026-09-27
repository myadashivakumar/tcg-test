"use client";

import FamilyDirectoryForm from "./FamilyDirectoryForm";
import { API_BASE_URL, createFamily } from "@/lib/api";

export default function FamilyDirectoryClient() {
  // Until NEXT_PUBLIC_API_URL is set, the form simulates submission and logs the payload.
  return <FamilyDirectoryForm onSubmit={API_BASE_URL ? createFamily : undefined} />;
}
