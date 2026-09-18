import { ArrowUpRight } from "lucide-react";
import { business } from "../data/business";
import { WhatsAppIcon } from "../components/Icons";
export function FinalCTA() {
  return <section className="section final-cta" aria-labelledby="final-heading"><div className="container"><p className="eyebrow">ESCOLHEU SUAS PREFERÊNCIAS?</p><h2 id="final-heading">AGORA É COM<br /><em>A ST ARENA.</em></h2><p>Consulte as opções. Monte do seu jeito.</p><a className="btn btn-whatsapp" href={business.whatsapp.buildOrderUrl("Olá! Gostaria de consultar as opções e fazer um pedido na ST Arena.")} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={20} />FALAR COM A ST ARENA <ArrowUpRight size={18} aria-hidden="true" /></a></div></section>;
}
