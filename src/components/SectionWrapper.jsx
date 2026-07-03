import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { T } from "../theme";

/* ── Scroll reveal wrappers ── */
export function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.div>
  );
}

/* Slide in from left */
export function SlideLeft({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: -36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Slide in from right */
export function SlideRight({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x: 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section label + heading ── */
export function SectionHeader({ label, title, desc, center = false }) {
  return (
    <FadeUp className={`mb-16 ${center ? "text-center" : ""}`}>
      <div
        className={`flex items-center gap-2.5 mb-3 ${center ? "justify-center" : ""}`}
        style={{ fontFamily: T.mono, fontSize: "0.72rem", color: T.accent, textTransform: "uppercase", letterSpacing: "0.14em" }}
      >
        {!center && <span style={{ display: "block", width: 22, height: 1, background: T.accent }} />}
        {label}
      </div>
      <h2
        className="font-display"
        style={{
          fontFamily: T.display,
          fontWeight: 700,
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          letterSpacing: "-0.028em",
          lineHeight: 1.1,
          marginBottom: desc ? 14 : 0,
          color: T.text,
        }}
      >
        {title}
      </h2>
      {desc && (
        <p style={{ color: T.muted, fontSize: "0.975rem", maxWidth: 520, lineHeight: 1.8 }}>{desc}</p>
      )}
    </FadeUp>
  );
}
