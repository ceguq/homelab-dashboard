import { useEffect, useState } from "react";

const pad = (number) => String(number).padStart(2, "0");

export default function TopBar({ docker, tunnel, sysinfo, serviceSummary, user, onLogout, onToggleTheme, theme }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const date = new Date();
      setTime(`${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const hasIssues = serviceSummary.offline > 0 || serviceSummary.warning > 0;
  const statusText =
    serviceSummary.total === 0
      ? "Checking services"
      : hasIssues
        ? `${serviceSummary.offline} offline, ${serviceSummary.warning} warning`
        : "All systems online";
  const dockerRunning = docker?.available === false ? "-" : (docker?.running ?? sysinfo?.docker?.running ?? "-");
  const servicesText = hasIssues ? "Degraded" : serviceSummary.total > 0 ? "Online" : "Checking";
  const tunnelText = tunnel?.connected ? "Connected" : "Not Connected";

  return (
    <header className="topbar">
      <div className="topbar-title">
        <span className="topbar-kicker">Homelab</span>
        <h1>{sysinfo?.hostname ?? "Server Dashboard"}</h1>
      </div>

      <div className="topbar-actions">
        <div className="header-status-strip" aria-label="Compact system status">
          <span>Docker: {dockerRunning} Running</span>
          <span>Services: {servicesText}</span>
          <span>Tunnel: {tunnelText}</span>
        </div>
        <div className={`status-pill ${hasIssues ? "status-pill-warning" : ""}`}>
          <span />
          {statusText}
        </div>
        <div className="topbar-clock">{time}</div>
        <div className="topbar-user">
          <i className="ti ti-user-circle" aria-hidden="true" />
          <span>{user?.username ?? "admin"}</span>
        </div>
        <button className="icon-button theme-button" onClick={onToggleTheme} title="Toggle theme" type="button">
          <i className={`ti ti-${theme === "dark" ? "sun" : "moon"}`} aria-hidden="true" />
        </button>
        <button className="icon-button logout-button" onClick={onLogout} title="Logout" type="button">
          <i className="ti ti-logout" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
