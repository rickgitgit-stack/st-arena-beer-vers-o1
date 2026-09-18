import { ArrowUpRight } from "lucide-react";
import { arenaPhotos } from "../assets/photos";
import { business } from "../data/business";
const products = [{ name: "Ballena", photo: arenaPhotos.ballena }, { name: "Busca Briza", photo: arenaPhotos.buscaBriza }];
export function Highlights() {
  return <section id="destaques" className="section highlights" aria-labelledby="highlights-heading"><div className="container">
    <div className="section-heading"><div><p className="eyebrow">04 / NOS REGISTROS DA ST ARENA</p><h2 id="highlights-heading">RÓTULOS<br /><em>EM FOCO.</em></h2></div><p>Registros dos produtos.<br />Consulte a disponibilidade atual.</p></div>
    <div className="highlight-grid">{products.map(product => <article className="highlight-card" key={product.name}><div className="highlight-photo"><img src={product.photo} alt={`Post original da ST Arena mostrando ${product.name}`} loading="lazy" /></div><div className="highlight-info"><div><p className="eyebrow">DESTILADOS</p><h3>{product.name}</h3></div><a className="text-link" href={business.whatsapp.buildOrderUrl(`Olá! Vi o registro de ${product.name} no site. Esse rótulo está disponível?`)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar disponibilidade de ${product.name}`}>Consultar disponibilidade <ArrowUpRight size={20} aria-hidden="true" /></a></div></article>)}</div>
  </div></section>;
}
