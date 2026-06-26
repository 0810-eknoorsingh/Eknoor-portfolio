import { motion } from "framer-motion";
import { T, Stagger, itemV, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

export default function Skills() {
  return (
    <section id="skills" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 bg-bg relative overflow-hidden">
      {/* Ghost */}
      <div className="absolute -left-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color:"var(--ghost-text)" }}>02</div>

      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader label="Tech Stack" title="Technologies I work with" desc="Tools and frameworks I use to build scalable, production-ready applications." />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {data.skills.map((cat) => (
            <motion.div
              key={cat.name}
              variants={itemV}
              whileHover={{ y:-4, borderColor:T.accentBorder, boxShadow:`0 12px 40px rgba(0,0,0,.4), 0 0 20px ${T.accentGlow}` }}
              transition={{ duration:0.25 }}
              style={{ background:T.card, border:`1px solid ${T.border}`, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderRadius:16, padding:26, overflow:"hidden", position:"relative" }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-40" style={{ background:`linear-gradient(90deg, transparent, ${T.accent}, transparent)` }}/>
              {/* Header */}
              <div className="flex items-center gap-3 mb-[18px]">
                <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center text-base shrink-0" style={{ background:T.accentDim, border:`1px solid ${T.accentBorder}` }}>
                  {cat.icon}
                </div>
                <span className="font-display font-semibold text-[0.94rem] text-text">{cat.name}</span>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {cat.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ background:T.accentDim, borderColor:T.accentBorder, color:T.accent }}
                    transition={{ duration:0.15 }}
                    className="inline-block px-[11px] py-[3px] rounded-[5px] text-[0.76rem] text-muted font-mono cursor-default whitespace-nowrap"
                    style={{ background:T.tagBg, border:`1px solid ${T.tagBorder}` }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
