const fallbackPt = require("./data/cv.pt.json");
const fallbackEn = require("./data/cv.en.json");

const CV_ENDPOINT = process.env.CV_ENDPOINT || "https://cveditor.caiodev.app/api/cv";
const FETCH_TIMEOUT_MS = 5000;

const fallbacks = {
  pt: fallbackPt,
  en: fallbackEn
};

function isString(value) {
  return typeof value === "string";
}

function isNonEmptyString(value) {
  return isString(value) && value.trim().length > 0;
}

function isStringList(value, allowEmpty) {
  return Array.isArray(value) && (allowEmpty || value.length > 0) && value.every(isString);
}

function isOptionalString(value) {
  return value === undefined || isString(value);
}

function isValidJob(job) {
  if (!job || typeof job !== "object" || Array.isArray(job)) return false;
  return isNonEmptyString(job.role)
    && isNonEmptyString(job.company)
    && isNonEmptyString(job.period)
    && isOptionalString(job.location)
    && isStringList(job.bullets, true);
}

function isValidEducation(item) {
  if (!item || typeof item !== "object" || Array.isArray(item)) return false;
  return isNonEmptyString(item.course)
    && isNonEmptyString(item.school)
    && isOptionalString(item.period);
}

function isValidCertification(item) {
  if (!item || typeof item !== "object" || Array.isArray(item)) return false;
  return isNonEmptyString(item.name)
    && isNonEmptyString(item.issuer)
    && isNonEmptyString(item.date)
    && isOptionalString(item.credentialId);
}

function isValidProject(project) {
  if (!project || typeof project !== "object" || Array.isArray(project)) return false;
  return isNonEmptyString(project.name)
    && isNonEmptyString(project.stack)
    && isNonEmptyString(project.desc)
    && isOptionalString(project.url)
    && isOptionalString(project.demo);
}

function isValidSkills(skills) {
  if (!skills || typeof skills !== "object" || Array.isArray(skills)) return false;
  return ["ai", "backend", "cloud", "db", "systems"].every((key) => isNonEmptyString(skills[key]));
}

function isValidCv(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return false;
  return isNonEmptyString(data.name)
    && isNonEmptyString(data.title)
    && isNonEmptyString(data.location)
    && isNonEmptyString(data.about)
    && isStringList(data.stack, false)
    && Array.isArray(data.experience)
    && data.experience.length > 0
    && data.experience.every(isValidJob)
    && Array.isArray(data.education)
    && data.education.every(isValidEducation)
    && Array.isArray(data.certifications)
    && data.certifications.every(isValidCertification)
    && Array.isArray(data.projects)
    && data.projects.every(isValidProject)
    && isValidSkills(data.skills)
    && isNonEmptyString(data.languages);
}

function fallbackFor(lang) {
  const normalized = lang === "pt" ? "pt" : "en";
  const fallback = fallbacks[normalized];
  if (!isValidCv(fallback)) {
    throw new Error(`Invalid CV fallback for ${normalized}`);
  }
  return fallback;
}

function fallbackResult(lang) {
  return { cv: fallbackFor(lang), source: "fallback" };
}

function metaParts(meta) {
  if (!isString(meta)) return [];
  return meta.split(" • ").map((part) => part.trim()).filter((part) => part.length > 0);
}

function normalizeExperienceItem(job) {
  if (!job || typeof job !== "object" || Array.isArray(job)) return job;
  if (isNonEmptyString(job.role) && isNonEmptyString(job.company) && isNonEmptyString(job.period)) {
    return job;
  }
  const parts = metaParts(job.meta);
  const next = {
    role: isString(job.title) ? job.title : (job.role || ""),
    company: parts[0] || "",
    period: parts[1] || "",
    bullets: Array.isArray(job.bullets) ? job.bullets : []
  };
  if (parts[2]) next.location = parts[2];
  return next;
}

function normalizeEducationItem(item) {
  if (!item || typeof item !== "object" || Array.isArray(item)) return item;
  if (isNonEmptyString(item.course) && isNonEmptyString(item.school)) return item;
  const parts = metaParts(item.meta);
  const next = {
    course: isString(item.title) ? item.title : (item.course || ""),
    school: parts[0] || ""
  };
  if (parts[1]) next.period = parts[1];
  return next;
}

