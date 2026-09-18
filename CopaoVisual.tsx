import { useRef, useState } from "react";
import { arenaPhotos } from "../assets/photos";
import { useCopaoMotion } from "./useCopaoMotion";
import "../styles/copao.css";

export function CopaoVisual({ variant = "hero" }: { variant?: "hero" | "closeup" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [usePng, setUsePng] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const { mode, pointer } = useCopaoMotion(ref, loaded && !unavailable);
  // Every mode uses the clean asset. The original photo with the hand is archival only.
  const image = usePng ? arenaPhotos.copaoPng : arenaPhotos.copao;
  return <div ref={ref} className={`copao-visual copao-visual--${variant}`} data-copao-mode={unavailable ? "image-error" : mode}
    onPointerMove={event => {
      if (mode !== "animated" || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (min-width: 961px)").matches) return;
      const rect = event.currentTarget.getBoundingClientRect();
      pointer.current = {
        x: Math.max(-4, Math.min(4, ((event.clientX - rect.left) / rect.width - .5) * 8)),
        y: Math.max(-2, Math.min(2, -((event.clientY - rect.top) / rect.height - .5) * 4)),
        active: true,
      };
    }}
    onPointerLeave={() => { pointer.current = { x: 0, y: 0, active: false }; }}>
    <div className="copao-halo" aria-hidden="true" />
    <div className="copao-ground" aria-hidden="true" />
    {!unavailable ? <>
      <div className="copao-depth">
        <svg className="copao-artwork" viewBox={variant === "closeup" ? "5 85 395 510" : "0 0 415 699"} role="img" aria-label={variant === "closeup" ? "Detalhe do copão ST Arena Beer, adesivo original e bolhas" : "Copão real da ST Arena Beer com bebida dourada e adesivo original"} focusable="false">
          <image href={image} width="415" height="699" />
        </svg>
      </div>
      <svg className="copao-reflection" viewBox="0 0 415 699" aria-hidden="true" focusable="false"><image href={image} width="415" height="699" /></svg>
    </> : <p className="copao-image-unavailable">ST ARENA BEER</p>}
    {!unavailable && <img className="copao-load-probe" src={image} alt="" aria-hidden="true" width="415" height="699" loading={variant === "hero" ? "eager" : "lazy"} decoding="async" onLoad={() => setLoaded(true)} onError={() => { setLoaded(false); if (!usePng) setUsePng(true); else setUnavailable(true); }} />}
  </div>;
}
