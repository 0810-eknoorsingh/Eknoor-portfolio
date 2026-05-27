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
    <section id="projects" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 bg-bg relative overflow-hidden">
      <div className="absolute -left-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color:"rgba(255,255,255,0.015)" }}>04</div>

      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader label="Projects" title="What I've built" desc="Production-grade systems I architected and developed end-to-end." />

        <Stagger className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.projects.map((proj) => (
            <motion.div key={proj.number} variants={itemV}>
              <TiltCard>
                <motion.div
                  whileHover={{ borderColor:T.accentBorder, boxShadow:`0 24px 70px rgba(0,0,0,.6), 0 0 40px ${T.accentGlow}` }}
                  transition={{ duration:0.3 }}
                  className="flex flex-col h-full relative overflow-hidden px-[34px] py-[36px] max-sm:px-[22px] max-sm:py-[26px]"
                  style={{ background:"rgba(12,12,18,0.85)", border:`1px solid ${T.border}`, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderRadius:20 }}
                >
                  {/* Animated top line */}
                  <motion.div
                    initial={{ scaleX:0 }}
                    whileHover={{ scaleX:1 }}
                    transition={{ duration:0.4 }}
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background:`linear-gradient(90deg, transparent, ${T.accent}, transparent)`, transformOrigin:"left" }}
                  />
                  {/* Corner glow */}
                  <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full pointer-events-none" style={{ background:`radial-gradient(circle, ${T.accentGlow} 0%, transparent 65%)` }}/>

                  {/* Project number */}
                  <div className="absolute top-6 right-7 font-mono text-[3.5rem] font-bold leading-none select-none" style={{ color:"rgba(255,255,255,0.04)" }}>{proj.number}</div>

                  <span className="font-mono text-[0.72rem] text-dim mb-[14px] block">{proj.number} / Project</span>
                  <h3 className="font-display font-bold text-[1.18rem] text-text mb-3 leading-[1.3]">{proj.title}</h3>
                  <p className="text-[0.88rem] text-muted leading-[1.75] mb-5 flex-1">{proj.description}</p>

                  <ul className="list-none flex flex-col gap-2 mb-[22px]">
                    {proj.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-[0.81rem] text-muted leading-[1.55]">
                        <span className="text-accent shrink-0">→</span>{h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-[7px] mt-auto">
                    {proj.tech.map((t) => (
                      <span key={t} className="px-[10px] py-[3px] rounded-[5px] text-[0.73rem] text-accent font-mono" style={{ background:"rgba(0,212,255,0.05)", border:`1px solid rgba(0,212,255,0.15)` }}>
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
    </section>
  );
}
