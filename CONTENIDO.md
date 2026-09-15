# Especificación de contenido — Landing Page ClinicalSync

Fuente de verdad: el informe del equipo (repo `Informe`). Todo el copy de esta
landing debe poder rastrearse a un capítulo. Si una afirmación no está en el
informe, no va en la página.

## Regla general

ClinicalSync **no es un EHR ni una plataforma de interoperabilidad**. Es una
herramienta complementaria y ligera para unidades cardiovasculares, enfocada en
tres cosas: traspaso de turno estructurado con SBAR, registro rápido de signos
vitales y eventos clínicos, y trazabilidad verificable de cada acción.
(Capítulo II, 2.1.1 y 2.1.2.)

**Prohibido en la página:** certificaciones que no tenemos (HIPAA, ISO 27001,
SOC 2, HL7 FHIR certificado), nombres de hospitales presentados como clientes,
testimonios inventados, métricas de producto sin respaldo (SLA, uptime,
porcentajes de mejora), razón social inexistente ("ClinicalSync Inc."),
teléfonos y correos falsos.

---

## 1. Hero  → US-01, US-02

**Titular:** La información del turno no debería depender de la memoria de nadie.

**Bajada:** ClinicalSync estandariza el traspaso de turno con SBAR, permite
registrar signos vitales y eventos en segundos, y deja constancia de quién hizo
qué y cuándo. Diseñado para unidades cardiovasculares.

**Acciones:** [Solicitar demostración] (principal) · [Ver cómo funciona]
(secundaria, ancla a la sección 3)

**Panel lateral:** conservar la maqueta de interfaz del mock-up actual, pero
mostrando lo que el producto sí hace: lista de pacientes del turno, últimos
signos vitales, un traspaso SBAR con estado "Pendiente de confirmación", y un
registro con su responsable y hora. Sin métricas inventadas.

---

## 2. El problema  → Capítulo I, 1.2.1

**Antetítulo:** El desafío

**Titular:** Lo que se pierde entre un turno y el siguiente

**Texto:** En las unidades cardiovasculares la información del paciente se
reparte entre el sistema hospitalario, los monitores, las anotaciones en papel y
lo que se transmite verbalmente en el relevo. Esa dispersión genera doble
registro, demoras en la consulta y, sobre todo, omisiones en el momento más
sensible del proceso.

**Tres tarjetas:**

| Tarjeta | Contenido | Respaldo |
|---|---|---|
| Registro duplicado | El personal anota en papel durante la atención y transcribe al sistema al cierre del turno. | Entrevistas, Cap. II 2.2.2 |
| Pérdida en el relevo | La transmisión verbal sin formato deja fuera información que el turno entrante necesita. | Entrevistas y Event Storming, Cap. II 2.4 |
| Sin trazabilidad | No siempre es posible determinar quién registró un dato ni en qué momento. | Entrevistas, Cap. II 2.2.3 |

**Dato de cierre (este sí es real y es nuestro):** Según las entrevistas
realizadas al personal de enfermería cardiovascular, la documentación consume
cerca de una cuarta parte del turno.

**Contexto epidemiológico (citando fuente):** Las enfermedades cardiovasculares
son la primera causa de muerte en el Perú según el MINSA, y la ENDES 2024
reporta que el 14.2% de los peruanos mayores de 15 años padece hipertensión
arterial.

---

## 3. Cómo funciona  → EP-02, EP-03, EP-04

Cuatro pasos, con el mismo formato de tarjetas numeradas del mock-up:

1. **Recibe tu turno** — Consulta el traspaso del equipo saliente en formato SBAR y confirma su recepción.
2. **Registra durante la atención** — Signos vitales, medicación administrada y eventos clínicos, en pocos pasos y desde el dispositivo que tengas a mano.
3. **Ejecuta y confirma indicaciones** — Las indicaciones médicas vigentes quedan visibles, y su cumplimiento se registra con responsable y hora.
4. **Entrega sin omisiones** — El traspaso se arma con lo que ya registraste durante el turno.

---

## 4. Características  → Capítulo III

