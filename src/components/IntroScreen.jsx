import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
  Netflix-style intro:
  1. Black screen
  2. Name fades + scales in (0 → 1)
  3. Holds ~2.2 s
  4. RAPID ZOOM: scale 1 → 22, opacity 1 → 0  (like Netflix N rushing into camera)
  5. onDone() → portfolio revealed underneath
*/
export default function IntroScreen({ visible, onDone }) {
  const [phase, setPhase] = useState("enter"); // "enter" | "hold" | "zoom"
  const calledDone = useRef(false);

  const done = useCallback(() => {
    if (calledDone.current) return;
    calledDone.current = true;
    onDone();
  }, [onDone]);

  const startZoom = useCallback(() => {
    setPhase((p) => {
      if (p === "zoom") return p;
      // Call onDone at 0.65 s — before the 0.8 s animation ends.
      // Portfolio renders underneath while the zoom is still running → zero lag.
      setTimeout(done, 650);
      return "zoom";
    });
  }, [done]);

  useEffect(() => {
    if (!visible) return;
    const keyFn = () => startZoom();
    window.addEventListener("keydown", keyFn, { once: true });

    /* hold then auto-zoom */
    const t = setTimeout(startZoom, 3000);
    return () => { clearTimeout(t); window.removeEventListener("keydown", keyFn); };
  }, [visible, startZoom]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-bg"
          initial={{ opacity: 1 }}
          animate={phase === "zoom" ? { opacity: 0 } : { opacity: 1 }}
          transition={phase === "zoom" ? { duration: 0.80, ease: [0.10, 0.0, 0.95, 1.0] } : {}}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          onClick={startZoom}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", overflow: "hidden",
          }}
        >
          {/* Atmospheric radial glow — stays static */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)",
          }} />

          {/* ── The zoomable card ── */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}
            initial={{ scale: 0.80, opacity: 0 }}
            animate={
              phase === "zoom"
                ? { scale: 22, opacity: 0 }
                : { scale: 1,  opacity: 1 }
            }
            transition={
              phase === "zoom"
                ? { duration: 0.80, ease: [0.10, 0.0, 0.95, 1.0] }   /* fast ease-in zoom */
                : { duration: 0.70, ease: [0.22, 1, 0.36, 1] }         /* smooth appear    */
            }
          >

            {/* "WELCOME TO" label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === "zoom" ? 0 : 1, y: phase === "zoom" ? 10 : 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: phase === "zoom" ? 0 : 0.25 }}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.62rem, 1.3vw, 0.80rem)",
                letterSpacing: "0.46em",
                color: "rgba(0,212,255,0.85)",
                textTransform: "uppercase",
                margin: "0 0 1.2rem",
              }}
            >
              WELCOME TO
            </motion.p>

            {/* Glow bloom layer (blurred duplicate, behind text) */}
            <div aria-hidden style={{
              position: "absolute", inset: "-10% -5%",
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.8rem, 11vw, 10rem)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#00d4ff",
              filter: "blur(32px)",
              opacity: 0.45,
              display: "flex", alignItems: "center", justifyContent: "center",
              lineHeight: 0.9,
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}>
              EKNOOR SINGH
            </div>

            {/* Name — main text */}
            <h1 style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.8rem, 11vw, 10rem)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#fff",
              margin: 0,
              lineHeight: 0.92,
              position: "relative",
              textShadow:
                "0 0 20px rgba(0,212,255,0.55), 0 0 55px rgba(0,212,255,0.22)",
            }}>
              EKNOOR<br />SINGH
            </h1>

            {/* Divider line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: phase === "zoom" ? 0 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: phase === "zoom" ? 0 : 0.55 }}
              style={{
                width: "100%", height: "1px", margin: "1.5rem 0 1.2rem",
                background: "linear-gradient(90deg, transparent, #00d4ff 30%, #fff 50%, #00d4ff 70%, transparent)",
                transformOrigin: "center",
                boxShadow: "0 0 8px rgba(0,212,255,0.7)",
              }}
            />

            {/* PORTFOLIO subtitle */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.65em" }}
              animate={{ opacity: phase === "zoom" ? 0 : 1, letterSpacing: "0.38em" }}
              transition={{ duration: 0.75, ease: "easeOut", delay: phase === "zoom" ? 0 : 0.65 }}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(0.85rem, 2.2vw, 1.4rem)",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                margin: 0,
              }}
            >
              PORTFOLIO
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "zoom" ? 0 : 0.38 }}
              transition={{ duration: 0.6, delay: phase === "zoom" ? 0 : 1.0 }}
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.65rem, 1.4vw, 0.82rem)",
                letterSpacing: "0.22em",
                color: "#fff",
                textTransform: "uppercase",
                marginTop: "0.9rem",
              }}
            >
              Full Stack Engineer &nbsp;·&nbsp; Mohali, India
            </motion.p>
          </motion.div>

          {/* ── HUD corner brackets ── */}
          {[
            { top: "2rem",    left:  "2rem",  borderTop: "1px solid",    borderLeft:  "1px solid"  },
            { top: "2rem",    right: "2rem",  borderTop: "1px solid",    borderRight: "1px solid"  },
            { bottom: "2rem", left:  "2rem",  borderBottom: "1px solid", borderLeft:  "1px solid"  },
            { bottom: "2rem", right: "2rem",  borderBottom: "1px solid", borderRight: "1px solid"  },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "zoom" ? 0 : 0.35 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
              style={{
                position: "absolute", width: 22, height: 22,
                borderColor: "rgba(0,212,255,0.5)",
                ...s,
              }}
            />
          ))}

          {/* ── Skip hint ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "zoom" ? 0 : 1 }}
            transition={{ delay: 2.0, duration: 0.5 }}
            style={{
              position: "absolute", bottom: "2rem", right: "2rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.62rem", letterSpacing: "0.10em",
              color: "rgba(255,255,255,0.18)",
              textTransform: "uppercase", pointerEvents: "none",
            }}
          >
            Click or press any key to skip
          </motion.p>

          {/* ── Progress bar ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "zoom" ? 0 : 1 }}
            transition={
              phase === "zoom"
                ? { duration: 0.1 }
                : { duration: 3.0, ease: "linear" }
            }
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "2px",
              background: "linear-gradient(90deg, #00d4ff, #0ea5e9, #38bdf8)",
              transformOrigin: "left",
              boxShadow: "0 0 6px rgba(0,212,255,0.6)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
