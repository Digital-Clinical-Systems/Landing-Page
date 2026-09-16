import { initI18n } from "./i18n.js";
import { initNav } from "./nav.js";
import { initContactForm } from "./form.js";

function initPricingToggle() {
  const buttons = document.querySelectorAll(".billing-toggle__btn");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const billing = button.getAttribute("data-billing-option");

      buttons.forEach((btn) => {
        btn.setAttribute("aria-pressed", String(btn === button));
      });

      document.querySelectorAll("[data-billing]").forEach((el) => {
        el.hidden = el.getAttribute("data-billing") !== billing;
      });
    });
  });
}

async function bootstrap() {
  await initI18n();
  initNav();
  initPricingToggle();
  initContactForm();
}

document.addEventListener("DOMContentLoaded", bootstrap);
