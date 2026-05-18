const PREFERS_REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const STORAGE = {
  lang:  'palafoxiana.lang',
  theme: 'palafoxiana.theme',
};

const NUMBER_FMT = new Intl.NumberFormat('es-MX');

let i18nEls = [];
let i18nPlaceholderEls = [];

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
    'nav.books-digital':     'Digitalizaciones ↗',
    'nav.books-pubs':        'Publicaciones ↗',
    'nav.books-galleries':   'Galerías ↗',
    'nav.guide':             'Guía',
    'nav.guide-app':         'App ↗',

    /* hero */
    'hero.badge':    'UNESCO · Memoria del Mundo · 2005',
    'hero.cta':      'Solicitar visita guiada',
    'hero.title':    'Biblioteca<br>Palafoxiana',
    'hero.subtitle': 'La primera biblioteca pública de América',
    'hero.location': 'Puebla, México',

    /* visit */
    'visit.tag':              'Acceso',
    'visit.title':            'Cómo visitarnos',
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
    'timeline.1646': 'Fundación',
    'timeline.1773': 'Recinto actual',
    'timeline.1821': 'Independencia',
    'timeline.1981': 'Monumento Histórico',
    'timeline.2005': 'UNESCO',
    'timeline.2014': 'Restauración',
    'event.1646.title': 'Donación fundacional',
    'event.1646.body':  'El obispo de Puebla <strong>Juan de Palafox y Mendoza</strong> entregó al Colegio de San Juan su biblioteca personal de 5,000 volúmenes, bajo la condición de que cualquier persona alfabetizada pudiera acceder libremente a ella. Este acto inaugural convirtió a la Palafoxiana en la primera biblioteca pública de América.',
    'event.1773.title': 'Recinto de Fabián y Fuero',
    'event.1773.body':  'El obispo <strong>Francisco Fabián y Fuero</strong> ordenó la construcción del recinto que conocemos hoy: una sala de <strong>43 metros de longitud</strong> con tres niveles de estantería tallada en cedro y ayacahuite. Los estantes —que albergan más de 41,000 volúmenes encuadernados en piel— permanecen intactos desde entonces.',
    'event.1821.title': 'Independencia y patrimonio nacional',
    'event.1821.body':  'Con la consumación de la Independencia de México, la Biblioteca Palafoxiana pasó de la tutela eclesiástica al patrimonio civil del Estado. La institución continuó abierta al público, reafirmando su vocación de acceso universal al conocimiento en el México recién nacido.',
    'event.1981.title': 'Monumento Histórico Nacional',
    'event.1981.body':  'El <strong>Instituto Nacional de Antropología e Historia (INAH)</strong> declaró la Biblioteca Palafoxiana Monumento Histórico Nacional, reconociendo el valor excepcional de su recinto, su mobiliario original del siglo XVIII y su acervo bibliográfico como legado del patrimonio mexicano.',
    'event.2005.title': 'UNESCO · Memoria del Mundo',
    'event.2005.body':  'La <strong>UNESCO</strong> inscribió el acervo de la Biblioteca Palafoxiana en el Registro Internacional de la Memoria del Mundo, reconociendo sus más de 45,000 volúmenes —entre ellos incunables y manuscritos únicos— como patrimonio documental de la humanidad. Fue el primer acervo mexicano en recibir esta distinción.',
    'event.2014.title': 'Restauración integral',
    'event.2014.body':  'Una extensa intervención de restauración consolidó los estantes originales de cedro y ayacahuite del siglo XVIII, trató los volúmenes más deteriorados y actualizó las condiciones de climatización y conservación del recinto para preservar el acervo para las generaciones venideras.',

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
    'hero.cta':      'Request a guided tour',
    'hero.title':    'Library<br>Palafoxiana',
    'hero.subtitle': 'The first public library in the Americas',
    'hero.location': 'Puebla, Mexico',

    /* visit */
    'visit.tag':              'Access',
    'visit.title':            'Visiting the library',
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
    'timeline.1646': 'Foundation',
    'timeline.1773': 'Current hall',
    'timeline.1821': 'Independence',
    'timeline.1981': 'Historic Monument',
    'timeline.2005': 'UNESCO',
    'timeline.2014': 'Restoration',
    'event.1646.title': 'Foundation donation',
    'event.1646.body':  'Bishop <strong>Juan de Palafox y Mendoza</strong> of Puebla donated his personal library of 5,000 volumes to the Colegio de San Juan, on the condition that any literate person could freely access it. This inaugural act established the Palafoxiana as the first public library in the Americas.',
    'event.1773.title': 'Fabián y Fuero hall',
    'event.1773.body':  'Bishop <strong>Francisco Fabián y Fuero</strong> commissioned the hall we see today: <strong>43 metres long</strong> with three tiers of shelving carved in cedar and ayacahuite. The shelves — holding over 41,000 leather-bound volumes — have remained intact ever since.',
    'event.1821.title': 'Independence and national heritage',
    'event.1821.body':  'With Mexican independence, the Palafoxiana passed from ecclesiastical custody to civil state patrimony. The institution remained open to the public, reaffirming its vocation of universal access to knowledge in the newly born Mexican nation.',
    'event.1981.title': 'National Historic Monument',
    'event.1981.body':  'Mexico\'s <strong>National Institute of Anthropology and History (INAH)</strong> declared the Palafoxiana a National Historic Monument, recognising the outstanding value of its hall, original 18th-century furniture and bibliographic collection as an essential part of Mexican heritage.',
    'event.2005.title': 'UNESCO · Memory of the World',
    'event.2005.body':  '<strong>UNESCO</strong> inscribed the Palafoxiana collection in its International Memory of the World Register, recognising its 45,000 volumes — including unique incunabula and manuscripts — as documentary heritage of humanity. It was the first Mexican collection to receive this distinction.',
    'event.2014.title': 'Comprehensive restoration',
    'event.2014.body':  'A major restoration project consolidated the original 18th-century cedar and ayacahuite shelving, treated the most deteriorated volumes, and updated the climate-control and conservation systems of the hall to preserve the collection for future generations.',

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
  initParallax();
  initDropdowns();
  initMobileMenu();
  initSmoothScroll();
  initScrollFx();
  initTimeline();
  initCounters();
  initCollectionTabs();
  initContactForm();
  initFooterYear();
  initLightbox();
});

