import React, { useEffect, useState } from 'react';
import { MindSpaceProvider, useMindSpace } from './store/MindSpaceContext';
import { EmilyDashboard } from './components/reference/EmilyDashboard';
import { IntentionalPauseModal } from './components/antiscroll/IntentionalPauseModal';
import { FocusModeModal } from './components/focus/FocusModeModal';
import { FocusSummaryModal } from './components/focus/FocusSummaryModal';
import { WelcomeOnboardingModal } from './components/onboarding/WelcomeOnboardingModal';
import { GentleReturnWelcomeModal } from './components/antiscroll/GentleReturnWelcomeModal';

function AppContent() {
  const { triggerDistractionIntercept, startFocusSession, tasks } = useMindSpace();
  const [returnFromApp, setReturnFromApp] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Check if user is returning from a blocked app like Instagram
    const returnFrom = params.get('return_from') || params.get('from');
    const focusDuration = params.get('focus');

    if (returnFrom) {
      setReturnFromApp(returnFrom);
    } else if (focusDuration) {
      const targetTask = tasks.find(t => t.status === 'scheduled') || tasks[0];
      startFocusSession(targetTask, Number(focusDuration) || 5);
    }

    const interceptApp = params.get('intercept') || params.get('app');
    if (interceptApp) {
      triggerDistractionIntercept(interceptApp);
    }

    if (returnFrom || focusDuration || interceptApp) {
      try {
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch {}
    }
  }, [triggerDistractionIntercept, startFocusSession, tasks]);

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-slate-800 font-['Nunito',sans-serif]">
      {/* The Exact Pixel-Accurate Emily Productivity Dashboard */}
      <EmilyDashboard />

      {/* Global Overlays for Focus Mode, Anti-Scrolling Sanctuary & First-Time Onboarding */}
      <IntentionalPauseModal />
      <FocusModeModal />
      <FocusSummaryModal />
      <WelcomeOnboardingModal />

      {/* Actionable Gentle Return Victory Overlay */}
      {returnFromApp && (
        <GentleReturnWelcomeModal
          returnedFromApp={returnFromApp}
          onClose={() => setReturnFromApp(null)}
        />
      )}
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
