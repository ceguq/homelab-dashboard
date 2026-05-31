export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div style={{
      background: "rgba(239,68,68,0.08)",
      border: "0.5px solid rgba(239,68,68,0.3)",
      borderRadius: "var(--radius-sm)",
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "#fca5a5",
    }}>
      <i className="ti ti-wifi-off" style={{ fontSize: 16 }} aria-hidden="true" />
      <span>Tidak dapat terhubung ke backend — <code style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{message}</code></span>
    </div>
  );
}
