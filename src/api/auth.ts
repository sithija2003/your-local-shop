import { http } from "./http";

export const authApi = {
  register: (name: string, email: string, password: string) =>
    http(`/api/auth/register`, { method: "POST", body: JSON.stringify({ name, email, password }) }),
  login: (email: string, password: string) =>
    http(`/api/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) })
      .then((r) => {
        localStorage.setItem("auth_token", r.accessToken);
        return r;
      }),
  me: () => http(`/api/customers/me`),
  logout: () => { localStorage.removeItem("auth_token"); },
};
