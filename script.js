// ============================================================
//  Biblioteca Palafoxiana — script.js (módulo ES)
//  Encapsulado en módulo: sin contaminación de window.
//  La lógica pura vive en ./src/logic.js (testeable con Vitest).
// ============================================================
import {
  resolveTheme,
  shouldShowCard,
  computeOverflow,
  wrapIndex,
  parseCountTarget,
  formatCount,
  lookup,
  hasHtml,
  isHoneypotTriggered,
  computeScrollProgress,
  isScrolled,
} from './src/logic.js';

/* ── Constantes (números mágicos nombrados) ──────────────── */
const SCROLL_HEADER_THRESHOLD = 60;   // px para encoger el header
const COUNTER_DURATION        = 1600; // ms de la animación de contadores
const SUBMIT_SIM_DELAY        = 1200; // ms de la simulación de envío
const FEEDBACK_HIDE_MS        = 6000; // ms antes de ocultar el feedback

const PREFERS_REDUCED_MOTION =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const PREFERS_DARK =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const STORAGE = {
  lang:  'palafoxiana.lang',
  theme: 'palafoxiana.theme',
};

/* Wrappers de localStorage a prueba de entornos sin almacenamiento
   (modo privado, cuota llena, navegadores restrictivos). */
function safeGet(key) {
  try { return localStorage.getItem(key); }
  catch (e) { console.warn('storage unavailable (get)', e); return null; }
}
function safeSet(key, val) {
  try { localStorage.setItem(key, val); }
  catch (e) { console.warn('storage unavailable (set)', e); }
}
function safeRemove(key) {
  try { localStorage.removeItem(key); }
  catch (e) { console.warn('storage unavailable (remove)', e); }
}

