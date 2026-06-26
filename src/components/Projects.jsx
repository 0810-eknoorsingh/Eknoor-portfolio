import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { T, Stagger, itemV, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

/* ── 3-D tilt card ── */
function TiltCard({ children }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rx = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const ry = useSpring(useTransform(rawX, [-0.5, 0.5], [-5,  5]), { stiffness: 300, damping: 30 });
  const move = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left - r.width  / 2) / r.width);
    rawY.set((e.clientY - r.top  - r.height / 2) / r.height);
  };
  return (
    <motion.div ref={ref} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={move} onMouseLeave={() => { rawX.set(0); rawY.set(0); }}>
      {children}
    </motion.div>
  );
}

/* ── Mouse spotlight on card ── */
function SpotlightCard({ children, style, className }) {
  const ref = useRef(null);
  const [spot, setSpot] = useState({ x: "50%", y: "50%", opacity: 0 });
  const move = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setSpot({ x: `${e.clientX - r.left}px`, y: `${e.clientY - r.top}px`, opacity: 1 });
  };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={() => setSpot(s => ({ ...s, opacity: 0 }))}
      className={className} style={{ position: "relative", overflow: "hidden", ...style }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(300px circle at ${spot.x} ${spot.y}, rgba(0,212,255,0.07) 0%, transparent 70%)`,
        opacity: spot.opacity, transition: "opacity 0.3s",
      }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

/* ── Architecture flow diagram ── */
function ArchDiagram({ layers }) {
  return (
    <div style={{ marginTop: "1.4rem" }}>
      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: T.dim, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.9rem" }}>
        Architecture
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0" }}>
        {layers.map((l, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
              padding: "8px 14px", borderRadius: "8px",
              background: T.watermark,
              border: `1px solid ${l.color}28`,
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: l.color, fontWeight: 600 }}>{l.label}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.60rem", color: T.dim }}>{l.layer}</span>
            </div>
            {i < layers.length - 1 && (
              <span style={{ color: T.dim, fontSize: "0.75rem", padding: "0 6px", flexShrink: 0 }}>→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Expandable case study panel ── */
function CaseStudy({ cs, architecture }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ overflow: "hidden" }}
    >
      <div style={{ borderTop: `1px solid ${T.border}`, marginTop: "1.4rem", paddingTop: "1.4rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>

        {/* Problem */}
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#f87171", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.45rem" }}>Problem</p>
          <p style={{ fontSize: "0.84rem", color: T.muted, lineHeight: 1.75 }}>{cs.problem}</p>
        </div>

        {/* Solution */}
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#00ff88", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.45rem" }}>Solution</p>
          <p style={{ fontSize: "0.84rem", color: T.muted, lineHeight: 1.75 }}>{cs.solution}</p>
        </div>

        {/* Challenges */}
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#f59e0b", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.55rem" }}>Challenges</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {cs.challenges.map((c, i) => (
              <li key={i} style={{ display: "flex", gap: "0.6rem", fontSize: "0.82rem", color: T.muted, lineHeight: 1.65 }}>
                <span style={{ color: "#f59e0b", flexShrink: 0, marginTop: "2px" }}>▸</span>{c}
              </li>
            ))}
          </ul>
        </div>

        {/* Results */}
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.55rem" }}>Results</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            {cs.results.map((r, i) => (
              <li key={i} style={{ display: "flex", gap: "0.6rem", fontSize: "0.82rem", color: T.muted, lineHeight: 1.65 }}>
                <span style={{ color: T.accent, flexShrink: 0 }}>✓</span>{r}
              </li>
            ))}
          </ul>
        </div>

        {/* Architecture */}
        <ArchDiagram layers={architecture} />
      </div>
    </motion.div>
  );
}

/* ── Single project card ── */
function ProjectCard({ proj }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={itemV}>
      <TiltCard>
        <SpotlightCard
          className="flex flex-col h-full"
          style={{
            background: T.cardBg,
            border: `1px solid ${open ? T.accentBorder : T.border}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: 20,
            padding: "34px",
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: open ? `0 24px 70px rgba(0,0,0,.6), 0 0 40px ${T.accentGlow}` : "none",
          }}
        >
          {/* Animated top accent line */}
          <motion.div
            animate={{ scaleX: open ? 1 : 0 }}
            initial={{ scaleX: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)`,
              transformOrigin: "left", borderRadius: "20px 20px 0 0",
            }}
          />

          {/* Corner glow */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", pointerEvents: "none", background: `radial-gradient(circle, ${T.accentGlow} 0%, transparent 65%)` }} />

          {/* Project number watermark */}
          <div style={{ position: "absolute", top: 16, right: 24, fontFamily: "'JetBrains Mono', monospace", fontSize: "3.2rem", fontWeight: 700, color: T.watermark, lineHeight: 1, userSelect: "none" }}>
            {proj.number}
          </div>

          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.70rem", color: T.dim, marginBottom: "12px", display: "block" }}>{proj.number} / Project</span>
          <h3 style={{ fontFamily: T.display, fontWeight: 700, fontSize: "1.15rem", color: T.text, marginBottom: "10px", lineHeight: 1.3 }}>{proj.title}</h3>
          <p style={{ fontSize: "0.87rem", color: T.muted, lineHeight: 1.75, marginBottom: "18px", flex: open ? "none" : 1 }}>{proj.description}</p>

          {/* Highlights */}
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            {proj.highlights.map((h, i) => (
              <li key={i} style={{ display: "flex", gap: "8px", fontSize: "0.80rem", color: T.muted, lineHeight: 1.55 }}>
                <span style={{ color: T.accent, flexShrink: 0 }}>→</span>{h}
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "20px" }}>
            {proj.tech.map((t) => (
              <span key={t} style={{ padding: "3px 10px", borderRadius: 5, fontSize: "0.72rem", color: T.accent, fontFamily: "'JetBrains Mono', monospace", background: T.accentDim, border: `1px solid ${T.accentBorder}` }}>
                {t}
              </span>
            ))}
          </div>

          {/* Case study toggle */}
          {proj.caseStudy && (
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: open ? T.accentDim : T.tagBg,
                border: `1px solid ${open ? T.accentBorder : T.subtleBorder}`,
                borderRadius: "8px", padding: "8px 16px", cursor: "pointer",
                fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: "0.78rem",
                color: open ? T.accent : T.muted,
                transition: "all 0.25s", width: "fit-content",
              }}
            >
              <span style={{ fontSize: "0.7rem", transition: "transform 0.3s", transform: open ? "rotate(90deg)" : "none", display: "inline-block" }}>▶</span>
              {open ? "Hide Case Study" : "Explore Case Study"}
            </button>
          )}

          {/* Expandable case study */}
          <AnimatePresence initial={false}>
            {open && proj.caseStudy && (
              <CaseStudy cs={proj.caseStudy} architecture={proj.architecture} />
            )}
          </AnimatePresence>
        </SpotlightCard>
      </TiltCard>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 bg-bg relative overflow-hidden">
      <div className="absolute -left-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color: "var(--ghost-text)" }}>04</div>

      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader label="Projects" title="What I've built" desc="Production-grade systems architected end-to-end. Click 'Explore Case Study' on any card for the full breakdown." />

        <Stagger className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.projects.map((proj) => (
            <ProjectCard key={proj.number} proj={proj} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
