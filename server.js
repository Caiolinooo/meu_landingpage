const express = require('express');
const path = require('path');
const { buildResumePdf } = require('./resume-pdf');
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/favicon.ico', (_req, res) => res.status(204).end());

const profile = {
  name: "Caio Valerio Goulart Correia",
  titleEN: "Backend Engineer (TypeScript/Node.js) · APIs & Developer Tools · AI Specialist",
  titlePT: "Engenheiro Backend (TypeScript/Node.js) · APIs e Ferramentas para Devs · Especialista em IA",
  email: "caiovaleriogoulartcorreia@gmail.com",
  linkedin: "https://www.linkedin.com/in/caio-goulart",
  github: "https://github.com/Caiolinooo",
  hackerearth: "https://www.hackerearth.com/@caiovaleriogoulartcorreia/",
  resumePdf: "/resume.pdf",
  phones: [
    { number: "22997847289", label: "WhatsApp Principal" },
    { number: "22992180404", label: "WhatsApp Secundário" }
  ],
  locationEN: "Rio das Ostras, Brazil",
  locationPT: "Rio das Ostras, Brasil",
  aboutEN: "Backend engineer with 9+ years of technical experience building and maintaining APIs, services, and developer-facing tools — primarily TypeScript and Node.js, with deep Python alongside. Shipped and operates a production HR/operations platform (200+ employees) whose Node.js/TypeScript backend exposes 600+ API routes secured by JWT, two-factor authentication, and role-based authorization (PostgreSQL RLS + ACL). Defines cross-product API contracts (HMAC-authenticated sync), hardens third-party integrations with retries and fallback on rate-limit/503 responses, and maintains open-source developer tools on GitHub. Also deep in AI: LLM training/evaluation (SFT, DPO/RLHF), local serving (vLLM, SGLang), and RAG. Fluent English (C1), remote-first with international teams.",
  aboutPT: "Engenheiro backend com mais de 9 anos de experiência técnica construindo e mantendo APIs, serviços e ferramentas para desenvolvedores — principalmente TypeScript e Node.js, com Python profundo em paralelo. Entregou e opera uma plataforma de RH/operações em produção (200+ colaboradores) cujo backend Node.js/TypeScript expõe mais de 600 rotas de API protegidas por JWT, autenticação em dois fatores e autorização baseada em papéis (RLS + ACL no PostgreSQL). Define contratos de API entre produtos (sync autenticado via HMAC), robustece integrações com terceiros com retries e fallback em respostas de rate-limit/503 e mantém ferramentas de desenvolvedor open source no GitHub. Também profundo em IA: treinamento/avaliação de LLMs (SFT, DPO/RLHF), serving local (vLLM, SGLang) e RAG. Inglês fluente (C1), atuação remota com times internacionais.",
  stack: [
    "TypeScript", "Node.js", "Express", "Next.js", "REST APIs", "API Design", "GraphQL", "JWT & Auth", "Python", "FastAPI", "PostgreSQL", "Supabase", "PostGIS", "Docker", "Kubernetes", "AWS", "GitHub Actions", "CI/CD", "Linux", "Git", "Java", "Go", "Generative AI", "LLMs", "RAG", "Model Fine-Tuning", "MLOps", "vLLM", "MCP", "Backend Development", "Data Engineering", "Security", "Compliance"
  ],
  experience: [
    {
      roleEN: "AI Specialist (Contract)",
      rolePT: "AI Specialist (Contrato)",
      company: "micro1",
      periodEN: "Aug 2026 – Sep 2026",
      periodPT: "Ago 2026 – Set 2026",
      bulletsEN: [
        "Trained and evaluated LLMs for frontier-model programs, running Supervised Fine-Tuning (SFT) and preference optimization (DPO/RLHF) with PyTorch, Hugging Face PEFT (LoRA/QLoRA), Unsloth, and Axolotl.",
        "Ran adversarial testing (red teaming) to surface hallucinations, logic flaws, and bias, feeding corrections back into training datasets.",
        "Reviewed and benchmarked AI-generated code across Python, TypeScript, Node.js, FastAPI, React, Next.js, and JavaFX — assessing data-structure choices, execution behavior, and complex API integrations.",
        "Deployed local LLM serving and agent harnesses on Windows/Linux (vLLM, SGLang, llama.cpp) on dedicated NVIDIA hardware (L4 GPU, 24GB VRAM), plus MCP tool servers for retrieval and graph tools; measured latency/throughput with custom evaluation harnesses.",
        "Curated high-quality training and synthetic datasets (Self-Instruct, Evol-Instruct) with automated validation for dataset integrity, schema compliance, and model alignment."
      ],
      bulletsPT: [
        "Treinou e avaliou LLMs para programas de frontier models, executando Fine-Tuning Supervisionado (SFT) e otimização de preferência (DPO/RLHF) com PyTorch, Hugging Face PEFT (LoRA/QLoRA), Unsloth e Axolotl.",
        "Executou testes adversariais (red teaming) para identificar alucinações, falhas de lógica e vieses, realimentando correções nos datasets de treinamento.",
        "Revisou e fez benchmarking de código gerado por IA em Python, TypeScript, Node.js, FastAPI, React, Next.js e JavaFX — avaliando escolhas de estruturas de dados, comportamento de execução e integrações complexas de APIs.",
        "Implantou serving local de LLMs e agent harnesses em Windows/Linux (vLLM, SGLang, llama.cpp) em hardware NVIDIA dedicado (GPU L4, 24GB VRAM), além de servidores de ferramentas MCP para retrieval e grafos; mediu latência/throughput com harnesses de avaliação customizados.",
        "Curou datasets de treinamento e dados sintéticos de alta qualidade (Self-Instruct, Evol-Instruct) com validação automatizada de integridade, conformidade de schema e alinhamento do modelo."
      ]
    },
    {
      roleEN: "Full-Stack Developer & DevOps Engineer",
      rolePT: "Desenvolvedor Full-Stack & Engenheiro DevOps",
      company: "ABZ Serviços",
      periodEN: "Mar 2025 – Present",
      periodPT: "Mar 2025 – Presente",
      bulletsEN: [
        "Architected and shipped EmployeeHub (portal.groupabz.com), an HR/operations portal used by 200+ employees — personnel records, crew management, e-Social, vacation, reimbursement, and ACL — on Next.js 15, TypeScript, and Supabase (PostgreSQL with Row-Level Security) on Vercel; reduced HR manual workload by ~40% and approval time by ~95%.",
        "Built and maintains the platform's Node.js/TypeScript backend — 600+ REST API routes (Next.js App Router) with JWT authentication, two-factor authentication (2FA), and role-based authorization via PostgreSQL Row-Level Security and ACL, protecting sensitive HR/PII data under LGPD.",
        "Delivered the ABZ product suite around the portal: PontoFlow (bilingual offshore timesheets with manager approval, field annotations, and deadline locks enforced in UI and RLS), Invoice ABZ (FastAPI/SQLAlchemy engine turning payroll and charge-rate spreadsheets into client invoices), and Ticket-Manager (support automation via Microsoft Graph).",
        "Defined the cross-product API contract (HMAC-authenticated import/export) between the portal and the PontoFlow timesheet product, keeping collaborator identity and period behavior consistent across both systems.",
        "Led the cloud migration of legacy on-premise Windows Servers (2012–2025), reaching 80% completion with zero production downtime.",
        "Implemented end-to-end CI/CD with GitHub Actions and Docker, administered Proxmox virtualization and AWS S3, and deployed a WireGuard VPN for 50+ remote employees — sharply reducing connectivity support tickets."
      ],
      bulletsPT: [
        "Arquitetou e entregou o EmployeeHub (portal.groupabz.com), portal de RH/operações usado por mais de 200 colaboradores — registros de pessoal, gestão de tripulantes, e-Social, férias, reembolso e ACL — em Next.js 15, TypeScript e Supabase (PostgreSQL com Row-Level Security) na Vercel; reduziu a carga manual do RH em ~40% e o tempo de aprovação em ~95%.",
        "Construiu e mantém o backend Node.js/TypeScript da plataforma — mais de 600 rotas de API REST (Next.js App Router) com autenticação JWT, autenticação em dois fatores (2FA) e autorização baseada em papéis via Row-Level Security e ACL, protegendo dados sensíveis de RH/PII sob LGPD.",
        "Entregou a suíte de produtos ABZ em torno do portal: PontoFlow (timesheets offshore bilíngues com aprovação de gestor, anotações por campo e bloqueio de prazo na UI e no RLS), Invoice ABZ (motor FastAPI/SQLAlchemy que transforma planilhas de folha e charge-rate em invoices de clientes) e Ticket-Manager (automação de suporte via Microsoft Graph).",
        "Definiu o contrato de API entre produtos (import/export autenticado via HMAC) entre o portal e o produto de timesheet PontoFlow, mantendo identidade de colaboradores e comportamento de períodos consistente nos dois sistemas.",
        "Liderou a migração para nuvem de Windows Servers legados on-premise (2012–2025), atingindo 80% de conclusão com zero downtime em produção.",
        "Implementou CI/CD de ponta a ponta com GitHub Actions e Docker, administrou virtualização Proxmox e AWS S3 e implantou VPN WireGuard para mais de 50 colaboradores remotos — reduzindo drasticamente tickets de suporte de conectividade."
      ]
    },
    {
      roleEN: "Python Developer & Spatial Data Engineer",
      rolePT: "Desenvolvedor Python & Engenheiro de Dados Espaciais",
      company: "BRTech3D",
      periodEN: "Mar 2024 – Mar 2025",
      periodPT: "Mar 2024 – Mar 2025",
      bulletsEN: [
        "Built high-performance Python pipelines (NumPy, SciPy, Open3D) automating geospatial data processing for dense point clouds (100M+ points), increasing processing speed by 40% and improving data compression across dozens of projects.",
        "Modeled and optimized PostgreSQL databases with the PostGIS extension for complex spatial queries, designing and maintaining the REST APIs that exposed them to internal processing pipelines."
      ],
      bulletsPT: [
        "Construiu pipelines Python de alta performance (NumPy, SciPy, Open3D) automatizando o processamento de dados geoespaciais de nuvens de pontos densas (100M+ pontos), aumentando a velocidade de processamento em 40% e melhorando a compressão de dados em dezenas de projetos.",
        "Modelou e otimizou bancos PostgreSQL com a extensão PostGIS para consultas espaciais complexas, projetando e mantendo as APIs REST que as expunham a pipelines internos de processamento."
      ]
    },
    {
      roleEN: "Topographical Survey Operator III (Laser Scanning)",
      rolePT: "Operador de Levantamento Topográfico III (Laser Scanning)",
      company: "Laser Master Engineering Services",
      periodEN: "Aug 2023 – Mar 2024",
      periodPT: "Ago 2023 – Mar 2024",
      bulletsEN: [
        "Operated high-precision 3D laser scanning equipment (Leica) in complex industrial and archaeological environments.",
        "Led field campaign planning and technical documentation, ensuring millimeter-level precision and data backup redundancy for large-scale data collection."
      ],
      bulletsPT: [
        "Operou equipamentos de escaneamento a laser 3D de alta precisão (Leica) em ambientes industriais e arqueológicos complexos.",
        "Liderou o planejamento de campanhas de campo e documentação técnica, garantindo precisão milimétrica e redundância de backup de dados em coletas de grande escala."
      ]
    },
    {
      roleEN: "Topographical Survey Operator II",
      rolePT: "Operador de Levantamento Topográfico II",
      company: "BRTech3D",
      periodEN: "Dec 2022 – Aug 2023",
      periodPT: "Dez 2022 – Ago 2023",
      bulletsEN: [
        "Executed field data collection using Leica TLS equipment and introduced Quality Assurance (QA) processes for outlier cleaning and multiple scan registration."
      ],
      bulletsPT: [
        "Executou a coleta de dados em campo utilizando equipamentos Leica TLS e introduziu processos de Garantia da Qualidade (QA) para limpeza de outliers e registro de múltiplos escaneamentos."
      ]
    },
    {
      roleEN: "Technical Documentation & Support Specialist",
      rolePT: "Especialista em Documentação Técnica e Suporte",
      company: "SmartStore / Jackkk Connection",
      periodEN: "Mar 2021 – Dec 2022",
      periodPT: "Mar 2021 – Dez 2022",
      bulletsEN: [
        "Produced 50+ bilingual technical manuals and system specifications for international clients.",
        "Provided advanced pre-sales support and detailed hardware/software architecture mapping for complex business proposals."
      ],
      bulletsPT: [
        "Produziu mais de 50 manuais técnicos bilíngues e especificações de sistemas para clientes internacionais.",
        "Forneceu suporte avançado de pré-vendas e mapeamento detalhado de arquitetura de hardware/software para propostas comerciais complexas."
      ]
    },
    {
      roleEN: "Training Specialist & Automation Technician",
      rolePT: "Especialista em Treinamento e Técnico em Automação",
      company: "Jackkk Connection Comercial",
      periodEN: "May 2017 – Mar 2021",
      periodPT: "Mai 2017 – Mar 2021",
      bulletsEN: [
        "Coordinated and delivered technical training for over 500 professionals in PLCs, hydraulics, and industrial automation.",
        "Developed educational simulations and managed B2B technical sales, building direct relationships with international suppliers."
      ],
      bulletsPT: [
        "Coordenou e ministrou treinamentos técnicos para mais de 500 profissionais em CLPs, hidráulica e automação industrial.",
        "Desenvolveu simulações educacionais e gerenciou vendas técnicas B2B, construindo relacionamento direto com fornecedores internacionais."
      ]
    },
    {
      roleEN: "Technical Team Lead & Specialized Support",
      rolePT: "Líder de Equipe Técnica e Suporte Especializado",
      company: "Diesel Line Cambuí",
      periodEN: "Aug 2016 – May 2017",
      periodPT: "Ago 2016 – Mai 2017",
      bulletsEN: [
        "Led specialized field teams in the maintenance of large-scale engines and turbines (CAT, Cummins, MAK).",
        "Managed English-language technical support tickets for international clients and formally documented failure analysis processes."
      ],
      bulletsPT: [
        "Liderou equipes de campo especializadas na manutenção de motores e turbinas de grande porte (CAT, Cummins, MAK).",
        "Gerenciou tickets de suporte técnico em inglês para clientes internacionais e documentou formalmente processos de análise de falhas."
      ]
    },
    {
      roleEN: "Apprentice Technician",
      rolePT: "Técnico Aprendiz",
      company: "Diesel Line Cambuí",
      periodEN: "Oct 2015 – Aug 2016",
      periodPT: "Out 2015 – Ago 2016",
      bulletsEN: [
        "Began career providing support to commercial processes, CRM management, and strict application of compliance procedures for diesel and gas systems maintenance."
      ],
      bulletsPT: [
        "Iniciou a carreira prestando suporte a processos comerciais, gestão de CRM e aplicação estrita de procedimentos de conformidade para manutenção de sistemas a diesel e gás."
      ]
    }
  ],
  education: [
    {
      school: "UniFatecie",
      courseEN: "B.S. in Mechanical Engineering",
      coursePT: "Bacharelado em Engenharia Mecânica"
    },
    {
      school: "ETP Escola Técnica Brasil",
      courseEN: "Technical Diploma in Industrial Automation",
      coursePT: "Técnico em Automação Industrial"
    }
  ],
  projects: [
    {
      name: "Painel ABZ",
      stack: "Next.js 15 · TypeScript · PostgreSQL · Supabase",
      url: "https://github.com/Caiolinooo/EmployeeHub",
      demo: "https://portal.groupabz.com",
      descEN: "Corporate operations portal for ABZ Group: HR, offshore crew management, payroll, reimbursements and internal comms on Next.js 15, React 18 and Supabase/PostgreSQL (50+ tables with RLS) behind a Node.js/TypeScript API layer of 600+ routes with JWT auth and 2FA. Ships e-Social (13 events, RSA-SHA256 XML, SOAP mTLS), OCR (Tesseract) for ASO/ID docs, digital signatures, MIO ERP sync, and an AI companion with LiveKit voice, MS Graph and autonomous KPI agents.",
      descPT: "Portal corporativo do Grupo ABZ: RH, gestão de tripulantes offshore, folha, reembolsos e comunicação interna em Next.js 15, React 18 e Supabase/PostgreSQL (50+ tabelas com RLS) atrás de uma camada de API Node.js/TypeScript com mais de 600 rotas, JWT e 2FA. Inclui e-Social (13 eventos, XML RSA-SHA256, SOAP mTLS), OCR (Tesseract) de ASO/documentos, assinatura digital, sync com o ERP MIO e um AI Companion com voz LiveKit, MS Graph e agentes autônomos de KPI."
    },
    {
      name: "PontoFlow",
      stack: "Next.js 15 · TypeScript · Node.js · Supabase",
      url: "https://github.com/Caiolinooo/PontoFlow",
      demo: "https://ponto-flow.vercel.app",
      descEN: "Bilingual (pt-BR/en-GB) timesheet system for offshore crews with manager approval, field-level annotations, and monthly deadline locks enforced in UI and Postgres RLS. Node.js server runtime with Nodemailer cron reminders and multi-tenant admin; syncs with EmployeeHub through an HMAC-authenticated import/export API contract.",
      descPT: "Sistema bilíngue (pt-BR/en-GB) de timesheet para equipes offshore com aprovação de gestor, anotações por campo e bloqueio mensal de prazo na UI e no RLS do Postgres. Runtime Node.js com lembretes via Nodemailer/cron e admin multi-tenant; sincroniza com o EmployeeHub por um contrato de API de import/export autenticado via HMAC."
    },
    {
      name: "CloudSec & FinOps Auditor",
      stack: "Next.js · TypeScript · RAG · Gemini",
      url: "https://github.com/Caiolinooo/cloudsec-finops-auditor",
      demo: "https://cloudsec-finops-auditor.vercel.app",
      descEN: "Compliance auditor that evaluates cloud architecture scenarios against CIS / SOC 2 / FinOps-style policies, returning structured risk, cost impact, citations, and remediation steps. Hybrid RAG (BM25 + TF-IDF + reciprocal rank fusion) over versioned policies; resilient LLM calls with automatic retry and model fallback on 503/rate-limit responses; Vitest tests and CI evaluation pipeline.",
      descPT: "Auditor de conformidade que avalia cenários de arquitetura cloud contra políticas estilo CIS / SOC 2 / FinOps, retornando risco estruturado, impacto de custo, citações e remediação. RAG híbrido (BM25 + TF-IDF + reciprocal rank fusion) sobre políticas versionadas; chamadas LLM resilientes com retry automático e fallback de modelo em respostas 503/rate-limit; testes Vitest e pipeline de avaliação em CI."
    },
    {
      name: "SGLang Commander",
      stack: "Python · FastAPI · React · PySide6",
      url: "https://github.com/Caiolinooo/sglang-commander",
      descEN: "Open-source desktop (PySide6) and web (React + FastAPI) console for SGLang inference servers. Starts and stops servers, streams multimodal chat (image/audio), plots live GPU/VRAM/latency metrics, deploys Hugging Face models in one click, runs P50/P95/P99 benchmarks, and supports Docker plus ZeroTier remote deploys.",
      descPT: "Console open source desktop (PySide6) e web (React + FastAPI) para servidores de inferência SGLang. Sobe e derruba servidores, faz chat multimodal (imagem/áudio), plota GPU/VRAM/latência em tempo real, faz deploy de modelos Hugging Face em um clique, executa benchmarks P50/P95/P99 e suporta Docker e deploys remotos via ZeroTier."
    },
    {
      name: "Visualizador 3D FARO",
      stack: "Three.js · React · Open3D · MCP",
      url: "https://github.com/Caiolinooo/Visualizador3D_Matterport_Clone",
      descEN: "Matterport-style web viewer for FARO Focus scans. Renders PTS/E57 point clouds and TrueView 360 panoramas with Three.js and React Three Fiber, plus dollhouse view, floor plans, distance measurement, annotations, auto-tours and a Model Context Protocol bridge so local LLMs can drive the 3D scene.",
      descPT: "Visualizador web estilo Matterport para scans FARO Focus. Renderiza nuvens PTS/E57 e panorâmicas TrueView 360 com Three.js e React Three Fiber, com vista dollhouse, planta baixa, medição, anotações, tour automático e uma ponte Model Context Protocol para LLMs locais controlarem a cena 3D."
    },
    {
      name: "Gerador de Malha Open3D",
      stack: "Python · Open3D · NumPy",
      url: "https://github.com/Caiolinooo/Projeto_Open_Mesh_",
      descEN: "Desktop pipeline that turns industrial point clouds into production meshes: Poisson reconstruction, hole filling, density-based vertex cleanup, smoothing and export to PLY/OBJ/STL — built for geospatial and laser-scan workflows with 100M+ points.",
      descPT: "Pipeline desktop que transforma nuvens de pontos industriais em malhas de produção: reconstrução Poisson, preenchimento de buracos, limpeza por densidade, suavização e exportação PLY/OBJ/STL — feito para fluxos geoespaciais e laser scan com 100M+ pontos."
    },
    {
      name: "AD Migration Suite",
      stack: "C# · .NET 8 · WPF",
      url: "https://github.com/Caiolinooo/AD_Migrator",
      descEN: "Enterprise Active Directory migration from Windows Server 2012/2016 to 2019/2022. Agent-based architecture on a single port (8765) avoids WinRM/Kerberos setup, preserves SID history, replicates GPOs/OUs and migrates file shares with ACL translation across domains.",
      descPT: "Migração empresarial de Active Directory de Windows Server 2012/2016 para 2019/2022. Arquitetura com agente em uma única porta (8765) evita WinRM/Kerberos, preserva SID History, replica GPOs/OUs e migra shares de arquivo com tradução de ACL entre domínios."
    },
    {
      name: "Auditoria de Dados",
      stack: "Python · Pandas · Dash · Plotly",
      url: "https://github.com/Caiolinooo/Python_Audit_Script",
      descEN: "Server data-audit toolkit with parallel directory scans, file-type and growth analysis, caching and an interactive Dash/Plotly dashboard. Generates timestamped HTML and XLSX reports with client-level filters for large file-server inventories.",
      descPT: "Ferramenta de auditoria de dados em servidores: varredura paralela de diretórios, análise de tipos e crescimento, cache e dashboard interativo Dash/Plotly. Gera relatórios HTML e XLSX com timestamp e filtros por cliente para inventários grandes de file server."
    },
    {
      name: "Network Monitor",
      stack: "Python · Flask · PWA",
      url: "https://github.com/Caiolinooo/network-monitor",
      descEN: "Cross-platform network monitor (Windows, Linux, macOS, including Windows Server 2012) with live download/upload/latency, speed tests, history charts, PDF reports and PWA install for offline use on the LAN.",
      descPT: "Monitor de rede multiplataforma (Windows, Linux, macOS, inclusive Windows Server 2012) com download/upload/latência ao vivo, testes de velocidade, gráficos de histórico, relatórios PDF e PWA para uso offline na LAN."
    }
  ],
  skills: {
    aiEN: "Generative AI, LLMs, RAG, Prompt Engineering, Model Fine-Tuning (SFT, DPO/RLHF, LoRA/QLoRA), MLOps, vLLM, SGLang, llama.cpp, MCP.",
    aiPT: "IA Generativa, LLMs, RAG, Engenharia de Prompts, Fine-Tuning de Modelos (SFT, DPO/RLHF, LoRA/QLoRA), MLOps, vLLM, SGLang, llama.cpp, MCP.",
    backendEN: "TypeScript, Node.js (Next.js server runtime, Express, REST API routes), Python (FastAPI, SQLAlchemy), API design & cross-product API contracts, authentication & authorization (JWT, 2FA, RLS, ACL, HMAC), resilience patterns (retries, fallback, rate-limit/503 handling), GraphQL, Java (Spring Boot), Go.",
    backendPT: "TypeScript, Node.js (runtime server do Next.js, Express, rotas de API REST), Python (FastAPI, SQLAlchemy), design de APIs & contratos de API entre produtos, autenticação & autorização (JWT, 2FA, RLS, ACL, HMAC), padrões de resiliência (retries, fallback, tratamento de rate-limit/503), GraphQL, Java (Spring Boot), Go.",
    cloudEN: "Linux, Git, DevOps, Docker, Kubernetes, AWS (S3), GitHub Actions (CI/CD), Vercel, Cloudflare, Proxmox, WireGuard VPN, Terraform.",
    cloudPT: "Linux, Git, DevOps, Docker, Kubernetes, AWS (S3), GitHub Actions (CI/CD), Vercel, Cloudflare, Proxmox, VPN WireGuard, Terraform.",
    dbEN: "PostgreSQL, PostGIS, Supabase (Row-Level Security), SQLite (FTS5), NoSQL, ETL/data pipelines.",
    dbPT: "PostgreSQL, PostGIS, Supabase (Row-Level Security), SQLite (FTS5), NoSQL, pipelines de dados/ETL.",
    systemsEN: "Data Governance, Security, Compliance, LGPD/PII controls.",
    systemsPT: "Governança de Dados, Segurança, Conformidade, controles de LGPD/PII."
  },
  languages: {
    en: "Portuguese: Native | English: Fluent (C1) | Spanish/Italian: Advanced technical reading.",
    pt: "Português: Nativo | Inglês: Fluente (C1) | Espanhol/Italiano: Leitura técnica avançada."
  }
};

