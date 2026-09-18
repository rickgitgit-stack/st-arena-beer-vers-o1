import { ArrowUpRight } from "lucide-react";
import { business } from "../data/business";
export function Location() {
  return <section id="localizacao" className="section contact-section" aria-labelledby="contact-heading"><div className="container contact-grid"><div><p className="eyebrow">06 / CONTATO</p><h2 id="contact-heading">ST ARENA BEER<br /><em>PIRATINI — RS.</em></h2></div><div><p>Para saber as opções disponíveis e combinar seu pedido, fale diretamente com a ST Arena.</p><a className="btn btn-outline" href={business.whatsapp.buildOrderUrl("Olá! Gostaria de falar com a ST Arena e consultar as opções disponíveis.")} target="_blank" rel="noopener noreferrer">FALAR COM A ST ARENA <ArrowUpRight size={18} aria-hidden="true" /></a></div></div></section>;
}
