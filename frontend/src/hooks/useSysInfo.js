import { useEffect, useState } from "react";
import { getSysInfo } from "../services/api.js";

export function useSysInfo() {
  const [sysinfo, setSysinfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getSysInfo()
      .then((data) => {
        if (active) setSysinfo(data);
        if (active) setError(null);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });

    return () => {
      active = false;
    };
  }, []);

  return { sysinfo, error };
}