| Característica | Descripción | Historia |
|---|---|---|
| Traspaso SBAR estructurado | Formulario con las cuatro secciones obligatorias y confirmación de recepción. | US-13, US-15 |
| Registro de signos vitales | Captura rápida asociada al paciente, con fecha, hora y responsable. | US-18 |
| Eventos clínicos | Documentación de lo relevante del turno, con marca de criticidad. | US-20 |
| Indicaciones y cumplimiento | Ciclo completo entre lo que se indica y lo que se ejecuta. | US-22 a US-25 |
| Resumen clínico | Vista consolidada de la evolución reciente del paciente. | US-26, US-27 |
| Bitácora de auditoría | Historial consultable de acciones, responsables y horarios. | US-30 a US-32 |

---

## 5. Beneficios por perfil  → Capítulo I, 1.2.2 (User Outcomes)

**Personal de enfermería:** menos pasos para registrar, sin transcribir del papel
al sistema, y un relevo que no depende de recordarlo todo.

**Médicos especialistas:** el estado del paciente en una sola vista, sin reunir
datos de varias fuentes, y con certeza sobre el origen de cada dato.

**Institución:** trazabilidad completa de la atención y continuidad asistencial
entre turnos, sin reemplazar el sistema hospitalario existente.

---

## 6. Planes  → US-07

Mantener los tres niveles del mock-up (individual, centro médico, red
hospitalaria) porque el modelo SaaS por planes sí está en el informe (Cap. II,
2.1.1). Retirar del pie de esta sección: "Acuerdo BAA incluido" y
"99.99% Disponibilidad SLA".

> Nota: los precios son referenciales de un proyecto académico. Conviene
> indicarlo con una línea discreta bajo las tarjetas.

---

## 7. Preguntas frecuentes  → US-08

Reescribir las respuestas en términos de diseño, no de cumplimiento acreditado:

- **¿ClinicalSync reemplaza el sistema de mi institución?** No. Es una herramienta
  complementaria enfocada en el trabajo diario del turno cardiovascular.
- **¿Qué medidas de seguridad contempla?** El diseño considera autenticación por
  roles, registro de auditoría no modificable y control de acceso por turno.
  *(Describir lo que el diseño contempla, sin afirmar certificaciones.)*
- **¿Qué se necesita para usarlo?** Un navegador. Funciona en computadora, tablet
  y teléfono.
- **¿En qué se diferencia de un EHR?** En el alcance: el EHR guarda el historial
  institucional; ClinicalSync resuelve la continuidad del turno.

---

## 8. Equipo  → US-09

Los cinco integrantes con su rol en el proyecto. Reutilizar las fotos de
`Informe/assets/chapter-1/FotoEstudiante/`.

---

## 9. Contacto  → US-10

Formulario con nombre, institución, correo, mensaje y plan de interés.
Validación de campos obligatorios y confirmación de envío en pantalla.
Sin teléfono de soporte inventado.

---

## Pie de página

Nombre del producto, una línea descriptiva, enlaces a las secciones, enlace al
repositorio del proyecto en GitHub y la mención de que es un trabajo académico
del curso 1ASI0729 de la UPC. **Sin franja de certificaciones.**

---

## Requisitos transversales

- **Responsive** (US-12): el menú colapsa en móvil, las grillas pasan a una
  columna, sin desplazamiento horizontal en ningún ancho.
- **Idioma** (US-11): español e inglés, con la preferencia recordada.
- **Accesibilidad** (Cap. IV, 4.1.2): contraste suficiente, navegación por
  teclado, foco visible, `alt` en todas las imágenes.
- **SEO** (Cap. IV, 4.2.3): usar los meta tags ya especificados en esa sección.
- **Etiquetas de navegación** (Cap. IV, 4.2.5): Inicio, El problema, Cómo
  funciona, Características, Beneficios, Planes, Preguntas frecuentes, Equipo,
  Contacto.
- **Paleta** (Cap. IV, 4.1.1): navy #172554, verde esmeralda #10B981, gris
  #64748B, blanco #FFFFFF.
