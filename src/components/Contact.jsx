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
    <section id="contact" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 bg-bg relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background:`radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)` }}/>

      <div className="max-w-[700px] mx-auto text-center relative">
        <FadeUp>
          {/* Label */}
          <p className="font-mono text-[0.72rem] text-accent uppercase tracking-[0.14em] mb-[14px]">Contact</p>

          {/* Heading */}
          <h2 className="font-display font-bold tracking-[-0.035em] leading-[1.1] mb-5 text-text" style={{ fontSize:"clamp(2.6rem,5vw,4rem)" }}>
            Let's work<br />
            <span style={{ background:"linear-gradient(135deg, #00d4ff 0%, #0ea5e9 60%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              together.
            </span>
          </h2>

          <p className="text-muted text-[0.975rem] leading-[1.85] mx-auto mb-11 max-w-[520px]">
            I'm currently open to new opportunities. Whether you have a project in mind, want to discuss a role, or just want to say hi — my inbox is always open.
          </p>

          {/* Email CTA */}
          <motion.a
            href={`mailto:${data.email}`}
            whileHover={{ y:-3, boxShadow:`0 10px 36px rgba(0,212,255,0.3)`, borderColor:T.accent, background:"rgba(0,212,255,0.12)" }}
            transition={{ duration:0.25 }}
            className="inline-flex items-center gap-[10px] font-display text-base font-medium text-accent no-underline px-[30px] py-[14px] rounded-[10px] mb-9 transition-all duration-300"
            style={{ border:`1px solid ${T.accentBorder}`, background:T.accentDim }}
          >
            <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
            {data.email}
          </motion.a>

          {/* Secondary links */}
          <div className="flex gap-3 justify-center flex-wrap">
            {links.map(({ href, label, icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http")?"_blank":undefined}
                rel="noreferrer"
                whileHover={{ y:-2, borderColor:"rgba(255,255,255,0.25)", color:T.text }}
                transition={{ duration:0.2 }}
                className="inline-flex items-center gap-2 text-muted no-underline text-[0.875rem] px-5 py-[9px] rounded-[9px] font-display transition-all duration-300"
                style={{ border:`1px solid rgba(255,255,255,0.1)` }}
              >
                {icon}{label}
              </motion.a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
