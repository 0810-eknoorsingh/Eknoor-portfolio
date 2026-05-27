import { motion } from "framer-motion";
import { T, FadeUp } from "./SectionWrapper";
import { data } from "../data";

const links = [
  { href: data.github,   label:"GitHub",       icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { href: data.linkedin, label:"LinkedIn",      icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { href:`tel:${data.phone}`, label:data.phone, icon:<svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg> },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding:"120px 40px", background:T.bg, position:"relative", overflow:"hidden" }}>
      {/* Background radial glow */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:800, height:800, borderRadius:"50%", background:`radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)`, pointerEvents:"none" }}/>

      <div style={{ maxWidth:700, margin:"0 auto", textAlign:"center", position:"relative" }}>
        <FadeUp>
          {/* Label */}
          <p style={{ fontFamily:T.mono, fontSize:"0.72rem", color:T.accent, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:14 }}>Contact</p>

          {/* Heading */}
          <h2 className="font-display" style={{ fontFamily:T.display, fontWeight:700, fontSize:"clamp(2.6rem,5vw,4rem)", letterSpacing:"-0.035em", lineHeight:1.1, marginBottom:20, color:T.text }}>
            Let's work<br />
            <span style={{ background:"linear-gradient(135deg, #00d4ff 0%, #0ea5e9 60%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              together.
            </span>
          </h2>

          <p style={{ color:T.muted, fontSize:"0.975rem", lineHeight:1.85, marginBottom:44, maxWidth:520, margin:"0 auto 44px" }}>
            I'm currently open to new opportunities. Whether you have a project in mind, want to discuss a role, or just want to say hi — my inbox is always open.
          </p>

          {/* Email CTA */}
          <motion.a
            href={`mailto:${data.email}`}
            whileHover={{ y:-3, boxShadow:`0 10px 36px rgba(0,212,255,0.3)`, borderColor:T.accent, background:"rgba(0,212,255,0.12)" }}
            transition={{ duration:0.25 }}
            style={{ display:"inline-flex", alignItems:"center", gap:10, fontFamily:T.display, fontSize:"1rem", fontWeight:500, color:T.accent, textDecoration:"none", border:`1px solid ${T.accentBorder}`, padding:"14px 30px", borderRadius:10, background:T.accentDim, marginBottom:36, transition:"all 0.3s" }}
          >
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
            {data.email}
          </motion.a>

          {/* Secondary links */}
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            {links.map(({ href, label, icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http")?"_blank":undefined}
                rel="noreferrer"
                whileHover={{ y:-2, borderColor:"rgba(255,255,255,0.25)", color:T.text }}
                transition={{ duration:0.2 }}
                style={{ display:"inline-flex", alignItems:"center", gap:8, color:T.muted, textDecoration:"none", fontSize:"0.875rem", padding:"9px 20px", border:`1px solid rgba(255,255,255,0.1)`, borderRadius:9, fontFamily:T.display, transition:"all 0.3s" }}
              >
                {icon}{label}
              </motion.a>
            ))}
          </div>
        </FadeUp>
      </div>
      <style>{`@media(max-width:640px){ #contact{ padding:80px 24px !important; } }`}</style>
    </section>
  );
}
