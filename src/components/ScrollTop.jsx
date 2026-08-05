import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "../theme";

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
          className="fixed bottom-7 right-7 w-[42px] h-[42px] flex items-center justify-center text-muted cursor-pointer z-[100] text-[0.9rem] rounded-[10px] transition-all duration-[250ms]"
          style={{ background:T.cardBg, border:`1px solid ${T.subtleBorder}`, backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)" }}
        >↑</motion.button>
      )}
    </AnimatePresence>
  );
}
