export default function SysInfoCard({ sysinfo }) {
  const rows = sysinfo ? [
    { icon: "cpu",           label: "Prosesor",     value: sysinfo.cpu },
    { icon: "circuit-board", label: "Core/Thread",  value: `${sysinfo.cores} core / ${sysinfo.threads} thread` },
    { icon: "brand-ubuntu",  label: "OS",           value: `${sysinfo.distro} ${sysinfo.release ?? ""}` },
    { icon: "settings",      label: "Arsitektur",   value: sysinfo.arch },
    { icon: "network",       label: "IP Lokal",     value: sysinfo.ip },
    { icon: "database",      label: "Total Disk",   value: `${sysinfo.diskTotal} GB` },
  ] : [];

  return (
    <div style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-md)", padding: "14px 16px" }}>
      <div style={{ fontSize: 12, color: "var(--text-3)", display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
        <i className="ti ti-server" style={{ fontSize: 15 }} aria-hidden="true" /> Info Server
      </div>
      {!sysinfo ? <p style={{ color: "var(--text-3)", fontSize: 13 }}>Memuat...</p> : (
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {rows.map(r => (
            <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
              <i className={`ti ti-${r.icon}`} style={{ fontSize: 14, color: "var(--text-3)", width: 16, flexShrink: 0 }} aria-hidden="true" />
              <span style={{ color: "var(--text-3)", minWidth: 90 }}>{r.label}</span>
              <span style={{ color: "var(--text-1)", fontFamily: "var(--font-mono)", fontSize: 11 }}>{r.value ?? "—"}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}