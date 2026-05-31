import { Router } from "express";
import { getBackupStatus } from "../services/backupService.js";
import { getDockerOverview } from "../services/dockerService.js";
import { getActivityLog, getServiceStatuses, getTopology } from "../services/serviceMonitor.js";
import { getDiskSummary, getStats, getSystemInfo } from "../services/systemService.js";
import { getTunnelStatus } from "../services/tunnelService.js";
import { sendError } from "../utils/http.js";

export const monitoringRoutes = Router();

monitoringRoutes.get("/stats", async (req, res) => {
  try {
    res.json(await getStats());
  } catch (error) {
    console.error("ERROR /api/stats:", error);
    sendError(res, 500, "Gagal membaca stats", error.message);
  }
});

monitoringRoutes.get("/services", async (req, res) => {
  try {
    res.json(await getServiceStatuses());
  } catch (error) {
    sendError(res, 500, "Gagal memeriksa layanan", error.message);
  }
});

monitoringRoutes.get("/sysinfo", async (req, res) => {
  try {
    res.json(await getSystemInfo());
  } catch (error) {
    sendError(res, 500, "Gagal membaca info sistem", error.message);
  }
});

monitoringRoutes.get("/disk", async (req, res) => {
  try {
    res.json(await getDiskSummary());
  } catch (error) {
    sendError(res, 500, "Gagal membaca disk", error.message);
  }
});

monitoringRoutes.get("/docker", async (req, res) => {
  try {
    res.json(await getDockerOverview());
  } catch (error) {
    sendError(res, 500, "Gagal membaca Docker", error.message);
  }
});

monitoringRoutes.get("/activity", async (req, res) => {
  try {
    res.json(await getActivityLog());
  } catch (error) {
    sendError(res, 500, "Gagal membaca activity", error.message);
  }
});

monitoringRoutes.get("/tunnel", async (req, res) => {
  try {
    res.json(getTunnelStatus());
  } catch (error) {
    sendError(res, 500, "Gagal membaca tunnel", error.message);
  }
});

monitoringRoutes.get("/topology", async (req, res) => {
  try {
    res.json(await getTopology(getTunnelStatus()));
  } catch (error) {
    sendError(res, 500, "Gagal membaca topology", error.message);
  }
});

monitoringRoutes.get("/backup-status", (req, res) => {
  res.json(getBackupStatus());
});
