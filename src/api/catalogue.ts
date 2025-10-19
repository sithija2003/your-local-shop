import type { Product } from "../types";

export async function listProducts(): Promise<Product[]> {
  const res = await fetch("/mock/products.json");
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function getProduct(sku: string): Promise<Product | null> {
  const all = await listProducts();
  return all.find(p => p.sku === sku) ?? null;
}
