import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";

export default function DashboardLayout({ children, docker, tunnel, serviceSummary, sysinfo, user, onLogout, onToggleTheme, theme }) {
  return (
    <div className="app-shell">
      <Sidebar serviceSummary={serviceSummary} />
      <div className="content-shell">
        <TopBar
          onLogout={onLogout}
          onToggleTheme={onToggleTheme}
          docker={docker}
          serviceSummary={serviceSummary}
          sysinfo={sysinfo}
          theme={theme}
          tunnel={tunnel}
          user={user}
        />
        <main className="dashboard-main">{children}</main>
      </div>
    </div>
  );
}
