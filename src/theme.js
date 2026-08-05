import { createContext, useContext } from "react";

/* ── Theme context (provider lives in ThemeContext.jsx) ── */
export const ThemeCtx = createContext(null);
export const useTheme = () => useContext(ThemeCtx);

/* ── Shared design tokens — all values are CSS variables so light/dark theme updates automatically ── */
export const T = {
  accent:        "var(--color-accent)",
  accentDim:     "var(--color-accent-dim)",
  accentGlow:    "var(--color-accent-glow)",
  accentBorder:  "var(--color-accent-border)",
  green:         "var(--color-green)",
  greenDim:      "var(--color-green-dim)",
  greenBorder:   "var(--color-green-border)",
  bg:            "var(--color-bg)",
  surface:       "var(--color-surface)",
  card:          "var(--color-card)",
  cardSolid:     "var(--color-card-solid)",
  border:        "var(--color-border)",
  borderHover:   "var(--color-border-hover)",
  text:          "var(--color-text)",
  muted:         "var(--color-muted)",
  dim:           "var(--color-dim)",
  display:       "'Barlow', sans-serif",
  mono:          "'JetBrains Mono', monospace",
  // extra semantic vars for hardcoded rgba values in components
  ghost:         "var(--ghost-text)",
  dotGrid:       "var(--dot-grid)",
  tagBg:         "var(--tag-bg)",
  tagBorder:     "var(--tag-border)",
  subtleBorder:  "var(--subtle-border)",
  heroBtnBorder: "var(--hero-btn-border)",
  cardBg:        "var(--card-bg)",
  codeCard:      "var(--code-card)",
  watermark:     "var(--watermark)",
  navScrolledBg:   "var(--nav-scrolled-bg)",
  menuOverlayBg:   "var(--menu-overlay-bg)",
  btnPrimaryText:  "var(--btn-primary-text)",
};

/* ── Shared framer-motion variants ── */
export const itemV = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.22, 1, 0.36, 1] } },
};
