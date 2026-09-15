const STORAGE_KEY = "cs-lang";
const DEFAULT_LANG = "es";
const SUPPORTED_LANGS = ["es", "en"];

let currentLang = DEFAULT_LANG;
let translations = {};

function getStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGS.includes(stored) ? stored : null;
  } catch {
    return null;
  }
}

function setStoredLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* localStorage no disponible; se continúa sin persistir la preferencia */
  }
}

function getValueByPath(obj, path) {
  return path
    .split(".")
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

async function loadTranslations(lang) {
  const response = await fetch(`i18n/${lang}.json`);
  if (!response.ok) {
    throw new Error(`No se pudo cargar i18n/${lang}.json`);
  }
  return response.json();
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = getValueByPath(translations, el.getAttribute("data-i18n"));
    if (value !== undefined) {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.getAttribute("data-i18n-attr")
      .split(";")
      .forEach((pair) => {
        const [attr, key] = pair.split(":").map((part) => part.trim());
        if (!attr || !key) return;
        const value = getValueByPath(translations, key);
        if (value !== undefined) {
          el.setAttribute(attr, value);
        }
      });
  });

  document.documentElement.lang = currentLang;
  document.documentElement.setAttribute("data-i18n-ready", "true");
}

function updateLangSwitchUI() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === currentLang));
  });
}

export async function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
  translations = await loadTranslations(lang);
  currentLang = lang;
  setStoredLang(lang);
  applyTranslations();
  updateLangSwitchUI();
}

export async function initI18n() {
  currentLang = getStoredLang() || DEFAULT_LANG;
  translations = await loadTranslations(currentLang);
  applyTranslations();
  updateLangSwitchUI();

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.getAttribute("data-lang")));
  });
}
