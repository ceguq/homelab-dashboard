function clampPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return 0;
  return Math.max(0, Math.min(Number(value), 100));
}

function gaugeTone(value) {
  if (value >= 85) return { color: "var(--red)", label: "Tinggi" };
  if (value >= 70) return { color: "var(--yellow)", label: "Waspada" };
  return { color: "var(--green)", label: "Normal" };
}

export default function GaugeCard({ label, icon, value, sub, accentColor = "var(--accent)" }) {
  const pct = clampPercent(value);
  const hasValue = value !== null && value !== undefined;
  const tone = hasValue ? gaugeTone(pct) : { color: accentColor, label: "Menunggu" };
  const color = hasValue && pct < 70 ? accentColor : tone.color;
  const needleRotation = -90 + pct * 1.8;

  return (
    <div className="dashboard-card gauge-card">
      <div className="metric-label">
        <i className={`ti ti-${icon}`} aria-hidden="true" />
        {label}
        <span className="gauge-status" style={{ color }}>{tone.label}</span>
      </div>

      <div className="gauge-wrap" aria-label={`${label} ${Math.round(pct)} percent`}>
        <svg className="gauge-svg" viewBox="0 0 220 132" role="img">
          <path className="gauge-track" d="M30 106 A80 80 0 0 1 190 106" pathLength="100" />
          <path
            className="gauge-progress"
            d="M30 106 A80 80 0 0 1 190 106"
            pathLength="100"
            strokeDasharray={`${pct} 100`}
            style={{ stroke: color }}
          />
          <g transform={`rotate(${needleRotation} 110 106)`}>
            <line className="gauge-needle" x1="110" y1="106" x2="110" y2="42" />
          </g>
          <circle className="gauge-hub" cx="110" cy="106" r="7" />
          <text className="gauge-tick" x="28" y="126">0</text>
          <text className="gauge-tick" x="104" y="28">50</text>
          <text className="gauge-tick" x="181" y="126">100</text>
        </svg>
      </div>

      <div className="gauge-value">
        {hasValue ? Math.round(pct) : "-"}
        <span>%</span>
      </div>

      <div className="metric-subtitle">{sub ?? ""}</div>
    </div>
  );
}
