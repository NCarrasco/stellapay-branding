(function () {
  const onView = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          onView.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll('.fade-in').forEach((el) => onView.observe(el));

  function counter(el, target) {
    const start = performance.now();
    const duration = 1100;
    const render = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * p).toLocaleString('es-DO');
      if (p < 1) requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  const cObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counter(entry.target, Number(entry.target.dataset.counter));
          cObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll('[data-counter]').forEach((el) => cObs.observe(el));

  const pObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = `${entry.target.dataset.progress}%`;
          pObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );
  document.querySelectorAll('.bar-fill').forEach((el) => pObs.observe(el));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const nav = document.getElementById('topNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 8) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }
    });
  }

  document.querySelectorAll('.access-link').forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.add('route-fade');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      const navHeight = document.getElementById('topNav')?.offsetHeight ?? 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    });
  });
})();
