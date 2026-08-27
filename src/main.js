const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('nav a');

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries.find((entry) => entry.isIntersecting);
    if (!visible) return;
    links.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      link.toggleAttribute('aria-current', active);
    });
  },
  { rootMargin: '-30% 0px -65%', threshold: 0 },
);

sections.forEach((section) => observer.observe(section));
