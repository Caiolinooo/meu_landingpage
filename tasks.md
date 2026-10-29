# Corrigir geração de PDF na Vercel

## Causa
A Vercel não aceita bem `pdfkit.pipe(res)` e pode não empacotar as fontes TTF.

## Correção
- Gerar o PDF em buffer e enviar com `res.send`
- Carregar fontes em memória, com vários caminhos
- Empacotar `fonts/**` na function `api/index.js`
- `Content-Disposition: inline` para visualizar no navegador

# Sync do currículo com o LinkedIn

Fonte: LinkedIn lido em 29/10/2026.

O Express 5 não tem ISR. `/`, `/resume` e `/resume.pdf` tentam `https://cveditor.caiodev.app/api/cv?lang=pt|en` com timeout de 5s e caem em `data/cv.pt.json` / `data/cv.en.json`. Resposta 200 do editor usa `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`. Fallback JSON usa `public, s-maxage=60`. Erro não leva cache. Sem cron e sem deploy hook.

## Passos

- [x] Confirmar que o repo serve `/resume`
- [x] Corrigir empresas, cargos, datas e locais (PT e EN)
- [x] Remover Topographical Survey Operator II
- [x] Incluir formação e certificações da fonte
- [x] Bump 1.1.0 em package.json, CHANGELOG e README
- [x] Validar com `node --check` e smoke HTTP
- [ ] Push e PR só depois do QA, num único push
