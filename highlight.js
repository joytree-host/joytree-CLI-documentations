/* JOYTREE docs - tiny dependency-free syntax highlighter.
   window.JTHighlight(rawCode, lang) -> HTML string (already escaped).
   Languages: bash/sh/shell, js/javascript, python, json, sql, text/output (terminal output). Anything else
   is returned escaped and unstyled. Token classes are styled in styles.css
   (.tk-*), with separate palettes for light and dark themes. */
(function () {
  'use strict';

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function span(cls, text) {
    return cls ? '<span class="tk-' + cls + '">' + esc(text) + '</span>' : esc(text);
  }

  // Build one combined sticky-free scanner from [class, source] rules.
  function scan(code, rules, onToken) {
    var re = new RegExp(rules.map(function (r) { return '(' + r[1] + ')'; }).join('|'), 'gm');
    var out = [], last = 0, m;
    while ((m = re.exec(code))) {
      if (m[0] === '') { re.lastIndex++; continue; }
      if (m.index > last) out.push({ cls: null, text: code.slice(last, m.index) });
      var idx = 1;
      while (idx <= rules.length && m[idx] === undefined) idx++;
      out.push({ cls: rules[idx - 1][0], text: m[0] });
      last = re.lastIndex;
    }
    if (last < code.length) out.push({ cls: null, text: code.slice(last) });
    return onToken ? onToken(out) : out;
  }
  function render(tokens) {
    return tokens.map(function (t) { return span(t.cls, t.text); }).join('');
  }

  // ------------------------------------------------------------------ bash
  var BASH = [
    ['comment', '(?:^|(?<=\\s))#[^\\n]*'],
    ['string', '"(?:\\\\.|[^"\\\\])*"|\'[^\']*\''],
    ['placeholder', '<[A-Za-z][\\w .-]*>'],
    ['variable', '\\$\\{[^}\\n]*\\}|\\$[A-Za-z_]\\w*'],
    ['url', 'https?:\\/\\/[^\\s"\'<>)]+'],
    ['cont', '\\\\[ \\t]*\\n'],
    ['op', '\\|\\||&&|>>|[|;<>&]'],
    ['flag', '(?:^|(?<=\\s))--?[A-Za-z0-9][\\w-]*(?:=)?'],
    ['envname', '\\b[A-Za-z_][A-Za-z0-9_]*(?==)'],
    ['eq', '(?<=[A-Za-z0-9_])='],
    ['word', '[^\\s|;<>&"\'$#\\\\]+'],
    ['ws', '[ \\t]+|\\n']
  ];
  function bash(code) {
    var toks = scan(code, BASH);
    var expectCmd = true, afterCmd = false, skipValue = false;
    toks.forEach(function (t) {
      switch (t.cls) {
        case 'ws':
          if (t.text === '\n') { expectCmd = true; afterCmd = false; }
          skipValue = false;
          t.cls = null;
          break;
        case 'cont': t.cls = null; break;
        case 'op':
          if (/^(\||\|\||&&|;|&)$/.test(t.text)) { expectCmd = true; afterCmd = false; }
          break;
        case 'envname': skipValue = true; break;
        case 'eq': t.cls = 'op'; break; // VAR=value keeps command position
        case 'word': case 'url': case 'string': case 'variable':
          if (skipValue) { if (t.cls === 'word') t.cls = null; break; }
          if (t.cls === 'word') {
            if (expectCmd) { t.cls = 'cmd'; expectCmd = false; afterCmd = true; }
            else if (afterCmd && /^[a-z][a-z0-9:_-]*$/.test(t.text)) { t.cls = 'sub'; }
            else { t.cls = null; afterCmd = false; }
          } else { expectCmd = false; afterCmd = false; }
          break;
        case 'flag': afterCmd = false; expectCmd = false; break;
        default: break;
      }
    });
    return render(toks);
  }

  // ------------------------------------------------------------ javascript
  var JS_KW = 'const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|delete|typeof|instanceof|in|of|await|async|import|export|from|default|class|extends|try|catch|finally|throw|yield';
  var JS = [
    ['comment', '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/'],
    ['string', '`(?:\\\\.|[^`\\\\])*`|"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\''],
    ['keyword', '\\b(?:' + JS_KW + ')\\b'],
    ['const', '\\b(?:true|false|null|undefined|NaN|Infinity|this)\\b'],
    ['number', '\\b\\d+(?:\\.\\d+)?\\b'],
    ['fn', '\\b[A-Za-z_$][\\w$]*(?=\\s*\\()'],
    ['prop', '(?<=\\.)[A-Za-z_$][\\w$]*'],
    ['type', '\\b[A-Z][\\w$]*\\b'],
    ['op', '=>|[=+\\-*/%!<>&|?:]+']
  ];
  function js(code) { return render(scan(code, JS)); }

  // ---------------------------------------------------------------- python
  var PY_KW = 'def|class|return|if|elif|else|for|while|in|not|and|or|is|import|from|as|with|try|except|finally|raise|pass|break|continue|lambda|yield|async|await|global|nonlocal|del|assert';
  var PY = [
    ['comment', '#[^\\n]*'],
    ['string', '[fFrRbB]{0,2}(?:"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'|"(?:\\\\.|[^"\\\\\\n])*"|\'(?:\\\\.|[^\'\\\\\\n])*\')'],
    ['keyword', '\\b(?:' + PY_KW + ')\\b'],
    ['const', '\\b(?:True|False|None|self|cls)\\b'],
    ['number', '\\b\\d+(?:\\.\\d+)?\\b'],
    ['fn', '\\b[A-Za-z_]\\w*(?=\\s*\\()'],
    ['prop', '(?<=\\.)[A-Za-z_]\\w*'],
    ['type', '\\b[A-Z][\\w]*\\b'],
    ['op', '[=+\\-*/%!<>&|]+']
  ];
  function python(code) { return render(scan(code, PY)); }

  // ------------------------------------------------------------------ json
  var JSON_R = [
    ['key', '"(?:\\\\.|[^"\\\\\\n])*"(?=\\s*:)'],
    ['string', '"(?:\\\\.|[^"\\\\\\n])*"'],
    ['const', '\\b(?:true|false|null)\\b'],
    ['number', '-?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b'],
    ['op', '[{}\\[\\]:,]']
  ];
  function json(code) { return render(scan(code, JSON_R)); }

  // ------------------------------------------------------------------- sql
  var SQL_KW = 'select|from|where|and|or|not|insert|into|values|update|set|delete|create|alter|drop|table|database|index|primary|key|foreign|references|join|left|right|inner|outer|on|group|by|order|limit|offset|as|distinct|having|union|null|default|grant|all|privileges|to|user|identified|with|if|exists|unique|constraint|view';
  var SQL = [
    ['comment', '--[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/'],
    ['string', '\'(?:\'\'|[^\'])*\''],
    ['keyword', '\\b(?:' + SQL_KW + ')\\b'],
    ['number', '\\b\\d+(?:\\.\\d+)?\\b'],
    ['fn', '\\b[A-Za-z_]\\w*(?=\\s*\\()'],
    ['op', '[=<>!*]+']
  ];
  function sql(code) {
    var ci = SQL_KW.split('|').map(function (k) {
      return k.split('').map(function (c) { return '[' + c + c.toUpperCase() + ']'; }).join('');
    }).join('|');
    var rules = SQL.map(function (r) {
      return r[0] === 'keyword' ? ['keyword', '\\b(?:' + ci + ')\\b'] : r;
    });
    return render(scan(code, rules));
  }

  // ---------------------------------------------------------------- output
  // Terminal output / plain text: headings, labels, status words, URLs, keys, paths.
  var OUT_INLINE = [
    ['comment', '(?:^|(?<=\\s))#[^\\n]*'],
    ['string', '"(?:\\\\.|[^"\\\\\\n])*"|\'[^\'\\n]*\''],
    ['placeholder', '<[A-Za-z][\\w .-]*>'],
    ['url', 'https?:\\/\\/[^\\s"\'<>)]+'],
    ['envname', '\\b[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+\\b'],
    ['string', '\\bjtk_[A-Za-z0-9_x….]+'],
    ['prop', '[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+'],
    ['fn', '(?:~|\\.{1,2})?\\/[\\w.\\-\\/:~]*[\\w\\/]'],
    ['flag', '(?:^|(?<=[\\s(]))--?[A-Za-z][\\w-]*'],
    ['number', '\\b\\d{1,4}[\\/-]\\d{1,2}[\\/-]\\d{1,4}(?:,?\\s+\\d{1,2}:\\d{2}(?::\\d{2})?(?:\\s?[AP]M)?)?|\\b\\d{1,2}:\\d{2}(?::\\d{2})?\\b|\\b\\d[\\d,.]*(?:\\s?(?:KB|MB|GB|TB|ms|s|min|%))?(?![\\w])'],
    ['ok', '(?:✓|✔|●(?=\\s+(?:success|live|running|active|healthy|ok))|\\b(?:success|succeeded|live|running|active|healthy|online|verified|ready|passed|enabled|connected|done|ok)\\b)'],
    ['bad', '(?:✗|✖|✘|\\b(?:failed|failure|error|errored|stopped|inactive|offline|unhealthy|denied|invalid|revoked|disabled|expired|crashed)\\b)'],
    ['warn', '(?:⚠|●(?=\\s+(?:pending|building|queued|deploying|warning))|\\b(?:pending|building|queued|deploying|warning|degraded|stale|waiting|retrying)\\b)'],
    ['text', '[^\\s]+'],
    ['ws', '[ \\t]+']
  ];
  var OUT_METHOD = /^(\s*)(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)(\s+)(\S.*)$/;
  var OUT_CMD = /^(\s*)(joytree)(\s+.*?)(\s{3,}|$)(.*)$/;
  var OUT_KV = /^(\s*)([A-Za-z][A-Za-z0-9 ./()-]{0,28}?)(\s{2,})(\S.*)$/;
  function outInline(text) {
    return render(scan(text, OUT_INLINE, function (t) {
      t.forEach(function (x) { if (x.cls === 'ws' || x.cls === 'text') x.cls = null; });
      return t;
    }));
  }
  function outCmd(text) {
    // joytree <sub> [more] with flags/placeholders; first word after joytree is the subcommand
    var out = '', first = true;
    scan(text, [['placeholder', '<[A-Za-z][\\w .-]*>'], ['flag', '(?:^|(?<=\\s))--?[A-Za-z][\\w-]*'], ['word', '\\S+'], ['ws', '\\s+']]).forEach(function (t) {
      var cls = t.cls;
      if (cls === 'word') { cls = first ? 'sub' : null; first = false; }
      else if (cls === 'ws') cls = null;
      out += span(cls, t.text);
    });
    return out;
  }
  function output(code) {
    var lines = code.split('\n');
    return lines.map(function (ln, i) {
      var m;
      if (/^\s*[─━═\-]{4,}\s*$/.test(ln)) return span('comment', ln);
      if (lines[i + 1] && /^\s*[─━═]{4,}\s*$/.test(lines[i + 1]) && ln.trim()) return span('head', ln);
      if ((m = ln.match(OUT_METHOD))) return m[1] + span('keyword', m[2]) + m[3] + outInline(m[4]);
      if ((m = ln.match(OUT_CMD)) && m[5].trim()) {
        return m[1] + span('cmd', m[2]) + outCmd(m[3]) + m[4] + span('desc', m[5]);
      }
      if (/^\s*joytree\s/.test(ln)) return ln.replace(/^(\s*)(joytree)(\s.*)$/, function (_, a, b, c) { return a + span('cmd', b) + outCmd(c); });
      if ((m = ln.match(OUT_KV))) return m[1] + span('key', m[2]) + m[3] + outInline(m[4]);
      return outInline(ln);
    }).join('\n');
  }

  var MAP = {
    bash: bash, sh: bash, shell: bash, zsh: bash,
    js: js, javascript: js, node: js,
    python: python, py: python,
    json: json, sql: sql,
    text: output, txt: output, console: output, output: output, log: output
  };

  window.JTHighlight = function (code, lang) {
    var fn = MAP[(lang || '').toLowerCase()];
    if (!fn) return esc(code);
    try { return fn(code); } catch (e) { return esc(code); }
  };
  window.JTHighlight.supports = function (lang) { return !!MAP[(lang || '').toLowerCase()]; };
})();
