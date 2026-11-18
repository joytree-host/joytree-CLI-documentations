/* JOYTREE docs: animated isometric art.
   - buildHeroArt(): the article-header scene (a real server fleet, real language logos
     flowing into it on dashed connectors, git push > build > live pills, terminal).
   - isoArt(scene, id, logos): the line-art on the home cards. Pass logo names to float
     real logo chips (assets/logos/<name>.svg) around the scene.
   Logos are the real marks: languages from devicon, AI clients from the MCP server's agents list.
   No gradients; motion is transform/opacity/dash only and is switched off by prefers-reduced-motion in CSS. */
(function (root) {
  'use strict';

  var LOGO_DIR = 'assets/logos/';
  var DARK_CHIP = { chatgpt: 1, github: 1 }; // white marks need a dark chip

  function chip(name, cx, cy, r, i, amp) {
    var s = (r * 1.25).toFixed(1), h = (-r * 0.625).toFixed(1);
    return '<g class="jt-chip" data-i="' + i + '" transform="translate(' + cx + ' ' + cy + ')"><g class="a-float a-chip" style="--amp:' + (amp || -4) + 'px;--dur:' + (3.4 + (i % 3) * 0.5).toFixed(1) + 's;animation-delay:-' + (i * 0.7).toFixed(1) + 's">' +
      '<circle class="a-chip-bg' + (DARK_CHIP[name] ? ' dk' : '') + '" r="' + r + '"/>' +
      '<image class="jt-logo" data-name="' + name + '" href="' + LOGO_DIR + name + '.svg" x="' + h + '" y="' + h + '" width="' + s + '" height="' + s + '"/></g></g>';
  }
  /* Server fleet: stacks of rack units on a slab. Each unit has a status LED and a slot line on its front face. */
  var STACKS = [[0.5, 0.5, 2], [2.4, 0.5, 3], [4.1, 0.5, 2], [1.3, 3.0, 1], [3.3, 3.0, 2]];
  var FW = 1.5, FD = 1.4;
  function fleet(ctx, z0) {
    var W = FW, D = FD, H = 0.5, G = 0.1, n = 0;
    STACKS.map(function (s, i) { return { s: s, i: i }; })
      .sort(function (a, b) { return (a.s[0] + a.s[1]) - (b.s[0] + b.s[1]); })
      .forEach(function (o) {
        var x = o.s[0], y = o.s[1], cnt = o.s[2];
        for (var k = 0; k < cnt; k++) {
          var z = z0 + k * (H + G), lift = (o.i === 1 && k === cnt - 1);
          if (lift && ctx.ghost) ctx.ghost(x, y, z, W, D, H); // where the fresh deploy lands
          if (lift) ctx.open('a-float', '--amp:-6px;--dur:3.6s');
          ctx.box(x, y, z, W, D, H, lift);
          ctx.led(x + 0.3, y + D, z + H / 2, n++, lift);
          if (ctx.bay) ctx.bay(x, y + D, z + H / 2, lift);
          else ctx.slot(x + 0.62, y + D, z + H / 2, x + W - 0.3);
          if (lift) ctx.close();
        }
      });
  }
  function stackTop(s, z0) { return [s[0] + 0.75, s[1] + 0.7, z0 + s[2] * 0.6]; }

  /* ---------------------------------------------------------------- home cards */
  var ISO_U = 22;
  var ANCHORS = [[120, 54], [152, 24], [198, 13], [238, 14], [266, 38]];

  function isoArt(scene, id, logos, pool) {
    var o = { x: 166, y: 56 }, Z0 = 0.25;
    var P = function (x, y, z) { return [o.x + (x - y) * 0.866 * ISO_U, o.y + (x + y) * 0.5 * ISO_U - z * ISO_U]; };
    var pt = function (a) { return a[0].toFixed(1) + ',' + a[1].toFixed(1); };
    var poly = function (arr, cls, extra) { return '<polygon class="' + cls + '" points="' + arr.map(pt).join(' ') + '"' + (extra || '') + '/>'; };
    var line = function (a, b, cls) { return '<path class="' + (cls || 'a-ln') + '" d="M' + pt(a) + ' L' + pt(b) + '"/>'; };
    var out = '';
    var box = function (x, y, z, w, d, h, dots) {
      out += poly([P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)], 'a-r');
      out += poly([P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)], 'a-l');
      out += poly([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)], 'a-t', dots ? ' style="fill:url(#' + id + '-d)"' : '');
    };
    var bi = 0;
    var bar = function (x0, y0, x1, y1, z) { out += '<path class="a-bar" pathLength="1" style="animation-delay:' + (bi++ * 0.45).toFixed(2) + 's" d="M' + pt(P(x0, y0, z)) + ' L' + pt(P(x1, y1, z)) + '"/>'; };
    var grp = function (cls, style, fn) { out += '<g class="' + cls + '" style="' + style + '">'; fn(); out += '</g>'; };
    var thin = function (x0, y0, x1, y1, z) { out += line(P(x0, y0, z), P(x1, y1, z), 'a-ln'); };
    var dash = function (a, b) { out += '<path class="a-ln a-dash" d="M' + pt(a) + ' L' + pt(b) + '"/>'; };
    var cyl = function (cx, cy, r, h, z) {
      var c = P(cx, cy, z), rx = r * ISO_U * 1.2247, ry = r * ISO_U * 0.7071, hh = h * ISO_U;
      out += '<path class="a-r" d="M' + (c[0] - rx) + ' ' + (c[1] - hh) + ' V' + c[1] + ' A' + rx + ' ' + ry + ' 0 0 0 ' + (c[0] + rx) + ' ' + c[1] + ' V' + (c[1] - hh) + ' Z"/>';
      out += '<ellipse class="a-t" cx="' + c[0] + '" cy="' + (c[1] - hh) + '" rx="' + rx + '" ry="' + ry + '"/>';
    };

    box(0, 0, 0, 6, 4.6, Z0, true); // dotted base slab

    if (scene === 'launch') { // the server fleet
      fleet({
        box: box,
        open: function (c, s) { out += '<g class="' + c + '" style="' + s + '">'; },
        close: function () { out += '</g>'; },
        led: function (x, y, z, n) { var c = P(x, y, z); out += '<circle class="a-led" cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="1.5" style="animation-delay:-' + ((n * 0.37) % 2.4).toFixed(2) + 's"/>'; },
        slot: function (x0, y, z, x1) { thin(x0, y, x1, y, z); }
      }, Z0);
    } else if (scene === 'panels') {
      box(0.9, 0.6, Z0, 4.2, 2.8, 0.15);
      bar(1.5, 1.4, 3.9, 1.4, Z0 + 0.15); bar(1.5, 2.0, 3.0, 2.0, Z0 + 0.15); bar(1.5, 2.6, 3.4, 2.6, Z0 + 0.15);
      grp('a-pulse', '--dur:3s', function () { box(4.0, 1.0, Z0 + 0.15, 0.6, 0.6, 0.14); });
      [[1.7, 1.2], [4.7, 1.2], [4.7, 3.1], [1.7, 3.1]].forEach(function (p) { dash(P(p[0], p[1], Z0 + 1.1), P(p[0], p[1], Z0 + 0.15)); });
      grp('a-float', '--amp:-6px;--dur:4.2s', function () {
        box(1.7, 1.2, Z0 + 1.1, 3.0, 1.9, 0.12);
        bar(2.2, 1.8, 3.9, 1.8, Z0 + 1.22); bar(2.2, 2.4, 3.1, 2.4, Z0 + 1.22);
      });
    } else if (scene === 'book') {
      box(0.7, 0.4, Z0, 4.8, 3.2, 0.3);
      box(0.85, 0.55, Z0 + 0.3, 4.5, 2.9, 0.25);
      for (var i = 0; i < 6; i++) bar(1.3, 0.95 + i * 0.42, 1.3 + (i % 2 ? 2.2 : 3.0), 0.95 + i * 0.42, Z0 + 0.55);
      grp('a-float', '--amp:-5px;--dur:3.8s', function () {
        box(2.2, 1.2, Z0 + 0.55, 2.2, 1.5, 0.12);
        grp('a-blink', '', function () { thin(2.6, 1.75, 3.1, 1.95, Z0 + 0.67); thin(2.6, 2.15, 3.1, 1.95, Z0 + 0.67); });
        bar(3.35, 2.1, 4.0, 2.1, Z0 + 0.67);
      });
    } else if (scene === 'stack') {
      box(0.8, 0.5, Z0, 4.6, 3.0, 0.4);
      grp('a-float', '--amp:-4px;--dur:3.4s', function () { box(1.25, 0.85, Z0 + 0.4, 3.7, 2.3, 0.4); });
      grp('a-float', '--amp:-8px;--dur:3.4s;animation-delay:.35s', function () {
        box(1.7, 1.2, Z0 + 0.8, 2.8, 1.6, 0.4);
        bar(2.1, 1.6, 3.9, 1.6, Z0 + 1.2); bar(2.1, 2.1, 3.1, 2.1, Z0 + 1.2);
      });
    } else if (scene === 'db') {
      cyl(0.9, 3.0, 0.5, 0.5, Z0);
      cyl(3.0, 2.0, 1.5, 0.7, Z0);
      grp('a-float', '--amp:-4px;--dur:3.4s', function () { cyl(3.0, 2.0, 1.5, 0.7, Z0 + 0.95); });
      grp('a-float', '--amp:-8px;--dur:3.4s;animation-delay:.35s', function () { cyl(3.0, 2.0, 1.5, 0.7, Z0 + 1.9); });
    } else if (scene === 'network') {
      dash(P(1.0, 0.9, Z0 + 0.5), P(4.9, 0.9, Z0 + 0.5)); dash(P(2.9, 3.2, Z0 + 0.5), P(1.0, 0.9, Z0 + 0.5)); dash(P(2.9, 3.2, Z0 + 0.5), P(4.9, 0.9, Z0 + 0.5)); dash(P(5.0, 3.0, Z0 + 0.3), P(4.9, 0.9, Z0 + 0.5));
      grp('a-pulse', '--dur:3.2s', function () { box(0.5, 0.4, Z0, 1.0, 1.0, 1.0); });
      grp('a-pulse', '--dur:3.2s;animation-delay:.8s', function () { box(4.4, 0.4, Z0, 1.0, 1.0, 1.0); });
      grp('a-pulse', '--dur:3.2s;animation-delay:1.6s', function () { box(2.4, 2.7, Z0, 1.0, 1.0, 1.0); });
      grp('a-pulse', '--dur:3.2s;animation-delay:2.4s', function () { box(4.6, 2.6, Z0, 0.8, 0.8, 0.6); });
      grp('a-float', '--amp:-5px;--dur:3.6s', function () { box(2.5, 1.2, Z0, 0.8, 0.8, 0.5); });
    } else { // notes
      box(0.9, 0.5, Z0, 4.2, 3.0, 0.12);
      for (var j = 0; j < 3; j++) {
        (function (j) {
          grp('a-pulse', '--dur:3s;animation-delay:' + (j * 0.7) + 's', function () { box(1.3, 0.9 + j * 0.85, Z0 + 0.12, 0.45, 0.45, 0.1); });
          bar(2.1, 1.12 + j * 0.85, 4.2 - (j % 2) * 0.8, 1.12 + j * 0.85, Z0 + 0.12);
        })(j);
      }
    }

    if (logos && logos.length) {
      logos.slice(0, ANCHORS.length).forEach(function (n, k) { out += chip(n, ANCHORS[k][0], ANCHORS[k][1], 12, k, -4); });
    }
    var attrs = '';
    if (logos && logos.length > 2) {
      var n = Math.min(logos.length, ANCHORS.length), sw = [[0, n - 1, -10], [1, 2, -9], [0, 2, -9], [n - 2, n - 1, -9], [1, n - 1, -10]]
        .filter(function (p) { return p[1] < n && p[0] !== p[1]; });
      attrs = ' data-slots=\'' + JSON.stringify(ANCHORS.slice(0, n)) + '\' data-swaps=\'' + JSON.stringify(sw) + '\' data-pool="' + (pool || []).join(',') + '"';
    }
    return '<svg class="card-art"' + attrs + ' viewBox="0 0 280 176" preserveAspectRatio="xMaxYMax meet" aria-hidden="true"><defs><pattern id="' + id + '-d" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="0.9" class="a-dot"/></pattern></defs>' + out + '</svg>';
  }

  /* ---------------------------------------------------------------- article hero */
  function buildHeroArt() {
    var U = 22, ox = 190, oy = 70, Z0 = 0.4;
    var P = function (x, y, z) { return [ox + (x - y) * 0.866 * U, oy + (x + y) * 0.5 * U - z * U]; };
    var pts = function (a) { return a.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); };
    var out = '';
    var box = function (x, y, z, w, d, h, hot) {
      var c = hot ? ' hot' : '';
      out += '<polygon class="a-top' + c + '" points="' + pts([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]) + '"/>' +
        '<polygon class="a-left' + c + '" points="' + pts([P(x, y + d, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x, y + d, z)]) + '"/>' +
        '<polygon class="a-right' + c + '" points="' + pts([P(x + w, y, z + h), P(x + w, y + d, z + h), P(x + w, y + d, z), P(x + w, y, z)]) + '"/>';
    };
    var pill = function (cls, x, y, w, label) {
      return '<g class="a-pill ' + cls + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="24" rx="12"/><circle cx="' + (x + 13) + '" cy="' + (y + 12) + '" r="3.4"/><text x="' + (x + 23) + '" y="' + (y + 16) + '">' + label + '</text></g>';
    };

    // base slab with dots
    box(0, 0, 0, 6, 6, 0.4);
    out += '<polygon class="a-dots" points="' + pts([P(0, 0, .4), P(6, 0, .4), P(6, 6, .4), P(0, 6, .4)]) + '"/>';
    STACKS.forEach(function (st) { // contact shadow, cast to the right of every stack
      out += '<polygon class="a-shadow" points="' + pts([P(st[0] + 0.25, st[1] + 0.15, .4), P(st[0] + FW + 0.4, st[1] + 0.15, .4), P(st[0] + FW + 0.4, st[1] + FD + 0.15, .4), P(st[0] + 0.25, st[1] + FD + 0.15, .4)]) + '"/>';
    });
    var slab = out; out = '';

    // logos flow into the fleet on dashed connectors (drawn under the units so packets slip inside)
    var LOGOS = [ // initial logo, chip x, chip y, stack the connector feeds (one slot = one connector)
      ['react', 46, 58, 0], ['claude', 198, 26, 1], ['go', 254, 22, 2], ['nodejs', 356, 116, 2],
      ['docker', 346, 174, 4], ['cursor', 106, 208, 3], ['python', 34, 178, 3]
    ];
    var POOL = ['typescript', 'chatgpt', 'php', 'gemini', 'java', 'windsurf', 'rust', 'lovable', 'vue', 'dotnet'];
    var SWAPS = [[0, 3, -36], [1, 2, -12], [6, 4, 26], [0, 2, -30], [1, 3, -28], [5, 6, 14], [5, 4, 22]];
    var links = '', chips = '';
    LOGOS.forEach(function (l, i) {
      var t = P.apply(null, stackTop(STACKS[l[3]], Z0));
      var mx = (l[1] + t[0]) / 2, my = (l[2] + t[1]) / 2 - 16;
      var d = 'M' + l[1] + ' ' + l[2] + ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + t[0].toFixed(1) + ' ' + t[1].toFixed(1);
      var b = (i * 0.55).toFixed(2);
      links += '<path class="a-flow" d="' + d + '"/>' +
        '<circle class="a-pkt" r="3" opacity="0"><animateMotion dur="2.8s" begin="' + b + 's" repeatCount="indefinite" path="' + d + '"/>' +
        '<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.8s" begin="' + b + 's" repeatCount="indefinite"/></circle>';
      chips += chip(l[0], l[1], l[2], 17, i, -5);
    });
    // fleet -> live
    var top = P.apply(null, stackTop(STACKS[2], Z0));
    var dl = 'M' + top[0].toFixed(1) + ' ' + top[1].toFixed(1) + ' Q300 40 330 54';
    links += '<path class="a-flow" d="' + dl + '"/><circle class="a-pkt" r="3" opacity="0"><animateMotion dur="2.4s" begin="1s" repeatCount="indefinite" path="' + dl + '"/>' +
      '<animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="2.4s" begin="1s" repeatCount="indefinite"/></circle>';

    fleet({
      box: box,
      open: function (c, s) { out += '<g class="' + c + ' f2" style="' + s + '">'; },
      close: function () { out += '</g>'; },
      ghost: function (x, y, z, w, d, h) { out += '<polygon class="a-ghost" points="' + pts([P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)]) + '"/>'; },
      led: function (x, y, z, n, hot) { var c = P(x, y, z); out += '<circle class="a-led' + (hot ? ' hot' : '') + '" cx="' + c[0].toFixed(1) + '" cy="' + c[1].toFixed(1) + '" r="1.9" style="animation-delay:-' + ((n * 0.37) % 2.4).toFixed(2) + 's"/>'; },
      bay: function (x, y, z, hot) { // three drive bays on the front face, the newest unit gets a live one
        for (var i = 0; i < 3; i++) {
          var bx = x + 0.55 + i * 0.3, bz = 0.12;
          out += '<polygon class="a-bay' + (hot && i === 2 ? ' hot' : '') + '" points="' + pts([P(bx, y, z + bz), P(bx + 0.22, y, z + bz), P(bx + 0.22, y, z - bz), P(bx, y, z - bz)]) + '"/>';
        }
      }
    }, Z0);
    var units = out;

    return '<svg viewBox="0 0 380 236" width="100%" height="100%" role="presentation" focusable="false" data-slots=\'' + JSON.stringify(LOGOS.map(function (l) { return [l[1], l[2]]; })) + '\' data-swaps=\'' + JSON.stringify(SWAPS) + '\' data-pool="' + POOL.join(',') + '">' +
      '<defs><pattern id="adots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.05" class="a-dot"/></pattern></defs>' +
      '<g class="a-base">' + slab + '</g>' + links + units +
      '<g class="a-node nB"><circle class="ring" cx="336" cy="56" r="9"/><circle class="core" cx="336" cy="56" r="9"/><path d="M332 56.2l2.8 2.8 5-5.6"/></g>' +
      chips +
      pill('pl1', 6, 106, 78, 'git push') + pill('pl2', 110, 6, 66, 'build') + pill('pl3', 290, 8, 62, 'live') +
      '<g class="a-term"><rect x="222" y="202" width="150" height="28" rx="8"/><text x="234" y="220"><tspan class="prompt">$ </tspan>joytree deploy<tspan class="caret">\u258D</tspan></text></g>' +
      '</svg>';
  }


  /* ---------------------------------------------------------------- motion
     Logos trade places across the fleet: two chips glide along opposite arcs on one eased curve,
     and every other beat one chip swaps its logo (short fade) for the next one in the pool, so the
     scene cycles through every language and AI client. Slow, eased, no overshoot. Skipped for
     reduced motion, hidden tabs and hidden art; stops by itself once the svg leaves the page. */
  var EASE = 'cubic-bezier(.65,0,.35,1)';
  function arc(a, b, bulge, n) {
    var cx = (a[0] + b[0]) / 2, cy = (a[1] + b[1]) / 2 + bulge, k = [], t, u;
    for (var i = 0; i <= n; i++) {
      t = i / n; u = 1 - t;
      k.push({ transform: 'translate(' + (u * u * a[0] + 2 * u * t * cx + t * t * b[0]).toFixed(2) + 'px,' + (u * u * a[1] + 2 * u * t * cy + t * t * b[1]).toFixed(2) + 'px)' });
    }
    return k;
  }
  function motion(svg) {
    if (!svg || !svg.animate || !svg.getAttribute('data-slots')) return;
    if (root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var slots, swaps, pool = (svg.getAttribute('data-pool') || '').split(',').filter(Boolean);
    try { slots = JSON.parse(svg.getAttribute('data-slots')); swaps = JSON.parse(svg.getAttribute('data-swaps') || '[]'); } catch (e) { return; }
    var occ = [].slice.call(svg.querySelectorAll('.jt-chip'));
    if (occ.length < 2 || !swaps.length) return;
    var beat = 0, last = -1, busy = false;

    function swap() {
      var p = swaps[Math.floor(Math.random() * swaps.length)];
      if (p.join() === last) p = swaps[(swaps.indexOf(p) + 1) % swaps.length];
      last = p.join();
      var A = occ[p[0]], B = occ[p[1]], a = slots[p[0]], b = slots[p[1]], dur = 1500;
      if (!A || !B) return;
      busy = true;
      svg.appendChild(A); svg.appendChild(B); // travel above the fleet, pills and terminal
      var fa = arc(a, b, p[2], 16), fb = arc(b, a, -p[2] * 0.35, 16);
      var ra = A.animate(fa, { duration: dur, easing: EASE, fill: 'forwards' }), rb = B.animate(fb, { duration: dur, easing: EASE, fill: 'forwards' });
      ra.finished.then(function () {
        A.style.transform = fa[16].transform; B.style.transform = fb[16].transform;
        ra.cancel(); rb.cancel();
        occ[p[0]] = B; occ[p[1]] = A; busy = false;
      }, function () { busy = false; });
    }
    function relogo() {
      if (!pool.length) return;
      var c = occ[Math.floor(Math.random() * occ.length)], img = c.querySelector('.jt-logo'), bg = c.querySelector('.a-chip-bg');
      if (!img) return;
      var next = pool.shift(), prev = img.getAttribute('data-name');
      busy = true;
      var out = img.animate([{ opacity: 1, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(.82)' }], { duration: 260, easing: 'ease-in', fill: 'forwards' });
      out.finished.then(function () {
        img.setAttribute('href', LOGO_DIR + next + '.svg'); img.setAttribute('data-name', next);
        if (bg) bg.classList.toggle('dk', !!DARK_CHIP[next]);
        pool.push(prev);
        var inn = img.animate([{ opacity: 0, transform: 'scale(.82)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 360, easing: 'ease-out', fill: 'forwards' });
        inn.finished.then(function () { inn.cancel(); out.cancel(); busy = false; }, function () { busy = false; });
      }, function () { busy = false; });
    }
    function tick() {
      if (!svg.isConnected) return;
      var r = svg.getBoundingClientRect(), vh = root.innerHeight || 800;
      var visible = !document.hidden && r.width > 0 && r.bottom > 0 && r.top < vh;
      if (visible && !busy) { (beat++ % 2 === 0) ? swap() : relogo(); }
      setTimeout(tick, 2600 + Math.random() * 900);
    }
    setTimeout(tick, 1600 + Math.random() * 1400);
  }

  var api = { buildHeroArt: buildHeroArt, isoArt: isoArt, motion: motion, ISO_U: ISO_U };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.JTArt = api;
})(typeof window !== 'undefined' ? window : this);
