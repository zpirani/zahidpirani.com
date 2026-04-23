(function(){
  const here = (location.pathname.split('/').pop() || 'index.html').replace('.html','');
  const inWork = location.pathname.includes('/work/');
  const root = inWork ? '../' : '';

  const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26.8996 26.5881" width="26" height="26" aria-hidden="true" style="flex-shrink:0;display:block">
    <defs>
      <clipPath id="zp-c0"><rect width="26.8996" height="26.5881"/></clipPath>
      <clipPath id="zp-c1"><rect width="200.629" height="90.3555" transform="translate(-87.5151 -29.9961)"/></clipPath>
    </defs>
    <g clip-path="url(#zp-c0)"><g clip-path="url(#zp-c1)">
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 1.11679 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 22.6842 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 44.2517 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 65.8373 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 87.4044 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 108.99 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 130.558 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 152.125 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 173.687 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 195.25 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 216.812 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 238.375 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 259.937 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 -20.9084 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 -42.9339 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
      <line stroke="currentColor" stroke-width="9.08869" transform="matrix(-0.707107 0.707107 -0.575391 -0.817878 -64.9594 -46.1191)" x2="162.474" y1="-4.54434" y2="-4.54434"/>
    </g></g>
  </svg>`;

  const nav = `
<nav class="top">
  <div class="inner">
    <a href="${root}index.html" class="mark">
      ${LOGO}
      <span>Zahid Pirani</span>
    </a>
    <ul class="links" id="nav-links">
      <li><a href="${root}index.html" data-p="index">Work</a></li>
      <li><a href="${root}about.html" data-p="about">About</a></li>
      <li><a href="${root}skills.html" data-p="skills">Skills</a></li>
      <li class="mobile-cta"><a href="mailto:zahid@zpirani.com">Get in touch →</a></li>
    </ul>
    <a href="mailto:zahid@zpirani.com" class="cta">Get in touch</a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;

  const footer = `
<footer class="site">
  <div class="inner">
    <span class="mark">ZAHID PIRANI</span>
    <div class="links">
      <a href="https://linkedin.com/in/zahidpirani" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:zahid@zpirani.com">Email</a>
      <a href="${root}about.html">About</a>
    </div>
    <span class="copy">© 2026 Zahid Pirani</span>
  </div>
</footer>`;

  const n = document.getElementById('site-nav');
  if (n) n.innerHTML = nav;
  const f = document.getElementById('site-footer');
  if (f) f.innerHTML = footer;

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  // Active state — "Work" is active on all /work/* pages too
  document.querySelectorAll('nav.top a[data-p]').forEach(a => {
    if (a.dataset.p === here || (inWork && a.dataset.p === 'index')) {
      a.classList.add('active');
    }
  });

  // Nav border on scroll
  const navEl = document.querySelector('nav.top');
  if (navEl) {
    const onScroll = () => navEl.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Scroll progress bar (case study pages only)
  if (document.querySelector('.cs-hero')) {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    document.body.prepend(bar);
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (window.scrollY / total * 100) + '%';
    }, { passive: true });
  }

  // Mobile toggle
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on any link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();
