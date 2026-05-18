# Biblioteca Palafoxiana — rediseño conceptual (no oficial)

> ⚠️ **Proyecto educativo de portafolio, sin ninguna afiliación, patrocinio ni autorización** de la Biblioteca Palafoxiana, del Gobierno del Estado de Puebla, de la UNESCO ni de ninguna otra institución. Este repositorio **no** es ni representa al sitio oficial.

Rediseño conceptual del sitio web de la **Biblioteca Palafoxiana** (Puebla, México) — la primera biblioteca pública de América (1646), Patrimonio de la Humanidad UNESCO · Memoria del Mundo (2005).

**Sitio oficial:** <http://www.palafoxiana.com>

Para horarios reales, visitas, catálogo o cualquier consulta institucional, dirígete **siempre** al sitio oficial o a los teléfonos publicados ahí.

---

## Créditos y atribuciones

### Fotografías de la biblioteca

Las fotografías de la sala, fachada y galería (archivos `galeria_*.webp` y `logo.webp`) proceden del **sitio oficial [palafoxiana.com](http://www.palafoxiana.com)** y son propiedad de la Biblioteca Palafoxiana / Gobierno del Estado de Puebla. Se reproducen aquí exclusivamente para fines educativos y de portafolio personal, sin uso comercial. Serán retiradas de inmediato si el titular lo solicita.

### Reproducciones de obras históricas (acervo)

Las imágenes de libros históricos proceden de **Wikimedia Commons** y corresponden a obras del dominio público (publicadas antes de 1700). Se reproduce la imagen digital, no el original:

| Archivo | Obra | Fuente |
|---|---|---|
| `libro_herodoto.webp` | *Historiae*, Heródoto, ed. 1473 | Wikimedia Commons — dominio público |
| `liber_chronicarum.webp` | *Liber Chronicarum* (Crónica de Núremberg), 1493 | Wikimedia Commons — dominio público |
| `biblia_poliglota.webp` | *Biblia Políglota* de Amberes, 1569–1572 | Wikimedia Commons — dominio público |
| `vesalius_fabrica.webp` | *De Humani Corporis Fabrica*, Vesalio, 1543 | Wikimedia Commons — dominio público |
| `vocabulario_molina.webp` | *Vocabulario en lengua castellana y mexicana*, Fr. A. de Molina, 1571 | Wikimedia Commons — dominio público |
| `doctrina_christiana.webp` | *Doctrina Christiana*, Fr. J. de la Anunciación, 1575 | Wikimedia Commons — dominio público |
| `moriae_encomium.webp` | *Moriae Encomium*, Erasmo de Róterdam, s. XVI | Wikimedia Commons — dominio público |
| `don_quijote.webp` | *Don Quijote de la Mancha*, Cervantes, ed. temprana s. XVII | Wikimedia Commons — dominio público |

### Logotipo

`logo.webp` — Marca institucional © Biblioteca Palafoxiana. Reproducido para identificación en este ejercicio de rediseño.

### Fuentes tipográficas

[Lora](https://fonts.google.com/specimen/Lora), [DM Sans](https://fonts.google.com/specimen/DM+Sans) y [Prata](https://fonts.google.com/specimen/Prata) vía **Google Fonts** (SIL Open Font License 1.1).

### Librería de scroll suave

[Lenis](https://github.com/darkroomengineering/lenis) por darkroom.engineering (MIT License), cargado desde CDN.

### Textos editoriales

Los textos descriptivos de la historia y el acervo se han elaborado a partir de información de dominio público y del sitio oficial (<http://www.palafoxiana.com>). Pueden estar resumidos o adaptados con fines didácticos. Si eres titular de algún contenido y prefieres que lo retire, abre un issue.

---

## Tecnología

- **HTML5 · CSS3 · JavaScript vanilla** — sin frameworks, sin build step, sin dependencias npm.
- Fuentes: **Lora** (serif), **DM Sans** (sans-serif), **Prata** (display) — Google Fonts.
- Scroll suave: [Lenis](https://github.com/darkroomengineering/lenis) desde CDN.
- Tema claro/oscuro con `localStorage` y respeto a `prefers-color-scheme`.
- Internacionalización ES/EN con persistencia en `localStorage`.
- Animaciones de entrada con `IntersectionObserver` y `prefers-reduced-motion`.

---

## Ejecutar localmente

El repositorio incluye todos los assets. Solo hace falta un servidor estático:

```bash
# Python 3
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Abrir <http://localhost:8080>.

---

## Catálogo de assets

| Archivo (`assets/`) | Uso | Fuente |
|---|---|---|
| `favicon.svg` | Icono de pestaña | Creado para este proyecto — MIT |
| `logo.webp` | Header y footer | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_03.webp` | Hero + galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_04.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_06.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_08.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_09.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_11.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_13.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_14.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_15.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_16.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_17.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_18.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_19.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `galeria_20.webp` | Galería | © Biblioteca Palafoxiana — palafoxiana.com |
| `libro_herodoto.webp` | Acervo | Wikimedia Commons — dominio público |
| `liber_chronicarum.webp` | Acervo | Wikimedia Commons — dominio público |
| `biblia_poliglota.webp` | Acervo | Wikimedia Commons — dominio público |
| `vesalius_fabrica.webp` | Acervo | Wikimedia Commons — dominio público |
| `vocabulario_molina.webp` | Acervo | Wikimedia Commons — dominio público |
| `doctrina_christiana.webp` | Acervo | Wikimedia Commons — dominio público |
| `moriae_encomium.webp` | Acervo | Wikimedia Commons — dominio público |
| `don_quijote.webp` | Acervo | Wikimedia Commons — dominio público |

---

## Estado y limitaciones

- **Demo estática*: sin backend ni base de datos.
- **El formulario de contacto no envía nada.** Está claramente señalizado como demo.
- No conecta con el catálogo real, el sistema de reservas ni ninguna API institucional.
- No está pensado para producción ni para representar a la institución.

---

## Lo que es mío en este repositorio

El código fuente (HTML, CSS, JavaScript), el favicon SVG y esta documentación, publicados bajo **licencia MIT** — ver [`LICENSE.txt`](LICENSE.txt).

El MIT cubre **solo el código propio**. Los assets visuales y textos siguen las licencias de cada recurso según se indica en la tabla anterior y en `LICENSE.txt`.

---

## Aviso legal

- Proyecto de portafolio educativo sin afiliación institucional.
- No representa ni sustituye al sitio oficial de la Biblioteca Palafoxiana.
- El material visual del sitio oficial se reproduce bajo uso educativo legítimo; cualquier titular puede solicitar su retirada abriendo un issue.
- Las imágenes de Wikimedia Commons reproducen obras del dominio público (anteriores a 1700).
- La atribución de todos los recursos se detalla en este README y en `LICENSE.txt`.

Para información oficial, visitas, catálogo o solicitudes formales:  
**<http://www.palafoxiana.com>** — Biblioteca Palafoxiana, 5 Oriente 5, 2.º piso, Centro, Puebla, México.
