function formatSpeed(kbs) {
  if (kbs === null || kbs === undefined) return "—";
  if (kbs >= 1024) return (kbs / 1024).toFixed(1) + " MB/s";
  return Math.round(kbs) + " KB/s";
}

export default function NetworkCard({ rx, tx, iface }) {
  return (
    <div style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-md)", padding: "14px 16px" }}>
      <div style={{ fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
        <i className="ti ti-network" style={{ fontSize: 15 }} aria-hidden="true" /> Network
        {iface && <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11 }}>{iface}</span>}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: "rgba(56,189,248,0.06)", border: "0.5px solid rgba(56,189,248,0.15)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>
          <div style={{ fontSize: 11, color: "#38bdf8", display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <i className="ti ti-arrow-down" style={{ fontSize: 13 }} aria-hidden="true" /> Download
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 16, color: "var(--text-1)" }}>{formatSpeed(rx)}</div>
        </div>
        <div style={{ background: "rgba(167,139,250,0.06)", border: "0.5px solid rgba(167,139,250,0.15)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>
          <div style={{ fontSize: 11, color: "#a78bfa", display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <i className="ti ti-arrow-up" style={{ fontSize: 13 }} aria-hidden="true" /> Upload
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 16, color: "var(--text-1)" }}>{formatSpeed(tx)}</div>
        </div>
      </div>
    </div>
  );
}