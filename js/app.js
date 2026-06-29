/* ============================================================
   AYRA — APP.JS
   ============================================================ */

/* ---- NAV SHRINK ON SCROLL ---- */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- HERO CANVAS PARTICLES ---- */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function rand(min, max) { return Math.random() * (max - min) + min; }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = rand(0, W);
      this.y  = init ? rand(0, H) : H + 10;
      this.r  = rand(1, 3);
      this.vy = rand(-0.3, -0.9);
      this.vx = rand(-0.2, 0.2);
      this.alpha = rand(0.2, 0.7);
      this.color = Math.random() > 0.5 ? '82,183,136' : '201,168,76';
    }
    update() {
      this.y += this.vy;
      this.x += this.vx;
      this.alpha -= 0.0008;
      if (this.y < -10 || this.alpha <= 0) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  /* Mouse parallax on particles */
  let mx = 0, my = 0;
  document.querySelector('.hero').addEventListener('mousemove', e => {
    mx = (e.clientX / W - 0.5) * 20;
    my = (e.clientY / H - 0.5) * 10;
  }, { passive: true });

  function tick() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- COUNT-UP ANIMATION ---- */
function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * ease);
    el.textContent = prefix + value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => countObserver.observe(el));

/* ---- HERO PARALLAX ON MOUSE MOVE ---- */
const heroBg = document.querySelector('.hero__bg');
document.querySelector('.hero')?.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 24;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  if (heroBg) heroBg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
}, { passive: true });

document.querySelector('.hero')?.addEventListener('mouseleave', () => {
  if (heroBg) heroBg.style.transform = 'translate(0,0) scale(1)';
});
