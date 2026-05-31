import DashboardLayout from "../components/DashboardLayout.jsx";
import ActivityLogCard from "../components/ActivityLogCard.jsx";
import BackupStatusCard from "../components/BackupStatusCard.jsx";
import DateTimeCard from "../components/DateTimeCard.jsx";
import DiskCard from "../components/DiskCard.jsx";
import DockerOverviewCard from "../components/DockerOverviewCard.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import ExternalAccessCard from "../components/ExternalAccessCard.jsx";
import GaugeCard from "../components/GaugeCard.jsx";
import NetworkCard from "../components/NetworkCard.jsx";
import QuickAccessCard from "../components/QuickAccessCard.jsx";
import RealtimeChart from "../components/RealtimeChart.jsx";
import ResourceRankingCard from "../components/ResourceRankingCard.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { StatCardUptime } from "../components/StatCard.jsx";
import SysInfoCard from "../components/SysInfoCard.jsx";
import TempCard from "../components/TempCard.jsx";
import TopologySection from "../components/TopologySection.jsx";
import { useDashboardExtras } from "../hooks/useDashboardExtras.js";
import { useDisk } from "../hooks/useDisk.js";
import { useServices } from "../hooks/useServices.js";
import { useStats } from "../hooks/useStats.js";
import { useSysInfo } from "../hooks/useSysInfo.js";

function makeServiceSummary(services) {
  return services.reduce(
    (summary, service) => {
      const status = service.status ?? (service.online ? "online" : "offline");
      return {
        ...summary,
        total: summary.total + 1,
        online: summary.online + (status === "online" ? 1 : 0),
        warning: summary.warning + (status === "warning" ? 1 : 0),
        offline: summary.offline + (status === "offline" ? 1 : 0),
      };
    },
    { total: 0, online: 0, warning: 0, offline: 0 }
  );
}

export default function DashboardPage({ user, onLogout, onToggleTheme, theme }) {
  const { stats, error, history } = useStats(1000);
  const { services, loading: servicesLoading, error: servicesError } = useServices(5000);
  const { disk, loading: diskLoading, error: diskError } = useDisk(10000);
  const { sysinfo, error: sysinfoError } = useSysInfo();
  const {
    docker,
    activity,
    tunnel,
    topology,
    backup,
    error: extrasError,
  } = useDashboardExtras(12000);
  const serviceSummary = makeServiceSummary(services);
  const diskSource = stats?.disk ?? disk;
  const visibleError = error || servicesError || sysinfoError || diskError || extrasError;

  return (
    <DashboardLayout
      onLogout={onLogout}
      onToggleTheme={onToggleTheme}
      docker={docker}
      serviceSummary={serviceSummary}
      sysinfo={sysinfo}
      theme={theme}
      tunnel={tunnel}
      user={user}
    >
      <ErrorBanner message={visibleError} />

      <section className="dashboard-section animate-in" id="overview">
        <div className="section-heading">
          <span>Overview</span>
          <h2>System Monitoring</h2>
        </div>
        <div className="dashboard-grid dashboard-grid-3">
          <GaugeCard
            accentColor="var(--accent)"
            icon="cpu"
            label="CPU Usage"
            sub={stats ? (stats.cpu > 85 ? "Beban tinggi" : "Normal") : "Memuat..."}
            value={stats?.cpu}
          />
          <GaugeCard
            accentColor="var(--purple)"
            icon="device-desktop-analytics"
            label="RAM Usage"
            sub={stats ? `${stats.ramUsed ?? "-"} / ${stats.ramTotal ?? "-"} MB` : "Memuat..."}
            value={stats?.ram}
          />
          <GaugeCard
            accentColor="var(--green)"
            icon="database"
            label="Disk Usage"
            sub={diskSource ? `${diskSource.used} / ${diskSource.total} GB` : diskLoading ? "Memuat..." : "Tidak tersedia"}
            value={diskSource?.usePct}
          />
          <TempCard temp={stats?.cpuTemp} />
          <NetworkCard rx={stats?.net?.rx} tx={stats?.net?.tx} iface={stats?.net?.iface} />
          <StatCardUptime seconds={stats?.uptime} />
        </div>
      </section>

      <section className="dashboard-section animate-in" id="realtime">
        <div className="section-heading">
          <span>Realtime</span>
          <h2>Last 60 Seconds</h2>
        </div>
        <RealtimeChart history={history} />
      </section>

      <section className="dashboard-section animate-in" id="operations">
        <div className="section-heading">
          <span>Operations</span>
          <h2>Homelab Overview</h2>
        </div>
        <div className="dashboard-grid dashboard-grid-3">
          <DockerOverviewCard docker={docker} />
          <ExternalAccessCard tunnel={tunnel} />
          <ActivityLogCard activity={activity} />
          <BackupStatusCard backup={backup} />
          <ResourceRankingCard docker={docker} />
        </div>
      </section>

      <section className="dashboard-section animate-in" id="services">
        <div className="section-heading">
          <span>Monitoring</span>
          <h2>Service Monitoring</h2>
        </div>
        {servicesLoading ? (
          <p className="muted-text">Memeriksa layanan...</p>
        ) : services.length === 0 ? (
          <p className="muted-text">Data service belum tersedia. Pastikan backend API berjalan.</p>
        ) : (
          <div className="dashboard-grid dashboard-grid-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section animate-in" id="access">
        <div className="section-heading">
          <span>Shortcuts</span>
          <h2>Quick Access</h2>
        </div>
        <QuickAccessCard services={services} />
      </section>

      <TopologySection topology={topology} />

      <section className="dashboard-section animate-in" id="server-info">
        <div className="section-heading">
          <span>Details</span>
          <h2>Infrastructure</h2>
        </div>
        <div className="dashboard-grid dashboard-grid-3">
          <DateTimeCard serviceSummary={serviceSummary} sysinfo={sysinfo} />
          <SysInfoCard sysinfo={sysinfo} />
          <DiskCard disk={disk} loading={diskLoading} />
        </div>
      </section>
    </DashboardLayout>
  );
}
