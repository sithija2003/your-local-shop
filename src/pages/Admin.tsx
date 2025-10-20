import { useEffect, useState } from "react";
import { adminApi } from "../api/admin";

export default function Admin() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      setTasks(await adminApi.listPacking());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function pack(id: string) {
    await adminApi.markPacked(id);
    await refresh();
  }

  if (loading) return <p style={{ padding: 12 }}>Loading admin tasks…</p>;

  return (
    <div style={{ padding: 12 }}>
      <h2>Packing Tasks</h2>
      {tasks.length === 0 ? (
        <p>No pending tasks.</p>
      ) : (
        tasks.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              gap: 12,
              borderBottom: "1px solid #eee",
              padding: "8px 0",
            }}
          >
            <div style={{ flex: 1 }}>
              <strong>{t.orderId}</strong> – {t.summary}
            </div>
            <button onClick={() => pack(t.id)}>Mark Packed</button>
          </div>
        ))
      )}
    </div>
  );
}
