import { getServiceStatus } from "../utils/serviceStatus.js";
import ServiceLogo from "./ServiceLogo.jsx";

export default function QuickAccessCard({ services }) {
  const items = services.filter((service) => service.url);

  if (items.length === 0) {
    return <p className="muted-text">Shortcut belum tersedia atau backend belum terhubung.</p>;
  }

  return (
    <div className="quick-access-grid">
      {items.map((service) => {
        const status = getServiceStatus(service);

        return (
          <a
            className="quick-access-link"
            href={service.url}
            key={service.id}
            rel="noreferrer"
            style={{
              "--service-color": service.color,
              "--service-bg": `${service.color}1f`,
              "--status-color": status.color,
            }}
            target="_blank"
                title={`Buka ${service.name}`}
              >
                <span className="quick-access-icon">
                  <ServiceLogo id={service.id} title={service.name} />
                </span>
            <span>
              <span className="quick-access-name">{service.name}</span>
              <span className="quick-access-url">{service.url?.replace("http://", "").replace("https://", "")}</span>
            </span>
            <i className="quick-access-status" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
