const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const MARGIN = 48;
const PAGE_BOTTOM_GAP = 52;
const ACCENT = "#0366d6";
const MUTED = "#586069";
const TEXT = "#24292e";

function resolveFontFile(fileName) {
  const candidates = [
    path.join(__dirname, "fonts", fileName),
    path.join(__dirname, "api", "fonts", fileName),
    path.join(process.cwd(), "fonts", fileName),
    path.join(process.cwd(), "api", "fonts", fileName),
    path.join(__dirname, "..", "fonts", fileName)
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(`Font file not found: ${fileName}`);
}

function loadFont(fileName) {
  return fs.readFileSync(resolveFontFile(fileName));
}

function remainingHeight(doc) {
  return doc.page.height - PAGE_BOTTOM_GAP - doc.y;
}

function ensureSpace(doc, needed) {
  if (remainingHeight(doc) < needed) {
    doc.addPage();
  }
}

function writeResume(doc, lang, profile, fonts) {
  const isPT = lang === "pt";

  const sectionTitle = (title) => {
    ensureSpace(doc, 36);
    doc.moveDown(0.6);
    doc.font(fonts.bold).fontSize(11).fillColor(TEXT).text(title.toUpperCase(), { characterSpacing: 0.6 });
    const y = doc.y + 2;
    doc.moveTo(MARGIN, y).lineTo(doc.page.width - MARGIN, y).strokeColor("#eaecef").lineWidth(1).stroke();
    doc.moveDown(0.55);
  };

  const bodyText = (text, options = {}) => {
    doc.font(fonts.regular).fontSize(9.5).fillColor(TEXT).text(text, {
      align: "left",
      lineGap: 2,
      ...options
    });
  };

  doc.font(fonts.bold).fontSize(20).fillColor(TEXT).text(profile.name);
  doc.moveDown(0.15);
  doc.font(fonts.regular).fontSize(11).fillColor(MUTED).text(isPT ? profile.titlePT : profile.titleEN);
  doc.moveDown(0.25);

  const contact = [
    isPT ? profile.locationPT : profile.locationEN,
    profile.email,
    "+55 22 99784-7289",
    "github.com/Caiolinooo",
    "linkedin.com/in/caio-goulart"
  ].join("  |  ");
  doc.font(fonts.regular).fontSize(8.5).fillColor(ACCENT).text(contact, { lineGap: 1 });

  doc.moveDown(0.7);
  bodyText(isPT ? profile.aboutPT : profile.aboutEN, { align: "justify" });

  sectionTitle(isPT ? "Competências" : "Skills");
  bodyText(profile.stack.join("  ·  "));

  sectionTitle(isPT ? "Experiência Profissional" : "Professional Experience");
  profile.experience.forEach((job) => {
    const role = isPT ? job.rolePT : job.roleEN;
    const period = isPT ? job.periodPT : job.periodEN;
    const bullets = isPT ? job.bulletsPT : job.bulletsEN;
    ensureSpace(doc, 52);
    doc.font(fonts.bold).fontSize(10).fillColor(TEXT).text(role);
    doc.font(fonts.regular).fontSize(8.5).fillColor(MUTED).text(`${job.company}  ·  ${period}`);
    doc.moveDown(0.12);
    bullets.forEach((bullet) => {
      ensureSpace(doc, 22);
      doc.font(fonts.regular).fontSize(9).fillColor(TEXT).text(`•  ${bullet}`, {
        indent: 10,
        lineGap: 1.5
      });
    });
    doc.moveDown(0.35);
  });

  sectionTitle(isPT ? "Formação Acadêmica" : "Education");
  profile.education.forEach((item) => {
    ensureSpace(doc, 24);
    doc.font(fonts.bold).fontSize(10).fillColor(TEXT).text(isPT ? item.coursePT : item.courseEN);
    doc.font(fonts.regular).fontSize(8.5).fillColor(MUTED).text(item.school);
    doc.moveDown(0.2);
  });

  sectionTitle(isPT ? "Projetos Relevantes" : "Relevant Projects");
  profile.projects.forEach((project) => {
    ensureSpace(doc, 56);
    doc.font(fonts.bold).fontSize(10).fillColor(TEXT).text(project.name);
    doc.font(fonts.regular).fontSize(8).fillColor(MUTED).text(project.stack);
    doc.moveDown(0.08);
    bodyText(isPT ? project.descPT : project.descEN);
    if (project.url) {
      doc.font(fonts.regular).fontSize(8).fillColor(ACCENT).text(project.url, { link: project.url });
    }
    doc.moveDown(0.35);
  });

  sectionTitle(isPT ? "Habilidades Técnicas" : "Technical Skills");
  const skillBlocks = [
    { label: isPT ? "IA & LLMs" : "AI & LLM Engineering", value: isPT ? profile.skills.aiPT : profile.skills.aiEN },
    { label: isPT ? "Backend & APIs" : "Backend & APIs", value: isPT ? profile.skills.backendPT : profile.skills.backendEN },
    { label: isPT ? "Cloud & DevOps" : "Cloud & DevOps", value: isPT ? profile.skills.cloudPT : profile.skills.cloudEN },
    { label: isPT ? "Bancos de Dados" : "Databases", value: isPT ? profile.skills.dbPT : profile.skills.dbEN },
    { label: isPT ? "Governança, Segurança & Conformidade" : "Governance, Security & Compliance", value: isPT ? profile.skills.systemsPT : profile.skills.systemsEN }
  ];
  skillBlocks.forEach((block) => {
    ensureSpace(doc, 28);
    doc.font(fonts.bold).fontSize(9).fillColor(TEXT).text(block.label);
    bodyText(block.value);
    doc.moveDown(0.15);
  });

  sectionTitle(isPT ? "Idiomas" : "Languages");
  bodyText(isPT ? profile.languages.pt : profile.languages.en);
}

function buildResumePdf(lang, profile) {
  const isPT = lang === "pt";
  const filename = isPT
    ? "Caio_Valerio_Goulart_Correia_Curriculo.pdf"
    : "Caio_Valerio_Goulart_Correia_Resume.pdf";

  const fonts = {
    regular: loadFont("DejaVuSans.ttf"),
    bold: loadFont("DejaVuSans-Bold.ttf")
  };

  return new Promise((resolve, reject) => {
    const chunks = [];
    const doc = new PDFDocument({
      size: "A4",
      margin: MARGIN,
      font: fonts.regular,
      info: {
        Title: `${profile.name} - ${isPT ? "Curriculo" : "Resume"}`,
        Author: profile.name
      }
    });

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve({ buffer: Buffer.concat(chunks), filename }));
    doc.on("error", reject);

    try {
      writeResume(doc, lang, profile, fonts);
      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { buildResumePdf };
