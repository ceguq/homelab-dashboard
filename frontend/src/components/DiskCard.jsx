function barColor(pct) {
  if (pct >= 90) return "var(--red)";
  if (pct >= 75) return "var(--yellow)";
  return "var(--accent)";
}

export default function DiskCard({ disk, loading = false }) {
  return (
    <div className="dashboard-card disk-card">
      <div className="card-title">
        <i className="ti ti-database" aria-hidden="true" />
        Disk Usage
      </div>
      {loading ? (
        <p className="muted-text">Memuat...</p>
      ) : !disk ? (
        <p className="muted-text">Data disk tidak tersedia</p>
      ) : (
        <div className="disk-stack">
          <div>
            <div className="disk-line">
              <span>Total usage</span>
              <strong style={{ color: barColor(disk.usePct) }}>{disk.usePct}%</strong>
            </div>
            <div className="metric-bar metric-bar-thick">
              <div style={{ width: `${disk.usePct}%`, background: barColor(disk.usePct) }} />
            </div>
          </div>

          <div className="disk-summary">
            <span>
              <b>{disk.total}</b> GB Total
            </span>
            <span>
              <b>{disk.used}</b> GB Used
            </span>
            <span>
              <b>{disk.free}</b> GB Free
            </span>
          </div>

          {disk.drives?.map((drive) => (
            <div key={drive.mount}>
              <div className="disk-line">
                <span>{drive.mount}</span>
                <strong>{drive.used}/{drive.size} GB</strong>
              </div>
              <div className="metric-bar">
                <div style={{ width: `${drive.usePct}%`, background: barColor(drive.usePct) }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
