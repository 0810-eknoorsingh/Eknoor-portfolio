import { motion } from "framer-motion";
import { T, itemV } from "../theme";
import { Stagger, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

/* ── Clean line icons per category (replaces emoji) ── */
const sw = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
const CAT_ICONS = {
  "Languages": (
    <svg width="19" height="19" viewBox="0 0 24 24" {...sw}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  "Frontend": (
    <svg width="19" height="19" viewBox="0 0 24 24" {...sw}><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="7" x2="22" y2="7"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  ),
  "Backend": (
    <svg width="19" height="19" viewBox="0 0 24 24" {...sw}><rect x="2" y="3" width="20" height="6" rx="1.5"/><rect x="2" y="15" width="20" height="6" rx="1.5"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
  ),
  "Databases": (
    <svg width="19" height="19" viewBox="0 0 24 24" {...sw}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>
  ),
  "Auth & Security": (
    <svg width="19" height="19" viewBox="0 0 24 24" {...sw}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
  ),
  "Tools": (
    <svg width="19" height="19" viewBox="0 0 24 24" {...sw}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a1.5 1.5 0 0 0 2.1 2.1l6-6a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.4-2.6z"/></svg>
  ),
};

/* ── Marquee logos (self-hosted devicon SVGs in public/logos — no third-party CDN dependency) ── */
const marqueeTech = [
  { name: "TypeScript",  src: "/logos/typescript.svg" },
  { name: "JavaScript",  src: "/logos/javascript.svg" },
  { name: "React",       src: "/logos/react.svg" },
  { name: "Node.js",     src: "/logos/nodejs.svg" },
  { name: "Tailwind CSS",src: "/logos/tailwindcss.svg" },
  { name: "Bootstrap",   src: "/logos/bootstrap.svg" },
  { name: "PostgreSQL",  src: "/logos/postgresql.svg" },
  { name: "MongoDB",     src: "/logos/mongodb.svg" },
  { name: "MySQL",       src: "/logos/mysql.svg" },
  { name: "HTML5",       src: "/logos/html5.svg" },
  { name: "CSS3",        src: "/logos/css3.svg" },
  { name: "Git",         src: "/logos/git.svg" },
  { name: "VS Code",     src: "/logos/vscode.svg" },
  { name: "Bitbucket",   src: "/logos/bitbucket.svg" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 bg-bg relative overflow-hidden">
      {/* Ghost */}
      <div className="absolute -left-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color:"var(--ghost-text)" }}>02</div>

      <div className="max-w-[1200px] mx-auto relative">
        <SectionHeader label="Tech Stack" title="Technologies I work with" desc="Tools and frameworks I use to build scalable, production-ready applications." />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {data.skills.map((cat) => (
            <motion.div
              key={cat.name}
              variants={itemV}
              whileHover={{ y:-4, borderColor:T.accentBorder, boxShadow:`0 12px 40px rgba(0,0,0,.4), 0 0 20px ${T.accentGlow}` }}
              transition={{ duration:0.25 }}
              style={{ background:T.card, border:`1px solid ${T.border}`, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderRadius:16, padding:26, overflow:"hidden", position:"relative" }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-40" style={{ background:`linear-gradient(90deg, transparent, ${T.accent}, transparent)` }}/>
              {/* Header */}
              <div className="flex items-center gap-3 mb-[18px]">
                <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0" style={{ background:T.accentDim, border:`1px solid ${T.accentBorder}`, color:T.accent }}>
                  {CAT_ICONS[cat.name] || <span className="text-base">{cat.icon}</span>}
                </div>
                <span className="font-display font-semibold text-[0.94rem] text-text">{cat.name}</span>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {cat.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ background:T.accentDim, borderColor:T.accentBorder, color:T.accent }}
                    transition={{ duration:0.15 }}
                    className="inline-block px-[11px] py-[3px] rounded-[5px] text-[0.76rem] text-muted font-mono cursor-default whitespace-nowrap"
                    style={{ background:T.tagBg, border:`1px solid ${T.tagBorder}` }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* ── Logo marquee ── */}
        <div
          className="mt-14 max-sm:mt-10 rounded-[18px] overflow-hidden py-7 max-sm:py-5"
          style={{ background: T.card, border: `1px solid ${T.border}`, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        >
          <div className="tech-marquee-mask">
            <div className="tech-track">
              {[...marqueeTech, ...marqueeTech].map((t, i) => (
                <img
                  key={i}
                  src={t.src}
                  alt={t.name}
                  title={t.name}
                  className="tech-logo"
                  loading="lazy"
                  decoding="async"
                  aria-hidden={i >= marqueeTech.length ? "true" : undefined}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
