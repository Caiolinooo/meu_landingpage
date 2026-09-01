# Corrigir geração de PDF na Vercel

## Causa
A Vercel não aceita bem `pdfkit.pipe(res)` e pode não empacotar as fontes TTF.

## Correção
- Gerar o PDF em buffer e enviar com `res.send`
- Carregar fontes em memória, com vários caminhos
- Empacotar `fonts/**` na function `api/index.js`
- `Content-Disposition: inline` para visualizar no navegador
