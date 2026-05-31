export const env = {
  port: Number(process.env.PORT ?? 3001),
  sessionSecret: process.env.SESSION_SECRET ?? "change-this-session-secret",
  frontendOrigins: (process.env.FRONTEND_ORIGIN ?? "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  cookieSecure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === "true" : "auto",
  cookieSameSite: process.env.COOKIE_SAMESITE ?? "lax",
};

export function warnForUnsafeDefaults() {
  if (!process.env.SESSION_SECRET) {
    console.warn("[auth] SESSION_SECRET belum diset. Gunakan env SESSION_SECRET sebelum deploy publik.");
  }
}
