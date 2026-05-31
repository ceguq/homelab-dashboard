function tempColor(temp) {
  if (!temp) return "var(--text-3)";
  if (temp >= 80) return "var(--red)";
  if (temp >= 65) return "var(--yellow)";
  if (temp >= 50) return "var(--accent)";
  return "var(--green)";
}

export default function TempCard({ temp }) {
  const color = tempColor(temp);
  const pct = Math.min(temp ?? 0, 100);

  return (
    <div className="dashboard-card metric-card">
      <div className="metric-label">
        <i className="ti ti-temperature" aria-hidden="true" />
        CPU Temperature
      </div>
      <div className="metric-value" style={{ color }}>
        {temp ? `${Math.round(temp)}C` : "-"}
      </div>
      <div className="metric-bar">
        <div style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="metric-subtitle">
        {!temp ? "Tidak tersedia" : temp >= 80 ? "Terlalu panas" : temp >= 65 ? "Perlu perhatian" : "Normal"}
      </div>
    </div>
  );
}
