import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { T, SectionHeader } from "./SectionWrapper";
import { data } from "../data";

const { prompt, welcome, commands } = data.terminal;

/* Terminal always has a dark background, so use fixed dark-theme values for all text */
const TERM = {
  text:    "#e2e8f0",
  muted:   "#7a8599",
  accent:  "#00d4ff",
};

function Line({ text, type = "output", href }) {
  const colors = {
    output:  TERM.muted,
    success: TERM.accent,
    error:   "#f87171",
    prompt:  TERM.text,
    welcome: "rgba(0,212,255,0.75)",
    link:    TERM.accent,
  };
  const base = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.80rem",
    lineHeight: 1.75,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer"
        style={{ ...base, color: TERM.accent, textDecoration: "none", display: "block" }}
        onMouseEnter={e => { e.currentTarget.style.textDecoration = "underline"; e.currentTarget.style.textUnderlineOffset = "3px"; }}
        onMouseLeave={e => { e.currentTarget.style.textDecoration = "none"; }}
      >
        {text}
      </a>
    );
  }
  return (
    <div style={{ ...base, color: colors[type] || T.muted }}>{text}</div>
  );
}

export default function Terminal() {
  const [history, setHistory] = useState(() =>
    welcome.map(w => ({ text: w, type: "welcome" }))
  );
  const [input, setInput]       = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const inputRef    = useRef(null);
  const outputRef   = useRef(null);

  // Scroll only the output div — never the page
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const run = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory(h => [cmd, ...h]);
    setHistIdx(-1);

    const cmdEntry = { text: `${prompt} ${raw}`, type: "prompt" };

    if (cmd === "clear") {
      setHistory([{ text: `${prompt} clear`, type: "prompt" }]);
      setInput("");
      return;
    }

    const def = commands[cmd];
    if (def) {
      setHistory(h => [
        ...h,
        cmdEntry,
        ...def.output.map(line =>
          typeof line === "object"
            ? { text: line.text, href: line.href, type: "link" }
            : { text: line, type: "output" }
        ),
      ]);
    } else {
      setHistory(h => [
        ...h,
        cmdEntry,
        { text: `command not found: ${cmd}. Type "help" for available commands.`, type: "error" },
      ]);
    }
    setInput("");
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter") { run(input); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(""); return; }
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const match = Object.keys(commands).find(c => c.startsWith(input));
      if (match) setInput(match);
    }
  };

  /* quick-run chips */
  const chips = ["help", "whoami", "skills", "experience", "projects", "metrics", "contact"];

  return (
    <section id="terminal" className="py-[120px] px-10 max-sm:py-[80px] max-sm:px-6 relative overflow-hidden bg-bg">

      {/* Section number watermark */}
      <div className="absolute -right-5 -top-5 font-display font-[800] text-[22vw] leading-none select-none pointer-events-none" style={{ color: "var(--ghost-text)" }}>06</div>

      <div className="max-w-[900px] mx-auto relative">
        <SectionHeader label="Terminal" title="Explore interactively" desc="Type a command or click a chip below. Use ↑↓ for history, Tab to autocomplete." />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Terminal window */}
          <div style={{
            background: T.codeCard,
            border: `1px solid ${T.border}`,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: `0 30px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(0,212,255,0.06)`,
          }}>
            {/* Title bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: `1px solid ${T.border}`, background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "block" }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.70rem", color: TERM.muted }}>eknoor@portfolio — bash</span>
              <span style={{ width: 46 }} />
            </div>

            {/* Output area */}
            <div
              ref={outputRef}
              onClick={focusInput}
              style={{ padding: "20px 22px", minHeight: 280, maxHeight: 380, overflowY: "auto", cursor: "text", display: "flex", flexDirection: "column", gap: "2px" }}
            >
              {history.map((entry, i) => (
                <Line key={i} text={entry.text} type={entry.type} href={entry.href} />
              ))}

              {/* Active input line */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.80rem", color: TERM.accent, flexShrink: 0 }}>{prompt}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  spellCheck={false}
                  style={{
                    background: "transparent", border: "none", outline: "none",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.80rem",
                    color: TERM.text, flex: 1, caretColor: TERM.accent,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick-run chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
            {chips.map(chip => (
              <button
                key={chip}
                onClick={() => { setInput(chip); setTimeout(() => run(chip), 0); }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem",
                  color: TERM.muted, background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6,
                  padding: "5px 12px", cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)"; e.currentTarget.style.color = TERM.accent; e.currentTarget.style.background = "rgba(0,212,255,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = TERM.muted; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
