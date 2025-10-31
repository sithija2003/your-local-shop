import { http } from "./http";
export const inventoryApi = {
  get: (sku: string) => http(`/api/inventory/${sku}`), // backend must provide
};
