const slides = [...document.querySelectorAll('.slide')];
const counter = document.querySelector('#counter');
const progress = document.querySelector('#progress');
let active = 0;
const show = (index) => slides[Math.max(0, Math.min(slides.length - 1, index))].scrollIntoView({ behavior: 'smooth' });
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { active = slides.indexOf(entry.target); counter.textContent = `${String(active + 1).padStart(2,'0')} / ${slides.length}`; progress.style.width = `${((active + 1) / slides.length) * 100}%`; } }), { threshold: .55 });
slides.forEach((slide) => observer.observe(slide));
document.querySelector('#prev').addEventListener('click', () => show(active - 1)); document.querySelector('#next').addEventListener('click', () => show(active + 1));
addEventListener('keydown', (event) => { if (['ArrowRight','PageDown',' '].includes(event.key)) { event.preventDefault(); show(active + 1); } if (['ArrowLeft','PageUp'].includes(event.key)) { event.preventDefault(); show(active - 1); } });
