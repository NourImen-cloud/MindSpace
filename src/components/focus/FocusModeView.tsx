import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Settings as SettingsIcon, 
  Play, 
  Pause, 
  Music, 
  FileText, 
  BarChart2, 
  Sparkles,
  Volume2,
  VolumeX,
  Sliders,
  BookmarkPlus
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { CozyStudyGirlIllustration } from '../common/AestheticAssets';
import { formatSecondsToTimer } from '../../utils/formatters';
import { DistractionParkingLot } from './DistractionParkingLot';

export const FocusModeView: React.FC = () => {
  const { 
    tasks, 
    startFocusSession, 
    activeFocusSession, 
    isTimerRunning, 
    focusSecondsRemaining, 
    pauseFocusTimer, 
    resumeFocusTimer, 
    stopFocusSession,
    currentAmbient, 
    setAmbientSound, 
    settings,
    setCurrentTab
  } = useMindSpace();

  const [activeTabMode, setActiveTabMode] = useState<'pomodoro' | 'short_break' | 'long_break'>('pomodoro');
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [showParkingLotDrawer, setShowParkingLotDrawer] = useState(false);

  const activeTask = tasks.find(t => t.status === 'scheduled') || tasks[0];

  const handleTabChange = (mode: 'pomodoro' | 'short_break' | 'long_break') => {
    setActiveTabMode(mode);
    if (mode === 'pomodoro') setSelectedMinutes(25);
    else if (mode === 'short_break') setSelectedMinutes(5);
    else setSelectedMinutes(15);
  };

  const isSessionActive = Boolean(activeFocusSession);

  const handleStartOrToggle = () => {
    if (!isSessionActive) {
      startFocusSession(activeTask, selectedMinutes);
    } else {
      if (isTimerRunning) {
        pauseFocusTimer();
      } else {
        resumeFocusTimer();
      }
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto animate-fadeIn text-center">
      {/* 1. Header with back and settings icon (Exact match to screenshot) */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className="p-2 rounded-2xl bg-white border border-purple-100 text-slate-700 hover:text-purple-600 shadow-xs transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-black text-slate-800 font-['Quicksand',sans-serif]">
          Focus Timer
        </h2>

        <button
          onClick={() => setCurrentTab('settings')}
          className="p-2 rounded-2xl bg-white border border-purple-100 text-slate-700 hover:text-purple-600 shadow-xs transition-colors"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Mode Pill Tabs: [ Pomodoro ] [ Short Break ] (Exact match to screenshot) */}
      <div className="flex items-center justify-center p-1.5 bg-white rounded-full border border-purple-100 shadow-xs max-w-xs mx-auto">
        <button
          onClick={() => handleTabChange('pomodoro')}
          className={`flex-1 py-2 px-3 rounded-full text-xs font-extrabold transition-all ${
            activeTabMode === 'pomodoro'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-purple-600/70 hover:text-purple-700'
          }`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => handleTabChange('short_break')}
          className={`flex-1 py-2 px-3 rounded-full text-xs font-extrabold transition-all ${
            activeTabMode === 'short_break'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-purple-600/70 hover:text-purple-700'
          }`}
        >
          Short Break
        </button>
      </div>

      {/* 3. Center Circular Anime Illustration (Exact match to screenshot cozy study anime girl in frame) */}
      <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
        {/* Soft pastel ring with gentle glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-200 via-pink-100 to-indigo-100 p-1 shadow-inner animate-breathe" />

        <div className="relative w-[92%] h-[92%] rounded-full bg-[#FAF7FD] border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
          <CozyStudyGirlIllustration className="w-48 h-48 sm:w-56 sm:h-56" />
        </div>

        {/* Ambient floating sparkles */}
        <span className="absolute top-2 right-4 text-sm animate-bounce">✨</span>
        <span className="absolute bottom-6 left-4 text-xs animate-pulse">🌸</span>
      </div>

      {/* 4. Bold Timer Display (Exact match to 25:00 in screenshot) */}
      <div className="space-y-1">
        <div className="font-extrabold text-5xl sm:text-6xl text-slate-800 tracking-tight font-['Quicksand',sans-serif]">
          {isSessionActive 
            ? formatSecondsToTimer(focusSecondsRemaining)
            : `${selectedMinutes.toString().padStart(2, '0')}:00`
          }
        </div>
        <p className="text-xs font-semibold text-purple-600/90 flex items-center justify-center gap-1">
          <span>Focus on your goal!</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        </p>

        {activeTask && (
          <div className="text-[11px] text-slate-500 font-medium">
            Anchor: <strong className="text-purple-700">{activeTask.title}</strong>
          </div>
        )}
      </div>

      {/* 5. Big Purple Pill Start Button (Exact match to screenshot Start button) */}
      <div className="pt-1 max-w-xs mx-auto">
        <button
          onClick={handleStartOrToggle}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-purple-300 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {isSessionActive && isTimerRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Focus</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{isSessionActive ? 'Resume' : 'Start'}</span>
            </>
          )}
        </button>

        {isSessionActive && (
          <button
            onClick={() => stopFocusSession(true)}
            className="mt-2 text-xs font-bold text-purple-600 hover:text-purple-800"
          >
            Complete Session Early ✨
          </button>
        )}
      </div>

      {/* 6. Bottom 3 Control Icons (Exact match to screenshot: Ambient, Tasks, Stats) */}
      <div className="flex items-center justify-center gap-6 pt-2">
        {/* Ambient audio toggle */}
        <button
          onClick={() => {
            if (currentAmbient === 'none') setAmbientSound('rain');
            else setAmbientSound('none');
          }}
          className={`flex flex-col items-center gap-1 text-[11px] font-bold transition-colors ${
            currentAmbient !== 'none' ? 'text-purple-600' : 'text-slate-400 hover:text-purple-500'
          }`}
          title="Toggle Ambient Lo-fi Sound"
        >
          <div className="w-10 h-10 rounded-2xl bg-white border border-purple-100 flex items-center justify-center shadow-xs">
            <Music className="w-5 h-5" />
          </div>
          <span>Ambient</span>
        </button>

        {/* Distraction Parking Lot */}
        <button
          onClick={() => setShowParkingLotDrawer(!showParkingLotDrawer)}
          className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-purple-600 transition-colors"
          title="Distraction Parking Lot (Quick capture stray thoughts)"
        >
          <div className="w-10 h-10 rounded-2xl bg-white border border-purple-100 flex items-center justify-center shadow-xs">
            <FileText className="w-5 h-5" />
          </div>
          <span>Parking Lot</span>
        </button>

        {/* Stats */}
        <button
          onClick={() => setCurrentTab('wellbeing')}
          className="flex flex-col items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-purple-600 transition-colors"
          title="View Progress & Stats"
        >
          <div className="w-10 h-10 rounded-2xl bg-white border border-purple-100 flex items-center justify-center shadow-xs">
            <BarChart2 className="w-5 h-5" />
          </div>
          <span>Stats</span>
        </button>
      </div>

      {/* Embedded Parking Lot Drawer if opened */}
      {showParkingLotDrawer && (
        <div className="pt-2 animate-fadeIn">
          <DistractionParkingLot />
        </div>
      )}
    </div>
  );
};
