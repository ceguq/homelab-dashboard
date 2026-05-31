import ServiceLogo from "./ServiceLogo.jsx";

const STATUS_LABELS = {
  online: "online",
  warning: "warning",
  offline: "offline",
  unknown: "unknown",
};

function TopologyNode({ icon, label, status = "unknown", children }) {
  return (
    <div className={`topology-node topology-${STATUS_LABELS[status] ?? "unknown"}`}>
      <span className="topology-node-icon">{icon}</span>
      <span>{label}</span>
      {children}
    </div>
  );
}

export default function TopologySection({ topology }) {
  const nodes = Array.isArray(topology?.nodes) ? topology.nodes : [];
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const services = nodes.filter((node) => node.type === "service");

  return (
    <section className="dashboard-section animate-in" id="topology">
      <div className="section-heading">
        <span>Network Map</span>
        <h2>Homelab Topology</h2>
      </div>
      <div className="dashboard-card topology-card">
        <div className="topology-flow">
          <TopologyNode
            icon={<i className="ti ti-world" aria-hidden="true" />}
            label="Internet"
            status={nodeMap.get("internet")?.status ?? "unknown"}
          />
          <i className="topology-arrow ti ti-arrow-down" aria-hidden="true" />
          <TopologyNode
            icon={<i className="ti ti-cloud-lock" aria-hidden="true" />}
            label="Cloudflare Tunnel"
            status={nodeMap.get("tunnel")?.status ?? "unknown"}
          />
          <i className="topology-arrow ti ti-arrow-down" aria-hidden="true" />
          <TopologyNode
            icon={<i className="ti ti-server" aria-hidden="true" />}
            label="Homelab Server"
            status={nodeMap.get("server")?.status ?? "unknown"}
          />
          <i className="topology-arrow ti ti-arrow-down" aria-hidden="true" />
          <div className="topology-service-grid">
            {services.map((service) => (
              <TopologyNode
                icon={<ServiceLogo id={service.id} />}
                key={service.id}
                label={service.label}
                status={service.status}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
