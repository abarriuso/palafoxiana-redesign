import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { describe, it, expect } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const script = readFileSync(resolve(root, 'script.js'), 'utf8');

// Recoge todas las claves data-i18n / data-i18n-placeholder del HTML
const keys = new Set();
const keyRe = /data-i18n(?:-placeholder)?="([^"]+)"/g;
let m;
while ((m = keyRe.exec(html))) keys.add(m[1]);

// Extrae los bloques es: {...} y en: {...} del script
const esStart = script.indexOf('es: {');
const enStart = script.indexOf('en: {');
const esBlock = script.slice(esStart, enStart);
const enBlock = script.slice(enStart);

function hasKey(block, key) {
  const esc = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`'${esc}'\\s*:`, 'u').test(block);
}

describe('i18n coverage', () => {
  it('todas las claves data-i18n del HTML están definidas en script.js', () => {
    const missing = [...keys].filter(k => !hasKey(script, k));
    expect(missing, `Faltan claves en script.js: ${missing.join(', ')}`).toEqual([]);
  });

  it('cada clave del HTML existe en los diccionarios es y en', () => {
    const onlyEs = [...keys].filter(k => hasKey(esBlock, k) && !hasKey(enBlock, k));
    const onlyEn = [...keys].filter(k => hasKey(enBlock, k) && !hasKey(esBlock, k));
    const msg = `Solo-es: ${onlyEs.join(', ')} | Solo-en: ${onlyEn.join(', ')}`;
    expect(onlyEs.length + onlyEn.length, msg).toBe(0);
  });

  it('los diccionarios es y en son simétricos (mismas claves)', () => {
    // Solo claves de i18n (contienen un punto, p. ej. 'nav.home').
    // Se excluyen claves de código como 'dark' o 'flex'.
    const keyReScript = /'([a-z][a-z0-9.-]*\.[a-z0-9.-]+)'\s*:/gu;
    const esKeys = new Set([...esBlock.matchAll(keyReScript)].map(x => x[1]));
    const enKeys = new Set([...enBlock.matchAll(keyReScript)].map(x => x[1]));
    const onlyEs = [...esKeys].filter(k => !enKeys.has(k));
    const onlyEn = [...enKeys].filter(k => !esKeys.has(k));
    const msg = `Solo-es: ${onlyEs.join(', ')} | Solo-en: ${onlyEn.join(', ')}`;
    expect(onlyEs.length + onlyEn.length, msg).toBe(0);
  });
});
