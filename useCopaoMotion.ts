import { RefObject, useEffect, useRef, useState } from "react";

export type CopaoMode = "animated" | "static" | "reduced" | "low-performance";

export function useCopaoMotion(ref: RefObject<HTMLElement>, ready: boolean) {
  const [mode, setMode] = useState<CopaoMode>("static");
  const pointer = useRef({ x: 0, y: 0, active: false });
  useEffect(() => {
    const element = ref.current;
    if (!element || !ready) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(hover: hover) and (min-width: 961px)");
    // Explicit development-only controls for repeatable fallback verification.
    const test = import.meta.env.DEV ? new URLSearchParams(location.search).get("copao-test") : null;
    let inView = false, frame = 0, running = false, last = 0, time = 0, sample = 0, slow = 0;
    let x = 0, y = 0, activity = 0, lowPerformance = test === "slow";
    const reset = () => {
      cancelAnimationFrame(frame); frame = 0; running = false; last = 0;
      pointer.current = { x: 0, y: 0, active: false }; x = 0; y = 0;
      for (const property of ["--cup-x", "--cup-y", "--cup-float", "--cup-scroll", "--cup-scale", "--cup-idle", "--cup-idle-x"]) element.style.removeProperty(property);
    };
    const updateMode = () => {
      if (reduced.matches || test === "reduce") { reset(); setMode("reduced"); return; }
      if (lowPerformance) { reset(); setMode("low-performance"); return; }
      if (document.hidden || !inView) { reset(); setMode("static"); return; }
      setMode("animated");
      if (!running) { running = true; frame = requestAnimationFrame(tick); }
    };
    const tick = (now: number) => {
      if (!running) return;
      const elapsed = last ? now - last : 16.7;
      const dt = Math.min(elapsed, 80);
      if (last && elapsed < 250) {
        sample++; if (elapsed > 34) slow++;
        if (sample >= 120) {
          if (slow / sample > .45) { lowPerformance = true; updateMode(); return; }
          sample = 0; slow = 0;
        }
      }
      last = now; time += dt;
      const damping = 1 - Math.exp(-dt / 140);
      activity += ((pointer.current.active ? 1 : 0) - activity) * damping;
      x += ((desktop.matches ? pointer.current.x : 0) - x) * damping;
      y += ((desktop.matches ? pointer.current.y : 0) - y) * damping;
      // Reads only while visible. No scroll handler or React updates per frame.
      const rect = element.getBoundingClientRect();
      const scroll = desktop.matches ? Math.min(1, Math.max(0, -rect.top / 500)) : 0;
      element.style.setProperty("--cup-x", x.toFixed(3) + "deg");
      element.style.setProperty("--cup-y", y.toFixed(3) + "deg");
      element.style.setProperty("--cup-idle", (desktop.matches ? (1 - activity) * Math.sin(time / 1500) * 2.5 + scroll * 1.8 : 0).toFixed(3) + "deg");
      element.style.setProperty("--cup-idle-x", (desktop.matches ? (1 - activity) * Math.sin(time / 1500 + .7) : 0).toFixed(3) + "deg");
      element.style.setProperty("--cup-float", ((Math.cos(time / 1500) - 1) * 3.5).toFixed(3) + "px");
      element.style.setProperty("--cup-scroll", (-scroll * 12).toFixed(3) + "px");
      element.style.setProperty("--cup-scale", (1 - scroll * .02).toFixed(4));
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; updateMode(); }, { threshold: 0 });
    observer.observe(element);
    document.addEventListener("visibilitychange", updateMode);
    reduced.addEventListener("change", updateMode);
    desktop.addEventListener("change", updateMode);
    updateMode();
    return () => { reset(); observer.disconnect(); document.removeEventListener("visibilitychange", updateMode); reduced.removeEventListener("change", updateMode); desktop.removeEventListener("change", updateMode); };
  }, [ref, ready]);
  return { mode, pointer };
}
