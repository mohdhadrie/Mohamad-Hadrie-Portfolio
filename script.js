const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navMap = new Map([...navLinks].map(a => [a.getAttribute('href').slice(1), a]));

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(a => a.classList.remove('active'));
  navMap.get(visible.target.id)?.classList.add('active');
}, { rootMargin: '-35% 0px -55% 0px', threshold: [0, .2, .5] });
sections.forEach(s => sectionObserver.observe(s));

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const fullName = `${data.get('firstName')} ${data.get('lastName')}`.trim();
  const email = data.get('email');
  const message = data.get('message');
  const subject = encodeURIComponent(`Portfolio enquiry from ${fullName}`);
  const body = encodeURIComponent(`Hi Hadrie,\n\n${message}\n\nFrom: ${fullName}\nEmail: ${email}`);
  window.location.href = `mailto:mohamadhadrie@gmail.com?subject=${subject}&body=${body}`;
});
