import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { T, FadeUp, Stagger, itemV, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref  = useRef(null);
  const inV  = useInView(ref, { once: true });
  useEffect(() => {
    if (!inV) return;
    let n = 0;
    const step = target / 36;
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(n));
    }, 28);
    return () => clearInterval(t);
  }, [inV, target]);
  return (
    <span ref={ref} className="font-display font-bold text-[2.5rem] leading-none text-accent">
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 bg-surface relative overflow-hidden border-y border-border">
      {/* Ghost number */}
      <div className="absolute -right-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color:"rgba(255,255,255,0.015)" }}>01</div>

      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader label="About Me" title={<>Building reliable software<br/>for real-world problems</>} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-center max-lg:gap-11">
          {/* Text */}
          <FadeUp>
            <div className="flex flex-col gap-[18px]">
              {data.about.map((p, i) => (
                <p key={i} className="text-muted leading-[1.9] text-[0.97rem]" dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </FadeUp>

          {/* Stats */}
          <Stagger className="grid grid-cols-2 gap-[14px]">
            {data.stats.map((s) => (
              <motion.div
                key={s.label}
                variants={itemV}
                whileHover={{ y:-4, borderColor:T.accentBorder, boxShadow:`0 0 28px ${T.accentGlow}` }}
                transition={{ duration:0.25 }}
                style={{ background:T.card, border:`1px solid ${T.border}`, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderRadius:14, padding:"22px 20px", cursor:"default" }}
              >
                <Counter target={s.value} suffix={s.suffix} />
                <p className="text-muted text-[0.82rem] mt-1.5 leading-[1.5]">{s.label}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
