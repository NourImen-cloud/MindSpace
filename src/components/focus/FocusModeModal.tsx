import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Minimize2, 
  CheckCircle2, 
  Target,
  Edit3
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { formatSecondsToTimer } from '../../utils/formatters';
import { DistractionParkingLot } from './DistractionParkingLot';
import { CozyStudyGirlIllustration } from '../common/AestheticAssets';

export const FocusModeModal: React.FC = () => {
  const {
    tasks,
    activeFocusSession,
    isFocusModalOpen,
    focusSecondsRemaining,
    isTimerRunning,
    pauseFocusTimer,
    resumeFocusTimer,
    stopFocusSession,
    closeFocusModal,
  } = useMindSpace();

  const [isSwitchingTask, setIsSwitchingTask] = useState(false);

  if (!isFocusModalOpen || !activeFocusSession) return null;

  const totalSeconds = (activeFocusSession.targetMinutes || 25) * 60;
  const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - focusSecondsRemaining) / totalSeconds) * 100));

  const handleSwitchTask = (taskId: string) => {
    const found = tasks.find(t => t.id === taskId);
    if (found) {
      activeFocusSession.taskId = found.id;
      activeFocusSession.taskTitle = found.title;
    }
    setIsSwitchingTask(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7FD] flex flex-col items-center justify-between p-3 sm:p-6 md:p-8 animate-fadeIn text-slate-800 overflow-y-auto max-h-screen">
      {/* Top Bar with minimize */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10 shrink-0 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200 flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
            Focus Sanctuary Active 🌸
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSwitchingTask(prev => !prev)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-purple-700 bg-white border border-purple-100 shadow-xs hover:bg-purple-50 transition-colors"
            title="Switch task you are focusing on"
          >
            <Target className="w-3.5 h-3.5" />
            <span>Switch Task</span>
          </button>

          <button
            onClick={closeFocusModal}
            className="p-2 rounded-2xl text-slate-500 hover:text-purple-700 bg-white border border-purple-100 shadow-xs transition-colors"
            title="Minimize focus view to background"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Switch Task Dropdown if open */}
      {isSwitchingTask && (
        <div className="w-full max-w-md bg-white border border-purple-200 rounded-2xl p-3 shadow-lg z-20 space-y-2 animate-fadeIn mb-3">
          <span className="text-xs font-black text-slate-800 block">Select Task to Anchor:</span>
          <select
            onChange={e => handleSwitchTask(e.target.value)}
            value={activeFocusSession.taskId || ''}
            className="w-full bg-[#FAF7FD] border border-purple-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-600"
          >
            {tasks.map(t => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.estimatedMinutes}m)
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Center Focus Core: Active Task + Illustration + Timer */}
      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 max-w-lg my-auto shrink-0 py-2">
        <div className="space-y-1">
          <span className="text-[10px] sm:text-[11px] font-black text-purple-600 uppercase tracking-widest">
            Anchor Study Task
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 tracking-tight font-['Quicksand',sans-serif] px-4 max-w-md truncate">
            {activeFocusSession.taskTitle}
          </h2>
        </div>

        {/* Circular Timer Visual with Anime Girl Inside */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 flex items-center justify-center">
          {/* SVG Progress Ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-purple-100"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-purple-600 transition-all duration-1000 ease-linear"
              strokeWidth="4"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Inner Content */}
          <div className="absolute inset-3 sm:inset-4 rounded-full bg-white shadow-md overflow-hidden flex flex-col items-center justify-center p-3 sm:p-4">
            <CozyStudyGirlIllustration className="w-20 h-20 sm:w-28 sm:h-28 -mt-2" />
            <div className="font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight font-['Quicksand',sans-serif] mt-0.5">
              {formatSecondsToTimer(focusSecondsRemaining)}
            </div>
            <span className="text-[10px] sm:text-[11px] text-purple-600 font-bold">
              {isTimerRunning ? 'Flowing peacefully 🌸' : 'Paused in tranquility'}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 sm:gap-3 pt-1">
          {isTimerRunning ? (
            <button
              onClick={pauseFocusTimer}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white border border-purple-200 text-purple-700 font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Timer</span>
            </button>
          ) : (
            <button
              onClick={resumeFocusTimer}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Flow</span>
            </button>
          )}

          <button
            onClick={() => stopFocusSession(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-extrabold text-xs transition-colors"
            title="Mark session as complete and log focus minutes"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete</span>
          </button>

          <button
            onClick={() => stopFocusSession(false)}
            className="p-2.5 sm:p-3 rounded-full text-slate-400 hover:text-rose-500 bg-white border border-purple-100 transition-colors"
            title="End session"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom: Distraction Parking Lot */}
      <div className="w-full max-w-md z-10 pb-2 shrink-0">
        <DistractionParkingLot />
      </div>
    </div>
  );
};
