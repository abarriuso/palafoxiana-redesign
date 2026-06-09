# Biblioteca Palafoxiana — rediseño conceptual (no oficial)

> ⚠️ **Proyecto educativo de portafolio.** Sin afiliación, patrocinio ni autorización de la Biblioteca Palafoxiana, del Gobierno del Estado de Puebla, ni de UNESCO. Este repositorio **no** es una fuente oficial.

Rediseño conceptual del sitio web de la **Biblioteca Palafoxiana** (Puebla, México) — la primera biblioteca pública de América (1646), Patrimonio de la Humanidad UNESCO · Memoria del Mundo (2005).

**Sitio oficial:** <http://www.palafoxiana.com>

Para horarios reales, visitas, catálogo o cualquier consulta institucional, dirígete siempre al sitio oficial o a los teléfonos publicados ahí.

---

## Material visual: todo bajo licencia abierta

Esta demo se distribuye con todas las imágenes incluidas. Ninguna proviene del sitio oficial: todas son material de licencia abierta tomado de **Wikimedia Commons**, ya sea **dominio público** (obras pre-1700) o **Creative Commons** (CC BY / CC BY-SA). El detalle completo de cada archivo, su autor y su licencia está en [`NOTICE`](NOTICE).

Resumen:

| Tipo | Origen | Licencia |
|---|---|---|
| Fotografías de la sala, fachada, puerta, rueda de libros (`MG_*.jpg`, `puerta_hq.jpg`, `frenteinterior*.jpg`, `interior_1.webp`) | Wikimedia Commons — categoría *Biblioteca Palafoxiana* | CC BY-SA 4.0 (algunas CC BY 2.0) |
| Retrato de Juan de Palafox (`grabdo-palafox*.jpg`) | Diego de Borgraf, c. 1640 · Wikimedia Commons | Dominio público |
| Reproducciones de incunables y libros impresos (`liber_chronicarum`, `vesalius_fabrica`, `quijote_1605`, `erasmo_locura`, `codex_mendoza`, `libros*`, `palafox_libro_18`) | Wikimedia Commons | Dominio público (obras pre-1700) |
| Logotipo (`logo.jpg`) | Marca institucional de la Biblioteca Palafoxiana — *placeholder*; sustituye por uno propio si publicas un fork | Marca de su titular |

> Si reutilizas la demo como base para otro proyecto, recuerda **respetar la atribución CC BY-SA** de las fotos de la sala y **sustituir el `logo.jpg`** por una marca propia.

## Datos y textos editoriales

Los textos descriptivos de la historia de la biblioteca y las 8 obras emblemáticas del "Acervo" están redactados a partir de información de dominio público y del propio sitio oficial (<http://www.palafoxiana.com/acervo/>). Pueden estar resumidos o adaptados con fines didácticos. **Si eres titular de alguno de estos contenidos y prefieres que retire algo, abre un issue y lo elimino de inmediato.**

## Lo que es mío en este repositorio

El código (HTML, CSS, JavaScript) y esta documentación, bajo **licencia MIT** — ver [`LICENSE`](LICENSE). El MIT cubre **solo el código**: el material visual sigue las licencias de cada archivo (CC BY-SA, CC BY o dominio público, según el caso). Ver [`NOTICE`](NOTICE) para el detalle de los activos de terceros.

## Tecnología

- HTML5, CSS3 (sin frameworks), JavaScript vanilla — sin build step ni dependencias `npm`.
- Fuentes: **Lora**, **DM Sans** y **Prata** vía Google Fonts.
- Smooth scroll con [Lenis 1.1.18](https://github.com/darkroomengineering/lenis) servido localmente desde `vendor/lenis.min.js` (sin dependencias de CDN externos).
- Tema claro/oscuro con persistencia en `localStorage` y respeto a `prefers-color-scheme` y `prefers-reduced-motion`.
- i18n ES/EN con switch en el header y persistencia en `localStorage`.

## Ejecutar localmente

Los `assets/` ya están en el repositorio. Solo hace falta un servidor estático:

```bash
python3 -m http.server 8080
```

Y abrir <http://localhost:8080>.

## Estado y limitaciones

- **Demo conceptual estática**: sin backend.
- **El formulario de contacto NO envía nada.** Está señalizado como demo y los textos lo aclaran.
- **No** está vinculada al catálogo real, al sistema de reservas ni a ninguna API institucional.
- **No** está pensada para producción.

## Aviso legal resumido

- Fan project / ejercicio académico, sin afiliación.
- No representa ni sustituye al sitio oficial.
- El material visual está bajo licencias abiertas atribuidas en `NOTICE`. Cumple la atribución si reutilizas.
- A petición del titular retiraré cualquier recurso.

Para información oficial, eventos, catálogo o solicitudes formales:
**<http://www.palafoxiana.com>** — Biblioteca Palafoxiana, 5 Oriente 5, 2º piso, Centro, Puebla, México.
