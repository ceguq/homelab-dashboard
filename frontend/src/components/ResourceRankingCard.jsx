export default function ResourceRankingCard({ docker }) {
  const resources = Array.isArray(docker?.topResources) ? docker.topResources : [];

  return (
    <div className="dashboard-card resource-card">
      <div className="card-title">
        <i className="ti ti-chart-arrows-vertical" aria-hidden="true" />
        Top Resource Usage
      </div>
      {resources.length === 0 ? (
        <p className="empty-state">Resource ranking unavailable</p>
      ) : (
        <div className="resource-list">
          {resources.map((item) => (
            <div className="resource-row" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <span>{item.image}</span>
              </div>
              <div className="resource-metrics">
                <span>CPU {item.cpuPercent ?? "-"}%</span>
                <span>RAM {item.memPercent ?? "-"}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
