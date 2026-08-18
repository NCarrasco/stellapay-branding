var STELLAPAY_API = 'https://app.stellapaypos.com/api';

var FALLBACK_PLANES = [
  { codigo: 'BRONZE', nombre: 'Plan Emprendedor', precioMensual: 35,  precioAnual: 350  },
  { codigo: 'SILVER', nombre: 'Plan Profesional', precioMensual: 85,  precioAnual: 850  },
  { codigo: 'GOLD',   nombre: 'Plan Empresarial', precioMensual: 145, precioAnual: 1450 }
];

var billingAnual = false;
var planesData   = [];

// ── Toggle mensual / anual ────────────────────────────────────────────────
function toggleBillingCycle() {
  billingAnual = !billingAnual;
  var btn    = document.getElementById('toggleBilling');
  var thumb  = document.getElementById('toggleThumb');
  var lMes   = document.getElementById('labelMensual');
  var lAnual = document.getElementById('labelAnual');

  btn.setAttribute('aria-pressed', billingAnual);
  thumb.style.transform    = billingAnual ? 'translateX(1.25rem)' : 'translateX(0.25rem)';
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
    var el      = card.querySelector('.precio-display');
    var periodo = card.querySelector('.periodo-display');
    if (!el) return;

    if (billingAnual && plan.precioAnual) {
      var porMes = (plan.precioAnual / 12).toFixed(0);
      el.textContent = 'US$' + porMes;
      periodo.innerHTML = 'por mes &middot; <strong class="text-spSuccess">US$' + plan.precioAnual + ' al año</strong>';
    } else {
      el.textContent    = 'US$' + plan.precioMensual;
      periodo.textContent = 'por mes';
    }
  });
}

function actualizarLimitesPlanes(data) {
  data.forEach(function (plan) {
    var card = document.querySelector('[data-codigo="' + plan.codigo + '"]');
    if (!card) return;
    var liU = card.querySelector('[data-campo="usuarios"]');
    var liP = card.querySelector('[data-campo="productos"]');
    var liF = card.querySelector('[data-campo="facturas"]');
    var icon = '<i class="bi bi-check-lg text-spSuccess flex-shrink-0 mt-0.5"></i>';
    if (liU && plan.limiteUsuarios < 500) {
      liU.innerHTML = icon + 'Hasta ' + plan.limiteUsuarios + ' usuario' + (plan.limiteUsuarios > 1 ? 's' : '');
    }
    if (liP && plan.limiteProductos < 50000) {
      liP.innerHTML = icon + 'Hasta ' + plan.limiteProductos.toLocaleString('es-DO') + ' productos';
    }
    if (liF && plan.limiteFacturasMes < 50000) {
      liF.innerHTML = icon + 'Hasta ' + plan.limiteFacturasMes.toLocaleString('es-DO') + ' facturas/mes';
    }
  });
}

function cargarPlanes() {
  fetch(STELLAPAY_API + '/planes/publico')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (data) { planesData = data; actualizarPrecios(); actualizarLimitesPlanes(data); })
    .catch(function () {});
}

// ── Lightbox ──────────────────────────────────────────────────────────────
function openLightbox(src, caption) {
  var lb  = document.getElementById('lightbox');
  var img = document.getElementById('lightboxImg');
  var cap = document.getElementById('lightboxCaption');
  img.src       = src;
  img.alt       = caption;
  cap.textContent = caption;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(event) {
  if (event && event.target !== document.getElementById('lightbox') &&
      !event.target.classList.contains('lightbox-close')) return;
  var lb = document.getElementById('lightbox');
  lb.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox({ target: document.getElementById('lightbox') });
});

// ── FAQ accordion ─────────────────────────────────────────────────────────
function toggleFaq(btn) {
  var body = btn.nextElementSibling;
  var icon = btn.querySelector('.faq-icon');
  var isOpen = body.classList.contains('open');

  // Cierra todos primero
  document.querySelectorAll('.faq-body').forEach(function (b) { b.classList.remove('open'); });
  document.querySelectorAll('.faq-icon').forEach(function (i) { i.classList.remove('rotated'); });

  if (!isOpen) {
    body.classList.add('open');
    icon.classList.add('rotated');
  }
}

// ── Menú móvil ────────────────────────────────────────────────────────────
document.getElementById('menuToggle').addEventListener('click', function () {
  var menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
  menu.classList.toggle('open');
});

function closeMobileMenu() {
  var menu = document.getElementById('mobileMenu');
  menu.classList.add('hidden');
  menu.classList.remove('open');
}

// ── Init ──────────────────────────────────────────────────────────────────
(function () {

  // Intersection observer — fade in
  var onView = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        onView.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(function (el) { onView.observe(el); });

  // Animated counters
  function counter(el, target) {
    var start    = performance.now();
    var duration = 1200;
    var render   = function (now) {
      var p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * p).toLocaleString('es-DO');
      if (p < 1) requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  var cObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        counter(entry.target, Number(entry.target.dataset.counter));
        cObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-counter]').forEach(function (el) { cObs.observe(el); });

  // Progress bars
  var pObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.progress + '%';
        pObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('.bar-fill').forEach(function (el) { pObs.observe(el); });

  // Year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Nav: oscura sobre el hero, blanca cuando el hero sale del viewport
  var nav  = document.getElementById('topNav');
  var hero = document.getElementById('hero');
  if (nav && hero) {
    var navObs = new IntersectionObserver(function (entries) {
      nav.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }, { threshold: 0 });
    navObs.observe(hero);
  }

  // Page transition on external links
  document.querySelectorAll('.access-link').forEach(function (link) {
    link.addEventListener('click', function () {
      document.body.classList.add('route-fade');
    });
  });

  // Cuando el usuario regresa con "atrás" (bfcache), quitar la clase de fade
  window.addEventListener('pageshow', function (event) {
    if (event.persisted || (window.performance && performance.navigation.type === 2)) {
      document.body.classList.remove('route-fade');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      var navHeight     = document.getElementById('topNav')?.offsetHeight ?? 0;
      var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      closeMobileMenu();
    });
  });

  cargarPlanes();
})();
