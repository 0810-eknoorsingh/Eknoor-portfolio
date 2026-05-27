import { motion } from "framer-motion";
import { T, FadeUp, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

export default function Experience() {
  return (
    <section id="experience" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 bg-surface relative overflow-hidden border-y border-border">
      <div className="absolute -right-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color:"rgba(255,255,255,0.015)" }}>03</div>

      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader label="Experience" title="Where I've worked" />

        <FadeUp>
          <div className="flex flex-col gap-0">
            {data.experience.map((job, i) => (
              <div key={i} className="flex gap-0">
                {/* Left: date column — hidden on mobile */}
                <div className="hidden md:block w-[180px] shrink-0 pr-8 pt-1 text-right">
                  <p className="font-mono text-[0.74rem] text-accent mb-[3px]">{job.period}</p>
                  <p className="text-[0.75rem] text-dim">{job.location}</p>
                </div>

                {/* Center: timeline line + dot */}
                <div className="flex flex-col items-center w-8 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-[5px]" style={{ background: job.current ? T.accent : T.dim, boxShadow: job.current ? `0 0 0 3px ${T.surface}, 0 0 0 4.5px ${T.accent}, 0 0 12px ${T.accentGlow}` : `0 0 0 3px ${T.surface}, 0 0 0 4.5px ${T.dim}` }}/>
                  {i < data.experience.length - 1 && <div className="w-px flex-1 mt-2" style={{ background:`linear-gradient(to bottom, rgba(0,212,255,0.3), rgba(255,255,255,0.06))` }}/>}
                </div>

                {/* Right: content */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 pl-8"
                  style={{ paddingBottom: i < data.experience.length-1 ? 52 : 0 }}
                >
                  <div className="flex items-center flex-wrap gap-[10px] mb-1">
                    <span className="font-display font-semibold text-[1.08rem] text-text">{job.role}</span>
                    {job.current && (
                      <span className="inline-flex items-center gap-[5px] px-[10px] py-[2px] rounded-full text-[0.68rem] font-mono text-green" style={{ background:T.greenDim, border:`1px solid ${T.greenBorder}` }}>
                        ● Current
                      </span>
                    )}
                  </div>
                  <p className="text-accent text-[0.85rem] font-medium mb-[14px]">{job.company}</p>
                  <ul className="list-none flex flex-col gap-[10px]">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-[10px] text-[0.875rem] text-muted leading-[1.65]">
                        <span className="text-accent shrink-0 mt-0.5">▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
