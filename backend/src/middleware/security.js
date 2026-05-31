import cors from "cors";
import session from "express-session";
import { env } from "../config/env.js";

export function securityHeaders(req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader("X-Frame-Options", "DENY");
  next();
}

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin || env.frontendOrigins.includes("*") || env.frontendOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin tidak diizinkan oleh CORS"));
  },
  credentials: true,
});

export const sessionMiddleware = session({
  name: "homelab.sid",
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSameSite,
    maxAge: 1000 * 60 * 60 * 8,
  },
});
