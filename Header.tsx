import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { business } from "../data/business";
const links = [["#categorias", "Bebidas"], ["#monte-seu-kit", "Monte seu kit"], ["#direto-da-arena", "ST Arena"], ["#localizacao", "Contato"]];
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!open) return;
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key === "Tab" && navigation.current && toggle.current) {
        const items = [toggle.current, ...navigation.current.querySelectorAll<HTMLAnchorElement>("a")];
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const media = matchMedia("(min-width: 961px)");
    const close = () => setOpen(false);
    document.addEventListener("keydown", onKey); media.addEventListener("change", close);
    return () => { document.removeEventListener("keydown", onKey); media.removeEventListener("change", close); };
  }, [open]);
  return <header className="header"><div className="container header-inner">
    <a className="brand" href="#hero" aria-label="ST Arena Beer — início" onClick={() => setOpen(false)}><span>ST ARENA <b>BEER</b></span><small>PIRATINI — RS</small></a>
    <button ref={toggle} className="menu-toggle" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
    <nav ref={navigation} id="navigation" className={open ? "navigation is-open" : "navigation"} aria-label="Principal">
      {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a className="header-contact" href={business.whatsapp.href} target="_blank" rel="noopener noreferrer">Falar com a ST Arena <ArrowUpRight size={16} aria-hidden="true" /></a>
    </nav>
  </div></header>;
}
