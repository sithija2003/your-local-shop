import { Link } from "react-router-dom";
import type { Product } from "../types";
import { useCart } from "../stores/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <img src={product.image} alt={product.name} width={64} height={64} loading="lazy" />
      <h3 style={{ margin: "8px 0" }}>
        <Link to={`/product/${product.sku}`}>{product.name}</Link>
      </h3>
      <p style={{ margin: 0 }}>${product.price.toFixed(2)}</p>
      {product.perishable && (
        <p style={{ color: "#888", fontSize: 12, marginTop: 4 }}>Perishable</p>
      )}
      <button style={{ marginTop: 8 }} onClick={() => add(product, 1)}>
        Add to cart
      </button>
    </div>
  );
}
