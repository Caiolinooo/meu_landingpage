const express = require('express');
const path = require('path');
const { buildResumePdf } = require('./resume-pdf');
const { loadCvResult, toPdfProfile } = require('./cv-source');

const REMOTE_CV_CACHE = 'public, s-maxage=3600, stale-while-revalidate=86400';
const FALLBACK_CV_CACHE = 'public, s-maxage=60';

function cachePublicCv(res, sources) {
  const allRemote = sources.every((source) => source === 'remote');
  res.setHeader('Cache-Control', allRemote ? REMOTE_CV_CACHE : FALLBACK_CV_CACHE);
}
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/favicon.ico', (_req, res) => res.status(204).end());

const site = {
  email: "caiovaleriogoulartcorreia@gmail.com",
  linkedin: "https://www.linkedin.com/in/caio-goulart",
  github: "https://github.com/Caiolinooo",
  hackerearth: "https://www.hackerearth.com/@caiovaleriogoulartcorreia/",
  phones: [
    { number: "22997847289", label: "WhatsApp Principal" },
    { number: "22992180404", label: "WhatsApp Secundário" }
  ]
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
    certifications: "Certificações",
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
    certifications: "Certifications",
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeUrl(url) {
  if (typeof url !== "string" || url.trim() === "") return "";
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
    return escapeHtml(url);
  } catch {
    return "";
  }
}

