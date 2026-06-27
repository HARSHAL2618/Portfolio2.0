// ============ NAVBAR SCROLL STATE ============
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ MOBILE NAV TOGGLE ============
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============ ACTIVE NAV HIGHLIGHT ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ============ TYPING ANIMATION ============
const roles = ['AI Engineer', 'Python Developer', 'ML Practitioner', 'Computer Vision Enthusiast'];
const typedEl = document.getElementById('typed-role');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typedEl.textContent = roles[0];
    return;
  }

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 90);
}

typeLoop();

// ============ NEURAL NETWORK PARTICLE BACKGROUND ============
const canvas = document.getElementById('net-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animFrame;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initParticles() {
  const count = Math.min(70, Math.floor((window.innerWidth * window.innerHeight) / 18000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.6 + 0.6
  }));
}

function drawNetwork() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const linkDist = 140;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < linkDist) {
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.16 * (1 - dist / linkDist)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = 'rgba(34, 211, 238, 0.55)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  animFrame = requestAnimationFrame(drawNetwork);
}

function startNetwork() {
  resizeCanvas();
  initParticles();
  if (!reduceMotion) {
    drawNetwork();
  } else {
    // static single frame for reduced motion
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

window.addEventListener('resize', () => {
  cancelAnimationFrame(animFrame);
  startNetwork();
}, { passive: true });

startNetwork();

// ============ CONTACT FORM (placeholder submission) ============
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.textContent = 'Sending...';
  const res = await fetch('https://formspree.io/f/xaqgokrv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    })
  });
  formStatus.textContent = res.ok 
    ? '✅ Message sent! I\'ll get back to you soon.' 
    : '❌ Something went wrong. Try again.';
  if (res.ok) contactForm.reset();
});


// ============ FOOTER YEAR ============
const yearEl = document.getElementById('year');
if (yearEl && yearEl.textContent.includes('{{')) {
  yearEl.textContent = new Date().getFullYear();
}

// ============ CARD FLIP ============
document.querySelectorAll('.details-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.closest('.project-card').classList.add('flipped');
  });
});

document.querySelectorAll('.flip-back').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.project-card').classList.remove('flipped');
  });
});
