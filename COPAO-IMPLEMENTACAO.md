# Copão sem mão — implementação no projeto atual

18/09/2026. Esta etapa substitui o recorte anterior que incluía a mão.

## Código e assets efetivamente utilizados

App → Hero → HeroCopao → CopaoVisual; CopaoSection reutiliza CopaoVisual com close-up.
RealCopao, ArenaScene, ArenaCopao3D e Lighting não existem mais na base atual. Não havia
implementação Three.js órfã a reaproveitar nesta etapa. As dependências foram mantidas.

O SVG anterior recortava copao-real.jpeg incluindo a mão, e o fallback mostrava a fotografia
completa. Ambos foram substituídos. A fotografia original continua arquivada e não é importada
pela aplicação. Nenhum asset com identidade artificial é renderizado.

## Novo asset e remoção da mão

- src/assets/images/copao-sem-mao.png: 415 × 699 px, RGBA, alpha real; 343,67 kB.
- src/assets/images/copao-sem-mao.webp: mesma imagem com compressão lossless; 155,68 kB.

A máscara segue a borda do copo e elimina fundo, dedos, unha, anel, mão e pulso.
Pixels completamente transparentes foram zerados, inclusive seus canais RGB.
O contorno possui 1.995 pixels com alpha parcial para antialiasing e 79.453 pixels transparentes.

Foi usada a ferramenta integrada image_gen para reconstruir a borda encoberta.
O resultado inteiro não preservou a fotografia suficientemente e não foi integrado.
Somente um fragmento da borda foi aproveitado no reparo superior esquerdo.
O líquido nesse trecho foi completado com pixels de uma região adjacente do copo original,
com transição suave. A composição foi exportada com Sharp do runtime já instalado,
sem adicionar Sharp ao projeto ou à aplicação.

O reparo fica na região superior esquerda, aproximadamente x=72–276 e y=669–807 da fotografia
original. Todo o restante do produto conserva os pixels do registro. O adesivo não foi gerado,
vetorizado ou redesenhado: a comparação RGB de sua área na composição encontrou zero pixels
alterados. PNG e WebP foram comparados após decodificação: zero diferenças em pixels visíveis
e no alpha. A pequena área originalmente escondida é uma reconstrução, não uma nova captura
fotográfica do produto. Prompt efetivamente enviado e uso do fragmento: COPAO-ASSET-PROMPT.txt.

## Arquivos alterados nesta rodada

- src/components/CopaoVisual.tsx: usa exclusivamente o recorte limpo em todos os modos;
  elimina clipPaths da fotografia com a mão e troca de fotografia nos modos estáticos;
  fallback de formato WebP → PNG e placeholder textual se os dois formatos falharem.
- src/components/useCopaoMotion.ts: limites e amplitudes atualizados.
- src/assets/photos.ts: importa os dois formatos limpos.
- src/styles/copao.css: translate3d, limites de rotação e pose estática do mesmo objeto.
- src/dev/copaoDiagnostics.ts: observa os novos assets.
- README.md, AUDITORIA.md e este relatório: atualização do estado entregue.
- dist/: build atualizado.
- COPAO-ASSET-PROMPT.txt: registro da edição de imagem utilizada.

Comparação por SHA-256 com st-arena-beer-antes-sem-mao.zip confirmou que App, Hero,
HeroCopao, CopaoSection, Header, Categories, BuildYourKit, Highlights, SocialGallery,
Location, FinalCTA, Footer, FloatingWhatsApp, business.ts, global.css, tokens.css,
package.json e pnpm-lock.yaml permaneceram idênticos. A melhoria ocorre no sistema
visual compartilhado, sem alterar a composição aprovada ou os CTAs.

## Pseudo-3D e comportamento

Perspectiva CSS de 1200 px, preserve-3d, transformações compostas, damping temporal de
140 ms, halo amarelo discreto, sombra difusa e reflexo com opacidade 0,085. Não há WebGL,
Canvas, materiais físicos ou shaders. O adesivo acompanha o objeto inteiro, com rotação
pequena que evita deformação excessiva.

Desktop: float de 0 a −7 px, ciclo de aproximadamente 9,4 s; idle Y de até ±2,5° e X de
até ±1°. Pointer: alvos Y ±4° / X ±2°, com interpolação; rotação combinada limitada aos
mesmos máximos. Scroll limitado a −12 px, contribuição Y de até 1,8° e escala 1 → 0,98.
Amostra observada no scroll: −7,680 px e escala 0,9872. Não há scroll-jacking.

Mobile/tablet abaixo de 961 px ou sem hover: apenas flutuação leve, sem tracking de
pointer, rotação idle ou transformações de scroll. Headline e CTA aparecem antes do produto.
A seção dedicada mantém um enquadramento próximo com o mesmo asset.

Movimento reduzido: RAF cancelado, propriedades de movimento removidas, ponteiro ignorado
e transform none. O copão limpo permanece visível, sem substituir a imagem por uma com mão.
Desempenho insuficiente: mesma pose estática. O monitor de lentidão existente foi mantido.

## Otimizações e acessibilidade

WebP lossless reutilizado pela mesma URL; PNG só é requisitado se o WebP falhar.
A renderização inicial e os modos estáticos compartilham a mesma dimensão e o mesmo asset.
Sem setState por quadro, sem bibliotecas novas, RAF suspenso fora da viewport e com o
documento oculto; will-change somente no modo animado; listeners e observer removidos no
cleanup. A sonda abaixo da dobra permanece lazy; o asset pode já estar em cache pelo Hero.
Abaixo da dobra não existe um segundo contexto gráfico pesado.

Copy comercial e CTAs continuam em HTML. SVG principal tem descrição curta; reflexo,
halo, sombra e sonda de carregamento são decorativos.

## QA executado

Viewports: 390 × 844, 430 × 932, 768 × 1024, 1366 × 768, 1440 × 900 e 1920 × 1080.
Em todos, scrollWidth foi igual a clientWidth: sem overflow horizontal.
Hero sem mão verificado em mobile e desktop; close-up verificado no tablet.
Visual desktop ocupa 591,6 de 1320 px do container, aproximadamente 44,8%.
Em 390 px, o CTA principal termina em 409,5 px, acima do objeto.

Pointer verificado com valor interpolado observado de 2,110°; resize e scroll testados;
pausa fora da tela verificada. Redução de movimento e baixo desempenho foram acionados
por controles somente de desenvolvimento; transform none e asset limpo confirmados.
A preferência global do Windows não foi alterada, e não foi aplicado throttling real.
A verificação dos viewports é emulação no navegador local, não teste em aparelhos físicos.

Amostra local de 240 callbacks RAF: 60,2 por segundo; CLS observado: 0.
É uma medida de callbacks no ambiente local, não benchmark de apresentação de quadros
pela GPU nem garantia de fluidez em todos os aparelhos.
Console de produção observado sem erros ou warnings relevantes; não há contexto WebGL.
Inspeção visual e de imports confirmou ausência da mão e de textos de identidade falsa.

TypeScript: node node_modules/typescript/bin/tsc -b — passou.
Build: node node_modules/vite/bin/vite.js build — passou.
JavaScript: 167,46 kB / 52,99 kB gzip. CSS: 17,06 kB / 4,43 kB gzip.
O diagnóstico e os controles de teste não constam no bundle de produção.

Entrega: st-arena-beer-copao-sem-mao.zip, com código e dist, sem node_modules ou tsbuildinfo.
Backup anterior: st-arena-beer-antes-sem-mao.zip.

