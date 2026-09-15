export function initNav() {
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!header || !toggle || !nav) return;

  function openMenu() {
    nav.classList.add("is-open");
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  function isMenuOpen() {
    return nav.classList.contains("is-open");
  }

  toggle.addEventListener("click", () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!isMenuOpen()) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  const desktopQuery = window.matchMedia("(min-width: 1024px)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });

  initSmoothScroll(header);
}

function initSmoothScroll(header) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}
