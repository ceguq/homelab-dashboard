import { useState, useEffect } from "react";

export function useServices(intervalMs = 10000) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setServices(data);
    } catch {
      // Gagal — pertahankan data lama, jangan crash
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    const id = setInterval(fetchServices, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return { services, loading, refetch: fetchServices };
}
