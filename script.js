/* ===================================================================
   CREATI — Interactions & animations
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================== LOADER ============================== */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader?.classList.add('is-done'), 1400);
  });
  // Fallback in case load already fired
  setTimeout(() => loader?.classList.add('is-done'), 2200);

  /* ============================== LENIS SMOOTH SCROLL ============================== */
  let lenis;
  if (window.Lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis = new Lenis({
      lerp: 0.12,            // catch-up más rápido (~110ms) — se siente nativo, sin lag
      wheelMultiplier: 1,    // delta natural del wheel
      touchMultiplier: 1.5,
      smoothWheel: true,
      syncTouch: false,      // momentum nativo en móvil
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      // Sin lagSmoothing: dejamos que GSAP corrija el lag normalmente
    }
  }

  // Anchor smooth scroll fallback
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
          else el.scrollIntoView({ behavior: 'smooth' });
          // close mobile menu
          document.getElementById('mobileMenu')?.classList.remove('is-open');
          document.getElementById('burger')?.classList.remove('is-open');
        }
      }
    });
  });

  /* ============================== CUSTOM CURSOR ============================== */
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  if (cursor && dot && window.matchMedia('(min-width: 901px)').matches) {
    let mx = window.innerWidth/2, my = window.innerHeight/2;
    let cx = mx, cy = my, dx = mx, dy = my;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    function tick() {
      cx += (mx - cx) * 0.15; cy += (my - cy) * 0.15;
      dx += (mx - dx) * 0.5;  dy += (my - dy) * 0.5;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      dot.style.transform    = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
      requestAnimationFrame(tick);
    }
    tick();
    document.querySelectorAll('a, button, [data-magnetic], [data-tilt], summary').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
    document.addEventListener('mouseleave', () => { cursor.classList.add('is-hidden'); dot.classList.add('is-hidden'); });
    document.addEventListener('mouseenter', () => { cursor.classList.remove('is-hidden'); dot.classList.remove('is-hidden'); });
  }

  /* ============================== NAV SCROLL ============================== */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Burger
  const burger = document.getElementById('burger');
  const mm = document.getElementById('mobileMenu');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    mm.classList.toggle('is-open');
  });

  /* ============================== HERO TITLE ============================== */
  // Animate hero title lines
  if (window.gsap) {
    gsap.to('.hero__title .line > span', {
      yPercent: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.12,
      delay: 1.6,
    });
  }

  /* ============================== REVEAL OBSERVER ============================== */
  // Wrap words for reveal-words
  document.querySelectorAll('[data-reveal-words]').forEach(el => {
    const html = el.innerHTML;
    // wrap each word in a span (preserve emphasis)
    const wrap = (node) => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (part.trim().length === 0) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const outer = document.createElement('span');
            outer.style.display = 'inline-block';
            outer.style.overflow = 'hidden';
            outer.style.verticalAlign = 'top';
            const inner = document.createElement('span');
            inner.className = 'word';
            inner.textContent = part;
            outer.appendChild(inner);
            frag.appendChild(outer);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1 && !['SCRIPT','STYLE'].includes(node.tagName)) {
        Array.from(node.childNodes).forEach(wrap);
      }
    };
    Array.from(el.childNodes).forEach(wrap);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        // stagger words
        if (entry.target.matches('[data-reveal-words]')) {
          const words = entry.target.querySelectorAll('.word');
          words.forEach((w, i) => {
            w.style.transitionDelay = (i * 0.04) + 's';
          });
        }
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('[data-reveal], [data-reveal-words]').forEach(el => io.observe(el));

  /* ============================== STATS COUNTER ============================== */
  const counters = document.querySelectorAll('[data-count]');
  const cIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = +el.dataset.count;
      const dur = 1800;
      const start = performance.now();
      const ease = t => 1 - Math.pow(1 - t, 3);
      function step(now) {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.floor(ease(p) * target).toString();
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toString();
      }
      requestAnimationFrame(step);
      cIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach(c => cIO.observe(c));

  /* ============================== EVENT TABS ============================== */
  const tabs = document.querySelectorAll('#eventTabs .tab');
  const panels = document.querySelectorAll('.event-panel');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      const k = t.dataset.tab;
      tabs.forEach(x => x.classList.toggle('is-active', x === t));
      panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === k));
    });
  });

  /* ============================== MAGNETIC BUTTONS ============================== */
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    if (!window.matchMedia('(min-width: 901px)').matches) return;
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ============================== TILT CARDS ============================== */
  document.querySelectorAll('[data-tilt]').forEach(card => {
    if (!window.matchMedia('(min-width: 901px)').matches) return;
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform .35s cubic-bezier(.2,.8,.2,1)';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ============================== ORBS PARALLAX (rAF-throttled) ==============================
     Antes hacía style.transform en cada mousemove (200+ events/seg). Ahora 1 ticker rAF
     y solo cuando el hero está visible — evita trabajo innecesario al scrollear. */
  const orbs = document.querySelectorAll('.orb');
  const hero = document.querySelector('.hero');
  if (orbs.length && hero && window.matchMedia('(min-width: 901px)').matches) {
    let mx = 0, my = 0, tx = 0, ty = 0, heroVisible = true, ticking = false;
    const heroIO = new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }, { threshold: 0 });
    heroIO.observe(hero);

    window.addEventListener('mousemove', e => {
      if (!heroVisible) return;
      mx = (e.clientX / window.innerWidth) - 0.5;
      my = (e.clientY / window.innerHeight) - 0.5;
      if (!ticking) { ticking = true; requestAnimationFrame(syncOrbs); }
    }, { passive: true });

    function syncOrbs(){
      tx += (mx - tx) * 0.08;
      ty += (my - ty) * 0.08;
      orbs.forEach((o, i) => {
        const f = (i + 1) * 14;
        o.style.transform = `translate3d(${tx * f}px, ${ty * f}px, 0)`;
      });
      ticking = false;
      // re-arm si seguimos cerca del target
      if (Math.abs(mx - tx) > 0.001 || Math.abs(my - ty) > 0.001){
        ticking = true; requestAnimationFrame(syncOrbs);
      }
    }
  }

  /* ============================== PROCESS TIMELINE ============================== */
  const tl = document.getElementById('processTL');
  if (tl) {
    const bar = tl.querySelector('.process__bar span');
    const steps = tl.querySelectorAll('.step');
    const tlIO = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        if (bar) bar.style.width = '100%';
        steps.forEach((s, i) => {
          setTimeout(() => s.classList.add('is-active'), 200 + i * 250);
        });
        tlIO.unobserve(en.target);
      });
    }, { threshold: 0.3 });
    tlIO.observe(tl);
  }

  /* ============================== HERO PARALLAX SCROLL ==============================
     Solo el fade-out de los chips al hacer scroll (lo demás compite con el mousemove parallax).
     Quitamos los scrubs sobre orbs que duplicaban trabajo. */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.float-chips', {
      yPercent: -10, opacity: 0,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: 1 }
    });
    gsap.to('.footer__big-bg', {
      yPercent: -15,
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  }

});
