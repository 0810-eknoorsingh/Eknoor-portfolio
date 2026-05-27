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
        className="fixed top-0 left-0 right-0 z-[1000] transition-all duration-[350ms] ease-[ease]"
        style={{
          padding: scrolled ? "13px 0" : "22px 0",
          background: scrolled ? "rgba(6,6,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e)=>{ e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"}); }}
            className="font-display font-bold text-[1.4rem] text-text no-underline"
          >
            ES<span className="text-accent">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex list-none gap-1 items-center">
            {links.map((link) => (
              <li key={link}>
                <button onClick={() => go(link)}
                  className="font-display text-[0.86rem] font-medium px-[13px] py-[6px] rounded-lg border-none cursor-pointer transition-all duration-200"
                  style={{
                    background: active === link.toLowerCase() ? "rgba(255,255,255,0.06)" : "transparent",
                    color: link === "Contact" ? T.accent : (active === link.toLowerCase() ? T.text : T.muted),
                    outline: link === "Contact" ? `1px solid ${T.accentBorder}` : "none",
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
          <button onClick={()=>setMenuOpen(true)}
            className="flex md:hidden flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          >
            <span className="block w-[22px] h-0.5 bg-text rounded-[2px]"/>
            <span className="block w-[22px] h-0.5 bg-text rounded-[2px]"/>
            <span className="block w-[22px] h-0.5 bg-text rounded-[2px]"/>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.22}}
            className="fixed inset-0 z-[999] bg-[rgba(6,6,8,0.97)] flex flex-col items-center justify-center gap-7"
          >
            <button onClick={()=>setMenuOpen(false)}
              className="absolute top-6 right-7 text-2xl text-muted bg-transparent border-none cursor-pointer"
            >✕</button>
            {links.map((link, i) => (
              <motion.button key={link} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:18}} transition={{delay:i*0.06}}
                onClick={()=>go(link)}
                className="font-display text-[2rem] font-bold text-muted bg-transparent border-none cursor-pointer transition-colors duration-200 hover:text-accent"
              >{link}</motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
