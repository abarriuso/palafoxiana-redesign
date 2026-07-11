import { describe, it, expect } from 'vitest';
import {
  resolveTheme,
  shouldShowCard,
  computeOverflow,
  wrapIndex,
  parseCountTarget,
  formatCount,
  lookup,
  hasHtml,
  safeSetHTML,
  isHoneypotTriggered,
  computeScrollProgress,
  isScrolled,
} from '../src/logic.js';

describe('resolveTheme', () => {
  it('returns true when stored is "dark"', () => {
    expect(resolveTheme('dark', false)).toBe(true);
  });
  it('returns false when stored is "light"', () => {
    expect(resolveTheme('light', true)).toBe(false);
  });
  it('falls back to prefersDark when stored is null', () => {
    expect(resolveTheme(null, true)).toBe(true);
    expect(resolveTheme(null, false)).toBe(false);
  });
});

describe('shouldShowCard', () => {
  it('shows everything for "todos"', () => {
    expect(shouldShowCard('libros teologia', 'todos')).toBe(true);
    expect(shouldShowCard('', 'todos')).toBe(true);
  });
  it('matches a single category split by spaces', () => {
    expect(shouldShowCard('libros teologia', 'teologia')).toBe(true);
    expect(shouldShowCard('libros teologia', 'libros')).toBe(true);
  });
  it('hides non-matching categories', () => {
    expect(shouldShowCard('libros teologia', 'incunable')).toBe(false);
    expect(shouldShowCard('', 'incunable')).toBe(false);
  });
});

describe('computeOverflow', () => {
  it('is 0 when within the limit', () => {
    expect(computeOverflow(4, 4)).toBe(0);
    expect(computeOverflow(2, 4)).toBe(0);
  });
  it('counts cards beyond the limit', () => {
    expect(computeOverflow(8, 4)).toBe(4);
    expect(computeOverflow(5, 4)).toBe(1);
  });
});

describe('wrapIndex', () => {
  it('wraps forward and backward cyclically', () => {
    expect(wrapIndex(0, 20)).toBe(0);
    expect(wrapIndex(-1, 20)).toBe(19);
    expect(wrapIndex(20, 20)).toBe(0);
    expect(wrapIndex(21, 20)).toBe(1);
  });
  it('guards against zero length', () => {
    expect(wrapIndex(3, 0)).toBe(0);
  });
});

describe('parseCountTarget / formatCount', () => {
  it('parses comma-grouped numbers', () => {
    expect(parseCountTarget('45,059')).toEqual({ raw: 45059, hasSuffix: false });
    expect(parseCountTarget('5,345')).toEqual({ raw: 5345, hasSuffix: false });
    expect(parseCountTarget('9')).toEqual({ raw: 9, hasSuffix: false });
  });
  it('detects the trailing + suffix', () => {
    expect(parseCountTarget('9+')).toEqual({ raw: 9, hasSuffix: true });
  });
  it('formats with a thousands separator', () => {
    // Independiente de la ICU: comparamos solo los dígitos.
    const digits = (s) => s.replace(/\D/g, '');
    expect(digits(formatCount(45059, false, 'en-US'))).toBe('45059');
    expect(digits(formatCount(45059, false, 'es-MX'))).toBe('45059');
    expect(formatCount(9, true, 'en-US')).toBe('9+');
  });
  it('returns 0 for unparseable input', () => {
    expect(parseCountTarget('abc')).toEqual({ raw: 0, hasSuffix: false });
  });
});

describe('lookup', () => {
  const dict = { es: { a: 'A' }, en: { a: 'B' } };
  it('returns the translation for the language', () => {
    expect(lookup(dict, 'en', 'a')).toBe('B');
  });
  it('falls back to "es" when language missing', () => {
    expect(lookup(dict, 'fr', 'a')).toBe('A');
  });
  it('returns undefined for unknown key', () => {
    expect(lookup(dict, 'es', 'nope')).toBeUndefined();
  });
});

describe('hasHtml', () => {
  it('detects tags', () => {
    expect(hasHtml('a <strong>b</strong>')).toBe(true);
    expect(hasHtml('<br>')).toBe(true);
  });
  it('returns false for plain text', () => {
    expect(hasHtml('plain text')).toBe(false);
    expect(hasHtml('')).toBe(false);
  });
});

describe('isHoneypotTriggered', () => {
  it('is false for empty input', () => {
    expect(isHoneypotTriggered('')).toBe(false);
    expect(isHoneypotTriggered('   ')).toBe(false);
    expect(isHoneypotTriggered(null)).toBe(false);
  });
  it('is true when filled', () => {
    expect(isHoneypotTriggered('bot@spam')).toBe(true);
  });
});

describe('computeScrollProgress / isScrolled', () => {
  it('computes progress as percentage', () => {
    expect(computeScrollProgress(0, 1000)).toBe(0);
    expect(computeScrollProgress(500, 1000)).toBe(50);
    expect(computeScrollProgress(1000, 1000)).toBe(100);
  });
  it('returns 0 when doc height is 0', () => {
    expect(computeScrollProgress(100, 0)).toBe(0);
  });
  it('detects scrolled past threshold', () => {
    expect(isScrolled(61)).toBe(true);
    expect(isScrolled(60)).toBe(false);
    expect(isScrolled(10)).toBe(false);
  });
});

describe('safeSetHTML', () => {
  it('allows whitelisted tags (strong, a, br, em)', () => {
    const el = document.createElement('div');
    safeSetHTML(el, '<strong>bold</strong> and <em>italic</em>');
    expect(el.innerHTML).toContain('<strong>');
    expect(el.innerHTML).toContain('<em>');
  });
  it('strips non-whitelisted tags', () => {
    const el = document.createElement('div');
    safeSetHTML(el, '<script>alert(1)</script><img src=x onerror=alert(1)><strong>safe</strong>');
    expect(el.innerHTML).not.toContain('<script>');
    expect(el.innerHTML).not.toContain('<img');
    expect(el.innerHTML).toContain('<strong>safe</strong>');
  });
  it('handles plain text without HTML', () => {
    const el = document.createElement('div');
    safeSetHTML(el, 'plain text');
    expect(el.textContent).toBe('plain text');
  });
});
