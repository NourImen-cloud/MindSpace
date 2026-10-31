import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Bookmark, 
  X,
  Heart
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { CuteKittenMascot } from '../common/AestheticAssets';

export const FocusSummaryModal: React.FC = () => {
  const { lastCompletedSession, dismissSummaryModal, addTask } = useMindSpace();
  const [perceivedCalm, setPerceivedCalm] = useState<number>(5);
  const [convertedItems, setConvertedItems] = useState<string[]>([]);

  if (!lastCompletedSession) return null;

  const handleConvertParkingLotItem = (text: string, id: string) => {
    addTask({
      title: text,
      categoryId: 'cat-math',
      priority: 'P3',
      estimatedMinutes: 20,
      status: 'backlog',
      tags: ['Parked Idea']
    });
    setConvertedItems(prev => [...prev, id]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-purple-950/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-purple-100 rounded-[36px] p-6 sm:p-8 space-y-4 shadow-2xl relative">
        <button
          onClick={dismissSummaryModal}
          className="absolute top-5 right-5 p-2 rounded-2xl text-slate-400 hover:text-purple-600 hover:bg-purple-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1">
          <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-600 mx-auto flex items-center justify-center mb-1">
            <CuteKittenMascot className="w-12 h-12" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full">
            Session Summary
          </span>
          <h3 className="text-xl font-black text-slate-800 font-['Quicksand',sans-serif]">
            Amazing Focus, Aiko! 🌸
          </h3>
          <p className="text-xs text-purple-700 font-medium">
            Every minute of intentional presence trains your mind and builds momentum.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 text-center">
            <span className="text-[10px] text-purple-700 uppercase tracking-wider block font-bold">
              Time Dedicated
            </span>
            <div className="text-2xl font-black text-slate-800 mt-1">
              {lastCompletedSession.completedMinutes}m
            </div>
            <span className="text-[10px] text-purple-600 font-semibold">Goal was {lastCompletedSession.targetMinutes}m</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-pink-50/70 border border-pink-100 text-center">
            <span className="text-[10px] text-pink-700 uppercase tracking-wider block font-bold">
              Return Momentum
            </span>
            <div className="text-2xl font-black text-pink-600 mt-1">
              +5 Points
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Attention resilience growth</span>
          </div>
        </div>

        {/* Task Reference */}
        <div className="p-3 rounded-2xl bg-[#FAF7FD] border border-purple-100 text-xs">
          <span className="text-[10px] text-purple-600 uppercase font-bold">Task Focused On:</span>
          <div className="font-extrabold text-slate-800 mt-0.5">{lastCompletedSession.taskTitle}</div>
        </div>

        {/* Distraction Parking Lot Items */}
        {lastCompletedSession.distractionParkingLot.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Captured Stray Thoughts ({lastCompletedSession.distractionParkingLot.length})</span>
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {lastCompletedSession.distractionParkingLot.map((item, idx) => {
                const isConverted = convertedItems.includes(item.id || String(idx));
                return (
                  <div
                    key={item.id || idx}
                    className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 flex items-center justify-between gap-2 text-xs"
                  >
                    <span className="text-slate-700 truncate font-medium">{item.text}</span>
                    <button
                      onClick={() => handleConvertParkingLotItem(item.text, item.id || String(idx))}
                      disabled={isConverted}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-bold shrink-0 transition-colors ${
                        isConverted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-purple-600 text-white hover:bg-purple-500'
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
          <label className="text-xs font-bold text-slate-600 block">
            How tranquil was your concentration? (1 = Restless, 5 = Deeply Peaceful)
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map(score => (
              <button
                key={score}
                type="button"
                onClick={() => setPerceivedCalm(score)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-black border transition-all ${
                  perceivedCalm === score
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-white text-slate-600 border-purple-100 hover:bg-purple-50'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={dismissSummaryModal}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-black text-xs shadow-md shadow-purple-200 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};
