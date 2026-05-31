import { useEffect, useState } from "react";
import { getServices } from "../services/api.js";

export function useServices(intervalMs = 10000) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      // Pertahankan data terakhir agar dashboard tidak kosong saat polling gagal.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    const id = setInterval(fetchServices, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return { services, loading, error, refetch: fetchServices };
}
