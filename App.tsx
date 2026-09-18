import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Hero } from "./sections/Hero";
import { Categories } from "./sections/Categories";
import { BuildYourKit } from "./sections/BuildYourKit";
import { CopaoSection } from "./sections/CopaoSection";
import { Highlights } from "./sections/Highlights";
import { SocialGallery } from "./sections/SocialGallery";
import { Location } from "./sections/Location";
import { FinalCTA } from "./sections/FinalCTA";
import "./styles/tokens.css";
import "./styles/global.css";
export default function App() {
  return <div id="st-arena-app">
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <Header /><main id="conteudo">
      <Hero /><Categories /><BuildYourKit /><CopaoSection />
      <Highlights /><SocialGallery /><Location /><FinalCTA />
    </main><Footer /><FloatingWhatsApp />
  </div>;
}
