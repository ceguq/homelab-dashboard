import { useEffect, useState } from "react";

const STORAGE_KEY = "homelab-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem(STORAGE_KEY) ?? "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