function bullets(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderExperienceCards(cv) {
  return cv.experience.map((job) => {
    const meta = [job.period, job.company, job.location || ""].filter(Boolean).map(escapeHtml).join(" • ");
    const list = job.bullets.length ? `<ul>${bullets(job.bullets)}</ul>` : "";
    return `
                    <div class="card">
                        <div class="meta">${meta}</div>
                        <h3>${escapeHtml(job.role)}</h3>
                        ${list}
                    </div>`;
  }).join("");
}

function renderResumeJobs(cv) {
  return cv.experience.map((job) => {
    const meta = [job.company, job.location || "", job.period].filter(Boolean).map(escapeHtml).join(" • ");
    const list = job.bullets.length ? `<ul class="job-details">${bullets(job.bullets)}</ul>` : "";
    return `
            <div class="job">
                <div class="job-header">
                    <span class="job-title">${escapeHtml(job.role)}</span>
                    <span class="job-meta">${meta}</span>
                </div>
                ${list}
            </div>`;
  }).join("");
}

function projectLinks(project, lang) {
  const t = i18n[lang];
  const links = [];
  const url = safeUrl(project.url);
  const demo = safeUrl(project.demo);
  if (url) links.push(`<a href="${url}" target="_blank" rel="noopener">${t.viewCode}</a>`);
  if (demo) links.push(`<a href="${demo}" target="_blank" rel="noopener">${t.liveDemo}</a>`);
  return links;
}

function renderProjectCards(lang, cv) {
  return cv.projects.map((project) => {
    const links = projectLinks(project, lang);
    return `
                <div class="card">
                    <div class="meta">${escapeHtml(project.stack)}</div>
                    <h3>${escapeHtml(project.name)}</h3>
                    <p>${escapeHtml(project.desc)}</p>
                    <div class="project-links">${links.join("")}</div>
                </div>`;
  }).join("");
}

function renderResumeProjects(lang, cv) {
  return cv.projects.map((project) => {
    const links = projectLinks(project, lang);
    return `
            <div class="job">
                <div class="job-header">
                    <span class="job-title">${escapeHtml(project.name)}</span>
                    <span class="job-meta">${escapeHtml(project.stack)}</span>
                </div>
                <p class="project-copy">${escapeHtml(project.desc)}</p>
                <p class="project-links">${links.join(" · ")}</p>
            </div>`;
  }).join("");
}

function datedMeta(primary, period) {
  return [primary, period].filter(Boolean).join(" • ");
}

function renderEducationCards(cv) {
  return cv.education.map((item) => `
                 <div class="card">
                    <h3>${escapeHtml(item.course)}</h3>
                    <div class="meta">${escapeHtml(datedMeta(item.school, item.period))}</div>
                 </div>`).join("");
}

function renderResumeEducation(cv) {
  return cv.education.map((item) => `
            <div class="job">
                <div class="job-header">
                    <span class="job-title">${escapeHtml(item.course)}</span>
                    <span class="job-meta">${escapeHtml(datedMeta(item.school, item.period))}</span>
                </div>
            </div>`).join("");
}

function certificationMeta(item) {
  const id = item.credentialId ? `ID ${item.credentialId}` : "";
  return [item.issuer, item.date, id].filter(Boolean).map(escapeHtml).join(" • ");
}

function renderCertificationCards(cv) {
  return cv.certifications.map((item) => `
                 <div class="card">
                    <h3>${escapeHtml(item.name)}</h3>
                    <div class="meta">${certificationMeta(item)}</div>
                 </div>`).join("");
}

function renderResumeCertifications(cv) {
  return cv.certifications.map((item) => `
            <div class="job">
                <div class="job-header">
                    <span class="job-title">${escapeHtml(item.name)}</span>
                    <span class="job-meta">${certificationMeta(item)}</span>
                </div>
            </div>`).join("");
}

function renderSkillsGrid(lang, cv) {
  const t = i18n[lang];
  return `
            <div class="skills-grid">
                <div class="skill-category">
                    <strong>${t.aiLabel}</strong>
                    <p>${escapeHtml(cv.skills.ai)}</p>
                </div>
                <div class="skill-category">
                    <strong>${t.backendLabel}</strong>
                    <p>${escapeHtml(cv.skills.backend)}</p>
                </div>
                <div class="skill-category">
                    <strong>${t.cloudLabel}</strong>
                    <p>${escapeHtml(cv.skills.cloud)}</p>
                </div>
                <div class="skill-category">
                    <strong>${t.dbLabel}</strong>
                    <p>${escapeHtml(cv.skills.db)}</p>
                </div>
                <div class="skill-category">
                    <strong>${t.systemsLabel}</strong>
                    <p>${escapeHtml(cv.skills.systems)}</p>
                </div>
            </div>`;
}

function renderStack(cv) {
  return cv.stack.map((tech) => `
                    <div class="tech-item">
                        <i class="fa-solid fa-code" style="margin-right:8px; color:var(--primary)"></i> ${escapeHtml(tech)}
                    </div>`).join("");
}

app.get('/', async (req, res) => {
  const [enResult, ptResult] = await Promise.all([loadCvResult('en'), loadCvResult('pt')]);
  const cvEn = enResult.cv;
  const cvPt = ptResult.cv;
  cachePublicCv(res, [enResult.source, ptResult.source]);
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(cvEn.name)} | Portfolio</title>
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
            <div class="logo">&lt; ${escapeHtml(cvEn.name.split(' ')[0])} /&gt;</div>
            <div style="display:flex; gap:20px; align-items:center;">
                <div class="lang-toggle">
                    <a href="#" class="active" onclick="switchLang('en'); return false;">EN</a>
                    <a href="#" onclick="switchLang('pt'); return false;">PT</a>
                </div>
                <a href="${site.linkedin}" target="_blank" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.9rem;">
                    LinkedIn
                </a>
            </div>
        </header>

        <section class="hero lang-content active" data-lang="en">
            <h2>${i18n.en.greeting}</h2>
            <h1>${i18n.en.heroTitle} <span style="color:var(--primary)">${escapeHtml(cvEn.name)}</span>.</h1>
            <p class="role">${escapeHtml(cvEn.title)} • ${escapeHtml(cvEn.location)}</p>
            <p>${escapeHtml(cvEn.about)}</p>
            <div class="btn-group">
                <a href="${site.github}" target="_blank" class="btn btn-primary">
                    <i class="fa-brands fa-github"></i> ${i18n.en.viewProjects}
                </a>
                <a href="https://wa.me/55${site.phones[0].number}" class="btn btn-outline" target="_blank">
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
            <h1>${i18n.pt.heroTitle} <span style="color:var(--primary)">${escapeHtml(cvPt.name)}</span>.</h1>
            <p class="role">${escapeHtml(cvPt.title)} • ${escapeHtml(cvPt.location)}</p>
            <p>${escapeHtml(cvPt.about)}</p>
            <div class="btn-group">
                <a href="${site.github}" target="_blank" class="btn btn-primary">
                    <i class="fa-brands fa-github"></i> ${i18n.pt.viewProjects}
                </a>
                <a href="https://wa.me/55${site.phones[0].number}" class="btn btn-outline" target="_blank">
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
            <div class="grid">${renderExperienceCards(cvEn)}</div>
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.techJourney}</h2>
            <div class="grid">${renderExperienceCards(cvPt)}</div>
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.skillsTitle}</h2>
            ${renderSkillsGrid("en", cvEn)}
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.skillsTitle}</h2>
            ${renderSkillsGrid("pt", cvPt)}
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.techArsenal}</h2>
            <div class="tech-grid">${renderStack(cvEn)}</div>
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.techArsenal}</h2>
            <div class="tech-grid">${renderStack(cvPt)}</div>
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.projectsTitle}</h2>
            <div class="projects-grid">${renderProjectCards("en", cvEn)}</div>
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.projectsTitle}</h2>
            <div class="projects-grid">${renderProjectCards("pt", cvPt)}</div>
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.education}</h2>
            <div class="grid">${renderEducationCards(cvEn)}</div>
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.education}</h2>
            <div class="grid">${renderEducationCards(cvPt)}</div>
        </section>

        <section class="lang-content active" data-lang="en">
            <h2 class="section-title">${i18n.en.certifications}</h2>
            <div class="grid">${renderCertificationCards(cvEn)}</div>
        </section>

        <section class="lang-content" data-lang="pt">
            <h2 class="section-title">${i18n.pt.certifications}</h2>
            <div class="grid">${renderCertificationCards(cvPt)}</div>
        </section>

        <section>
            <h2 class="section-title lang-content active" data-lang="en">${i18n.en.languagesLabel}</h2>
            <h2 class="section-title lang-content" data-lang="pt">${i18n.pt.languagesLabel}</h2>
            <div class="skills-grid" style="grid-template-columns: 1fr;">
                <div class="skill-category">
                    <p class="lang-content active" data-lang="en">${escapeHtml(cvEn.languages)}</p>
                    <p class="lang-content" data-lang="pt">${escapeHtml(cvPt.languages)}</p>
                </div>
            </div>
        </section>

        <footer>
            <p class="lang-content active" data-lang="en">&copy; ${new Date().getFullYear()} ${escapeHtml(cvEn.name)}. ${i18n.en.allRights}</p>
            <p class="lang-content" data-lang="pt">&copy; ${new Date().getFullYear()} ${escapeHtml(cvPt.name)}. ${i18n.pt.allRights}</p>
        </footer>
    </div>

    <div class="contact-bar">
        <a href="https://wa.me/55${site.phones[0].number}" target="_blank" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="mailto:${site.email}" aria-label="Email"><i class="fa-solid fa-envelope"></i></a>
        <a href="${site.github}" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
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
    const result = await loadCvResult(lang);
    const { buffer, filename } = await buildResumePdf(lang, toPdfProfile(result.cv, site));
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
    cachePublicCv(res, [result.source]);
    res.send(buffer);
  } catch (err) {
    console.error('PDF generation failed:', err);
    if (!res.headersSent) {
      res.status(500).type('text/plain').send('Failed to generate resume PDF');
    }
  }
});

