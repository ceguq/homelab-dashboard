import si from "systeminformation";

function unavailable() {
  return {
    available: false,
    message: "Docker data unavailable",
    running: null,
    stopped: null,
    total: null,
    images: null,
    volumes: null,
    networks: null,
    topResources: [],
  };
}

function uniqueNetworkCount(containersWithStats) {
  const networks = new Set();

  for (const container of containersWithStats) {
    if (container.networks && typeof container.networks === "object") {
      Object.keys(container.networks).forEach((name) => networks.add(name));
    }
  }

  return networks.size || null;
}

function makeTopResources(containersWithStats) {
  return containersWithStats
    .filter((container) => Number.isFinite(container.cpuPercent) || Number.isFinite(container.memPercent))
    .map((container) => ({
      id: container.id,
      name: container.name,
      image: container.image,
      state: container.state,
      cpuPercent: Number.isFinite(container.cpuPercent) ? Number(container.cpuPercent.toFixed(1)) : null,
      memPercent: Number.isFinite(container.memPercent) ? Number(container.memPercent.toFixed(1)) : null,
    }))
    .sort((a, b) => (b.cpuPercent ?? 0) + (b.memPercent ?? 0) - ((a.cpuPercent ?? 0) + (a.memPercent ?? 0)))
    .slice(0, 5);
}

export async function getDockerOverview() {
  try {
    const [info, containers, images, volumes] = await Promise.all([
      si.dockerInfo(),
      si.dockerContainers(true),
      si.dockerImages(),
      si.dockerVolumes(),
    ]);

    let containersWithStats = [];

    try {
      containersWithStats = await si.dockerAll();
    } catch {
      containersWithStats = [];
    }

    return {
      available: true,
      message: null,
      running: info.containersRunning ?? containers.filter((container) => container.state === "running").length,
      stopped: info.containersStopped ?? containers.filter((container) => container.state !== "running").length,
      total: info.containers ?? containers.length,
      images: info.images ?? images.length,
      volumes: volumes.length,
      networks: uniqueNetworkCount(containersWithStats),
      topResources: makeTopResources(containersWithStats),
    };
  } catch {
    return unavailable();
  }
}
