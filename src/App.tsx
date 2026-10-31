import React from 'react';
import { MindSpaceProvider } from './store/MindSpaceContext';
import { EmilyDashboard } from './components/reference/EmilyDashboard';
import { IntentionalPauseModal } from './components/antiscroll/IntentionalPauseModal';
import { FocusModeModal } from './components/focus/FocusModeModal';
import { FocusSummaryModal } from './components/focus/FocusSummaryModal';
import { WelcomeOnboardingModal } from './components/onboarding/WelcomeOnboardingModal';

export function App() {
  return (
    <MindSpaceProvider>
      <div className="min-h-screen bg-[#F7F4EE] text-slate-800 font-['Nunito',sans-serif]">
        {/* The Exact Pixel-Accurate Emily Productivity Dashboard */}
        <EmilyDashboard />

        {/* Global Overlays for Focus Mode, Anti-Scrolling Sanctuary & First-Time Onboarding */}
        <IntentionalPauseModal />
        <FocusModeModal />
        <FocusSummaryModal />
        <WelcomeOnboardingModal />
      </div>
    </MindSpaceProvider>
  );
}

export default App;
