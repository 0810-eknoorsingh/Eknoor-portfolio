import { motion } from "framer-motion";
import { T } from "../theme";
import { SectionHeader } from "./SectionWrapper";
import { data } from "../data";

const accentCycle = ["#00d4ff", "#00ff88", "#a78bfa", "#00d4ff", "#f59e0b", "#00ff88"];

export default function Principles() {
  return (
    <section id="principles" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 relative overflow-hidden bg-bg">

      <div className="absolute -right-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color: "var(--ghost-text)" }}>05</div>

      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader label="Engineering" title="How I build systems" desc="The principles I apply to every codebase I touch — from first commit to production." />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {data.principles.map((p, i) => {
            const color = accentCycle[i % accentCycle.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                whileHover={{ y: -4, borderColor: `${color}40`, boxShadow: `0 16px 48px rgba(0,0,0,.5), 0 0 24px ${color}18` }}
                style={{
                  background: T.cardBg,
                  border: `1px solid ${T.border}`,
                  borderRadius: 16,
                  padding: "28px 28px 26px",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
                  cursor: "default",
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: `${color}12`,
                  border: `1px solid ${color}28`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.3rem", color: color,
                  marginBottom: "18px",
                  fontFamily: "monospace",
                }}>
                  {p.icon}
                </div>

                <h4 style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: T.text, marginBottom: "10px", lineHeight: 1.3 }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: "0.855rem", color: T.muted, lineHeight: 1.75 }}>
                  {p.desc}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.06 }}
                  style={{
                    height: "1px", marginTop: "18px",
                    background: `linear-gradient(90deg, ${color}60, transparent)`,
                    transformOrigin: "left",
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
