import { ArrowDownRight } from "lucide-react";
import { WhatsAppIcon } from "../components/Icons";
import { HeroCopao } from "../components/HeroCopao";
import { business } from "../data/business";
export function Hero() {
  return <section id="hero" className="hero" aria-labelledby="hero-heading"><div className="container hero-grid">
    <div className="hero-copy"><p className="eyebrow">ST ARENA BEER • PIRATINI — RS</p>
      <h1 id="hero-heading">ST ARENA BEER.<br />BEBIDA GELADA.<br /><em>DO SEU JEITO.</em></h1>
      <p className="hero-description">Escolha suas preferências. Fale direto com a ST Arena e consulte as opções disponíveis.</p>
      <div className="actions"><a id="hero-whatsapp-main-cta" className="btn btn-whatsapp" href={business.whatsapp.buildOrderUrl("Olá! Gostaria de consultar as bebidas disponíveis na ST Arena.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={20} />PEDIR PELO WHATSAPP</a><a className="btn btn-outline" href="#monte-seu-kit">MONTE SEU KIT <ArrowDownRight size={18} aria-hidden="true" /></a></div>
      <p className="hero-note">ADEGA <span>/</span> CONTATO DIRETO <span>/</span> DO SEU JEITO</p>
    </div><HeroCopao />
  </div><div className="container hero-bottom"><span>BEBIDAS & POSSIBILIDADES</span><a href="#categorias">EXPLORE A ST ARENA <ArrowDownRight size={16} aria-hidden="true" /></a></div></section>;
}
