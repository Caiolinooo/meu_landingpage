# landingpage.caiodev.app

Landing page e currículo de Caio Valerio Goulart Correia.

Versão atual: **1.1.2**

## Rotas

- `/` — landing (PT/EN)
- `/resume` — currículo (PT/EN)
- `/resume.pdf?lang=pt` ou `?lang=en` — PDF gerado a partir dos mesmos dados

Os dados do currículo vêm de `https://cveditor.caiodev.app/api/cv?lang=pt|en`. Se a resposta falhar, estourar 5s ou vier com schema inválido, o servidor usa `data/cv.pt.json` e `data/cv.en.json`.

Este app é Express 5, não Next.js. Não há ISR. Resposta 200 de `/`, `/resume` e `/resume.pdf` usa `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` só quando o CV veio do editor. Se a página usa o JSON local, o header é `public, s-maxage=60`. Erro não é cacheado. Não há deploy hook, cron nem rebuild automático.

## Scripts

- `npm start` — sobe o servidor Express na porta 3000

Não há script de build nem de lint. A checagem local é `node --check` nos arquivos JavaScript.
