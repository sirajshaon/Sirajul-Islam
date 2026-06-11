/* ================================================================
   main.js — Loading, Navbar, Theme, Typewriter, Scroll-reveal,
             Skill bars. Reads from SiteData when available.
   ================================================================ */

/* ── Loading screen ─────────────────────────────────────────── */
const Loading = (() => {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;
  window.addEventListener('load', () => setTimeout(() => screen.classList.add('hidden'), 2400));
})();

/* ── Navbar: scroll shadow + hamburger + active links ───────── */
const Navbar = (() => {
  const nav  = document.getElementById('navbar');
  const hbg  = document.getElementById('hamburger');
  const mob  = document.getElementById('nav-mobile');
  if (!nav) return;

  /* Scroll shadow */
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 55); highlightActive(); }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* Hamburger */
  if (hbg && mob) {
    hbg.addEventListener('click', () => { hbg.classList.toggle('open'); mob.classList.toggle('open'); });
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { hbg.classList.remove('open'); mob.classList.remove('open'); }));
  }

  /* Active link by scroll */
  function highlightActive() {
    const links    = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = [...document.querySelectorAll('section[id]')];
    if (!sections.length || !links.length) return;
    let cur = sections[0].id;
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }

  /* Highlight active page link for subpages */
  const page = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (page && page !== 'index.html' && href.includes(page)) a.classList.add('active');
  });

  /* Populate nav logo name + hero data-personal attributes from SiteData */
  if (window.SiteData) {
    document.querySelectorAll('[data-personal]').forEach(el => {
      const key = el.dataset.personal;
      const val = SiteData.personal[key];
      if (val !== undefined) el.textContent = val;
    });
  }
})();

/* ── Theme: dark / light with localStorage ──────────────────── */
const Theme = (() => {
  const toggle = document.getElementById('theme-toggle');
  const KEY    = 'si-theme';
  if (localStorage.getItem(KEY) === 'light') document.body.classList.add('light');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    localStorage.setItem(KEY, isLight ? 'light' : 'dark');
  });
})();

/* ── Typewriter: reads titles from SiteData ─────────────────── */
const Typewriter = (() => {
  const el = document.getElementById('hero-rotating');
  if (!el) return;
  const titles = (window.SiteData && SiteData.personal.rotatingTitles) || [
    'Power System Engineer','Grid Substation Professional',
    'Electrical Engineer','Creative Technologist','Problem Solver',
  ];
  let ti=0, ci=0, del=false;
  function tick() {
    const w = titles[ti];
    if (!del) { el.textContent = w.substring(0, ci+1); ci++; if(ci===w.length){setTimeout(()=>{del=true;tick();},1900);return;} }
    else       { el.textContent = w.substring(0, ci-1); ci--; if(ci===0){del=false;ti=(ti+1)%titles.length;} }
    setTimeout(tick, del ? 42 : 90);
  }
  setTimeout(tick, 2600);
})();

/* ── Scroll reveal ──────────────────────────────────────────── */
const Animations = (() => {
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('revealed');obs.unobserve(e.target);} });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal:not(.revealed)').forEach(el => obs.observe(el));
  }
  initReveal();
  /* Re-run reveal after dynamic content renders */
  const mo = new MutationObserver(() => initReveal());
  mo.observe(document.body, { childList:true, subtree:true });

  /* Skill bar animation */
  const sObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        const fill = e.target.querySelector('.skill-fill');
        if(fill) setTimeout(()=>{fill.style.width=(e.target.dataset.level||0)+'%';},200);
        sObs.unobserve(e.target);
      }
    });
  }, { threshold:0.3 });
  const mo2 = new MutationObserver(() => {
    document.querySelectorAll('.skill-card[data-level]').forEach(c => sObs.observe(c));
  });
  mo2.observe(document.body, { childList:true, subtree:true });

  /* Smooth scroll */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth' }); }
  });

  /* Responsive personality grid */
  function adjustPersonality() {
    document.querySelectorAll('#personality-container > div').forEach(g => {
      if (g.style.gridTemplateColumns !== undefined) {
        g.style.gridTemplateColumns = window.innerWidth < 820 ? '1fr' : '';
        g.style.gap                 = window.innerWidth < 820 ? '2.5rem' : '';
      }
    });
  }
  window.addEventListener('resize', adjustPersonality);
})();
