import { useState, useEffect, useRef, useCallback } from "react";

const MAX_POINTS = 20;

export function useStats(intervalMs = 2000) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState({ labels: [], cpu: [], ram: [], temp: [], rx: [], tx: [] });
  const timeoutRef = useRef(null);

  const pad = (n) => String(n).padStart(2, "0");
  const now = () => {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setStats(data);
      setError(null);
      setHistory((prev) => {
        const labels = [...prev.labels, now()].slice(-MAX_POINTS);
        const cpu    = [...prev.cpu,    data.cpu].slice(-MAX_POINTS);
        const ram    = [...prev.ram,    data.ram].slice(-MAX_POINTS);
        const temp   = [...prev.temp,   data.cpuTemp ?? null].slice(-MAX_POINTS);
        const rx     = [...prev.rx,     data.net?.rx ?? 0].slice(-MAX_POINTS);
        const tx     = [...prev.tx,     data.net?.tx ?? 0].slice(-MAX_POINTS);
        return { labels, cpu, ram, temp, rx, tx };
      });
    } catch (err) {
      setError(err.message);
    } finally {
      timeoutRef.current = setTimeout(fetchStats, intervalMs);
    }
  }, [intervalMs]);

  useEffect(() => {
    fetchStats();
    return () => clearTimeout(timeoutRef.current);
  }, [fetchStats]);

  return { stats, error, history };
}