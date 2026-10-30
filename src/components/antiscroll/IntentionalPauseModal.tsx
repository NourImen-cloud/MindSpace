import React, { useState, useEffect } from 'react';
import { 
  Wind, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Coffee, 
  RotateCcw, 
  Flame, 
  CheckCircle, 
  X 
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { DistractionReason } from '../../types';
import { MindSpaceAIEngine } from '../../utils/aiEngine';

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

  // Adaptive alternative suggestions based on identified reason
  const recommendedAlternatives = MindSpaceAIEngine.getAdaptiveAlternatives(
    alternatives, 
    activeIntercept.reason, 
    15
  );

  const reasonsList: Array<{ id: DistractionReason; label: string; icon: string; desc: string }> = [
    { id: 'boredom', label: 'Boredom', icon: '🥱', desc: 'Seeking quick stimulation or variety' },
    { id: 'avoiding_task', label: 'Avoiding a Task', icon: '😣', desc: 'Resistance or fear of starting challenging work' },
    { id: 'need_break', label: 'Needing a Break', icon: '☕', desc: 'Mental fatigue, eyes tired, low energy' },
    { id: 'habitual', label: 'Habitual Reflex', icon: '🤖', desc: 'Muscle memory / unconscious phone check' },
    { id: 'specific_check', label: 'Checking Something Specific', icon: '🔍', desc: 'Direct message or purposeful query' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 transition-all">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Close / dismiss */}
        <button
          onClick={cancelIntercept}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STAGE 1: INTENTIONAL PAUSE & BREATHING */}
        {stage === 'pause' && (
          <div className="flex flex-col items-center text-center space-y-6 py-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Intentional Pause
            </span>

            {/* Calming Breathing Animation Ring */}
            <div className="relative flex items-center justify-center">
              <div className="w-36 h-36 rounded-full bg-emerald-500/10 border border-emerald-500/30 animate-breathe flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                  <Wind className="w-8 h-8 text-emerald-300 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-bold text-slate-100">
                You are reaching for {appName}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take a deep, slow diaphragmatic breath. MindSpace interrupts the automatic loop to give your conscious mind a choice.
              </p>
            </div>

            <div className="pt-2">
              {canProceed ? (
                <button
                  onClick={() => {
                    if (activeIntercept) {
                      setDistractionReason('habitual'); // default if proceeded
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950 transition-all active:scale-95"
                >
                  <span>Explore What Triggered This</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs font-mono text-emerald-400/80 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/60">
                  Inhaling calm awareness... {secondsRemaining}s
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 2: DISTRACTION REASON IDENTIFICATION */}
        {stage === 'reason' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-0.5 rounded-full border border-indigo-500/20">
                Metacognitive Awareness
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                What triggered your impulse to open {appName}?
              </h3>
              <p className="text-xs text-slate-400">
                Recognizing the emotional state removes the unconscious pull.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2">
              {reasonsList.map(r => (
                <button
                  key={r.id}
                  onClick={() => setDistractionReason(r.id)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 hover:border-indigo-500/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                        {r.label}
                      </div>
                      <div className="text-[11px] text-slate-400">{r.desc}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STAGE 3: GENTLE RETURN & RETURN MOMENTUM (Features 14, 15 & 17) */}
        {stage === 'gentle_return' && (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/20">
                Gentle Return
              </span>
              <h3 className="text-lg font-bold text-slate-100">
                How would you like to redirect your attention?
              </h3>
              <p className="text-xs text-slate-400">
                No guilt, no broken streaks. Every gentle return earns Return Momentum.
              </p>
            </div>

            {/* Three Core Gentle Return Paths */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                onClick={() => completeGentleReturn('resume_task')}
                className="flex flex-col items-center justify-between p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all text-center group active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div className="text-xs font-bold text-emerald-300">Resume Current Task</div>
                <p className="text-[10px] text-slate-400 mt-1">Jump right back into flow</p>
                <span className="mt-3 text-[10px] font-semibold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  +6 Momentum
                </span>
              </button>

              <button
                onClick={() => completeGentleReturn('micro_focus_5m')}
                className="flex flex-col items-center justify-between p-4 rounded-2xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition-all text-center group active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-teal-300">5-Min Micro Focus</div>
                <p className="text-[10px] text-slate-400 mt-1">Low friction: just 300 seconds</p>
                <span className="mt-3 text-[10px] font-semibold text-teal-400 bg-teal-500/20 px-2 py-0.5 rounded-full">
                  +6 Momentum
                </span>
              </button>

              <button
                onClick={() => completeGentleReturn('intentional_break')}
                className="flex flex-col items-center justify-between p-4 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all text-center group active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Coffee className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-indigo-300">5-Min Calm Break</div>
                <p className="text-[10px] text-slate-400 mt-1">Step away from the screen</p>
                <span className="mt-3 text-[10px] font-semibold text-indigo-400 bg-indigo-500/20 px-2 py-0.5 rounded-full">
                  +6 Momentum
                </span>
              </button>
            </div>

            {/* Personalized Alternative Suggestions */}
            {recommendedAlternatives.length > 0 && (
              <div className="pt-2 border-t border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Personalized Screen-Free Alternatives for your emotional trigger:</span>
                </div>
                <div className="space-y-1.5">
                  {recommendedAlternatives.map(alt => (
                    <div
                      key={alt.id}
                      className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-semibold text-slate-200">{alt.title}</span>
                        <p className="text-[10px] text-slate-400">{alt.description}</p>
                      </div>
                      <span className="text-[10px] font-mono text-teal-400 shrink-0 ml-2">
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
