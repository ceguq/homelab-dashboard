const iconBg = {
  "#38bdf8": "rgba(56,189,248,0.12)",
  "#22c55e": "rgba(34,197,94,0.12)",
  "#a78bfa": "rgba(167,139,250,0.12)",
  "#fb923c": "rgba(251,146,60,0.12)",
  "#ef4444": "rgba(239,68,68,0.12)",
};

export default function ServiceCard({ service }) {
  const { name, port, icon, color, online, url } = service;
  const bg = iconBg[color] ?? "rgba(255,255,255,0.06)";

  const handleClick = () => {
    if (url) window.open(url, "_blank", "noreferrer");
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: "var(--bg-surface)",
        border: "0.5px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: url ? "pointer" : "default",
        transition: "border-color 0.2s",
        opacity: online ? 1 : 0.6,
      }}
      onMouseEnter={(e) => { if (url) e.currentTarget.style.borderColor = color; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      {/* Icon */}
      <div style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <i className={`ti ti-${icon}`} style={{ fontSize: 18, color }} aria-hidden="true" />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-1)" }}>{name}</div>
        <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
          {url ? url.replace("http://", "") : `:${port}`}
        </div>
      </div>

      {/* Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: online ? "var(--green)" : "var(--red)", flexShrink: 0 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: online ? "var(--green)" : "var(--red)", display: "inline-block" }} />
        {online ? "Online" : "Offline"}
      </div>
    </div>
  );
}
