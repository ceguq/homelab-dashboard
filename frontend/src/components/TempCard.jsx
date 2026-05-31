function tempColor(t) {
  if (!t) return "var(--text-3)";
  if (t >= 80) return "var(--red)";
  if (t >= 65) return "var(--orange)";
  if (t >= 50) return "var(--accent)";
  return "var(--green)";
}

export default function TempCard({ temp }) {
  const color = tempColor(temp);
  return (
    <div style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-md)", padding: "14px 16px" }}>
      <div style={{ fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <i className="ti ti-temperature" style={{ fontSize: 15 }} aria-hidden="true" /> Suhu CPU
      </div>
      <div style={{ fontSize: 26, fontWeight: 500, fontFamily: "var(--font-mono)", color, marginTop: 4 }}>
        {temp ? `${Math.round(temp)}°C` : "—"}
      </div>
      <div style={{ height: 3, background: "#1e293b", borderRadius: 2, marginTop: 10, overflow: "hidden" }}>
        <div style={{ width: `${Math.min(temp ?? 0, 100)}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.5s ease" }} />
      </div>
      <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 5 }}>
        {!temp ? "Tidak tersedia" : temp >= 80 ? "⚠ Terlalu panas" : temp >= 65 ? "Perlu perhatian" : temp >= 50 ? "Hangat" : "Normal"}
      </div>
    </div>
  );
}