import net from "net";
import { performance } from "perf_hooks";

export function serviceUrl(service) {
  if (service.accessUrl) return service.accessUrl;

  const protocol = service.protocol ?? "http";
  const port = service.port === 80 ? "" : `:${service.port}`;
  return `${protocol}://${service.host}${port}${service.path ?? ""}`;
}

export function checkPort(port, host = "127.0.0.1", timeout = 1500) {
  return new Promise((resolve) => {
    const startedAt = performance.now();
    const socket = new net.Socket();

    socket.setTimeout(timeout);
    socket
      .on("connect", () => {
        socket.destroy();
        resolve({ reachable: true, latencyMs: Math.round(performance.now() - startedAt) });
      })
      .on("timeout", () => {
        socket.destroy();
        resolve({ reachable: false, latencyMs: null });
      })
      .on("error", () => resolve({ reachable: false, latencyMs: null }))
      .connect(port, host);
  });
}

export function toServiceStatus(result) {
  if (!result.reachable) return "offline";
  if (result.latencyMs > 1000) return "warning";
  return "online";
}
