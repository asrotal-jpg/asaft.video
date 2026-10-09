(function () {
  'use strict';
  var d = document, w = window, body = d.body;
  var reduce = w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var pendingAd = null;
  var rtl = d.documentElement.dir === 'rtl';

  /* links from the earlier version of the site: #/p/slug and #/s/section */
  if (body.getAttribute('data-page') === 'home') {
    var legacy = { vod: 'works', expo: 'exhibitions', ads: 'ads', prod: 'production', about: 'about', contact: 'contact' };
    var hm = location.hash.match(/^#\/(p|s)\/([\w-]+)/);
    if (hm && hm[1] === 'p') {
      if (hm[2].indexOf('ad-') === 0) { pendingAd = hm[2]; }
      else { location.replace('work/' + hm[2] + '.html'); return; }
    } else if (hm) {
      var sec = legacy[hm[2]] || hm[2];
      history.replaceState(null, '', '#' + sec);
      var el = d.getElementById(sec);
      if (el) el.scrollIntoView();
    }
  }

  /* top bar */
  var bar = d.querySelector('.bar');
  function onScroll() { bar.classList.toggle('solid', w.scrollY > 20); }
  onScroll();
  w.addEventListener('scroll', onScroll, { passive: true });

  var menu = d.querySelector('.menu');
  if (menu) {
    menu.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    d.getElementById('nav').addEventListener('click', function (e) {
      if (e.target.closest('a')) { body.classList.remove('nav-open'); menu.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* the language switch keeps the section the visitor jumped to */
  var sw = d.querySelector('.lang');
  if (sw) sw.addEventListener('click', function () { if (/^#[\w-]+$/.test(location.hash)) sw.href = sw.href.split('#')[0] + location.hash; });

  /* viewfinder timecode and timeline playhead */
  var tc = d.getElementById('tc'), ph = d.getElementById('ph');
  if (tc && !reduce) {
    var t0 = performance.now(), last = -1, LOOP = 48;
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function (now) {
      var s = (now - t0) / 1000, f = Math.floor(s * 25);
      if (f !== last) {
        last = f;
        tc.textContent = '00:' + pad(Math.floor(s / 60) % 60) + ':' + pad(Math.floor(s) % 60) + ':' + pad(f % 25);
        if (ph) ph.style.left = ((s % LOOP) / LOOP * 100).toFixed(2) + '%';
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* looping videos (the head, moving posters) hold still for reduced motion */
  if (reduce) d.querySelectorAll('video[autoplay]').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });

  /* hover previews on posters */
  if (fine && !reduce) {
    d.querySelectorAll('.card[data-prev]').forEach(function (card) {
      var v = card.querySelector('video');
      if (!v) return;
      v.addEventListener('playing', function () { card.classList.add('playing'); });
      var start = function () {
        if (!v.getAttribute('src')) v.src = card.getAttribute('data-prev');
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      };
      var stop = function () {
        card.classList.remove('playing');
        v.pause();
        try { v.currentTime = 0; } catch (e) {}
      };
      card.addEventListener('mouseenter', start);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focus', start);
      card.addEventListener('blur', stop);
    });
  }

  /* YouTube screens load only when played */
  function ytFrame(id, title) {
    var f = d.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1';
    f.title = title || 'YouTube';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.setAttribute('allowfullscreen', '');
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    return f;
  }
  function playScreen(s) {
    if (s.classList.contains('on')) return;
    s.classList.add('on');
    var f = ytFrame(s.getAttribute('data-yt'), s.getAttribute('data-title'));
    s.innerHTML = '';
    s.appendChild(f);
    f.focus();
  }
  d.querySelectorAll('.screen[data-yt] .screen-play').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); playScreen(a.parentNode); });
  });

  /* videos behind a content notice */
  d.querySelectorAll('.screen[data-gate]').forEach(function (s) {
    var v = s.querySelector('video');
    var sp = s.querySelector('.screen-play');
    if (v) v.removeAttribute('controls');
    if (sp) { sp.setAttribute('tabindex', '-1'); sp.setAttribute('aria-hidden', 'true'); }
    var g = d.createElement('div');
    g.className = 'gate';
    var p = d.createElement('p');
    p.textContent = s.getAttribute('data-gate');
    var b = d.createElement('button');
    b.type = 'button';
    b.className = 'btn btn--solid';
    b.innerHTML = '<span class="tri"></span>';
    b.appendChild(d.createTextNode(s.getAttribute('data-play')));
    g.appendChild(p);
    g.appendChild(b);
    s.appendChild(g);
    b.addEventListener('click', function () {
      if (s.hasAttribute('data-yt')) { playScreen(s); return; }
      g.remove();
      v.setAttribute('controls', '');
      var pr = v.play();
      if (pr && pr.catch) pr.catch(function () {});
    });
  });

  /* "watch" button in the title area */
  d.querySelectorAll('[data-watch]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var sec = d.getElementById('watch');
      if (!sec) return;
      e.preventDefault();
      sec.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      var s = sec.querySelector('.screen');
      if (!s) return;
      var gb = s.querySelector('.gate button');
      if (gb) { gb.focus({ preventScroll: true }); return; }
      if (s.hasAttribute('data-yt')) { playScreen(s); return; }
      var v = s.querySelector('video');
      if (v) v.play();
    });
  });

  /* sensitive thumbnails stay hidden until the visitor asks to see them */
  d.querySelectorAll('[data-sensitive]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var r = a.closest('.veiled');
      if (!r) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      r.classList.remove('veiled');
    });
  });

  /* ads open in a player */
  var dlg = d.getElementById('player');
  function openAd(slug) {
    var a = d.querySelector('[data-ad="' + slug + '"]');
    if (a) a.click();
  }
  if (dlg && typeof dlg.showModal === 'function') {
    var scr = dlg.querySelector('.player-screen');
    var ttl = dlg.querySelector('h3');
    var dsc = dlg.querySelector('.player-meta p');
    var nav = dlg.querySelector('.player-nav');
    var count = nav.querySelector('span');
    var steps = nav.querySelectorAll('button');
    var list = [], idx = 0;
    /* show one video of a group (ads, or the Osher Ad credits) and set up its neighbours */
    var show = function (a) {
      list = [].slice.call(d.querySelectorAll('a[data-ad][data-group="' + a.getAttribute('data-group') + '"]'));
      idx = list.indexOf(a);
      ttl.textContent = a.getAttribute('data-title');
      dsc.textContent = a.getAttribute('data-desc');
      scr.innerHTML = '';
      var veil = a.hasAttribute('data-sensitive') ? a.closest('.veiled') : null;
      if (veil) {
        var g = d.createElement('div');
        g.className = 'gate';
        g.innerHTML = '<p></p><button type="button" class="btn btn--solid"><span class="tri"></span></button>';
        g.firstChild.textContent = dlg.getAttribute('data-gate');
        var gb = g.querySelector('button');
        gb.appendChild(d.createTextNode(dlg.getAttribute('data-play')));
        gb.addEventListener('click', function () { veil.classList.remove('veiled'); show(a); });
        scr.appendChild(g);
      } else {
        scr.appendChild(ytFrame(a.getAttribute('data-yt'), a.getAttribute('data-title')));
      }
      nav.hidden = list.length < 2;
      count.textContent = (idx + 1) + ' ' + dlg.getAttribute('data-of') + ' ' + list.length;
      steps[0].disabled = idx === 0;
      steps[1].disabled = idx === list.length - 1;
    };
    var go = function (s) { var n = list[idx + s]; if (n) show(n); };
    d.querySelectorAll('a[data-ad]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        show(a);
        if (!dlg.open) dlg.showModal();
      });
    });
    steps[0].addEventListener('click', function () { go(-1); });
    steps[1].addEventListener('click', function () { go(1); });
    d.addEventListener('keydown', function (e) {
      if (!dlg.open) return;
      if (e.key === 'ArrowRight') go(rtl ? -1 : 1);
      else if (e.key === 'ArrowLeft') go(rtl ? 1 : -1);
    });
    dlg.addEventListener('close', function () { scr.innerHTML = ''; });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.querySelector('.x').addEventListener('click', function () { dlg.close(); });
  }
  if (pendingAd) openAd(pendingAd);
})();
