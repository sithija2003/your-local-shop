import { Link, NavLink } from "react-router-dom";
import { useCart } from "../stores/cartStore";

export default function NavBar() {
  const count = useCart((s) => s.count());
  const linkStyle = ({ isActive }: any) => ({
    marginRight: 12,
    textDecoration: isActive ? "underline" : "none",
  });

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #eee", marginBottom: 12 }}>
      <NavLink to="/" style={linkStyle}>Home</NavLink>
      <NavLink to="/catalogue" style={linkStyle}>Catalogue</NavLink>
      <NavLink to="/cart" style={linkStyle}>Cart ({count})</NavLink>
    </nav>
  );
}
