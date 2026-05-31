import { useEffect, useState } from "react";
import ServiceLogo from "./ServiceLogo.jsx";

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
const pad = (number) => String(number).padStart(2, "0");

function getHealth(serviceSummary) {
  if (serviceSummary.offline > 0) {
    return { label: "Service Offline", tone: "red" };
  }

  if (serviceSummary.warning > 0) {
    return { label: "Degraded Performance", tone: "yellow" };
  }

  if (serviceSummary.total === 0) {
    return { label: "Checking Systems", tone: "yellow" };
  }

  return { label: "All Systems Operational", tone: "green" };
}

export default function DateTimeCard({ sysinfo, serviceSummary }) {
  const [now, setNow] = useState(new Date());
  const health = getHealth(serviceSummary);
  const dockerRunning = sysinfo?.docker?.running ?? 0;
  const displayIp = sysinfo?.homelabHost ?? sysinfo?.ip ?? "192.168.100.80";

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="dashboard-card time-card enterprise-time-card">
      <div className="card-title">
        <i className="ti ti-clock" aria-hidden="true" />
        Waktu Lokal
      </div>

      <strong>{`${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`}</strong>
      <span>{`${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`}</span>

      <div className="time-divider" aria-hidden="true" />

      <div className="time-system-list">
        <div className="time-system-row">
          <span className="system-row-icon">
            <i className="ti ti-server" aria-hidden="true" />
          </span>
          <span>{sysinfo?.hostname ?? "homelab"}</span>
        </div>
        <div className="time-system-row">
          <span className="system-row-icon">
            <i className="ti ti-network" aria-hidden="true" />
          </span>
          <span>{displayIp}</span>
        </div>
        <div className="time-system-row">
          <span className="system-row-icon brand-row-icon">
            <ServiceLogo id="docker" />
          </span>
          <span>Docker: {dockerRunning} Running</span>
        </div>
        <div className={`time-system-row health-row health-${health.tone}`}>
          <span className="health-dot" aria-hidden="true" />
          <span>{health.label}</span>
        </div>
      </div>
    </div>
  );
}
