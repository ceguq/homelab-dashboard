function formatUptime(seconds) {
  if (!seconds) return "—";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function barColor(val) {
  if (val > 85) return "var(--red)";
  if (val > 65) return "var(--orange)";
  return null;
}

export function StatCardPercent({ label, icon, value, sub, accentColor }) {
  const pct = value ?? 0;
  const color = barColor(pct) ?? accentColor;

  return (
    <div style={card}>
      <div style={labelStyle}>
        <i className={`ti ti-${icon}`} style={{ fontSize: 15 }} aria-hidden="true" />
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 500, fontFamily: "var(--font-mono)", color: "var(--text-1)", marginTop: 4 }}>
        {value !== null && value !== undefined ? Math.round(value) : "—"}
        <span style={{ fontSize: 13, color: "var(--text-3)", marginLeft: 1 }}>%</span>
      </div>
      {/* Bar */}
      <div style={{ height: 3, background: "#1e293b", borderRadius: 2, marginTop: 10, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.5s ease" }} />
      </div>
      <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 5 }}>{sub ?? ""}</div>
    </div>
  );
}

export function StatCardInfo({ label, icon, value, sub }) {
  return (
    <div style={card}>
      <div style={labelStyle}>
        <i className={`ti ti-${icon}`} style={{ fontSize: 15 }} aria-hidden="true" />
        {label}
      </div>
      <div style={{ fontSize: 17, fontWeight: 500, fontFamily: "var(--font-mono)", color: "var(--text-1)", marginTop: 8 }}>
        {value ?? "—"}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 4 }}>{sub ?? ""}</div>
    </div>
  );
}

export function StatCardUptime({ seconds }) {
  return (
    <div style={card}>
      <div style={labelStyle}>
        <i className="ti ti-clock" style={{ fontSize: 15 }} aria-hidden="true" />
        Uptime
      </div>
      <div style={{ fontSize: 17, fontWeight: 500, fontFamily: "var(--font-mono)", color: "var(--text-1)", marginTop: 8 }}>
        {formatUptime(seconds)}
      </div>
      <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 4 }}>Sejak reboot terakhir</div>
    </div>
  );
}

const card = {
  background: "var(--bg-surface)",
  border: "0.5px solid var(--border)",
  borderRadius: "var(--radius-md)",
  padding: "14px 16px",
};

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12,
  color: "var(--text-3)",
};
