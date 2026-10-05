/**
 * Checkout de demostracion de ClinicalSync.
 *
 * ALCANCE: no procesa pagos ni se comunica con ninguna pasarela. Los medios de
 * pago son tarjetas de prueba del estandar de la industria, seleccionables de
 * una lista cerrada: no existe entrada libre de datos de tarjeta ni atributos
 * de autocompletado de tarjeta. Nada se envia a ningun servidor.
 */

const PLANES = [
  {
    id: "servicio",
    nombre: "Servicio",
    desc: "Para una unidad o servicio cardiovascular.",
    mensual: 299,
    anual: 239,
    beneficios: ["Hasta 15 profesionales", "Traspaso SBAR y registro clínico", "Bitácora de trazabilidad"],
  },
  {
    id: "clinica",
    nombre: "Clínica",
    desc: "Para clínicas y centros con varias unidades.",
    mensual: 799,
    anual: 639,
    beneficios: ["Profesionales ilimitados", "Resumen clínico y alertas", "Reportes de auditoría"],
    recomendado: true,
  },
];

const IGV = 0.18;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
const soles = (v) =>
  `S/ ${v.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const estado = {
  planId: "clinica",
  periodo: "mensual",
  cliente: {},
  cuotas: "1",
  maxPaso: 1,
};

/* ---------- Paso 1: planes ---------- */

function pintarPlanes() {
  const cont = $("[data-planes]");
  cont.innerHTML = "";
  PLANES.forEach((p) => {
    const precio = p[estado.periodo];
    const b = document.createElement("button");
    b.type = "button";
    b.className = "co-plan" + (p.id === estado.planId ? " is-elegido" : "");
    b.setAttribute("role", "radio");
    b.setAttribute("aria-checked", String(p.id === estado.planId));
    b.innerHTML = `
      ${p.recomendado ? '<span class="co-plan__badge">Recomendado</span>' : ""}
      <span class="co-plan__nombre">${p.nombre}</span>
      <span class="co-plan__desc">${p.desc}</span>
      <span class="co-plan__precio">${soles(precio)}<span>por mes</span></span>
      <ul class="co-plan__lista">${p.beneficios.map((x) => `<li>${x}</li>`).join("")}</ul>`;
    b.addEventListener("click", () => {
      estado.planId = p.id;
      pintarPlanes();
      sincronizar();
    });
    cont.appendChild(b);
  });
}

/* ---------- Calculos ---------- */

const planActual = () => PLANES.find((p) => p.id === estado.planId);

function totales() {
  const base = planActual()[estado.periodo];
  const igv = base * IGV;
  return { base, igv, total: base + igv };
}

function sincronizar() {
  const p = planActual();
  const { base, igv, total } = totales();
  const periodoTxt = estado.periodo === "anual" ? "Facturación anual" : "Facturación mensual";

  $("[data-mini-plan]").textContent = p.nombre;
  $("[data-mini-periodo]").textContent = periodoTxt;

  $("[data-det-nombre]").textContent = `Plan ${p.nombre}`;
  $("[data-det-desc]").textContent = p.desc;
  $("[data-det-beneficios]").innerHTML = p.beneficios.map((x) => `<li>${x}</li>`).join("");

  $("[data-tk-plan]").textContent = p.nombre;
  $("[data-tk-periodo]").textContent = periodoTxt;
  $("[data-tk-precio]").textContent = soles(base);
  $("[data-tk-igv]").textContent = soles(igv);
  $("[data-tk-total]").textContent = soles(total);
  $("[data-btn-total]").textContent = soles(total);
}

/* ---------- Navegacion entre pasos ---------- */

function irA(n) {
  estado.maxPaso = Math.max(estado.maxPaso, n);
  $$("[data-panel]").forEach((s) => (s.hidden = Number(s.dataset.panel) !== n));
  $$("[data-panel]").forEach((s) => s.classList.toggle("is-activo", Number(s.dataset.panel) === n));
  $$("[data-paso-btn]").forEach((b) => {
    const i = Number(b.dataset.pasoBtn);
    b.classList.toggle("is-activo", i === n);
    b.classList.toggle("is-hecho", i < n);
    b.disabled = i > estado.maxPaso;
  });
  const t = $(`[data-panel="${n}"] .co-panel__titulo`);
  if (t) t.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Paso 3: validacion de los datos de la institucion ---------- */

const REGLAS = {
  institucion: (v) => (v.trim().length >= 3 ? "" : "Indica el nombre de la institución."),
  ruc: (v) => (/^\d{11}$/.test(v.trim()) ? "" : "El RUC debe tener 11 dígitos."),
  contacto: (v) => (v.trim().length >= 3 ? "" : "Indica el nombre del responsable."),
  correo: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Correo no válido."),
  telefono: (v) => (/^\d{9}$/.test(v.trim()) ? "" : "El teléfono debe tener 9 dígitos."),
  unidad: (v) => (v.trim().length >= 3 ? "" : "Indica la unidad donde se implementará."),
};

function validarCliente() {
  const form = $("#co-form-cliente");
  let ok = true;
  let primerError = null;

  Object.entries(REGLAS).forEach(([campo, regla]) => {
    const input = form.elements[campo];
    const msg = regla(input.value);
    $(`[data-error="${campo}"]`).textContent = msg;
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    input.classList.toggle("is-invalido", Boolean(msg));
    if (msg) {
      ok = false;
      if (!primerError) primerError = input;
    } else {
      estado.cliente[campo] = input.value.trim();
    }
  });

  if (!ok) {
    primerError.focus();
    return;
  }
  $("[data-tj-titular]").textContent = estado.cliente.institucion.toUpperCase().slice(0, 24);
  irA(4);
}

/* ---------- Paso 4: pago simulado ---------- */

function sincronizarTarjeta() {
  const o = $("#co-tarjeta").selectedOptions[0];
  $("[data-tj-num]").textContent = o.dataset.num;
  $("[data-tj-marca]").textContent = o.dataset.marca;
  $("[data-pago-error]").hidden = true;
}

function pagar() {
  const err = $("[data-pago-error]");
  // La tarjeta sin fondos existe para demostrar el manejo del pago rechazado.
  if ($("#co-tarjeta").value === "sin-fondos") {
    err.textContent = "La operación fue rechazada por el emisor (fondos insuficientes). Elige otro medio de pago.";
    err.hidden = false;
    err.focus();
    return;
  }
  const { total } = totales();
  const cuotas = $("#co-cuotas").value;
  const p = planActual();

  $("[data-cf-plan]").textContent = `Plan ${p.nombre}`;
  $("[data-cf-monto]").textContent =
    cuotas === "1" ? soles(total) : `${soles(total / Number(cuotas))} x ${cuotas} cuotas`;
  $("[data-cf-orden]").textContent = `CS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  $("[data-cf-institucion]").textContent = estado.cliente.institucion;
  $("[data-cf-cuotas]").textContent = cuotas === "1" ? "Sin cuotas" : `${cuotas} cuotas`;
  $("[data-cf-correo]").textContent = estado.cliente.correo;
  irA(5);
}

/* ---------- Arranque ---------- */

function init() {
  const params = new URLSearchParams(location.search);
  const plan = params.get("plan");
  if (PLANES.some((p) => p.id === plan)) estado.planId = plan;

  pintarPlanes();
  sincronizar();
  irA(1);

  $$("[data-periodo]").forEach((b) =>
    b.addEventListener("click", () => {
      estado.periodo = b.dataset.periodo;
      $$("[data-periodo]").forEach((x) =>
        x.setAttribute("aria-pressed", String(x === b)),
      );
      pintarPlanes();
      sincronizar();
    }),
  );

  $$("[data-ir]").forEach((b) => b.addEventListener("click", () => irA(Number(b.dataset.ir))));
  $$("[data-paso-btn]").forEach((b) =>
    b.addEventListener("click", () => irA(Number(b.dataset.pasoBtn))),
  );
  $("[data-validar-cliente]").addEventListener("click", validarCliente);
  $("#co-tarjeta").addEventListener("change", sincronizarTarjeta);
  $("[data-pagar]").addEventListener("click", pagar);
}

document.addEventListener("DOMContentLoaded", init);
