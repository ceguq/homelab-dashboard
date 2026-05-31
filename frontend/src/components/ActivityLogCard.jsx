function formatTime(value) {
  if (!value) return "--:--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--";
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export default function ActivityLogCard({ activity }) {
  const entries = Array.isArray(activity) ? activity.slice(0, 8) : [];

  return (
    <div className="dashboard-card activity-card">
      <div className="card-title">
        <i className="ti ti-history" aria-hidden="true" />
        Activity Log
      </div>
      {entries.length === 0 ? (
        <p className="empty-state">No monitoring activity yet</p>
      ) : (
        <div className="activity-list">
          {entries.map((entry) => (
            <div className={`activity-row activity-${entry.tone ?? "unknown"}`} key={entry.id}>
              <span className="activity-time">{formatTime(entry.time)}</span>
              <span className="activity-service">{entry.serviceName}</span>
              <span className="activity-status">{entry.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
