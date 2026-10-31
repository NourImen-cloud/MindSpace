import React from 'react';
import { DistractionEvent } from '../../types';

export const ScrollingHeatmap: React.FC<{ events: DistractionEvent[] }> = ({ events }) => {
  const hourCounts = new Array(24).fill(0);
  
  events.forEach(e => {
    const h = new Date(e.timestamp).getHours();
    hourCounts[h] += 1;
  });

  const simulatedPattern = [0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 2, 3, 5, 4, 3, 2, 1, 2, 3, 6, 7, 4, 1];
  const combined = hourCounts.map((c, i) => c + simulatedPattern[i]);
  const maxVal = Math.max(...combined, 1);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Hourly Phone Reaching / Scrolling Impulse</span>
        <span className="text-[11px] font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
          Vulnerability window: 1:30 PM & 8:30 PM
        </span>
      </div>

      <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 items-end h-20 pt-2 px-1">
        {combined.map((count, hour) => {
          const heightPercent = Math.max(14, Math.round((count / maxVal) * 100));
          const isSpike = count >= 4;

          return (
            <div
              key={hour}
              className="flex flex-col items-center gap-1 group relative h-full justify-end"
            >
              <div
                className={`w-full rounded-full transition-all duration-300 ${
                  isSpike 
                    ? 'bg-gradient-to-t from-pink-500 to-rose-400 group-hover:brightness-110 shadow-xs' 
                    : count > 1 
                    ? 'bg-gradient-to-t from-purple-500 to-indigo-400 group-hover:brightness-110' 
                    : 'bg-purple-200 group-hover:bg-purple-300'
                }`}
                style={{ height: `${heightPercent}%` }}
              />

              {/* Tooltip on hover */}
              <div className="absolute -top-7 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                <span className="bg-purple-950 text-[10px] font-mono text-purple-100 px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                  {hour}:00 • {count} checks
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>
    </div>
  );
};
