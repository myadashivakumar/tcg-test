// Base URL of the FastAPI backend, e.g. http://localhost:8000
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function createFamily(payload) {
  const res = await fetch(`${API_BASE_URL}/api/v1/families`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let message = "The registration couldn't be saved. Please try again.";
    try {
      const data = await res.json();
      if (typeof data?.detail === "string") message = data.detail;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}
