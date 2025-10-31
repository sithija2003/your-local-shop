import { http } from "./http";

export const adminApi = {
  listPacking: () => http(`/api/admin/packing-tasks`),
  markPacked: (id: string) =>
    http(`/api/admin/packing-tasks/${id}/packed`, { method: "POST" }),
  listProducts: () => http(`/api/products`),
  createProduct: (p: any) =>
    http(`/api/admin/products`, {
      method: "POST",
      body: JSON.stringify(p),
    }),
};