/* ── Theme ───────────────────────────────────────────── */
function initTheme(){
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Migrate legacy storage keys
  const legacyDark = localStorage.getItem('darkMode');
  const legacyLang = localStorage.getItem('lang');
  if (legacyDark !== null && localStorage.getItem(STORAGE.theme) === null){
    localStorage.setItem(STORAGE.theme, legacyDark === 'true' ? 'dark' : 'light');
    localStorage.removeItem('darkMode');
  }
  if (legacyLang !== null && localStorage.getItem(STORAGE.lang) === null){
    localStorage.setItem(STORAGE.lang, legacyLang);
    localStorage.removeItem('lang');
  }

  const stored = localStorage.getItem(STORAGE.theme);
  const isDark = stored
    ? stored === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

  applyTheme(isDark);
  toggle.checked = isDark;

  toggle.addEventListener('change', () => {
    applyTheme(toggle.checked);
    localStorage.setItem(STORAGE.theme, toggle.checked ? 'dark' : 'light');
  });
}

function applyTheme(isDark){
  const root = document.documentElement;
  root.classList.add('no-theme-transition', 'theme-swap');
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark ? '#0e0d0b' : '#f3eee2');
  void root.offsetHeight;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove('no-theme-transition', 'theme-swap');
    });
  });
}

/* ── Language ────────────────────────────────────────── */
function initLanguage(){
  i18nEls = Array.from(document.querySelectorAll('[data-i18n]'));
  i18nPlaceholderEls = Array.from(document.querySelectorAll('[data-i18n-placeholder]'));

  const stored = localStorage.getItem(STORAGE.lang) || 'es';

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.lang !== document.documentElement.lang){
        setLanguage(btn.dataset.lang);
      }
    });
  });

  setLanguage(stored);
}

