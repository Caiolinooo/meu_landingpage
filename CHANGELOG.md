# Changelog

## [1.1.1] - 2026-10-29

### Fixed

- Restaura os bullets de experiência que a v1.1.0 tinha zerado (SmartStore, Desenhista Técnico II, Projetista III, Técnico de automação), a partir do commit anterior ao merge. Cargos, datas, locais e as descrições exatas de Training Specialist, Technical Team Lead, Technician e Python Developer permanecem as do LinkedIn.

## [1.1.0] - 2026-10-29

### Added

- `/`, `/resume` e `/resume.pdf` leem o CV em `https://cveditor.caiodev.app/api/cv?lang=pt|en`, com fallback em `data/cv.pt.json` e `data/cv.en.json` (erro, timeout de 5s ou schema inválido).
- Resposta 200 usa `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400` só quando o CV veio do editor. Fallback JSON usa `public, s-maxage=60`. Erro não leva cache. Sem cron e sem deploy hook.

### Changed

- Experiência, formação e certificações (PT e EN) alinhadas ao LinkedIn de 29/10/2026 em `/`, `/resume` e `/resume.pdf`.
- Removido o cargo Topographical Survey Operator II (dez/2022–ago/2023).
- `Laser Master Engineering Services` corrigido para Master Serviços, Projetista III (out/2023–mar/2024, Macaé).
- Headline alinhada ao LinkedIn. Cargo EN de desenho técnico: Technical Drafter II. Training Specialist, Technical Team Lead, Technician e Python Developer usam o texto do LinkedIn. Suporte ao Produto fica sem descrição.

## [1.0.0]

### Added

- Landing page e rota `/resume`, com PDF gerado a partir dos mesmos dados.
