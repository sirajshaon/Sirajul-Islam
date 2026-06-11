/* ============================================================
   cursor.js — Custom cursor with smooth lag ring
   ============================================================ */

const Cursor = (() => {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let rafId = null;

  // Follow mouse precisely (dot)
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Smooth-lag ring animation
  function animateRing() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = Math.round(rx) + 'px';
    ring.style.top  = Math.round(ry) + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect — expand ring on interactive elements
  const interactors = 'a, button, .skill-card, .project-card, .gallery-item, .service-card, .blog-card, .social-profile-card, .cert-item, .filter-btn, .gallery-tab, .theme-toggle, input, textarea, [role="button"]';

  function onEnter() { document.body.classList.add('cursor-hover'); }
  function onLeave() { document.body.classList.remove('cursor-hover'); }

  function bindHover() {
    document.querySelectorAll(interactors).forEach(el => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
  }
  bindHover();

  // Click effect
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  // Hide on leave / show on enter
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

  // Public API: re-bind after dynamic content changes
  return { rebind: bindHover };
})();
