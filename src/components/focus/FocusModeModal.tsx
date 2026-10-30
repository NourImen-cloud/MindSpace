import React from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Minimize2, 
  CheckCircle2, 
  Sparkles,
  Wind
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { formatSecondsToTimer } from '../../utils/formatters';
import { DistractionParkingLot } from './DistractionParkingLot';

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
    setAmbientSound,
    ambientVolume,
    setAmbientVolume
  } = useMindSpace();

  if (!isFocusModalOpen || !activeFocusSession) return null;

  const totalSeconds = (activeFocusSession.targetMinutes || 25) * 60;
  const progressPercent = Math.min(100, Math.max(0, ((totalSeconds - focusSecondsRemaining) / totalSeconds) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn">
      {/* Top Bar with minimize & soundscape */}
      <div className="w-full max-w-4xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Deep Focus Shield Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Ambient selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-2xl p-1 text-xs">
            {(['none', 'rain', 'forest', 'brown_noise'] as const).map(type => (
              <button
                key={type}
                onClick={() => setAmbientSound(type)}
                className={`px-2.5 py-1 rounded-xl capitalize transition-colors ${
                  currentAmbient === type
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type === 'brown_noise' ? 'Warm Drone' : type === 'none' ? 'Mute' : type}
              </button>
            ))}
          </div>

          <button
            onClick={closeFocusModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            title="Minimize focus view to background"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Focus Core: Active Task + Radial Timer */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-lg my-auto">
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
            Current Anchor Task
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            {activeFocusSession.taskTitle}
          </h2>
        </div>

        {/* Circular Timer Visual */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Subtle glowing background orb */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-indigo-500/10 blur-xl" />

          {/* SVG Progress Ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-slate-800"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-emerald-400 transition-all duration-1000 ease-linear"
              strokeWidth="4"
              strokeDasharray={276.46}
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Inner Timer Digits */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-mono text-5xl sm:text-6xl font-light text-slate-100 tracking-tight">
              {formatSecondsToTimer(focusSecondsRemaining)}
            </span>
            <span className="text-xs text-slate-400 font-medium mt-1">
              {isTimerRunning ? 'Flowing steadily' : 'Paused in tranquility'}
            </span>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          {isTimerRunning ? (
            <button
              onClick={pauseFocusTimer}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all active:scale-95 shadow-md"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause Timer</span>
            </button>
          ) : (
            <button
              onClick={resumeFocusTimer}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Flow</span>
            </button>
          )}

          <button
            onClick={() => stopFocusSession(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 font-semibold text-xs transition-colors"
            title="Mark session as complete"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete Session</span>
          </button>

          <button
            onClick={() => stopFocusSession(false)}
            className="p-3 rounded-2xl text-slate-500 hover:text-rose-400 hover:bg-slate-900 border border-slate-800 transition-colors"
            title="End without completing"
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
