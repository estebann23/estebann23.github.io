
(function () {
  'use strict';

// Navigation bar and menu toggle
  const nav        = document.getElementById('nav');
  const navBurger  = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  navBurger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    navBurger.setAttribute('aria-expanded', open);
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });


  // Scroll animations
  const revealEls = document.querySelectorAll(
    '.about__bio-card, .skills, .cv-section, .project-card, .section__header, .projects__intro, .filter-bar'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObs.observe(el));


  // Filter Bar for projects
  const grid      = document.getElementById('projectsGrid');
  const filterBar = document.getElementById('filterBar');

  if (grid && filterBar) {
    const cards = Array.from(grid.querySelectorAll('.project-card'));

    const tagSet = new Set();
    cards.forEach(card => {
      (card.dataset.tags || '').split(' ').forEach(t => {
        if (t) tagSet.add(t.trim());
      });
    });

    [...tagSet].sort().forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.filter = tag;
      btn.textContent = tag.replace(/-/g, ' ');
      filterBar.appendChild(btn);
    });

    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const tags = (card.dataset.tags || '').split(' ');
          card.classList.toggle('hidden', !tags.includes(filter));
        }
      });
    });
  }


  document.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
  });

// Link highlighting in navigation bar
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObs.observe(s));

})();