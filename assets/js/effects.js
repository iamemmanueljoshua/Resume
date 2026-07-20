(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Floating particle network background ---
  // Reduced motion means "don't animate it," not "don't show it" - a static
  // frame is drawn either way, only the drift/redraw loop is skipped.
  var canvas = document.getElementById('bg-particles');
  if (canvas && 'requestAnimationFrame' in window) {
    var ctx = canvas.getContext('2d');
    var particles = [];
    var width = 0;
    var height = 0;
    var running = true;

    var PARTICLE_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--particle-rgb').trim() || '67, 233, 123';
    var LINK_DISTANCE = 160;

    new MutationObserver(function () {
      PARTICLE_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--particle-rgb').trim() || PARTICLE_COLOR;
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    function particleCount() {
      var area = width * height;
      var count = Math.round(area / 18000);
      return Math.max(45, Math.min(count, 110));
    }

    function makeParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25
      };
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      var dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var target = particleCount();
      if (particles.length > target) {
        particles.length = target;
      } else {
        while (particles.length < target) particles.push(makeParticle());
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + PARTICLE_COLOR + ', 0.9)';
        ctx.fill();
      }

      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = 'rgba(' + PARTICLE_COLOR + ', ' + (0.3 * (1 - dist / LINK_DISTANCE)) + ')';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      if (running && !reduceMotion) requestAnimationFrame(step);
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
      if (reduceMotion) step();
    });

    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running && !reduceMotion) requestAnimationFrame(step);
    });

    resize();
    if (reduceMotion) {
      step();
    } else {
      requestAnimationFrame(step);
    }
  }

  // --- Cursor-follow glow ---
  var glow = document.getElementById('cursor-glow');
  var supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (glow && supportsFinePointer) {
    document.addEventListener('mousemove', function (e) {
      glow.style.setProperty('--x', e.clientX + 'px');
      glow.style.setProperty('--y', e.clientY + 'px');
      glow.classList.add('active');
    });
    document.addEventListener('mouseleave', function () {
      glow.classList.remove('active');
    });
  }
})();
