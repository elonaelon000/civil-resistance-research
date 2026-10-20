/* Civil Resistance Research — interactive research atlas
   Source of truth: data/cases.csv. Counts are descriptive of this curated pilot only. */
'use strict';

(function () {
  const DATA_URL = './data/cases.csv';
  const OUTCOMES = {
    system_transition: 'System transition',
    regime_transition: 'Regime transition',
    leadership_change: 'Leadership change',
    policy_concessions: 'Policy concessions',
    no_core_change: 'Core demands unmet',
    state_breakdown: 'State breakdown',
    unresolved: 'Unresolved'
  };
  const STYLES = {
    predominantly_nonviolent: 'Predominantly nonviolent',
    mixed_or_armed: 'Mixed / armed repertoire',
    uncertain: 'Dominant methods uncertain'
  };
  const SCOPE = { all: 'all', albania: 'albania', elsewhere: 'elsewhere' };

  let cases = [];
  let scope = SCOPE.all;
  let visible = 6;
  const search = document.getElementById('caseSearch');
  const outcome = document.getElementById('outcomeFilter');
  const list = document.getElementById('caseList');
  const count = document.getElementById('resultCount');
  const more = document.getElementById('loadMore');
  const dialog = document.getElementById('caseDialog');
  const close = document.getElementById('dialogClose');
  const dialogId = document.getElementById('dialogId');
  const dialogBody = document.getElementById('dialogBody');

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
    });
  }

  function parseCSV(text) {
    const rows = [];
    let row = [], field = '', quoted = false;
    const source = String(text || '').replace(/^\uFEFF/, '');
    for (let i = 0; i < source.length; i += 1) {
      const ch = source[i];
      if (quoted) {
        if (ch === '"' && source[i + 1] === '"') { field += '"'; i += 1; }
        else if (ch === '"') { quoted = false; }
        else { field += ch; }
      } else if (ch === '"') {
        quoted = true;
      } else if (ch === ',') {
        row.push(field); field = '';
      } else if (ch === '\n') {
        row.push(field); field = '';
        if (row.some(function (item) { return item.trim() !== ''; })) rows.push(row);
        row = [];
      } else if (ch !== '\r') {
        field += ch;
      }
    }
    if (quoted) throw new Error('CSV has an unclosed quoted field.');
    if (row.length || field) {
      row.push(field);
      if (row.some(function (item) { return item.trim() !== ''; })) rows.push(row);
    }
    if (!rows.length) throw new Error('CSV file is empty.');
    const headings = rows.shift().map(function (column) { return column.trim(); });
    const needed = ['case_id','country','campaign','status','immediate_outcome','observed_result','source_1'];
    if (!needed.every(function (key) { return headings.includes(key); })) throw new Error('CSV columns are missing.');
    return rows.map(function (cells, i) {
      if (cells.length !== headings.length) throw new Error('Invalid field count on CSV row ' + (i + 2));
      const item = {};
      headings.forEach(function (heading, j) { item[heading] = cells[j].trim(); });
      return item;
    });
  }

  function spanYears(item) {
    const start = String(item.start_year || '');
    const end = String(item.end_year || '');
    return !end || start === end ? start : start + '–' + end.slice(-2);
  }

  function outcomeLabel(code) { return OUTCOMES[code] || code.replace(/_/g, ' '); }
  function styleLabel(code) { return STYLES[code] || 'Provisional classification'; }
  function shortText(text, length) {
    const s = String(text || '');
    if (s.length <= length) return s;
    return s.slice(0, length).trim().replace(/[.,;:]$/, '') + '…';
  }
  function outcomeClass(code) {
    return code === 'no_core_change' ? ' no-core' : (code === 'unresolved' ? ' unresolved' : '');
  }

  function renderAlbania() {
    const target = document.getElementById('albaniaGrid');
    const localCases = cases.filter(function (item) { return item.country === 'Albania'; })
      .sort(function (a, b) { return Number(a.start_year) - Number(b.start_year); });
    if (!localCases.length) {
      target.innerHTML = '<p class="loading-msg">No Albania cases available.</p>';
      return;
    }
    target.innerHTML = localCases.map(function (item) {
      const status = item.status === 'ongoing' ? 'ONGOING / OUTCOME UNKNOWN' : outcomeLabel(item.immediate_outcome);
      return '<article class="alb-card">' +
        '<div class="alb-head"><span class="alb-year">' + escapeHtml(spanYears(item)) + '</span>' +
        '<span class="alb-status' + (item.status === 'ongoing' ? ' ongoing' : '') + '">' + escapeHtml(status) + '</span></div>' +
        '<h3>' + escapeHtml(item.campaign) + '</h3>' +
        '<p>' + escapeHtml(shortText(item.observed_result, 175)) + '</p>' +
        '<div class="alb-bottom"><span>' + escapeHtml(item.case_id) + '</span>' +
        '<button type="button" data-open-id="' + escapeHtml(item.case_id) + '">View evidence ↗</button></div>' +
        '</article>';
    }).join('');
  }

  function renderChart() {
    const counts = {};
    Object.keys(OUTCOMES).forEach(function (key) { counts[key] = 0; });
    cases.forEach(function (item) {
      if (Object.prototype.hasOwnProperty.call(counts, item.immediate_outcome)) counts[item.immediate_outcome] += 1;
    });
    const highest = Math.max(1, ...Object.values(counts));
    const html = Object.keys(OUTCOMES).filter(function (key) { return counts[key] > 0; }).map(function (key) {
      const width = Math.max(1, counts[key] / highest * 100);
      return '<button class="chart-row" type="button" data-outcome-target="' + escapeHtml(key) + '" aria-label="Show cases with ' + escapeHtml(outcomeLabel(key)) + '">' +
        '<span class="chart-row-head"><span>' + escapeHtml(outcomeLabel(key)) + '</span><strong>' + counts[key] + '</strong></span>' +
        '<span class="chart-track"><span style="width:' + width.toFixed(1) + '%"></span></span>' +
        '</button>';
    }).join('');
    document.getElementById('outcomeChart').innerHTML = html;
  }

  function matchingCases() {
    const q = search.value.trim().toLocaleLowerCase();
    const selected = outcome.value;
    return cases.filter(function (item) {
      const countryOK = scope === 'all' ||
        (scope === 'albania' && item.country === 'Albania') ||
        (scope === 'elsewhere' && item.country !== 'Albania');
      const outcomeOK = selected === 'all' || item.immediate_outcome === selected;
      const searchText = [item.country, item.campaign, item.start_year, item.end_year,
        item.observed_result, item.comparison_question, item.case_id].join(' ').toLocaleLowerCase();
      return countryOK && outcomeOK && (!q || searchText.includes(q));
    }).sort(function (a, b) {
      if (a.country === 'Albania' && b.country !== 'Albania') return -1;
      if (b.country === 'Albania' && a.country !== 'Albania') return 1;
      return Number(b.start_year) - Number(a.start_year);
    });
  }

  function caseHTML(item) {
    return '<article class="case-card">' +
      '<div class="case-card-top"><span class="case-meta">' + escapeHtml(item.country) + ' / ' +
      escapeHtml(spanYears(item)) + '</span><span class="case-outcome' + outcomeClass(item.immediate_outcome) + '">' +
      escapeHtml(outcomeLabel(item.immediate_outcome)) + '</span></div>' +
      '<h3>' + escapeHtml(item.campaign) + '</h3>' +
      '<p>' + escapeHtml(item.observed_result) + '</p>' +
      '<div class="case-card-bottom"><span class="case-style">' + escapeHtml(styleLabel(item.campaign_style)) + '</span>' +
      '<button type="button" class="case-open" data-open-id="' + escapeHtml(item.case_id) + '">Open case file ↗</button></div></article>';
  }

  function renderCases() {
    const filtered = matchingCases();
    count.textContent = filtered.length + ' of ' + cases.length + ' selected cases';
    list.innerHTML = filtered.length
      ? filtered.slice(0, visible).map(caseHTML).join('')
      : '<div class="empty-state">No matching case records. Try another keyword or reset the filters.</div>';
    more.hidden = filtered.length <= visible;
    if (!more.hidden) more.textContent = 'Show more cases ↓';
  }

  function setScope(next) {
    if (!Object.prototype.hasOwnProperty.call(SCOPE, next)) return;
    scope = next;
    visible = 6;
    document.querySelectorAll('[data-scope]').forEach(function (button) {
      const active = button.dataset.scope === scope;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderCases();
  }

  function safeURL(raw) {
    if (!raw) return null;
    try {
      const url = new URL(raw);
      if (url.protocol !== 'https:') return null;
      return url.href;
    } catch (_) { return null; }
  }

  function caseSourceHTML(item) {
    const sources = [item.source_1, item.source_2].map(safeURL).filter(Boolean);
    if (!sources.length) return '<p>No evidence links recorded for this pilot entry.</p>';
    return '<div class="dialog-links">' + sources.map(function (url, index) {
      let host = 'Evidence link';
      try { host = new URL(url).hostname.replace(/^www\./, ''); } catch (_) {}
      return '<a href="' + escapeHtml(url) + '" target="_blank" rel="noopener noreferrer">' +
        'Source ' + (index + 1) + ' — ' + escapeHtml(host) + ' ↗</a>';
    }).join('') + '</div>';
  }

  function detailBlock(title, text, extraClass) {
    return '<section class="dialog-block' + (extraClass ? ' ' + extraClass : '') + '"><h3>' +
      escapeHtml(title) + '</h3><p>' + escapeHtml(text || 'No statement recorded.') + '</p></section>';
  }

  function openCase(id) {
    const item = cases.find(function (record) { return record.case_id === id; });
    if (!item) return;
    dialogId.textContent = item.case_id;
    dialogBody.innerHTML =
      '<p class="dialog-meta">' + escapeHtml(item.country) + ' / ' + escapeHtml(spanYears(item)) + '</p>' +
      '<h2 id="dialogTitle">' + escapeHtml(item.campaign) + '</h2>' +
      '<div class="dialog-labels"><span>' + escapeHtml(outcomeLabel(item.immediate_outcome)) + '</span>' +
      '<span>' + escapeHtml(styleLabel(item.campaign_style)) + '</span>' +
      '<span>' + (item.status === 'ongoing' ? 'Ongoing — no endpoint' : 'Completed wave') + '</span></div>' +
      detailBlock('Documented immediate result', item.observed_result, 'highlight') +
      detailBlock('What the outcome does not prove', item.long_term_caution) +
      detailBlock('A question for further research', item.comparison_question) +
      '<section class="dialog-block"><h3>Sources to examine</h3>' + caseSourceHTML(item) + '</section>' +
      '<p class="dialog-disclaimer">Original pilot cutoff: 18 October 2026; Albania review: 20 October. Sources and interpretation require independent verification. This case does not establish a causal relationship.</p>' +
      (item.case_id === 'ALB-2026' || item.case_id === 'ALB-2018' ? '<p><a href="https://github.com/elonaelon000/civil-resistance-research/blob/main/docs/ALBANIA_REVIEW_2026-10-20.md" target="_blank" rel="noopener noreferrer">Read the dated Albania evidence review ↗</a></p>' : '');
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    close.focus();
  }

  function loadFailure(error) {
    console.error('Could not load case records:', error);
    document.getElementById('albaniaGrid').innerHTML =
      '<p class="loading-msg">Cases are unavailable. Please try refreshing this page.</p>';
    list.innerHTML = '<div class="empty-state">Could not load the pilot dataset. Open this site through GitHub Pages or a local web server (not a file:// URL). ' +
      '<a href="https://github.com/elonaelon000/civil-resistance-research/blob/main/data/cases.csv">View the CSV on GitHub ↗</a></div>';
    count.textContent = 'Dataset unavailable';
  }

  document.addEventListener('click', function (event) {
    const caseButton = event.target.closest('[data-open-id]');
    if (caseButton) { openCase(caseButton.dataset.openId); return; }
    const chartButton = event.target.closest('[data-outcome-target]');
    if (chartButton) {
      outcome.value = chartButton.dataset.outcomeTarget;
      visible = 6;
      renderCases();
      document.getElementById('explorer-heading').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  document.querySelectorAll('[data-scope]').forEach(function (button) {
    button.addEventListener('click', function () { setScope(button.dataset.scope); });
  });
  search.addEventListener('input', function () { visible = 6; renderCases(); });
  outcome.addEventListener('change', function () { visible = 6; renderCases(); });
  document.getElementById('resetFilters').addEventListener('click', function () {
    search.value = '';
    outcome.value = 'all';
    setScope('all');
    search.focus();
  });
  more.addEventListener('click', function () { visible += 6; renderCases(); });
  close.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });

  fetch(DATA_URL, { cache: 'no-store' })
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
      return response.text();
    })
    .then(function (text) {
      cases = parseCSV(text);
      const ids = new Set(cases.map(function (item) { return item.case_id; }));
      if (ids.size !== cases.length) throw new Error('Duplicate case identifiers.');
      if (!cases.every(function (item) {
        return item.status !== 'ongoing' || item.immediate_outcome === 'unresolved';
      })) throw new Error('Ongoing cases cannot have final outcome codes.');
      document.getElementById('totalCases').textContent = String(cases.length).padStart(2, '0');
      document.getElementById('albaniaCount').textContent = String(
        cases.filter(function (item) { return item.country === 'Albania'; }).length
      ).padStart(2, '0');
      renderAlbania();
      renderChart();
      renderCases();
    })
    .catch(loadFailure);
})();

