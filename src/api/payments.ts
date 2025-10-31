import { http } from "./http";
export const paymentsApi = {
  // dev-only: backend returns { tokenId }
  tokenize: (cardNumber: string, expiry: string, name: string) =>
    http(`/api/payments/tokenize`, {
      method: "POST",
      body: JSON.stringify({ cardNumber, expiry, name }),
    }),
};
