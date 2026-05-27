import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "./SectionWrapper";

export default function ScrollTop() {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {vis && (
        <motion.button
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:10 }}
          whileHover={{ y:-3, borderColor:T.accent, color:T.accent, boxShadow:`0 0 20px ${T.accentGlow}` }}
          onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
          style={{ position:"fixed", bottom:28, right:28, width:42, height:42, background:"rgba(12,12,18,0.9)", border:`1px solid rgba(255,255,255,0.12)`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:T.muted, cursor:"pointer", zIndex:100, fontSize:"0.9rem", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", transition:"all 0.25s" }}
        >↑</motion.button>
      )}
    </AnimatePresence>
  );
}
