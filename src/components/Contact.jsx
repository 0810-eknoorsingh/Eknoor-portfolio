import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { T } from "../theme";
import { SlideLeft, SlideRight, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

const contactLinks = [
  {
    href: data.github,
    label: "GitHub",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>,
  },
  {
    href: data.linkedin,
    label: "LinkedIn",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    href: `mailto:${data.email}`,
    label: data.email,
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>,
  },
  {
    href: `tel:${data.phone}`,
    label: data.phone,
    icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  },
];

const EMPTY = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const formRef  = useRef(null);
  const [form,   setForm]   = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setStatus("success");
      setForm(EMPTY);
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const sending = status === "sending";

  return (
    <section id="contact" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 bg-bg relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 65%)" }} />

      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader label="Contact" title={<>Let's work <span style={{ background:"linear-gradient(135deg,#00d4ff 0%,#0ea5e9 60%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>together.</span></>}
          desc="Open to new roles, freelance projects, or just a good conversation. Fill in the form and I'll get back within 24 hours." />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[72px] items-start">

          {/* ── Left: info ── */}
          <SlideLeft>
            <div className="flex flex-col gap-6">

              {/* Contact link cards */}
              <div className="flex flex-col gap-3">
                {contactLinks.map(({ href, label, icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    whileHover={{ x: 4, borderColor: T.accentBorder }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 no-underline rounded-[12px] px-5 py-4 transition-all duration-200"
                    style={{ border: `1px solid ${T.border}`, background: T.card }}
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-[8px] shrink-0"
                      style={{ background: T.accentDim, color: T.accent }}>
                      {icon}
                    </span>
                    <span className="font-display text-[0.875rem] text-muted">{label}</span>
                    <svg className="ml-auto" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: T.dim }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </motion.a>
                ))}
              </div>

              {/* Availability note */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-[12px]"
                style={{ background: T.greenDim, border: `1px solid ${T.greenBorder}` }}>
                <span className="pdot w-2 h-2 rounded-full bg-green shrink-0" />
                <p className="font-mono text-[0.78rem] text-green leading-[1.6]">
                  Available for full-time roles &amp; freelance projects
                </p>
              </div>
            </div>
          </SlideLeft>

          {/* ── Right: form ── */}
          <SlideRight>
            <motion.div
              style={{ background: T.cardBg, border: `1px solid ${T.border}`, borderRadius: 20, overflow: "hidden" }}
            >
              {/* Top accent line */}
              <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)` }} />

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 max-sm:p-6">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="contact-name" className="font-mono text-[0.70rem] text-dim uppercase tracking-[0.1em]">Full Name *</label>
                    <input
                      className="contact-field"
                      id="contact-name" type="text" name="name" placeholder="Eknoor Singh"
                      autoComplete="name"
                      value={form.name} onChange={handleChange} required
                    />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="contact-email" className="font-mono text-[0.70rem] text-dim uppercase tracking-[0.1em]">Email *</label>
                    <input
                      className="contact-field"
                      id="contact-email" type="email" name="email" placeholder="you@example.com"
                      autoComplete="email"
                      value={form.email} onChange={handleChange} required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="contact-phone" className="font-mono text-[0.70rem] text-dim uppercase tracking-[0.1em]">Phone Number</label>
                  <input
                    className="contact-field"
                    id="contact-phone" type="tel" name="phone" placeholder="+91 98765 43210"
                    autoComplete="tel"
                    value={form.phone} onChange={handleChange}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-[6px]">
                  <label htmlFor="contact-message" className="font-mono text-[0.70rem] text-dim uppercase tracking-[0.1em]">Message *</label>
                  <textarea
                    className="contact-field"
                    id="contact-message" name="message" rows={5} placeholder="Tell me about your project or opportunity..."
                    value={form.message} onChange={handleChange} required
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={!sending ? { scale: 1.02, boxShadow: "0 8px 28px rgba(0,212,255,0.35)" } : {}}
                  whileTap={!sending ? { scale: 0.98 } : {}}
                  transition={{ duration: 0.2 }}
                  className="w-full flex items-center justify-center gap-3 font-display font-700 text-[0.92rem] rounded-[10px] py-[14px] cursor-pointer border-none transition-all duration-200"
                  style={{
                    background: sending ? T.accentDim : T.accent,
                    color: sending ? T.accent : T.btnPrimaryText,
                    border: sending ? `1px solid ${T.accentBorder}` : "none",
                    fontWeight: 700,
                    opacity: sending ? 0.8 : 1,
                  }}
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Feedback */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-[9px] font-display text-[0.84rem]"
                      style={{ background: T.greenDim, border: `1px solid ${T.greenBorder}`, color: T.green }}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                      Message sent! I'll get back to you within 24 hours.
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-[9px] font-display text-[0.84rem]"
                      style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)", color: "#f87171" }}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      Something went wrong. Please email me directly.
                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </motion.div>
          </SlideRight>

        </div>
      </div>
    </section>
  );
}
