// Auto-color log blocks based on content for .colorful-log <pre> blocks and Markdown ```log blocks
// Place this in your _includes/javascript.html or include in your layout

document.addEventListener('DOMContentLoaded', function() {
  function colorLogLine(line) {
    // Normalize HTML entities for matching
    const normalized = line.replace(/&gt;/g, '>');
    // General patterns and their classes
    const patterns = [
      { re: /^\s*>\s*GOD:/i, cls: 'log-god' },
      { re: /^\s*>\s*HUMANITY:/i, cls: 'log-human' },
      { re: /^\s*>\s*[^:]+:/, cls: 'log-cmd' }, // any speaker
      { re: /^\s*>\s*.+/, cls: 'log-cmd' }, // any command
      { re: /^\s*\[(INFO|DEBUG|TRACE)\]/i, cls: 'log-info' },
      { re: /^\s*\[(SUCCESS|OK|PASS)\]/i, cls: 'log-success' },
      { re: /^\s*\[(WARNING|WARN)\]/i, cls: 'log-warning' },
      { re: /^\s*\[(ERROR|FAIL|EXCEPTION)\]/i, cls: 'log-error' },
      { re: /^\s*\[FORK\]/i, cls: 'log-fork' },
      { re: /^\s*\[(CRITICAL|PANIC|FATAL)\]/i, cls: 'log-critical' },
      { re: /^\s*\[(ACTION|TODO|NEXT)\]/i, cls: 'log-action' },
      { re: /^\s*\[OUTPUT\]/i, cls: 'log-output' },
      { re: /^\s*\[.*\]/, cls: 'log-header' }, // fallback: any [TAG]
    ];
    for (const {re, cls} of patterns) {
      if (re.test(normalized)) {
        return `<span class="${cls}">${line}</span>`;
      }
    }
    return line;
  }

  // Color <pre class="colorful-log">
  document.querySelectorAll('pre.colorful-log').forEach(function(pre) {
    if ([...pre.childNodes].some(n => n.nodeType === 1 && n.tagName === 'SPAN')) return;
    const lines = pre.innerHTML.split(/\r?\n/);
    pre.innerHTML = lines.map(colorLogLine).join('\n');
  });

  // Color Markdown ```log blocks rendered as <pre><code class="language-log">
  document.querySelectorAll('pre > code.language-log').forEach(function(code) {
    // Only auto-color if not already using <span> lines
    if ([...code.childNodes].some(n => n.nodeType === 1 && n.tagName === 'SPAN')) return;
    const lines = code.innerHTML.split(/\r?\n/);
    code.innerHTML = lines.map(colorLogLine).join('\n');
    code.parentElement.classList.add('colorful-log'); // for CSS
  });
});
