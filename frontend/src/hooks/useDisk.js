import { useEffect, useState } from "react";
import { getDisk } from "../services/api.js";

export function useDisk(intervalMs = 10000) {
  const [disk, setDisk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadDisk = async () => {
      try {
        const data = await getDisk();
        if (active) setDisk(data);
        if (active) setError(null);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDisk();
    const id = setInterval(loadDisk, intervalMs);

    return () => {
      active = false;
      clearInterval(id);
    };
  }, [intervalMs]);

  return { disk, loading, error };
}
