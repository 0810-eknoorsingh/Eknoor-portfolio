import { T } from "./SectionWrapper";
import { data } from "../data";

export default function Footer() {
  return (
    <footer style={{ borderTop:`1px solid ${T.border}`, padding:"24px 40px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <p style={{ fontFamily:T.mono, fontSize:"0.81rem", color:T.dim }}>
          Designed &amp; built by <span style={{color:T.accent}}>Eknoor Singh</span> · <span style={{color:T.accent}}>2025</span>
        </p>
        <div style={{ display:"flex", gap:20 }}>
          <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} style={{ color:T.dim, fontSize:"0.81rem", background:"none", border:"none", cursor:"pointer", transition:"color 0.2s" }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.dim}>
            Back to top ↑
          </button>
          <a href={`mailto:${data.email}`} style={{ color:T.dim, fontSize:"0.81rem", textDecoration:"none", transition:"color 0.2s" }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.dim}>Email</a>
        </div>
      </div>
      <style>{`@media(max-width:640px){ footer{ padding:20px 24px !important; } }`}</style>
    </footer>
  );
}
