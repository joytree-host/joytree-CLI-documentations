/* JOYTREE docs - tiny dependency-free syntax highlighter.
   window.JTHighlight(rawCode, lang) -> HTML string (already escaped).
   Languages: bash/sh/shell, js/javascript, python, json, sql. Anything else
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

  var MAP = {
    bash: bash, sh: bash, shell: bash, zsh: bash,
    js: js, javascript: js, node: js,
    python: python, py: python,
    json: json, sql: sql
  };

  window.JTHighlight = function (code, lang) {
    var fn = MAP[(lang || '').toLowerCase()];
    if (!fn) return esc(code);
    try { return fn(code); } catch (e) { return esc(code); }
  };
  window.JTHighlight.supports = function (lang) { return !!MAP[(lang || '').toLowerCase()]; };
})();
