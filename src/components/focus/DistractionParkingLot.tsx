import React, { useState } from 'react';
import { BookmarkPlus, Sparkles } from 'lucide-react';
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
    <div className="w-full max-w-md mx-auto bg-white border border-purple-100 rounded-[28px] p-4 sm:p-5 space-y-3 shadow-lg shadow-purple-100/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-black text-slate-800">
          <BookmarkPlus className="w-4 h-4 text-amber-500" />
          <span>Distraction Parking Lot ✨</span>
        </div>
        <span className="text-[10px] text-purple-600 font-bold">
          Dump stray thoughts; keep flowing
        </span>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          placeholder="Unrelated thought? Park it here & press Enter..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="flex-1 bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3.5 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 font-medium"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white rounded-2xl text-xs font-black shadow-xs transition-all active:scale-95"
        >
          Park
        </button>
      </form>

      {items.length > 0 && (
        <div className="max-h-32 overflow-y-auto space-y-1.5 pt-1">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100 text-[11px] text-slate-700 font-medium flex items-start justify-between gap-2"
            >
              <span>• {item.text}</span>
              <span className="text-[9px] text-purple-600 font-bold shrink-0 font-mono">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
