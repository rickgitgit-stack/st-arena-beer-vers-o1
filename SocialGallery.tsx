import { ArrowUpRight } from "lucide-react";
import { business } from "../data/business";
import { arenaPhotos } from "../assets/photos";
export function SocialGallery() {
  return <section id="direto-da-arena" className="section" aria-labelledby="gallery-heading"><div className="container">
    <div className="section-heading"><div><p className="eyebrow">05 / A NOSSA IDENTIDADE</p><h2 id="gallery-heading">DIRETO<br /><em>DA ST ARENA.</em></h2></div><a className="text-link instagram-link" href={business.instagram.url} target="_blank" rel="noopener noreferrer">{business.instagram.handle} <ArrowUpRight size={19} aria-hidden="true" /></a></div>
    <div className="gallery-grid"><figure className="gallery-main"><img src={arenaPhotos.sign} alt="Placa original iluminada da ST Arena Beer e seu reflexo" loading="lazy" width="540" height="520" /><figcaption>ST ARENA BEER / PIRATINI — RS</figcaption></figure><figure className="gallery-secondary"><img src={arenaPhotos.ballena} alt="Registro original de Ballena na ST Arena" loading="lazy" /><figcaption>UM REGISTRO DA ST ARENA</figcaption></figure></div>
  </div></section>;
}
