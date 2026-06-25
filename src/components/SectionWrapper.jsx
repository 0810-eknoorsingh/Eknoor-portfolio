import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* Shared design tokens used across all components */
export const T = {
  accent:      "#00d4ff",
  accentDim:   "rgba(0,212,255,0.08)",
  accentGlow:  "rgba(0,212,255,0.18)",
  accentBorder:"rgba(0,212,255,0.25)",
  green:       "#00ff88",
  greenDim:    "rgba(0,255,136,0.08)",
  greenBorder: "rgba(0,255,136,0.22)",
  bg:          "#060608",
  surface:     "#0b0b0e",
  card:        "rgba(255,255,255,0.025)",
  cardSolid:   "#0f0f14",
  border:      "rgba(255,255,255,0.07)",
  borderHover: "rgba(0,212,255,0.28)",
  text:        "#e2e8f0",
  muted:       "#7a8599",
  dim:         "#3d4556",
  display:     "'Barlow', sans-serif",
  mono:        "'JetBrains Mono', monospace",
};

/* ── Scroll reveal wrappers ── */
export function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.div>
  );
}

export const itemV = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.60, ease: [0.22, 1, 0.36, 1] } },
};

/* Stagger with larger child delay — for cards that need more breathing room */
export function StaggerGrid({ children, className = "", style = {}, delay = 0.12 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  return (
    <motion.div
      ref={ref} className={className} style={style}
      initial="hidden" animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

/* Slide in from left */
export function SlideLeft({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: -36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Slide in from right */
export function SlideRight({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Scale up reveal */
export function ScaleUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, scale: 0.93 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section label + heading ── */
export function SectionHeader({ label, title, desc, center = false }) {
  return (
    <FadeUp className={`mb-16 ${center ? "text-center" : ""}`}>
      <div
        className={`flex items-center gap-2.5 mb-3 ${center ? "justify-center" : ""}`}
        style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.accent, textTransform: "uppercase", letterSpacing: "0.14em" }}
      >
        {!center && <span style={{ display: "block", width: 22, height: 1, background: T.accent }} />}
        {label}
      </div>
      <h2
        className="font-display"
        style={{
          fontFamily: T.display,
          fontWeight: 700,
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          letterSpacing: "-0.028em",
          lineHeight: 1.1,
          marginBottom: desc ? 14 : 0,
          color: T.text,
        }}
      >
        {title}
      </h2>
      {desc && (
        <p style={{ color: T.muted, fontSize: "0.975rem", maxWidth: 520, lineHeight: 1.8 }}>{desc}</p>
      )}
    </FadeUp>
  );
}

/* ── Glassmorphism card base ── */
export function GlassCard({ children, className = "", style = {}, hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, borderColor: T.borderHover, boxShadow: `0 20px 60px rgba(0,0,0,.5), 0 0 30px ${T.accentGlow}` } : {}}
      transition={{ duration: 0.3 }}
      className={className}
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 18,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
