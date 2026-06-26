import { createContext, useContext, useEffect, useState } from "react";

const ThemeCtx = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem("portfolio-theme") !== "light"; }
    catch { return true; }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    try { localStorage.setItem("portfolio-theme", isDark ? "dark" : "light"); }
    catch {}
  }, [isDark]);

  return (
    <ThemeCtx.Provider value={{ isDark, toggleTheme: () => setIsDark(d => !d) }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
