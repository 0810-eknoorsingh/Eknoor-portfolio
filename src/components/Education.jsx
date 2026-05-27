import { motion } from "framer-motion";
import { T, FadeUp, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

export default function Education() {
  const edu = data.education;
  return (
    <section id="education" style={{ padding:"120px 40px", background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:-20, top:-20, fontFamily:T.display, fontWeight:800, fontSize:"22vw", color:"rgba(255,255,255,0.015)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>05</div>

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
        <SectionHeader label="Education" title="Academic background" />

        <FadeUp>
          <motion.div
            whileHover={{ borderColor:T.accentBorder, boxShadow:`0 20px 60px rgba(0,0,0,.4), 0 0 30px ${T.accentGlow}` }}
            transition={{ duration:0.3 }}
            style={{ background:"rgba(12,12,18,0.8)", border:`1px solid ${T.border}`, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", borderRadius:20, padding:"40px 44px", display:"grid", gridTemplateColumns:"1fr auto", gap:32, alignItems:"start", position:"relative", overflow:"hidden" }}
            className="edu-card"
          >
            {/* Top gradient line */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${T.accent}, transparent)` }}/>
            {/* Corner glow */}
            <div style={{ position:"absolute", bottom:-80, right:-80, width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)`, pointerEvents:"none" }}/>

            <div>
              <h3 className="font-display" style={{ fontFamily:T.display, fontWeight:700, fontSize:"1.3rem", color:T.text, marginBottom:6 }}>{edu.school}</h3>
              <p style={{ color:T.accent, fontWeight:500, fontSize:"0.98rem", marginBottom:10 }}>{edu.degree}</p>
              <p style={{ fontSize:"0.85rem", color:T.muted, marginBottom:22 }}>
                {edu.location} &nbsp;·&nbsp; {edu.period}
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {edu.courses.map((c) => (
                  <span key={c} style={{ padding:"4px 12px", background:"rgba(255,255,255,0.04)", border:`1px solid rgba(255,255,255,0.08)`, borderRadius:6, fontSize:"0.76rem", color:T.muted }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ textAlign:"right" }}>
              <p style={{ fontFamily:T.display, fontWeight:700, fontSize:"2.5rem", color:T.accent, lineHeight:1 }}>{edu.cgpa}</p>
              <p style={{ fontSize:"0.78rem", color:T.dim, marginTop:4 }}>CGPA</p>
              <p style={{ fontFamily:T.mono, fontSize:"0.73rem", color:T.dim, marginTop:12 }}>2021 — 2024</p>
            </div>
          </motion.div>
        </FadeUp>
      </div>
      <style>{`
        @media(max-width:768px){ .edu-card{ grid-template-columns:1fr !important; padding:28px 24px !important; } .edu-card > div:last-child{ text-align:left !important; } }
        @media(max-width:640px){ #education{ padding:80px 24px !important; } }
      `}</style>
    </section>
  );
}
