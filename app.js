/* ==========================================================================
   JOYTREE Docs — app shell
   Hash-based router (works on any static host with zero server config).
   ========================================================================== */

(function () {
  'use strict';

  // ---------------------------------------------------------------- state
  const KEY_TO_GROUP = {};
  const KEY_ORDER = [];
  NAV.forEach(group => {
    group.children.forEach(child => {
      KEY_TO_GROUP[child.key] = group;
      KEY_ORDER.push(child.key);
    });
  });

  let themeState = 'light';

  // ---------------------------------------------------------------- tiny markdown -> html
  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function inline(text) {
    // code spans first (protect content)
    const codeSpans = [];
    text = text.replace(/`([^`]+)`/g, (m, code) => {
      codeSpans.push(escapeHtml(code));
      return `\u0000${codeSpans.length - 1}\u0000`;
    });
    text = escapeHtml(text);
    // bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // links [text](url) — internal hash links get data-link
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, label, url) => {
      const isInternal = url.startsWith('#/');
      return `<a class="md-link" href="${url}" ${isInternal ? 'data-link' : 'target="_blank" rel="noopener"'}>${label}</a>`;
    });
    // restore code spans
    text = text.replace(/\u0000(\d+)\u0000/g, (m, i) => `<code>${codeSpans[+i]}</code>`);
    return text;
  }

  const CURSOR_SVG = '<svg viewBox="0 0 24 32" width="30" height="40" aria-hidden="true"><path d="M2 2v24l6.2-5.4 4.4 10 4.2-1.9-4.3-9.6H21z" fill="#fff" stroke="#111" stroke-width="2.2" stroke-linejoin="round"/></svg>';

  function renderShot(f) {
    const pts = (f.cursor || '').split('>').map(p => p.trim().split(',').map(Number)).filter(p => p.length === 2 && !p.some(isNaN));
    let cur = '';
    if (pts.length >= 2) {
      const two = pts.length >= 3;
      const st = `--sx:${pts[0][0]}%;--sy:${pts[0][1]}%;--x1:${pts[1][0]}%;--y1:${pts[1][1]}%;--x2:${(pts[2] || pts[1])[0]}%;--y2:${(pts[2] || pts[1])[1]}%`;
      cur = `<span class="curx ${two ? 'two' : 'one'}" style="${st}" aria-hidden="true">${CURSOR_SVG}</span>`;
    }
    const fo = (f.focus || '').split(',').map(Number);
    const two = pts.length >= 3;
    const focus = fo.length === 4 && !fo.some(isNaN)
      ? `<span class="focus ${two ? 'f2' : 'f1'}" style="left:${fo[0]}%;top:${fo[1]}%;width:${fo[2]}%;height:${fo[3]}%" aria-hidden="true"></span>` : '';
    const notes = f.notes.length ? `<ul class="notes">${f.notes.map(n => `<li><span>${inline(n)}</span></li>`).join('')}</ul>` : '';
    return `<figure class="shot">
      <p class="gstep"><b>${escapeHtml(f.step || '')}</b><span>${inline(f.title || '')}</span></p>
      <div class="frame">
        <div class="cap"><span>${f.bar || ''}</span><button type="button" class="zoom">Enlarge</button></div>
        <div class="stage"><img src="${escapeHtml(f.img || '')}" width="1200" height="${escapeHtml(f.h || '491')}" loading="lazy" alt="${escapeHtml(f.alt || '')}">${focus}${cur}</div>
      </div>
      ${notes}
    </figure>`;
  }

  let shotLB = null, shotIO = null;
  function wireShots(scope) {
    const figs = [...scope.querySelectorAll('figure.shot')];
    if (!figs.length) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (shotIO) { shotIO.disconnect(); shotIO = null; }
    if ('IntersectionObserver' in window && !reduce) {
      shotIO = new IntersectionObserver(es => es.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('seen'); shotIO.unobserve(en.target); }
      }), { threshold: .4 });
      figs.forEach(fg => shotIO.observe(fg));
    } else figs.forEach(fg => fg.classList.add('seen'));

    if (!shotLB) {
      shotLB = document.createElement('dialog');
      shotLB.className = 'shot-dialog';
      shotLB.setAttribute('aria-label', 'Enlarged screenshot');
      document.body.appendChild(shotLB);
      shotLB.addEventListener('click', () => { if (shotLB.close) shotLB.close(); else shotLB.removeAttribute('open'); });
    }
    figs.forEach(fg => {
      const frame = fg.querySelector('.frame');
      frame.addEventListener('click', e => {
        if (!e.target.closest('.stage') && !e.target.closest('.zoom')) return;
        shotLB.innerHTML = '';
        const c = frame.cloneNode(true);
        const z = c.querySelector('.zoom'); if (z) z.textContent = 'Close';
        shotLB.appendChild(c);
        if (shotLB.showModal) shotLB.showModal(); else shotLB.setAttribute('open', '');
      });
    });
  }

  function renderMarkdown(md) {
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let i = 0;
    let listBuffer = null; // { type: 'ul'|'ol', items: [] }

    function flushList() {
      if (!listBuffer) return;
      const tag = listBuffer.type;
      html += `<${tag}>${listBuffer.items.map(it => `<li>${inline(it)}</li>`).join('')}</${tag}>`;
      listBuffer = null;
    }

    while (i < lines.length) {
      const line = lines[i];

      // fenced code block
      const fence = line.match(/^```(\w*)\s*$/);
      if (fence) {
        flushList();
        const lang = fence[1] || 'text';
        const buf = [];
        i++;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++; // skip closing fence
        const raw = buf.join('\n');
        const id = 'cb' + Math.random().toString(36).slice(2, 9);
        const hl = window.JTHighlight && window.JTHighlight.supports(lang);
        const code = hl ? window.JTHighlight(raw, lang) : escapeHtml(raw);
        const copySvg = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" stroke-width="1.8"/></svg>';
        if (hl) {
          const isShell = /^(bash|sh|shell|zsh)$/i.test(lang);
          const ico = isShell
            ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="m7.5 10 3 2.5-3 2.5M13 15h3.5"/></svg>'
            : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>';
          html += `<div class="code-block hl"><div class="code-head"><span class="code-ico">${ico}</span><span class="code-lang">${escapeHtml(lang)}</span><button class="copy-btn" data-copy-target="${id}" aria-label="Copy code">${copySvg}</button></div><pre><code id="${id}">${code}</code></pre></div>`;
        } else {
          html += `<div class="code-block"><pre><span class="code-lang">${escapeHtml(lang)}</span><button class="copy-btn" data-copy-target="${id}" aria-label="Copy code">${copySvg}</button><code id="${id}">${code}</code></pre></div>`;
        }
        continue;
      }

      // screenshot steps :::shot ... ::: (key: value lines; cursor: sx,sy > x1,y1 [> x2,y2] in % of the image)
      if (/^:::shot\s*$/.test(line)) {
        flushList();
        const f = { notes: [] };
        i++;
        while (i < lines.length && !/^:::\s*$/.test(lines[i])) {
          const kv = lines[i].match(/^(\w+):\s*(.*)$/);
          if (kv) { if (kv[1] === 'note') f.notes.push(kv[2]); else f[kv[1]] = kv[2]; }
          i++;
        }
        i++;
        html += renderShot(f);
        continue;
      }

      // callouts :::tip ... ::: / :::warn ... :::
      const calloutStart = line.match(/^:::(tip|warn)\s*$/);
      if (calloutStart) {
        flushList();
        const type = calloutStart[1];
        const buf = [];
        i++;
        while (i < lines.length && !/^:::\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        const icon = type === 'tip'
          ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 18h6M10 22h4M12 2a6.5 6.5 0 0 0-4 11.6c.6.5 1 1.3 1 2.1V16h6v-.3c0-.8.4-1.6 1-2.1A6.5 6.5 0 0 0 12 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>'
          : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 9v5M12 17h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
        html += `<div class="callout ${type}"><span class="callout-icon">${icon}</span><p>${inline(buf.join(' ').trim())}</p></div>`;
        continue;
      }

      // tables
      if (/^\|/.test(line.trim()) && lines[i + 1] && /^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(lines[i + 1])) {
        flushList();
        // split on unescaped pipes only; "\|" is a literal pipe inside a cell
        const splitRow = (s) => s.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '')
          .split(/(?<!\\)\|/).map(c => c.replace(/\\\|/g, '|').trim());
        const headerCells = splitRow(line);
        i += 2;
        const rows = [];
        while (i < lines.length && /^\|/.test(lines[i].trim())) {
          rows.push(splitRow(lines[i]));
          i++;
        }
        html += '<table><thead><tr>' + headerCells.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
          rows.map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') +
          '</tbody></table>';
        continue;
      }

      // headings
      let m;
      if ((m = line.match(/^###\s+(.*)$/))) { flushList(); html += `<h3 id="${slugify(m[1])}">${inline(m[1])}</h3>`; i++; continue; }
      if ((m = line.match(/^##\s+(.*)$/))) { flushList(); html += `<h2 id="${slugify(m[1])}">${inline(m[1])}</h2>`; i++; continue; }
      if ((m = line.match(/^#\s+(.*)$/))) { flushList(); html += `<h1>${inline(m[1])}</h1>`; i++; continue; }

      // lists
      if ((m = line.match(/^-\s+(.*)$/))) {
        if (!listBuffer || listBuffer.type !== 'ul') { flushList(); listBuffer = { type: 'ul', items: [] }; }
        listBuffer.items.push(m[1]);
        i++; continue;
      }
      if ((m = line.match(/^\d+\.\s+(.*)$/))) {
        if (!listBuffer || listBuffer.type !== 'ol') { flushList(); listBuffer = { type: 'ol', items: [] }; }
        listBuffer.items.push(m[1]);
        i++; continue;
      }

      // blank line
      if (line.trim() === '') { flushList(); i++; continue; }

      // paragraph
      flushList();
      html += `<p>${inline(line.trim())}</p>`;
      i++;
    }
    flushList();
    return html;
  }

  function slugify(text) {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
  }

  // ---------------------------------------------------------------- sidebar
  const treeIcon = `<svg class="nav-group-icon" width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  function buildSidebar(activeKey) {
    const nav = document.getElementById('sidebarNav');
    nav.innerHTML = '';
    NAV.forEach(group => {
      const isOpen = group.children.some(c => c.key === activeKey) || group.key === (KEY_TO_GROUP[activeKey] && KEY_TO_GROUP[activeKey].key);
      const wrap = document.createElement('div');
      wrap.className = 'nav-group' + (isOpen ? ' open' : '');
      wrap.dataset.groupKey = group.key;

      const btn = document.createElement('button');
      btn.className = 'nav-group-btn';
      btn.innerHTML = `${treeIcon}<span class="nav-group-label">${group.title}</span><span class="nav-group-count">${group.children.length}</span>`;
      btn.addEventListener('click', () => wrap.classList.toggle('open'));
      wrap.appendChild(btn);

      const ul = document.createElement('ul');
      ul.className = 'nav-children';
      group.children.forEach(child => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#/${child.key}`;
        a.className = 'nav-link' + (child.key === activeKey ? ' active' : '');
        a.textContent = child.title;
        a.setAttribute('data-link', '');
        a.setAttribute('data-key', child.key);
        li.appendChild(a);
        ul.appendChild(li);
      });
      wrap.appendChild(ul);
      nav.appendChild(wrap);
    });
  }

  function setActiveSidebarLink(key) {
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.dataset.key === key);
    });
    document.querySelectorAll('.nav-group').forEach(g => {
      const hasActive = g.querySelector('.nav-link.active');
      if (hasActive) g.classList.add('open');
    });
  }

  // ---------------------------------------------------------------- breadcrumb / TOC / page-nav
  function renderBreadcrumb(page, key) {
    const bc = document.getElementById('breadcrumb');
    const group = KEY_TO_GROUP[key];
    bc.innerHTML = `
      <a href="#/" data-link>Docs</a>
      <span class="sep">/</span>
      <span>${group ? group.title : ''}</span>
      <span class="sep">/</span>
      <span>${page.title}</span>
    `;
  }

  const AI_ICONS = {
    copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    chatgpt: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 4v8l-7 4-7-4V7z"/><path d="M12 3v8l7 4M12 11L5 15"/></svg>',
    claude: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>',
    cursor: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 2.5l8.5 4.9v9.2L12 21.5l-8.5-4.9V7.4z"/><path d="M12 12l8.5-4.6M12 12v9.5M12 12L3.5 7.4"/></svg>',
    ext: '<svg class="ai-ext" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>'
  };

  function aiPrompt(key) {
    const page = PAGES[key];
    const url = location.origin + location.pathname + '#/' + key;
    const body = (page.md || '').slice(0, 6000);
    return `I'm reading the JOYTREE docs page "${page.title}" (${url}). Use the content below to answer my questions about it.\n\n# ${page.title}\n${page.lede || ''}\n\n${body}`;
  }

  function renderAskAI(key) {
    const page = PAGES[key];
    if (!page) return '';
    const q = encodeURIComponent(aiPrompt(key));
    const row = (href, icon, label) => `<a class="ai-row" href="${href}" target="_blank" rel="noopener">${AI_ICONS[icon]}<span>${label}</span>${AI_ICONS.ext}</a>`;
    return `
      <div class="toc-ai">
        <div class="toc-ai-title">Ask AI about this page</div>
        <button type="button" class="ai-row" id="aiCopyPage">${AI_ICONS.copy}<span>Copy page</span></button>
        ${row('https://chatgpt.com/?q=' + q, 'chatgpt', 'Open in ChatGPT')}
        ${row('https://claude.ai/new?q=' + q, 'claude', 'Open in Claude')}
        ${row('https://cursor.com/link/prompt?text=' + q, 'cursor', 'Open in Cursor')}
        <a class="toc-cta" href="https://joytree.site/dashboard" target="_blank" rel="noopener">Deploy with JOYTREE ${AI_ICONS.ext}</a>
      </div>`;
  }

  function renderTOC(contentEl, key) {
    const toc = document.getElementById('toc');
    const heads = contentEl.querySelectorAll('h2, h3');
    let html = '';
    if (heads.length) {
      html += '<div class="toc-title"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h10M4 18h13"/></svg>On this page</div><nav class="toc-list">';
      heads.forEach(h => {
        html += `<a href="#${h.id}" class="${h.tagName === 'H3' ? 'lvl3' : ''}" data-toc-target="${h.id}">${h.textContent}</a>`;
      });
      html += '</nav>';
    }
    html += renderAskAI(key);
    toc.innerHTML = html;

    toc.querySelectorAll('a[data-toc-target]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(a.dataset.tocTarget);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    const copyBtn = document.getElementById('aiCopyPage');
    if (copyBtn) copyBtn.addEventListener('click', () => {
      const page = PAGES[key];
      const text = `# ${page.title}\n\n${page.lede ? page.lede + '\n\n' : ''}${page.md || ''}`;
      const done = () => {
        const label = copyBtn.querySelector('span');
        const old = label.textContent;
        label.textContent = 'Copied!'; copyBtn.classList.add('copied');
        setTimeout(() => { label.textContent = old; copyBtn.classList.remove('copied'); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
      else {
        const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {} ta.remove(); done();
      }
    });
  }

  function updateTOCActive() {
    const toc = document.getElementById('toc');
    const links = toc.querySelectorAll('a[data-toc-target]');
    if (!links.length) return;
    let currentId = null;
    links.forEach(a => {
      const el = document.getElementById(a.dataset.tocTarget);
      if (el && el.getBoundingClientRect().top < 120) currentId = a.dataset.tocTarget;
    });
    links.forEach(a => a.classList.toggle('active', a.dataset.tocTarget === currentId));
    // keep the active heading visible inside the rail's own list without moving the page
    const list = toc.querySelector('.toc-list'), act = list && list.querySelector('a.active');
    if (act) {
      const top = act.offsetTop, bottom = top + act.offsetHeight;
      if (top < list.scrollTop) list.scrollTop = Math.max(0, top - 8);
      else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight + 8;
    }
  }

  function renderPageNav(key) {
    const el = document.getElementById('pageNav');
    const idx = KEY_ORDER.indexOf(key);
    if (idx === -1) { el.innerHTML = ''; return; }
    const prevKey = KEY_ORDER[idx - 1];
    const nextKey = KEY_ORDER[idx + 1];
    let html = '';
    if (prevKey) {
      html += `<a class="page-nav-link prev" href="#/${prevKey}" data-link><div class="pnl-dir">← Previous</div><div class="pnl-title">${PAGES[prevKey].title}</div></a>`;
    } else { html += '<span></span>'; }
    if (nextKey) {
      html += `<a class="page-nav-link next" href="#/${nextKey}" data-link><div class="pnl-dir">Next →</div><div class="pnl-title">${PAGES[nextKey].title}</div></a>`;
    }
    el.innerHTML = html;
  }

  // ---------------------------------------------------------------- home page
  const GROUP_ICONS = {
    start: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
    dashboard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 20h8M12 16v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M7 13v-3M11.5 13V8M16 13v-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    deploy: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 16.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5M12 15V3m0 0 4 4m-4-4-4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    projects: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="1.7"/></svg>',
    databases: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5.5" rx="8" ry="3" stroke="currentColor" stroke-width="1.7"/><path d="M4 5.5V18c0 1.7 3.6 3 8 3s8-1.3 8-3V5.5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" stroke="currentColor" stroke-width="1.7"/></svg>',
    domains: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M3 12h18M12 3c2.5 2.6 3.8 6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-6-3.8-9s1.3-6.4 3.8-9Z" stroke="currentColor" stroke-width="1.7"/></svg>',
    agent: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="8" width="16" height="11" rx="2.5" stroke="currentColor" stroke-width="1.7"/><path d="M12 8V4m-3 0h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="9" cy="13.5" r="1.3" fill="currentColor"/><circle cx="15" cy="13.5" r="1.3" fill="currentColor"/></svg>',
    developer: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m8 9-4 4 4 4M16 9l4 4-4 4M13 6l-2 12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="currentColor"/></svg>',
    ssh: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="8" cy="15" r="4" stroke="currentColor" stroke-width="1.7"/><path d="m11 12 9-9m-3 3 2 2m-6 0 2 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    account: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.7"/><path d="M4 20c0-3.9 3.6-6 8-6s8 2.1 8 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    cli: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m5 7 5 5-5 5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18h7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    mcp: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 3v3.5M15 3v3.5M9 17.5V21M15 17.5V21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><rect x="6" y="6.5" width="12" height="11" rx="2.5" stroke="currentColor" stroke-width="1.7"/><circle cx="10" cy="12" r="1.2" fill="currentColor"/><circle cx="14" cy="12" r="1.2" fill="currentColor"/></svg>',
    api: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m11-5v3a2 2 0 0 1-2 2h-3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  };

  // ---------------------------------------------------------------- hero art (server fleet + real logos): see art.js
  const buildHeroArt = window.JTArt.buildHeroArt;

  function setHero(html) {
    const body = document.getElementById('heroBody');
    body.innerHTML = html;
    wireInternalLinks(body);
  }

  const GROUP_DESC = {
    start: 'New here? Learn what JOYTREE is, sign in and ship your first app.',
    dashboard: 'Find your way around the Command Center and make it yours.',
    deploy: 'Ship from GitHub or a local folder, with rollbacks and live build logs.',
    projects: 'Organise apps, environment variables and runtime logs in one place.',
    databases: 'Managed PostgreSQL, MySQL, MongoDB and Redis, with tools to explore them.',
    domains: 'Connect custom domains and manage DNS records with automatic HTTPS.',
    agent: 'Describe what you want and let the AI agent build and deploy it.',
    developer: 'Compose flows and AI versions with the Developer API Builder.',
    github: 'Link your account, pick repos and deploy on every push.',
    ssh: 'Add SSH keys to work securely from your own machine.',
    account: 'API keys, plans, billing and everything about your account.',
    cli: 'Install the CLI and script deployments from your terminal.',
    mcp: 'Connect your AI agent to JOYTREE and operate it in plain language.',
    api: 'Authenticate, call endpoints and handle errors programmatically.',
  };

  // ---- isometric line-art illustrations (server fleet, panels, network...) with real logo chips: see art.js
  const isoArt = window.JTArt.isoArt;

  const SCENE = { start: 'launch', dashboard: 'panels', deploy: 'stack', projects: 'notes', databases: 'db', domains: 'network', agent: 'panels', developer: 'book', github: 'network', ssh: 'notes', account: 'notes', cli: 'book', mcp: 'network', api: 'stack' };
  // real marks (assets/logos): languages from devicon, AI clients from the MCP server's agent list
  const LANG_LOGOS = ['react', 'python', 'nodejs', 'go', 'docker'];
  const AI_LOGOS = ['claude', 'cursor', 'chatgpt', 'gemini', 'windsurf'];
  const LANG_POOL = ['typescript', 'php', 'java', 'rust', 'vue', 'dotnet'];
  const AI_POOL = ['gemini', 'windsurf', 'lovable'];
  const GROUP_LOGOS = {
    start: LANG_LOGOS, deploy: ['typescript', 'php', 'java', 'rust', 'vue'], agent: AI_LOGOS.slice(0, 3), mcp: AI_LOGOS,
    dashboard: ['layout', 'react', 'typescript', 'nodejs', 'vue'],
    projects: ['folder', 'docker', 'nodejs', 'python', 'php'],
    databases: ['postgresql', 'mysql', 'mongodb', 'redis', 'mariadb'],
    domains: ['globe', 'lock', 'shield', 'link'],
    developer: ['typescript', 'nodejs', 'python', 'go', 'php'],
    github: ['github', 'branch', 'docker', 'nodejs', 'react'],
    ssh: ['key', 'terminal', 'shield', 'lock'],
    account: ['key', 'card', 'shield', 'lock'],
    cli: ['terminal', 'nodejs', 'python', 'go', 'rust'],
    api: ['api', 'nodejs', 'python', 'go', 'php'],
  };
  const GROUP_POOL = {
    dashboard: ['python', 'php', 'docker'], projects: ['java', 'go', 'rust'],
    databases: ['supabase', 'firebase'], domains: ['key', 'terminal'],
    developer: ['java', 'rust', 'dotnet'], github: ['python', 'typescript', 'vue'],
    ssh: ['python', 'go', 'docker'], account: ['globe', 'folder'],
    cli: ['docker', 'java', 'typescript'], api: ['java', 'typescript', 'rust'],
  };
  const TONES = ['amber', 'blue', 'rose', 'green', 'violet'];

  function renderHome() {
    document.body.classList.add('is-home');
    const content = document.getElementById('content');
    document.getElementById('breadcrumb').innerHTML = '';
    document.getElementById('pageNav').innerHTML = '';
    document.getElementById('toc').innerHTML = '';

    const byKey = {};
    NAV.forEach(g => { byKey[g.key] = g; });
    const card = (cls, tone, href, title, text, scene, id, logos, pool) =>
      `<a class="${cls} tone-${tone}" href="${href}" data-link>${isoArt(scene, id, logos, pool)}<h3>${title}</h3><p>${text}</p></a>`;

    const featured = [
      ['amber', '#/quickstart', 'Quickstart', 'Create an account and deploy your first app in minutes.', 'launch', LANG_LOGOS, LANG_POOL],
      ['rose', '#/cli-install', 'CLI', 'Install the command line and deploy from your terminal.', 'book', GROUP_LOGOS.cli, GROUP_POOL.cli],
      ['green', '#/' + byKey.mcp.children[0].key, 'MCP Server', 'Let Claude, Cursor or ChatGPT operate your projects.', 'network', AI_LOGOS, ['lovable']],
    ].map((f, i) => card('feat-card', f[0], f[1], f[2], f[3], f[4], 'f' + i, f[5], f[6])).join('');

    const cards = NAV.map((g, i) =>
      card('grid-card', TONES[i % TONES.length], '#/' + g.children[0].key, g.title, GROUP_DESC[g.key] || '', SCENE[g.key] || 'notes', 'g' + i, GROUP_LOGOS[g.key], GROUP_POOL[g.key])
    ).join('');

    setHero(`
        <p class="doc-eyebrow">Documentation</p>
        <h1>Build, deploy and scale with JOYTREE</h1>
        <p class="doc-lede">The dashboard, deployments, projects, managed databases, custom domains, an AI coding agent and a full CLI, all documented in one place.</p>
        <div class="hero-actions">
          <a class="hero-btn primary" href="#/quickstart" data-link>Quickstart</a>
          <a class="hero-btn ghost" href="#/cli-reference" data-link>CLI reference</a>
        </div>
    `);
    content.innerHTML = `
      <section class="home-sec">
        <h2 class="home-h">Start here</h2>
        <div class="feat-cards">${featured}</div>
      </section>
      <section class="home-sec">
        <h2 class="home-h">Explore the docs</h2>
        <div class="grid-cards">${cards}</div>
      </section>
    `;
    wireInternalLinks(content);
    content.querySelectorAll('.feat-card .card-art, .grid-card .card-art').forEach(window.JTArt.motion);
  }

  // ---------------------------------------------------------------- page render
  function renderPage(key) {
    document.body.classList.remove('is-home');
    const page = PAGES[key];
    const content = document.getElementById('content');

    if (!page) { renderNotFound(); return; }

    setHero(`
      <p class="doc-eyebrow">${page.eyebrow || page.group}</p>
      <h1>${page.title}</h1>
      <p class="doc-lede">${page.lede || ''}</p>
    `);
    content.innerHTML = renderMarkdown(page.md);

    renderBreadcrumb(page, key);
    renderTOC(content, key);
    renderPageNav(key);
    wireInternalLinks(content);
    wireCopyButtons(content);
    wireShots(content);

    document.title = `${page.title} — JOYTREE Docs`;
  }

  function renderNotFound() {
    document.body.classList.remove('is-home');
    const content = document.getElementById('content');
    setHero(`
      <p class="doc-eyebrow">404</p>
      <h1>Page not found</h1>
      <p class="doc-lede">That page doesn't exist yet. Head back to the <a class="md-link" href="#/" data-link>docs home</a>.</p>
    `);
    content.innerHTML = '';
    document.getElementById('breadcrumb').innerHTML = '';
    document.getElementById('toc').innerHTML = '';
    document.getElementById('pageNav').innerHTML = '';
    wireInternalLinks(content);
  }

  function wireInternalLinks(scope) {
    scope.querySelectorAll('a[data-link]').forEach(a => {
      a.addEventListener('click', e => {
        // let router (hashchange) handle navigation naturally
        closeSidebarMobile();
      });
    });
  }

  function wireCopyButtons(scope) {
    scope.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.copyTarget);
        const text = target ? target.textContent : '';
        navigator.clipboard.writeText(text).then(() => {
          btn.classList.add('copied');
          const original = btn.innerHTML;
          btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12.5 9 17 20 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = original; }, 1400);
        }).catch(() => {});
      });
    });
  }

  // ---------------------------------------------------------------- router
  function currentKeyFromHash() {
    const h = location.hash.replace(/^#\/?/, '');
    return h || '';
  }

  function route() {
    const key = currentKeyFromHash();
    if (!key) {
      renderHome();
      buildSidebar(null);
    } else if (PAGES[key]) {
      renderPage(key);
      buildSidebar(key);
    } else {
      renderNotFound();
      buildSidebar(null);
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    closeSidebarMobile();
    resetFeedback();
    searchResults.hidden = true;
  }

  function resetFeedback() {
    document.querySelectorAll('.fb-btn').forEach(b => b.style.display = '');
    const label = document.querySelector('.feedback span');
    if (label) label.style.display = '';
    const thanks = document.getElementById('fbThanks');
    if (thanks) thanks.hidden = true;
  }

  window.addEventListener('hashchange', route);
  window.addEventListener('scroll', () => { updateTOCActive(); }, { passive: true });

  // ---------------------------------------------------------------- theme
  function applyTheme(mode) {
    themeState = mode;
    document.documentElement.setAttribute('data-theme', mode);
    document.getElementById('iconSun').hidden = mode === 'dark';
    document.getElementById('iconMoon').hidden = mode !== 'dark';
  }

  function initTheme() {
    const saved = window.localStorage ? window.localStorage.getItem('joytree-docs-theme') : null;
    applyTheme(saved === 'dark' ? 'dark' : 'light');
  }

  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = themeState === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    if (window.localStorage) window.localStorage.setItem('joytree-docs-theme', next);
  });

  // ---------------------------------------------------------------- mobile menu (full-screen drawer)
  const sidebarEl = document.getElementById('sidebar');
  const scrimEl = document.getElementById('sidebarScrim');
  const toggleEl = document.getElementById('navToggle');
  const searchBox = document.querySelector('.topbar-search');
  const searchSlot = document.getElementById('drawerSearchSlot');
  const topInner = document.querySelector('.topbar-inner');
  const topNavEl = document.querySelector('.topnav');
  const mqMobile = window.matchMedia('(max-width: 860px)');

  function placeSearch(inDrawer) {
    if (inDrawer) { if (searchBox.parentElement !== searchSlot) searchSlot.appendChild(searchBox); }
    else if (searchBox.parentElement !== topInner) topInner.insertBefore(searchBox, topNavEl);
  }
  function openSidebarMobile() {
    placeSearch(true);
    sidebarEl.classList.add('open');
    sidebarEl.scrollTop = 0;
    document.body.classList.add('nav-open');
    toggleEl.setAttribute('aria-expanded', 'true');
  }
  function closeSidebarMobile() {
    sidebarEl.classList.remove('open');
    document.body.classList.remove('nav-open');
    toggleEl.setAttribute('aria-expanded', 'false');
    placeSearch(false);
  }
  toggleEl.addEventListener('click', () => {
    sidebarEl.classList.contains('open') ? closeSidebarMobile() : openSidebarMobile();
  });
  scrimEl.addEventListener('click', closeSidebarMobile);
  sidebarEl.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (a && mqMobile.matches) closeSidebarMobile();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && sidebarEl.classList.contains('open') && mqMobile.matches) closeSidebarMobile(); });
  const onMq = () => { if (!mqMobile.matches) closeSidebarMobile(); };
  if (mqMobile.addEventListener) mqMobile.addEventListener('change', onMq); else mqMobile.addListener(onMq);

  // ---------------------------------------------------------------- search
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  function buildSearchIndex() {
    return KEY_ORDER.map(key => {
      const page = PAGES[key];
      const group = KEY_TO_GROUP[key];
      return {
        key, title: page.title, group: group.title,
        text: (page.lede + ' ' + page.md).toLowerCase(),
      };
    });
  }
  const SEARCH_INDEX = buildSearchIndex();

  function runSearch(q) {
    q = q.trim().toLowerCase();
    if (!q) { searchResults.hidden = true; searchResults.innerHTML = ''; return; }
    const matches = SEARCH_INDEX
      .map(item => {
        let score = 0;
        if (item.title.toLowerCase().includes(q)) score += 10;
        if (item.text.includes(q)) score += 1;
        return { item, score };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    if (!matches.length) {
      searchResults.innerHTML = '<div class="sr-empty">No results for "' + escapeHtml(q) + '"</div>';
    } else {
      searchResults.innerHTML = matches.map(({ item }) => `
        <a href="#/${item.key}" data-link>
          <div class="sr-group">${item.group}</div>
          <div class="sr-title">${item.title}</div>
        </a>
      `).join('');
    }
    searchResults.hidden = false;
  }

  searchInput.addEventListener('input', e => runSearch(e.target.value));
  searchInput.addEventListener('focus', e => { if (e.target.value) runSearch(e.target.value); });
  document.addEventListener('click', e => {
    if (!e.target.closest('.topbar-search')) { searchResults.hidden = true; }
  });
  searchResults.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (a) { searchInput.value = ''; searchResults.hidden = true; }
  });

  // keyboard shortcuts: "/" and Ctrl/Cmd+K focus search
  const kbd = document.getElementById('searchKbd');
  if (kbd) kbd.textContent = /Mac|iPhone|iPad/.test(navigator.platform || '') ? '\u2318K' : 'Ctrl K';
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput.focus();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    if (e.key === 'Escape') { searchInput.blur(); searchResults.hidden = true; }
  });

  // ---------------------------------------------------------------- feedback (footer)
  document.addEventListener('click', e => {
    const btn = e.target.closest('.fb-btn');
    if (!btn) return;
    document.querySelectorAll('.fb-btn').forEach(b => b.style.display = 'none');
    document.querySelector('.feedback span').style.display = 'none';
    const thanks = document.getElementById('fbThanks');
    if (thanks) thanks.hidden = false;
  });

  // ---------------------------------------------------------------- init
  document.getElementById('year').textContent = new Date().getFullYear();
  initTheme();
  (function(){ const h = document.getElementById('pageHero'); if (h && !document.getElementById('heroArt')) { const d = document.createElement('div'); d.className = 'hero-art'; d.id = 'heroArt'; d.setAttribute('aria-hidden','true'); d.innerHTML = buildHeroArt(); h.appendChild(d); window.JTArt.motion(d.querySelector('svg')); } })();
  route();

})();
