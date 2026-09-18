// Nome/cidade e Instagram fornecidos no pedido. Telefone preservado da base,
// ainda sujeito à confirmação do responsável. Opções são preferências, não estoque.
const WHATSAPP_NUMBER = "5553999326667";
export const business = {
  name: "ST Arena Beer", city: "Piratini", state: "RS",
  whatsapp: {
    number: WHATSAPP_NUMBER, formatted: "(53) 99932-6667", confirmed: false,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    buildOrderUrl: (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  },
  instagram: { handle: "@st_arena_beer_piratini", url: "https://instagram.com/st_arena_beer_piratini" },
  categories: [
    { id: "destilados", title: "Destilados", description: "Consulte rótulos e opções." },
    { id: "energeticos", title: "Energéticos", description: "Veja as opções para acompanhar." },
    { id: "gelo", title: "Gelo", description: "Consulte tipos e sabores." },
  ],
  kitGroups: [
    { id: "base", title: "Base", options: ["Whisky", "Vodka", "Gin", "Outro"] },
    { id: "mixer", title: "Acompanhamento", options: ["Energético", "Refrigerante", "Outro"] },
    { id: "ice", title: "Gelo", options: ["Tradicional", "Gelo de sabor", "Consultar opções"] },
  ],
};
