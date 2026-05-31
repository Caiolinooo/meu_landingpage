const express = require('express');
const app = express();
const PORT = 3000;

// Dados do Perfil (Extraídos do LinkedIn, GitHub e Currículo)
const profile = {
  name: "Caio Valério Goulart Correia",
  titleEN: "Senior Data Engineer & Backend Developer",
  titlePT: "Engenheiro de Dados Sênior & Desenvolvedor Backend",
  taglineEN: "Bridging Mechanical Engineering, Automation, and Software.",
  taglinePT: "Unindo Engenharia Mecânica, Automação e Software.",
  email: "caiovaleriogoulartcorreia@gmail.com",
  linkedin: "https://www.linkedin.com/in/caio-goulart",
  github: "https://github.com/Caiolinooo",
  phones: [
    { number: "22997847289", label: "WhatsApp Principal" },
    { number: "22992180404", label: "WhatsApp Secundário" }
  ],
  location: "Brazil (Remote)",
  aboutEN: "Backend-focused Data Engineer and Full-Stack Developer with a robust foundation in mechanical engineering and industrial automation, enabling a unique approach to solving complex architectural problems. Specialized in building highly scalable data pipelines, distributed systems, and robust backend architectures using Python, Java, and Node.js. Experienced in cloud infrastructure, container orchestration (Docker/Kubernetes), and automating CI/CD workflows, aiming to deliver efficient code within highly scalable and data-driven environments.",
  aboutPT: "Engenheiro de Dados com foco em Backend e Desenvolvedor Full-Stack com sólida base em engenharia mecânica e automação industrial, proporcionando uma abordagem única para a resolução de problemas arquitetônicos complexos. Especializado na construção de pipelines de dados altamente escaláveis, sistemas distribuídos e arquiteturas de backend robustas utilizando Python, Java e Node.js. Experiência em infraestrutura em nuvem, orquestração de contêineres (Docker/Kubernetes) e automação de fluxos de CI/CD.",
  stack: ["Node.js", "Python", "Java", "TypeScript", "AWS", "Docker", "Kubernetes", "PostgreSQL", "Linux", "Git", "GraphQL", "Unreal Engine", "CAD/CAM"],
  experience: [
    {
      roleEN: "Full-Stack Developer & DevOps Engineer",
      rolePT: "Desenvolvedor Full-Stack & Engenheiro DevOps",
      company: "ABZ Serviços",
      period: "Jan 2025 – Present",
      descEN: "Architected EmployeeHub (Node.js/React/TypeScript/PostgreSQL), reducing manual HR processing by 40%. Led cloud migration of legacy Windows Servers with zero downtime. Deployed WireGuard VPN for 50+ remote employees. Implemented CI/CD pipelines with GitHub Actions and Docker.",
      descPT: "Arquitetou o EmployeeHub (Node.js/React/TypeScript/PostgreSQL), reduzindo 40% do processamento manual de RH. Liderou migração de servidores Windows Server legados para nuvem com zero downtime. Implantou VPN WireGuard para 50+ funcionários remotos. Implementou pipelines de CI/CD com GitHub Actions e Docker."
    },
    {
      roleEN: "Python Developer & Spatial Data Engineer",
      rolePT: "Desenvolvedor Python & Engenheiro de Dados Espaciais",
      company: "BRTech3D",
      period: "Mar 2024 – Mar 2025",
      descEN: "Developed high-performance Python scripts (NumPy, SciPy, Open3D) for geospatial data pipelines, optimizing processing of 100M+ point cloud data points. Increased processing speed by 40% and improved data compression. Modeled PostgreSQL databases with PostGIS extension for complex spatial queries.",
      descPT: "Desenvolveu scripts de alta performance em Python (NumPy, SciPy, Open3D) para pipelines de dados geoespaciais, otimizando o processamento de nuvens de pontos com mais de 100 milhões de dados. Aumentou velocidade de processamento em 40% e melhorou compressão de dados. Modelou bancos PostgreSQL com extensão PostGIS para consultas espaciais complexas."
    },
    {
      roleEN: "Proprietário / Diretor",
      rolePT: "Proprietário / Diretor",
      company: "SmartStore",
      period: "Mai 2021 – Presente",
      descEN: "Gestão logística e atendimento ao cliente em escala. Technical documentation and pre-sales support for international clients.",
      descPT: "Gestão logística e atendimento ao cliente em escala. Documentação técnica e suporte de pré-vendas para clientes internacionais."
    },
    {
      roleEN: "Topographical Survey Operator III (Laser Scanning)",
      rolePT: "Operador de Levantamento Topográfico III (Laser Scanning)",
      company: "Master Engineering Services",
      period: "Ago 2023 – Mar 2024",
      descEN: "Operated high-precision 3D laser scanning equipment (Leica) in complex industrial and archaeological environments. Led field campaign planning and technical documentation with millimeter-level precision.",
      descPT: "Operou equipamentos de escaneamento a laser 3D de alta precisão (Leica) em ambientes industriais e arqueológicos complexos. Liderou planejamento de campanhas de campo e documentação técnica com precisão milimétrica."
    },
    {
      roleEN: "Topographical Survey Operator II",
      rolePT: "Operador de Levantamento Topográfico II",
      company: "BRTech3D",
      period: "Dez 2022 – Ago 2023",
      descEN: "Executed field data collection using Leica TLS equipment and introduced Quality Assurance (QA) processes for outlier cleaning and multiple scan registration.",
      descPT: "Executou coleta de dados em campo com equipamentos Leica TLS e introduziu processos de Garantia da Qualidade (QA) para limpeza de outliers e registro de múltiplos escaneamentos."
    },
    {
      roleEN: "Desenhista Técnico - II",
      rolePT: "Desenhista Técnico - II",
      company: "BRTech3D",
      period: "Mar 2024 – Mar 2025",
      descEN: "3D models in AutoCAD/Plant, point cloud processing (Leica Cyclone) and prototyping in Unreal Engine.",
      descPT: "Modelos em AutoCAD/Plant, processamento de nuvem de pontos (Leica Cyclone) e prototipagem em Unreal Engine."
    },
    {
      roleEN: "Training Specialist & Automation Technician",
      rolePT: "Especialista em Treinamento e Técnico em Automação",
      company: "Jackkk Connection Comercial",
      period: "Mai 2017 – Mar 2021",
      descEN: "Coordinated and delivered technical training for 500+ professionals in PLCs, hydraulics, and industrial automation. Developed educational simulations and managed B2B technical sales.",
      descPT: "Coordenou e ministrou treinamentos técnicos para mais de 500 profissionais em CLPs, hidráulica e automação industrial. Desenvolveu simulações educacionais e gerenciou vendas técnicas B2B."
    },
    {
      roleEN: "Technical Team Lead & Specialized Support",
      rolePT: "Líder de Equipe Técnica e Suporte Especializado",
      company: "Diesel Line Cambuí",
      period: "Ago 2016 – Mai 2017",
      descEN: "Led specialized field teams in maintenance of large-scale engines and turbines (CAT, Cummins, MAK). Managed English-language technical support tickets for international clients.",
      descPT: "Liderou equipes de campo especializadas na manutenção de motores e turbinas de grande porte (CAT, Cummins, MAK). Gerenciou tickets de suporte técnico em inglês para clientes internacionais."
    }
  ],
  education: [
    { school: "UniFatecie", course: "B.S. in Mechanical Engineering (7th Semester)", coursePT: "Bacharelado em Engenharia Mecânica (7º Semestre)", date: "Jan 2024 – Present" },
    { school: "ETP Escola Técnica Brasil", course: "Technical Diploma in Industrial Automation", coursePT: "Técnico em Automação Industrial", date: "Jan 2014 – Jan 2016" }
  ],
  skills: {
    backendEN: "Python 3 (NumPy, SciPy), Java (Spring Boot), Node.js, Express, TypeScript, REST & GraphQL APIs, JWT Auth.",
    backendPT: "Python 3 (NumPy, SciPy), Java (Spring Boot), Node.js, Express, TypeScript, APIs REST & GraphQL, Autenticação JWT.",
    cloudEN: "Docker, Kubernetes (Concepts), AWS S3, Linux (Ubuntu/CentOS), Proxmox, WireGuard VPN, Cloudflare.",
    cloudPT: "Docker, Kubernetes (Conceitos), AWS S3, Linux (Ubuntu/CentOS), Proxmox, WireGuard VPN, Cloudflare.",
    dbEN: "PostgreSQL, PostGIS, SQLite, NoSQL, GitHub Actions (CI/CD), Git, Advanced Scripting (PowerShell/Python).",
    dbPT: "PostgreSQL, PostGIS, SQLite, NoSQL, GitHub Actions (CI/CD), Git, Scripting Avançado (PowerShell/Python).",
    systemsEN: "Windows Server (2012-2025), Active Directory, DNS/DHCP, Distributed Systems Architecture.",
    systemsPT: "Windows Server (2012-2025), Active Directory, DNS/DHCP, Arquitetura de Sistemas Distribuídos."
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
    education: "Educação & Certificações",
    allRights: "Todos os direitos reservados.",
    chatgptDesc: "Especialista em Prompt Engineering e automação com IA.",
    skillsTitle: "Competências Técnicas",
    backendLabel: "Backend & Engenharia de Dados",
    cloudLabel: "Cloud & DevOps",
    dbLabel: "Bancos de Dados & CI/CD",
    systemsLabel: "Sistemas Corporativos",
    languagesLabel: "Idiomas",
    projectsTitle: "Projetos Relevantes",
    mcpDesc: "Desenvolveu e integrou um sistema de grafo de conhecimento no Model Context Protocol, configurando ferramentas para interfaceamento com LLMs locais (Ollama em GPUs NVIDIA).",
    resumeBtn: "Ver Currículo",
  },
  en: {
    greeting: "Hello, world.",
    heroTitle: "I'm",
    viewProjects: "View Projects",
    talkToMe: "Talk to Me",
    techJourney: "Technical Journey",
    techArsenal: "Tech Arsenal",
    education: "Education & Certifications",
    allRights: "All rights reserved.",
    chatgptDesc: "Expert in Prompt Engineering and AI automation.",
    skillsTitle: "Technical Skills",
    backendLabel: "Backend & Data Engineering",
    cloudLabel: "Cloud & DevOps",
    dbLabel: "Databases & CI/CD",
    systemsLabel: "Enterprise Systems",
    languagesLabel: "Languages",
    projectsTitle: "Relevant Projects",
    mcpDesc: "Developed and integrated a knowledge graph system into the Model Context Protocol, configuring tools to interface with local LLMs (Ollama on NVIDIA GPUs).",
    resumeBtn: "View Resume",
  }
};

