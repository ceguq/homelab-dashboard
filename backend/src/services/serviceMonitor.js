import { serviceConfig } from "../config/services.js";
import { checkPort, serviceUrl, toServiceStatus } from "../utils/network.js";

const activityLog = [];
const lastStatuses = new Map();

function activityStatus(status) {
  if (status === "online") return "Online";
  if (status === "warning") return "Warning";
  return "Offline";
}

function recordActivity(service) {
  const previousStatus = lastStatuses.get(service.id);
  if (previousStatus === service.status) return;

  lastStatuses.set(service.id, service.status);
  activityLog.unshift({
    id: `${Date.now()}-${service.id}-${service.status}`,
    time: new Date().toISOString(),
    serviceId: service.id,
    serviceName: service.name,
    status: activityStatus(service.status),
    tone: service.status,
  });

  if (activityLog.length > 60) {
    activityLog.length = 60;
  }
}

export async function getServiceStatuses({ record = true } = {}) {
  const services = await Promise.all(
    serviceConfig.map(async (service) => {
      const health = await checkPort(service.port, service.host, service.timeout ?? 1500);
      const status = toServiceStatus(health);

      return {
        ...service,
        url: serviceUrl(service),
        status,
        online: status === "online",
        latencyMs: health.latencyMs,
      };
    })
  );

  if (record) {
    services.forEach(recordActivity);
  }

  return services;
}

export async function getActivityLog() {
  if (activityLog.length === 0) {
    await getServiceStatuses({ record: true });
  }

  return activityLog.slice(0, 30);
}

export async function getTopology(tunnel) {
  const services = await getServiceStatuses({ record: false });
  const serverStatus = services.some((service) => service.status === "offline")
    ? "warning"
    : services.some((service) => service.status === "warning")
      ? "warning"
      : "online";

  return {
    nodes: [
      { id: "internet", label: "Internet", type: "internet", status: tunnel.connected ? "online" : "unknown" },
      { id: "tunnel", label: "Cloudflare Tunnel", type: "tunnel", status: tunnel.connected ? "online" : "unknown" },
      { id: "server", label: "Homelab Server", type: "server", status: serverStatus },
      ...services.map((service) => ({
        id: service.id,
        label: service.name,
        type: "service",
        status: service.status ?? "unknown",
        color: service.color,
      })),
    ],
    edges: [
      ["internet", "tunnel"],
      ["tunnel", "server"],
      ...services.map((service) => ["server", service.id]),
    ],
  };
}
