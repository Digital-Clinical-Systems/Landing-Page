/**
 * Simulacion de pasarela de pago.
 *
 * ALCANCE: este modulo NO procesa pagos ni se comunica con ninguna pasarela
 * real. Es una demostracion del recorrido comercial para el proyecto academico
 * de ClinicalSync. Los datos de tarjeta estan precargados con valores de prueba
 * y sus campos son de solo lectura, de modo que no es posible ingresar
 * informacion real. No se envia nada a ningun servidor.
 */

const PLANES = {
  servicio: { nombre: "Servicio", mensual: 299, anual: 239 },
  clinica: { nombre: "Clínica", mensual: 799, anual: 639 },
  red: { nombre: "Red hospitalaria", mensual: null, anual: null },
};

const APP_URL = "https://clinicalsync-frontend.vercel.app";

function periodoActivo() {
  const activo = document.querySelector('[data-billing-option][aria-pressed="true"]');
  return activo && activo.dataset.billingOption === "annual" ? "anual" : "mensual";
}

function formatearPrecio(valor) {
  return `S/ ${valor.toLocaleString("es-PE")}`;
}

function numeroDeOrden() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `SIM-${new Date().getFullYear()}-${n}`;
}

function initCheckout() {
  const dialogo = document.getElementById("checkout");
  if (!dialogo) return;

  const pasos = Array.from(dialogo.querySelectorAll("[data-paso]"));
  const resumenPlan = dialogo.querySelector("[data-resumen-plan]");
  const resumenPrecio = dialogo.querySelector("[data-resumen-precio]");
  const resumenPeriodo = dialogo.querySelector("[data-resumen-periodo]");
  const orden = dialogo.querySelector("[data-orden]");
  const enlaceApp = dialogo.querySelector("[data-app]");
  let ultimoFoco = null;

  enlaceApp.href = APP_URL;

  function mostrarPaso(n) {
    pasos.forEach((p) => {
      p.hidden = Number(p.dataset.paso) !== n;
    });
    const visible = pasos.find((p) => !p.hidden);
    const titulo = visible && visible.querySelector("h3, h4");
    if (titulo) titulo.focus();
  }

  function abrir(planId) {
    const plan = PLANES[planId];
    if (!plan) return;
    const periodo = periodoActivo();

    resumenPlan.textContent = plan.nombre;
    resumenPeriodo.textContent = periodo === "anual" ? "Facturación anual" : "Facturación mensual";
    resumenPrecio.textContent =
      plan[periodo] === null
        ? "Precio a convenir"
        : `${formatearPrecio(plan[periodo])} por mes`;

    ultimoFoco = document.activeElement;
    mostrarPaso(1);
    dialogo.showModal();
  }

  function cerrar() {
    dialogo.close();
    if (ultimoFoco) ultimoFoco.focus();
  }

  document.querySelectorAll("[data-plan]").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      e.preventDefault();
      abrir(boton.dataset.plan);
    });
  });

  dialogo.querySelectorAll("[data-ir]").forEach((boton) => {
    boton.addEventListener("click", () => {
      const destino = Number(boton.dataset.ir);
      if (destino === 3) orden.textContent = numeroDeOrden();
      mostrarPaso(destino);
    });
  });

  dialogo.querySelectorAll("[data-cerrar]").forEach((boton) => {
    boton.addEventListener("click", cerrar);
  });

  // clic fuera del contenido cierra el dialogo
  dialogo.addEventListener("click", (e) => {
    if (e.target === dialogo) cerrar();
  });
}

initCheckout();
