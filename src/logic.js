// ============================================================
//  Biblioteca Palafoxiana — lógica pura (testeable)
//  Sin DOM, sin efectos secundarios globales.
//  Importado por script.js y por los tests (Vitest + jsdom).
// ============================================================
// @ts-check

/**
 * Resuelve si el tema oscuro debe estar activo.
 * @param {string|null} stored  Valor guardado ('light' | 'dark' | null)
 * @param {boolean} prefersDark Preferencia del SO vía prefers-color-scheme
 * @returns {boolean} true si el tema es oscuro
 */
export function resolveTheme(stored, prefersDark) {
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return prefersDark;
}

/**
 * Indica si una tarjeta de libro debe mostrarse para un filtro dado.
 * @param {string} category Categorías separadas por espacios (p. ej. "libros teologia")
 * @param {string} filter   Filtro activo ('todos' | 'incunable' | 'libros' | ...)
 * @returns {boolean}
 */
export function shouldShowCard(category, filter) {
  if (filter === 'todos') return true;
  const cats = (category || '').split(' ').filter(Boolean);
  return cats.includes(filter);
}

/**
 * Número de tarjetas visibles que exceden el límite inicial.
 * @param {number} visibleCount Tarjetas visibles tras aplicar el filtro
 * @param {number} limit        Límite de tarjetas mostradas sin "Mostrar más"
 * @returns {number} overflow (0 si visibleCount <= limit)
 */
export function computeOverflow(visibleCount, limit) {
  return visibleCount > limit ? visibleCount - limit : 0;
}

/**
 * Ajusta un índice al rango [0, len) de forma cíclica (para el lightbox).
 * @param {number} i
 * @param {number} len
 * @returns {number}
 */
export function wrapIndex(i, len) {
  if (len <= 0) return 0;
  return ((i % len) + len) % len;
}

/**
 * Extrae el valor numérico y si tiene sufijo '+' de una cadena de contador.
 * @param {string} str Texto original (p. ej. "45,059" o "9+")
 * @returns {{ raw: number, hasSuffix: boolean }}
 */
export function parseCountTarget(str) {
  const s = (str || '').trim();
  const hasSuffix = s.endsWith('+');
  const raw = parseInt(s.replace(/[^0-9]/g, ''), 10);
  return { raw: Number.isFinite(raw) ? raw : 0, hasSuffix };
}

/**
 * Formatea un contador con separador de miles del locale.
 * @param {number} raw
 * @param {boolean} hasSuffix
 * @param {string} [locale]
 * @returns {string}
 */
export function formatCount(raw, hasSuffix, locale = 'es-MX') {
  return raw.toLocaleString(locale) + (hasSuffix ? '+' : '');
}

/**
 * Devuelve la traducción para una clave y un idioma (fallback a 'es').
 * @param {Record<string, string>} dict Diccionario de traducciones
 * @param {string} lang
 * @param {string} key
 * @returns {string|undefined}
 */
export function lookup(dict, lang, key) {
  return (dict[lang] || dict.es)[key];
}

/**
 * Detecta si un valor de traducción contiene HTML (tags <a-z>).
 * @param {string} value
 * @returns {boolean}
 */
export function hasHtml(value) {
  return /<[a-z]/i.test(value || '');
}

/**
 * Comprueba si el campo honeypot fue rellenado por un bot.
 * @param {string} value
 * @returns {boolean}
 */
export function isHoneypotTriggered(value) {
  return !!(value && String(value).trim() !== '');
}

/**
 * Progreso de scroll en porcentaje [0, 100].
 * @param {number} y    Scroll vertical actual (px)
 * @param {number} docH Alto del documento menos el viewport (px)
 * @returns {number}
 */
export function computeScrollProgress(y, docH) {
  if (docH <= 0) return 0;
  return (y / docH) * 100;
}

/**
 * Indica si se ha superado el umbral de scroll para encoger el header.
 * @param {number} y
 * @param {number} [threshold]
 * @returns {boolean}
 */
export function isScrolled(y, threshold = 60) {
  return y > threshold;
}
