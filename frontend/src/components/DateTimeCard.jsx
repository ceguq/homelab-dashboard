import { useState, useEffect } from "react";

const HARI  = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const BULAN = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
const pad   = (n) => String(n).padStart(2, "0");

export default function DateTimeCard() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);

  return (
    <div style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-md)", padding: "14px 16px" }}>
      <div style={{ fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <i className="ti ti-clock" style={{ fontSize: 15 }} aria-hidden="true" /> Waktu Lokal
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 500, color: "var(--accent)", letterSpacing: 1 }}>
        {`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 5 }}>
        {`${HARI[now.getDay()]}, ${now.getDate()} ${BULAN[now.getMonth()]} ${now.getFullYear()}`}
      </div>
    </div>
  );
}