function setLanguage(lang){
  localStorage.setItem(STORAGE.lang, lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  const t = translations[lang] || translations.es;
  // innerHTML is intentional: some values contain <br> and <strong>. Values are hardcoded above, not user-supplied.
  i18nEls.forEach(el => {
    const value = t[el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  });
  i18nPlaceholderEls.forEach(el => {
    const value = t[el.dataset.i18nPlaceholder];
    if (value !== undefined) el.setAttribute('placeholder', value);
  });

  document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
}

function initDropdowns(){
  const items = document.querySelectorAll('.has-dropdown');
  if (!items.length) return;

  const toggleMap = new Map();

  items.forEach(item => {
    const toggle = item.querySelector('.dropdown-toggle');
    const dropdown = item.querySelector('.dropdown-menu');
    if (!toggle || !dropdown) return;

    toggleMap.set(item, toggle);

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');

      /* cierra los demás dropdowns */
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          toggleMap.get(other)?.setAttribute('aria-expanded', 'false');
        }
      });

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

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')){
      items.forEach(item => {
        item.classList.remove('open');
        toggleMap.get(item)?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

function initMobileMenu(){
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

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ── Lenis smooth scroll ─────────────────────────────── */
let lenis = null;
function initLenis(){
  if (PREFERS_REDUCED_MOTION) return;
  if (typeof window.Lenis !== 'function') return; 

  lenis = new window.Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false, // móvil mantiene el scroll nativo 
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  let rafId = null;

  function raf(time){
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  function startRaf(){ if (rafId === null) rafId = requestAnimationFrame(raf); }
  function stopRaf(){
    if (rafId !== null){ cancelAnimationFrame(rafId); rafId = null; }
  }

  startRaf();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopRaf(); else startRaf();
  });

  // Si abrimos el lightbox o el menú móvil, paramos Lenis para que el body
  // no compita con el overlay scrolleable
  const stopWhen = ['lightbox-open'];
  const observer = new MutationObserver(() => {
    const blocked = stopWhen.some(c => document.body.classList.contains(c));
    if (blocked) lenis.stop(); else lenis.start();
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

function initSmoothScroll(){
  const header = document.querySelector('header');
  let headerH = header?.offsetHeight || 0;

  window.addEventListener('resize', () => {
    headerH = header?.offsetHeight || 0;
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e){
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      if (lenis){
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

function initParallax(){
  const img = document.querySelector('.hero-img');
  if (!img || PREFERS_REDUCED_MOTION) return;

  const FACTOR = 0.35;
  let ticking = false;

  const update = () => {
    img.style.transform = `translateY(${window.scrollY * FACTOR}px)`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
}

function initScrollFx(){
  const progress = document.getElementById('scroll-progress');
  const header   = document.querySelector('header');

  let docH = document.documentElement.scrollHeight - window.innerHeight;
  let ticking = false;

  window.addEventListener('resize', () => {
    docH = document.documentElement.scrollHeight - window.innerHeight;
  }, { passive: true });

  const update = () => {
    const y = window.scrollY;
    if (progress) progress.style.width = docH > 0 ? (y / docH * 100) + '%' : '0';
    if (header)   header.classList.toggle('scrolled', y > 60);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking){
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();

  // Scroll-triggered fade-ins (one-shot)
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('visible');
        fadeObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-fade').forEach(el => fadeObs.observe(el));
}

function initTimeline(){
  const tabs  = document.querySelectorAll('.timeline-item[role="tab"]');
  const panel = document.getElementById('historia-panel');
  if (!tabs.length || !panel) return;

  const intro  = panel.querySelector('.historia-intro');
  const events = panel.querySelectorAll('.historia-event');

  function showPane(pane){
    [intro, ...events].forEach(p => {
      p.classList.remove('is-active');
      if (p !== intro) p.setAttribute('aria-hidden', 'true');
    });
    pane.classList.add('is-active');
    if (pane !== intro) pane.removeAttribute('aria-hidden');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const year       = tab.dataset.year;
      const isSelected = tab.getAttribute('aria-selected') === 'true';

      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));

      if (isSelected){
        showPane(intro);
      } else {
        tab.setAttribute('aria-selected', 'true');
        const target = panel.querySelector(`.historia-event[data-year="${year}"]`);
        if (target) showPane(target);
      }
    });
  });
}

/* ── Animated counters (ease-out-cubic) ──────────────── */
function initCounters(){
  const nums = document.querySelectorAll('.stat-num');
  if (!nums.length) return;

  // guardamos el valor original como data-attribute
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

function animateNumber(el){
  const original  = (el.dataset.target || el.textContent).trim();
  const hasSuffix = original.endsWith('+');
  const raw       = parseInt(original.replace(/[^0-9]/g, ''), 10);
  if (!raw) return;

  if (PREFERS_REDUCED_MOTION){
    el.textContent = NUMBER_FMT.format(raw) + (hasSuffix ? '+' : '');
    return;
  }

  const dur   = 1600;
  const start = performance.now();

  const tick = now => {
    const t    = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val  = Math.round(ease * raw);
    el.textContent = NUMBER_FMT.format(val) + (hasSuffix ? '+' : '');
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

/* ── Footer year ─────────────────────────────────────── */
function initFooterYear(){
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

function initContactForm(){
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit');
  const submitLbl = form.querySelector('.form-submit-label');
  const feedback  = form.querySelector('.form-feedback');
  const honeypot  = form.querySelector('input[name="website"]');

  // Apply translated placeholders
  applyPlaceholders();
  document.addEventListener('languagechange', applyPlaceholders);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Spam check — bots fill hidden field
    if (honeypot && honeypot.value){
      showFeedback('success'); // pretend success
      return;
    }

    if (!form.checkValidity()){
      form.reportValidity();
      return;
    }

    // Loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    const originalLabel = submitLbl.textContent;
    submitLbl.textContent = dict('contact.submit-loading') || 'Sending…';

    try{
      // Simulate API call — replace with real fetch() in production
      await new Promise(r => setTimeout(r, 1200));
      form.reset();
      showFeedback('success');
    } catch (err){
      showFeedback('error');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitLbl.textContent = originalLabel;
    }
  });

  function showFeedback(type){
    if (!feedback) return;
    feedback.className = 'form-feedback ' + type;
    feedback.textContent = dict(`contact.${type}`) || '';
    if (type === 'success'){
      setTimeout(() => {
        feedback.className = 'form-feedback';
        feedback.textContent = '';
      }, 6000);
    }
  }

  function applyPlaceholders(){
    form.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const value = dict(el.dataset.i18nPlaceholder);
      if (value) el.setAttribute('placeholder', value);
    });
  }
}

function dict(key){
  const lang = document.documentElement.lang || 'es';
  return (translations[lang] || translations.es)[key];
}

/* filtro de colección */
function initCollectionTabs(){
  const BOOKS_LIMIT = 4;
  const tabs  = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.book-card');
  const grid  = document.getElementById('books-grid');
  const moreBtn = document.getElementById('books-show-more');
  const moreWrap = moreBtn ? moreBtn.parentElement : null;
  if (!tabs.length || !cards.length) return;

  function applyLimit(){
    let visibleCount = 0;
    let overflow = 0;
    cards.forEach(card => {
      if (card.classList.contains('hidden')){
        card.classList.remove('over-limit');
        return;
      }
      visibleCount++;
      if (visibleCount > BOOKS_LIMIT){
        card.classList.add('over-limit');
        overflow++;
      } else {
        card.classList.remove('over-limit');
      }
    });
    if (moreWrap){
      moreWrap.style.display = overflow > 0 ? 'flex' : 'none';
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.tab;

      tabs.forEach(t => {
        const active = t === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
      });

      cards.forEach(card => {
        const cats = (card.dataset.category || '').split(' ');
        const show = filter === 'todos' || cats.includes(filter);
        card.classList.toggle('hidden', !show);
      });

      if (grid){
        grid.classList.add('collapsed');
        if (moreBtn){
          moreBtn.setAttribute('aria-expanded', 'false');
          moreBtn.querySelector('span').textContent = dict('collection.show-more');
        }
      }
      applyLimit();
    });
  });

  if (moreBtn && grid){
    moreBtn.addEventListener('click', () => {
      const isCollapsed = grid.classList.toggle('collapsed');
      moreBtn.setAttribute('aria-expanded', String(!isCollapsed));
      moreBtn.querySelector('span').textContent = dict(isCollapsed ? 'collection.show-more' : 'collection.show-less');
    });
  }

  if (moreBtn) moreBtn.querySelector('span').textContent = dict('collection.show-more');

  document.addEventListener('languagechange', () => {
    if (!moreBtn || !grid) return;
    const isCollapsed = grid.classList.contains('collapsed');
    moreBtn.querySelector('span').textContent = dict(isCollapsed ? 'collection.show-more' : 'collection.show-less');
  });

  applyLimit();
}

/* ── Lightbox ──────────────────────────── */
function initLightbox(){
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

  const sources = items.map(btn => {
    const img = btn.querySelector('img');
    return { src: img.getAttribute('src'), alt: img.getAttribute('alt') || '' };
  });

  let current = 0;
  let lastTrigger = null;

  function render(){
    const { src, alt } = sources[current];
    imgEl.src = src;
    imgEl.alt = alt;
    capEl.textContent = alt;
    counter.textContent = `${current + 1} / ${sources.length}`;
  }

  function open(index, trigger){
    current = ((index % sources.length) + sources.length) % sources.length;
    lastTrigger = trigger || null;
    render();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    btnClose.focus();
  }

  function close(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    imgEl.src = '';
    if (lastTrigger) lastTrigger.focus();
  }

  function step(delta){
    current = (current + delta + sources.length) % sources.length;
    render();
  }

  const indexMap = new Map(items.map((btn, i) => [btn, i]));
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.gallery-item');
    if (!btn) return;
    const i = indexMap.get(btn);
    if (i !== undefined) open(i, btn);
  });

  const moreBtn  = document.getElementById('gallery-show-more');
  const moreWrap = moreBtn ? moreBtn.parentElement : null;
  if (moreBtn && moreWrap){
    moreBtn.addEventListener('click', () => {
      const isCollapsed = grid.classList.toggle('collapsed');
      moreBtn.setAttribute('aria-expanded', String(!isCollapsed));
      moreBtn.querySelector('span').textContent = dict(isCollapsed ? 'gallery.show-more' : 'gallery.show-less');
    });
  }

  if (moreBtn) moreBtn.querySelector('span').textContent = dict('gallery.show-more');

  document.addEventListener('languagechange', () => {
    if (!moreBtn || !grid) return;
    const isCollapsed = grid.classList.contains('collapsed');
    moreBtn.querySelector('span').textContent = dict(isCollapsed ? 'gallery.show-more' : 'gallery.show-less');
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => step(-1));
  btnNext.addEventListener('click', () => step(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')       { e.preventDefault(); close(); }
    else if (e.key === 'ArrowLeft')  { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
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