# Changelog

## [1.1.2] - 2026-10-29

### Added

- O leitor de `https://cveditor.caiodev.app/api/cv` normaliza `title` e `meta` para cargo, empresa, período e local antes da validação. Itens que já trazem `role`, `company` e `period` permanecem. O fallback e o cache não mudam.

### Changed

- Experiências atualizadas para o conteúdo v1.1.2: Owner/Director (8 bullets), Technical Drafter II (6), Laser Scanner Operator III (5), Automation Technician (4) e Product Support (3). Total de 45 bullets por idioma.
- Owner/Director e Laser Scanner Operator III recuperam, no final da lista, os bullets da v1.1.1 que tinham sido substituídos.

## [1.1.1] - 2026-10-29

### Fixed

- Restaura os bullets de experiência que a v1.1.0 tinha zerado (SmartStore, Desenhista Técnico II, Master Serviços), a partir do commit anterior ao merge. Técnico de automação fica sem bullets para não repetir o texto de Training Specialist. Cargos, datas, locais e as descrições exatas de Training Specialist, Technical Team Lead, Technician e Python Developer permanecem as do LinkedIn.
- Master Serviços (Macaé, out/2023–mar/2024): cargo passa a Laser Scanner Operator III / Operador de Laser Scanner III. Os bullets de laser scanner permanecem.

## [1.1.0] - 2026-10-29

### Added

- `/`, `/resume` e `/resume.pdf` leem o CV em `https://cveditor.caiodev.app/api/cv?lang=pt|en`, com fallback em `data/cv.pt.json` e `data/cv.en.json` (erro, timeout de 5s ou schema inválido).
- Resposta 200 usa `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` só quando o CV veio do editor. Fallback JSON usa `public, s-maxage=60`. Erro não leva cache. Sem cron e sem deploy hook.

### Changed

- Experiência, formação e certificações (PT e EN) alinhadas ao LinkedIn de 29/10/2026 em `/`, `/resume` e `/resume.pdf`.
- Removido o cargo Topographical Survey Operator II (dez/2022–ago/2023).
- `Laser Master Engineering Services` corrigido para Master Serviços (out/2023–mar/2024, Macaé).
- Headline alinhada ao LinkedIn. Cargo EN de desenho técnico: Technical Drafter II. Training Specialist, Technical Team Lead, Technician e Python Developer usam o texto do LinkedIn. Suporte ao Produto fica sem descrição.

## [1.0.0]

### Added

- Landing page e rota `/resume`, com PDF gerado a partir dos mesmos dados.
