import { motion } from "framer-motion";
import { T } from "../theme";
import { SectionHeader } from "./SectionWrapper";
import { data } from "../data";

/* Literal hex values only — these get hex-alpha suffixes appended below
   (`${color}14`), which breaks silently with CSS var() references. */
const typeColor = {
  education: "#a78bfa",
  work:      "#00d4ff",
  milestone: "#00ff88",
  project:   "#f59e0b",
};

const typeLabel = {
  education: "Education",
  work:      "Career",
  milestone: "Milestone",
  project:   "Project",
};

export default function Timeline() {
  return (
    <section id="timeline" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 relative overflow-hidden bg-bg">

      <div className="absolute -left-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color: "var(--ghost-text)" }}>07</div>

      <div className="max-w-[860px] mx-auto relative">
        <SectionHeader label="Journey" title="How I got here" desc="Key moments that shaped the engineer I am today." />

        {/* Vertical timeline */}
        <div style={{ position: "relative", paddingLeft: "2px" }}>

          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{
              position: "absolute", left: 19, top: 0, bottom: 0,
              width: "1px",
              background: `linear-gradient(to bottom, transparent, ${T.border} 8%, ${T.border} 92%, transparent)`,
              transformOrigin: "top",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {data.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                style={{ display: "flex", gap: "28px", paddingBottom: i < data.timeline.length - 1 ? "40px" : 0 }}
              >
                {/* Dot */}
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    marginTop: "6px",
                    background: typeColor[item.type] ?? T.accent,
                    boxShadow: `0 0 10px ${typeColor[item.type] ?? T.accent}`,
                    border: `2px solid ${typeColor[item.type] ?? T.accent}`,
                    flexShrink: 0,
                  }} />
                </div>

                {/* Content */}
                <div style={{ paddingBottom: "4px" }}>
                  {/* Year + type badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: typeColor[item.type] ?? T.accent, fontWeight: 600 }}>
                      {item.year}
                    </span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.60rem",
                      color: typeColor[item.type], background: `${typeColor[item.type]}14`,
                      border: `1px solid ${typeColor[item.type]}30`,
                      borderRadius: 4, padding: "1px 7px", textTransform: "uppercase", letterSpacing: "0.08em",
                    }}>
                      {typeLabel[item.type]}
                    </span>
                  </div>

                  <h4 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: "1.02rem", color: T.text, marginBottom: "6px", lineHeight: 1.3 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "0.84rem", color: T.muted, lineHeight: 1.70 }}>
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
