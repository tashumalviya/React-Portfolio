import { useEffect, useRef } from "react";

const lerp = (a, b, t) => a + (b - a) * t;

export default function Cursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    let mx = 0, my = 0, tx = 0, ty = 0, raf = 0;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; cursor.style.left = mx + "px"; cursor.style.top = my + "px"; };
    const animate = () => {
      tx = lerp(tx, mx, 0.14); ty = lerp(ty, my, 0.14);
      trail.style.left = tx + "px"; trail.style.top = ty + "px";
      raf = requestAnimationFrame(animate);
    };
    animate();

    const interactables = "a, button, [data-magnetic], input, textarea, .project-card, .tl-card, .exp-card, .skill-glass, .social-btn";
    const onOver = (e) => { if (e.target.closest(interactables)) { cursor.classList.add("expanded"); trail.classList.add("expanded"); } };
    const onOut = (e) => { if (e.target.closest(interactables)) { cursor.classList.remove("expanded"); trail.classList.remove("expanded"); } };
    const onDown = () => (cursor.style.transform = "translate(-50%, -50%) scale(0.8)");
    const onUp = () => (cursor.style.transform = "translate(-50%, -50%) scale(1)");

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (<><div className="cursor" ref={cursorRef} /><div className="cursor-trail" ref={trailRef} /></>);
}