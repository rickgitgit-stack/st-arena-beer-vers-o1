import { business } from "../data/business";
export function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><a className="brand" href="#hero"><span>ST ARENA <b>BEER</b></span><small>PIRATINI — RS</small></a><nav aria-label="Rodapé"><a href="#monte-seu-kit">Monte seu kit</a><a href={business.instagram.url} target="_blank" rel="noopener noreferrer">Instagram</a><a href={business.whatsapp.href} target="_blank" rel="noopener noreferrer">WhatsApp</a></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} ST Arena Beer</span><p>Venda proibida para menores de 18 anos. Beba com moderação.</p></div></div></footer>;
}
