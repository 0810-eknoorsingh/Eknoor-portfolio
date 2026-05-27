import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { T, Stagger, itemV, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

function TiltCard({ children }) {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rx = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const ry = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left - r.width  / 2) / r.width);
    rawY.set((e.clientY - r.top  - r.height / 2) / r.height);
  };
  const reset = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div ref={ref} style={{ rotateX:rx, rotateY:ry, transformStyle:"preserve-3d", perspective:1000 }}
      onMouseMove={handleMove} onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding:"120px 40px", background:T.bg, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", left:-20, top:-20, fontFamily:T.display, fontWeight:800, fontSize:"22vw", color:"rgba(255,255,255,0.015)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>04</div>

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
        <SectionHeader label="Projects" title="What I've built" desc="Production-grade systems I architected and developed end-to-end." />

        <Stagger style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }} className="proj-grid">
          {data.projects.map((proj) => (
            <motion.div key={proj.number} variants={itemV}>
              <TiltCard>
                <motion.div
                  whileHover={{ borderColor:T.accentBorder, boxShadow:`0 24px 70px rgba(0,0,0,.6), 0 0 40px ${T.accentGlow}` }}
                  transition={{ duration:0.3 }}
                  style={{ background:"rgba(12,12,18,0.85)", border:`1px solid ${T.border}`, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderRadius:20, padding:"36px 34px", display:"flex", flexDirection:"column", height:"100%", position:"relative", overflow:"hidden" }}
                  className="proj-card"
                >
                  {/* Animated top line */}
                  <motion.div
                    initial={{ scaleX:0 }}
                    whileHover={{ scaleX:1 }}
                    transition={{ duration:0.4 }}
                    style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${T.accent}, transparent)`, transformOrigin:"left" }}
                  />
                  {/* Corner glow */}
                  <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle, ${T.accentGlow} 0%, transparent 65%)`, pointerEvents:"none" }}/>

                  {/* Project number */}
                  <div style={{ position:"absolute", top:24, right:28, fontFamily:T.mono, fontSize:"3.5rem", fontWeight:700, color:"rgba(255,255,255,0.04)", lineHeight:1, userSelect:"none" }}>{proj.number}</div>

                  <span style={{ fontFamily:T.mono, fontSize:"0.72rem", color:T.dim, marginBottom:14, display:"block" }}>{proj.number} / Project</span>
                  <h3 className="font-display" style={{ fontFamily:T.display, fontWeight:700, fontSize:"1.18rem", color:T.text, marginBottom:12, lineHeight:1.3 }}>{proj.title}</h3>
                  <p style={{ fontSize:"0.88rem", color:T.muted, lineHeight:1.75, marginBottom:20, flex:1 }}>{proj.description}</p>

                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8, marginBottom:22 }}>
                    {proj.highlights.map((h, i) => (
                      <li key={i} style={{ display:"flex", gap:8, fontSize:"0.81rem", color:T.muted, lineHeight:1.55 }}>
                        <span style={{ color:T.accent, flexShrink:0 }}>→</span>{h}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:"auto" }}>
                    {proj.tech.map((t) => (
                      <span key={t} style={{ padding:"3px 10px", background:"rgba(0,212,255,0.05)", border:`1px solid rgba(0,212,255,0.15)`, borderRadius:5, fontSize:"0.73rem", color:T.accent, fontFamily:T.mono }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </Stagger>
      </div>
      <style>{`
        @media(max-width:1024px){ .proj-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:640px){ #projects{ padding:80px 24px !important; } .proj-card{ padding:26px 22px !important; } }
      `}</style>
    </section>
  );
}
