import { formatGb, formatMbAsGb, formatUptime } from "../utils/formatters.js";

export default function SysInfoCard({ sysinfo }) {
  const rows = sysinfo
    ? [
        { icon: "server", label: "Hostname", value: sysinfo.hostname },
        { icon: "network", label: "IP address", value: sysinfo.ip },
        { icon: "brand-ubuntu", label: "OS", value: `${sysinfo.distro} ${sysinfo.release ?? ""}` },
        { icon: "clock-up", label: "Uptime", value: formatUptime(sysinfo.uptime) },
        { icon: "memory", label: "RAM total", value: formatMbAsGb(sysinfo.ramTotal) },
        { icon: "database", label: "Disk total", value: formatGb(sysinfo.diskTotal) },
        { icon: "database-export", label: "Disk used", value: formatGb(sysinfo.diskUsed) },
        { icon: "database-share", label: "Disk free", value: formatGb(sysinfo.diskFree) },
        { icon: "cpu", label: "Processor", value: sysinfo.cpu },
        { icon: "circuit-board", label: "Core/Thread", value: `${sysinfo.cores} core / ${sysinfo.threads} thread` },
        { icon: "settings", label: "Arch", value: sysinfo.arch },
      ]
    : [];

  return (
    <div className="dashboard-card sysinfo-card">
      <div className="card-title">
        <i className="ti ti-server" aria-hidden="true" />
        Server Info
      </div>
      {!sysinfo ? (
        <p className="muted-text">Memuat...</p>
      ) : (
        <div className="sysinfo-list">
          {rows.map((row) => (
            <div key={row.label}>
              <i className={`ti ti-${row.icon}`} aria-hidden="true" />
              <span>{row.label}</span>
              <strong>{row.value ?? "-"}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
