import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { authRoutes } from "./routes/authRoutes.js";
import { monitoringRoutes } from "./routes/monitoringRoutes.js";
import { requireAuth } from "./middleware/auth.js";
import { corsMiddleware, securityHeaders, sessionMiddleware } from "./middleware/security.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.resolve(__dirname, "../../frontend/dist");

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(securityHeaders);
  app.use(corsMiddleware);
  app.use(express.json({ limit: "32kb" }));
  app.use(sessionMiddleware);

  app.use("/api", authRoutes);
  app.use("/api", requireAuth, monitoringRoutes);

  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    app.get("*", (req, res) => {
      res.sendFile(path.join(frontendDist, "index.html"));
    });
  }

  return app;
}
