import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div style={{ padding: 12 }}>
      <h2>Page not found</h2>
      <Link to="/catalogue">Back to Catalogue</Link>
    </div>
  );
}
