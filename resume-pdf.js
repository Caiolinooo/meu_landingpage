const path = require("path");
const PDFDocument = require("pdfkit");

const FONT_REGULAR = path.join(__dirname, "fonts", "DejaVuSans.ttf");
const FONT_BOLD = path.join(__dirname, "fonts", "DejaVuSans-Bold.ttf");

const MARGIN = 48;
const PAGE_BOTTOM_GAP = 52;
const ACCENT = "#0366d6";
const MUTED = "#586069";
const TEXT = "#24292e";

function remainingHeight(doc) {
  return doc.page.height - PAGE_BOTTOM_GAP - doc.y;
}

function ensureSpace(doc, needed) {
  if (remainingHeight(doc) < needed) {
    doc.addPage();
  }
}

function sectionTitle(doc, title) {
  ensureSpace(doc, 36);
  doc.moveDown(0.6);
  doc.font(FONT_BOLD).fontSize(11).fillColor(TEXT).text(title.toUpperCase(), { characterSpacing: 0.6 });
  const y = doc.y + 2;
  doc.moveTo(MARGIN, y).lineTo(doc.page.width - MARGIN, y).strokeColor("#eaecef").lineWidth(1).stroke();
  doc.moveDown(0.55);
}

function bodyText(doc, text, options = {}) {
  doc.font(FONT_REGULAR).fontSize(9.5).fillColor(TEXT).text(text, {
    align: "left",
    lineGap: 2,
    ...options
  });
}

function pipeResumePdf(res, lang, profile) {
  const isPT = lang === "pt";
  const filename = isPT
    ? "Caio_Valerio_Goulart_Correia_Curriculo.pdf"
    : "Caio_Valerio_Goulart_Correia_Resume.pdf";

  const doc = new PDFDocument({
    size: "A4",
    margin: MARGIN,
    info: {
      Title: `${profile.name} - ${isPT ? "Curriculo" : "Resume"}`,
      Author: profile.name
    }
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  doc.on("error", (err) => {
    console.error(err);
    if (!res.headersSent) {
      res.status(500).end();
    }
  });
  doc.pipe(res);

  doc.registerFont("Regular", FONT_REGULAR);
  doc.registerFont("Bold", FONT_BOLD);

  doc.font("Bold").fontSize(20).fillColor(TEXT).text(profile.name);
  doc.moveDown(0.15);
  doc.font(FONT_REGULAR).fontSize(11).fillColor(MUTED).text(isPT ? profile.titlePT : profile.titleEN);
  doc.moveDown(0.25);

  const contact = [
    isPT ? profile.locationPT : profile.locationEN,
    profile.email,
    "+55 22 99784-7289",
    "github.com/Caiolinooo",
    "linkedin.com/in/caio-goulart"
  ].join("  |  ");
  doc.font(FONT_REGULAR).fontSize(8.5).fillColor(ACCENT).text(contact, { lineGap: 1 });

  doc.moveDown(0.7);
  bodyText(doc, isPT ? profile.aboutPT : profile.aboutEN, { align: "justify" });

  sectionTitle(doc, isPT ? "Competências" : "Skills");
  bodyText(doc, profile.stack.join("  ·  "));

  sectionTitle(doc, isPT ? "Experiência Profissional" : "Professional Experience");
  profile.experience.forEach((job) => {
    const role = isPT ? job.rolePT : job.roleEN;
    const period = isPT ? job.periodPT : job.periodEN;
    const bullets = isPT ? job.bulletsPT : job.bulletsEN;
    ensureSpace(doc, 52);
    doc.font(FONT_BOLD).fontSize(10).fillColor(TEXT).text(role);
    doc.font(FONT_REGULAR).fontSize(8.5).fillColor(MUTED).text(`${job.company}  ·  ${period}`);
    doc.moveDown(0.12);
    bullets.forEach((bullet) => {
      ensureSpace(doc, 22);
      doc.font(FONT_REGULAR).fontSize(9).fillColor(TEXT).text(`•  ${bullet}`, {
        indent: 10,
        lineGap: 1.5
      });
    });
    doc.moveDown(0.35);
  });

  sectionTitle(doc, isPT ? "Formação Acadêmica" : "Education");
  profile.education.forEach((item) => {
    ensureSpace(doc, 24);
    doc.font(FONT_BOLD).fontSize(10).fillColor(TEXT).text(isPT ? item.coursePT : item.courseEN);
    doc.font(FONT_REGULAR).fontSize(8.5).fillColor(MUTED).text(item.school);
    doc.moveDown(0.2);
  });

  sectionTitle(doc, isPT ? "Projetos Relevantes" : "Relevant Projects");
  profile.projects.forEach((project) => {
    ensureSpace(doc, 56);
    doc.font(FONT_BOLD).fontSize(10).fillColor(TEXT).text(project.name);
    doc.font(FONT_REGULAR).fontSize(8).fillColor(MUTED).text(project.stack);
    doc.moveDown(0.08);
    bodyText(doc, isPT ? project.descPT : project.descEN);
    if (project.url) {
      doc.font(FONT_REGULAR).fontSize(8).fillColor(ACCENT).text(project.url, { link: project.url });
    }
    doc.moveDown(0.35);
  });

  sectionTitle(doc, isPT ? "Habilidades Técnicas" : "Technical Skills");
  const skillBlocks = [
    { label: isPT ? "IA & LLMs" : "AI & LLM Engineering", value: isPT ? profile.skills.aiPT : profile.skills.aiEN },
    { label: isPT ? "Engenharia de Dados & Backend" : "Data Engineering & Backend", value: isPT ? profile.skills.backendPT : profile.skills.backendEN },
    { label: isPT ? "Cloud & DevOps" : "Cloud & DevOps", value: isPT ? profile.skills.cloudPT : profile.skills.cloudEN },
    { label: isPT ? "Bancos de Dados & BI" : "Databases & BI", value: isPT ? profile.skills.dbPT : profile.skills.dbEN },
    { label: isPT ? "Governança, Segurança & Conformidade" : "Governance, Security & Compliance", value: isPT ? profile.skills.systemsPT : profile.skills.systemsEN }
  ];
  skillBlocks.forEach((block) => {
    ensureSpace(doc, 28);
    doc.font(FONT_BOLD).fontSize(9).fillColor(TEXT).text(block.label);
    bodyText(doc, block.value);
    doc.moveDown(0.15);
  });

  sectionTitle(doc, isPT ? "Idiomas" : "Languages");
  bodyText(doc, isPT ? profile.languages.pt : profile.languages.en);

  doc.end();
}

module.exports = { pipeResumePdf };
