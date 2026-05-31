import { Router } from "express";
import { publicUser, validateCredentials } from "../services/authService.js";

export const authRoutes = Router();

authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (!username || !password) {
    res.status(400).json({ error: "Username dan password wajib diisi" });
    return;
  }

  const user = await validateCredentials(username, password);

  if (!user) {
    res.status(401).json({ error: "Username atau password salah" });
    return;
  }

  req.session.regenerate((error) => {
    if (error) {
      res.status(500).json({ error: "Gagal membuat session" });
      return;
    }

    req.session.user = publicUser(user);
    res.json({ authenticated: true, user: req.session.user });
  });
});

authRoutes.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).json({ error: "Gagal logout" });
      return;
    }

    res.clearCookie("homelab.sid", { path: "/" });
    res.json({ authenticated: false });
  });
});

authRoutes.get("/auth/check", (req, res) => {
  if (!req.session?.user) {
    res.json({ authenticated: false, user: null });
    return;
  }

  res.json({ authenticated: true, user: req.session.user });
});
