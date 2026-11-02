import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Settings as SettingsIcon, 
  Play, 
  Pause, 
  FileText, 
  BarChart2, 
  CheckCircle2,
  Check,
  Target
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { CozyStudyGirlIllustration } from '../common/AestheticAssets';
import { formatSecondsToTimer } from '../../utils/formatters';
import { DistractionParkingLot } from './DistractionParkingLot';
import { Task } from '../../types';

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
    setCurrentTab
  } = useMindSpace();

  const [activeTabMode, setActiveTabMode] = useState<'pomodoro' | 'short_break' | 'long_break'>('pomodoro');
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [showParkingLotDrawer, setShowParkingLotDrawer] = useState(false);

  // User Task Selection Control
  const [selectedTaskId, setSelectedTaskId] = useState<string>(() => {
    return tasks.find(t => t.status === 'scheduled')?.id || tasks[0]?.id || 'custom';
  });
  const [customGoal, setCustomGoal] = useState('');

  const chosenTask = tasks.find(t => t.id === selectedTaskId);

  const handleTabChange = (mode: 'pomodoro' | 'short_break' | 'long_break') => {
    setActiveTabMode(mode);
    if (mode === 'pomodoro') setSelectedMinutes(25);
    else if (mode === 'short_break') setSelectedMinutes(5);
    else setSelectedMinutes(15);
  };

  const isSessionActive = Boolean(activeFocusSession);

  const handleStartOrToggle = () => {
    if (!isSessionActive) {
      if (selectedTaskId === 'custom' && customGoal.trim()) {
        const dummyTask: Task = {
          id: 'custom-' + Date.now(),
          title: customGoal.trim(),
          categoryId: 'cat-personal',
          priority: 'P2',
          estimatedMinutes: selectedMinutes,
          status: 'scheduled',
          createdAt: new Date().toISOString()
        };
        startFocusSession(dummyTask, selectedMinutes);
      } else {
        startFocusSession(chosenTask, selectedMinutes);
      }
    } else {
      if (isTimerRunning) {
        pauseFocusTimer();
      } else {
        resumeFocusTimer();
      }
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-lg mx-auto animate-fadeIn text-center px-2 sm:px-4">
      {/* 1. Header with back and settings icon */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className="p-2 rounded-2xl bg-white border border-purple-100 text-slate-700 hover:text-purple-600 shadow-xs transition-colors"
          title="Back to Dashboard"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h2 className="text-base sm:text-lg font-black text-slate-800 font-['Quicksand',sans-serif]">
          Focus Timer
        </h2>

        <button
          onClick={() => setCurrentTab('settings')}
          className="p-2 rounded-2xl bg-white border border-purple-100 text-slate-700 hover:text-purple-600 shadow-xs transition-colors"
          title="Timer Settings"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Mode Pill Tabs: [ Pomodoro (25m) ] [ Short Break (5m) ] [ Long Break (15m) ] */}
      <div className="flex items-center justify-center p-1 bg-white rounded-full border border-purple-100 shadow-xs max-w-xs sm:max-w-sm mx-auto">
        <button
          onClick={() => handleTabChange('pomodoro')}
          className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-full text-xs font-extrabold transition-all ${
            activeTabMode === 'pomodoro'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-purple-600/70 hover:text-purple-700'
          }`}
        >
          Pomodoro
        </button>
        <button
          onClick={() => handleTabChange('short_break')}
          className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-full text-xs font-extrabold transition-all ${
            activeTabMode === 'short_break'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-purple-600/70 hover:text-purple-700'
          }`}
        >
          Short Break
        </button>
        <button
          onClick={() => handleTabChange('long_break')}
          className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 rounded-full text-xs font-extrabold transition-all ${
            activeTabMode === 'long_break'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-purple-600/70 hover:text-purple-700'
          }`}
        >
          Long Break
        </button>
      </div>

      {/* 3. Task Selection Control (Gives User 100% Control on what to focus on) */}
      {!isSessionActive ? (
        <div className="bg-white rounded-2xl p-3 border border-purple-100 shadow-xs max-w-sm mx-auto text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-purple-700 uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-purple-600" />
              <span>Choose Focus Task:</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold">{tasks.length} tasks available</span>
          </div>

          <select
            value={selectedTaskId}
            onChange={e => setSelectedTaskId(e.target.value)}
            className="w-full bg-[#FAF7FD] border border-purple-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-600"
          >
            {tasks.map(t => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.estimatedMinutes}m) {t.status === 'completed' ? '✓' : ''}
              </option>
            ))}
            <option value="custom">✨ Enter Custom Focus Goal...</option>
          </select>

          {selectedTaskId === 'custom' && (
            <input
              type="text"
              placeholder="e.g. Study Chapter 4 Biology"
              value={customGoal}
              onChange={e => setCustomGoal(e.target.value)}
              className="w-full bg-[#FAF7FD] border border-purple-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-600 animate-fadeIn"
            />
          )}
        </div>
      ) : (
        <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-2.5 max-w-sm mx-auto text-center space-y-0.5">
          <span className="text-[10px] font-black uppercase text-purple-600 tracking-wider">Active Anchor Task</span>
          <p className="text-xs font-extrabold text-slate-800 truncate">
            {activeFocusSession?.taskTitle || chosenTask?.title || 'Focused Session'}
          </p>
        </div>
      )}

      {/* 4. Responsive Circular Anime Illustration */}
      <div className="relative mx-auto w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Soft pastel ring with gentle glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-200 via-pink-100 to-indigo-100 p-1 shadow-inner animate-breathe" />

        <div className="relative w-[92%] h-[92%] rounded-full bg-[#FAF7FD] border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
          <CozyStudyGirlIllustration className="w-36 h-36 sm:w-48 sm:h-48" />
        </div>

        {/* Ambient floating element */}
        <span className="absolute bottom-4 left-3 text-xs animate-pulse">🌸</span>
      </div>

      {/* 5. Bold Timer Display */}
      <div className="space-y-1">
        <div className="font-extrabold text-4xl sm:text-6xl text-slate-800 tracking-tight font-['Quicksand',sans-serif]">
          {isSessionActive 
            ? formatSecondsToTimer(focusSecondsRemaining)
            : `${selectedMinutes.toString().padStart(2, '0')}:00`
          }
        </div>
        <p className="text-xs font-semibold text-purple-600/90 flex items-center justify-center gap-1">
          <span>{isSessionActive && isTimerRunning ? 'Flowing in calm focus 🌸' : 'Ready to begin your session'}</span>
        </p>
      </div>

      {/* 6. Big Purple Pill Start / Pause Button */}
      <div className="pt-1 max-w-xs mx-auto space-y-2">
        <button
          onClick={handleStartOrToggle}
          className="w-full py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-lg shadow-purple-300 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {isSessionActive && isTimerRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Focus</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{isSessionActive ? 'Resume Flow' : 'Start Focus'}</span>
            </>
          )}
        </button>

        {isSessionActive && (
          <button
            onClick={() => stopFocusSession(true)}
            className="w-full py-2 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-100 hover:bg-purple-200 rounded-full transition-colors flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Complete Session & Log Time</span>
          </button>
        )}
      </div>

      {/* 7. Controls: Parking Lot & Stats */}
      <div className="flex items-center justify-center gap-6 pt-2">
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
