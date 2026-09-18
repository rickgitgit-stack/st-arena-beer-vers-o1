import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { WhatsAppIcon } from "../components/Icons";
import { business } from "../data/business";
export function BuildYourKit() {
  const [selections, setSelections] = useState(["Whisky", "Energético", "Consultar opções"]);
  const message = `Olá! Gostaria de montar um kit. Tenho preferência por ${selections[0]} + ${selections[1]} + ${selections[2]}. Quais opções vocês têm disponíveis?`;
  return <section id="monte-seu-kit" className="section kit-section" aria-labelledby="kit-heading"><div className="container kit-grid">
    <div className="kit-intro"><p className="eyebrow">02 / SUA COMBINAÇÃO</p><h2 id="kit-heading">MONTE{" "}<br />SEU <em>KIT.</em></h2><p>Você escolhe o caminho.<br />A ST Arena confirma as opções.</p><a className="text-link" href="#copao-arena">Conheça o copão <ArrowUpRight size={17} aria-hidden="true" /></a></div>
    <div className="kit-builder">
      {business.kitGroups.map((group, index) => <fieldset key={group.id}><legend><span>0{index + 1}</span>{group.title}</legend><div className="kit-options">{group.options.map(option => <label className={selections[index] === option ? "kit-option selected" : "kit-option"} key={option}><input type="radio" name={group.id} value={option} checked={selections[index] === option} onChange={() => setSelections(previous => previous.map((value, at) => at === index ? option : value))} /><span>{option}</span></label>)}</div></fieldset>)}
      <div className="kit-summary" aria-live="polite" aria-atomic="true"><span>SUA PREFERÊNCIA</span><p>{selections.join(" + ")}</p></div>
      <a id="kit-whatsapp-order-cta" className="btn btn-whatsapp" href={business.whatsapp.buildOrderUrl(message)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={20} />MONTAR PELO WHATSAPP <ArrowUpRight size={18} aria-hidden="true" /></a><p className="availability-note">A seleção expressa suas preferências. Consulte disponibilidade antes de pedir.</p>
    </div>
  </div></section>;
}
