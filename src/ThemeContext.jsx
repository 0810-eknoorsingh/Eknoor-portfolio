import { useEffect, useState } from "react";
import { ThemeCtx } from "./theme";

const THEME_COLOR = { dark: "#060608", light: "#f8fafc" };

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("portfolio-theme") !== "light"; }
    catch { return true; }
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    // Keep the browser UI (mobile address bar) in sync with the active theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
    try { localStorage.setItem("portfolio-theme", theme); }
    catch { /* localStorage unavailable (private mode) — theme just won't persist */ }
  }, [isDark]);

  return (
    <ThemeCtx.Provider value={{ isDark, toggleTheme: () => setIsDark(d => !d) }}>
      {children}
    </ThemeCtx.Provider>
  );
}
