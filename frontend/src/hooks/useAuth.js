import { useCallback, useEffect, useRef, useState } from "react";
import { checkAuth, login as loginRequest, logout as logoutRequest } from "../services/api.js";

export function useAuth() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const authCheckInFlightRef = useRef(false);

  const refreshAuth = useCallback(async () => {
    setChecking(true);

    try {
      const result = await checkAuth();
      setAuthenticated(Boolean(result.authenticated));
      setUser(result.user ?? null);
    } catch {
      setAuthenticated(false);
      setUser(null);
    } finally {
      setChecking(false);
    }
  }, []);

  const login = useCallback(async (username, password) => {
    const result = await loginRequest(username, password);
    const verified = await checkAuth();
    const isAuthenticated = Boolean(result.authenticated && verified.authenticated);

    setAuthenticated(isAuthenticated);
    setUser(verified.user ?? result.user ?? null);

    if (!isAuthenticated) {
      throw new Error("Session login belum tersimpan. Coba refresh halaman lalu login ulang.");
    }

    return verified;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      setAuthenticated(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  useEffect(() => {
    let active = true;

    const handleUnauthorized = async () => {
      if (authCheckInFlightRef.current) return;
      authCheckInFlightRef.current = true;

      try {
        const result = await checkAuth();
        if (!active) return;

        setAuthenticated(Boolean(result.authenticated));
        setUser(result.user ?? null);
      } catch {
        if (!active) return;
        setAuthenticated(false);
        setUser(null);
      } finally {
        authCheckInFlightRef.current = false;
        if (active) setChecking(false);
      }
    };

    window.addEventListener("dashboard:unauthorized", handleUnauthorized);
    return () => {
      active = false;
      window.removeEventListener("dashboard:unauthorized", handleUnauthorized);
    };
  }, []);

  return { checking, authenticated, user, login, logout, refreshAuth };
}
