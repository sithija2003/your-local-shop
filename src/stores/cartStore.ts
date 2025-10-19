import { create } from "zustand";
import type { CartItem, Product } from "../types";

type CartState = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (sku: string) => void;
  setQty: (sku: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
};

const CART_KEY = "yls_cart_v1";
function loadCart(): CartItem[] {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}
function saveCart(items: CartItem[]) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {}
}

export const useCart = create<CartState>()((set, get) => ({
  items: loadCart(),
  add: (p: Product, qty: number = 1): void =>
    set((state): Partial<CartState> => {
      const existing = state.items.find((i) => i.sku === p.sku);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.sku === p.sku ? { ...i, qty: i.qty + qty } : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { sku: p.sku, name: p.name, unitPrice: p.price, qty, image: p.image },
        ],
      };
    }),
  remove: (sku: string): void =>
    set((state): Partial<CartState> => ({
      items: state.items.filter((i) => i.sku !== sku),
    })),
  setQty: (sku: string, qty: number): void =>
    set((state): Partial<CartState> => ({
      items: state.items.map((i) => (i.sku === sku ? { ...i, qty } : i)),
    })),
  clear: (): void => set({ items: [] }),
  total: (): number => get().items.reduce((s, i) => s + i.unitPrice * i.qty, 0),
  count: (): number => get().items.reduce((n, i) => n + i.qty, 0),
}));

// persist on change
useCart.subscribe((state) => saveCart(state.items));
