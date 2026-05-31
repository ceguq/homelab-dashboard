export default function BackupStatusCard({ backup }) {
  return (
    <div className="dashboard-card backup-card">
      <div className="card-title">
        <i className="ti ti-archive" aria-hidden="true" />
        Backup Status
      </div>
      <div className="kv-list">
        <div>
          <span>Last Backup</span>
          <strong>{backup?.lastBackup ?? "Not configured"}</strong>
        </div>
        <div>
          <span>Status</span>
          <strong>{backup?.status ?? "Not configured"}</strong>
        </div>
        <div>
          <span>Size</span>
          <strong>{backup?.size ?? "-"}</strong>
        </div>
      </div>
    </div>
  );
}
