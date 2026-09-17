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

function initScrollReveal() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const sections = document.querySelectorAll("main > section");
  if (!("IntersectionObserver" in window) || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  sections.forEach((section) => {
    section.classList.add("reveal");
    observer.observe(section);
  });
}

async function bootstrap() {
  await initI18n();
  initNav();
  initPricingToggle();
  initContactForm();
  initScrollReveal();
}

document.addEventListener("DOMContentLoaded", bootstrap);
