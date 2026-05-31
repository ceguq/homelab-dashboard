function formatChecked(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function ExternalAccessCard({ tunnel }) {
  const connected = Boolean(tunnel?.connected);

  return (
    <div className="dashboard-card external-card">
      <div className="card-title">
        <i className="ti ti-cloud-lock" aria-hidden="true" />
        External Access
      </div>
      <div className={`external-status ${connected ? "external-connected" : "external-disconnected"}`}>
        <span />
        {connected ? "Connected" : "Tunnel Not Connected"}
      </div>
      <div className="kv-list">
        <div>
          <span>Local target</span>
          <strong>{tunnel?.localTarget ?? "http://localhost:3001"}</strong>
        </div>
        <div>
          <span>Public URL</span>
          <strong>{tunnel?.publicUrl ?? "Not configured"}</strong>
        </div>
        <div>
          <span>Last checked</span>
          <strong>{formatChecked(tunnel?.lastChecked)}</strong>
        </div>
      </div>
    </div>
  );
}
