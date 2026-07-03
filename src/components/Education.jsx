import { motion } from "framer-motion";
import { T } from "../theme";
import { FadeUp, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

export default function Education() {
  const edu = data.education;
  return (
    <section id="education" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 bg-surface relative overflow-hidden border-y border-border">
      <div className="absolute -right-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color:"var(--ghost-text)" }}>08</div>

      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader label="Education" title="Academic background" />

        <FadeUp>
          <motion.div
            whileHover={{ borderColor:T.accentBorder, boxShadow:`0 20px 60px rgba(0,0,0,.4), 0 0 30px ${T.accentGlow}` }}
            transition={{ duration:0.3 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start relative overflow-hidden p-[40px_44px] max-md:p-[28px_24px]"
            style={{ background:T.cardBg, border:`1px solid ${T.border}`, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderRadius:20 }}
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background:`linear-gradient(90deg, transparent, ${T.accent}, transparent)` }}/>
            {/* Corner glow */}
            <div className="absolute -bottom-[80px] -right-[80px] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background:`radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)` }}/>

            <div>
              <h3 className="font-display font-bold text-[1.3rem] text-text mb-1.5">{edu.school}</h3>
              <p className="text-accent font-medium text-[0.98rem] mb-2.5">{edu.degree}</p>
              <p className="text-[0.85rem] text-muted mb-[22px]">
                {edu.location} &nbsp;·&nbsp; {edu.period}
              </p>
              <div className="flex flex-wrap gap-[7px]">
                {edu.courses.map((c) => (
                  <span key={c} className="px-3 py-1 rounded-[6px] text-[0.76rem] text-muted" style={{ background:T.tagBg, border:`1px solid ${T.tagBorder}` }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-right max-md:text-left">
              <p className="font-display font-bold text-[2.5rem] text-accent leading-none">{edu.cgpa}</p>
              <p className="text-[0.78rem] text-dim mt-1">CGPA</p>
              <p className="font-mono text-[0.73rem] text-dim mt-3">2021 — 2024</p>
            </div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}
