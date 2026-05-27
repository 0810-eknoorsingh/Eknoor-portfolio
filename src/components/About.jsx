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
    <span ref={ref} style={{ fontFamily:T.display, fontWeight:700, fontSize:"2.5rem", lineHeight:1, color:T.accent }}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" style={{ padding:"120px 40px", background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, position:"relative", overflow:"hidden" }}>
      {/* Ghost number */}
      <div style={{ position:"absolute", right:-20, top:-20, fontFamily:T.display, fontWeight:800, fontSize:"22vw", color:"rgba(255,255,255,0.015)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>01</div>

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
        <SectionHeader label="About Me" title={<>Building reliable software<br/>for real-world problems</>} />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }} className="about-grid">
          {/* Text */}
          <FadeUp>
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {data.about.map((p, i) => (
                <p key={i} style={{ color:T.muted, lineHeight:1.9, fontSize:"0.97rem" }} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </FadeUp>

          {/* Stats */}
          <Stagger className="stats-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {data.stats.map((s) => (
              <motion.div
                key={s.label}
                variants={itemV}
                whileHover={{ y:-4, borderColor:T.accentBorder, boxShadow:`0 0 28px ${T.accentGlow}` }}
                transition={{ duration:0.25 }}
                style={{ background:T.card, border:`1px solid ${T.border}`, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderRadius:14, padding:"22px 20px", cursor:"default" }}
              >
                <Counter target={s.value} suffix={s.suffix} />
                <p style={{ color:T.muted, fontSize:"0.82rem", marginTop:6, lineHeight:1.5 }}>{s.label}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
      <style>{`
        @media(max-width:1024px){ .about-grid{ grid-template-columns:1fr !important; gap:44px !important; } }
        @media(max-width:640px){ #about{ padding:80px 24px !important; } .stats-grid{ grid-template-columns:1fr 1fr !important; } }
      `}</style>
    </section>
  );
}
