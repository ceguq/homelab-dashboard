const HOMELAB_HOST = process.env.HOMELAB_HOST ?? "192.168.100.80";
const DASHBOARD_HOST = process.env.DASHBOARD_HOST ?? "127.0.0.1";
const API_HOST = process.env.API_HOST ?? "127.0.0.1";

function numberEnv(name, fallback) {
  return Number(process.env[name] ?? fallback);
}

export const serviceConfig = [
  {
    id: "casaos",
    name: "CasaOS",
    host: process.env.CASAOS_HOST ?? HOMELAB_HOST,
    port: numberEnv("CASAOS_PORT", 82),
    icon: "home",
    color: "#38bdf8",
    group: "services",
  },
  {
    id: "portainer",
    name: "Portainer",
    host: process.env.PORTAINER_HOST ?? HOMELAB_HOST,
    port: numberEnv("PORTAINER_PORT", 9000),
    icon: "brand-docker",
    color: "#a78bfa",
    group: "services",
  },
  {
    id: "adguard",
    name: "AdGuard Home",
    host: process.env.ADGUARD_HOST ?? HOMELAB_HOST,
    port: numberEnv("ADGUARD_PORT", 8081),
    icon: "shield-check",
    color: "#22c55e",
    group: "services",
  },
  {
    id: "npm",
    name: "Nginx Proxy Manager",
    host: process.env.NPM_HOST ?? HOMELAB_HOST,
    port: numberEnv("NPM_PORT", 81),
    icon: "arrows-exchange",
    color: "#fb923c",
    group: "services",
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    host: process.env.NEXTCLOUD_HOST ?? HOMELAB_HOST,
    port: numberEnv("NEXTCLOUD_PORT", 8085),
    icon: "cloud",
    color: "#0ea5e9",
    group: "services",
  },
  {
    id: "netdata",
    name: "Netdata",
    host: process.env.NETDATA_HOST ?? HOMELAB_HOST,
    port: numberEnv("NETDATA_PORT", 19999),
    icon: "chart-line",
    color: "#facc15",
    group: "monitoring",
  },
  {
    id: "dashboard-frontend",
    name: "Homepage Dashboard",
    host: process.env.DASHBOARD_FRONTEND_HOST ?? DASHBOARD_HOST,
    port: numberEnv("DASHBOARD_FRONTEND_PORT", 5173),
    icon: "layout-dashboard",
    color: "#14b8a6",
    group: "dashboard",
  },
  {
    id: "backend-api",
    name: "Backend API",
    host: process.env.BACKEND_API_HOST ?? API_HOST,
    port: numberEnv("BACKEND_API_PORT", 3001),
    icon: "api",
    color: "#60a5fa",
    group: "dashboard",
  },
];
