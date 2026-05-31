import { Chart as ChartJS, CategoryScale, Filler, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

function makeDataset(label, data, color) {
  return {
    label,
    data,
    borderColor: color,
    backgroundColor: `${color}18`,
    borderWidth: 2,
    pointRadius: 0,
    tension: 0.42,
    fill: true,
  };
}

function baseOptions(unit, maxY) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 280 },
    interaction: { intersect: false, mode: "index" },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#101826",
        borderColor: "#263244",
        borderWidth: 1,
        titleColor: "#94a3b8",
        bodyColor: "#e2e8f0",
        padding: 10,
        callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${Math.round(ctx.parsed.y)}${unit}` },
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { size: 10 }, maxTicksLimit: 8 },
        grid: { color: "rgba(148,163,184,0.08)" },
        border: { display: false },
      },
      y: {
        min: 0,
        ...(maxY !== undefined ? { max: maxY } : {}),
        ticks: { color: "#64748b", font: { size: 10 }, callback: (value) => `${value}${unit}` },
        grid: { color: "rgba(148,163,184,0.08)" },
        border: { display: false },
      },
    },
  };
}

function Legend({ items }) {
  return (
    <div className="chart-legend">
      {items.map(({ label, color }) => (
        <span key={label}>
          <i style={{ background: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}

export default function RealtimeChart({ history }) {
  const empty = history.labels.length === 0;

  return (
    <div className="chart-grid">
      <div className="dashboard-card chart-card">
        <div className="chart-header">
          <span>CPU & RAM</span>
          <Legend items={[{ label: "CPU", color: "#38bdf8" }, { label: "RAM", color: "#a78bfa" }]} />
        </div>
        <div className="chart-canvas">
          {empty ? (
            <p className="muted-text">Menunggu data...</p>
          ) : (
            <Line
              data={{
                labels: history.labels,
                datasets: [makeDataset("CPU", history.cpu, "#38bdf8"), makeDataset("RAM", history.ram, "#a78bfa")],
              }}
              options={baseOptions("%", 100)}
            />
          )}
        </div>
      </div>

      <div className="dashboard-card chart-card">
        <div className="chart-header">
          <span>Network</span>
          <Legend items={[{ label: "RX", color: "#22c55e" }, { label: "TX", color: "#fb923c" }]} />
        </div>
        <div className="chart-canvas">
          {empty ? (
            <p className="muted-text">Menunggu data...</p>
          ) : (
            <Line
              data={{
                labels: history.labels,
                datasets: [makeDataset("RX", history.rx, "#22c55e"), makeDataset("TX", history.tx, "#fb923c")],
              }}
              options={baseOptions(" KB/s")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
