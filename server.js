const express = require('express');
const app = express();
const PORT = 3000;

// Dados do Perfil (Extraídos do LinkedIn e GitHub)
const profile = {
  name: "Caio Valerio Goulart Correia",
  title: "Full-Stack Dev & Engenheiro DevOps",
  tagline: "Unindo Engenharia Mecânica, Automação e Software.",
  email: "caio.goulart@linkedin.com",
  linkedin: "https://www.linkedin.com/in/caio-goulart",
  github: "https://github.com/Caiolinooo",
  phones: [
    { number: "22997847289", label: "WhatsApp Principal" },
    { number: "22992180404", label: "WhatsApp Secundário" }
  ],
  location: "Rio das Ostras, RJ",
  about: "Com mais de 9 anos de experiência, sou um profissional híbrido que une o mundo físico ao digital. Atuo como System Analyst na ABZ Serviços, liderando automação de infraestrutura e sistemas críticos. Possuo sólida formação em Engenharia Mecânica e Automação.",
  stack: ["Node.js", "Python", "AWS", "TypeScript", "Unreal Engine", "Docker", "Linux", "CAD/CAM", "PostgreSQL", "Git"],
  experience: [
    {
      role: "System Analyst",
      company: "ABZ Serviços",
      period: "Mar 2025 - Presente",
      desc: "Lidero automação de infraestrutura e sistemas críticos. Reduzi 40% da carga manual do RH e migrei 80% da infraestrutura para nuvem com zero downtime."
    },
    {
      role: "Proprietário / Diretor",
      company: "SmartStore",
      period: "Mai 2021 - Presente",
      desc: "Gestão logística e atendimento ao cliente em escala."
    },
    {
      role: "Desenhista Técnico - II",
      company: "BRtech3D",
      period: "Mar 2024 - Mar 2025",
      desc: "Modelos em AutoCAD/Plant, nuvem de pontos (Leica Cyclone) e prototipagem em Unreal Engine."
    }
  ],
  education: [
    { school: "Centro Universitário UniFatece", course: "Engenharia Mecânica", date: "2024 - 2026" },
    { school: "ETP Escola Técnica", course: "Técnico em Automação Industrial", date: "2013 - 2015" }
  ]
};

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-br">
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
        .btn-group { display: flex; gap: 20px; }
        .btn { padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: 0.3s; display: inline-flex; align-items: center; gap: 10px; }
        .btn-primary { background: var(--primary); color: #000; border: 2px solid var(--primary); }
        .btn-primary:hover { background: transparent; color: var(--primary); box-shadow: 0 0 20px rgba(0, 242, 255, 0.4); }
        .btn-outline { background: transparent; border: 1px solid #333; color: #fff; }
        .btn-outline:hover { border-color: var(--primary); color: var(--primary); }
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
        .contact-bar { position: fixed; bottom: 30px; right: 30px; background: #000; padding: 15px 25px; border-radius: 50px; border: 1px solid var(--primary); box-shadow: 0 0 30px rgba(0, 242, 255, 0.2); z-index: 100; display: flex; gap: 20px; }
        .contact-bar a { color: #fff; font-size: 1.2rem; transition: 0.3s; }
        .contact-bar a:hover { color: var(--primary); transform: scale(1.2); }
        footer { text-align: center; padding: 50px 0; border-top: 1px solid #222; margin-top: 100px; color: var(--muted); }
        @media (max-width: 768px) { .hero h1 { font-size: 2.5rem; } .contact-bar { bottom: 20px; right: 50%; transform: translateX(50%); width: 90%; justify-content: center; } }
    </style>
</head>
<body>
    <div id="canvas-container"></div>

    <div class="container">
        <header>
            <div class="logo">&lt; ${profile.name.split(' ')[0]} /&gt;</div>
            <nav>
                <a href="${profile.linkedin}" target="_blank" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.9rem;">
                    LinkedIn
                </a>
            </nav>
        </header>

        <section class="hero">
            <h2>Olá, mundo.</h2>
            <h1>Eu sou <span style="color:var(--primary)">${profile.name}</span>.</h1>
            <p>${profile.about}</p>
            <div class="btn-group">
                <a href="${profile.github}" target="_blank" class="btn btn-primary">
                    <i class="fa-brands fa-github"></i> Ver Projetos
                </a>
                <a href="https://wa.me/55${profile.phones[0].number}" class="btn btn-outline" target="_blank">
                    <i class="fa-brands fa-whatsapp"></i> Falar Comigo
                </a>
            </div>
        </section>

        <section id="experience">
            <h2 class="section-title">Trajetória Técnica</h2>
            <div class="grid">
                ${profile.experience.map(job => `
                    <div class="card">
                        <div class="meta">${job.period} • ${job.company}</div>
                        <h3>${job.role}</h3>
                        <p>${job.desc}</p>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="stack">
            <h2 class="section-title">Arsenal Tecnológico</h2>
            <div class="tech-grid">
                ${profile.stack.map(tech => `
                    <div class="tech-item">
                        <i class="fa-solid fa-code" style="margin-right:8px; color:var(--primary)"></i> ${tech}
                    </div>
                `).join('')}
            </div>
        </section>
        
        <section id="education">
            <h2 class="section-title">Educação & Certificações</h2>
            <div class="grid">
                 ${profile.education.map(edu => `
                    <div class="card">
                        <h3>${edu.course}</h3>
                        <div class="meta">${edu.school}</div>
                        <p>${edu.date}</p>
                    </div>
                 `).join('')}
                 <div class="card" style="border-color: #ffd700;">
                    <h3>ChatGPT Expert <i class="fa-solid fa-certificate" style="color:#ffd700"></i></h3>
                    <div class="meta">Emi / Credenital ID 332515</div>
                    <p>Especialista em Prompt Engineering e automação com IA.</p>
                 </div>
            </div>
        </section>

        <footer>
            <p>&copy; ${new Date().getFullYear()} ${profile.name}. Todos os direitos reservados.</p>
        </footer>
    </div>

    <div class="contact-bar">
        <a href="https://wa.me/55${profile.phones[0].number}" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
        <a href="https://wa.me/55${profile.phones[1].number}" target="_blank"><i class="fa-solid fa-mobile-screen"></i></a>
    </div>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script>
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

// Linha corrigida: Sem barra invertida (\) antes do backtick
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
