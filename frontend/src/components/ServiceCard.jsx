import { getServiceStatus } from "../utils/serviceStatus.js";
import ServiceLogo from "./ServiceLogo.jsx";

export default function ServiceCard({ service }) {
  const { name, host, port, color, url, latencyMs } = service;
  const status = getServiceStatus(service);

  const handleClick = () => {
    if (url) window.open(url, "_blank", "noreferrer");
  };

  return (
    <button
      className={`service-card dashboard-card service-${status.tone}`}
      onClick={handleClick}
      aria-label={`Buka ${name}`}
      style={{ "--service-color": color, "--service-bg": `${color}1f` }}
      type="button"
    >
      <span className="service-icon">
        <ServiceLogo id={service.id} title={name} />
      </span>

      <span className="service-content">
        <strong>{name}</strong>
        <small>{host}:{port}</small>
        <em>{url ? url.replace("http://", "").replace("https://", "") : `:${port}`}</em>
      </span>

      <span className="service-state">
        <i />
        {status.label}
        {latencyMs ? <em>{latencyMs}ms</em> : null}
      </span>
    </button>
  );
}
