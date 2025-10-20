import { useState } from "react";
import { useCart } from "../stores/cartStore";
import { useNavigate } from "react-router-dom";
import { paymentsApi } from "../api/payments";
import { ordersApi } from "../api/orders";

export default function Checkout() {
  const nav = useNavigate();
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total)();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [tokenId, setTokenId] = useState<string>("");
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});

  if (items.length === 0) return <p style={{ padding: 12 }}>Add items first.</p>;

  const errors = {
    name: !name ? "Name is required" : "",
    address: !address ? "Address is required" : "",
    postcode: !/^\d{4}$/.test(postcode) ? "Enter 4-digit postcode" : "",
  };
  const hasErrors = !!(errors.name || errors.address || errors.postcode);

  async function getDevToken() {
    try {
      const t = await paymentsApi.tokenize("4111111111111111", "12/29", name || "Dev User");
      setTokenId(t.tokenId);
      alert(`Got dev token: ${t.tokenId}`);
    } catch (e: any) {
      alert(e?.message || "Tokenization failed");
    }
  }

  async function placeOrder() {
    setTouched({ name: true, address: true, postcode: true });
    if (hasErrors) return;
    try {
      const order = await ordersApi.create({
        paymentMethod: tokenId
          ? { type: "token", tokenId }
          : { type: "token", tokenId: "dev-fake" },
        shippingAddress: { name, line1: address, postcode },
      });
      nav("/confirmation", { state: { orderId: order.orderId, total } });
    } catch (e: any) {
      alert(e?.message || "Order failed");
    }
  }

  function Field({ label, value, onChange, name, type = "text" }: any) {
    const err = (touched[name] && (errors as any)[name]) || "";
    return (
      <div style={{ marginBottom: 8 }}>
        <label>
          {label}
          <br />
          <input
            type={type}
            aria-invalid={!!err}
            aria-describedby={err ? `${name}-err` : undefined}
            value={value}
            onBlur={() => setTouched((t) => ({ ...t, [name]: true }))}
            onChange={(e) => onChange(e.target.value)}
          />
        </label>
        {err && (
          <div id={`${name}-err`} style={{ color: "crimson", fontSize: 12 }}>
            {err}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: 12, maxWidth: 640 }}>
      <h2>Checkout</h2>
      <Field label="Name" name="name" value={name} onChange={setName} />
      <Field label="Address" name="address" value={address} onChange={setAddress} />
      <Field
        label="Postcode (4 digits)"
        name="postcode"
        value={postcode}
        onChange={setPostcode}
      />
      <div style={{ margin: "8px 0" }}>
        <button onClick={getDevToken}>Get Test Token</button>
        {tokenId && (
          <span style={{ marginLeft: 8, fontSize: 12 }}>Token: {tokenId}</span>
        )}
      </div>
      <p>
        <strong>Order total:</strong> ${total.toFixed(2)}
      </p>
      <button disabled={hasErrors} onClick={placeOrder}>
        Place order
      </button>
    </div>
  );
}
