async function loadTools() {
  const res = await fetch('data/tools.csv');
  const text = await res.text();
  const [header, ...rows] = text.trim().split('\n');
  const keys = header.split(',');
  return rows.map(r => {
    const cols = r.match(/("[^"]*"|[^,]+)/g).map(c => c.replace(/^"|"$/g, ''));
    return Object.fromEntries(keys.map((k, i) => [k, cols[i] || '']));
  });
}

function renderTable(targetId, items) {
  const t = document.getElementById(targetId); if (!t) return;
  t.innerHTML = items.map(x => `<tr><td>${x.name}<br><span class="badge">${x.category}</span></td><td>${x.best_for}</td><td>${x.beginner}</td><td><a href="${x.detail_page}">詳細を見る</a></td></tr>`).join('');
}

function renderToolsList(targetId, items) {
  const area = document.getElementById(targetId); if (!area) return;
  area.innerHTML = items.map(x => `<article class="card"><h3>${x.name}</h3><p>${x.summary}</p><p><strong>カテゴリ：</strong>${x.category}</p><a class="btn" href="${x.official_url}" target="_blank" rel="noopener">公式サイトを見る</a> <a href="${x.detail_page}">詳細</a></article>`).join('');
}

(async () => {
  const tools = await loadTools();
  renderTable('top-compare-table', tools.slice(0, 6));
  renderTable('compare-table', tools);
  renderToolsList('tools-list', tools);
})();
