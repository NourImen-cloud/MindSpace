document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const appName = params.get('app') || 'Social Media';
  const domain = params.get('domain') || 'instagram.com';
  const targetUrl = params.get('target') || 'https://' + domain;

  const titleEl = document.getElementById('title-text');
  const siteNameEl = document.getElementById('site-name');
  if (titleEl) titleEl.innerText = `You are reaching for ${appName} 🌸`;
  if (siteNameEl) siteNameEl.innerText = appName;

  // Gentle Solfeggio sound (528Hz)
  function playGentleBell() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 2.5);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Play audio on first user touch or immediately
  playGentleBell();

  // Unified Action Button
  const actionBtn = document.getElementById('action-btn');
  const stagePause = document.getElementById('stage-pause');
  const stageChoices = document.getElementById('stage-choices');

  let secondsLeft = 5;

  function showChoices() {
    stagePause.classList.add('hidden');
    stageChoices.classList.remove('hidden');
  }

  const countdownTimer = setInterval(() => {
    secondsLeft--;
    if (secondsLeft > 0) {
      if (actionBtn) {
        actionBtn.innerText = `Pausing for ${secondsLeft}s... (Click to skip)`;
      }
    } else {
      clearInterval(countdownTimer);
      if (actionBtn) {
        actionBtn.innerText = 'I am ready to decide →';
        actionBtn.classList.remove('btn-secondary');
        actionBtn.classList.add('btn-primary');
        actionBtn.style.animation = 'pulse 2s infinite';
      }
    }
  }, 1000);

  // Click action button transitions to choices immediately
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      clearInterval(countdownTimer);
      showChoices();
    });
  }

  // Reason buttons
  document.querySelectorAll('.reason-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.reason-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 1. Return to MindSpace Sanctuary
  const returnBtn = document.getElementById('return-sanctuary');
  if (returnBtn) {
    returnBtn.addEventListener('click', () => {
      chrome.storage.local.get(['mindspace_app_url'], (data) => {
        const appUrl = data.mindspace_app_url || 'https://mindspace-tan-one.vercel.app';
        window.location.href = appUrl + '?return_from=' + encodeURIComponent(appName);
      });
    });
  }

  // 2. Micro Focus 5m
  const microFocusBtn = document.getElementById('micro-focus');
  if (microFocusBtn) {
    microFocusBtn.addEventListener('click', () => {
      chrome.storage.local.get(['mindspace_app_url'], (data) => {
        const appUrl = data.mindspace_app_url || 'https://mindspace-tan-one.vercel.app';
        window.location.href = appUrl + '?focus=5';
      });
    });
  }

  // 3. Allow temporary 10-minute access
  const allowAccessBtn = document.getElementById('allow-access');
  if (allowAccessBtn) {
    allowAccessBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({
        action: 'allow_temp_access',
        domain: domain,
        minutes: 10
      }, () => {
        window.location.href = targetUrl;
      });
    });
  }
});
