# Biblioteca Palafoxiana

*Rediseño conceptual de la primera biblioteca pública de América*

[Demo en vivo](https://abarriuso.github.io/palafoxiana-redesign/) · [Sitio oficial](http://www.palafoxiana.com) · [Licencia MIT](LICENSE)

---

> **Proyecto educativo de portafolio.** Sin afiliación, patrocinio ni autorización de la Biblioteca Palafoxiana, del Gobierno del Estado de Puebla, ni de UNESCO.

---

## Capturas

| Original | Rediseño |
|:---:|:---:|
| ![Original](screenshot-original.png) | ![Rediseño](screenshot-rework.png) |

---

## Stack

```
HTML5 semántico + ARIA    ·    CSS3 vanilla (0 dependencias)    ·    JavaScript vanilla (0 bundlers)
```

| Componente | Tecnología | Detalle |
|---|---|---|
| **Fuentes** | Lora · DM Sans · Prata | Self-hosted woff2 — 0 requests a Google Fonts |
| **Smooth scroll** | [Lenis 1.1.18](https://github.com/darkroomengineering/lenis) | Servido localmente desde `vendor/` |
| **Imágenes** | Sharp (WebP + JPEG) | 33 archivos, 5 MB total optimizados |
| **Build** | Ninguno | Sin npm, sin webpack, sin build step |

---

## Features

<details>
<summary><strong>UI / UX</strong></summary>

- Tema claro / oscuro — persistencia en `localStorage`, respeta `prefers-color-scheme`
- i18n ES / EN — traducciones completas con switch en header
- Galería lightbox — 20 fotos, navegación por teclado, swipe táctil y flechas
- Scroll animado — fade-in con IntersectionObserver
- Contadores animados — ease-out-cubic en las estadísticas
- Menú responsive — hamburger en móvil, dropdowns en desktop
- Formulario — validación HTML5, honeypot anti-spam, feedback visual

</details>

<details>
<summary><strong>Performance</strong></summary>

| Métrica | Antes | Después |
|---|---|---|
| Imágenes | 246 MB | **5 MB** (-98%) |
| CLS | Sin dimensiones | **0** (width/height en todas) |
| LCP | Sin preload | **Hero precargada** + fetchpriority |
| Fonts | Google Fonts CDN | **Self-hosted** woff2 |
| CSS | Render-blocking | **Async loading** |
| Lenis rAF | Loop infinito | **Se detiene** cuando no hay scroll |

</details>

<details>
<summary><strong>Accesibilidad</strong></summary>

- Skip link al contenido principal
- Roles ARIA (`banner`, `main`, `contentinfo`, `dialog`)
- `aria-label`, `aria-expanded`, `aria-hidden` en interactivos
- Focus trap en lightbox
- Respeto a `prefers-reduced-motion`
- Alt text descriptivo en todas las imágenes

</details>

---

## Estructura

```
├── assets/            33 imágenes optimizadas (WebP + JPEG)
│   ├── MG_*.jpg       Galería de la biblioteca (20 fotos)
│   ├── logo.jpg       Logotipo institucional
│   └── ...            Incunables, retratos, interiores
├── fonts/             9 fuentes woff2 self-hosted
├── vendor/
│   └── lenis.min.js   Smooth scroll library
├── index.html         HTML semántico + ARIA
├── styles.css         ~2,400 líneas CSS vanilla
├── script.js          ~900 líneas JS vanilla
├── favicon.ico        Generado desde el logo
├── LICENSE            MIT
└── NOTICE             Attribution de imágenes
```

---

## Ejecutar localmente

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

---

## Licencia

| Archivo | Licencia |
|---|---|
| Código (HTML, CSS, JS) | [MIT](LICENSE) |
| Imágenes | CC BY-SA / Dominio público — ver [NOTICE](NOTICE) |

---

<div align="center">

**Para información oficial, eventos, catálogo o solicitudes formales:**
[palafoxiana.com](http://www.palafoxiana.com) — 5 Oriente 5, 2º piso, Centro, Puebla, México

</div>
