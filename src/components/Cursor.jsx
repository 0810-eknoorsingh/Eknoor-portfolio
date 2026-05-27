import { useEffect, useRef } from "react";

export default function Cursor() {
  const curRef = useRef(null);
  const follRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, fx: 0, fy: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cur = curRef.current;
    const foll = follRef.current;
    if (!cur || !foll) return;

    cur.style.opacity = "1";
    foll.style.opacity = "1";

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", onMove);

    let rafId;
    const animate = () => {
      pos.current.fx += (pos.current.x - pos.current.fx) * 0.13;
      pos.current.fy += (pos.current.y - pos.current.fy) * 0.13;
      foll.style.left = pos.current.fx + "px";
      foll.style.top = pos.current.fy + "px";
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => {
      cur.style.width = "14px";
      cur.style.height = "14px";
      cur.style.background = "transparent";
      cur.style.border = "2px solid #00d4ff";
      foll.style.width = "46px";
      foll.style.height = "46px";
    };
    const onLeave = () => {
      cur.style.width = "9px";
      cur.style.height = "9px";
      cur.style.background = "#00d4ff";
      cur.style.border = "none";
      foll.style.width = "28px";
      foll.style.height = "28px";
    };

    const els = document.querySelectorAll("a, button, [data-hover]");
    els.forEach((el) => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      els.forEach((el) => { el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave); });
    };
  }, []);

  return (
    <>
      <div
        ref={curRef}
        className="fixed z-[9999] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 transition-[width,height,background,border] duration-200"
        style={{ width: 9, height: 9, background: "#00d4ff" }}
      />
      <div
        ref={follRef}
        className="fixed z-[9998] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 border border-[#00d4ff]/35 transition-[width,height] duration-200"
        style={{ width: 28, height: 28 }}
      />
    </>
  );
}
