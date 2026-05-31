import { useState, useEffect } from "react";

export default function DiskCard() {
  const [disk, setDisk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => fetch("/api/disk").then(r => r.ok ? r.json() : null).then(d => { setDisk(d); setLoading(false); }).catch(() => setLoading(false));
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);

  const barColor = (pct) => pct >= 90 ? "var(--red)" : pct >= 75 ? "var(--orange)" : "#38bdf8";

  return (
    <div className="dashboard-card disk-card">
      <div className="card-title">
        <i className="ti ti-database" style={{ fontSize: 15 }} aria-hidden="true" /> Disk Usage
      </div>
      {loading ? <p style={{ color: "var(--text-3)", fontSize: 13 }}>Memuat...</p> : !disk ? (
        <p style={{ color: "var(--text-3)", fontSize: 13 }}>Data disk tidak tersedia</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
              <span style={{ color: "var(--text-2)" }}>Total usage</span>
              <span style={{ color: barColor(disk.usePct), fontWeight: 600 }}>{disk.usePct}%</span>
            </div>
            <div style={{ height: 6, background: "#1e293b", borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: `${disk.usePct}%`, height: "100%", background: barColor(disk.usePct), borderRadius: 6, transition: "width 0.5s ease" }} />
            </div>
          </div>
          <div className="disk-summary">
            <span><b>{disk.total}</b> GB Total</span>
            <span><b>{disk.used}</b> GB Used</span>
            <span><b>{disk.free}</b> GB Free</span>
          </div>
          {disk.drives?.map(d => (
            <div key={d.mount}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-2)" }}>{d.mount}</span>
                <span style={{ color: "var(--text-3)" }}>
                  {d.used}/{d.size} GB <span style={{ color: barColor(d.usePct), fontWeight: 500 }}>{d.usePct}%</span>
                </span>
              </div>
              <div style={{ height: 4, background: "#1e293b", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${d.usePct}%`, height: "100%", background: barColor(d.usePct), borderRadius: 2, transition: "width 0.5s ease" }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
