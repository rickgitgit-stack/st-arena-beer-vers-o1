# Auditoria e entrega — ST Arena Beer

Data: 18/09/2026. Projeto de origem: st-arena-beer-3d.zip.
O projeto enviado foi extraído e editado; a base React/TypeScript/Vite foi mantida.
O ZIP original permanece intacto e acompanha a entrega como st-arena-beer-original.zip.

**Atualização do copão em 18/09/2026:** a fotografia real foi recebida e integrada ao Hero
e à seção dedicada com perspectiva 2.5D. Na etapa seguinte, a mão foi removida do asset,
o adesivo original foi preservado e os modos estáticos passaram a usar o mesmo recorte limpo.
A pendência fotográfica da primeira entrega foi
resolvida. Consulte COPAO-IMPLEMENTACAO.md para os arquivos e a validação desta etapa.
O restante deste documento registra a auditoria histórica da primeira refatoração;
menções à fotografia pendente descrevem aquela entrega anterior.

## 1. Estado inicial e arquitetura real

- package.json na raiz, React 18, Vite 5 e TypeScript.
- src/main.tsx monta App sob React.StrictMode.
- App montava Header, Hero, Categories, BuildYourKit, CopaoSection, Highlights,
  ResenhaFutebol, SocialGallery, Delivery, Location, FinalCTA, Footer e FloatingWhatsApp.
- Hero montava HeroCopao, que usava o PNG artificial de recorte.
- RealCopao existia, importava ArenaScene e tinha combinações e “O Mais Pedido”,
  mas não era montado por App nem pelas seções montadas.
- ArenaScene → Canvas → Lighting + ArenaCopao3D → stickerTexture.
  A textura redesenhava o adesivo. Essa árvore não era utilizada na página atual.
- ArenaBarrel, scrollState e a faixa CSS do barril eram remanescentes; FinalCTA usava ArenaSign,
  uma reconstrução SVG da marca.
- business.ts declarava dados “oficiais” e “verificados” sem evidência suficiente.
- Location apontava para uma busca de Maps por Piratini, não para a loja.
- A versão inicial rodou localmente; a verificação TypeScript inicial passou.
  O console inicial não mostrou erros nas observações coletadas.
- O README não descrevia o código real e dizia que build/install não haviam sido executados.

## 2. Arquivos modificados

- .gitignore
- index.html
- metadata.json
- package.json
- README.md
- src/App.tsx
- src/assets/photos.ts
- src/components/FloatingWhatsApp.tsx
- src/components/Footer.tsx
- src/components/Header.tsx
- src/components/HeroCopao.tsx
- src/components/Icons.tsx
- src/data/business.ts
- src/sections/BuildYourKit.tsx
- src/sections/Categories.tsx
- src/sections/CopaoSection.tsx
- src/sections/FinalCTA.tsx
- src/sections/Hero.tsx
- src/sections/Highlights.tsx
- src/sections/Location.tsx
- src/sections/SocialGallery.tsx
- src/styles/global.css
- src/styles/tokens.css

Adicionados: pnpm-lock.yaml, AUDITORIA.md e os três assets originais recuperados
(placa-original.jpg, ballena-original.jpg, busca-briza-original.png).
dist contém o build final e está incluído no pacote.

## 3. Arquivos removidos

- bun.lock
- tsconfig.app.tsbuildinfo
- tsconfig.node.tsbuildinfo
- src/assets/images/logo-mark.svg
- src/assets/images/st_arena_beers_1789710253942.jpg
- src/assets/images/st_arena_copao_1789710212328.jpg
- src/assets/images/st_arena_copao_cutout.png
- src/assets/images/st_arena_facade_1789710226777.jpg
- src/assets/images/st_arena_shelves_1789710240848.jpg
- src/assets/images/st_copao_macro_1789710266034.jpg
- src/assets/images/st_copao_macro_fixed.jpg
- src/sections/ResenhaFutebol.tsx
- src/sections/Delivery.tsx
- src/components/RealCopao.tsx
- src/components/ArenaSign.tsx
- src/styles/barrel-track.css
- src/three/ArenaScene.tsx
- src/three/ArenaCopao3D.tsx
- src/three/ArenaBarrel.tsx
- src/three/Lighting.tsx
- src/three/scrollState.ts
- src/three/stickerTexture.ts
- src/three/useInViewport.ts

