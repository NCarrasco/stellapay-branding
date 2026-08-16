// ── Configuración ──────────────────────────────────────────────────────────
var STELLAPAY_API = 'https://app.stellapaypos.com/api';

// ── Precios de respaldo (se usan si la API no responde) ─────────────────────
var FALLBACK_PLANES = [
  { codigo: 'BRONZE', nombre: 'Plan Emprendedor', precioMensual: 35, precioAnual: 350 },
  { codigo: 'SILVER', nombre: 'Plan Profesional', precioMensual: 85, precioAnual: 850 },
  { codigo: 'GOLD',   nombre: 'Plan Empresarial', precioMensual: 145, precioAnual: 1450 }
];

var billingAnual = false;
var planesData = [];

// ── Toggle mensual / anual ──────────────────────────────────────────────────
function toggleBillingCycle() {
  billingAnual = !billingAnual;
  var btn   = document.getElementById('toggleBilling');
  var thumb = document.getElementById('toggleThumb');
  var lMes  = document.getElementById('labelMensual');
  var lAnual = document.getElementById('labelAnual');

  btn.setAttribute('aria-pressed', billingAnual);
  thumb.style.transform = billingAnual ? 'translateX(1.25rem)' : 'translateX(0.25rem)';
  btn.style.backgroundColor = billingAnual ? '#4F46E5' : '';

  lMes.style.color   = billingAnual ? '#6B7280' : '#111827';
  lAnual.style.color = billingAnual ? '#111827' : '#6B7280';

  actualizarPrecios();
}

function actualizarPrecios() {
  var fuente = planesData.length ? planesData : FALLBACK_PLANES;
  fuente.forEach(function (plan) {
    var card = document.querySelector('[data-codigo="' + plan.codigo + '"]');
    if (!card) return;
    var el = card.querySelector('.precio-display');
    var periodo = card.querySelector('.periodo-display');
    if (!el) return;

    if (billingAnual && plan.precioAnual) {
      var porMes = (plan.precioAnual / 12).toFixed(0);
      el.textContent = 'US$' + porMes;
      periodo.innerHTML = 'por mes &middot; <strong class="text-spSuccess">US$' + plan.precioAnual + ' al año</strong>';
    } else {
      el.textContent = 'US$' + plan.precioMensual;
      periodo.textContent = 'por mes';
    }
  });
}

// ── Carga dinámica de planes desde la API ───────────────────────────────────
function cargarPlanes() {
  fetch(STELLAPAY_API + '/planes/publico')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (data) {
      planesData = data;
      actualizarPrecios();
    })
    .catch(function () {
      // La API no respondió — los precios estáticos del HTML ya están visibles
    });
}

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

  // Cargar precios actualizados desde la API
  cargarPlanes();
})();
