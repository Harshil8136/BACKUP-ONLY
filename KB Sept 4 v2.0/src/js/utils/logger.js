/**
 * IN-PAGE CONSOLE LOGGER
 * ==================
 * This is a self-contained, drop-in script that creates a floating console
 * log panel directly on the page. It captures all console output, runtime
 * errors, and unhandled promise rejections.
 *
 * This script MUST be the very first script loaded in index.html to ensure
 * it can capture errors from all subsequent scripts.
 */
(function () {
  'use strict';

  // --- Configuration ---
  const LS_KEY = '__inpage_console_log__';
  const MAX_LOGS = 250;           // Max number of logs to keep in the ring buffer
  const FLUSH_EVERY = 1500;       // Flush to localStorage at most once per 1.5s
  const ENABLE_REPORTING_OBSERVER = true; // Set to false if not needed

  // --- Utilities ---
  function nowISO() {
    try { return new Date().toISOString(); } catch (e) { return '' + Date.now(); }
  }

  function safeStringify(v) {
    try {
      if (v instanceof Error && v.stack) return v.stack;
      const seen = new WeakSet();
      return JSON.stringify(v, (k, val) => {
        if (typeof val === 'object' && val !== null) {
          if (seen.has(val)) return '[Circular]';
          seen.add(val);
        }
        if (val instanceof Error) return val.stack || `${val.name}: ${val.message}`;
        return val;
      });
    } catch (e) {
      try { return String(v); } catch (e2) { return '[Unserializable]'; }
    }
  }

  function formatArgs(args) {
    const out = [];
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (typeof a === 'string') out.push(a);
      else out.push(safeStringify(a));
    }
    return out.join(' ');
  }

  // --- Log Store with Ring Buffer + localStorage Persistence ---
  let logs = [];
  try {
    const existing = localStorage.getItem(LS_KEY);
    if (existing) logs = JSON.parse(existing) || [];
  } catch (e) { /* ignore storage parse errors */ }

  function clamp() {
    if (logs.length > MAX_LOGS) {
      logs.splice(0, logs.length - MAX_LOGS);
    }
  }

  let pendingFlush = false;
  function scheduleFlush() {
    if (pendingFlush) return;
    pendingFlush = true;
    setTimeout(() => {
      pendingFlush = false;
      try {
        clamp();
        localStorage.setItem(LS_KEY, JSON.stringify(logs));
      } catch (e) {
        // if quota exceeded, drop oldest and retry once
        try {
          logs.splice(0, Math.floor(logs.length * 0.1));
          localStorage.setItem(LS_KEY, JSON.stringify(logs));
        } catch (e2) { /* give up */ }
      }
    }, FLUSH_EVERY);
  }

  // --- UI ---
  const ui = (function () {
    let root, list, inputFilter, btnClear, btnHide, btnPause, paused = false;

    function create() {
      root = document.createElement('div');
      root.setAttribute('role', 'log');
      root.style.cssText = 'position:fixed;z-index:2147483647;bottom:8px;left:8px;width:min(42vw,560px);height:min(48vh,420px);background:#0b0b0ecc;color:#f0f0f0;border:1px solid #333;border-radius:8px;font:12px/1.3 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;backdrop-filter:saturate(1.2) blur(3px);box-shadow:0 8px 24px rgba(0,0,0,.35);display:flex;flex-direction:column;overflow:hidden;';
      
      const bar = document.createElement('div');
      bar.style.cssText = 'display:flex;gap:6px;align-items:center;padding:6px 8px;background:#111c;flex-shrink:0;';
      
      const title = document.createElement('div');
      title.textContent = 'In‑Page Console (Alt+L)';
      title.style.cssText = 'font-weight:600;color:#cde;margin-right:auto;';

      inputFilter = document.createElement('input');
      inputFilter.placeholder = 'Filter...';
      inputFilter.style.cssText = 'flex:1 1 auto;background:#222;color:#ddd;border:1px solid #333;border-radius:4px;padding:3px 6px;';
      
      btnPause = document.createElement('button');
      btnPause.textContent = 'Pause';
      btnPause.style.cssText = 'background:#222;color:#ddd;border:1px solid #333;border-radius:4px;padding:3px 6px;cursor:pointer;';

      btnClear = document.createElement('button');
      btnClear.textContent = 'Clear';
      btnClear.style.cssText = 'background:#222;color:#ddd;border:1px solid #333;border-radius:4px;padding:3px 6px;cursor:pointer;';

      btnHide = document.createElement('button');
      btnHide.textContent = 'Hide';
      btnHide.style.cssText = 'background:#222;color:#ddd;border:1px solid #333;border-radius:4px;padding:3px 6px;cursor:pointer;';

      bar.appendChild(title);
      bar.appendChild(inputFilter);
      bar.appendChild(btnPause);
      bar.appendChild(btnClear);
      bar.appendChild(btnHide);

      list = document.createElement('div');
      list.style.cssText = 'flex:1 1 auto;overflow:auto;padding:6px 8px;white-space:pre-wrap;word-break:break-word;background:#0b0b0ecc;';

      root.appendChild(bar);
      root.appendChild(list);
      document.documentElement.appendChild(root);

      inputFilter.addEventListener('input', render);
      btnClear.addEventListener('click', () => {
        logs.length = 0;
        scheduleFlush();
        render();
      });
      btnHide.addEventListener('click', () => hide());
      btnPause.addEventListener('click', () => {
        paused = !paused;
        btnPause.textContent = paused ? 'Resume' : 'Pause';
      });

      window.addEventListener('keydown', (e) => {
        if (e.altKey && !e.shiftKey && !e.ctrlKey && e.code === 'KeyL') {
          e.preventDefault();
          root.style.display === 'none' ? show() : hide();
        }
      });
      render();
    }

    function escapeHtml(s) {
      return s.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
    }

    function color(level) {
      if (level === 'error') return '#ffb3b3';
      if (level === 'warn') return '#ffd79a';
      if (level === 'info') return '#b3e5ff';
      if (level === 'debug') return '#bdbdbd';
      return '#e0e0e0';
    }

    function render() {
      if (!list) return;
      const q = (inputFilter.value || '').toLowerCase().trim();
      const frag = document.createDocumentFragment();
      const start = Math.max(0, logs.length - 1500); // cap DOM nodes for performance
      for (let i = start; i < logs.length; i++) {
        const it = logs[i];
        if (!it) continue;
        const line = `[${it.time}][${it.level.toUpperCase()}] ${it.msg}${it.stack ? `\n${it.stack}` : ''}`;
        if (q && line.toLowerCase().indexOf(q) === -1 && it.level !== q) continue;
        const div = document.createElement('div');
        div.style.cssText = `padding:2px 0;border-bottom:1px solid #222;color:${color(it.level)};`;
        div.innerHTML = escapeHtml(line);
        frag.appendChild(div);
      }
      list.innerHTML = '';
      list.appendChild(frag);
      list.scrollTop = list.scrollHeight;
    }

    function pushAndMaybeRender(entry) {
      logs.push(entry);
      clamp();
      if (!paused) render();
    }

    function show() { if (!root) create(); root.style.display = 'flex'; }
    function hide() { if (root) root.style.display = 'none'; }

    return { show, hide, push: pushAndMaybeRender, render };
  })();

  // --- Hook console methods ---
  const orig = {};
  ['log', 'info', 'warn', 'error', 'debug', 'trace'].forEach((m) => {
    orig[m] = console[m] && console[m].bind(console);
    console[m] = function () {
      try {
        const entry = { level: m === 'trace' ? 'debug' : m, time: nowISO(), msg: formatArgs(arguments) };
        if (m === 'trace') {
          try { entry.stack = (new Error('trace')).stack; } catch (e) {}
        }
        ui.push(entry);
        scheduleFlush();
      } catch (e) {}
      if (orig[m]) orig[m].apply(console, arguments);
    };
  });

  // --- Global errors (runtime, resource load) ---
  window.addEventListener('error', (event) => {
    try {
      const isResource = event && event.target && event.target !== window;
      const msg = isResource
        ? `Resource error: ${(event.target && (event.target.src || event.target.href || event.target.tagName))}`
        : (event.message || 'Error');
      const stack = (event.error && event.error.stack) ? event.error.stack : ` at ${event.filename}:${event.lineno}:${event.colno}`;
      ui.push({ level: 'error', time: nowISO(), msg, stack });
      scheduleFlush();
    } catch (e) {}
  }, true); // Use capture to catch all errors

  // --- Unhandled promise rejections ---
  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = event && event.reason;
      const msg = `Unhandled rejection: ${typeof reason === 'string' ? reason : safeStringify(reason)}`;
      const stack = (reason && reason.stack) ? reason.stack : '';
      ui.push({ level: 'error', time: nowISO(), msg, stack });
      scheduleFlush();
    } catch (e) {}
  });

  // --- ReportingObserver for deprecations/interventions/CSP (optional) ---
  try {
    if (ENABLE_REPORTING_OBSERVER && 'ReportingObserver' in window) {
      const ro = new ReportingObserver((reports) => {
        try {
          reports.forEach((r) => {
            const body = r.body || {};
            const msg = `${r.type || 'report'}: ${body.id || body.message || safeStringify(body)}`;
            ui.push({ level: 'warn', time: nowISO(), msg });
          });
          scheduleFlush();
        } catch (e) {}
      }, { types: ['deprecation', 'intervention'], buffered: true });
      ro.observe();
    }
  } catch (e) {}

  // --- Expose minimal API ---
  window.InPageConsole = {
    show: ui.show,
    hide: ui.hide,
    render: ui.render,
    clear: () => { logs.length = 0; scheduleFlush(); ui.render(); },
    getLogs: () => logs.slice(),
  };

  // Auto-show on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ui.show);
  } else {
    ui.show();
  }
})();