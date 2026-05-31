import { env } from "../config/env.js";

export function getTunnelStatus() {
  const publicUrl = process.env.CLOUDFLARE_TUNNEL_URL || null;
  const connected = Boolean(publicUrl || process.env.CLOUDFLARE_TUNNEL_CONNECTED === "true");
  const localTarget = process.env.TUNNEL_LOCAL_TARGET ?? `http://localhost:${env.port}`;

  return {
    provider: "Cloudflare Tunnel",
    connected,
    status: connected ? "Connected" : "Tunnel Not Connected",
    localTarget,
    publicUrl,
    lastChecked: new Date().toISOString(),
  };
}
