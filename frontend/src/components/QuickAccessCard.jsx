export default function QuickAccessCard({ services }) {
  return (
    <div className="dashboard-card quick-access-card">
      <div className="card-title">
        <i className="ti ti-bolt" aria-hidden="true" />
        Quick Access
      </div>
      <div className="quick-access-grid">
        {services.map((service) => (
          <a
            className="quick-access-link"
            href={service.url}
            key={service.id}
            rel="noreferrer"
            style={{
              "--service-color": service.color,
              "--service-bg": `${service.color}1f`,
            }}
            target="_blank"
            title={`Buka ${service.name}`}
          >
            <span
              className="quick-access-icon"
            >
              <i className={`ti ti-${service.icon}`} aria-hidden="true" />
            </span>
            <span>
              <span className="quick-access-name">{service.name}</span>
              <span className="quick-access-url">{service.url?.replace("http://", "")}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
