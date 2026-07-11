import { readFile, writeFile } from 'fs/promises';

const HTML = './index.html';
let html = await readFile(HTML, 'utf8');

const SIZES = {
  hero: '100vw',
  logo: '(max-width:600px) 100vw, 50vw',
  gallery: '(max-width:600px) 50vw, (max-width:1024px) 33vw, 280px',
  book: '(max-width:600px) 50vw, (max-width:1024px) 33vw, 240px',
  historia: '(max-width:600px) 100vw, 50vw',
};

function categoryFor(src) {
  if (src.includes('puerta_hq')) return 'hero';
  if (src.includes('logo')) return 'logo';
  if (/MG_\d+/.test(src)) return 'gallery';
  if (['libros_hq', 'liber_chronicarum', 'palafox_libro_18', 'vesalius_fabrica', 'codex_mendoza', 'libros', 'erasmo_locura', 'quijote_1605']
        .some(n => src.includes(n))) return 'book';
  if (['grabdo-palafox', 'frenteinterior', 'interior_1'].some(n => src.includes(n))) return 'historia';
  return 'historia';
}

function getAttr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, 'i'));
  return m ? m[1] : null;
}

const imgRe = /<img\s+([^>]*?)\s*\/?>/gi;

let count = 0;
html = html.replace(imgRe, (full, attrs) => {
  const src = getAttr(attrs, 'src');
  if (!src || !/^assets\//.test(src)) return full;

  const cat = categoryFor(src);
  const m = src.match(/^(assets\/.*?)(\.(?:jpg|jpeg|png|webp))$/i);
  const base = m[1];           // assets/MG_2220
  const ext = m[2].toLowerCase(); // .jpg
  const fallback = `${base}-1200${ext}`;

  const alt = getAttr(attrs, 'alt') ?? '';
  const width = getAttr(attrs, 'width');
  const height = getAttr(attrs, 'height');
  const loading = getAttr(attrs, 'loading');
  const fetchpriority = getAttr(attrs, 'fetchpriority');

  const sizes = SIZES[cat];
  const srcset = `${base}-400.avif 400w, ${base}-800.avif 800w, ${base}-1200.avif 1200w`;
  const webpSrcset = `${base}-400.webp 400w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`;

  const imgAttrs = [
    `src="${fallback}"`,
    `alt="${alt}"`,
  ];
  if (width) imgAttrs.push(`width="${width}"`);
  if (height) imgAttrs.push(`height="${height}"`);
  if (cat !== 'hero' && loading) imgAttrs.push(`loading="${loading}"`);
  if (fetchpriority) imgAttrs.push(`fetchpriority="${fetchpriority}"`);
  imgAttrs.push('decoding="async"');

  const picture =
`<picture>
  <source type="image/avif" srcset="${srcset}" sizes="${sizes}" />
  <source type="image/webp" srcset="${webpSrcset}" sizes="${sizes}" />
  <img ${imgAttrs.join(' ')} />
</picture>`;

  count++;
  return picture;
});

await writeFile(HTML, html, 'utf8');
console.log(`Converted ${count} <img> elements to <picture>.`);