const translations = {
  es: {
    /* nav */
    'nav.home':              'Inicio',
    'nav.services':          'Visitar',
    'nav.services-visitors': 'Para visitantes',
    'nav.services-research': 'Investigadores ↗',
    'nav.history':           'Historia',
    'nav.history-library':   'Biblioteca',
    'nav.history-acervo':    'Colección',
    'nav.history-palafox':   'Juan de Palafox ↗',
    'nav.contact':           'Contacto',
    'nav.catalog':           'Catálogo ↗',
    'nav.events':            'Actividades ↗',
    'nav.books':             'Publicaciones',
    'nav.books-abeja':       'La Abeja Poblana ↗',
    'nav.books-gaceta':      'Gaceta Literaria ↗',
    'nav.books-digital':      'Digitalizaciones ↗',
    'nav.books-pubs':        'Publicaciones ↗',
    'nav.books-galleries':   'Galerías ↗',
    'nav.guide':             'Guía',
    'nav.guide-app':         'App ↗',

    /* hero */
    'hero.badge':    'UNESCO · Memoria del Mundo · 2005',
    'hero.title':    'Biblioteca<br>Palafoxiana',
    'hero.subtitle': 'La primera biblioteca pública de América',
    'hero.location': 'Puebla, México',

    /* visit */
    'visit.tag':              'Visitar',
    'visit.title':            'Planifica tu visita',
    'visit.hours':            'Horarios',
    'visit.hours-detail':     'Martes a domingo<br>10:00 – 18:00 h',
    'visit.hours-note':       'Lunes cerrado',
    'visit.location':         'Ubicación',
    'visit.location-detail':  '5 Oriente Núm. 5, 2º piso<br>Casa de Cultura, Centro, Puebla',
    'visit.location-link':    'Cómo llegar →',
    'visit.admission':        'Entrada',
    'visit.admission-detail': '$40 MXN general<br>Estudiantes: $20 MXN',
    'visit.admission-note':   'Martes entrada libre',
    'visit.services':         'Servicios',
    'visit.services-detail':  'Visitas guiadas gratuitas<br>Audioguías y exposiciones',
    'visit.services-note':    'Sala temporal de exposiciones',
    'visit.cta':              'Solicitar visita guiada',
    'visit.cta-note':         'Visitas guiadas gratuitas — consulta disponibilidad',

    /* history */
    'history.tag':   'Historia',
    'history.title': 'Biblioteca · Juan de Palafox',
    'history.p1':    'En 1646 el obispo de Puebla <strong>Juan de Palafox y Mendoza</strong> donó al seminario su colección personal de 5,000 volúmenes, con la condición de que cualquier persona que supiera leer pudiera consultarla. Fue el acto fundacional de la primera biblioteca pública de América.',
    'history.p2':    'En 1773 el obispo <strong>Francisco Fabián y Fuero</strong> levantó la sala principal de <strong>43 metros de longitud</strong> con sus tres niveles de estantería en cedro y ayacahuite. Una estructura monumental que perdura como testigo de cuatro siglos de historia y conocimiento acumulado.',
    'history.p3':    'El acervo creció a través de los siglos, alcanzando hoy más de 45,000 volúmenes distribuidos en 54 materias y catorce idiomas. Fue declarada Monumento Histórico en 1981 y reconocida por la UNESCO como Memoria del Mundo en 2005.',
    'timeline.1646': 'Donación de Palafox',
    'timeline.1773': 'Recinto de Fabián y Fuero',
    'timeline.1981': 'Monumento Histórico',
    'timeline.2005': 'UNESCO · Memoria del Mundo',

    /* gallery */
    'gallery.tag':       'Galería',
    'gallery.title':     'Biblioteca en imágenes',
    'gallery.show-more': 'Mostrar galería completa',
    'gallery.show-less': 'Mostrar menos',

    /* collection */
    'collection.tag':       'Acervo',
    'collection.title':     'Uno de los más ricos del continente',
    'collection.lead':      'Tres colecciones — libros, manuscritos e impresos sueltos — distribuidas en 54 materias y catorce idiomas.',
    'collection.show-more': 'Mostrar más',
    'collection.show-less': 'Mostrar menos',
    'collection.note':      'Selección de obras emblemáticas documentadas en el acervo. El conjunto completo abarca 54 materias en 14 idiomas — del derecho canónico a la química, del náhuatl al árabe.',
    'stat.volumes':         'Volúmenes',
    'stat.incunables':      'Incunables',
    'stat.manuscripts':     'Manuscritos',
    'stat.subjects':        'Materias',
    'stat.languages':       'Idiomas',
    'tab.todos':            'Todos',
    'tab.incunable':        'Incunables',
    'tab.libros':           'Libros impresos',
    'badge.incunable':      'Incunable',
    'badge.libros':         'Libro impreso',
    'badge.teologia':       'Teología',
    'badge.ciencia':        'Ciencia',
    'badge.literatura':     'Literatura',

    /* contact + form */
    'contact.tag':                 'Contacto',
    'contact.title':               'Visítanos',
    'contact.address-label':       'Dirección',
    'contact.phone-label':         'Teléfonos',
    'contact.hours-label':         'Horarios',
    'contact.hours-detail':        'Martes a domingo<br>10:00 – 18:00 h',
    'contact.social-label':        'Síguenos',
    'contact.name-label':          'Nombre completo',
    'contact.name-placeholder':    'Tu nombre',
    'contact.email-label':         'Correo electrónico',
    'contact.email-placeholder':   'tu@correo.com',
    'contact.subject-label':       'Motivo de contacto',
    'contact.subject-placeholder': 'Selecciona un motivo',
    'contact.subject-visit':       'Información de visita',
    'contact.subject-guided':      'Reservar visita guiada',
    'contact.subject-research':    'Acceso para investigación',
    'contact.subject-press':       'Prensa y comunicación',
    'contact.subject-other':       'Otro asunto',
    'contact.message-label':       'Mensaje',
    'contact.message-placeholder': 'Cuéntanos en qué podemos ayudarte',
    'contact.message-hint':        'Demo: este formulario no envía mensajes. Para contactar a la biblioteca usa los datos de la izquierda.',
    'contact.submit':              'Enviar mensaje (demo)',
    'contact.submit-loading':      'Procesando…',
    'contact.privacy':             'Este es un rediseño conceptual sin backend. Los datos del formulario no se transmiten ni almacenan.',
    'contact.success':             'Demo: el formulario no envía nada. Usa los datos de contacto de la izquierda para escribir a la biblioteca.',
    'contact.error':               'Demo: ha ocurrido un error simulado. Vuelve a intentarlo o usa los datos de contacto de la izquierda.',

    /* footer */
    'footer.subtitle': 'Patrimonio UNESCO · Memoria del Mundo',
    'footer.col1':     'Visitar',
    'footer.col2':     'Acervo',
    'footer.col3':     'Contacto',
    'footer.credits':  'Rediseño conceptual con fines educativos',
  },

  en: {
    /* nav */
    'nav.home':              'Home',
    'nav.services':          'Visit',
    'nav.services-visitors': 'For visitors',
    'nav.services-research': 'Researchers ↗',
    'nav.history':           'History',
    'nav.history-library':   'Library',
    'nav.history-acervo':    'Collection',
    'nav.history-palafox':   'Juan de Palafox ↗',
    'nav.contact':           'Contact',
    'nav.catalog':           'Catalogue ↗',
    'nav.events':            'Events ↗',
    'nav.books':             'Publications',
    'nav.books-abeja':       'La Abeja Poblana ↗',
    'nav.books-gaceta':      'Gaceta Literaria ↗',
    'nav.books-digital':     'Digitisations ↗',
    'nav.books-pubs':        'Publications ↗',
    'nav.books-galleries':   'Galleries ↗',
    'nav.guide':             'Guide',
    'nav.guide-app':         'App ↗',

    /* hero */
    'hero.badge':    'UNESCO · Memory of the World · 2005',
    'hero.title':    'Library<br>Palafoxiana',
    'hero.subtitle': 'The first public library in the Americas',
    'hero.location': 'Puebla, Mexico',

    /* visit */
    'visit.tag':              'Visit',
    'visit.title':            'Plan your visit',
    'visit.hours':            'Hours',
    'visit.hours-detail':     'Tuesday to Sunday<br>10:00 – 18:00',
    'visit.hours-note':       'Closed on Mondays',
    'visit.location':         'Location',
    'visit.location-detail':  '5 Oriente Núm. 5, 2nd floor<br>Casa de Cultura, Centro, Puebla',
    'visit.location-link':    'Get directions →',
    'visit.admission':        'Admission',
    'visit.admission-detail': '$40 MXN general<br>Students: $20 MXN',
    'visit.admission-note':   'Free admission on Tuesdays',
    'visit.services':         'Services',
    'visit.services-detail':  'Free guided tours<br>Audio guides and exhibitions',
    'visit.services-note':    'Temporary exhibition hall',
    'visit.cta':              'Request a guided tour',
    'visit.cta-note':         'Free guided tours — please check availability',

    /* history */
    'history.tag':   'History',
    'history.title': 'Library · Juan de Palafox',
    'history.p1':    'In 1646 Bishop <strong>Juan de Palafox y Mendoza</strong> donated his personal collection of 5,000 volumes to the seminary, on the condition that any literate person could consult it. It was the founding act of the first public library in the Americas.',
    'history.p2':    'In 1773 Bishop <strong>Francisco Fabián y Fuero</strong> built the main reading hall, <strong>43 metres long</strong>, with three levels of cedar and ayacahuite shelving — a monumental structure that endures as witness to four centuries of history and accumulated knowledge.',
    'history.p3':    'The collection grew across the centuries, now holding more than 45,000 volumes across 54 subjects and fourteen languages. Declared a National Historic Monument in 1981 and recognised by UNESCO as Memory of the World in 2005.',
    'timeline.1646': 'Palafox donation',
    'timeline.1773': 'Fabián y Fuero hall',
    'timeline.1981': 'Historic Monument',
    'timeline.2005': 'UNESCO · Memory of the World',

    /* gallery */
    'gallery.tag':       'Gallery',
    'gallery.title':     'The library in pictures',
    'gallery.show-more': 'Show full gallery',
    'gallery.show-less': 'Show less',

    /* collection */
    'collection.tag':       'Collection',
    'collection.title':     'Among the richest in the continent',
    'collection.lead':      'Three collections — printed books, manuscripts and broadsides — across 54 subjects and fourteen languages.',
    'collection.show-more': 'Show more',
    'collection.show-less': 'Show less',
    'collection.note':      'Emblematic works documented in the collection. The full holdings span 54 subjects in 14 languages — from canon law to chemistry, from Nahuatl to Arabic.',
    'stat.volumes':         'Volumes',
    'stat.incunables':      'Incunabula',
    'stat.manuscripts':     'Manuscripts',
    'stat.subjects':        'Subjects',
    'stat.languages':       'Languages',
    'tab.todos':            'All',
    'tab.incunable':        'Incunabula',
    'tab.libros':           'Printed books',
    'badge.incunable':      'Incunable',
    'badge.libros':         'Printed book',
    'badge.teologia':       'Theology',
    'badge.ciencia':        'Science',
    'badge.literatura':     'Literature',

    /* contact + form */
    'contact.tag':                 'Contact',
    'contact.title':               'Visit us',
    'contact.address-label':       'Address',
    'contact.phone-label':         'Phone',
    'contact.hours-label':         'Hours',
    'contact.hours-detail':        'Tuesday to Sunday<br>10:00 – 18:00',
    'contact.social-label':        'Follow us',
    'contact.name-label':          'Full name',
    'contact.name-placeholder':    'Your name',
    'contact.email-label':         'Email address',
    'contact.email-placeholder':   'you@email.com',
    'contact.subject-label':       'Reason for contact',
    'contact.subject-placeholder': 'Select a reason',
    'contact.subject-visit':       'Visit information',
    'contact.subject-guided':      'Book a guided tour',
    'contact.subject-research':    'Research access',
    'contact.subject-press':       'Press & communications',
    'contact.subject-other':       'Other',
    'contact.message-label':       'Message',
    'contact.message-placeholder': 'Tell us how we can help',
    'contact.message-hint':        'Demo: this form does not send messages. To contact the library use the details on the left.',
    'contact.submit':              'Send message (demo)',
    'contact.submit-loading':      'Processing…',
    'contact.privacy':             'This is a conceptual redesign with no backend. Form data is neither transmitted nor stored.',
    'contact.success':             'Demo: this form does not send anything. Use the contact details on the left to write to the library.',
    'contact.error':               'Demo: a simulated error occurred. Try again or use the contact details on the left.',

    /* footer */
    'footer.subtitle': 'UNESCO Heritage · Memory of the World',
    'footer.col1':     'Visit',
    'footer.col2':     'Collection',
    'footer.col3':     'Contact',
    'footer.credits':  'Conceptual redesign for educational purposes',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initLenis();
  initDropdowns();
  initMobileMenu();
  initSmoothScroll();
  initScrollFx();
  initCounters();
  initCollectionTabs();
  initContactForm();
  initFooterYear();
  initLightbox();
});

