/* ============================================================
   logo.js — Injects the creative SVG "SI" logo into every
   .nav-logo-mark element across all pages automatically.
   Edit the SVG here once → updates everywhere.
   ============================================================ */

(function () {
  // ── The master SVG logo ────────────────────────────────────
  // Hexagonal engineering badge with stylised S + I letterforms
  // and a lightning-bolt circuit accent.
  const SVG = `
<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
     style="width:100%;height:100%;display:block" aria-label="Sirajul Islam — SI">
  <defs>
    <linearGradient id="siG" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#006466"/>
      <stop offset="52%"  stop-color="#1b3a4b"/>
      <stop offset="100%" stop-color="#4d194d"/>
    </linearGradient>
    <linearGradient id="siL" x1="0" y1="12" x2="0" y2="24" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#00d4e8"/>
      <stop offset="100%" stop-color="#00a8b4"/>
    </linearGradient>
    <filter id="siF" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- ── Hexagon background ── -->
  <path d="M20 1.5L36.5 11V29L20 38.5L3.5 29V11Z" fill="url(#siG)"/>

  <!-- ── Hex border ── -->
  <path d="M20 1.5L36.5 11V29L20 38.5L3.5 29V11Z"
        fill="none" stroke="rgba(0,212,232,0.38)" stroke-width="0.7"/>

  <!-- ── Top circuit trace + dot ── -->
  <circle cx="20" cy="1.5" r="1.4" fill="rgba(0,212,232,0.28)"/>
  <line x1="20" y1="1.5" x2="20" y2="5"
        stroke="rgba(0,212,232,0.22)" stroke-width="0.7"/>

  <!-- ── Side circuit traces ── -->
  <circle cx="3.5" cy="20" r="1.3" fill="rgba(0,212,232,0.38)"/>
  <line x1="3.5" y1="20" x2="8" y2="20"
        stroke="rgba(0,212,232,0.28)" stroke-width="0.6"/>
  <circle cx="36.5" cy="20" r="1.3" fill="rgba(0,212,232,0.38)"/>
  <line x1="32" y1="20" x2="36.5" y2="20"
        stroke="rgba(0,212,232,0.28)" stroke-width="0.6"/>

  <!-- ── S letterform (smooth curve) ── -->
  <path d="
    M10.5 15.8
    C10.5 14.1 12 12.5 14.6 12.5
    C17.2 12.5 18 14.1 18 15.2
    C18 17.1 16.1 17.9 13.6 18.6
    C11.1 19.3 10.2 20.6 10.2 21.7
    C10.2 23.1 11.7 24.5 14.6 24.5
    C16.8 24.5 17.8 23.4 18.2 22.6"
    stroke="url(#siL)" stroke-width="2.1"
    stroke-linecap="round" fill="none" filter="url(#siF)"/>

  <!-- ── I letterform ── -->
  <!-- Vertical stem -->
  <line x1="23.2" y1="12.5" x2="23.2" y2="24.5"
        stroke="url(#siL)" stroke-width="2.2"
        stroke-linecap="round" filter="url(#siF)"/>
  <!-- Top serif -->
  <line x1="20.8" y1="12.5" x2="25.6" y2="12.5"
        stroke="#00d4e8" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Bottom serif -->
  <line x1="20.8" y1="24.5" x2="25.6" y2="24.5"
        stroke="#00d4e8" stroke-width="1.5" stroke-linecap="round"/>

  <!-- ── Lightning bolt (top-right accent inside hex) ── -->
  <path d="M29 7L27 12.5H29.5L27.5 18"
        stroke="rgba(0,212,232,0.6)" stroke-width="1.1"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  // ── Inject into every .nav-logo-mark on the page ────────────
  document.querySelectorAll('.nav-logo-mark').forEach(el => {
    el.innerHTML      = SVG;
    el.style.background = 'none';
    el.style.border     = 'none';
    el.style.padding    = '0';
    el.style.boxShadow  = '0 0 18px rgba(0,100,102,0.45)';
    el.style.borderRadius = '9px';
    el.style.overflow   = 'hidden';
  });

  // ── Update loading screen initials with larger hero SVG ──────
  const loadingEl = document.querySelector('.loading-initials');
  if (loadingEl) {
    loadingEl.innerHTML = `
<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"
     style="width:1em;height:1em">
  <defs>
    <linearGradient id="siHG" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#006466"/>
      <stop offset="52%"  stop-color="#1b3a4b"/>
      <stop offset="100%" stop-color="#4d194d"/>
    </linearGradient>
    <linearGradient id="siHL" x1="0" y1="36" x2="0" y2="84" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#00d4e8"/>
      <stop offset="100%" stop-color="#00a8b4"/>
    </linearGradient>
    <filter id="siHF">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <!-- Hexagon -->
  <path d="M60 4L109 32V88L60 116L11 88V32Z" fill="url(#siHG)"/>
  <path d="M60 4L109 32V88L60 116L11 88V32Z"
        fill="none" stroke="rgba(0,212,232,0.35)" stroke-width="2"/>
  <!-- Side dots -->
  <circle cx="11"  cy="60" r="4" fill="rgba(0,212,232,0.4)"/>
  <circle cx="109" cy="60" r="4" fill="rgba(0,212,232,0.4)"/>
  <!-- S -->
  <path d="M30 46C30 40 36 34 46 34C56 34 59 40 59 44C59 52 51 55 41 58C31 61 29 66 29 70C29 75 35 82 46 82C54 82 58 78 60 75"
        stroke="url(#siHL)" stroke-width="7" stroke-linecap="round" fill="none" filter="url(#siHF)"/>
  <!-- I -->
  <line x1="71" y1="34" x2="71" y2="82" stroke="url(#siHL)" stroke-width="7.5" stroke-linecap="round" filter="url(#siHF)"/>
  <line x1="63" y1="34" x2="79" y2="34" stroke="#00d4e8" stroke-width="5" stroke-linecap="round"/>
  <line x1="63" y1="82" x2="79" y2="82" stroke="#00d4e8" stroke-width="5" stroke-linecap="round"/>
  <!-- Lightning -->
  <path d="M88 18L81 36H88.5L82 55" stroke="rgba(0,212,232,0.65)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
    loadingEl.style.width = '1em';
    loadingEl.style.height = '1em';
    loadingEl.style.display = 'flex';
    loadingEl.style.alignItems = 'center';
    loadingEl.style.justifyContent = 'center';
  }
})();
