/* ==========================================================================
   Joytree Docs — app shell
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

  let themeState = 'dark';

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
        const code = escapeHtml(buf.join('\n'));
        const id = 'cb' + Math.random().toString(36).slice(2, 9);
        html += `<div class="code-block"><pre><span class="code-lang">${escapeHtml(lang)}</span><button class="copy-btn" data-copy-target="${id}" aria-label="Copy code"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" stroke-width="1.8"/></svg></button><code id="${id}">${code}</code></pre></div>`;
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
        const headerCells = line.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
        i += 2;
        const rows = [];
        while (i < lines.length && /^\|/.test(lines[i].trim())) {
          rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
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

  function renderTOC(contentEl) {
    const toc = document.getElementById('toc');
    const heads = contentEl.querySelectorAll('h2, h3');
    if (!heads.length) { toc.innerHTML = ''; return; }
    let html = '<div class="toc-title">On this page</div>';
    heads.forEach(h => {
      html += `<a href="#${h.id}" class="${h.tagName === 'H3' ? 'lvl3' : ''}" data-toc-target="${h.id}">${h.textContent}</a>`;
    });
    toc.innerHTML = html;

    toc.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(a.dataset.tocTarget);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function updateTOCActive() {
    const toc = document.getElementById('toc');
    const links = toc.querySelectorAll('a');
    if (!links.length) return;
    let currentId = null;
    links.forEach(a => {
      const el = document.getElementById(a.dataset.tocTarget);
      if (el && el.getBoundingClientRect().top < 120) currentId = a.dataset.tocTarget;
    });
    links.forEach(a => a.classList.toggle('active', a.dataset.tocTarget === currentId));
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

  function renderHome() {
    const content = document.getElementById('content');
    document.getElementById('breadcrumb').innerHTML = '<span>Docs</span>';
    document.getElementById('pageNav').innerHTML = '';
    document.getElementById('toc').innerHTML = '';

    let cards = '';
    NAV.forEach(group => {
      cards += `<a class="grid-card" href="#/${group.children[0].key}" data-link>
        <div class="gc-icon">${GROUP_ICONS[group.key] || ''}</div>
        <h3>${group.title}</h3>
        <p>${group.children.map(c => c.title).slice(0, 3).join(' · ')}</p>
      </a>`;
    });

    content.innerHTML = `
      <div class="hero">
        <div class="hero-badge">◈ Joytree Platform Docs</div>
        <h1>Deploy, manage, and scale from one platform</h1>
        <p class="doc-lede">The dashboard, deployments, projects, managed databases, custom domains, an AI coding agent, and a full CLI — all documented in one place. Start with the <a class="md-link" href="#/quickstart" data-link>Quickstart</a>, or jump straight to a section below.</p>
      </div>
      <div class="grid-cards">${cards}</div>
    `;
    wireInternalLinks(content);
  }

  // ---------------------------------------------------------------- page render
  function renderPage(key) {
    const page = PAGES[key];
    const content = document.getElementById('content');

    if (!page) { renderNotFound(); return; }

    content.innerHTML = `
      <p class="doc-eyebrow">${page.eyebrow || page.group}</p>
      <h1>${page.title}</h1>
      <p class="doc-lede">${page.lede || ''}</p>
      ${renderMarkdown(page.md)}
    `;

    renderBreadcrumb(page, key);
    renderTOC(content);
    renderPageNav(key);
    wireInternalLinks(content);
    wireCopyButtons(content);

    document.title = `${page.title} — Joytree Docs`;
  }

  function renderNotFound() {
    const content = document.getElementById('content');
    content.innerHTML = `
      <p class="doc-eyebrow">404</p>
      <h1>Page not found</h1>
      <p class="doc-lede">That page doesn't exist yet. Head back to the <a class="md-link" href="#/" data-link>docs home</a>.</p>
    `;
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
    applyTheme(saved === 'light' ? 'light' : 'dark');
  }

  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = themeState === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    if (window.localStorage) window.localStorage.setItem('joytree-docs-theme', next);
  });

  // ---------------------------------------------------------------- mobile sidebar
  const sidebarEl = document.getElementById('sidebar');
  const scrimEl = document.getElementById('sidebarScrim');

  function openSidebarMobile() {
    sidebarEl.classList.add('open');
    scrimEl.classList.add('show');
  }
  function closeSidebarMobile() {
    sidebarEl.classList.remove('open');
    scrimEl.classList.remove('show');
  }
  document.getElementById('navToggle').addEventListener('click', () => {
    sidebarEl.classList.contains('open') ? closeSidebarMobile() : openSidebarMobile();
  });
  scrimEl.addEventListener('click', closeSidebarMobile);

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

  // keyboard shortcut "/" focuses search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput.focus();
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
  route();

})();
