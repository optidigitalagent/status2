// Nav shadow on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const burger = document.getElementById('nav-burger');
const mobile = document.getElementById('nav-mobile');
burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  mobile.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
mobile.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  burger.classList.remove('open');
  mobile.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Reveal — visible by default; arm hide/reveal only in a painting browser
const reveals = Array.from(document.querySelectorAll('.reveal'));
function revealCheck() {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  for (let i = reveals.length - 1; i >= 0; i--) {
    const el = reveals[i];
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) { el.classList.add('in'); reveals.splice(i, 1); }
  }
}
requestAnimationFrame(() => requestAnimationFrame(() => {
  document.documentElement.classList.add('reveal-on');
  revealCheck();
  window.addEventListener('scroll', revealCheck, { passive: true });
  window.addEventListener('resize', revealCheck);
  setTimeout(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')), 3000);
}));

// Service & doctor cards / smooth jump to contact
document.querySelectorAll('.svc').forEach((c) => c.addEventListener('click', () => {
  const t = document.getElementById('contact');
  if (t) window.scrollTo({ top: t.offsetTop - 60, behavior: 'smooth' });
}));

// Appointment form
const form = document.getElementById('appt-form');
const note = document.getElementById('form-note');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.name.value.trim() || !form.phone.value.trim()) {
    [form.name, form.phone].forEach((f) => {
      if (!f.value.trim()) { f.style.borderColor = '#ff8f8f'; f.addEventListener('input', () => { f.style.borderColor = ''; }, { once: true }); }
    });
    return;
  }
  note.hidden = false;
  form.querySelector('button[type="submit"]').textContent = 'Заявку надіслано ✓';
  setTimeout(() => form.reset(), 300);
});
