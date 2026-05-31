import express from "express";
import cors from "cors";
import si from "systeminformation";
import net from "net";
import os from "os";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

function checkPort(port, host = "127.0.0.1", timeout = 1500) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(timeout);
    socket
      .on("connect", () => { socket.destroy(); resolve(true); })
      .on("timeout", () => { socket.destroy(); resolve(false); })
      .on("error", () => resolve(false))
      .connect(port, host);
  });
}

let prevNet = null;
let prevNetTime = null;

async function getNetworkSpeed() {
  try {
    const ifaces = await si.networkInterfaces();
    const iface = (Array.isArray(ifaces) ? ifaces : [ifaces]).find(n => !n.internal && n.ip4);
    if (!iface) return { rx: 0, tx: 0, iface: "—" };

    const stats = await si.networkStats(iface.iface);
    const stat = Array.isArray(stats) ? stats[0] : stats;
    const now = Date.now();

    let rx = 0, tx = 0;
    if (prevNet && prevNetTime) {
      const dt = (now - prevNetTime) / 1000;
      rx = Math.max(0, (stat.rx_bytes - prevNet.rx_bytes) / dt / 1024);
      tx = Math.max(0, (stat.tx_bytes - prevNet.tx_bytes) / dt / 1024);
    }

    prevNet = { rx_bytes: stat.rx_bytes, tx_bytes: stat.tx_bytes };
    prevNetTime = now;

    return { rx: parseFloat(rx.toFixed(1)), tx: parseFloat(tx.toFixed(1)), iface: iface.iface };
  } catch {
    return { rx: 0, tx: 0, iface: "—" };
  }
}

const SERVICES = [
  // System
  { id: "casaos",    name: "CasaOS",       host: "192.168.100.80", port: 82,    path: "", icon: "home",            color: "#38bdf8", group: "system" },
  { id: "portainer", name: "Portainer",    host: "192.168.100.80", port: 9000,  path: "", icon: "brand-docker",    color: "#a78bfa", group: "system" },
  { id: "npm",       name: "Nginx Proxy",  host: "192.168.100.80", port: 81,    path: "", icon: "arrows-exchange", color: "#fb923c", group: "system" },
  { id: "adguard",   name: "AdGuard Home", host: "192.168.100.80", port: 8081,  path: "", icon: "shield",          color: "#22c55e", group: "system" },
  { id: "netdata",   name: "Netdata",      host: "192.168.100.80", port: 19999, path: "", icon: "chart-line",      color: "#facc15", group: "system" },
  { id: "glances",   name: "Glances",      host: "192.168.100.80", port: 61208, path: "", icon: "activity",        color: "#94a3b8", group: "system" },
  // Cloud
  { id: "nextcloud", name: "Nextcloud",    host: "192.168.100.80", port: 8085,  path: "", icon: "cloud",           color: "#0ea5e9", group: "cloud"  },
  // Media — tambah di sini dengan group: "media"
];

function serviceUrl(svc) {
  const protocol = svc.protocol ?? "http";
  const port = svc.port === 80 ? "" : `:${svc.port}`;
  return `${protocol}://${svc.host}${port}${svc.path ?? ""}`;
}

app.get("/api/stats", async (req, res) => {
  try {
    const [cpuLoad, mem, time, temps, netSpeed] = await Promise.all([
      si.currentLoad(), si.mem(), si.time(), si.cpuTemperature(), getNetworkSpeed(),
    ]);

    const cpuTemp = temps.main > 0
      ? temps.main
      : (temps.cores?.length > 0 ? Math.round(temps.cores.reduce((a, b) => a + b, 0) / temps.cores.length) : null);

    res.json({
      cpu:      parseFloat(cpuLoad.currentLoad.toFixed(1)),
      ram:      parseFloat(((mem.used / mem.total) * 100).toFixed(1)),
      ramUsed:  Math.round(mem.used / 1024 / 1024),
      ramTotal: Math.round(mem.total / 1024 / 1024),
      uptime:   time.uptime,
      cpuTemp:  cpuTemp !== null ? parseFloat(cpuTemp.toFixed(1)) : null,
      net: { rx: netSpeed.rx, tx: netSpeed.tx, iface: netSpeed.iface },
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal membaca data sistem" });
  }
});

app.get("/api/services", async (req, res) => {
  try {
    const results = await Promise.all(
      SERVICES.map(async (svc) => ({
        ...svc,
        url: serviceUrl(svc),
        online: await checkPort(svc.port, svc.host),
      }))
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Gagal memeriksa layanan" });
  }
});

app.get("/api/sysinfo", async (req, res) => {
  try {
    const [osInfo, cpuInfo, networkIfaces, diskLayout] = await Promise.all([
      si.osInfo(), si.cpu(), si.networkInterfaces(), si.diskLayout(),
    ]);
    const iface = (Array.isArray(networkIfaces) ? networkIfaces : [networkIfaces]).find(n => !n.internal && n.ip4);
    const totalDisk = diskLayout.reduce((sum, d) => sum + (d.size || 0), 0);

    res.json({
      hostname:  os.hostname(),
      distro:    osInfo.distro,
      release:   osInfo.release,
      arch:      osInfo.arch,
      ip:        iface?.ip4 ?? "127.0.0.1",
      iface:     iface?.iface ?? "lo",
      cpu:       `${cpuInfo.manufacturer} ${cpuInfo.brand}`,
      cores:     cpuInfo.physicalCores,
      threads:   cpuInfo.cores,
      diskTotal: Math.round(totalDisk / 1024 / 1024 / 1024),
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal membaca info sistem" });
  }
});

app.get("/api/disk", async (req, res) => {
  try {
    const fsList = await si.fsSize();
    const drives = fsList
      .filter(f => f.size > 0 && f.mount && !f.mount.startsWith("/sys") && !f.mount.startsWith("/proc") && !f.mount.startsWith("/dev/loop"))
      .map(f => ({
        mount:  f.mount,
        size:   Math.round(f.size / 1024 / 1024 / 1024),
        used:   Math.round(f.used / 1024 / 1024 / 1024),
        usePct: parseFloat(f.use.toFixed(1)),
      }));
    const totals = drives.reduce((acc, drive) => ({
      total: acc.total + drive.size,
      used: acc.used + drive.used,
      free: acc.free + Math.max(0, drive.size - drive.used),
    }), { total: 0, used: 0, free: 0 });
    const usePct = totals.total > 0 ? parseFloat(((totals.used / totals.total) * 100).toFixed(1)) : 0;

    res.json({ total: totals.total, used: totals.used, free: totals.free, usePct, drives });
  } catch (err) {
    res.status(500).json({ error: "Gagal membaca disk" });
  }
});

app.listen(PORT, () => console.log(`✅ Backend berjalan di http://localhost:${PORT}`));
