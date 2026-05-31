import os from "os";
import si from "systeminformation";

function normalizeInterfaces(networkIfaces) {
  return Array.isArray(networkIfaces) ? networkIfaces : [networkIfaces];
}

export async function getDiskSummary() {
  const fsList = await si.fsSize();
  const drives = fsList
    .filter(
      (drive) =>
        drive.size > 0 &&
        drive.mount &&
        !drive.mount.startsWith("/sys") &&
        !drive.mount.startsWith("/proc") &&
        !drive.mount.startsWith("/dev/loop")
    )
    .map((drive) => ({
      mount: drive.mount,
      size: Math.round(drive.size / 1024 / 1024 / 1024),
      used: Math.round(drive.used / 1024 / 1024 / 1024),
      free: Math.max(0, Math.round((drive.size - drive.used) / 1024 / 1024 / 1024)),
      usePct: Number(drive.use.toFixed(1)),
    }));

  const totals = drives.reduce(
    (acc, drive) => ({
      total: acc.total + drive.size,
      used: acc.used + drive.used,
      free: acc.free + drive.free,
    }),
    { total: 0, used: 0, free: 0 }
  );

  const usePct = totals.total > 0 ? Number(((totals.used / totals.total) * 100).toFixed(1)) : 0;

  return { total: totals.total, used: totals.used, free: totals.free, usePct, drives };
}

async function getDockerSummary() {
  try {
    const containers = await si.dockerContainers(true);
    const running = containers.filter((container) => String(container.state).toLowerCase() === "running").length;

    return {
      available: true,
      running,
      total: containers.length,
    };
  } catch {
    return {
      available: false,
      running: 0,
      total: 0,
    };
  }
}

export async function getStats() {
  const [cpuLoad, temp, netStatsRaw, mem] = await Promise.all([
    si.currentLoad(),
    si.cpuTemperature(),
    si.networkStats(),
    si.mem(),
  ]);

  const netStats = Array.isArray(netStatsRaw) ? netStatsRaw : [netStatsRaw];
  const network = netStats.find((stat) => stat.iface && !stat.iface.toLowerCase().includes("loopback")) ?? netStats[0];
  const ramTotal = Math.round(mem.total / 1024 / 1024);
  const ramAvailable = Math.round(mem.available / 1024 / 1024);
  const ramUsed = ramTotal - ramAvailable;

  return {
    cpu: Number(cpuLoad.currentLoad.toFixed(1)),
    ram: Number(((ramUsed / ramTotal) * 100).toFixed(1)),
    ramUsed,
    ramTotal,
    uptime: os.uptime(),
    cpuTemp: temp.main || 0,
    net: {
      rx: network ? Number(((network.rx_sec ?? 0) / 1024).toFixed(1)) : 0,
      tx: network ? Number(((network.tx_sec ?? 0) / 1024).toFixed(1)) : 0,
      iface: network ? network.iface : "unknown",
    },
  };
}

export async function getSystemInfo() {
  const [osInfo, cpuInfo, networkIfaces, mem, disk, docker] = await Promise.all([
    si.osInfo(),
    si.cpu(),
    si.networkInterfaces(),
    si.mem(),
    getDiskSummary(),
    getDockerSummary(),
  ]);
  const iface = normalizeInterfaces(networkIfaces).find((item) => !item.internal && item.ip4);

  return {
    hostname: os.hostname(),
    homelabHost: process.env.HOMELAB_HOST ?? "192.168.100.80",
    distro: osInfo.distro,
    release: osInfo.release,
    arch: osInfo.arch,
    ip: iface?.ip4 ?? "127.0.0.1",
    iface: iface?.iface ?? "lo",
    cpu: `${cpuInfo.manufacturer} ${cpuInfo.brand}`,
    cores: cpuInfo.physicalCores,
    threads: cpuInfo.cores,
    uptime: os.uptime(),
    ramTotal: Math.round(mem.total / 1024 / 1024),
    disk,
    diskTotal: disk.total,
    diskUsed: disk.used,
    diskFree: disk.free,
    docker,
  };
}
