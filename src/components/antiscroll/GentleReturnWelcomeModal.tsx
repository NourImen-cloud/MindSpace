import React from 'react';
import { 
  Sparkles, 
  Play, 
  Flame, 
  Coffee, 
  Check, 
  X, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { ClayBunnyWithHeart, ClayZenMug } from '../reference/ClayIcons';
import confetti from 'canvas-confetti';

interface GentleReturnWelcomeModalProps {
  returnedFromApp: string;
  onClose: () => void;
}

export const GentleReturnWelcomeModal: React.FC<GentleReturnWelcomeModalProps> = ({
  returnedFromApp,
  onClose
}) => {
  const { tasks, startFocusSession, userProfile } = useMindSpace();

  // Trigger celebration confetti on mount
  React.useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B']
      });
    } catch {}
  }, []);

  const activeTask = tasks.find(t => t.status === 'scheduled' || t.status === 'in_progress') || tasks[0];

  const handleStartTaskFocus = (minutes: number) => {
    onClose();
    startFocusSession(activeTask, minutes);
  };

  const handleStartRest = () => {
    onClose();
    startFocusSession(undefined, 5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn font-['Nunito',sans-serif]">
      <div className="relative w-full max-w-lg bg-white rounded-[36px] border-2 border-purple-200 shadow-2xl p-6 sm:p-8 space-y-6 text-center overflow-hidden">
        
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot & Badge */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <ClayBunnyWithHeart className="w-20 h-20 animate-bounce" />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
            <span>Gentle Return Victory 🌸</span>
          </div>
        </div>

        {/* Victory Message */}
        <div className="space-y-1.5">
          <h2 className="text-2xl font-black text-slate-900 font-['Quicksand',sans-serif]">
            Welcome Back, {userProfile.name}!
          </h2>
          <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-sm mx-auto">
            You consciously paused and walked away from <span className="text-purple-700 font-extrabold">{returnedFromApp}</span>.
            Your screen time was protected.
          </p>
        </div>

        {/* Momentum Reward Banner */}
        <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-emerald-50 p-3.5 rounded-2xl border border-purple-100 flex items-center justify-around text-xs">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Screen Time Saved</div>
            <div className="text-base font-black text-purple-700">+15 mins</div>
          </div>
          <div className="h-8 w-px bg-purple-200" />
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Return Momentum</div>
            <div className="text-base font-black text-emerald-600">+10 Points</div>
          </div>
        </div>

        {/* Immediate Action Choices */}
        <div className="space-y-2.5 pt-1">
          {activeTask && (
            <button
              onClick={() => handleStartTaskFocus(25)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-xs shadow-md transition-all active:scale-98"
            >
              <div className="flex items-center gap-2.5 text-left min-w-0">
                <Play className="w-4 h-4 fill-white shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] text-purple-200 font-normal uppercase">Resume Your Active Task</div>
                  <div className="truncate font-black">{activeTask.title}</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-white/20 rounded-xl text-[10px] shrink-0">
                Start 25m Focus →
              </span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleStartTaskFocus(5)}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#FAF7F2] hover:bg-purple-50 border border-[#ECE6D8] text-purple-900 font-black text-xs transition-colors"
            >
              <Flame className="w-4 h-4 text-amber-500" />
              <span>5m Micro Focus</span>
            </button>

            <button
              onClick={handleStartRest}
              className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-[#FAF7F2] hover:bg-emerald-50 border border-[#ECE6D8] text-emerald-900 font-black text-xs transition-colors"
            >
              <Coffee className="w-4 h-4 text-emerald-600" />
              <span>5m Mindful Rest</span>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-xs font-bold text-slate-400 hover:text-slate-600 pt-1"
        >
          Just take me to the dashboard
        </button>

      </div>
    </div>
  );
};
