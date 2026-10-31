import React from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Monitor, 
  Play,
  RotateCcw,
  Flame,
  Coffee,
  Heart,
  LayoutGrid
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { FairyLights } from '../common/AestheticAssets';

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
    <div className="relative bg-white/80 backdrop-blur-md border-b border-purple-100/80 sticky top-0 z-30 shadow-[0_4px_20px_rgba(139,92,246,0.04)]">
      {/* Delicate Fairy Lights across top edge */}
      <FairyLights />

      <header className="px-4 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand & Cute Star Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-400 p-[1.5px] shadow-md shadow-purple-200">
            <div className="w-full h-full bg-purple-600 rounded-[14px] flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6 fill-current animate-pulse text-amber-200" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-800 font-['Quicksand',sans-serif]">
                MindSpace
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 flex items-center gap-1">
                <span>Plan. Focus. Achieve.</span>
                <Heart className="w-2.5 h-2.5 fill-purple-500 text-purple-500" />
              </span>
            </div>
            <p className="text-xs text-purple-600/80 font-medium hidden sm:block">
              Your mindful study companion & digital sanctuary
            </p>
          </div>
        </div>

        {/* Center/Right stats & actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Study Streak / Return Momentum Badge (matches 12 Days streak card from screenshot!) */}
          <div 
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-sm shadow-purple-300 font-medium text-xs cursor-pointer hover:shadow-md transition-all active:scale-95"
            title={`Study Streak: ${momentum.studyStreakDays || 12} Days | ${momentum.totalReturns} Mindful Returns`}
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-xl bg-white/20 text-amber-200">
              <Flame className="w-4 h-4 fill-amber-300 text-amber-300 animate-bounce" />
            </div>
            <div className="text-left">
              <div className="text-[9px] text-purple-100 uppercase tracking-wider font-bold">Streak</div>
              <div className="font-extrabold text-white text-xs leading-none">
                {momentum.studyStreakDays || 12} Days
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-semibold transition-all ${
              currentAmbient !== 'none'
                ? 'bg-purple-100/80 text-purple-700 border-purple-300 shadow-sm'
                : 'bg-white text-slate-500 border-purple-100 hover:text-purple-600 hover:bg-purple-50/50'
            }`}
            title="Ambient Study Sounds (Rain, Lo-fi White Noise, Tibetan Chimes)"
          >
            {currentAmbient !== 'none' ? (
              <Volume2 className="w-4 h-4 text-purple-600 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
            <span className="hidden md:inline capitalize font-medium">
              {currentAmbient === 'none' ? 'Ambient: Off' : `Sound: ${currentAmbient}`}
            </span>
          </button>

          {/* View Mode Cycle: Desktop / Mobile / Poster Showcase */}
          <div className="flex items-center bg-purple-50 p-1 rounded-2xl border border-purple-100 text-xs">
            <button
              onClick={() => updateSettings({ viewMode: 'desktop' })}
              className={`p-1.5 rounded-xl transition-all ${
                settings.viewMode === 'desktop'
                  ? 'bg-white text-purple-700 font-bold shadow-sm'
                  : 'text-slate-500 hover:text-purple-600'
              }`}
              title="Full Desktop Dashboard View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateSettings({ viewMode: 'mobile_preview' })}
              className={`p-1.5 rounded-xl transition-all ${
                settings.viewMode === 'mobile_preview'
                  ? 'bg-white text-purple-700 font-bold shadow-sm'
                  : 'text-slate-500 hover:text-purple-600'
              }`}
              title="Cute Smartphone Frame Mode (as seen in screenshot!)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => updateSettings({ viewMode: 'showcase' })}
              className={`p-1.5 rounded-xl transition-all ${
                settings.viewMode === 'showcase'
                  ? 'bg-white text-purple-700 font-bold shadow-sm'
                  : 'text-slate-500 hover:text-purple-600'
              }`}
              title="Study Companion Poster Showcase View (matches uploaded design overview!)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Focus Button */}
          <button
            onClick={() => startFocusSession(activeTask, 25)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-purple-300 transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Start Focus</span>
          </button>
        </div>
      </header>
    </div>
  );
};
