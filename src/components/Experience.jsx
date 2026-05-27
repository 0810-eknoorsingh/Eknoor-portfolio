import { motion } from "framer-motion";
import { T, FadeUp, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

export default function Experience() {
  return (
    <section id="experience" style={{ padding:"120px 40px", background:T.surface, borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", right:-20, top:-20, fontFamily:T.display, fontWeight:800, fontSize:"22vw", color:"rgba(255,255,255,0.015)", lineHeight:1, userSelect:"none", pointerEvents:"none" }}>03</div>

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative" }}>
        <SectionHeader label="Experience" title="Where I've worked" />

        <FadeUp>
          {/* Timeline — left border + dot approach (no overlap) */}
          <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
            {data.experience.map((job, i) => (
              <div key={i} style={{ display:"flex", gap:0 }}>
                {/* Left: date column */}
                <div style={{ width:180, flexShrink:0, paddingRight:32, paddingTop:4, textAlign:"right" }} className="exp-meta">
                  <p style={{ fontFamily:T.mono, fontSize:"0.74rem", color:T.accent, marginBottom:3 }}>{job.period}</p>
                  <p style={{ fontSize:"0.75rem", color:T.dim }}>{job.location}</p>
                </div>

                {/* Center: timeline line + dot */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:32, flexShrink:0 }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background: job.current ? T.accent : T.dim, boxShadow: job.current ? `0 0 0 3px ${T.surface}, 0 0 0 4.5px ${T.accent}, 0 0 12px ${T.accentGlow}` : `0 0 0 3px ${T.surface}, 0 0 0 4.5px ${T.dim}`, flexShrink:0, marginTop:5 }}/>
                  {i < data.experience.length - 1 && <div style={{ width:1, flex:1, background:`linear-gradient(to bottom, rgba(0,212,255,0.3), rgba(255,255,255,0.06))`, margin:"8px 0 0" }}/>}
                </div>

                {/* Right: content */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{ flex:1, paddingLeft:32, paddingBottom: i < data.experience.length-1 ? 52 : 0 }}
                >
                  <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:10, marginBottom:4 }}>
                    <span style={{ fontFamily:T.display, fontWeight:600, fontSize:"1.08rem", color:T.text }}>{job.role}</span>
                    {job.current && (
                      <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:T.greenDim, border:`1px solid ${T.greenBorder}`, color:T.green, padding:"2px 10px", borderRadius:100, fontSize:"0.68rem", fontFamily:T.mono }}>
                        ● Current
                      </span>
                    )}
                  </div>
                  <p style={{ color:T.accent, fontSize:"0.85rem", fontWeight:500, marginBottom:14 }}>{job.company}</p>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                    {job.bullets.map((b, j) => (
                      <li key={j} style={{ display:"flex", gap:10, fontSize:"0.875rem", color:T.muted, lineHeight:1.65 }}>
                        <span style={{ color:T.accent, flexShrink:0, marginTop:2 }}>▸</span>
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
      <style>{`
        @media(max-width:768px){
          .exp-meta{ display:none !important; }
          #experience{ padding:80px 24px !important; }
        }
      `}</style>
    </section>
  );
}
