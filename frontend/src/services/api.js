export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}

export async function apiFetch(path, options = {}) {
  let response;

  try {
    response = await fetch(path, {
      credentials: "include",
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });
  } catch (error) {
    throw new ApiError("Backend tidak merespons", 0, { detail: error.message });
  }

  const payload = await parseResponse(response);

  if (response.status === 401) {
    window.dispatchEvent(new CustomEvent("dashboard:unauthorized"));
  }

  if (!response.ok) {
    throw new ApiError(payload?.error ?? `Request gagal (${response.status})`, response.status, payload);
  }

  return payload;
}

export function login(username, password) {
  return apiFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function logout() {
  return apiFetch("/api/logout", { method: "POST" });
}

export function checkAuth() {
  return apiFetch("/api/auth/check");
}

export function getStats() {
  return apiFetch("/api/stats");
}

export function getServices() {
  return apiFetch("/api/services");
}

export function getSysInfo() {
  return apiFetch("/api/sysinfo");
}

export function getDisk() {
  return apiFetch("/api/disk");
}

export function getDocker() {
  return apiFetch("/api/docker");
}

export function getActivity() {
  return apiFetch("/api/activity");
}

export function getTunnel() {
  return apiFetch("/api/tunnel");
}

export function getTopology() {
  return apiFetch("/api/topology");
}

export function getBackupStatus() {
  return apiFetch("/api/backup-status");
}
