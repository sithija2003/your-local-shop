import { http } from "./http";
export const catalogueApi = {
  list: (q = "", page = 1, size = 20) =>
    http(`/api/products?q=${encodeURIComponent(q)}&page=${page}&size=${size}`),
  get: (sku: string) => http(`/api/products/${sku}`),
};
