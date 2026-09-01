const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/favicon.ico', (_req, res) => res.status(204).end());

const profile = {
  name: "Caio Valério Goulart Correia",
  titleEN: "AI Specialist, Senior Data Engineer & Backend Developer",
  titlePT: "Especialista em IA, Engenheiro de Dados Sênior & Desenvolvedor Backend",
  email: "caiovaleriogoulartcorreia@gmail.com",
  linkedin: "https://www.linkedin.com/in/caio-goulart",
  github: "https://github.com/Caiolinooo",
  hackerearth: "https://www.hackerearth.com/@caiovaleriogoulartcorreia/",
  resumePdf: "/public/EN-Resume_Caio_Correia.pdf",
  phones: [
    { number: "22997847289", label: "WhatsApp Principal" },
    { number: "22992180404", label: "WhatsApp Secundário" }
  ],
  locationEN: "Rio das Ostras, Brazil",
  locationPT: "Rio das Ostras, Brasil",
  aboutEN: "AI Specialist and Senior Data Engineer with a strong background in software engineering, focusing on data science solutions and backend development. Expertise in Python and Java programming, with a proven ability to implement complex systems independently. Skilled in fostering collaboration with clients and teams to deliver innovative solutions.",
  aboutPT: "Especialista em IA e Engenheiro de Dados Sênior com sólida experiência em engenharia de software, com foco em soluções de ciência de dados e desenvolvimento backend. Expertise em programação Python e Java, com comprovada capacidade de implementar sistemas complexos de forma independente. Habilidade em fomentar a colaboração com clientes e equipes para entregar soluções inovadoras.",
  stack: [
    "Python", "Java", "TypeScript", "Linux", "Git", "PostgreSQL", "DevOps", "Cloud",
    "Data Engineering", "Backend Development", "Generative AI", "LLMs", "RAG",
    "Prompt Engineering", "Model Fine-Tuning", "MLOps", "MLflow", "Azure Databricks",
    "Azure SQL", "CosmosDB", "Docker", "Kubernetes", "API Integration",
    "Data Governance", "Security", "Compliance", "Azure AI Foundry", "Azure ML",
    "Power BI", "AWS"
  ],
  experience: [
    {
      roleEN: "AI Specialist",
      rolePT: "Especialista em IA",
      company: "micro1",
      periodEN: "Aug 2026 – Present",
      periodPT: "Ago 2026 – Presente",
      bulletsEN: [
        "Lead the development of Generative AI and LLM solutions, focusing on model alignment and fine-tuning.",
        "Design and implement RAG systems and AI governance workflows using Azure technologies.",
        "Benchmark AI code generation across multiple programming languages including Python and Java."
      ],
      bulletsPT: [
        "Lidera o desenvolvimento de soluções de IA Generativa e LLMs, com foco em alinhamento e fine-tuning de modelos.",
        "Projeta e implementa sistemas RAG e fluxos de governança de IA utilizando tecnologias Azure.",
        "Avalia a geração de código por IA em múltiplas linguagens de programação, incluindo Python e Java."
      ]
    },
    {
      roleEN: "Full-Stack Developer & DevOps Engineer",
      rolePT: "Desenvolvedor Full-Stack & Engenheiro DevOps",
      company: "ABZ Serviços",
      periodEN: "Jan 2025 – Present",
      periodPT: "Jan 2025 – Presente",
      bulletsEN: [
        "Developed EmployeeHub, enhancing operational efficiency by 40% through automation.",
        "Built data engineering pipelines integrating Azure services and established security compliance architecture."
      ],
      bulletsPT: [
        "Desenvolveu o EmployeeHub, aumentando a eficiência operacional em 40% por meio de automação.",
        "Construiu pipelines de engenharia de dados integrando serviços Azure e estabeleceu arquitetura de segurança e conformidade."
      ]
    },
    {
      roleEN: "Python Developer & Spatial Data Engineer",
      rolePT: "Desenvolvedor Python & Engenheiro de Dados Espaciais",
      company: "BRTech3D",
      periodEN: "Mar 2024 – Mar 2025",
      periodPT: "Mar 2024 – Mar 2025",
      bulletsEN: [
        "Created high-performance data processing scripts for geospatial applications, significantly optimizing processing times.",
        "Engineered scalable data storage solutions on Azure Data Lake and PostgreSQL."
      ],
      bulletsPT: [
        "Criou scripts de processamento de dados de alta performance para aplicações geoespaciais, otimizando significativamente os tempos de processamento.",
        "Projetou soluções escaláveis de armazenamento de dados no Azure Data Lake e PostgreSQL."
      ]
    },
    {
      roleEN: "Topographical Survey Operator III (Laser Scanning)",
      rolePT: "Operador de Levantamento Topográfico III (Laser Scanning)",
      company: "Master Engineering Services",
      periodEN: "Aug 2023 – Mar 2024",
      periodPT: "Ago 2023 – Mar 2024",
      bulletsEN: [
        "Operated 3D laser scanning equipment for precise data collection in industrial environments."
      ],
      bulletsPT: [
        "Operou equipamentos de escaneamento a laser 3D para coleta precisa de dados em ambientes industriais."
      ]
    },
    {
      roleEN: "Topographical Survey Operator II",
      rolePT: "Operador de Levantamento Topográfico II",
      company: "OfTech3D",
      periodEN: "Dec 2022 – Aug 2023",
      periodPT: "Dez 2022 – Ago 2023",
      bulletsEN: [
        "Executed field data collection and implemented QA processes for data integrity."
      ],
      bulletsPT: [
        "Executou coleta de dados em campo e implementou processos de QA para garantir a integridade dos dados."
      ]
    },
    {
      roleEN: "Technical Documentation & Support Specialist",
      rolePT: "Especialista em Documentação Técnica e Suporte",
      company: "SmartStore / Jackkk Connection",
      periodEN: "Mar 2021 – Dec 2022",
      periodPT: "Mar 2021 – Dez 2022",
      bulletsEN: [
        "Produced technical manuals and provided support for complex business proposals."
      ],
      bulletsPT: [
        "Produziu manuais técnicos e prestou suporte a propostas comerciais complexas."
      ]
    },
    {
      roleEN: "Training Specialist & Automation Technician",
      rolePT: "Especialista em Treinamento e Técnico em Automação",
      company: "Jackkk Connection Comercial",
      periodEN: "May 2017 – Mar 2021",
      periodPT: "Mai 2017 – Mar 2021",
      bulletsEN: [
        "Coordinated training for professionals in industrial automation and developed educational simulations."
      ],
      bulletsPT: [
        "Coordenou treinamentos para profissionais em automação industrial e desenvolveu simulações educacionais."
      ]
    },
    {
      roleEN: "Technical Team Lead & Specialized Support",
      rolePT: "Líder de Equipe Técnica e Suporte Especializado",
      company: "Diesel Line Cambuí",
      periodEN: "Aug 2016 – May 2017",
      periodPT: "Ago 2016 – Mai 2017",
      bulletsEN: [
        "Led teams in maintenance of large-scale engines and managed technical support for international clients."
      ],
      bulletsPT: [
        "Liderou equipes na manutenção de motores de grande porte e gerenciou suporte técnico para clientes internacionais."
      ]
    },
    {
      roleEN: "Apprentice Technician",
      rolePT: "Técnico Aprendiz",
      company: "Diesel Line Cambuí",
      periodEN: "Oct 2015 – Aug 2016",
      periodPT: "Out 2015 – Ago 2016",
      bulletsEN: [
        "Supported commercial processes and ensured compliance in system maintenance."
      ],
      bulletsPT: [
        "Apoiou processos comerciais e assegurou conformidade na manutenção de sistemas."
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
      demo: "https://employee-hub-kappa-flame.vercel.app",
      descEN: "Corporate operations portal for ABZ Group: HR, offshore crew management, payroll, reimbursements and internal comms on Next.js 15, React 18 and Supabase/PostgreSQL (50+ tables with RLS). Ships e-Social (13 events, RSA-SHA256 XML, SOAP mTLS), OCR (Tesseract) for ASO/ID docs, digital signatures, MIO ERP sync, and an AI companion with LiveKit voice, MS Graph and autonomous KPI agents.",
      descPT: "Portal corporativo do Grupo ABZ: RH, gestão de tripulantes offshore, folha, reembolsos e comunicação interna em Next.js 15, React 18 e Supabase/PostgreSQL (50+ tabelas com RLS). Inclui e-Social (13 eventos, XML RSA-SHA256, SOAP mTLS), OCR (Tesseract) de ASO/documentos, assinatura digital, sync com o ERP MIO e um AI Companion com voz LiveKit, MS Graph e agentes autônomos de KPI."
    },
    {
      name: "SGLang Commander",
      stack: "Python · FastAPI · React · PySide6",
      url: "https://github.com/Caiolinooo/sglang-commander",
      descEN: "Desktop (PySide6) and web (React + FastAPI) console for SGLang inference servers. Starts and stops servers, streams multimodal chat (image/audio), plots live GPU/VRAM/latency metrics, deploys Hugging Face models in one click, runs P50/P95/P99 benchmarks, and supports Docker plus ZeroTier remote deploys.",
      descPT: "Console desktop (PySide6) e web (React + FastAPI) para servidores de inferência SGLang. Sobe e derruba servidores, faz chat multimodal (imagem/áudio), plota GPU/VRAM/latência em tempo real, faz deploy de modelos Hugging Face em um clique, executa benchmarks P50/P95/P99 e suporta Docker e deploys remotos via ZeroTier."
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
    aiEN: "Generative AI, LLMs, RAG, Prompt Engineering, Model Fine-Tuning, MLOps, MLflow, Azure AI Foundry, Azure ML.",
    aiPT: "IA Generativa, LLMs, RAG, Engenharia de Prompts, Fine-Tuning de Modelos, MLOps, MLflow, Azure AI Foundry, Azure ML.",
    backendEN: "Python, Java, TypeScript, Backend Development, API Integration, Data Engineering.",
    backendPT: "Python, Java, TypeScript, Desenvolvimento Backend, Integração de APIs, Engenharia de Dados.",
    cloudEN: "Linux, Git, DevOps, Cloud, Docker, Kubernetes, AWS, Azure Databricks.",
    cloudPT: "Linux, Git, DevOps, Cloud, Docker, Kubernetes, AWS, Azure Databricks.",
    dbEN: "PostgreSQL, Azure SQL, CosmosDB, Power BI.",
    dbPT: "PostgreSQL, Azure SQL, CosmosDB, Power BI.",
    systemsEN: "Data Governance, Security, Compliance.",
    systemsPT: "Governança de Dados, Segurança, Conformidade."
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
    backendLabel: "Engenharia de Dados & Backend",
    cloudLabel: "Cloud & DevOps",
    dbLabel: "Bancos de Dados & BI",
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
    backendLabel: "Data Engineering & Backend",
    cloudLabel: "Cloud & DevOps",
    dbLabel: "Databases & BI",
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
                <a href="/resume" class="btn btn-outline" target="_blank">
                    <i class="fa-solid fa-file-lines"></i> ${i18n.en.resumeBtn}
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
                <a href="/resume" class="btn btn-outline" target="_blank">
                    <i class="fa-solid fa-file-lines"></i> ${i18n.pt.resumeBtn}
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
        <a href="${profile.hackerearth}" target="_blank" aria-label="HackerEarth"><i class="fa-solid fa-code"></i></a>
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
            } else {
                document.querySelectorAll('.lang-pt').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
                document.getElementById('btn-pt').classList.remove('active');
                document.getElementById('btn-en').classList.add('active');
                document.documentElement.lang = 'en';
            }
        }
    </script>
</head>
<body>
    <div class="actions">
        <a class="back-link" href="/">&larr; Back to Portfolio / Voltar ao Portfólio</a>
        <a class="back-link" href="${profile.resumePdf}" target="_blank">Download PDF</a>
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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
