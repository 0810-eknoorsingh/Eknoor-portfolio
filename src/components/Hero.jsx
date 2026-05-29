import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { T } from "./SectionWrapper";
import { data } from "../data";

const ThreeScene  = lazy(() => import("./ThreeScene"));

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
    <span className="font-display font-normal text-muted" style={{ fontSize: "clamp(1.1rem,2.2vw,1.45rem)" }}>
      {text}<span className="blink text-accent">|</span>
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
      className="fl w-full max-w-[450px]"
      style={{ perspective: 1000 }}
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
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg,transparent,#00d4ff,transparent)" }} />
        {/* Mac header */}
        <div className="flex items-center justify-between px-[18px] py-3" style={{ borderBottom:`1px solid ${T.border}` }}>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full block" style={{ background:"#ff5f57" }}/>
            <span className="w-2.5 h-2.5 rounded-full block" style={{ background:"#febc2e" }}/>
            <span className="w-2.5 h-2.5 rounded-full block" style={{ background:"#28c840" }}/>
          </div>
          <span className="font-mono text-[0.72rem] text-dim">eknoor.ts</span>
          <span className="w-12"/>
        </div>
        {/* Code */}
        <div className="font-mono text-[0.78rem] leading-[1.95] px-[22px] py-[18px]">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-3.5">
              <span className="text-dim select-none min-w-[16px] text-right text-[0.7rem] shrink-0">{i+1}</span>
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
  const item = (d) => ({ initial:{ opacity:0, y:28 }, animate:{ opacity:1, y:0 }, transition:{ duration:0.7, delay:d, ease:[0.22,1,0.36,1] } });

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden px-10 pt-[110px] pb-[70px] max-sm:px-6 max-sm:pt-[100px] max-sm:pb-[60px] bg-bg">
      {/* Dot grid */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize:"36px 36px", WebkitMaskImage:"radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)", maskImage:"radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)" }}/>
      {/* Glows */}
      <div className="absolute w-[750px] h-[750px] rounded-full pointer-events-none z-0" style={{ background:"radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 65%)", top:-200, right:-200 }}/>
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0" style={{ background:"radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 65%)", bottom:-100, left:-100 }}/>
      <Suspense fallback={null}><ThreeScene /></Suspense>

      <div className="max-w-[1200px] mx-auto relative z-[1] grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center w-full">
        {/* ── LEFT ── */}
        <div className="flex flex-col gap-6">

          {/* Badge */}
          <motion.div {...item(0)} className="inline-flex items-center gap-[9px] bg-accent-dim border border-accent-border text-accent px-[14px] py-[6px] rounded-full font-mono text-[0.74rem] w-fit">
            <span className="pdot w-1.5 h-1.5 rounded-full bg-green block"/>
            Available for opportunities
          </motion.div>

          {/* Name */}
          <motion.h1 {...item(0.1)} className="font-display font-bold leading-[1.03] tracking-[-0.035em] text-text" style={{ fontSize:"clamp(3.2rem,5.8vw,5.5rem)" }}>
            Eknoor<br />
            <span style={{ background:"linear-gradient(135deg, #00d4ff 0%, #0ea5e9 50%, #38bdf8 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Singh
            </span>
          </motion.h1>

          {/* Typed */}
          <motion.div {...item(0.2)} className="min-h-[1.8rem]">
            <TypedRole roles={data.roles} />
          </motion.div>

          {/* Bio */}
          <motion.p {...item(0.3)} className="text-[0.975rem] text-muted leading-[1.85] max-w-[500px]">
            {data.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div {...item(0.4)} className="flex gap-3 flex-wrap">
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
          <motion.div {...item(0.5)} className="flex gap-[10px]">
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
        <div className="hidden lg:flex justify-center">
          <CodeCard />
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[0.63rem] text-dim uppercase tracking-[0.14em]">Scroll</span>
        <div className="w-px h-9 bg-gradient-to-b from-dim to-transparent"/>
      </motion.div>
    </section>
  );
}
