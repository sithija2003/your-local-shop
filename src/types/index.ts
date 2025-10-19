export type Product = {
  sku: string;
  name: string;
  price: number;
  image: string;
  perishable: boolean;
};

export type CartItem = {
  sku: string;
  name: string;
  unitPrice: number;
  qty: number;
  image?: string;
};
