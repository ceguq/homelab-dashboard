import { useEffect, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import { StatCardPercent, StatCardUptime } from "./components/StatCard.jsx";
import RealtimeChart from "./components/RealtimeChart.jsx";
import ServiceCard from "./components/ServiceCard.jsx";
import ErrorBanner from "./components/ErrorBanner.jsx";
import NetworkCard from "./components/NetworkCard.jsx";
import TempCard from "./components/TempCard.jsx";
import DiskCard from "./components/DiskCard.jsx";
import SysInfoCard from "./components/SysInfoCard.jsx";
import DateTimeCard from "./components/DateTimeCard.jsx";
import QuickAccessCard from "./components/QuickAccessCard.jsx";
import { useStats } from "./hooks/useStats.js";
import { useServices } from "./hooks/useServices.js";

const SECTION = { fontSize: 11, fontWeight: 600, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 };

export default function App() {
  const { stats, error, history } = useStats(2000);
  const { services, loading: svcLoading } = useServices(5000);
  const [sysinfo, setSysinfo] = useState(null);

  useEffect(() => {
    fetch("/api/sysinfo").then(r => r.ok ? r.json() : null).then(d => d && setSysinfo(d)).catch(() => {});
  }, []);

  const allOnline = services.length > 0 && services.every(s => s.online);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar sysinfo={sysinfo} allOnline={allOnline} />
      <main className="dashboard-main">

        <ErrorBanner message={error} />

        {/* Overview */}
        <section>
          <p style={SECTION}>System overview</p>
          <div className="dashboard-grid dashboard-grid-4">
            <StatCardPercent label="CPU Usage" icon="cpu" value={stats?.cpu}
              sub={stats ? (stats.cpu > 85 ? "⚠ Beban tinggi" : "Normal") : "Memuat..."} accentColor="var(--accent)" />
            <StatCardPercent label="RAM Usage" icon="device-desktop-analytics" value={stats?.ram}
              sub={stats ? `${stats.ramUsed ?? "—"} / ${stats.ramTotal ?? "—"} MB` : "Memuat..."} accentColor="var(--purple)" />
            <TempCard temp={stats?.cpuTemp} />
            <StatCardUptime seconds={stats?.uptime} />
          </div>
        </section>

        {/* Grafik */}
        <section>
          <p style={SECTION}>Realtime monitor</p>
          <RealtimeChart history={history} />
        </section>

        {/* Detail */}
        <section>
          <p style={SECTION}>Detail</p>
          <div className="dashboard-grid dashboard-grid-4">
            <NetworkCard rx={stats?.net?.rx} tx={stats?.net?.tx} iface={stats?.net?.iface} />
            <DateTimeCard />
            <SysInfoCard sysinfo={sysinfo} />
            <DiskCard />
          </div>
        </section>

        {/* Quick access */}
        {services.length > 0 && (
          <section>
            <p style={SECTION}>Homelab shortcuts</p>
            <QuickAccessCard services={services} />
          </section>
        )}

        {/* System services */}
        <section>
          <p style={SECTION}>System</p>
          {svcLoading ? <p style={{ color: "var(--text-3)", fontSize: 13 }}>Memeriksa layanan...</p> : (
            <div className="dashboard-grid dashboard-grid-3">
              {services.filter(s => s.group === "system").map(svc => <ServiceCard key={svc.id} service={svc} />)}
            </div>
          )}
        </section>

        {/* Cloud */}
        {services.filter(s => s.group === "cloud").length > 0 && (
          <section>
            <p style={SECTION}>Cloud</p>
            <div className="dashboard-grid dashboard-grid-3">
              {services.filter(s => s.group === "cloud").map(svc => <ServiceCard key={svc.id} service={svc} />)}
            </div>
          </section>
        )}

        {/* Media & Sosial */}
        {services.filter(s => s.group === "media").length > 0 && (
          <section>
            <p style={SECTION}>Media &amp; Sosial</p>
            <div className="dashboard-grid dashboard-grid-3">
              {services.filter(s => s.group === "media").map(svc => <ServiceCard key={svc.id} service={svc} />)}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
