# Biblioteca Palafoxiana — Rediseño conceptual

> ⚠️ **Proyecto educativo de portafolio.** Sin afiliación, patrocinio ni autorización de la Biblioteca Palafoxiana, del Gobierno del Estado de Puebla, ni de UNESCO.

---

## Capturas

### Sitio original
<!-- Sustituye por tu captura del sitio oficial -->
![Sitio original](screenshot-original.png)

### Rediseño
<!-- Sustituye por tu captura del rediseño -->
![Rediseño](screenshot-rework.png)

---

## Links

| Recurso | URL |
|---|---|
| **Live demo (rediseño)** | [https://abarriuso.github.io/palafoxiana-redesign/](https://abarriuso.github.io/palafoxiana-redesign/) |
| **Sitio oficial** | [http://www.palafoxiana.com](http://www.palafoxiana.com) |

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| **HTML** | HTML5 semántico, ARIA roles, `lang` dinámico |
| **CSS** | Vanilla CSS3 — 0 dependencias, 0 frameworks |
| **JavaScript** | Vanilla ES6+ — sin build step, sin bundler |
| **Fonts** | Lora, DM Sans, Prata — self-hosted (woff2, sin requests a Google Fonts) |
| **Smooth scroll** | [Lenis 1.1.18](https://github.com/darkroomengineering/lenis) — servido localmente desde `vendor/` |
| **Imágenes** | Optimizadas con Sharp (WebP/JPEG) — 5 MB total en 33 archivos |

---

## Features

### UI/UX
- **Tema claro/oscuro** — toggle en header, persistencia en `localStorage`, respeta `prefers-color-scheme`
- **i18n ES/EN** — switch de idioma en header, traducciones completas para todo el contenido
- **Galería lightbox** — 20 imágenes con navegación (teclado, swipe táctil, flechas)
- **Scroll animado** — secciones con fade-in al hacer scroll (IntersectionObserver)
- **Contadores animados** — números de estadísticas con animación ease-out-cubic
- **Menú responsive** — hamburger en móvil, dropdowns en desktop
- **Formulario de contacto** — validación HTML5, honeypot anti-spam, feedback visual (demo sin backend)

### Performance
- **Imágenes optimizadas** — de 246 MB a 5 MB (98% de reducción) con Sharp
- **CLS eliminado** — `width`/`height` en las 33 imágenes del proyecto
- **LCP optimizado** — hero image precargada con `<link rel="preload">` + `fetchpriority="high"`
- **Lazy loading** — todas las imágenes below-fold con `loading="lazy"`
- **CSS async** — stylesheet cargado de forma no bloqueante
- **Fonts self-hosted** — 9 archivos woff2 locales, 0 requests externos
- **Lenis optimizado** — requestAnimationFrame loop se detiene cuando no hay scroll
- **CSS contain** — secciones, cards y galería con `contain` para limitar reflow/repaint
- **DOM cacheado** — queries de traducciones cacheados para cambios de idioma más rápidos

### Accesibilidad
- Skip link al contenido principal
- Roles ARIA (`banner`, `main`, `contentinfo`, `dialog`)
- `aria-label`, `aria-expanded`, `aria-hidden` en interactivos
- Focus trap en lightbox
- Respeto a `prefers-reduced-motion`
- Alt text descriptivo en todas las imágenes

---

## Rendimiento

| Métrica | Valor |
|---|---|
| **Tamaño total** | ~5 MB (33 imágenes optimizadas + 9 fuentes woff2) |
| **Imágenes** | 5 MB (antes: 246 MB — reducción del 98%) |
| **Fuentes** | ~860 KB self-hosted (0 requests externos) |
| **CSS** | ~45 KB (carga async, no render-blocking) |
| **JS** | ~25 KB vanilla (sin dependencias npm) |
| **CLS** | 0 (todas las imágenes con dimensiones explícitas) |
| **LCP** | Hero image precargada con fetchpriority="high" |

---

## Estructura del proyecto

```
/
├── assets/              33 imágenes optimizadas (WebP + JPEG)
│   ├── MG_*.jpg         Galería de la biblioteca (20 fotos)
│   ├── logo.jpg         Logotipo institucional
│   ├── puerta_hq.jpg    Puerta histórica (hero)
│   └── ...              Incunables, retratos, interiores
├── fonts/               9 fuentes woff2 self-hosted
│   ├── Lora-*.woff2     Serif para cuerpo de texto
│   ├── DM-Sans-*.woff2  Sans-serif para UI y navegación
│   ├── Prata-*.woff2    Display para títulos
│   └── fonts.css        @font-face declarations
├── vendor/
│   └── lenis.min.js     Smooth scroll library
├── index.html           HTML semántico con ARIA
├── styles.css           ~2,400 líneas de CSS vanilla
├── script.js            ~900 líneas de JavaScript vanilla
├── favicon.ico          Favicon generado desde el logo
├── LICENSE              MIT
├── NOTICE               Attribution de imágenes (CC BY-SA / dominio público)
└── README.md            Este archivo
```

---

## Ejecutar localmente

```bash
python3 -m http.server 8080
```

Y abrir <http://localhost:8080>.

---

## Licencia

- **Código**: MIT — ver [`LICENSE`](LICENSE)
- **Imágenes**: CC BY-SA / dominio público — ver [`NOTICE`](NOTICE) para attribution de cada archivo

## Aviso legal

- Fan project / ejercicio académico, sin afiliación.
- No representa ni sustituye al sitio oficial.
- Para información oficial: **<http://www.palafoxiana.com>**