const i18n = {
  pt: {
    greeting: "Olá, mundo.",
    heroTitle: "Eu sou",
    viewProjects: "Ver Projetos",
    talkToMe: "Falar Comigo",
    techJourney: "Trajetória Técnica",
    techArsenal: "Arsenal Tecnológico",
    education: "Educação",
    allRights: "Todos os direitos reservados.",
    skillsTitle: "Competências Técnicas",
    backendLabel: "Backend & APIs",
    cloudLabel: "Cloud & DevOps",
    dbLabel: "Bancos de Dados",
    systemsLabel: "Governança, Segurança & Conformidade",
    languagesLabel: "Idiomas",
    projectsTitle: "Projetos Relevantes",
    resumeBtn: "Ver Currículo",
    downloadPdf: "Baixar PDF",
    aiLabel: "Engenharia de IA & LLMs",
    viewCode: "Ver código",
    liveDemo: "Demo"
  },
  en: {
    greeting: "Hello, world.",
    heroTitle: "I'm",
    viewProjects: "View Projects",
    talkToMe: "Talk to Me",
    techJourney: "Technical Journey",
    techArsenal: "Tech Arsenal",
    education: "Education",
    allRights: "All rights reserved.",
    skillsTitle: "Technical Skills",
    backendLabel: "Backend & APIs",
    cloudLabel: "Cloud & DevOps",
    dbLabel: "Databases",
    systemsLabel: "Governance, Security & Compliance",
    languagesLabel: "Languages",
    projectsTitle: "Relevant Projects",
    resumeBtn: "View Resume",
    downloadPdf: "Download PDF",
    aiLabel: "AI & LLM Engineering",
    viewCode: "View code",
    liveDemo: "Live demo"
  }
};

