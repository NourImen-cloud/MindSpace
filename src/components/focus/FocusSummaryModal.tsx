import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Plus, 
  RotateCcw, 
  Bookmark, 
  X 
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';

export const FocusSummaryModal: React.FC = () => {
  const { lastCompletedSession, dismissSummaryModal, addTask } = useMindSpace();
  const [reflectionNote, setReflectionNote] = useState('');
  const [perceivedCalm, setPerceivedCalm] = useState<number>(5);
  const [convertedItems, setConvertedItems] = useState<string[]>([]);

  if (!lastCompletedSession) return null;

  const handleConvertParkingLotItem = (text: string, id: string) => {
    addTask({
      title: text,
      categoryId: 'cat-projects',
      priority: 'P3',
      estimatedMinutes: 20,
      status: 'backlog',
      tags: ['Parked Idea']
    });
    setConvertedItems(prev => [...prev, id]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
        <button
          onClick={dismissSummaryModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-500 hover:text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
            Session Summary
          </span>
          <h3 className="text-xl font-bold text-slate-100">
            Focus Session Concluded
          </h3>
          <p className="text-xs text-slate-400">
            Every minute of intentional presence reorganizes your neural pathways.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Time Dedicated
            </span>
            <div className="text-2xl font-bold text-slate-100 mt-1">
              {lastCompletedSession.completedMinutes}m
            </div>
            <span className="text-[10px] text-emerald-400">Target was {lastCompletedSession.targetMinutes}m</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
              Return Momentum
            </span>
            <div className="text-2xl font-bold text-teal-300 mt-1">
              +5 Points
            </div>
            <span className="text-[10px] text-slate-400">Positive attention growth</span>
          </div>
        </div>

        {/* Active Task Reference */}
        <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-xs">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Task Focused On:</span>
          <div className="font-semibold text-slate-200 mt-0.5">{lastCompletedSession.taskTitle}</div>
        </div>

        {/* Distraction Parking Lot Items collected during session */}
        {lastCompletedSession.distractionParkingLot.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Captured Stray Thoughts ({lastCompletedSession.distractionParkingLot.length})</span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {lastCompletedSession.distractionParkingLot.map((item, idx) => {
                const isConverted = convertedItems.includes(item.id || String(idx));
                return (
                  <div
                    key={item.id || idx}
                    className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/70 flex items-center justify-between gap-2 text-xs"
                  >
                    <span className="text-slate-300 truncate">{item.text}</span>
                    <button
                      onClick={() => handleConvertParkingLotItem(item.text, item.id || String(idx))}
                      disabled={isConverted}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium shrink-0 transition-colors ${
                        isConverted
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                      }`}
                    >
                      {isConverted ? (
                        <span>Added to Tasks</span>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Make Task</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Perceived Calmness Rating 1-5 */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 block">
            How tranquil was your concentration? (1 = Restless, 5 = Deeply Calm)
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(score => (
              <button
                key={score}
                type="button"
                onClick={() => setPerceivedCalm(score)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  perceivedCalm === score
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={dismissSummaryModal}
          className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-950 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
