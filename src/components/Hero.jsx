import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { T } from "./SectionWrapper";
import { data } from "../data";

/* ── Particle canvas ── */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let id;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.3 + 0.4, a: Math.random() * 0.3 + 0.05,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${p.a})`; ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ── Typed animation ── */
function TypedRole({ roles }) {
  const [text, setText] = useState("");
  const [ri, setRi]   = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = roles[ri];
    let t;
    if (!del) {
      if (text.length < cur.length) t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 90);
      else t = setTimeout(() => setDel(true), 2800);
    } else {
      if (text.length > 0) t = setTimeout(() => setText(cur.slice(0, text.length - 1)), 50);
      else { setDel(false); setRi((ri + 1) % roles.length); }
    }
    return () => clearTimeout(t);
  }, [text, del, ri, roles]);
  return (
    <span style={{ fontFamily: T.display, fontSize: "clamp(1.1rem,2.2vw,1.45rem)", fontWeight: 400, color: T.muted }}>
      {text}<span className="blink" style={{ color: T.accent }}>|</span>
    </span>
  );
}

/* ── Code card ── */
function CodeCard() {
  const lines = [
    [<><span style={{color:"#ff79c6"}}>const</span> <span style={{color:"#50fa7b"}}>developer</span> = {"{"}</>],
    [<>&nbsp;&nbsp;<span style={{color:"#8be9fd"}}>name</span>: <span style={{color:"#f1fa8c"}}>"Eknoor Singh"</span>,</>],
    [<>&nbsp;&nbsp;<span style={{color:"#8be9fd"}}>role</span>: <span style={{color:"#f1fa8c"}}>"Full Stack Engineer"</span>,</>],
    [<>&nbsp;&nbsp;<span style={{color:"#8be9fd"}}>exp</span>:  <span style={{color:"#f1fa8c"}}>"1+ year"</span>,</>],
    [<>&nbsp;&nbsp;<span style={{color:"#8be9fd"}}>stack</span>: [</>],
    [<>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#f1fa8c"}}>"React"</span>, <span style={{color:"#f1fa8c"}}>"Next.js"</span>,</>],
    [<>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#f1fa8c"}}>"Node.js"</span>, <span style={{color:"#f1fa8c"}}>"TypeScript"</span>,</>],
    [<>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"#f1fa8c"}}>"PostgreSQL"</span>, <span style={{color:"#f1fa8c"}}>"MongoDB"</span></>],
    [<>&nbsp;&nbsp;],</>],
    [<>&nbsp;&nbsp;<span style={{color:"#8be9fd"}}>available</span>: <span style={{color:"#ff79c6"}}>true</span>,</>],
    [<>&nbsp;&nbsp;<span style={{color:"#8be9fd"}}>location</span>: <span style={{color:"#f1fa8c"}}>"Mohali, India"</span></>],
    [<>{"}"}</>],
    [],
    [<><span style={{color:"#6272a4",fontStyle:"italic"}}>// Let's build something great</span></>],
    [<><span style={{color:"#ff79c6"}}>export default</span> developer;</>],
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, rotateY: -8 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fl"
      style={{ width: "100%", maxWidth: 450, perspective: 1000 }}
    >
      <div style={{
        background: "rgba(10,10,16,0.92)",
        border: `1px solid ${T.border}`,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: `0 30px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(0,212,255,0.08)`,
        position: "relative",
      }}>
        {/* Glow top line */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,#00d4ff,transparent)" }} />
        {/* Mac header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 18px", borderBottom:`1px solid ${T.border}` }}>
          <div style={{ display:"flex", gap:6 }}>
            <span style={{ width:10, height:10, borderRadius:"50%", background:"#ff5f57", display:"block" }}/>
            <span style={{ width:10, height:10, borderRadius:"50%", background:"#febc2e", display:"block" }}/>
            <span style={{ width:10, height:10, borderRadius:"50%", background:"#28c840", display:"block" }}/>
          </div>
          <span style={{ fontFamily:T.mono, fontSize:"0.72rem", color:T.dim }}>eknoor.ts</span>
          <span style={{ width:48 }}/>
        </div>
        {/* Code */}
        <div style={{ padding:"18px 22px", fontFamily:T.mono, fontSize:"0.78rem", lineHeight:1.95 }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display:"flex", gap:14 }}>
              <span style={{ color:T.dim, userSelect:"none", minWidth:16, textAlign:"right", fontSize:"0.7rem", flexShrink:0 }}>{i+1}</span>
              <span>{line[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const socialIcons = [
  { href: data.github, title:"GitHub", icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { href: data.linkedin, title:"LinkedIn", icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { href:`mailto:${data.email}`, title:"Email", icon:<svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg> },
];

export default function Hero() {
  const container = { opacity: 0, y: 0 };
  const item = (d) => ({ initial:{ opacity:0, y:28 }, animate:{ opacity:1, y:0 }, transition:{ duration:0.7, delay:d, ease:[0.22,1,0.36,1] } });

  return (
    <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding:"110px 40px 70px", background: T.bg }}>
      {/* Dot grid */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize:"36px 36px", WebkitMaskImage:"radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)", maskImage:"radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)", zIndex:0 }}/>
      {/* Glows */}
      <div style={{ position:"absolute", width:750, height:750, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 65%)", top:-200, right:-200, pointerEvents:"none", zIndex:0 }}/>
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 65%)", bottom:-100, left:-100, pointerEvents:"none", zIndex:0 }}/>
      <Particles />

      <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1, display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center", width:"100%" }} className="hero-grid">
        {/* ── LEFT ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>

          {/* Badge */}
          <motion.div {...item(0)} style={{ display:"inline-flex", alignItems:"center", gap:9, background:T.accentDim, border:`1px solid ${T.accentBorder}`, color:T.accent, padding:"6px 14px", borderRadius:100, fontFamily:T.mono, fontSize:"0.74rem", width:"fit-content" }}>
            <span className="pdot" style={{ width:6, height:6, borderRadius:"50%", background:T.green, display:"block" }}/>
            Available for opportunities
          </motion.div>

          {/* Name */}
          <motion.h1 {...item(0.1)} className="font-display" style={{ fontFamily:T.display, fontWeight:700, fontSize:"clamp(3.2rem,5.8vw,5.5rem)", lineHeight:1.03, letterSpacing:"-0.035em", color:T.text }}>
            Eknoor<br />
            <span style={{ background:"linear-gradient(135deg, #00d4ff 0%, #0ea5e9 50%, #38bdf8 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Singh
            </span>
          </motion.h1>

          {/* Typed */}
          <motion.div {...item(0.2)} style={{ minHeight:"1.8rem" }}>
            <TypedRole roles={data.roles} />
          </motion.div>

          {/* Bio */}
          <motion.p {...item(0.3)} style={{ fontSize:"0.975rem", color:T.muted, lineHeight:1.85, maxWidth:500 }}>
            {data.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div {...item(0.4)} style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <a href="#projects" onClick={(e)=>{ e.preventDefault(); document.getElementById("projects")?.scrollIntoView({behavior:"smooth"}); }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background:T.accent, color:"#000", textDecoration:"none", padding:"12px 26px", borderRadius:9, fontFamily:T.display, fontWeight:700, fontSize:"0.88rem", transition:"all 0.3s", boxShadow:"0 0 0 0 rgba(0,212,255,0.3)" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 30px rgba(0,212,255,0.4)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 0 0 0 rgba(0,212,255,0.3)"; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
              View My Work
            </a>
            <a href="#contact" onClick={(e)=>{ e.preventDefault(); document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}); }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background:"transparent", color:T.text, textDecoration:"none", padding:"12px 26px", borderRadius:9, fontFamily:T.display, fontWeight:500, fontSize:"0.88rem", border:`1px solid rgba(255,255,255,0.14)`, transition:"all 0.3s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; e.currentTarget.style.background="transparent"; e.currentTarget.style.transform=""; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
              Get In Touch
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div {...item(0.5)} style={{ display:"flex", gap:10 }}>
            {socialIcons.map(({ href, title, icon }) => (
              <a key={title} href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer" title={title}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", width:40, height:40, border:`1px solid rgba(255,255,255,0.12)`, borderRadius:10, color:T.muted, textDecoration:"none", transition:"all 0.3s" }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor=T.accentBorder; e.currentTarget.style.color=T.accent; e.currentTarget.style.background=T.accentDim; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 4px 20px ${T.accentGlow}`; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; e.currentTarget.style.color=T.muted; e.currentTarget.style.background="transparent"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
              >{icon}</a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT ── */}
        <div style={{ display:"flex", justifyContent:"center" }}>
          <CodeCard />
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}} style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
        <span style={{ fontFamily:T.mono, fontSize:"0.63rem", color:T.dim, textTransform:"uppercase", letterSpacing:"0.14em" }}>Scroll</span>
        <div style={{ width:1, height:36, background:"linear-gradient(to bottom, #3d4556, transparent)" }}/>
      </motion.div>

      <style>{`
        @media(max-width:1024px){ .hero-grid{ grid-template-columns:1fr !important; } .hero-grid > div:last-child{ display:none !important; } }
        @media(max-width:640px){ #hero{ padding:100px 24px 60px !important; } }
      `}</style>
    </section>
  );
}
