export function formatUptime(seconds) {
  if (!seconds) return "-";

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function formatSpeed(kbs) {
  if (kbs === null || kbs === undefined) return "-";
  if (kbs >= 1024) return `${(kbs / 1024).toFixed(1)} MB/s`;
  return `${Math.round(kbs)} KB/s`;
}

export function formatPercent(value) {
  if (value === null || value === undefined) return "-";
  return `${Math.round(value)}%`;
}

export function formatGb(value) {
  if (value === null || value === undefined) return "-";
  return `${value} GB`;
}

export function formatMbAsGb(value) {
  if (value === null || value === undefined) return "-";
  return `${(value / 1024).toFixed(1)} GB`;
}