Os arquivos tsbuildinfo são caches gerados, agora ignorados pelo versionamento.
O lockfile Bun antigo foi substituído pelo pnpm-lock.yaml.
Também foram removidas as dependências sem uso: React Three Fiber, Drei, Three,
GSAP, Sharp e os tipos de Three. Não foram introduzidas bibliotecas adicionais.

## 4. Componentes refatorados

- Header: navegação enxuta, menu mobile, aria-expanded/controls, Escape e circulação
  de foco dentro do menu aberto. Marca em texto, sem redesenhar um logotipo.
- Hero/HeroCopao: duas colunas desktop; empilhamento mobile; copy solicitada e
  CTA verde acima da dobra. Placa como fallback explícito no código e nesta auditoria.
- Categories: destilados com registro fotográfico; energéticos e gelo com links
  discretos, sem simular fotografias ausentes. Cervejas e categorias extras foram
  omitidas por falta de material individual confiável disponível.
- BuildYourKit: três grupos de radios nativos, preferências genéricas, resumo
  anunciado com aria-live e mensagem codificada no link de WhatsApp.
- CopaoSection: texto solicitado e consulta; foto entra apenas quando fornecida.
- Highlights: dois registros identificáveis, Ballena e Busca Briza. Não foram
  criados mais cards para atingir uma quantidade sem material apropriado.
- SocialGallery: placa e post original, composição assimétrica e Instagram solicitado.
- Location: apenas ST Arena Beer, Piratini — RS e contato.
- FinalCTA/Footer: copy curta, sem serviços inferidos.
- FloatingWhatsApp: IntersectionObserver com threshold 0; aparece no desktop
  quando o Hero sai completamente da viewport. Mobile mantém o botão compacto;
  mudanças de breakpoint recalculam sua visibilidade.
- CSS/tokens: preto profundo, branco, amarelo, bordas discretas, raios 10–16px,
  container máximo 1320px e espaçamentos específicos para mobile/desktop.

## 5. Conteúdo fictício ou não confirmado retirado

- Futebol na TV, Grêmio/Inter, dia de jogo, resenha e mensagens associadas.
- Entrega/tele-entrega, agilidade, retirada rápida, bebidas em temperatura garantida.
- Linha completa, melhores marcas, sabores específicos, combinações populares,
  títulos “Campeão”, “Sucesso”, “Edição Especial”, “O Mais Pedido”.
- Catálogo permanente de marcas, formatos e quantidades; seleção de kit com marcas fixas.
- Afirmações técnicas e combinações do RealCopao inutilizado.
- Copão inteiro com “Cold Brew”; macro com “EST. 2023 | LONDON”; recortes corrigidos
  por reconstrução de identidade. Nenhuma dessas imagens permanece no código final.
- Foto de prateleira com placa “Adega do Luciano”, sem vínculo comprovado à ST Arena.
- Fachada e fotografia de cervejas do ZIP, cuja autenticidade não estava comprovada.
- SVG da marca, textura desenhada e componente de placa reconstruída.
- Maps por cidade e referências a localização específica não confirmada.
- Metadata que mencionava delivery, 3D e capacidade Gemini não utilizada.

Não havia avaliação numérica ou preço renderizado nos componentes observados.
Os preços visíveis na fotografia de outra adega desapareceram com a remoção do asset.
Nenhuma capacidade de copão é informada. Nenhum endereço ou horário foi adicionado.

## 6. Hero/copão e procedência fotográfica

Fontes recuperadas de:
C:/Users/troxa/Desktop/st arena/st-arena-beer/src/assets/images/

| Arquivo encontrado | Conteúdo observado | Arquivo entregue |
| --- | --- | --- |
| neon-sign.jpg | Fotografia da placa com a identidade ST Arena Beer | placa-original.jpg |
| novidade-ballena.jpg | Post mostrando garrafa Ballena e identidade ST Arena | ballena-original.jpg |
| logo-mark.png | Apesar do nome, fotografia/post de Busca Briza na mão | busca-briza-original.png |

Os arquivos foram copiados sem gerar ou reconstruir conteúdo. A inspeção visual
conferiu o conteúdo, não apenas o nome de arquivo. Uma imagem chamada
novidade-busca-briza.jpg na versão antiga mostrava Mansão Maromba; ela não foi usada
como Busca Briza. Os registros têm resolução limitada; originais maiores serão úteis.
A procedência/publicação original dos três registros ainda pode ser confirmada pelo responsável.

