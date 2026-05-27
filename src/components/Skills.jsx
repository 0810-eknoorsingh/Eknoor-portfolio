import { motion } from "framer-motion";
import { T, Stagger, itemV, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

export default function Skills() {
  return (
    <section id="skills" style={{ padding:"120px 40px", background:T.bg, position:"relative", overflow:"hidden" }}>
      {/* Ghost */}
      <div style={{ position:"absolute", left:-20, top:-20, fontFamily:T.display, fontWeight:800, fontSize:"22vw", color:"rgba(255,255,255,0.015)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>02</div>

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
        <SectionHeader label="Tech Stack" title="Technologies I work with" desc="Tools and frameworks I use to build scalable, production-ready applications." />

        <Stagger style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:18 }} className="skills-grid">
          {data.skills.map((cat) => (
            <motion.div
              key={cat.name}
              variants={itemV}
              whileHover={{ y:-4, borderColor:T.accentBorder, boxShadow:`0 12px 40px rgba(0,0,0,.4), 0 0 20px ${T.accentGlow}` }}
              transition={{ duration:0.25 }}
              style={{ background:T.card, border:`1px solid ${T.border}`, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderRadius:16, padding:26, overflow:"hidden", position:"relative" }}
            >
              {/* Top accent line */}
              <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${T.accent}, transparent)`, opacity:0.4 }}/>
              {/* Header */}
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                <div style={{ width:38, height:38, background:T.accentDim, border:`1px solid rgba(0,212,255,0.15)`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", flexShrink:0 }}>
                  {cat.icon}
                </div>
                <span style={{ fontFamily:T.display, fontWeight:600, fontSize:"0.94rem", color:T.text }}>{cat.name}</span>
              </div>
              {/* Tags — contained inside the card */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {cat.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ background:T.accentDim, borderColor:"rgba(0,212,255,0.3)", color:T.accent }}
                    transition={{ duration:0.15 }}
                    style={{ display:"inline-block", padding:"3px 11px", background:"rgba(255,255,255,0.04)", border:`1px solid rgba(255,255,255,0.08)`, borderRadius:5, fontSize:"0.76rem", color:T.muted, fontFamily:T.mono, cursor:"default", whiteSpace:"nowrap" }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
      <style>{`
        @media(max-width:1024px){ .skills-grid{ grid-template-columns:repeat(2,1fr) !important; } }
        @media(max-width:640px){ .skills-grid{ grid-template-columns:1fr !important; } #skills{ padding:80px 24px !important; } }
      `}</style>
    </section>
  );
}
