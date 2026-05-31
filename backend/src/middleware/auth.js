export function requireAuth(req, res, next) {
  if (req.session?.user) {
    next();
    return;
  }

  res.status(401).json({ authenticated: false, error: "Login diperlukan" });
}
