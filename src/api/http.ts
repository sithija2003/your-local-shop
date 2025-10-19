export async function http(path: string, init: RequestInit = {}) {
  const base = process.env.REACT_APP_API_BASE || "";
  const res = await fetch(`${base}${path}`, {
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    let err: any = { errorCode: "HTTP", message: "Unexpected error" };
    try { err = await res.json(); } catch {}
    throw err;
  }
  return res.json();
}