/* ── Theme ───────────────────────────────────────────── */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Migrate legacy storage keys (primera versión del sitio)
  const legacyDark = safeGet('darkMode');
  const legacyLang = safeGet('lang');
  if (legacyDark !== null && safeGet(STORAGE.theme) === null) {
    safeSet(STORAGE.theme, legacyDark === 'true' ? 'dark' : 'light');
    safeRemove('darkMode');
  }
  if (legacyLang !== null && safeGet(STORAGE.lang) === null) {
    safeSet(STORAGE.lang, legacyLang);
    safeRemove('lang');
  }

  const stored = safeGet(STORAGE.theme);
  const isDark = resolveTheme(stored, PREFERS_DARK);

  applyTheme(isDark);
  toggle.checked = isDark;
  toggle.setAttribute('aria-checked', String(isDark));

  toggle.addEventListener('change', () => {
    applyTheme(toggle.checked);
    safeSet(STORAGE.theme, toggle.checked ? 'dark' : 'light');
    toggle.setAttribute('aria-checked', String(toggle.checked));
  });
}

function applyTheme(isDark) {
  const root = document.documentElement;
  // 1. Desactivamos transitions y ocultamos los 1px que viven en capas
  //    compositadas (header sticky, secciones con transform). Esas capas
  //    pueden tardar 1 frame en repintarse y mostrar el color stale del
  //    tema anterior — sin esto se ve una "línea blanca" bajo el header
  //    al pasar de claro a oscuro.
  root.classList.add('no-theme-transition', 'theme-swap');
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) {
    themeMeta.setAttribute('content', isDark ? '#0e0d0b' : '#f3eee2');
  }
  // 2. Forzamos reflow y esperamos dos rAF para que el compositor tenga
  //    la textura nueva antes de restaurar los pseudo-elementos.
  void root.offsetHeight;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove('no-theme-transition', 'theme-swap');
    });
  });
}

