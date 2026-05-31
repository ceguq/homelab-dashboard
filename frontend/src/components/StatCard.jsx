import { formatUptime } from "../utils/formatters.js";

function barColor(value) {
  if (value > 85) return "var(--red)";
  if (value > 65) return "var(--yellow)";
  return null;
}

export function StatCardPercent({ label, icon, value, sub, accentColor = "var(--accent)" }) {
  const pct = Math.max(0, Math.min(value ?? 0, 100));
  const color = barColor(pct) ?? accentColor;

  return (
    <div className="dashboard-card metric-card">
      <div className="metric-label">
        <i className={`ti ti-${icon}`} aria-hidden="true" />
        {label}
      </div>
      <div className="metric-value">
        {value !== null && value !== undefined ? Math.round(value) : "-"}
        <span>%</span>
      </div>
      <div className="metric-bar">
        <div style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="metric-subtitle">{sub ?? ""}</div>
    </div>
  );
}

export function StatCardInfo({ label, icon, value, sub, accentColor = "var(--accent)" }) {
  return (
    <div className="dashboard-card metric-card">
      <div className="metric-label">
        <i className={`ti ti-${icon}`} aria-hidden="true" />
        {label}
      </div>
      <div className="metric-value metric-value-small" style={{ color: accentColor }}>
        {value ?? "-"}
      </div>
      <div className="metric-subtitle">{sub ?? ""}</div>
    </div>
  );
}

export function StatCardUptime({ seconds }) {
  return (
    <div className="dashboard-card metric-card">
      <div className="metric-label">
        <i className="ti ti-clock" aria-hidden="true" />
        Uptime
      </div>
      <div className="metric-value metric-value-small">{formatUptime(seconds)}</div>
      <div className="metric-subtitle">Sejak reboot terakhir</div>
    </div>
  );
}
