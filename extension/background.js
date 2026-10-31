// Default restricted domains
const DEFAULT_RULES = [
  { domain: 'instagram.com', name: 'Instagram', mode: 'pause', delaySeconds: 5 },
  { domain: 'tiktok.com', name: 'TikTok', mode: 'pause', delaySeconds: 5 },
  { domain: 'reddit.com', name: 'Reddit', mode: 'pause', delaySeconds: 5 },
  { domain: 'x.com', name: 'X / Twitter', mode: 'pause', delaySeconds: 5 },
  { domain: 'twitter.com', name: 'Twitter', mode: 'pause', delaySeconds: 5 },
  { domain: 'youtube.com/shorts', name: 'YouTube Shorts', mode: 'pause', delaySeconds: 5 }
];

// In-memory allowed sessions (temporary bypass after intentional pause)
const temporaryBypasses = new Map();

// Initialize rules in storage
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['mindspace_rules', 'mindspace_active'], (data) => {
    if (!data.mindspace_rules) {
      chrome.storage.local.set({ 
        mindspace_rules: DEFAULT_RULES,
        mindspace_active: true,
        mindspace_app_url: 'http://localhost:4173'
      });
    }
  });
});

// Intercept navigations
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return; // Top-level tabs only

  const storage = await chrome.storage.local.get(['mindspace_rules', 'mindspace_active', 'mindspace_app_url']);
  if (storage.mindspace_active === false) return;

  const rules = storage.mindspace_rules || DEFAULT_RULES;
  const currentUrl = details.url;

  // Check if this navigation is an internal MindSpace intercept page
  if (currentUrl.includes(chrome.runtime.id) || currentUrl.includes('intercept.html')) {
    return;
  }

  // Check if domain matches any restricted rule
  const matchedRule = rules.find(rule => currentUrl.toLowerCase().includes(rule.domain.toLowerCase()));
  if (!matchedRule) return;

  // Check if user has an active temporary bypass (e.g. they completed the 5s breathing pause and chose to proceed)
  const bypassExpiry = temporaryBypasses.get(matchedRule.domain);
  if (bypassExpiry && Date.now() < bypassExpiry) {
    return; // Allow navigation
  }

  // Intercept and redirect to the Intentional Pause page!
  const interceptPageUrl = chrome.runtime.getURL(
    `intercept.html?app=${encodeURIComponent(matchedRule.name)}&domain=${encodeURIComponent(matchedRule.domain)}&target=${encodeURIComponent(currentUrl)}`
  );

  chrome.tabs.update(details.tabId, { url: interceptPageUrl });
});

// Listen for bypass or return messages from intercept.html
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'allow_temp_access') {
    const domain = request.domain;
    const durationMinutes = request.minutes || 10;
    temporaryBypasses.set(domain, Date.now() + durationMinutes * 60 * 1000);
    sendResponse({ status: 'ok' });
  }
});