/* ── Language ────────────────────────────────────────── */
let cachedLangBtns = null;
let cachedI18nEls = null;
let cachedI18nPlaceholderEls = null;

function initLanguage() {
  const stored = safeGet(STORAGE.lang) || 'es';

  cachedLangBtns = Array.from(document.querySelectorAll('.lang-btn'));
  cachedLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang !== document.documentElement.lang) {
        setLanguage(btn.dataset.lang);
      }
    });
  });

  setLanguage(stored);
}

function setLanguage(lang) {
  safeSet(STORAGE.lang, lang);
  document.documentElement.lang = lang;

  if (!cachedLangBtns) cachedLangBtns = Array.from(document.querySelectorAll('.lang-btn'));
  cachedLangBtns.forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  if (!cachedI18nEls) cachedI18nEls = Array.from(document.querySelectorAll('[data-i18n]'));
  if (!cachedI18nPlaceholderEls) cachedI18nPlaceholderEls = Array.from(document.querySelectorAll('[data-i18n-placeholder]'));

  cachedI18nEls.forEach(el => {
    const value = lookup(translations, lang, el.dataset.i18n);
    if (value === undefined) return;
    // Solo usamos innerHTML cuando la traducción contiene marcado
    // intencional (ej. <strong>). El resto va por textContent.
    if (hasHtml(value)) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });
  cachedI18nPlaceholderEls.forEach(el => {
    const value = lookup(translations, lang, el.dataset.i18nPlaceholder);
    if (value !== undefined) el.setAttribute('placeholder', value);
  });

  document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

/* ── Dropdowns (escritorio) ───────────────────────────── */
function initDropdowns() {
  const items = document.querySelectorAll('.has-dropdown');
  if (!items.length) return;

  items.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    const dropdown = item.querySelector('.dropdown-menu');
    if (!toggle || !dropdown) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');

      /* cierra los demás dropdowns */
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const otherToggle = other.querySelector('.dropdown-toggle');
          if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        }
      });

      /* abre o cierra este */
      if (isOpen) {
        item.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });

    dropdown.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        item.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Cierra al hacer click fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      items.forEach(item => {
        item.classList.remove('open');
        const toggle = item.querySelector('.dropdown-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Cierra con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    items.forEach(item => {
      item.classList.remove('open');
      const toggle = item.querySelector('.dropdown-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Menú hamburguesa (móvil) ─────────────────────────── */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    nav.classList.add('open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerrar menú al hacer click en enlace
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // Cerrar menú con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ── Lenis smooth scroll ──────────────────────────────── */
let lenis = null;
let lenisRafId = null;
let lenisRunning = false;
function initLenis() {
  if (PREFERS_REDUCED_MOTION) return;
  if (typeof window.Lenis !== 'function') return;

  lenis = new window.Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  function raf(time) {
    lenis.raf(time);
    if (lenisRunning) lenisRafId = requestAnimationFrame(raf);
  }

  lenisRunning = true;
  lenisRafId = requestAnimationFrame(raf);

  // El bucle se detiene solo cuando el lightbox está abierto.
  const stopWhen = ['lightbox-open'];
  const observer = new MutationObserver(() => {
    const blocked = stopWhen.some(c => document.body.classList.contains(c));
    if (blocked) {
      lenisRunning = false;
      if (lenisRafId) { cancelAnimationFrame(lenisRafId); lenisRafId = null; }
      lenis.stop();
    } else if (!lenisRunning) {
      lenisRunning = true;
      lenis.start();
      lenisRafId = requestAnimationFrame(raf);
    }
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

/* ── Smooth scroll para enlaces de anclaje ────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      if (lenis) {
        const headerH = document.querySelector('header')?.offsetHeight || 0;
        lenis.scrollTo(target, { offset: -headerH, duration: 1.2 });
      } else {
        target.scrollIntoView({
          behavior: PREFERS_REDUCED_MOTION ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/* ── Scroll effects (single rAF for progress · header shrink) ── */
function initScrollFx() {
  const progress = document.getElementById('scroll-progress');
  const header   = document.querySelector('header');

  let ticking = false;

  const update = () => {
    const y    = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.width = computeScrollProgress(y, docH) + '%';
    if (header)   header.classList.toggle('scrolled', isScrolled(y, SCROLL_HEADER_THRESHOLD));

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();

  // Scroll-triggered fade-ins (one-shot). El contenido es visible por
  // defecto (sin clase .js no se oculta); aquí solo se anima.
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-fade').forEach(el => fadeObs.observe(el));
}

/* ── Animated counters (ease-out-cubic) ──────────────── */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  // guardamos el valor original como data-attribute para evitar que se pierda
  nums.forEach(el => {
    if (!el.dataset.target) el.dataset.target = el.textContent.trim();
    el.textContent = '0';
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      requestAnimationFrame(() => animateNumber(e.target));
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  nums.forEach(el => obs.observe(el));
}

function animateNumber(el) {
  const { raw, hasSuffix } = parseCountTarget(el.dataset.target || el.textContent);
  if (!raw) return;

  if (PREFERS_REDUCED_MOTION) {
    el.textContent = formatCount(raw, hasSuffix);
    return;
  }

  const start = performance.now();

  const tick = now => {
    const t    = Math.min((now - start) / COUNTER_DURATION, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val  = Math.round(ease * raw);
    el.textContent = formatCount(val, hasSuffix);
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

/* ── Footer year ─────────────────────────────────────── */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Formulario de contacto ──────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit');
  const submitLbl = form.querySelector('.form-submit-label');
  const feedback  = form.querySelector('.form-feedback');
  const honeypot  = form.querySelector('input[name="website"]');
  if (!submitBtn || !submitLbl) return;

  // Placeholders iniciales (setLanguage ya los reaplica al cambiar idioma)
  applyPlaceholders();

  let feedbackTimer = null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Spam check — bots fill hidden field
    if (isHoneypotTriggered(honeypot && honeypot.value)) {
      showFeedback('success'); // pretend success
      return;
    }

    // Limpia errores previos antes de validar
    form.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));

    if (!form.checkValidity()) {
      form.reportValidity();
      markInvalidFields(form);
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    const originalLabel = submitLbl.textContent;
    submitLbl.textContent = dict('contact.submit-loading') || 'Enviando…';

    try {
      // Simulate API call — replace with real fetch() in production
      await new Promise(r => setTimeout(r, SUBMIT_SIM_DELAY));
      form.reset();
      showFeedback('success');
    } catch {
      showFeedback('error');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitLbl.textContent = originalLabel;
    }
  });

  function markInvalidFields(f) {
    f.querySelectorAll('input, select, textarea').forEach(el => {
      if (!el.checkValidity()) el.setAttribute('aria-invalid', 'true');
    });
  }

  function showFeedback(type) {
    if (!feedback) return;
    if (feedbackTimer) clearTimeout(feedbackTimer);
    feedback.className = 'form-feedback ' + type;
    feedback.textContent = dict(`contact.${type}`) || '';
    if (type === 'success') {
      feedbackTimer = setTimeout(() => {
        feedback.className = 'form-feedback';
        feedback.textContent = '';
      }, FEEDBACK_HIDE_MS);
    }
  }

  function applyPlaceholders() {
    form.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const value = dict(el.dataset.i18nPlaceholder);
      if (value) el.setAttribute('placeholder', value);
    });
  }
}

function dict(key) {
  const lang = document.documentElement.lang || 'es';
  return (translations[lang] || translations.es)[key];
}

/* ── Filtro de colección (tabs) ──────────────────────── */
function initCollectionTabs() {
  const BOOKS_LIMIT = 4;
  const tabs  = Array.from(document.querySelectorAll('.tab-btn'));
  const cards = Array.from(document.querySelectorAll('.book-card'));
  const grid  = document.getElementById('books-grid');
  const moreBtn = document.getElementById('books-show-more');
  const moreWrap = moreBtn ? moreBtn.parentElement : null;
  if (!tabs.length || !cards.length) return;

  // Marca .over-limit las cards visibles que excedan el límite y
  // muestra/oculta el botón "mostrar más" según haga falta.
  function applyLimit() {
    let visibleCount = 0;
    cards.forEach(card => {
      if (card.classList.contains('hidden')) {
        card.classList.remove('over-limit');
        return;
      }
      visibleCount++;
      if (visibleCount > BOOKS_LIMIT) {
        card.classList.add('over-limit');
      } else {
        card.classList.remove('over-limit');
      }
    });
    const overflow = computeOverflow(visibleCount, BOOKS_LIMIT);
    if (moreWrap) moreWrap.style.display = overflow > 0 ? 'flex' : 'none';
  }

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.tab;

      tabs.forEach(t => {
        const active = t === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
      });
      if (grid) grid.setAttribute('aria-labelledby', tab.id);

      cards.forEach(card => {
        const show = shouldShowCard(card.dataset.category || '', filter);
        card.classList.toggle('hidden', !show);
      });

      // al cambiar de filtro, replegamos y recalculamos el límite
      if (grid) {
        grid.classList.add('collapsed');
        if (moreBtn) {
          moreBtn.setAttribute('aria-expanded', 'false');
          const span = moreBtn.querySelector('span');
          if (span) span.textContent = dict('collection.show-more');
        }
        grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      applyLimit();
    });

    // Navegación por flechas (patrón APG de tabs)
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(idx + dir + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });

  // botón mostrar más / menos
  if (moreBtn && grid) {
    moreBtn.addEventListener('click', () => {
      const isCollapsed = grid.classList.toggle('collapsed');
      moreBtn.setAttribute('aria-expanded', String(!isCollapsed));
      const span = moreBtn.querySelector('span');
      if (span) span.textContent = dict(isCollapsed ? 'collection.show-more' : 'collection.show-less');
    });
  }

  // estado inicial
  applyLimit();
}

/* ── Lightbox de la galería ──────────────────────────── */
function initLightbox() {
  const grid     = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  const items    = Array.from(grid.querySelectorAll('.gallery-item'));
  if (!items.length) return;

  const imgEl    = document.getElementById('lightbox-img');
  const capEl    = document.getElementById('lightbox-caption');
  const counter  = document.getElementById('lightbox-counter');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev  = document.getElementById('lightbox-prev');
  const btnNext  = document.getElementById('lightbox-next');
  const headerEl = document.querySelector('header');
  const footerEl = document.querySelector('footer');

  const sources = items.map(btn => {
    const img = btn.querySelector('img');
    return { src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' };
  });

  let current = 0;
  let lastTrigger = null;

  // Aisla el fondo (header/footer) cuando el diálogo modal está abierto.
  function setBackgroundInert(on) {
    [headerEl, footerEl].forEach(el => { if (el) el.inert = on; });
  }

  function render() {
    const { src, alt } = sources[current];
    imgEl.src = src;
    imgEl.alt = alt;
    capEl.textContent = alt;
    counter.textContent = `${current + 1} / ${sources.length}`;
  }

  function open(index, trigger) {
    current = wrapIndex(index, sources.length);
    lastTrigger = trigger || null;
    render();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    setBackgroundInert(true);
    btnClose.focus();
  }

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    setBackgroundInert(false);
    imgEl.removeAttribute('src');
    if (lastTrigger) lastTrigger.focus();
  }

  function step(delta) {
    current = wrapIndex(current + delta, sources.length);
    render();
  }

  items.forEach((btn, i) => {
    btn.addEventListener('click', () => open(i, btn));
  });

  // botón mostrar más / menos
  const moreBtn  = document.getElementById('gallery-show-more');
  const moreWrap = moreBtn ? moreBtn.parentElement : null;
  if (moreBtn && moreWrap) {
    moreBtn.addEventListener('click', () => {
      const isCollapsed = grid.classList.toggle('collapsed');
      moreBtn.setAttribute('aria-expanded', String(!isCollapsed));
      const span = moreBtn.querySelector('span');
      if (span) span.textContent = dict(isCollapsed ? 'gallery.show-more' : 'gallery.show-less');
    });
  }

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => step(-1));
  btnNext.addEventListener('click', () => step(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')        { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowLeft')     { e.preventDefault(); step(-1); return; }
    if (e.key === 'ArrowRight')    { e.preventDefault(); step(1);  return; }

    // Focus trap: keep Tab cycling within the lightbox controls
    if (e.key === 'Tab') {
      const focusable = [btnClose, btnPrev, btnNext];
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    }
  });

  // swipe táctil
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  }, { passive: true });
}
