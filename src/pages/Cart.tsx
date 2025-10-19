import { useCart } from "../stores/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, setQty, remove, total, clear } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ padding: 12 }}>
        <p>Your cart is empty.</p>
        <Link to="/catalogue">Go to catalogue</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 12, maxWidth: 720 }}>
      {items.map((i) => (
        <div key={i.sku} style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #eee", padding: "8px 0" }}>
          <img src={i.image} alt={i.name} width={48} height={48} loading="lazy" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{i.name}</div>
            <div>${i.unitPrice.toFixed(2)}</div>
          </div>
          <input
            type="number"
            min={1}
            value={i.qty}
            onChange={(e) => setQty(i.sku, Math.max(1, Number(e.target.value)))}
            style={{ width: 64 }}
          />
          <div style={{ width: 100, textAlign: "right" }}>
            ${(i.unitPrice * i.qty).toFixed(2)}
          </div>
          <button onClick={() => remove(i.sku)}>Remove</button>
        </div>
      ))}

      <div style={{ textAlign: "right", marginTop: 12 }}>
        <div style={{ fontSize: 18, marginBottom: 8 }}>
          <strong>Total: ${total().toFixed(2)}</strong>
        </div>
        <button onClick={clear} style={{ marginRight: 8 }}>Clear cart</button>
        <Link to="/checkout"><button>Checkout</button></Link>
      </div>
    </div>
  );
}