app.get('/', (req, res) => {
  const t = i18n.en;
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
        header { display: flex; justify-content: space-between; align-items: center; padding: 40px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .logo { font-weight: 700; font-size: 1.5rem; letter-spacing: -1px; }
        .logo span { color: var(--primary); }
        .hero { min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
        .hero h2 { font-family: 'JetBrains Mono', monospace; color: var(--primary); font-size: 1.2rem; margin-bottom: 20px; }
        .hero h1 { font-size: clamp(3rem, 6vw, 5rem); line-height: 1.1; margin-bottom: 20px; background: linear-gradient(90deg, #fff, #888); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { max-width: 600px; font-size: 1.2rem; color: var(--muted); margin-bottom: 40px; line-height: 1.6; }
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
        .card { background: var(--card); border: 1px solid #222; padding: 30px; border-radius: 12px; transition: 0.3s; }
        .card:hover { border-color: var(--primary); transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .card h3 { margin-bottom: 10px; font-size: 1.4rem; }
        .card .meta { color: var(--primary); font-size: 0.9rem; margin-bottom: 15px; font-family: 'JetBrains Mono', monospace; }
        .card p { color: var(--muted); font-size: 0.95rem; line-height: 1.6; }
        .tech-grid { display: flex; flex-wrap: wrap; gap: 15px; }
        .tech-item { background: rgba(255,255,255,0.05); padding: 10px 20px; border-radius: 50px; border: 1px solid transparent; transition: 0.3s; }
        .tech-item:hover { border-color: var(--primary); background: rgba(0, 242, 255, 0.1); color: var(--primary); }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .skill-category { background: var(--card); border: 1px solid #222; padding: 25px; border-radius: 12px; }
        .skill-category strong { display: block; margin-bottom: 10px; color: var(--primary); font-family: 'JetBrains Mono', monospace; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
        .skill-category p { color: var(--muted); font-size: 0.9rem; line-height: 1.6; margin: 0; }
        .matrix-table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.9rem; }
        .matrix-table th, .matrix-table td { border: 1px solid #222; padding: 10px 15px; text-align: left; }
        .matrix-table th { background: rgba(0,242,255,0.05); color: var(--primary); font-family: 'JetBrains Mono', monospace; }
        .matrix-table td { color: var(--muted); }
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

        <!-- EN Hero -->
        <section class="hero lang-content active" data-lang="en">
            <h2>${i18n.en.greeting}</h2>
            <h1>${i18n.en.heroTitle} <span style="color:var(--primary)">${profile.name}</span>.</h1>
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

        <!-- PT Hero -->
        <section class="hero lang-content" data-lang="pt">
            <h2>${i18n.pt.greeting}</h2>
            <h1>${i18n.pt.heroTitle} <span style="color:var(--primary)">${profile.name}</span>.</h1>
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

        <!-- EN Experience -->
        <section id="experience" class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.techJourney}</h2>
            <div class="grid">
                ${profile.experience.map(job => `
                    <div class="card">
                        <div class="meta">${job.period} • ${job.company}</div>
                        <h3>${job.roleEN}</h3>
                        <p>${job.descEN}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- PT Experience -->
        <section id="experience" class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.techJourney}</h2>
            <div class="grid">
                ${profile.experience.map(job => `
                    <div class="card">
                        <div class="meta">${job.period} • ${job.company}</div>
                        <h3>${job.rolePT}</h3>
                        <p>${job.descPT}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- EN Skills Matrix -->
        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.skillsTitle}</h2>
            <div style="overflow-x:auto;">
                <table class="matrix-table">
                    <thead>
                        <tr><th>Skill / Technology</th><th>Years</th><th>Level</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Backend Development</td><td>9 years</td><td>Senior</td></tr>
                        <tr><td>Python</td><td>9 years</td><td>Senior</td></tr>
                        <tr><td>SQL & NoSQL</td><td>9 years</td><td>Senior</td></tr>
                        <tr><td>RESTful APIs</td><td>6 years</td><td>Senior</td></tr>
                        <tr><td>Docker</td><td>6 years</td><td>Senior</td></tr>
                        <tr><td>Data Engineering</td><td>5 years</td><td>Senior</td></tr>
                        <tr><td>Node.js</td><td>5 years</td><td>Senior</td></tr>
                        <tr><td>Java (Spring Boot)</td><td>4 years</td><td>Mid / Senior</td></tr>
                        <tr><td>AWS</td><td>4 years</td><td>Mid</td></tr>
                        <tr><td>GraphQL</td><td>3 years</td><td>Mid</td></tr>
                        <tr><td>Kubernetes</td><td>3 years</td><td>Mid</td></tr>
                        <tr><td>OCI Cloud</td><td>2 years</td><td>Mid</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- PT Skills Matrix -->
        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.skillsTitle}</h2>
            <div style="overflow-x:auto;">
                <table class="matrix-table">
                    <thead>
                        <tr><th>Habilidade / Tecnologia</th><th>Anos</th><th>Nível</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Desenvolvimento Backend</td><td>9 anos</td><td>Sênior</td></tr>
                        <tr><td>Python</td><td>9 anos</td><td>Sênior</td></tr>
                        <tr><td>SQL & NoSQL</td><td>9 anos</td><td>Sênior</td></tr>
                        <tr><td>APIs RESTful</td><td>6 anos</td><td>Sênior</td></tr>
                        <tr><td>Docker</td><td>6 anos</td><td>Sênior</td></tr>
                        <tr><td>Engenharia de Dados</td><td>5 anos</td><td>Sênior</td></tr>
                        <tr><td>Node.js</td><td>5 anos</td><td>Sênior</td></tr>
                        <tr><td>Java (Spring Boot)</td><td>4 anos</td><td>Pleno / Sênior</td></tr>
                        <tr><td>AWS</td><td>4 anos</td><td>Pleno</td></tr>
                        <tr><td>GraphQL</td><td>3 anos</td><td>Pleno</td></tr>
                        <tr><td>Kubernetes</td><td>3 anos</td><td>Pleno</td></tr>
                        <tr><td>OCI Cloud</td><td>2 anos</td><td>Pleno</td></tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- EN Skills Grid -->
        <section class="lang-content active" data-lang="en">
            <div class="skills-grid">
                <div class="skill-category">
                    <strong>${i18n.en.backendLabel}</strong>
                    <p>${profile.skills.backendEN}</p>
                </div>
                <div class="skill-category">
                    <strong>${i18n.en.cloudLabel}</strong>
                    <p>${profile.skills.cloudEN}</p>
                </div>
                <div class="skill-category">
                    <strong>${i18n.en.dbLabel}</strong>
                    <p>${profile.skills.dbEN}</p>
                </div>
                <div class="skill-category">
                    <strong>${i18n.en.systemsLabel}</strong>
                    <p>${profile.skills.systemsEN}</p>
                </div>
            </div>
        </section>

        <!-- PT Skills Grid -->
        <section class="lang-content" data-lang="pt">
            <div class="skills-grid">
                <div class="skill-category">
                    <strong>${i18n.pt.backendLabel}</strong>
                    <p>${profile.skills.backendPT}</p>
                </div>
                <div class="skill-category">
                    <strong>${i18n.pt.cloudLabel}</strong>
                    <p>${profile.skills.cloudPT}</p>
                </div>
                <div class="skill-category">
                    <strong>${i18n.pt.dbLabel}</strong>
                    <p>${profile.skills.dbPT}</p>
                </div>
                <div class="skill-category">
                    <strong>${i18n.pt.systemsLabel}</strong>
                    <p>${profile.skills.systemsPT}</p>
                </div>
            </div>
        </section>

        <section id="stack">
            <h2 class="section-title">${t.techArsenal}</h2>
            <div class="tech-grid">
                ${profile.stack.map(tech => `
                    <div class="tech-item">
                        <i class="fa-solid fa-code" style="margin-right:8px; color:var(--primary)"></i> ${tech}
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- EN Projects -->
        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.projectsTitle}</h2>
            <div class="grid">
                <div class="card">
                    <div class="meta">Model Context Protocol</div>
                    <h3>MCP Integration</h3>
                    <p>${i18n.en.mcpDesc}</p>
                </div>
            </div>
        </section>

        <!-- PT Projects -->
        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.projectsTitle}</h2>
            <div class="grid">
                <div class="card">
                    <div class="meta">Model Context Protocol</div>
                    <h3>Integração MCP</h3>
                    <p>${i18n.pt.mcpDesc}</p>
                </div>
            </div>
        </section>
        
        <section id="education">
            <h2 class="section-title">${t.education}</h2>
            <div class="grid">
                 <div class="card">
                    <h3 class="lang-content active" data-lang="en">${profile.education[0].course}</h3>
                    <h3 class="lang-content" data-lang="pt">${profile.education[0].coursePT}</h3>
                    <div class="meta">${profile.education[0].school}</div>
                    <p>${profile.education[0].date}</p>
                 </div>
                 <div class="card">
                    <h3 class="lang-content active" data-lang="en">${profile.education[1].course}</h3>
                    <h3 class="lang-content" data-lang="pt">${profile.education[1].coursePT}</h3>
                    <div class="meta">${profile.education[1].school}</div>
                    <p>${profile.education[1].date}</p>
                 </div>
                 <div class="card" style="border-color: #ffd700;">
                    <h3>ChatGPT Expert <i class="fa-solid fa-certificate" style="color:#ffd700"></i></h3>
                    <div class="meta">Emi / Credential ID 332515</div>
                    <p class="lang-content active" data-lang="en">${i18n.en.chatgptDesc}</p>
                    <p class="lang-content" data-lang="pt">${i18n.pt.chatgptDesc}</p>
                 </div>
            </div>
        </section>

        <section>
            <h2 class="section-title">${t.languagesLabel}</h2>
            <div class="skills-grid" style="grid-template-columns: 1fr;">
                <div class="skill-category">
                    <p class="lang-content active" data-lang="en">${profile.languages.en}</p>
                    <p class="lang-content" data-lang="pt">${profile.languages.pt}</p>
                </div>
            </div>
        </section>

        <footer>
            <p>&copy; ${new Date().getFullYear()} ${profile.name}. ${t.allRights}</p>
        </footer>
    </div>

    <div class="contact-bar">
        <a href="https://wa.me/55${profile.phones[0].number}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="https://wa.me/55${profile.phones[1].number}" target="_blank"><i class="fa-solid fa-mobile-screen"></i></a>
        <a href="mailto:${profile.email}"><i class="fa-solid fa-envelope"></i></a>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script>
        function switchLang(lang) {
            document.querySelectorAll('.lang-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('[data-lang="' + lang + '"]').forEach(el => el.classList.add('active'));
            document.querySelectorAll('.lang-toggle a').forEach(el => el.classList.remove('active'));
            document.querySelector('.lang-toggle a[onclick*="' + lang + '"]').classList.add('active');
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
        .lang-toggle button:hover, .lang-toggle button.active { background-color: var(--border); }
        header { margin-bottom: 30px; }
        h1 { font-size: 32px; margin: 0 0 5px 0; letter-spacing: -0.5px; }
        h2 { font-size: 18px; color: var(--muted); font-weight: 400; margin: 0 0 15px 0; }
        .contact { font-size: 14px; color: var(--muted); display: flex; flex-wrap: wrap; gap: 12px; }
        .summary { font-size: 15px; margin-bottom: 30px; color: #24292e; }
        h3 { font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid var(--border); padding-bottom: 8px; margin-top: 35px; margin-bottom: 20px; }
        .job { margin-bottom: 25px; }
        .job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
        .job-title { font-weight: 600; font-size: 16px; }
        .job-meta { font-size: 14px; color: var(--muted); }
        .job-details { margin: 0; padding-left: 20px; font-size: 14px; color: #24292e; }
        .job-details li { margin-bottom: 8px; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 14px; }
        .skill-category strong { display: block; margin-bottom: 5px; color: var(--text); }
        .skill-category p { margin: 0; color: var(--muted); }
        .matrix-table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; font-size: 14px; }
        .matrix-table th, .matrix-table td { border: 1px solid var(--border); padding: 8px 12px; text-align: left; }
        .matrix-table th { background-color: var(--btn-bg); font-weight: 600; }
        .back-link { display: inline-block; margin-bottom: 20px; font-size: 14px; }
        @media (max-width: 600px) { .job-header { flex-direction: column; } .skills-grid { grid-template-columns: 1fr; } }
        .lang-pt { display: none; }
    </style>
    <script>
        function setLanguage(lang) {
            if (lang === 'pt') {
                document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.lang-pt').forEach(el => el.style.display = 'block');
                document.getElementById('btn-en').classList.remove('active');
                document.getElementById('btn-pt').classList.add('active');
            } else {
                document.querySelectorAll('.lang-pt').forEach(el => el.style.display = 'none');
                document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
                document.getElementById('btn-pt').classList.remove('active');
                document.getElementById('btn-en').classList.add('active');
            }
        }
    </script>
</head>
<body>
    <a class="back-link" href="/">&larr; Back to Portfolio</a>

    <div class="lang-toggle">
        <button id="btn-en" class="active" onclick="setLanguage('en')">English</button>
        <button id="btn-pt" onclick="setLanguage('pt')">Português</button>
    </div>

    <!-- ENGLISH -->
    <div class="lang-en">
        <header>
            <h1>Caio Valério Goulart Correia</h1>
            <h2>Senior Data Engineer & Backend Developer</h2>
            <div class="contact">
                <span>Brazil (Remote)</span>
                <span><a href="mailto:${profile.email}">${profile.email}</a></span>
                <span>+55 22 99784-7289</span>
                <span><a href="${profile.github}" target="_blank">github.com/Caiolinooo</a></span>
                <span><a href="${profile.linkedin}" target="_blank">linkedin.com/in/caio-goulart</a></span>
            </div>
        </header>
        <div class="summary"><p>${profile.aboutEN}</p></div>
        <section>
            <h3>Core Competencies & Experience Matrix</h3>
            <table class="matrix-table">
                <thead><tr><th>Skill / Technology</th><th>Years</th><th>Level</th></tr></thead>
                <tbody>
                    <tr><td>Backend Development</td><td>9 years</td><td>Senior</td></tr>
                    <tr><td>Python</td><td>9 years</td><td>Senior</td></tr>
                    <tr><td>SQL & NoSQL</td><td>9 years (each)</td><td>Senior</td></tr>
                    <tr><td>RESTful APIs</td><td>6 years</td><td>Senior</td></tr>
                    <tr><td>Docker</td><td>6 years</td><td>Senior</td></tr>
                    <tr><td>Data Engineering</td><td>5 years</td><td>Senior</td></tr>
                    <tr><td>Node.js</td><td>5 years</td><td>Senior</td></tr>
                    <tr><td>Java (Spring Boot)</td><td>4 years</td><td>Mid / Senior</td></tr>
                    <tr><td>AWS</td><td>4 years</td><td>Mid</td></tr>
                    <tr><td>GraphQL</td><td>3 years</td><td>Mid</td></tr>
                    <tr><td>Kubernetes</td><td>3 years</td><td>Mid</td></tr>
                    <tr><td>OCI Cloud</td><td>2 years</td><td>Mid</td></tr>
                </tbody>
            </table>
        </section>
        <section>
            <h3>Professional Experience</h3>
            <div class="job"><div class="job-header"><span class="job-title">Full-Stack Developer & DevOps Engineer</span><span class="job-meta">ABZ Serviços • Jan 2025 – Present</span></div><ul class="job-details"><li>Architected and developed <em>EmployeeHub</em>, an internal HR management system used by 200+ employees. Built with Node.js (Express), React, TypeScript, and PostgreSQL, automating workflows and reducing manual processing time by 40%.</li><li>Led the cloud migration of legacy on-premise Windows Servers (2012-2025), achieving 80% completion with zero downtime in production environments.</li><li>Engineered and deployed a WireGuard-based VPN infrastructure for 50+ remote employees, drastically reducing support tickets and connection failures.</li><li>Implemented end-to-end CI/CD pipelines using GitHub Actions, Docker containerization, and administered virtualized environments across Proxmox and AWS S3.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Python Developer & Spatial Data Engineer</span><span class="job-meta">BRTech3D • Mar 2024 – Mar 2025</span></div><ul class="job-details"><li>Developed high-performance Python scripts (NumPy, SciPy, Open3D) to automate geospatial data pipelines, optimizing the processing of dense point clouds (100+ million data points).</li><li>Implemented data routines that increased processing speed by 40% and improved data compression, yielding significant resource and time savings across dozens of projects.</li><li>Modeled and optimized PostgreSQL databases utilizing the PostGIS extension for complex spatial queries and seamless integration via REST APIs.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Topographical Survey Operator III (Laser Scanning)</span><span class="job-meta">Master Engineering Services • Aug 2023 – Mar 2024</span></div><ul class="job-details"><li>Operated high-precision 3D laser scanning equipment (Leica) in complex industrial and archaeological environments.</li><li>Led field campaign planning and technical documentation, ensuring millimeter-level precision and data backup redundancy for large-scale data collection.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Topographical Survey Operator II</span><span class="job-meta">BRTech3D • Dec 2022 – Aug 2023</span></div><ul class="job-details"><li>Executed field data collection using Leica TLS equipment and introduced Quality Assurance (QA) processes for outlier cleaning and multiple scan registration.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Technical Documentation & Support Specialist</span><span class="job-meta">SmartStore / Jackkk Connection • Mar 2021 – Dec 2022</span></div><ul class="job-details"><li>Produced 50+ bilingual technical manuals and system specifications for international clients.</li><li>Provided advanced pre-sales support and detailed hardware/software architecture mapping for complex business proposals.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Training Specialist & Automation Technician</span><span class="job-meta">Jackkk Connection Comercial • May 2017 – Mar 2021</span></div><ul class="job-details"><li>Coordinated and delivered technical training for over 500 professionals in PLCs, hydraulics, and industrial automation.</li><li>Developed educational simulations and managed B2B technical sales, building direct relationships with international suppliers.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Technical Team Lead & Specialized Support</span><span class="job-meta">Diesel Line Cambuí • Aug 2016 – May 2017</span></div><ul class="job-details"><li>Led specialized field teams in the maintenance of large-scale engines and turbines (CAT, Cummins, MAK).</li><li>Managed English-language technical support tickets for international clients and formally documented failure analysis processes.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Apprentice Technician</span><span class="job-meta">Diesel Line Cambuí • Oct 2015 – Aug 2016</span></div><ul class="job-details"><li>Began career providing support to commercial processes, CRM management, and strict application of compliance procedures for diesel and gas systems maintenance.</li></ul></div>
        </section>
        <section>
            <h3>Relevant Projects</h3>
            <div class="job"><ul class="job-details"><li><strong>Model Context Protocol (MCP) Integration:</strong> Developed and integrated a knowledge graph system into the Model Context Protocol. Handled technical setup using Python and SQLite indexing, configuring tools to seamlessly interface with local Large Language Models (Ollama 0.17.0 on NVIDIA GPUs).</li></ul></div>
        </section>
        <section>
            <h3>Technical Skills</h3>
            <div class="skills-grid">
                <div class="skill-category"><strong>Backend & Data Engineering</strong><p>${profile.skills.backendEN}</p></div>
                <div class="skill-category"><strong>Cloud & DevOps</strong><p>${profile.skills.cloudEN}</p></div>
                <div class="skill-category"><strong>Databases & CI/CD</strong><p>${profile.skills.dbEN}</p></div>
                <div class="skill-category"><strong>Enterprise Systems</strong><p>${profile.skills.systemsEN}</p></div>
            </div>
        </section>
        <section>
            <h3>Education</h3>
            <div class="job"><div class="job-header"><span class="job-title">B.S. in Mechanical Engineering (7th Semester)</span><span class="job-meta">UniFatecie • Jan 2024 – Present</span></div></div>
            <div class="job"><div class="job-header"><span class="job-title">Technical Diploma in Industrial Automation</span><span class="job-meta">ETP Escola Técnica Brasil • Jan 2014 – Jan 2016</span></div></div>
        </section>
        <section>
            <h3>Languages</h3>
            <div class="skills-grid" style="grid-template-columns: 1fr;"><div class="skill-category"><p>${profile.languages.en}</p></div></div>
        </section>
    </div>

    <!-- PORTUGUÊS -->
    <div class="lang-pt">
        <header>
            <h1>Caio Valério Goulart Correia</h1>
            <h2>Engenheiro de Dados Sênior & Desenvolvedor Backend</h2>
            <div class="contact">
                <span>Brasil (Remoto)</span>
                <span><a href="mailto:${profile.email}">${profile.email}</a></span>
                <span>+55 22 99784-7289</span>
                <span><a href="${profile.github}" target="_blank">github.com/Caiolinooo</a></span>
                <span><a href="${profile.linkedin}" target="_blank">linkedin.com/in/caio-goulart</a></span>
            </div>
        </header>
        <div class="summary"><p>${profile.aboutPT}</p></div>
        <section>
            <h3>Competências Principais & Matriz de Experiência</h3>
            <table class="matrix-table">
                <thead><tr><th>Habilidade / Tecnologia</th><th>Anos</th><th>Nível</th></tr></thead>
                <tbody>
                    <tr><td>Desenvolvimento Backend</td><td>9 anos</td><td>Sênior</td></tr>
                    <tr><td>Python</td><td>9 anos</td><td>Sênior</td></tr>
                    <tr><td>SQL & NoSQL</td><td>9 anos (cada)</td><td>Sênior</td></tr>
                    <tr><td>APIs RESTful</td><td>6 anos</td><td>Sênior</td></tr>
                    <tr><td>Docker</td><td>6 anos</td><td>Sênior</td></tr>
                    <tr><td>Engenharia de Dados</td><td>5 anos</td><td>Sênior</td></tr>
                    <tr><td>Node.js</td><td>5 anos</td><td>Sênior</td></tr>
                    <tr><td>Java (Spring Boot)</td><td>4 anos</td><td>Pleno / Sênior</td></tr>
                    <tr><td>AWS</td><td>4 anos</td><td>Pleno</td></tr>
                    <tr><td>GraphQL</td><td>3 anos</td><td>Pleno</td></tr>
                    <tr><td>Kubernetes</td><td>3 anos</td><td>Pleno</td></tr>
                    <tr><td>OCI Cloud</td><td>2 anos</td><td>Pleno</td></tr>
                </tbody>
            </table>
        </section>
        <section>
            <h3>Experiência Profissional</h3>
            <div class="job"><div class="job-header"><span class="job-title">Desenvolvedor Full-Stack & Engenheiro DevOps</span><span class="job-meta">ABZ Serviços • Jan 2025 – Presente</span></div><ul class="job-details"><li>Arquitetou e desenvolveu o <em>EmployeeHub</em>, um sistema interno de gestão de RH utilizado por mais de 200 colaboradores. Construído com Node.js (Express), React, TypeScript e PostgreSQL, automatizando fluxos de trabalho e reduzindo o tempo de processamento manual em 40%.</li><li>Liderou a migração para a nuvem de servidores Windows Server locais (2012-2025), atingindo 80% de conclusão com zero tempo de inatividade em ambientes de produção.</li><li>Projetou e implantou uma infraestrutura de VPN baseada em WireGuard para mais de 50 funcionários remotos, reduzindo drasticamente tickets de suporte e falhas de conexão.</li><li>Implementou pipelines de CI/CD de ponta a ponta utilizando GitHub Actions, conteinerização com Docker e administrou ambientes virtualizados via Proxmox e AWS S3.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Desenvolvedor Python & Engenheiro de Dados Espaciais</span><span class="job-meta">BRTech3D • Mar 2024 – Mar 2025</span></div><ul class="job-details"><li>Desenvolveu scripts de alta performance em Python (NumPy, SciPy, Open3D) para automatizar pipelines de dados geoespaciais, otimizando o processamento de nuvens de pontos densas (mais de 100 milhões de pontos de dados).</li><li>Implementou rotinas de dados que aumentaram a velocidade de processamento em 40% e melhoraram a compressão de dados, gerando economias significativas de tempo e recursos em dezenas de projetos.</li><li>Modelou e otimizou bancos de dados PostgreSQL utilizando a extensão PostGIS para consultas espaciais complexas e integração perfeita via APIs REST.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Operador de Levantamento Topográfico III (Laser Scanning)</span><span class="job-meta">Master Engineering Services • Ago 2023 – Mar 2024</span></div><ul class="job-details"><li>Operou equipamentos de escaneamento a laser 3D de alta precisão (Leica) em ambientes industriais e arqueológicos complexos.</li><li>Liderou o planejamento de campanhas de campo e documentação técnica, garantindo precisão milimétrica e redundância de backup de dados em coletas de grande escala.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Operador de Levantamento Topográfico II</span><span class="job-meta">BRTech3D • Dez 2022 – Ago 2023</span></div><ul class="job-details"><li>Executou a coleta de dados em campo utilizando equipamentos Leica TLS e introduziu processos de Garantia da Qualidade (QA) para limpeza de outliers e registro de múltiplos escaneamentos.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Especialista em Documentação Técnica e Suporte</span><span class="job-meta">SmartStore / Jackkk Connection • Mar 2021 – Dez 2022</span></div><ul class="job-details"><li>Produziu mais de 50 manuais técnicos bilíngues e especificações de sistemas para clientes internacionais.</li><li>Forneceu suporte avançado de pré-vendas e mapeamento detalhado de arquitetura de hardware/software para propostas comerciais complexas.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Especialista em Treinamento e Técnico em Automação</span><span class="job-meta">Jackkk Connection Comercial • Mai 2017 – Mar 2021</span></div><ul class="job-details"><li>Coordenou e ministrou treinamentos técnicos para mais de 500 profissionais em CLPs, hidráulica e automação industrial.</li><li>Desenvolveu simulações educacionais e gerenciou vendas técnicas B2B, construindo relacionamento direto com fornecedores internacionais.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Líder de Equipe Técnica e Suporte Especializado</span><span class="job-meta">Diesel Line Cambuí • Ago 2016 – Mai 2017</span></div><ul class="job-details"><li>Liderou equipes de campo especializadas na manutenção de motores e turbinas de grande porte (CAT, Cummins, MAK).</li><li>Gerenciou tickets de suporte técnico em inglês para clientes internacionais e documentou formalmente processos de análise de falhas.</li></ul></div>
            <div class="job"><div class="job-header"><span class="job-title">Técnico Aprendiz</span><span class="job-meta">Diesel Line Cambuí • Out 2015 – Ago 2016</span></div><ul class="job-details"><li>Iniciou a carreira prestando suporte a processos comerciais, gestão de CRM e aplicação estrita de procedimentos de conformidade para manutenção de sistemas a diesel e gás.</li></ul></div>
        </section>
        <section>
            <h3>Projetos Relevantes</h3>
            <div class="job"><ul class="job-details"><li><strong>Integração do Model Context Protocol (MCP):</strong> Desenvolveu e integrou um sistema de grafo de conhecimento no Model Context Protocol. Gerenciou a configuração técnica utilizando Python e indexação SQLite, configurando ferramentas para interfaceamento perfeito com Modelos de Linguagem de Larga Escala (LLMs) locais (Ollama 0.17.0 em GPUs NVIDIA).</li></ul></div>
        </section>
        <section>
            <h3>Habilidades Técnicas</h3>
            <div class="skills-grid">
                <div class="skill-category"><strong>Engenharia de Dados e Backend</strong><p>${profile.skills.backendPT}</p></div>
                <div class="skill-category"><strong>Cloud & DevOps</strong><p>${profile.skills.cloudPT}</p></div>
                <div class="skill-category"><strong>Bancos de Dados & CI/CD</strong><p>${profile.skills.dbPT}</p></div>
                <div class="skill-category"><strong>Sistemas Corporativos</strong><p>${profile.skills.systemsPT}</p></div>
            </div>
        </section>
        <section>
            <h3>Formação Acadêmica</h3>
            <div class="job"><div class="job-header"><span class="job-title">Bacharelado em Engenharia Mecânica (7º Semestre)</span><span class="job-meta">UniFatecie • Jan 2024 – Presente</span></div></div>
            <div class="job"><div class="job-header"><span class="job-title">Técnico em Automação Industrial</span><span class="job-meta">ETP Escola Técnica Brasil • Jan 2014 – Jan 2016</span></div></div>
        </section>
        <section>
            <h3>Idiomas</h3>
            <div class="skills-grid" style="grid-template-columns: 1fr;"><div class="skill-category"><p>${profile.languages.pt}</p></div></div>
        </section>
    </div>
</body>
</html>`);
});

// Linha corrigida: Sem barra invertida (\) antes do backtick
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
