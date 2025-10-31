import { NavLink } from "react-router-dom";
import { useCart } from "../stores/cartStore";
import { authApi } from "../api/auth";
import { useState } from "react";

export default function NavBar() {
  const count = useCart((s) => s.count());
  const linkStyle = ({ isActive }: any) => ({
    marginRight: 12,
    textDecoration: isActive ? "underline" : "none",
  });

  const [email, setEmail] = useState("dev@example.com");
  const [pass, setPass] = useState("password");
  const loggedIn = !!localStorage.getItem("auth_token");

  async function quickLogin() {
    try {
      await authApi.login(email, pass);
      alert("Logged in (dev)");
    } catch (e: any) {
      alert(e?.message || "Login failed");
    }
  }

  return (
    <nav
      style={{
        padding: 12,
        borderBottom: "1px solid #eee",
        marginBottom: 12,
        display: "flex",
        gap: 12,
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/catalogue" style={linkStyle}>
          Catalogue
        </NavLink>
        <NavLink to="/cart" style={linkStyle}>
          Cart ({count})
        </NavLink>
        <NavLink to="/admin" style={linkStyle}>
          Admin
        </NavLink>
      </div>
      <div>
        {loggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth_token");
              location.reload();
            }}
          >
            Logout
          </button>
        ) : (
          <span>
            <input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: 160, marginRight: 6 }}
            />
            <input
              placeholder="password"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={{ width: 120, marginRight: 6 }}
            />
            <button onClick={quickLogin}>Dev Login</button>
          </span>
        )}
      </div>
    </nav>
  );
}
