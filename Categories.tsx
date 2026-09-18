import { ArrowUpRight } from "lucide-react";
import { business } from "../data/business";
import { arenaPhotos } from "../assets/photos";
export function Categories() {
  return <section id="categorias" className="section" aria-labelledby="categories-heading"><div className="container">
    <div className="section-heading"><div><p className="eyebrow">01 / BEBIDAS</p><h2 id="categories-heading">ESCOLHA SEU<br /><em>PONTO DE PARTIDA.</em></h2></div><p>Da base ao acompanhamento.<br />As opções você consulta com a ST Arena.</p></div>
    <div className="category-grid">
      <a className="category-photo" href={business.whatsapp.buildOrderUrl("Olá! Quais destilados vocês têm disponíveis?")} target="_blank" rel="noopener noreferrer"><img src={arenaPhotos.buscaBriza} alt="Registro original de uma garrafa Busca Briza na ST Arena" loading="lazy" width="400" height="400" /><div className="photo-label"><span>01</span><h3>DESTILADOS</h3><span className="photo-link">Consultar rótulos <ArrowUpRight size={20} aria-hidden="true" /></span></div></a>
      <div className="category-options">{business.categories.slice(1).map((category, index) => <a key={category.id} className="category-option" href={business.whatsapp.buildOrderUrl(`Olá! Gostaria de consultar as opções de ${category.title.toLowerCase()} disponíveis.`)} target="_blank" rel="noopener noreferrer"><span className="eyebrow">0{index + 2}</span><div><h3>{category.title}</h3><p>{category.description}</p></div><ArrowUpRight aria-hidden="true" /></a>)}<p className="availability-note">Disponibilidade, marcas e sabores são confirmados pelo WhatsApp.</p></div>
    </div>
  </div></section>;
}
