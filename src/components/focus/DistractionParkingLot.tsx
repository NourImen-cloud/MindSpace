import React, { useState } from 'react';
import { BookmarkPlus, ListOrdered, Check } from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';

export const DistractionParkingLot: React.FC = () => {
  const { activeFocusSession, addParkingLotItem } = useMindSpace();
  const [inputText, setInputText] = useState('');

  if (!activeFocusSession) return null;

  const items = activeFocusSession.distractionParkingLot || [];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    addParkingLotItem(inputText);
    setInputText('');
  };

  return (
    <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-3 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <BookmarkPlus className="w-4 h-4 text-amber-400" />
          <span>Distraction Parking Lot</span>
        </div>
        <span className="text-[10px] text-slate-400">
          Capture thoughts; keep flowing
        </span>
      </div>

      {/* Quick Input (Press Enter to Park) */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          placeholder="Unrelated thought? Dump it here & press Enter..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="flex-1 bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-colors"
        >
          Park
        </button>
      </form>

      {/* List of parked thoughts */}
      {items.length > 0 && (
        <div className="max-h-32 overflow-y-auto space-y-1.5 pt-1">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/40 text-[11px] text-slate-300 flex items-start justify-between gap-2"
            >
              <span>• {item.text}</span>
              <span className="text-[9px] text-slate-400 shrink-0 font-mono">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
