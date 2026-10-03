/* =====================================================================
 * FEATURE FLAGS — switch these without touching anything else.
 * ===================================================================== */

// Show the EN / عربي language toggle in the header.
// false (client's current choice): page is English only, lang="en" dir="ltr",
// and any stored language choice or ?lang= parameter is ignored.
const SHOW_LANGUAGE_TOGGLE = false;

// Fade/slide the three "uniques" tiles in as they scroll into view.
// Always skipped when the visitor prefers reduced motion.
const ANIMATE_UNIQUES = true;

/* ===================================================================== */

const COPY = {
  en: {
    lang: 'en',
    dir: 'ltr',
    soon: 'Coming soon to Saudi Arabia',
    headline: 'Functional English to achieve your goals.',
    cta: 'Contact Us',
    differenceHeading: 'The Gateway Difference',
    about: 'Gateway English blends in-person engagement with modern technology to help individuals and businesses communicate confidently, compete effectively, and thrive in the marketplace.',
    uniques: [
      'Cambridge-certified, Native English Trainers',
      'In-Person learning at satellite branches in mid-sized Saudi cities',
      'At-Home learning with AI tools'
    ],
    contactName: 'Reagan White',
    contactRole: 'Founder and General Manager',
    contactEmail: 'reagan@gatewayenglishcenter.com'
  },
  ar: {
    lang: 'ar',
    dir: 'rtl',
    soon: 'قريباً في المملكة العربية السعودية',
    headline: 'لغة إنجليزية عملية لتحقيق أهدافك.',
    cta: 'تواصل معنا',
    differenceHeading: 'ميزة القيتوي',
    about: 'يمزج معهد قيتوي للغة الإنجليزية بين التفاعل الحضوري والتقنيات الحديثة لمساعدة الأفراد والشركات على التواصل بثقة، والمنافسة بفعالية، والازدهار في سوق العمل.',
    uniques: [
      'مدربون ناطقون أصليون بالإنجليزية حاصلون على شهادة كامبريدج',
      'دروس حضورية في فروعنا بالمدن السعودية متوسطة الحجم',
      'دروس منزلية بأدوات الذكاء الاصطناعي'
    ],
    contactName: 'Reagan White',
    contactRole: 'المؤسس والمدير العام',
    contactEmail: 'reagan@gatewayenglishcenter.com'
  }
};

const STORAGE_KEY = 'gateway-lang';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Language ---------- */

function lookup(strings, path) {
  return path.split('.').reduce((value, key) => (value == null ? value : value[key]), strings);
}

function applyLanguage(lang) {
  const strings = COPY[lang];
  const root = document.documentElement;
  root.lang = strings.lang;
  root.dir = strings.dir;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const text = lookup(strings, el.dataset.i18n);
    if (typeof text === 'string') el.textContent = text;
  });

  document.querySelectorAll('.lang-toggle [data-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
  });
}

function initialLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (Object.hasOwn(COPY, fromUrl ?? '')) return fromUrl;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (Object.hasOwn(COPY, stored ?? '')) return stored;
  } catch (e) {
    // Storage unavailable (private mode, blocked site data) — fall through.
  }
  return 'en';
}

function initLanguageToggle() {
  const toggle = document.querySelector('.lang-toggle');
  if (!SHOW_LANGUAGE_TOGGLE || !toggle) return;

  toggle.hidden = false;
  toggle.addEventListener('click', (event) => {
    const button = event.target.closest('[data-lang]');
    if (!button) return;
    const lang = button.dataset.lang;
    applyLanguage(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // Ignore — the choice just won't persist.
    }
  });

  const lang = initialLanguage();
  if (lang !== 'en') applyLanguage(lang);
}

/* ---------- Uniques scroll reveal ---------- */

function initUniquesReveal() {
  if (!ANIMATE_UNIQUES || prefersReducedMotion) return;
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;

  const tiles = Array.from(document.querySelectorAll('.unique'));
  const hidden = { opacity: 0, transform: 'translateY(24px)' };

  // Hidden start state is applied here, not in CSS, so tiles stay visible if JS fails.
  tiles.forEach((tile) => Object.assign(tile.style, hidden));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const tile = entry.target;
      observer.unobserve(tile);
      tile.animate([hidden, { opacity: 1, transform: 'none' }], {
        duration: 600,
        delay: tiles.indexOf(tile) * 120,
        easing: 'cubic-bezier(.2, .7, .2, 1)',
        fill: 'backwards'
      });
      tile.style.opacity = '';
      tile.style.transform = '';
    });
  }, { threshold: 0.25 });

  tiles.forEach((tile) => observer.observe(tile));
}

initLanguageToggle();
initUniquesReveal();
