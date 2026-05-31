import ServiceLogo from "./ServiceLogo.jsx";

function valueOrDash(value) {
  return value === null || value === undefined ? "-" : value;
}

export default function DockerOverviewCard({ docker }) {
  if (!docker || docker.available === false) {
    return (
      <div className="dashboard-card docker-card">
        <div className="card-title">
          <ServiceLogo id="docker" className="inline-logo" />
          Docker Overview
        </div>
        <p className="empty-state">Docker data unavailable</p>
      </div>
    );
  }

  const items = [
    { label: "Running containers", value: docker.running, tone: "green" },
    { label: "Stopped containers", value: docker.stopped, tone: "red" },
    { label: "Total containers", value: docker.total, tone: "blue" },
    { label: "Docker images", value: docker.images, tone: "purple" },
    { label: "Docker volumes", value: docker.volumes, tone: "yellow" },
    { label: "Docker networks", value: docker.networks, tone: "gray" },
  ];

  return (
    <div className="dashboard-card docker-card">
      <div className="card-title">
        <ServiceLogo id="docker" className="inline-logo" />
        Docker Overview
      </div>
      <div className="overview-metric-grid">
        {items.map((item) => (
          <div className={`overview-metric metric-${item.tone}`} key={item.label}>
            <span>{item.label}</span>
            <strong>{valueOrDash(item.value)}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