function bullets(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function renderExperienceCards(lang) {
  const isPT = lang === "pt";
  return profile.experience.map((job) => `
                    <div class="card">
                        <div class="meta">${isPT ? job.periodPT : job.periodEN} • ${job.company}</div>
                        <h3>${isPT ? job.rolePT : job.roleEN}</h3>
                        <ul>${bullets(isPT ? job.bulletsPT : job.bulletsEN)}</ul>
                    </div>`).join("");
}

function renderResumeJobs(lang) {
  const isPT = lang === "pt";
  return profile.experience.map((job) => `
            <div class="job">
                <div class="job-header">
                    <span class="job-title">${isPT ? job.rolePT : job.roleEN}</span>
                    <span class="job-meta">${job.company} • ${isPT ? job.periodPT : job.periodEN}</span>
                </div>
                <ul class="job-details">${bullets(isPT ? job.bulletsPT : job.bulletsEN)}</ul>
            </div>`).join("");
}

function renderProjectCards(lang) {
  const isPT = lang === "pt";
  const t = i18n[lang];
  return profile.projects.map((project) => {
    const links = [];
    if (project.url) {
      links.push(`<a href="${project.url}" target="_blank" rel="noopener">${t.viewCode}</a>`);
    }
    if (project.demo) {
      links.push(`<a href="${project.demo}" target="_blank" rel="noopener">${t.liveDemo}</a>`);
    }
    return `
                <div class="card">
                    <div class="meta">${project.stack}</div>
                    <h3>${project.name}</h3>
                    <p>${isPT ? project.descPT : project.descEN}</p>
                    <div class="project-links">${links.join("")}</div>
                </div>`;
  }).join("");
}

function renderResumeProjects(lang) {
  const isPT = lang === "pt";
  const t = i18n[lang];
  return profile.projects.map((project) => {
    const links = [];
    if (project.url) {
      links.push(`<a href="${project.url}" target="_blank" rel="noopener">${t.viewCode}</a>`);
    }
    if (project.demo) {
      links.push(`<a href="${project.demo}" target="_blank" rel="noopener">${t.liveDemo}</a>`);
    }
    return `
            <div class="job">
                <div class="job-header">
                    <span class="job-title">${project.name}</span>
                    <span class="job-meta">${project.stack}</span>
                </div>
                <p class="project-copy">${isPT ? project.descPT : project.descEN}</p>
                <p class="project-links">${links.join(" · ")}</p>
            </div>`;
  }).join("");
}

function renderEducationCards(lang) {
  const isPT = lang === "pt";
  return profile.education.map((item) => `
                 <div class="card">
                    <h3>${isPT ? item.coursePT : item.courseEN}</h3>
                    <div class="meta">${item.school}</div>
                 </div>`).join("");
}

function renderResumeEducation(lang) {
  const isPT = lang === "pt";
  return profile.education.map((item) => `
            <div class="job">
                <div class="job-header">
                    <span class="job-title">${isPT ? item.coursePT : item.courseEN}</span>
                    <span class="job-meta">${item.school}</span>
                </div>
            </div>`).join("");
}

function renderSkillsGrid(lang) {
  const t = i18n[lang];
  const isPT = lang === "pt";
  return `
            <div class="skills-grid">
                <div class="skill-category">
                    <strong>${t.aiLabel}</strong>
                    <p>${isPT ? profile.skills.aiPT : profile.skills.aiEN}</p>
                </div>
                <div class="skill-category">
                    <strong>${t.backendLabel}</strong>
                    <p>${isPT ? profile.skills.backendPT : profile.skills.backendEN}</p>
                </div>
                <div class="skill-category">
                    <strong>${t.cloudLabel}</strong>
                    <p>${isPT ? profile.skills.cloudPT : profile.skills.cloudEN}</p>
                </div>
                <div class="skill-category">
                    <strong>${t.dbLabel}</strong>
                    <p>${isPT ? profile.skills.dbPT : profile.skills.dbEN}</p>
                </div>
                <div class="skill-category">
                    <strong>${t.systemsLabel}</strong>
                    <p>${isPT ? profile.skills.systemsPT : profile.skills.systemsEN}</p>
                </div>
            </div>`;
}

function renderStack() {
  return profile.stack.map((tech) => `
                    <div class="tech-item">
                        <i class="fa-solid fa-code" style="margin-right:8px; color:var(--primary)"></i> ${tech}
                    </div>`).join("");
}

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profile.name} | Portfolio</title>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <style>
        :root { --bg: #050505; --card: #101010; --primary: #00f2ff; --text: #e0e0e0; --muted: #888; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background-color: var(--bg); color: var(--text); font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }
        #canvas-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.4; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 1; }
        header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; padding: 40px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .logo { font-weight: 700; font-size: 1.5rem; letter-spacing: -1px; }
        .logo span { color: var(--primary); }
        .hero { min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
        .hero h2 { font-family: 'JetBrains Mono', monospace; color: var(--primary); font-size: 1.2rem; margin-bottom: 20px; }
        .hero h1 { font-size: clamp(3rem, 6vw, 5rem); line-height: 1.1; margin-bottom: 20px; background: linear-gradient(90deg, #fff, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { max-width: 700px; font-size: 1.2rem; color: var(--muted); margin-bottom: 24px; line-height: 1.6; }
        .hero .role { color: var(--primary); font-family: 'JetBrains Mono', monospace; font-size: 1rem; margin-bottom: 16px; }
        .btn-group { display: flex; gap: 20px; flex-wrap: wrap; }
        .btn { padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: 0.3s; display: inline-flex; align-items: center; gap: 10px; }
        .btn-primary { background: var(--primary); color: #000; border: 2px solid var(--primary); }
        .btn-primary:hover { background: transparent; color: var(--primary); box-shadow: 0 0 20px rgba(0, 242, 255, 0.4); }
        .btn-outline { background: transparent; border: 1px solid #333; color: #fff; }
        .btn-outline:hover { border-color: var(--primary); color: var(--primary); }
        .lang-toggle { display: flex; gap: 8px; }
        .lang-toggle a { padding: 8px 16px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; text-decoration: none; border: 1px solid #333; color: #888; transition: 0.3s; }
        .lang-toggle a.active, .lang-toggle a:hover { border-color: var(--primary); color: var(--primary); }
        section { margin: 100px 0; }
        .section-title { font-size: 2.5rem; margin-bottom: 40px; position: relative; display: inline-block; }
        .section-title::after { content: ''; position: absolute; left: 0; bottom: -10px; width: 60px; height: 4px; background: var(--primary); }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
        .card { background: var(--card); border: 1px solid #222; padding: 30px; border-radius: 12px; transition: 0.3s; }
        .card:hover { border-color: var(--primary); transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .card h3 { margin-bottom: 10px; font-size: 1.4rem; }
        .card .meta { color: var(--primary); font-size: 0.9rem; margin-bottom: 15px; font-family: 'JetBrains Mono', monospace; }
        .card p, .card ul { color: var(--muted); font-size: 0.95rem; line-height: 1.6; }
        .card ul { padding-left: 18px; }
        .card li { margin-bottom: 8px; }
        .project-links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; }
        .project-links a { color: var(--primary); font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; text-decoration: none; }
        .project-links a:hover { text-decoration: underline; }
        .tech-grid { display: flex; flex-wrap: wrap; gap: 15px; }
        .tech-item { background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 50px; border: 1px solid transparent; transition: 0.3s; }
        .tech-item:hover { border-color: var(--primary); background: rgba(0, 242, 255, 0.1); color: var(--primary); }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .skill-category { background: var(--card); border: 1px solid #222; padding: 25px; border-radius: 12px; }
        .skill-category strong { display: block; margin-bottom: 10px; color: var(--primary); font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .skill-category p { color: var(--muted); font-size: 0.9rem; line-height: 1.6; margin: 0; }
        .contact-bar { position: fixed; bottom: 30px; right: 30px; background: #000; padding: 15px 25px; border-radius: 50px; border: 1px solid var(--primary); box-shadow: 0 0 30px rgba(0, 242, 255, 0.2); z-index: 100; display: flex; gap: 20px; }
        .contact-bar a { color: #fff; font-size: 1.2rem; transition: 0.3s; }
        .contact-bar a:hover { color: var(--primary); transform: scale(1.2); }
        footer { text-align: center; padding: 50px 0; border-top: 1px solid #222; margin-top: 100px; color: var(--muted); }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .contact-bar { bottom: 20px; right: 50%; transform: translateX(50%); width: 90%; justify-content: center; }
            .skills-grid { grid-template-columns: 1fr; }
        }
        .lang-content { display: none; }
        .lang-content.active { display: block; }
        .hero.lang-content.active { display: flex; }
    </style>
</head>
<body>
    <div id="canvas-container"></div>

    <div class="container">
        <header>
            <div class="logo">&lt; ${profile.name.split(' ')[0]} /&gt;</div>
            <div style="display:flex; gap:20px; align-items:center;">
                <div class="lang-toggle">
                    <a href="#" class="active" onclick="switchLang('en'); return false;">EN</a>
                    <a href="#" onclick="switchLang('pt'); return false;">PT</a>
                </div>
                <a href="${profile.linkedin}" target="_blank" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.9rem;">
                    LinkedIn
                </a>
            </div>
        </header>

        <section class="hero lang-content active" data-lang="en">
            <h2>${i18n.en.greeting}</h2>
            <h1>${i18n.en.heroTitle} <span style="color:var(--primary)">${profile.name}</span>.</h1>
            <p class="role">${profile.titleEN} • ${profile.locationEN}</p>
            <p>${profile.aboutEN}</p>
            <div class="btn-group">
                <a href="${profile.github}" target="_blank" class="btn btn-primary">
                    <i class="fa-brands fa-github"></i> ${i18n.en.viewProjects}
                </a>
                <a href="https://wa.me/55${profile.phones[0].number}" class="btn btn-outline" target="_blank">
                    <i class="fa-brands fa-whatsapp"></i> ${i18n.en.talkToMe}
                </a>
                <a href="/resume" class="btn btn-outline">
                    <i class="fa-solid fa-file-lines"></i> ${i18n.en.resumeBtn}
                </a>
                <a href="/resume.pdf?lang=en" class="btn btn-outline pdf-download">
                    <i class="fa-solid fa-file-pdf"></i> ${i18n.en.downloadPdf}
                </a>
            </div>
        </section>

        <section class="hero lang-content" data-lang="pt">
            <h2>${i18n.pt.greeting}</h2>
            <h1>${i18n.pt.heroTitle} <span style="color:var(--primary)">${profile.name}</span>.</h1>
            <p class="role">${profile.titlePT} • ${profile.locationPT}</p>
            <p>${profile.aboutPT}</p>
            <div class="btn-group">
                <a href="${profile.github}" target="_blank" class="btn btn-primary">
                    <i class="fa-brands fa-github"></i> ${i18n.pt.viewProjects}
                </a>
                <a href="https://wa.me/55${profile.phones[0].number}" class="btn btn-outline" target="_blank">
                    <i class="fa-brands fa-whatsapp"></i> ${i18n.pt.talkToMe}
                </a>
                <a href="/resume" class="btn btn-outline">
                    <i class="fa-solid fa-file-lines"></i> ${i18n.pt.resumeBtn}
                </a>
                <a href="/resume.pdf?lang=pt" class="btn btn-outline pdf-download">
                    <i class="fa-solid fa-file-pdf"></i> ${i18n.pt.downloadPdf}
                </a>
            </div>
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.techJourney}</h2>
            <div class="grid">${renderExperienceCards("en")}</div>
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.techJourney}</h2>
            <div class="grid">${renderExperienceCards("pt")}</div>
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.skillsTitle}</h2>
            ${renderSkillsGrid("en")}
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.skillsTitle}</h2>
            ${renderSkillsGrid("pt")}
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.techArsenal}</h2>
            <div class="tech-grid">${renderStack()}</div>
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.techArsenal}</h2>
            <div class="tech-grid">${renderStack()}</div>
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.projectsTitle}</h2>
            <div class="projects-grid">${renderProjectCards("en")}</div>
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.projectsTitle}</h2>
            <div class="projects-grid">${renderProjectCards("pt")}</div>
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.education}</h2>
            <div class="grid">${renderEducationCards("en")}</div>
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.education}</h2>
            <div class="grid">${renderEducationCards("pt")}</div>
        </section>

        <section>
            <h2 class="section-title lang-content active" data-lang="en">${i18n.en.languagesLabel}</h2>
            <h2 class="section-title lang-content" data-lang="pt">${i18n.pt.languagesLabel}</h2>
            <div class="skills-grid" style="grid-template-columns: 1fr;">
                <div class="skill-category">
                    <p class="lang-content active" data-lang="en">${profile.languages.en}</p>
                    <p class="lang-content" data-lang="pt">${profile.languages.pt}</p>
                </div>
            </div>
        </section>

        <footer>
            <p class="lang-content active" data-lang="en">&copy; ${new Date().getFullYear()} ${profile.name}. ${i18n.en.allRights}</p>
            <p class="lang-content" data-lang="pt">&copy; ${new Date().getFullYear()} ${profile.name}. ${i18n.pt.allRights}</p>
        </footer>
    </div>

    <div class="contact-bar">
        <a href="https://wa.me/55${profile.phones[0].number}" target="_blank" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="mailto:${profile.email}" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
        <a href="${profile.github}" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
        <a href="/resume.pdf?lang=en" class="pdf-download" aria-label="Download PDF"><i class="fa-solid fa-file-pdf"></i></a>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script>
        function switchLang(lang) {
            document.querySelectorAll('.lang-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
            document.querySelectorAll('.lang-toggle a').forEach(el => el.classList.remove('active'));
            document.querySelector('.lang-toggle a[onclick*="' + lang + '"]').classList.add('active');
            document.documentElement.lang = lang;
            document.querySelectorAll('.pdf-download').forEach(el => {
                el.href = '/resume.pdf?lang=' + lang;
            });
        }

        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 700;
        const posArray = new Float32Array(count * 3);
        for(let i = 0; i < count * 3; i++) { posArray[i] = (Math.random() - 0.5) * 15; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({ size: 0.02, color: 0x00f2ff, transparent: true, opacity: 0.8 });
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);
        camera.position.z = 3;
        function animate() {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            renderer.render(scene, camera);
        }
        animate();
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        gsap.from(".hero > *", { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
    </script>
</body>
</html>
  `);
});

app.get('/resume.pdf', async (req, res) => {
  const lang = String(req.query.lang || '').toLowerCase() === 'pt' ? 'pt' : 'en';
  try {
    const { buffer, filename } = await buildResumePdf(lang, profile);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-store');
    res.send(buffer);
  } catch (err) {
    console.error('PDF generation failed:', err);
    if (!res.headersSent) {
      res.status(500).type('text/plain').send('Failed to generate resume PDF');
    }
  }
});

app.get('/resume', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profile.name} - Resume / Currículo</title>
    <style>
        :root { --bg: #ffffff; --text: #24292e; --muted: #586069; --accent: #0366d6; --border: #eaecef; --btn-bg: #f6f8fa; }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; color: var(--text); line-height: 1.6; max-width: 850px; margin: 0 auto; padding: 30px 20px; background-color: var(--bg); }
        a { color: var(--accent); text-decoration: none; }
        a:hover { text-decoration: underline; }
        .lang-toggle { display: flex; justify-content: flex-end; gap: 10px; margin-bottom: 20px; }
        .lang-toggle button { background-color: var(--btn-bg); border: 1px solid var(--border); color: var(--text); padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s; }
        .lang-toggle button:hover { background-color: var(--border); }
        .lang-toggle button.active { background-color: var(--accent); color: #fff; border-color: var(--accent); }
        header { margin-bottom: 30px; }
        h1 { font-size: 32px; margin: 0 0 5px 0; letter-spacing: -0.5px; }
        h2 { font-size: 18px; color: var(--muted); font-weight: 400; margin: 0 0 15px 0; }
        .contact { font-size: 14px; color: var(--muted); display: flex; flex-wrap: wrap; gap: 12px; }
        .summary { font-size: 15px; margin-bottom: 30px; color: #24292e; }
        h3 { font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid var(--border); padding-bottom: 8px; margin-top: 35px; margin-bottom: 20px; }
        .job { margin-bottom: 25px; }
        .job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; gap: 12px; }
        .job-title { font-weight: 600; font-size: 16px; }
        .job-meta { font-size: 14px; color: var(--muted); white-space: nowrap; }
        .job-details { margin: 0; padding-left: 20px; font-size: 14px; color: #24292e; }
        .job-details li { margin-bottom: 8px; }
        .project-copy { margin: 0; font-size: 14px; color: #24292e; }
        .project-links { margin: 8px 0 0 0; font-size: 13px; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 14px; }
        .skill-category strong { display: block; margin-bottom: 5px; color: var(--text); }
        .skill-category p { margin: 0; color: var(--muted); }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-tags span { background: var(--btn-bg); border: 1px solid var(--border); border-radius: 999px; padding: 4px 10px; font-size: 13px; color: var(--muted); }
        .back-link { display: inline-block; margin-bottom: 20px; font-size: 14px; }
        .actions { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; }
        @media (max-width: 600px) { .job-header { flex-direction: column; } .skills-grid { grid-template-columns: 1fr; } .job-meta { white-space: normal; } }
        .lang-pt { display: none; }
        @media print { .actions, .back-link, .lang-toggle { display: none !important; } }
    </style>
    <script>
        function setLanguage(lang) {
            if (lang === 'pt') {
                document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.lang-pt').forEach(el => el.style.display = 'block');
                document.getElementById('btn-en').classList.remove('active');
                document.getElementById('btn-pt').classList.add('active');
                document.documentElement.lang = 'pt';
                document.getElementById('download-pdf').href = '/resume.pdf?lang=pt';
                document.getElementById('download-pdf').textContent = 'Baixar PDF';
            } else {
                document.querySelectorAll('.lang-pt').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
                document.getElementById('btn-pt').classList.remove('active');
                document.getElementById('btn-en').classList.add('active');
                document.documentElement.lang = 'en';
                document.getElementById('download-pdf').href = '/resume.pdf?lang=en';
                document.getElementById('download-pdf').textContent = 'Download PDF';
            }
        }
    </script>
</head>
<body>
    <div class="actions">
        <a class="back-link" href="/">&larr; Back to Portfolio / Voltar ao Portfólio</a>
        <a id="download-pdf" class="back-link" href="/resume.pdf?lang=en">Download PDF</a>
    </div>

    <div class="lang-toggle">
        <button id="btn-en" class="active" onclick="setLanguage('en')">English</button>
        <button id="btn-pt" onclick="setLanguage('pt')">Português</button>
    </div>

    <div class="lang-en">
        <header>
            <h1>${profile.name}</h1>
            <h2>${profile.titleEN}</h2>
            <div class="contact">
                <span>${profile.locationEN}</span>
                <span><a href="mailto:${profile.email}">${profile.email}</a></span>
                <span>+55 22 99784-7289</span>
                <span><a href="${profile.github}" target="_blank">github.com/Caiolinooo</a></span>
                <span><a href="${profile.hackerearth}" target="_blank">HackerEarth</a></span>
                <span><a href="${profile.linkedin}" target="_blank">linkedin.com/in/caio-goulart</a></span>
            </div>
        </header>
        <div class="summary"><p>${profile.aboutEN}</p></div>
        <section>
            <h3>Skills</h3>
            <div class="skill-tags">${profile.stack.map((skill) => `<span>${skill}</span>`).join("")}</div>
        </section>
        <section>
            <h3>Professional Experience</h3>
            ${renderResumeJobs("en")}
        </section>
        <section>
            <h3>Education</h3>
            ${renderResumeEducation("en")}
        </section>
        <section>
            <h3>Relevant Projects</h3>
            ${renderResumeProjects("en")}
        </section>
        <section>
            <h3>Technical Skills</h3>
            ${renderSkillsGrid("en")}
        </section>
        <section>
            <h3>Languages</h3>
            <div class="skills-grid" style="grid-template-columns: 1fr;"><div class="skill-category"><p>${profile.languages.en}</p></div></div>
        </section>
    </div>

    <div class="lang-pt">
        <header>
            <h1>${profile.name}</h1>
            <h2>${profile.titlePT}</h2>
            <div class="contact">
                <span>${profile.locationPT}</span>
                <span><a href="mailto:${profile.email}">${profile.email}</a></span>
                <span>+55 22 99784-7289</span>
                <span><a href="${profile.github}" target="_blank">github.com/Caiolinooo</a></span>
                <span><a href="${profile.hackerearth}" target="_blank">HackerEarth</a></span>
                <span><a href="${profile.linkedin}" target="_blank">linkedin.com/in/caio-goulart</a></span>
            </div>
        </header>
        <div class="summary"><p>${profile.aboutPT}</p></div>
        <section>
            <h3>Competências</h3>
            <div class="skill-tags">${profile.stack.map((skill) => `<span>${skill}</span>`).join("")}</div>
        </section>
        <section>
            <h3>Experiência Profissional</h3>
            ${renderResumeJobs("pt")}
        </section>
        <section>
            <h3>Formação Acadêmica</h3>
            ${renderResumeEducation("pt")}
        </section>
        <section>
            <h3>Projetos Relevantes</h3>
            ${renderResumeProjects("pt")}
        </section>
        <section>
            <h3>Habilidades Técnicas</h3>
            ${renderSkillsGrid("pt")}
        </section>
        <section>
            <h3>Idiomas</h3>
            <div class="skills-grid" style="grid-template-columns: 1fr;"><div class="skill-category"><p>${profile.languages.pt}</p></div></div>
        </section>
    </div>
</body>
</html>`);
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}