A implementação da foto do Hero oferece perspective 1200px, tilt por mouse até
4 graus em desktop, floating de 8s e deslocamento vertical até 8px. Em mobile não
há mouse tracking. prefers-reduced-motion remove animações, transforms de interação
e rolagem suave. Sem Canvas, partículas ou geração de adesivo.

Para concluir: inserir uma única foto validada em src/assets/images/copao-real.jpg
(também aceita jpeg, png ou webp), reconstruir e conferir visualmente Hero e seção.
O carregamento opcional está preparado via import.meta.glob em photos.ts.
A fotografia será preservada integralmente, com object-fit: contain no Hero.

## 7. Remoção da seção de futebol

ResenhaFutebol foi excluído fisicamente, seu import e montagem foram retirados de App.
A copy associada foi eliminada também do Footer e de business.ts.
A busca textual final em src, index.html e metadata.json não encontrou termos
de futebol/resenha, identidades falsas, 700ml ou Maps. Não se trata de ocultação CSS.
Materiais antigos com comunicação esportiva não foram copiados para a entrega.

## 8. Build e validações

- Dependências instaladas e lockfile atualizado.
- TypeScript: node node_modules/typescript/bin/tsc -b — exit 0.
- Produção: node node_modules/vite/bin/vite.js build — exit 0.
- Servidores locais executados: desenvolvimento na porta 3000 e build na 3001.
- Console do build final: nenhuma mensagem de erro ou aviso na aba limpa inspecionada.
  Durante edição por HMR houve falhas transitórias entre arquivos, resolvidas com
  recarga. Um aviso real de fetchPriority no React 18 foi corrigido removendo a prop.
- JS final: 164.53 kB / aproximadamente 52 kB gzip.
- CSS final: 14.08 kB / aproximadamente 3.71 kB gzip.
- Três assets fotográficos: aproximadamente 186 kB no total.
- Nenhum Canvas. Todas as imagens têm alt e foram observadas carregadas ao visitar
  suas respectivas regiões; lazy loading mantém fotos fora da tela sem carregamento imediato.
- Todos os anchors internos observados apontam para IDs existentes.
- Kit testado por mouse e teclado, incluindo a mensagem:
  “Olá! Gostaria de montar um kit. Tenho preferência por Vodka + Refrigerante +
  Gelo de sabor. Quais opções vocês têm disponíveis?”
- Menu: abrir/fechar, Escape, Shift+Tab do botão ao último link e Tab de retorno ao botão.
- Focus-visible e radios nativos preservados. Movimento reduzido revisado no código;
  não foi alterada a preferência de animação do sistema operacional.
- Overflow inicial de 5px no mobile, causado pelo halo, corrigido. A proporção das
  imagens com dimensões HTML também foi corrigida com height: auto.

| Largura inspecionada | Resultado |
| --- | --- |
| 390px | Sem overflow horizontal, CTA do Hero acima da dobra, kit e menu testados |
| 430px | Sem overflow horizontal ou títulos excedendo o container |
| 768px | Layout tablet empilhado, configurador íntegro |
| 1440px | Duas colunas; CTA acima da dobra também com altura de 768px |
| 1920px | Container limitado a 1320px, sem overflow, CTA acima da dobra |

Esta é uma verificação local funcional e visual, não um teste de campo de performance,
uma auditoria formal WCAG ou confirmação externa de atendimento pelo telefone.
Nenhuma mensagem foi enviada pelo WhatsApp; a geração e o destino dos links foram inspecionados.

## 9. Informações ainda necessárias

1. Fotografia original do copão com o adesivo verdadeiro — envio adiado pelo responsável.
2. Confirmação de que (53) 99932-6667 é o WhatsApp correto. O número foi preservado
   para manter a integração, sem repetir a declaração anterior de “verificado”.
3. Confirmação da procedência dos três registros recuperados da versão antiga.
4. Fotos individuais de cervejas/energéticos/gelo e mais registros da adega,
   caso se deseje ampliar categorias e destaques com fotografia.
5. Endereço, horários e existência de delivery somente se o responsável quiser
   confirmar e acrescentar esses dados futuramente. Eles estão ausentes da página atual.

Não publicar como versão definitiva antes de resolver as pendências que o responsável
considerar necessárias, especialmente a fotografia do copão e o número de contato.
