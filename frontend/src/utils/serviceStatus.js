export const SERVICE_STATUS = {
  online: {
    label: "Online",
    tone: "green",
    color: "var(--green)",
  },
  warning: {
    label: "Warning",
    tone: "yellow",
    color: "var(--yellow)",
  },
  offline: {
    label: "Offline",
    tone: "red",
    color: "var(--red)",
  },
};

export function getServiceStatus(service) {
  return SERVICE_STATUS[service?.status] ?? SERVICE_STATUS.offline;
}
