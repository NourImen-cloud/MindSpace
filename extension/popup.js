document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('rules-container');
  const countEl = document.getElementById('rule-count');
  const inputEl = document.getElementById('new-domain');
  const addBtn = document.getElementById('add-btn');

  function renderRules() {
    chrome.storage.local.get(['mindspace_rules'], (data) => {
      const rules = data.mindspace_rules || [];
      countEl.innerText = rules.length;
      container.innerHTML = '';

      rules.forEach((rule, index) => {
        const item = document.createElement('div');
        item.className = 'rule-item';
        item.innerHTML = `
          <span class="rule-name">${rule.name || rule.domain}</span>
          <button class="delete-btn" data-index="${index}">✕</button>
        `;
        container.appendChild(item);
      });

      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = Number(e.target.dataset.index);
          rules.splice(idx, 1);
          chrome.storage.local.set({ mindspace_rules: rules }, () => {
            renderRules();
          });
        });
      });
    });
  }

  addBtn.addEventListener('click', () => {
    const val = inputEl.value.trim().toLowerCase();
    if (!val) return;
    const cleanDomain = val.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    chrome.storage.local.get(['mindspace_rules'], (data) => {
      const rules = data.mindspace_rules || [];
      rules.push({
        domain: cleanDomain,
        name: cleanDomain.split('.')[0].toUpperCase(),
        mode: 'pause',
        delaySeconds: 5
      });
      chrome.storage.local.set({ mindspace_rules: rules }, () => {
        inputEl.value = '';
        renderRules();
      });
    });
  });

  renderRules();
});
