(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Light/dark theme toggle ---
  var THEME_KEY = 'theme';
  var themeToggle = document.getElementById('theme-toggle');
  var storedTheme = null;
  try { storedTheme = localStorage.getItem(THEME_KEY); } catch (e) { storedTheme = null; }
  var systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  var initialTheme = storedTheme || (systemPrefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', initialTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  // --- Mobile nav toggle ---
  var navToggle = document.getElementById('nav-toggle');
  var navMenu = document.getElementById('nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (section) { navObserver.observe(section); });
  }

  // --- Typed role cycler ---
  var ROLES = [
    'Software Development Engineer @ Amazon',
    'Machine Learning Engineer',
    'Distributed Systems Builder',
    'Published Cybersecurity Researcher',
    'Cybersecurity Awards Judge'
  ];
  var typedEl = document.getElementById('typed-role');
  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = ROLES[0];
    } else {
      (function typeLoop() {
        var roleIndex = 0;
        var charIndex = 0;
        var deleting = false;

        function tick() {
          var current = ROLES[roleIndex];
          if (!deleting) {
            charIndex++;
            typedEl.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
              deleting = true;
              setTimeout(tick, 1400);
              return;
            }
          } else {
            charIndex--;
            typedEl.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
              deleting = false;
              roleIndex = (roleIndex + 1) % ROLES.length;
            }
          }
          setTimeout(tick, deleting ? 35 : 60);
        }
        tick();
      })();
    }
  }

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    }
  }
})();
