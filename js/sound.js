/* ============================================================
   sound.js — Respectful Islamic salaam greeting on first entry
   ============================================================
   HOW TO USE:
   1. Record or download a soft male Arabic "Assalamu Alaikum" greeting
   2. Save it as: assets/sounds/salaam.mp3
   3. This script plays it once, at low volume, on first visit
   4. A mute button appears bottom-right for user control
   ============================================================ */

const Sound = (() => {

  const STORAGE_KEY = 'si-sound-played';
  const MUTED_KEY   = 'si-sound-muted';
  const SOUND_FILE  = 'assets/sounds/salaam.mp3'; // relative to index.html

  // Resolve correct path based on page depth
  function resolveAudioPath() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const isInPages = window.location.pathname.includes('/pages/');
    return isInPages ? '../assets/sounds/salaam.mp3' : 'assets/sounds/salaam.mp3';
  }

  let audio = null;
  let isMuted = localStorage.getItem(MUTED_KEY) === 'true';

  // ── Build mute toggle button ────────────────────────────────
  function buildToggle() {
    const btn = document.createElement('button');
    btn.id = 'sound-toggle';
    btn.setAttribute('aria-label', 'Toggle greeting sound');
    btn.title = 'Mute / Unmute greeting';
    btn.textContent = isMuted ? '🔇' : '🔊';
    btn.addEventListener('click', () => {
      isMuted = !isMuted;
      localStorage.setItem(MUTED_KEY, isMuted);
      btn.classList.toggle('muted', isMuted);
      btn.textContent = isMuted ? '🔇' : '🔊';
      if (audio) {
        audio.muted = isMuted;
        if (!isMuted && audio.paused) audio.play().catch(() => {});
      }
    });
    btn.classList.toggle('muted', isMuted);
    document.body.appendChild(btn);
    // Animate in after slight delay
    setTimeout(() => btn.classList.add('visible'), 3000);
    return btn;
  }

  // ── Play greeting ───────────────────────────────────────────
  function playGreeting() {
    // Only play once per session (not once ever — respectful to return visitors too)
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    sessionStorage.setItem(STORAGE_KEY, '1');

    audio = new Audio(resolveAudioPath());
    audio.volume = 0.28;       // Low, respectful volume
    audio.muted  = isMuted;
    audio.preload = 'auto';

    // Wait until page fully loaded + short delay for smooth UX
    const tryPlay = () => {
      audio.play().then(() => {
        buildToggle();
      }).catch(() => {
        // Auto-play blocked by browser — show button so user can play manually
        buildToggle();
      });
    };

    // Only on index/home page
    const isHome = !window.location.pathname.includes('/pages/');
    if (!isHome) return;

    // Trigger after loading screen fades (≈2.5s)
    setTimeout(tryPlay, 2800);
  }

  // ── Init ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    // Check if salaam.mp3 exists before attempting
    const probe = new Audio(resolveAudioPath());
    probe.addEventListener('canplaythrough', () => playGreeting(), { once: true });
    probe.addEventListener('error', () => {
      // File not found — silently skip, no error shown to user
      console.info('[Sound] assets/sounds/salaam.mp3 not found — sound greeting disabled.');
    });
    probe.load();
  });

})();
