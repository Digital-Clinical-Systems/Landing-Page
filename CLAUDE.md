# Landing Page — ClinicalSync

Sitio promocional de **ClinicalSync**, producto de la startup **Digital Clinical System**.
Trabajo del curso 1ASI0729 Desarrollo de Aplicaciones Open Source (UPC, ciclo 2026-20).

Informe del proyecto: https://github.com/Digital-Clinical-Systems/Informe

## Qué es el producto

ClinicalSync es una plataforma web **complementaria** para unidades cardiovasculares.
Resuelve tres cosas: traspaso de turno estructurado con SBAR, registro rápido de signos
vitales y eventos clínicos, y trazabilidad verificable de cada acción (quién, qué, cuándo).

**No es un EHR ni una plataforma de interoperabilidad.** No reemplaza el sistema
hospitalario. Cualquier copy que lo presente como un EHR completo, un bus HL7/FHIR, un
visor DICOM o un sistema de facturación contradice el informe y no va.

## Regla de contenido

El copy sale de `CONTENIDO.md`, que rastrea cada sección a un capítulo del informe.
Si una afirmación no está respaldada ahí, no entra a la página.

**Nunca publicar:** certificaciones que el proyecto no tiene (HIPAA, ISO 27001, SOC 2,
HL7 FHIR certificado), hospitales presentados como clientes, testimonios inventados,
métricas de producto sin respaldo (uptime, SLA, porcentajes de mejora), razón social
inexistente, ni teléfonos o correos de contacto falsos.

Los datos que sí se pueden usar, porque son del informe: las cifras de MINSA y ENDES 2024
sobre enfermedades cardiovasculares en Perú (citando fuente), y los hallazgos de las
entrevistas propias del equipo.

## Stack

HTML, CSS y JavaScript **sin frameworks ni build**. Es un requisito del curso.
Se despliega como estático en Vercel.

- Sin npm, sin bundler, sin preprocesadores.
- Sin librerías externas salvo fuentes de Google Fonts.
- JavaScript moderno (ES6+) en módulos, sin transpilar.

## Estructura

```
/
├── index.html
├── css/
│   ├── variables.css      # paleta, tipografía, espaciado
│   ├── base.css           # reset y estilos globales
│   ├── layout.css         # grid, contenedores, media queries
│   └── components.css     # tarjetas, botones, navegación, formulario
├── js/
│   ├── main.js            # arranque
│   ├── i18n.js            # cambio de idioma
│   ├── nav.js             # menú móvil y desplazamiento suave
│   └── form.js            # validación del formulario de contacto
├── i18n/
│   ├── es.json
│   └── en.json
├── assets/
│   └── img/
├── robots.txt
├── sitemap.xml
└── vercel.json
```

## Paleta y tipografía

Definidas en el Capítulo IV, sección 4.1.1 del informe. Van como variables CSS:

```css
--color-navy:    #172554;  /* autoridad clínica, fondos oscuros, texto principal */
--color-emerald: #10B981;  /* acciones principales, confirmaciones, acentos */
--color-slate:   #64748B;  /* texto secundario, elementos inactivos */
--color-white:   #FFFFFF;  /* fondos, contraste */
```

Tipografía sans-serif. Jerarquía estricta, espaciado consistente, iconografía minimalista.

## Internacionalización

Requisito del curso. Implementación en vanilla:

- Cada nodo traducible lleva `data-i18n="clave.anidada"`.
- Atributos traducibles usan `data-i18n-attr="placeholder:clave"`.
- `i18n/es.json` y `i18n/en.json` con la misma estructura de claves.
- `i18n.js` carga el JSON, recorre `[data-i18n]` y sustituye el contenido.
- La preferencia se guarda en `localStorage` y se aplica antes del primer render.
- `<html lang>` se actualiza al cambiar de idioma.
- **El español es el idioma por defecto.**

## Responsive

Requisito del curso. Enfoque mobile-first con tres puntos de quiebre:

| Punto de quiebre | Ancho | Comportamiento |
|---|---|---|
| Móvil | < 768px | Una columna, menú colapsado en icono |
| Tablet | 768–1023px | Dos columnas en grillas de tarjetas |
| Escritorio | ≥ 1024px | Diseño completo, hero partido en dos |

Regla dura: **ningún ancho debe producir desplazamiento horizontal.** Verificar en 320px,
que es el más angosto que se prueba.

## Accesibilidad

Comprometida en la sección 4.1.2 del informe:

- Contraste mínimo AA entre texto y fondo.
- Navegación completa por teclado, con foco visible que no dependa solo del color.
- HTML semántico: `header`, `nav`, `main`, `section`, `footer`.
- `alt` descriptivo en toda imagen.
- Un solo `<h1>`, jerarquía de encabezados sin saltos.
- Los estados nunca se comunican únicamente por color.

## SEO

Los meta tags están especificados en el Capítulo IV, sección 4.2.3 del informe:
title, description, keywords, canonical, Open Graph y Twitter Card. Incluir
`robots.txt` y `sitemap.xml`.

## Convención de commits

Conventional Commits, en inglés:

- `feat:` nueva sección o funcionalidad
- `fix:` corrección
- `style:` CSS y ajustes visuales
- `refactor:` reorganización sin cambio de comportamiento
- `docs:` documentación
- `chore:` configuración y tareas de mantenimiento

Un commit por sección o funcionalidad completada, no uno grande al final.

## Despliegue

Vercel, como sitio estático. No requiere comando de build ni directorio de salida:
el `index.html` está en la raíz. La URL pública resultante se usa en el informe,
en la sección 4.5 (Web Applications Prototyping) y en el Capítulo V.

## Orden de construcción sugerido

1. Estructura de carpetas, variables CSS y reset.
2. Barra de navegación con menú móvil.
3. Hero.
4. Sección del problema.
5. Cómo funciona.
6. Características.
7. Beneficios.
8. Planes.
9. Preguntas frecuentes.
10. Equipo.
11. Formulario de contacto.
12. Pie de página.
13. i18n sobre todo lo anterior.
14. Repaso de accesibilidad y responsive.
15. SEO, robots, sitemap y despliegue.
