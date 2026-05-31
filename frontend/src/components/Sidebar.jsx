const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "layout-dashboard" },
  { id: "realtime", label: "Realtime", icon: "activity" },
  { id: "operations", label: "Operations", icon: "stack-2" },
  { id: "services", label: "Monitoring", icon: "server-2" },
  { id: "access", label: "Access", icon: "bolt" },
  { id: "topology", label: "Topology", icon: "sitemap" },
  { id: "server-info", label: "Server Info", icon: "info-circle" },
];

export default function Sidebar({ serviceSummary }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">
          <i className="ti ti-home-shield" aria-hidden="true" />
        </div>
        <div>
          <strong>Homelab</strong>
          <span>Control Panel</span>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Dashboard sections">
        {NAV_ITEMS.map((item) => (
          <a href={`#${item.id}`} key={item.id}>
            <i className={`ti ti-${item.icon}`} aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-summary">
        <span>Service Health</span>
        <strong>{serviceSummary.online}/{serviceSummary.total} online</strong>
        <div className="summary-bars" aria-hidden="true">
          <i style={{ flex: serviceSummary.online, background: "var(--green)" }} />
          <i style={{ flex: serviceSummary.warning, background: "var(--yellow)" }} />
          <i style={{ flex: serviceSummary.offline, background: "var(--red)" }} />
        </div>
      </div>
    </aside>
  );
}
