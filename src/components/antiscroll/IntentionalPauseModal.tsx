import React, { useState, useEffect } from 'react';
import { 
  Wind, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Coffee, 
  Flame, 
  X,
  Heart
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { DistractionReason } from '../../types';
import { MindSpaceAIEngine } from '../../utils/aiEngine';
import { CuteCloudMascot } from '../common/AestheticAssets';

export const IntentionalPauseModal: React.FC = () => {
  const { 
    activeIntercept, 
    setDistractionReason, 
    completeGentleReturn, 
    cancelIntercept, 
    alternatives, 
    settings 
  } = useMindSpace();

  const [secondsRemaining, setSecondsRemaining] = useState(settings.pauseBreathingSeconds || 5);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    if (!activeIntercept || activeIntercept.stage !== 'pause') return;
    setSecondsRemaining(settings.pauseBreathingSeconds || 5);
    setCanProceed(false);

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setCanProceed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeIntercept?.stage, settings.pauseBreathingSeconds]);

  if (!activeIntercept || !activeIntercept.isOpen) return null;

  const appName = activeIntercept.appName;
  const stage = activeIntercept.stage;

  const recommendedAlternatives = MindSpaceAIEngine.getAdaptiveAlternatives(
    alternatives, 
    activeIntercept.reason, 
    15
  );

  const reasonsList: Array<{ id: DistractionReason; label: string; icon: string; desc: string }> = [
    { id: 'boredom', label: 'Boredom', icon: '🥱', desc: 'Seeking quick stimulation or variety' },
    { id: 'avoiding_task', label: 'Avoiding a Task', icon: '😣', desc: 'Resistance or fear of starting challenging study' },
    { id: 'need_break', label: 'Needing a Break', icon: '☕', desc: 'Mental fatigue, tired eyes, low energy' },
    { id: 'habitual', label: 'Habitual Reflex', icon: '🤖', desc: 'Unconscious phone check out of habit' },
    { id: 'specific_check', label: 'Checking Something Specific', icon: '🔍', desc: 'Direct message or purposeful reference' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-purple-950/40 backdrop-blur-md flex items-center justify-center p-4 transition-all">
      <div className="w-full max-w-lg bg-white border border-purple-100 rounded-[36px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Close / dismiss */}
        <button
          onClick={cancelIntercept}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STAGE 1: INTENTIONAL PAUSE & BREATHING */}
        {stage === 'pause' && (
          <div className="flex flex-col items-center text-center space-y-6 py-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-700 bg-purple-100 px-3.5 py-1 rounded-full border border-purple-200">
              Intentional Pause
            </span>

            {/* Calming Breathing Animation Ring with Cute Mascot */}
            <div className="relative flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-purple-100 via-pink-100 to-indigo-100 animate-breathe flex items-center justify-center shadow-inner">
                <div className="w-28 h-28 rounded-full bg-white shadow-md flex items-center justify-center">
                  <CuteCloudMascot className="w-16 h-16 drop-shadow-sm" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h3 className="text-xl font-black text-slate-800 font-['Quicksand',sans-serif]">
                You are reaching for {appName} 🌸
              </h3>
              <p className="text-xs text-purple-700 font-medium leading-relaxed">
                Take a gentle, slow breath with the cloud mascot. Notice your impulse before your fingers start scrolling.
              </p>
            </div>

            <div className="pt-1">
              {canProceed ? (
                <button
                  onClick={() => {
                    if (activeIntercept) {
                      setDistractionReason('habitual');
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-200 transition-all active:scale-95"
                >
                  <span>Explore What Triggered This</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs font-bold text-purple-700 bg-purple-50 px-5 py-2 rounded-full border border-purple-200">
                  Breathing in calm awareness... {secondsRemaining}s
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 2: DISTRACTION REASON IDENTIFICATION */}
        {stage === 'reason' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full border border-purple-200">
                Awareness 💡
              </span>
              <h3 className="text-lg font-black text-slate-800 font-['Quicksand',sans-serif]">
                What triggered your impulse to open {appName}?
              </h3>
              <p className="text-xs text-slate-500">
                Naming the emotion frees your attention from the automatic loop.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              {reasonsList.map(r => (
                <button
                  key={r.id}
                  onClick={() => setDistractionReason(r.id)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7FD] hover:bg-purple-50 border border-purple-100 hover:border-purple-300 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-purple-700 transition-colors">
                        {r.label}
                      </div>
                      <div className="text-[11px] text-slate-500">{r.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 3: GENTLE RETURN & RETURN MOMENTUM */}
        {stage === 'gentle_return' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-200">
                Gentle Return 🌸
              </span>
              <h3 className="text-lg font-black text-slate-800 font-['Quicksand',sans-serif]">
                How would you like to redirect your attention?
              </h3>
              <p className="text-xs text-slate-500">
                No guilt, no broken streaks. Every gentle return earns Return Momentum!
              </p>
            </div>

            {/* 3 Redirection Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <button
                onClick={() => completeGentleReturn('resume_task')}
                className="flex flex-col items-center justify-between p-3.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all text-center group active:scale-95 shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div className="text-xs font-extrabold text-purple-900">Resume Task</div>
                <p className="text-[10px] text-purple-700 mt-0.5">Jump right back into flow</p>
                <span className="mt-2 text-[9px] font-bold text-purple-700 bg-white px-2 py-0.5 rounded-full border border-purple-200">
                  +6 Momentum
                </span>
              </button>

              <button
                onClick={() => completeGentleReturn('micro_focus_5m')}
                className="flex flex-col items-center justify-between p-3.5 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all text-center group active:scale-95 shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
                <div className="text-xs font-extrabold text-teal-900">5-Min Focus</div>
                <p className="text-[10px] text-teal-700 mt-0.5">Just 300s of low friction</p>
                <span className="mt-2 text-[9px] font-bold text-teal-700 bg-white px-2 py-0.5 rounded-full border border-teal-200">
                  +6 Momentum
                </span>
              </button>

              <button
                onClick={() => completeGentleReturn('intentional_break')}
                className="flex flex-col items-center justify-between p-3.5 rounded-2xl bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-all text-center group active:scale-95 shadow-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-pink-500 text-white flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Coffee className="w-4 h-4" />
                </div>
                <div className="text-xs font-extrabold text-pink-900">Calm Break</div>
                <p className="text-[10px] text-pink-700 mt-0.5">Step away from screen</p>
                <span className="mt-2 text-[9px] font-bold text-pink-700 bg-white px-2 py-0.5 rounded-full border border-pink-200">
                  +6 Momentum
                </span>
              </button>
            </div>

            {/* Personalized alternatives */}
            {recommendedAlternatives.length > 0 && (
              <div className="pt-2 border-t border-purple-100">
                <div className="text-[11px] font-bold text-purple-700 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Screen-free suggestions for your current feeling:</span>
                </div>
                <div className="space-y-1">
                  {recommendedAlternatives.slice(0, 2).map(alt => (
                    <div
                      key={alt.id}
                      className="p-2 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-slate-700">{alt.title}</span>
                      <span className="text-[10px] font-bold text-purple-600 bg-white px-2 py-0.5 rounded-md">
                        {alt.durationMinutes}m
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
