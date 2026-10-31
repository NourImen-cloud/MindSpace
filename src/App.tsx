import React, { useEffect } from 'react';
import { MindSpaceProvider, useMindSpace } from './store/MindSpaceContext';
import { EmilyDashboard } from './components/reference/EmilyDashboard';
import { IntentionalPauseModal } from './components/antiscroll/IntentionalPauseModal';
import { FocusModeModal } from './components/focus/FocusModeModal';
import { FocusSummaryModal } from './components/focus/FocusSummaryModal';
import { WelcomeOnboardingModal } from './components/onboarding/WelcomeOnboardingModal';

function AppContent() {
  const { triggerDistractionIntercept } = useMindSpace();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interceptApp = params.get('intercept') || params.get('app');
    if (interceptApp) {
      triggerDistractionIntercept(interceptApp);
      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch {}
    }
  }, [triggerDistractionIntercept]);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-slate-800 font-['Nunito',sans-serif]">
      {/* The Exact Pixel-Accurate Emily Productivity Dashboard */}
      <EmilyDashboard />

      {/* Global Overlays for Focus Mode, Anti-Scrolling Sanctuary & First-Time Onboarding */}
      <IntentionalPauseModal />
      <FocusModeModal />
      <FocusSummaryModal />
      <WelcomeOnboardingModal />
    </div>
  );
}

export function App() {
  return (
    <MindSpaceProvider>
      <AppContent />
    </MindSpaceProvider>
  );
}

export default App;
