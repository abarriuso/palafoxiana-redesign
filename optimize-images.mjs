import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';

const ASSETS = './assets';
const WIDTHS = [400, 800, 1200];
const AVIF_QUALITY = 60;
const WEBP_QUALITY = 75;

const isWidthVariant = (name) => /-\d+\.(avif|webp|jpg|jpeg|png)$/i.test(name);
const isSource = (name) => /\.(jpg|jpeg|png|webp)$/i.test(name)
  && !/\.(gif|avif|ico|svg)$/i.test(name)
  && !isWidthVariant(name)
  && !/favicon/i.test(name);

const files = await readdir(ASSETS);
const sources = files.filter(isSource).sort();

console.log(`Found ${sources.length} source images to process\n`);

let ok = 0;
let failed = 0;
let generated = 0;

for (const file of sources) {
  const src = join(ASSETS, file);
  const dir = dirname(src);
  const ext = extname(file).toLowerCase();
  const base = basename(file, ext);

  try {
    for (const w of WIDTHS) {
      const avifOut = `${dir}/${base}-${w}.avif`;
      const webpOut = `${dir}/${base}-${w}.webp`;
      await sharp(src).resize({ width: w, withoutEnlargement: true }).avif({ quality: AVIF_QUALITY }).toFile(avifOut);
      await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: WEBP_QUALITY }).toFile(webpOut);
      generated += 2;
    }

    // Fallback optimized original-format at 1200
    const fallback = `${dir}/${base}-1200${ext}`;
    await sharp(src).resize({ width: 1200, withoutEnlargement: true }).toFile(fallback);
    generated += 1;

    ok++;
    console.log(`  OK    ${file} → avif/webp @400/800/1200 + fallback ${base}-1200${ext}`);
  } catch (e) {
    failed++;
    console.error(`  FAIL  ${file}: ${e.message}`);
  }
}

console.log(`\nProcessed: ${ok} ok, ${failed} failed`);
console.log(`Generated variant files: ${generated}`);
