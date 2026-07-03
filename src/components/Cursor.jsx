import { useEffect, useRef } from "react";

const HOVER_SELECTOR = "a, button, [data-hover]";

export default function Cursor() {
  const curRef = useRef(null);
  const follRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, fx: 0, fy: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cur = curRef.current;
    const foll = follRef.current;
    if (!cur || !foll) return;

    let rafId = null;
    let hovering = false;

    const animate = () => {
      const p = pos.current;
      p.fx += (p.x - p.fx) * 0.13;
      p.fy += (p.y - p.fy) * 0.13;
      foll.style.left = p.fx + "px";
      foll.style.top = p.fy + "px";
      // Stop the loop once the follower has converged; mousemove restarts it.
      if (Math.abs(p.x - p.fx) < 0.3 && Math.abs(p.y - p.fy) < 0.3) {
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      cur.style.opacity = "1";
      foll.style.opacity = "1";
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
      if (rafId === null) rafId = requestAnimationFrame(animate);
    };

    const setHover = (on) => {
      if (on) {
        cur.style.width = "14px";
        cur.style.height = "14px";
        cur.style.background = "transparent";
        cur.style.border = "2px solid #00d4ff";
        foll.style.width = "46px";
        foll.style.height = "46px";
      } else {
        cur.style.width = "9px";
        cur.style.height = "9px";
        cur.style.background = "#00d4ff";
        cur.style.border = "none";
        foll.style.width = "28px";
        foll.style.height = "28px";
      }
    };

    // Event delegation: works for elements mounted at any time
    // (mobile menu, scroll-to-top button, case-study content, …).
    const onOver = (e) => {
      const hot = !!e.target.closest?.(HOVER_SELECTOR);
      if (hot !== hovering) {
        hovering = hot;
        setHover(hot);
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={curRef}
        aria-hidden="true"
        className="fixed z-[9999] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 transition-[width,height,background,border] duration-200"
        style={{ width: 9, height: 9, background: "#00d4ff" }}
      />
      <div
        ref={follRef}
        aria-hidden="true"
        className="fixed z-[9998] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 border border-[#00d4ff]/35 transition-[width,height] duration-200"
        style={{ width: 28, height: 28 }}
      />
    </>
  );
}
