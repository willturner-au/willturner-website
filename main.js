/* Will Turner — Simplexity | main.js
   Single source of truth for all shared UI:
   nav, mobile nav, tagline strip, ticker, footer.
   Each page needs only: id="site-nav", id="site-pre-footer", id="site-footer"
   ─────────────────────────────────────────────────────────────── */
(function(){

  /* ─── NAV LINKS (single source) ─────────────────────────────── */
  var NAV_LINKS = [
    { href: 'simplexity', label: 'Simplexity' },
    { href: 'speaking',   label: 'Speaking'   },
    { href: 'coaching',   label: 'Coaching'   },
    { href: 'advisory',   label: 'Advisory'   },
    { href: 'book',       label: 'Book'       },
    { href: 'about',      label: 'About'      }
  ];

  /* ─── TICKER WORDS (single source) ──────────────────────────── */
  var TICKER_WORDS = [
    'Every Session', 'Every Room', 'Every Page',
    'The Penny Drop', 'Simplexity', 'Will Turner', 'willturner.au'
  ];

  /* ─── SOCIAL LINKS (single source) ──────────────────────────── */
  var SOCIAL_LINKS = [
    { href: 'https://www.linkedin.com/in/willturnersimplexity', label: 'LinkedIn'  },
    { href: 'https://substack.willturner.au',                   label: 'Substack'  },
    { href: 'https://www.youtube.com/@willturner_au',           label: 'YouTube'   },
    { href: 'https://www.instagram.com/willturner_au',          label: 'Instagram' },
    { href: 'https://x.com/willturner_au',                      label: 'X'         },
    { href: 'https://www.tiktok.com/@willturner_au',            label: 'TikTok'    }
  ];

  /* ─── HELPERS ────────────────────────────────────────────────── */
  function el(tag, attrs, innerHTML) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k){ node.setAttribute(k, attrs[k]); });
    if (innerHTML !== undefined) node.innerHTML = innerHTML;
    return node;
  }

  // Normalise current page: root path maps to 'index'; Cloudflare strips .html extensions
  var rawPage = window.location.pathname.split('/').pop();
  var currentPage = (rawPage === '' || rawPage === undefined) ? 'index'
    : rawPage.replace(/\.html$/, '');

  /* ─── 1. INJECT NAV ─────────────────────────────────────────── */
  var navEl = document.getElementById('site-nav');
  if (navEl) {
    var liItems = NAV_LINKS.map(function(link){
      var isActive = link.href === currentPage;
      return '<li><a href="' + link.href + '"' + (isActive ? ' class="active"' : '') + '>' + link.label + '</a></li>';
    }).join('');

    var mobileLinks = NAV_LINKS.map(function(link){
      var isActive = link.href === currentPage;
      return '<a href="' + link.href + '"' + (isActive ? ' class="active"' : '') + '>' + link.label + '</a>';
    }).join('');

    navEl.outerHTML = [
      '<nav>',
      '  <a href="/" class="nav-logo"><span class="logo-will">Will</span><span class="logo-turner"> Turner</span></a>',
      '  <ul class="nav-links">' + liItems + '</ul>',
      '  <a href="contact" class="nav-cta' + (currentPage === 'contact' ? ' active' : '') + '">Work with Will</a>',
      '  <button class="nav-hamburger" id="navToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>',
      '</nav>',
      '<div class="nav-overlay" id="navOverlay"></div>',
      '<div class="nav-mobile-inner" id="navMobile">',
      mobileLinks,
      '  <a href="contact" class="nav-mobile-cta">Work with Will</a>',
      '</div>'
    ].join('\n');

    // Mobile nav toggle (bind after injection)
    var btnEl  = document.getElementById('navToggle');
    var ovrEl  = document.getElementById('navOverlay');
    var mobEl  = document.getElementById('navMobile');
    function setNav(open) {
      btnEl.classList.toggle('open', open);
      ovrEl.classList.toggle('open', open);
      mobEl.classList.toggle('open', open);
      btnEl.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    btnEl.addEventListener('click', function(){ setNav(!ovrEl.classList.contains('open')); });
    ovrEl.addEventListener('click', function(){ setNav(false); });
    mobEl.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ setNav(false); });
    });
  }

  /* ─── 2. INJECT TAGLINE STRIP + TICKER ──────────────────────── */
  var preFooterEl = document.getElementById('site-pre-footer');
  if (preFooterEl) {
    var tickerItem = TICKER_WORDS.map(function(w, i){
      return '<span class="ticker-word">' + w + '</span>' + (i < TICKER_WORDS.length - 1 ? '<span class="ticker-dot"></span>' : '');
    }).join('');
    // Three copies for seamless loop
    var tickerHTML = [0,1,2].map(function(){ return '<div class="ticker-item">' + tickerItem + '</div>'; }).join('');

    preFooterEl.outerHTML = [
      '<div class="tagline-strip"><p>Every session. Every room. Every page. The penny drop.</p></div>',
      '<div class="ticker"><div class="ticker-track">' + tickerHTML + '</div></div>'
    ].join('\n');
  }

  /* ─── 3. INJECT FOOTER ──────────────────────────────────────── */
  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    var socialHTML = SOCIAL_LINKS.map(function(s){
      return '<a href="' + s.href + '" target="_blank" rel="noopener">' + s.label + '</a>';
    }).join('');

    footerEl.outerHTML = [
      '<footer>',
      '  <div class="footer-top">',
      '    <div class="footer-logo"><span class="logo-will">Will</span><span class="logo-turner"> Turner</span></div>',
      '    <div class="footer-copy">&copy; 2026 Will Turner &mdash; willturner.au</div>',
      '    <div class="footer-nav">',
      '      <a href="speaking">Speaking</a>',
      '      <a href="about">About</a>',
      '      <a href="contact">Contact</a>',
      '    </div>',
      '  </div>',
      '  <div class="footer-social-row">' + socialHTML + '</div>',
      '</footer>'
    ].join('\n');
  }

  /* ─── 4. SCROLL REVEAL ──────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ observer.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ─── 5. GOOGLE ANALYTICS ─────────────────────────────────── */
  window.addEventListener('load', function(){
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-3JH7PQW1F5';
    s.defer = true;
    document.head.appendChild(s);
    s.onload = function(){
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3JH7PQW1F5');
    };
  });

  /* ─── 6. EMAIL CAPTURE (homepage) ───────────────────────────── */
  var captureForm = document.getElementById('email-capture-form');
  if (captureForm) {
    captureForm.addEventListener('submit', function(e){
      e.preventDefault();
      var emailInput = captureForm.querySelector('.email-capture-input');
      var btn        = captureForm.querySelector('.email-capture-btn');
      if (!emailInput || !emailInput.value) return;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      var f = document.createElement('form');
      f.method = 'POST';
      f.action = 'https://app.kit.com/forms/9398374/subscriptions';
      f.style.display = 'none';
      var fEmail = document.createElement('input');
      fEmail.type  = 'hidden'; fEmail.name  = 'email_address'; fEmail.value = emailInput.value;
      var fRedir = document.createElement('input');
      fRedir.type  = 'hidden'; fRedir.name  = 'redirect_to'; fRedir.value = 'https://willturner.au/book-thankyou.html';
      f.appendChild(fEmail); f.appendChild(fRedir);
      document.body.appendChild(f); f.submit();
    });
  }

})();
