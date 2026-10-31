import React from 'react';
import { MindSpaceProvider, useMindSpace } from './store/MindSpaceContext';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { MobileFrame } from './components/layout/MobileFrame';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { TaskManager } from './components/activity/TaskManager';
import { DailyPlanner } from './components/activity/DailyPlanner';
import { AntiScrollingHub } from './components/antiscroll/AntiScrollingHub';
import { FocusModeView } from './components/focus/FocusModeView';
import { AlternativeLibrary } from './components/alternatives/AlternativeLibrary';
import { WellbeingDashboard } from './components/wellbeing/WellbeingDashboard';
import { WeeklyReflectionModal } from './components/wellbeing/WeeklyReflectionModal';
import { SettingsView } from './components/settings/SettingsView';
import { IntentionalPauseModal } from './components/antiscroll/IntentionalPauseModal';
import { FocusModeModal } from './components/focus/FocusModeModal';
import { FocusSummaryModal } from './components/focus/FocusSummaryModal';
import { AppShowcaseView } from './components/showcase/AppShowcaseView';

const MainContent: React.FC = () => {
  const { currentTab, settings } = useMindSpace();

  if (settings.viewMode === 'showcase') {
    return (
      <div className="min-h-screen bg-[#FAF7FD]">
        <Header />
        <AppShowcaseView />
        {/* Global Overlays */}
        <IntentionalPauseModal />
        <FocusModeModal />
        <FocusSummaryModal />
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (currentTab) {
      case 'dashboard':
        return <OverviewDashboard />;
      case 'tasks':
        return <TaskManager />;
      case 'planner':
        return <DailyPlanner />;
      case 'antiscroll':
        return <AntiScrollingHub />;
      case 'focus':
        return <FocusModeView />;
      case 'alternatives':
        return <AlternativeLibrary />;
      case 'wellbeing':
        return <WellbeingDashboard />;
      case 'reflection':
        return <WeeklyReflectionModal />;
      case 'settings':
        return <SettingsView />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7FD] text-slate-800 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900">
      <Header />

      <div className="flex-1 flex flex-col md:flex-row">
        <Navigation />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl overflow-y-auto">
          {renderActiveTab()}
        </main>
      </div>

      {/* Global Overlays */}
      <IntentionalPauseModal />
      <FocusModeModal />
      <FocusSummaryModal />
    </div>
  );
};

export function App() {
  return (
    <MindSpaceProvider>
      <MobileFrame>
        <MainContent />
      </MobileFrame>
    </MindSpaceProvider>
  );
}

export default App;
