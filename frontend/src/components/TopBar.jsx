import { useState, useEffect } from "react";

const pad = (n) => String(n).padStart(2, "0");

export default function TopBar({ sysinfo, allOnline }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header style={{
      background: "var(--bg-surface)",
      borderBottom: "0.5px solid var(--border)",
      padding: "10px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 0 6px var(--accent)",
          display: "inline-block",
        }} />
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, color: "var(--text-1)", fontSize: 15 }}>
          {sysinfo?.hostname ?? "Server"} <span style={{ color: "var(--text-3)", fontWeight: 400 }}>/ dashboard</span>
        </span>
      </div>

      {/* Kanan */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 13, color: "var(--text-2)" }}>
        <span>
          <span style={{
            display: "inline-block", width: 7, height: 7, borderRadius: "50%",
            background: allOnline ? "var(--green)" : "var(--red)",
            marginRight: 6, verticalAlign: "middle",
          }} />
          {allOnline ? "All systems operational" : "Degraded"}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-1)", fontSize: 14, minWidth: 72 }}>
          {time}
        </span>
      </div>
    </header>
  );
}
