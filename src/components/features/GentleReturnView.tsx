import React from 'react';
import { 
  RotateCcw, 
  Flame, 
  Sparkles, 
  Play, 
  Coffee, 
  CheckCircle2, 
  Heart,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { formatMinutes } from '../../utils/formatters';
import { ClayZenMug, ClayBunnyWithHeart } from '../reference/ClayIcons';

export const GentleReturnView: React.FC = () => {
  const { momentum, distractions, triggerDistractionIntercept, startFocusSession, tasks } = useMindSpace();

  const activeTask = tasks.find(t => t.status === 'scheduled') || tasks[0];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Signature Banner */}
      <div className="p-6 rounded-[30px] bg-gradient-to-r from-purple-500 via-indigo-600 to-pink-500 text-white shadow-lg shadow-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-lg">
          <div className="flex items-center gap-2">
            <ClayZenMug className="w-8 h-8" />
            <span className="text-xs font-black uppercase tracking-widest text-purple-100 bg-white/20 px-3 py-0.5 rounded-full">
              Signature Core Feature
            </span>
          </div>
          <h2 className="text-2xl font-black font-['Quicksand',sans-serif]">
            Gentle Return & Return Momentum
          </h2>
          <p className="text-xs text-purple-100 font-medium leading-relaxed">
            MINDSPACE never punishes you or breaks your streak when you get distracted. Instead, it measures and celebrates the victory of returning to what matters.
          </p>
        </div>

        <button
          onClick={() => triggerDistractionIntercept('Instagram')}
          className="px-5 py-3 rounded-full bg-white text-purple-700 hover:bg-purple-50 font-black text-xs shadow-md transition-all active:scale-95 shrink-0 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-purple-600" />
          <span>Experience Gentle Return 🌸</span>
        </button>
      </div>

      {/* 3 Core Gentle Return Paths */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-[26px] p-5 border border-[#ECE6D8] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800">1. Resume Current Task</h4>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Seamlessly restart your current anchor task without friction or shame.
            </p>
          </div>
          <button
            onClick={() => startFocusSession(activeTask, 20)}
            className="w-full py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-700 font-black text-xs transition-colors"
          >
            Resume Flow (+6 Momentum)
          </button>
        </div>

        <div className="bg-white rounded-[26px] p-5 border border-[#ECE6D8] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800">2. 5-Min Micro Focus</h4>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Overcome procrastination with zero pressure. Just 300 seconds of study.
            </p>
          </div>
          <button
            onClick={() => startFocusSession(activeTask, 5)}
            className="w-full py-2 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-700 font-black text-xs transition-colors"
          >
            Start 5-Min Sprint (+6 Momentum)
          </button>
        </div>

        <div className="bg-white rounded-[26px] p-5 border border-[#ECE6D8] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center font-bold">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800">3. Intentional Calm Break</h4>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Step away from all screens: hydrate, stretch, box breathing, or look outside.
            </p>
          </div>
          <button
            onClick={() => startFocusSession(undefined, 5)}
            className="w-full py-2 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 font-black text-xs transition-colors"
          >
            Take 5-Min Rest (+6 Momentum)
          </button>
        </div>
      </div>

      {/* Return Momentum Tracker & History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Momentum KPIs */}
        <div className="lg:col-span-7 bg-white rounded-[28px] p-5 sm:p-6 border border-[#ECE6D8] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>Return Momentum Philosophy</span>
            </h3>
            <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              Score: {momentum.currentMomentumScore}%
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Ordinary apps penalize you when a streak is broken, creating guilt and surrender. In MINDSPACE, momentum is built every time you notice distraction and return with gentleness.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#ECE6D8]">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Gentle Returns</span>
              <div className="text-2xl font-black text-purple-600 mt-0.5">{momentum.totalReturns}</div>
              <p className="text-[10px] text-slate-500 font-medium">Conscious redirections</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#ECE6D8]">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Screen Time Saved</span>
              <div className="text-2xl font-black text-teal-600 mt-0.5">+{formatMinutes(momentum.screenTimeSavedMinutes)}</div>
              <p className="text-[10px] text-slate-500 font-medium">Spared from scrolling</p>
            </div>
          </div>
        </div>

        {/* Motivation Bunny */}
        <div className="lg:col-span-5 bg-[#ECE8F8] rounded-[28px] p-5 border border-[#DDD6FE] shadow-sm flex items-center justify-between">
          <div className="space-y-1.5 max-w-[200px]">
            <h4 className="text-xs font-black text-[#5B21B6] leading-snug">
              Every return is a victory 🌸
            </h4>
            <p className="text-[10px] font-bold text-[#6D28D9]/80 leading-relaxed">
              You don't need rigid perfection to achieve your goals. Be proud of every mindful moment today.
            </p>
          </div>
          <div className="shrink-0 -mr-2">
            <ClayBunnyWithHeart className="w-20 h-20" />
          </div>
        </div>
      </div>
    </div>
  );
};
