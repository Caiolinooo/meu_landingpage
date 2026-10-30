const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { isValidCv, loadCv, loadCvResult, fallbackFor, normalizeCv, withFallbackSections } = require("./cv-source");

function validCv() {
  const cv = structuredClone(fallbackFor("en"));
  cv.name = "Remote Person";
  cv.experience[0].role = "Remote Role";
  return cv;
}

async function withFetch(fetchImpl, run) {
  const original = global.fetch;
  global.fetch = fetchImpl;
  try {
    return await run();
  } finally {
    global.fetch = original;
  }
}

async function main() {
  assert.equal(isValidCv(fallbackFor("pt")), true);
  assert.equal(isValidCv(fallbackFor("en")), true);
  assert.equal(isValidCv({}), false);
  assert.equal(isValidCv(null), false);
  assert.equal(fallbackFor("pt").experience.some((job) => job.company === "Master Serviços"), true);
  assert.equal(fallbackFor("en").experience.some((job) => job.role === "System Analyst"), true);
  assert.equal(fallbackFor("pt").experience.some((job) => /Topographical|Laser Master/.test(job.role + job.company)), false);

  const networkError = await withFetch(async () => {
    throw new Error("offline");
  }, () => loadCvResult("pt"));
  assert.equal(networkError.source, "fallback");
  assert.equal(networkError.cv.experience.some((job) => job.company === "ABZ SERVIÇOS LTDA"), true);

  const httpError = await withFetch(async () => ({ ok: false, status: 404, json: async () => ({}) }), () => loadCvResult("en"));
  assert.equal(httpError.source, "fallback");
  assert.equal(httpError.cv.name, fallbackFor("en").name);

  const invalidSchema = await withFetch(async () => ({
    ok: true,
    json: async () => ({ name: "Only a name" })
  }), () => loadCvResult("pt"));
  assert.equal(invalidSchema.source, "fallback");
  assert.equal(invalidSchema.cv.title, fallbackFor("pt").title);

  const remote = validCv();
  const accepted = await withFetch(async () => ({
    ok: true,
    json: async () => remote
  }), () => loadCvResult("en"));
  assert.equal(accepted.source, "remote");
  assert.equal(accepted.cv.name, "Remote Person");
  assert.equal(accepted.cv.experience[0].role, "Remote Role");

  const timedOut = await withFetch((_url, options) => new Promise((_resolve, reject) => {
    const signal = options.signal;
    const timer = setTimeout(() => reject(new Error("fetch ignored abort")), 7000);
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(signal.reason);
    });
  }), () => loadCvResult("en"));
  assert.equal(timedOut.source, "fallback");
  assert.equal(timedOut.cv.experience.some((job) => job.company === "SmartStore"), true);

  const pt = fallbackFor("pt");
  const en = fallbackFor("en");
  assert.equal(en.experience.some((job) => job.role === "Technical Drafter II"), true);
  const training = en.experience.find((job) => job.role === "Training Specialist");
  const trainingPt = pt.experience.find((job) => job.role === "Especialista em Treinamento");
  assert.deepEqual(trainingPt.bullets, [
    "Coordenou e ministrou treinamentos técnicos para mais de 500 profissionais em CLPs, hidráulica e automação industrial.",
    "Desenvolveu simulações educacionais e gerenciou vendas técnicas B2B, construindo relacionamento direto com fornecedores internacionais."
  ]);
  assert.deepEqual(training.bullets, [
    "Coordinated and delivered technical training for over 500 professionals in PLCs, hydraulics, and industrial automation.",
    "Developed educational simulations and managed B2B technical sales, building direct relationships with international suppliers."
  ]);
  const support = en.experience.find((job) => job.role === "Product Support");
  const supportPt = pt.experience.find((job) => job.role === "Suporte ao Produto");
  assert.equal(support.bullets.length, 3);
  assert.equal(supportPt.bullets.length, 3);
  assert.equal(en.experience.find((job) => job.role === "Automation Technician").bullets.length, 4);
  assert.equal(pt.experience.find((job) => job.role === "Técnico de Automação").bullets.length, 4);
  assert.equal(en.experience.find((job) => job.role === "Partner / Systems Analyst").bullets.length, 2);
  assert.equal(pt.experience.find((job) => job.role === "Sócio / Analista de Sistemas").bullets.length, 2);
  assert.equal(en.experience.find((job) => job.role === "Industrial Automation Technical Assistant").bullets.length, 2);
  assert.equal(pt.experience.find((job) => job.role === "Assistente Técnico de Automação Industrial").bullets.length, 2);
  assert.equal(en.experience.find((job) => job.role === "Owner / Director").bullets.length, 8);
  assert.equal(pt.experience.find((job) => job.role === "Proprietário / Diretor").bullets.length, 8);
  assert.deepEqual(en.experience.find((job) => job.role === "Technician").bullets, [
    "Started career supporting commercial processes, CRM management, and strict application of compliance procedures for diesel and gas systems maintenance."
  ]);
  assert.deepEqual(pt.experience.find((job) => job.role === "Técnico").bullets, [
    "Iniciou a carreira prestando suporte a processos comerciais, gestão de CRM e aplicação estrita de procedimentos de conformidade para manutenção de sistemas a diesel e gás."
  ]);
  assert.equal(en.experience.find((job) => job.role === "Python Developer").bullets[2].includes("seamless integration"), true);
  assert.equal(en.experience.find((job) => job.role === "Python Developer").bullets.join(" ").includes("perfect"), false);
  assert.equal(en.experience.find((job) => job.role === "Technical Team Lead").bullets[0], "Led field teams specialized in maintenance of large engines and turbines (CAT, Cummins, MAK).");
  const masterEn = en.experience.find((job) => job.company === "Master Serviços");
  const masterPt = pt.experience.find((job) => job.company === "Master Serviços");
  assert.equal(masterEn.role, "Laser Scanner Operator III");
  assert.equal(masterPt.role, "Operador de Laser Scanner III");
  assert.equal(masterEn.bullets.length, 5);
  assert.equal(masterPt.bullets.length, 5);
  const minimumBullets = {
    "System Analyst": 6,
    "Owner / Director": 8,
    "AI Specialist (Contract)": 5,
    "Technical Drafter II": 6,
    "Python Developer": 3,
    "Laser Scanner Operator III": 5,
    "Training Specialist": 2,
    "Technical Team Lead": 2,
    "Technician": 1
  };
  for (const [role, minimum] of Object.entries(minimumBullets)) {
    const job = en.experience.find((item) => item.role === role);
    assert.ok(job, role);
    assert.ok(job.bullets.length >= minimum, `${role} has ${job.bullets.length} bullets, minimum ${minimum}`);
  }
  assert.equal(pt.experience.find((job) => job.role === "Desenvolvedor Python").bullets.length, 3);
  assert.equal(pt.title.startsWith("AI Specialist - Desenvolvedor Full-Stack"), true);
  assert.equal(en.title.startsWith("AI Specialist - Full-Stack Developer"), true);
  assert.equal(pt.about.includes("PostgreSQL"), true);
  assert.equal(en.about.includes("PostgreSQL"), true);

  for (const lang of ["en", "pt"]) {
    const editor = JSON.parse(fs.readFileSync(path.join(__dirname, "test", "fixtures", `editor-cv.${lang}.json`), "utf8"));
    const snapshot = fallbackFor(lang);
    const completed = withFallbackSections(normalizeCv(editor), snapshot);
    assert.equal(isValidCv(completed), true, lang);
    assert.equal(completed.experience.length, snapshot.experience.length);
    completed.experience.forEach((job, index) => {
      const expected = snapshot.experience[index];
      assert.equal(job.role, expected.role);
      assert.equal(job.company, expected.company);
      assert.equal(job.period, expected.period);
      assert.equal(job.location || "", expected.location || "");
      assert.deepEqual(job.bullets, expected.bullets);
    });
    assert.deepEqual(completed.education, snapshot.education);
    assert.deepEqual(completed.certifications, snapshot.certifications);
    const total = completed.experience.reduce((sum, job) => sum + job.bullets.length, 0);
    assert.equal(total, 49);
  }

  const already = normalizeCv({
    experience: [{
      role: "Kept Role",
      company: "Kept Co",
      period: "Jan 2020 – Feb 2020",
      title: "Ignored",
      meta: "Other • Mar 2021 – Apr 2021 • Nowhere",
      bullets: ["keep me"]
    }]
  });
  assert.equal(already.experience[0].role, "Kept Role");
  assert.equal(already.experience[0].company, "Kept Co");
  assert.equal(already.experience[0].period, "Jan 2020 – Feb 2020");

  console.log("cv-source.test.js ok");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
