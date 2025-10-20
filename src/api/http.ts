export async function http(path: string, init: RequestInit = {}) {
  const base = process.env.REACT_APP_API_BASE || "";
  const token = localStorage.getItem("auth_token") || ""; // set by login
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as any),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${base}${path}`, { ...init, headers });
  if (!res.ok) {
    let err: any = { errorCode: "HTTP", message: "Unexpected error" };
    try { err = await res.json(); } catch {}
    throw err;
  }
  return res.json();
}

// Utility for idempotency key on POSTs
export function idemHeaders() {
  const key = (crypto as any)?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
  return { "X-Idempotency-Key": key };
}
