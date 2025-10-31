import { http, idemHeaders } from "./http";

export const ordersApi = {
  create: (payload: any) =>
    http(`/api/orders`, {
      method: "POST",
      headers: idemHeaders(),
      body: JSON.stringify(payload),
    }),
  get: (orderId: string) => http(`/api/orders/${orderId}`),
};
