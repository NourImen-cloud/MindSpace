import React from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Minimize2, 
  CheckCircle2, 
  Sparkles,
  Music
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { formatSecondsToTimer } from '../../utils/formatters';
import { DistractionParkingLot } from './DistractionParkingLot';
import { CozyStudyGirlIllustration } from '../common/AestheticAssets';

export const FocusModeModal: React.FC = () => {
  const {
    activeFocusSession,
    isFocusModalOpen,
    focusSecondsRemaining,
    isTimerRunning,
    pauseFocusTimer,
    resumeFocusTimer,
    stopFocusSession,
    closeFocusModal,
    currentAmbient,
    setAmbientSound
  } = useMindSpace();

  if (!isFocusModalOpen || !activeFocusSession) return null;

  const totalSeconds = (activeFocusSession.targetMinutes || 25) * 60;
  const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - focusSecondsRemaining) / totalSeconds) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7FD] flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn text-slate-800">
      {/* Top Bar with minimize & soundscape */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200 flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
            Focus Sanctuary Active 🌸
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Ambient selector */}
          <div className="flex items-center gap-1.5 bg-white border border-purple-100 rounded-full p-1 text-xs shadow-xs">
            {(['none', 'rain', 'forest', 'brown_noise'] as const).map(type => (
              <button
                key={type}
                onClick={() => setAmbientSound(type)}
                className={`px-3 py-1 rounded-full capitalize font-bold transition-colors ${
                  currentAmbient === type
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-purple-600'
                }`}
              >
                {type === 'brown_noise' ? 'Warm Drone' : type === 'none' ? 'Mute' : type}
              </button>
            ))}
          </div>

          <button
            onClick={closeFocusModal}
            className="p-2 rounded-2xl text-slate-500 hover:text-purple-700 bg-white border border-purple-100 shadow-xs transition-colors"
            title="Minimize focus view to background"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Focus Core: Active Task + Illustration + Timer */}
      <div className="flex flex-col items-center text-center space-y-4 max-w-lg my-auto">
        <div className="space-y-1">
          <span className="text-[11px] font-black text-purple-600 uppercase tracking-widest">
            Anchor Study Task ✨
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-['Quicksand',sans-serif]">
            {activeFocusSession.taskTitle}
          </h2>
        </div>

        {/* Circular Timer Visual with Anime Girl Inside */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
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
          <div className="absolute inset-4 rounded-full bg-white shadow-md overflow-hidden flex flex-col items-center justify-center p-4">
            <CozyStudyGirlIllustration className="w-28 h-28 -mt-2" />
            <div className="font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight font-['Quicksand',sans-serif] mt-1">
              {formatSecondsToTimer(focusSecondsRemaining)}
            </div>
            <span className="text-[11px] text-purple-600 font-bold">
              {isTimerRunning ? 'Flowing peacefully 🌸' : 'Paused in tranquility'}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          {isTimerRunning ? (
            <button
              onClick={pauseFocusTimer}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-purple-200 text-purple-700 font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Timer</span>
            </button>
          ) : (
            <button
              onClick={resumeFocusTimer}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Flow</span>
            </button>
          )}

          <button
            onClick={() => stopFocusSession(true)}
            className="flex items-center gap-1.5 px-4 py-3 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-extrabold text-xs transition-colors"
            title="Mark session as complete"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete</span>
          </button>

          <button
            onClick={() => stopFocusSession(false)}
            className="p-3 rounded-full text-slate-400 hover:text-rose-500 bg-white border border-purple-100 transition-colors"
            title="End session"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom: Distraction Parking Lot */}
      <div className="w-full max-w-md z-10 pb-2">
        <DistractionParkingLot />
      </div>
    </div>
  );
};
