import { initI18n } from "./i18n.js";
import { initNav } from "./nav.js";

async function bootstrap() {
  await initI18n();
  initNav();
}

document.addEventListener("DOMContentLoaded", bootstrap);
