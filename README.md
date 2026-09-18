# ST Arena Beer

Refatoração do projeto React + TypeScript + Vite fornecido em st-arena-beer-3d.zip.

## Executar

Node.js 20.19+ ou 22+ e pnpm:

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
pnpm preview
```

Também é possível usar npm install e npm run dev/build/typecheck/preview.
O lockfile reprodutível entregue é pnpm-lock.yaml.

## Copão real — implementação 2.5D

A fotografia enviada em 18/09/2026 está integrada em src/assets/images/copao-real.jpeg.
O arquivo permanece idêntico ao original e é mantido apenas como referência arquivada.
A renderização usa copao-sem-mao.webp, com fallback copao-sem-mao.png, ambos com alpha.
CopaoVisual usa perspectiva CSS, halo discreto, sombra e reflexo. O Hero mostra o copão
inteiro isolado; a seção dedicada usa close-up. O adesivo mantém os pixels da fotografia.

A mão foi removida da máscara e a área superior esquerda encoberta recebeu reparo local:
borda reconstruída com edição de imagem e líquido completado com pixels do próprio registro.
Não há geometria de 360 graus, partículas, gotas inventadas ou shaders. Bolhas e aparência do
líquido vêm da fotografia. Consulte COPAO-IMPLEMENTACAO.md para detalhes desta etapa.

Movimento com damping no desktop, flutuação leve no mobile, pausa fora da tela e fotografia
estática do mesmo asset limpo para movimento reduzido ou desempenho insuficiente.
Nenhum modo usa a fotografia com a mão. Não depende de WebGL.

## Conteúdo e procedência

- Nome, cidade/estado e Instagram: fornecidos no pedido.
- Telefone (53) 99932-6667: preservado da base, ainda não confirmado pelo responsável.
- Placa e posts: recuperados da pasta da versão anterior no mesmo diretório do ZIP.
  Fontes exatas registradas em AUDITORIA.md. Sua procedência ainda deve ser confirmada.
- Nenhuma informação de endereço, horário, entrega, preço ou estoque é publicada.
- Kit: coleta de preferências, seguida de consulta pelo WhatsApp.
- Dois destaques, Ballena e Busca Briza, presentes nos registros; não constituem estoque.
- Energéticos e gelo aparecem nos materiais anteriores, mas ainda não possuem fotos
  individuais adequadas. Seus links de consulta permanecem sem imagens artificiais.

## Interface

Container de até 1320px, preto/branco/amarelo, fontes locais, imagens com lazy loading,
perspectiva CSS discreta, pausa de movimentos via prefers-reduced-motion, navegação por
teclado, grupos de radio buttons e foco visível. Sem Canvas ou bibliotecas 3D em produção.
O botão flutuante desktop aparece somente quando o Hero sai completamente da viewport.

## Validação

TypeScript e build passaram. Layout inspecionado em 390, 430, 768, 1440 e 1920px.
Console do build final validado em aba limpa. Consulte AUDITORIA.md para limites e resultados.
