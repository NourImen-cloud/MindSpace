import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Monitor, 
  HardDrive, 
  Play,
  RotateCcw
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';

export const Header: React.FC = () => {
  const { 
    momentum, 
    startFocusSession, 
    tasks, 
    currentAmbient, 
    setAmbientSound, 
    settings, 
    updateSettings 
  } = useMindSpace();

  const activeTask = tasks.find(t => t.status === 'scheduled') || tasks[0];

  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 py-3.5 flex items-center justify-between transition-colors">
      {/* Brand & Tagline */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-indigo-500/30 border border-emerald-500/30 flex items-center justify-center shadow-inner text-emerald-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-tight text-slate-100">MINDSPACE</span>
            <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Calm & Attention
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">Reclaim your attention without guilt or pressure</p>
        </div>
      </div>

      {/* Center/Right stats & actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Return Momentum Badge */}
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-sm text-xs font-medium cursor-pointer hover:border-emerald-500/40 transition-all group"
          title={`Return Momentum: ${momentum.currentMomentumScore}% | ${momentum.totalReturns} Mindful Redirections`}
        >
          <div className="flex items-center justify-center w-5 h-5 rounded-lg bg-emerald-500/15 text-emerald-400">
            <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-45" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Momentum</div>
            <div className="text-emerald-300 font-bold flex items-center gap-1">
              {momentum.currentMomentumScore}%
              <span className="text-[10px] text-slate-400 font-normal">({momentum.totalReturns} returns)</span>
            </div>
          </div>
        </div>

        {/* Ambient Soundscape Quick Toggle */}
        <button
          onClick={() => {
            if (currentAmbient === 'none') {
              setAmbientSound('rain');
            } else {
              setAmbientSound('none');
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
            currentAmbient !== 'none'
              ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
              : 'bg-slate-800/50 text-slate-400 border-slate-700/60 hover:text-slate-200'
          }`}
          title="Ambient Soundscape (Synthesized Rain & Drone)"
        >
          {currentAmbient !== 'none' ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden md:inline capitalize">{currentAmbient === 'none' ? 'Sound: Off' : currentAmbient}</span>
        </button>

        {/* Local-First Badge */}
        <div 
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/40 border border-slate-700/40 text-[11px] text-slate-400 font-medium"
          title="All your data is stored locally in your browser. 100% private."
        >
          <HardDrive className="w-3.5 h-3.5 text-teal-400" />
          <span>Local-First</span>
        </div>

        {/* View Mode Toggle: Desktop / Mobile Preview */}
        <button
          onClick={() => {
            updateSettings({
              viewMode: settings.viewMode === 'desktop' ? 'mobile_preview' : 'desktop'
            });
          }}
          className="p-2 rounded-xl bg-slate-800/70 border border-slate-700/60 text-slate-300 hover:text-white transition-colors"
          title={settings.viewMode === 'desktop' ? 'Switch to Mobile View Preview' : 'Switch to Full Desktop View'}
        >
          {settings.viewMode === 'desktop' ? (
            <Smartphone className="w-4 h-4 text-slate-300" />
          ) : (
            <Monitor className="w-4 h-4 text-emerald-400" />
          )}
        </button>

        {/* Quick Focus Button */}
        <button
          onClick={() => startFocusSession(activeTask, 25)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-xs shadow-md shadow-emerald-900/30 transition-all active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="hidden sm:inline">Start Focus</span>
        </button>
      </div>
    </header>
  );
};
