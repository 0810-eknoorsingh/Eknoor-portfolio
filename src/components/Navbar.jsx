import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "./SectionWrapper";

const links = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState("");

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      document.querySelectorAll("section[id]").forEach((s) => {
        if (window.scrollY >= s.offsetTop - 130) setActive(s.id);
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; }, [menuOpen]);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth", block:"start" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y:-80, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
        style={{
          position:"fixed", top:0, left:0, right:0, zIndex:1000,
          padding: scrolled ? "13px 0" : "22px 0",
          background: scrolled ? "rgba(6,6,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
          transition:"all 0.35s ease",
        }}
      >
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 40px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {/* Logo */}
          <a href="#" onClick={(e)=>{ e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"}); }}
            style={{ fontFamily:T.display, fontWeight:700, fontSize:"1.4rem", color:T.text, textDecoration:"none" }}
          >
            ES<span style={{color:T.accent}}>.</span>
          </a>

          {/* Desktop links */}
          <ul style={{ display:"flex", listStyle:"none", gap:4, alignItems:"center" }} className="nav-links">
            {links.map((link) => (
              <li key={link}>
                <button onClick={() => go(link)}
                  style={{
                    fontFamily:T.display, fontSize:"0.86rem", fontWeight:500,
                    padding:"6px 13px", borderRadius:8, border:"none", cursor:"pointer",
                    background: active === link.toLowerCase() ? "rgba(255,255,255,0.06)" : "transparent",
                    color: link === "Contact" ? T.accent : (active === link.toLowerCase() ? T.text : T.muted),
                    outline: link === "Contact" ? `1px solid ${T.accentBorder}` : "none",
                    transition:"all 0.2s",
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.color=T.text; e.currentTarget.style.background="rgba(255,255,255,0.06)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.color = link === "Contact" ? T.accent : (active === link.toLowerCase() ? T.text : T.muted); e.currentTarget.style.background = active === link.toLowerCase() ? "rgba(255,255,255,0.06)" : "transparent"; }}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button onClick={()=>setMenuOpen(true)} style={{ display:"none", flexDirection:"column", gap:5, background:"transparent", border:"none", cursor:"pointer", padding:4 }} className="hamburger">
            <span style={{display:"block",width:22,height:2,background:T.text,borderRadius:2}}/>
            <span style={{display:"block",width:22,height:2,background:T.text,borderRadius:2}}/>
            <span style={{display:"block",width:22,height:2,background:T.text,borderRadius:2}}/>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.22}}
            style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(6,6,8,0.97)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:28 }}
          >
            <button onClick={()=>setMenuOpen(false)} style={{ position:"absolute", top:24, right:28, fontSize:"1.5rem", color:T.muted, background:"none", border:"none", cursor:"pointer" }}>✕</button>
            {links.map((link, i) => (
              <motion.button key={link} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:18}} transition={{delay:i*0.06}}
                onClick={()=>go(link)}
                style={{ fontFamily:T.display, fontSize:"2rem", fontWeight:700, color:T.muted, background:"transparent", border:"none", cursor:"pointer", transition:"color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.color=T.accent}
                onMouseLeave={e=>e.currentTarget.style.color=T.muted}
              >{link}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media(max-width:768px){ .nav-links{ display:none !important; } .hamburger{ display:flex !important; } nav > div{ padding:0 24px !important; } }
      `}</style>
    </>
  );
}
