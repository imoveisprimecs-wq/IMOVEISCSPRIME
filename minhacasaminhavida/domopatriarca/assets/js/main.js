(function () {
  var WPP = '5511981445007';

  // WhatsApp links
  document.querySelectorAll('.js-wpp').forEach(function (el) {
    var msg = el.getAttribute('data-msg') || 'Olá Camila! Vim pelo site do DOMO Patriarca.';
    el.setAttribute('href', 'https://wa.me/' + WPP + '?text=' + encodeURIComponent(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // Mobile menu
  var burger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');
  var backdrop = document.getElementById('navBackdrop');
  if (burger && nav) {
    function closeMenu() {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    if (backdrop) backdrop.addEventListener('click', closeMenu);
  }

  // Carousel (auto-play + arrows + thumbs + swipe)
  document.querySelectorAll('.carousel').forEach(function (root) {
    var track = root.querySelector('.carousel__track');
    var slides = root.querySelectorAll('.carousel__slide');
    var thumbs = root.querySelectorAll('.carousel__thumb');
    var prev = root.querySelector('.carousel__arrow--prev');
    var next = root.querySelector('.carousel__arrow--next');
    var count = slides.length;
    if (!track || count === 0) return;

    var index = 0;
    var delay = parseInt(root.getAttribute('data-autoplay'), 10) || 0;
    var timer = null;
    var dragging = false, startX = 0, dx = 0;

    function render(animate) {
      track.style.transition = animate === false ? 'none' : '';
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      thumbs.forEach(function (t, i) {
        t.classList.toggle('is-active', i === index);
      });
      var active = thumbs[index];
      var strip = root.querySelector('.carousel__thumbs');
      if (active && strip) {
        // scroll ONLY the thumbnail strip horizontally — never the page
        var aRect = active.getBoundingClientRect();
        var sRect = strip.getBoundingClientRect();
        var target = strip.scrollLeft + (aRect.left - sRect.left) - (strip.clientWidth - aRect.width) / 2;
        strip.scrollTo({ left: target, behavior: 'smooth' });
      }
    }

    function goTo(i) {
      index = (i + count) % count;
      render();
    }
    function nextSlide() { goTo(index + 1); }
    function prevSlide() { goTo(index - 1); }

    function start() {
      if (delay > 0) { stop(); timer = setInterval(nextSlide, delay); }
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    if (next) next.addEventListener('click', function () { nextSlide(); start(); });
    if (prev) prev.addEventListener('click', function () { prevSlide(); start(); });
    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { goTo(i); start(); });
    });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);

    var vp = root.querySelector('.carousel__viewport');
    if (vp && window.PointerEvent) {
      vp.addEventListener('pointerdown', function (e) {
        dragging = true; startX = e.clientX; dx = 0; stop();
        track.style.transition = 'none';
      });
      vp.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        dx = e.clientX - startX;
        track.style.transform = 'translateX(calc(' + (-index * 100) + '% + ' + dx + 'px))';
      });
      var end = function () {
        if (!dragging) return;
        dragging = false;
        var threshold = vp.offsetWidth * 0.18;
        if (dx <= -threshold) nextSlide();
        else if (dx >= threshold) prevSlide();
        else render();
        start();
      };
      vp.addEventListener('pointerup', end);
      vp.addEventListener('pointercancel', end);
      vp.addEventListener('pointerleave', end);
    }

    render(false);
    start();
  });

  // Reveal on scroll
  var targets = document.querySelectorAll('.section, .banner, .mcmv, .final-cta, .facts');
  targets.forEach(function (t) { t.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('is-in'); });
  }
})();