function normalizeCertificationItem(item) {
  if (!item || typeof item !== "object" || Array.isArray(item)) return item;
  if (isNonEmptyString(item.name) && isNonEmptyString(item.issuer) && isNonEmptyString(item.date)) {
    return item;
  }
  const parts = metaParts(item.meta);
  const next = {
    name: isString(item.title) ? item.title : (item.name || ""),
    issuer: parts[0] || "",
    date: parts[1] || ""
  };
  if (parts[2]) next.credentialId = parts[2].replace(/^ID\s+/i, "");
  return next;
}

function normalizeCv(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) return data;
  const cv = { ...data };
  if (!isNonEmptyString(cv.title) && isNonEmptyString(cv.headline)) cv.title = cv.headline;
  if (Array.isArray(cv.experience)) cv.experience = cv.experience.map(normalizeExperienceItem);
  if (Array.isArray(cv.education)) cv.education = cv.education.map(normalizeEducationItem);
  if (Array.isArray(cv.certifications)) cv.certifications = cv.certifications.map(normalizeCertificationItem);
  return cv;
}

function withFallbackSections(cv, fallback) {
  const next = { ...cv };
  for (const key of ["location", "about", "stack", "projects", "skills", "languages"]) {
    if (next[key] == null || next[key] === "") next[key] = fallback[key];
  }
  return next;
}

async function loadCvResult(lang) {
  const normalized = lang === "pt" ? "pt" : "en";
  const fallback = fallbackFor(normalized);
  try {
    const response = await fetch(`${CV_ENDPOINT}?lang=${normalized}`, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { accept: "application/json" }
    });
    if (!response.ok) return fallbackResult(normalized);
    const data = await response.json();
    const completed = withFallbackSections(normalizeCv(data), fallback);
    if (!isValidCv(completed)) return fallbackResult(normalized);
    return { cv: completed, source: "remote" };
  } catch {
    return fallbackResult(normalized);
  }
}

async function loadCv(lang) {
  const result = await loadCvResult(lang);
  return result.cv;
}

function toPdfProfile(cv, site) {
  return {
    name: cv.name,
    titleEN: cv.title,
    titlePT: cv.title,
    locationEN: cv.location,
    locationPT: cv.location,
    aboutEN: cv.about,
    aboutPT: cv.about,
    email: site.email,
    stack: cv.stack,
    experience: cv.experience.map((job) => ({
      roleEN: job.role,
      rolePT: job.role,
      company: job.company,
      locationEN: job.location || "",
      locationPT: job.location || "",
      periodEN: job.period,
      periodPT: job.period,
      bulletsEN: job.bullets,
      bulletsPT: job.bullets
    })),
    education: cv.education.map((item) => ({
      courseEN: item.course,
      coursePT: item.course,
      school: item.school,
      periodEN: item.period || "",
      periodPT: item.period || ""
    })),
    certifications: cv.certifications.map((item) => ({
      name: item.name,
      issuer: item.issuer,
      dateEN: item.date,
      datePT: item.date,
      credentialId: item.credentialId
    })),
    projects: cv.projects.map((project) => ({
      name: project.name,
      stack: project.stack,
      descEN: project.desc,
      descPT: project.desc,
      url: project.url,
      demo: project.demo
    })),
    skills: {
      aiEN: cv.skills.ai,
      aiPT: cv.skills.ai,
      backendEN: cv.skills.backend,
      backendPT: cv.skills.backend,
      cloudEN: cv.skills.cloud,
      cloudPT: cv.skills.cloud,
      dbEN: cv.skills.db,
      dbPT: cv.skills.db,
      systemsEN: cv.skills.systems,
      systemsPT: cv.skills.systems
    },
    languages: {
      en: cv.languages,
      pt: cv.languages
    }
  };
}

module.exports = {
  CV_ENDPOINT,
  FETCH_TIMEOUT_MS,
  isValidCv,
  loadCv,
  loadCvResult,
  fallbackFor,
  normalizeCv,
  withFallbackSections,
  toPdfProfile
};
