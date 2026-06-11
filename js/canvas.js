/* ============================================================
   canvas.js — Animated particle field + connection lines
   Responds to light / dark theme
   ============================================================ */

const CanvasBG = (() => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];
  const COUNT = 110;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); init(); });

  // Detect current theme
  function isLight() { return document.body.classList.contains('light'); }

  // Particle factory
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.28;
      this.vy = (Math.random() - 0.5) * 0.28;
      this.r  = Math.random() * 1.4 + 0.3;
      this.baseAlpha = Math.random() * 0.45 + 0.08;
      this.a  = this.baseAlpha;
      // Two color families
      this.colorDark  = Math.random() > 0.5 ? '0,212,232' : '90,100,175';
      this.colorLight = Math.random() > 0.5 ? '0,140,155' : '60,80,160';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      const col = isLight() ? this.colorLight : this.colorDark;
      const alpha = isLight() ? this.a * 0.55 : this.a;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${alpha})`;
      ctx.fill();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(new Particle());
  }
  init();

  // Connection lines between nearby particles
  function drawConnections() {
    const maxDist = 130;
    const lineAlpha = isLight() ? 0.06 : 0.09;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          const a = (1 - d / maxDist) * lineAlpha;
          const col = isLight() ? '0,150,170' : '0,180,200';
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${col},${a})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  // Main animation loop
  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();
