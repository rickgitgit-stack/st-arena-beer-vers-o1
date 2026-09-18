import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Icons";
import { business } from "../data/business";
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const mobile = matchMedia("(max-width: 768px)");
    let heroVisible = true;
    const update = () => setVisible(mobile.matches || !heroVisible);
    const observer = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; update(); }, { threshold: 0 });
    observer.observe(hero); update(); mobile.addEventListener("change", update);
    return () => { observer.disconnect(); mobile.removeEventListener("change", update); };
  }, []);
  if (!visible) return null;
  return <a className="floating-whatsapp" href={business.whatsapp.href} target="_blank" rel="noopener noreferrer" aria-label="Falar com a ST Arena no WhatsApp"><WhatsAppIcon size={25} /></a>;
}
