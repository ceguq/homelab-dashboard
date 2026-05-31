import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

function makeDataset(label, data, color) {
  return {
    label, data,
    borderColor: color,
    backgroundColor: color + "12",
    borderWidth: 1.5, pointRadius: 0, tension: 0.4, fill: true,
  };
}

function baseOptions(unit, maxY) {
  return {
    responsive: true, maintainAspectRatio: false, animation: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index", intersect: false,
        backgroundColor: "#1e293b", borderColor: "#334155", borderWidth: 0.5,
        titleColor: "#94a3b8", bodyColor: "#e2e8f0", padding: 10,
        callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${Math.round(ctx.parsed.y)}${unit}` },
      },
    },
    scales: {
      x: { ticks: { color: "#475569", font: { size: 10 }, maxTicksLimit: 6 }, grid: { color: "rgba(255,255,255,0.04)" }, border: { display: false } },
      y: { min: 0, ...(maxY !== undefined ? { max: maxY } : {}), ticks: { color: "#475569", font: { size: 10 }, callback: (v) => v + unit }, grid: { color: "rgba(255,255,255,0.04)" }, border: { display: false } },
    },
  };
}

function Legend({ items }) {
  return (
    <div style={{ display: "flex", gap: 14, fontSize: 11, color: "var(--text-3)" }}>
      {items.map(({ label, color }) => (
        <span key={label}>
          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: color, marginRight: 5 }} />
          {label}
        </span>
      ))}
    </div>
  );
}

const cardStyle = { background: "var(--bg-surface)", border: "0.5px solid var(--border)", borderRadius: "var(--radius-md)", padding: "14px 16px" };

export default function RealtimeChart({ history }) {
  const empty = history.labels.length === 0;

  return (
    <div className="chart-grid">
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-1)" }}>CPU &amp; RAM</span>
          <Legend items={[{ label: "CPU", color: "#38bdf8" }, { label: "RAM", color: "#a78bfa" }]} />
        </div>
        <div style={{ height: 120, position: "relative" }}>
          {empty ? <p style={{ color: "var(--text-3)", fontSize: 13, textAlign: "center", paddingTop: 45 }}>Menunggu data...</p>
            : <Line data={{ labels: history.labels, datasets: [makeDataset("CPU", history.cpu, "#38bdf8"), makeDataset("RAM", history.ram, "#a78bfa")] }} options={baseOptions("%", 100)} />}
        </div>
      </div>
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-1)" }}>Jaringan</span>
          <Legend items={[{ label: "Download", color: "#22c55e" }, { label: "Upload", color: "#fb923c" }]} />
        </div>
        <div style={{ height: 120, position: "relative" }}>
          {empty ? <p style={{ color: "var(--text-3)", fontSize: 13, textAlign: "center", paddingTop: 45 }}>Menunggu data...</p>
            : <Line data={{ labels: history.labels, datasets: [makeDataset("Download", history.rx, "#22c55e"), makeDataset("Upload", history.tx, "#fb923c")] }} options={baseOptions(" KB/s")} />}
        </div>
      </div>
    </div>
  );
}
