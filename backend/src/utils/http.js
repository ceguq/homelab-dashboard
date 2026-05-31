export function sendError(res, status, message, detail) {
  res.status(status).json({
    error: message,
    ...(detail ? { detail } : {}),
  });
}
