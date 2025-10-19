export async function getInventory(sku: string): Promise<{ sku: string; available: number }> {
  const res = await fetch("/mock/inventory.json");
  if (!res.ok) throw new Error("Inventory load failed");
  const all = await res.json();
  const row = all.find((x: any) => x.sku === sku) || { sku, available: 0 };
  return row;
}
