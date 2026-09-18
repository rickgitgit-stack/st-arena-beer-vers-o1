import { ArrowUpRight } from "lucide-react";
import { CopaoVisual } from "../components/CopaoVisual";
import { business } from "../data/business";
export function CopaoSection() {
  return <section id="copao-arena" className="section copao-section" aria-labelledby="copao-heading"><div className="container copao-grid">
    <figure className="copao-detail"><CopaoVisual variant="closeup" /><figcaption>ST ARENA BEER / REGISTRO REAL</figcaption></figure>
    <div><p className="eyebrow">03 / DO SEU JEITO</p><h2 id="copao-heading">O COPÃO<br /><em>DA ST ARENA.</em></h2><p>Monte do seu jeito e consulte as opções disponíveis diretamente pelo WhatsApp.</p><a className="btn btn-yellow" href={business.whatsapp.buildOrderUrl("Olá! Gostaria de consultar as opções para o copão da ST Arena.")} target="_blank" rel="noopener noreferrer">CONSULTAR OPÇÕES <ArrowUpRight size={18} aria-hidden="true" /></a></div>
  </div></section>;
}
