import { useLocation, Link } from "react-router-dom";

export default function Confirmation() {
  const location = useLocation() as any;
  const orderId = location.state?.orderId ?? "ORD-UNKNOWN";
  const total = location.state?.total ?? 0;

  return (
    <div style={{ padding: 12 }}>
      <h2>Order placed ✅</h2>
      <p>Order ID: <strong>{orderId}</strong></p>
      <p>Total: ${total.toFixed(2)}</p>
      <Link to="/">Back to catalogue</Link>
    </div>
  );
}