app.get('/resume', async (req, res) => {
  const [enResult, ptResult] = await Promise.all([loadCvResult('en'), loadCvResult('pt')]);
  const cvEn = enResult.cv;
  const cvPt = ptResult.cv;
  cachePublicCv(res, [enResult.source, ptResult.source]);
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(cvEn.name)} - Resume / Currículo</title>
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
        .job-meta { font-size: 14px; color: var(--muted); text-align: right; }
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
            <h1>${escapeHtml(cvEn.name)}</h1>
            <h2>${escapeHtml(cvEn.title)}</h2>
            <div class="contact">
                <span>${escapeHtml(cvEn.location)}</span>
                <span><a href="mailto:${site.email}">${site.email}</a></span>
                <span>+55 22 99784-7289</span>
                <span><a href="${site.github}" target="_blank">github.com/Caiolinooo</a></span>
                <span><a href="${site.hackerearth}" target="_blank">HackerEarth</a></span>
                <span><a href="${site.linkedin}" target="_blank">linkedin.com/in/caio-goulart</a></span>
            </div>
        </header>
        <div class="summary"><p>${escapeHtml(cvEn.about)}</p></div>
        <section>
            <h3>Skills</h3>
            <div class="skill-tags">${cvEn.stack.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div>
        </section>
        <section>
            <h3>Professional Experience</h3>
            ${renderResumeJobs(cvEn)}
        </section>
        <section>
            <h3>Education</h3>
            ${renderResumeEducation(cvEn)}
        </section>
        <section>
            <h3>Certifications</h3>
            ${renderResumeCertifications(cvEn)}
        </section>
        <section>
            <h3>Relevant Projects</h3>
            ${renderResumeProjects("en", cvEn)}
        </section>
        <section>
            <h3>Technical Skills</h3>
            ${renderSkillsGrid("en", cvEn)}
        </section>
        <section>
            <h3>Languages</h3>
            <div class="skills-grid" style="grid-template-columns: 1fr;"><div class="skill-category"><p>${escapeHtml(cvEn.languages)}</p></div></div>
        </section>
    </div>

    <div class="lang-pt">
        <header>
            <h1>${escapeHtml(cvPt.name)}</h1>
            <h2>${escapeHtml(cvPt.title)}</h2>
            <div class="contact">
                <span>${escapeHtml(cvPt.location)}</span>
                <span><a href="mailto:${site.email}">${site.email}</a></span>
                <span>+55 22 99784-7289</span>
                <span><a href="${site.github}" target="_blank">github.com/Caiolinooo</a></span>
                <span><a href="${site.hackerearth}" target="_blank">HackerEarth</a></span>
                <span><a href="${site.linkedin}" target="_blank">linkedin.com/in/caio-goulart</a></span>
            </div>
        </header>
        <div class="summary"><p>${escapeHtml(cvPt.about)}</p></div>
        <section>
            <h3>Competências</h3>
            <div class="skill-tags">${cvPt.stack.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div>
        </section>
        <section>
            <h3>Experiência Profissional</h3>
            ${renderResumeJobs(cvPt)}
        </section>
        <section>
            <h3>Formação Acadêmica</h3>
            ${renderResumeEducation(cvPt)}
        </section>
        <section>
            <h3>Certificações</h3>
            ${renderResumeCertifications(cvPt)}
        </section>
        <section>
            <h3>Projetos Relevantes</h3>
            ${renderResumeProjects("pt", cvPt)}
        </section>
        <section>
            <h3>Habilidades Técnicas</h3>
            ${renderSkillsGrid("pt", cvPt)}
        </section>
        <section>
            <h3>Idiomas</h3>
            <div class="skills-grid" style="grid-template-columns: 1fr;"><div class="skill-category"><p>${escapeHtml(cvPt.languages)}</p></div></div>
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
