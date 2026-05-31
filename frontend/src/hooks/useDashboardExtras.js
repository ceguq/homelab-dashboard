import { useEffect, useState } from "react";
import { getActivity, getBackupStatus, getDocker, getTopology, getTunnel } from "../services/api.js";

const INITIAL_STATE = {
  docker: null,
  activity: [],
  tunnel: null,
  topology: null,
  backup: null,
  error: null,
};

export function useDashboardExtras(intervalMs = 10000) {
  const [state, setState] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const results = await Promise.allSettled([
          getDocker(),
          getActivity(),
          getTunnel(),
          getTopology(),
          getBackupStatus(),
        ]);

      if (!active) return;

      setState((current) => ({
        docker: results[0].status === "fulfilled" ? results[0].value : current.docker,
        activity: results[1].status === "fulfilled" ? results[1].value : current.activity,
        tunnel: results[2].status === "fulfilled" ? results[2].value : current.tunnel,
        topology: results[3].status === "fulfilled" ? results[3].value : current.topology,
        backup: results[4].status === "fulfilled" ? results[4].value : current.backup,
        error: results.find((item) => item.status === "rejected")?.reason?.message ?? null,
      }));

      setLoading(false);
    };

    load();
    const id = setInterval(load, intervalMs);

    return () => {
      active = false;
      clearInterval(id);
    };
  }, [intervalMs]);

  return { ...state, loading };
}
