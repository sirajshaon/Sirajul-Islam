/* ================================================================
   gallery.js — Category filter, project filter, lightbox w/ keyboard nav
   Works with items rendered dynamically by render.js
   ================================================================ */

const Gallery = (() => {

  /* ── Gallery category filter ─────────────────────────────── */
  function initFilter() {
    const tabs  = document.querySelectorAll('.gallery-tab');
    const items = () => document.querySelectorAll('.gallery-item'); // live query
    if (!tabs.length) return;

    tabs.forEach(tab => {
      // Remove old listeners before re-binding
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
      newTab.addEventListener('click', () => {
        document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
        newTab.classList.add('active');
        const cat = newTab.dataset.cat;
        let shown = 0;
        items().forEach(item => {
          const match = cat === 'all' || item.dataset.cat === cat;
          item.dataset.hidden = match ? 'false' : 'true';
          if (match) shown++;
        });
        // Update count display
        const countEl = document.getElementById('gallery-count');
        if (countEl) countEl.textContent = shown + ' photos';
      });
    });
  }

  /* ── Project filter ──────────────────────────────────────── */
  function initProjectFilter() {
    document.querySelectorAll('.filter-btn[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn[data-cat]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        document.querySelectorAll('.project-card[data-cat]').forEach(card => {
          card.dataset.hidden = (cat === 'all' || card.dataset.cat === cat) ? 'false' : 'true';
        });
      });
    });
  }

  /* ── Lightbox ────────────────────────────────────────────── */
  let lightboxImages = [];
  let currentIndex   = 0;

  function buildImageList() {
    lightboxImages = [];
    document.querySelectorAll('.gallery-item:not([data-hidden="true"])').forEach((item, i) => {
      const img     = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');
      lightboxImages.push({ src: img ? img.src : '', caption: caption ? caption.textContent : '', el: item, index: i });
    });
  }

  function openLightbox(triggerEl) {
    buildImageList();
    const box = document.getElementById('lightbox');
    if (!box) return;
    const found = lightboxImages.find(x => x.el === triggerEl);
    currentIndex = found ? found.index : 0;
    showLightboxImage();
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const box = document.getElementById('lightbox');
    if (box) box.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showLightboxImage() {
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    const item = lightboxImages[currentIndex];
    if (!item || !img) return;
    img.src = item.src;
    if (cap) cap.textContent = item.caption;
  }

  function prevImage() { currentIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length; showLightboxImage(); }
  function nextImage() { currentIndex = (currentIndex + 1) % lightboxImages.length; showLightboxImage(); }

  function bindTriggers() {
    document.querySelectorAll('.gallery-item').forEach(item => {
      // Clone to remove any stale listeners
      const clone = item.cloneNode(true);
      item.parentNode.replaceChild(clone, item);
      clone.addEventListener('click', () => openLightbox(clone));
    });
  }

  function bindCertTriggers() {
    document.querySelectorAll('.cert-item').forEach(item => {
      const btn = item.querySelector('.cert-btn-view');
      if (!btn) return;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const thumb = item.querySelector('.cert-thumb');
        const title = item.querySelector('.cert-title');
        const box   = document.getElementById('lightbox');
        const img   = document.getElementById('lightbox-img');
        const cap   = document.getElementById('lightbox-caption');
        if (!box || !thumb) return;
        img.src = thumb.src;
        if (cap) cap.textContent = title ? title.textContent : '';
        box.classList.add('open');
        document.body.style.overflow = 'hidden';
        lightboxImages = [];
      });
    });
  }

  /* Keyboard + backdrop close */
  document.addEventListener('keydown', e => {
    const box = document.getElementById('lightbox');
    if (!box?.classList.contains('open')) return;
    if (e.key === 'Escape')       closeLightbox();
    if (e.key === 'ArrowLeft')    prevImage();
    if (e.key === 'ArrowRight')   nextImage();
  });
  document.addEventListener('click', e => {
    const box = document.getElementById('lightbox');
    if (box && e.target === box) closeLightbox();
  });

  /* Expose globals used by inline HTML onclick= */
  window.closeLightbox = closeLightbox;
  window.prevImage     = prevImage;
  window.nextImage     = nextImage;

  function init() {
    initFilter();
    initProjectFilter();
    bindTriggers();
    bindCertTriggers();
  }

  document.addEventListener('DOMContentLoaded', init);
  return { rebind: init };
})();
