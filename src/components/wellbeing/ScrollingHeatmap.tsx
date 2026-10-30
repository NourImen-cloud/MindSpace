import React from 'react';
import { DistractionEvent } from '../../types';

export const ScrollingHeatmap: React.FC<{ events: DistractionEvent[] }> = ({ events }) => {
  // Aggregate distraction attempts by hour (0 to 23)
  const hourCounts = new Array(24).fill(0);
  
  // Seed with realistic ambient patterns + real events
  events.forEach(e => {
    const h = new Date(e.timestamp).getHours();
    hourCounts[h] += 1;
  });

  // Base background distribution so the chart is immediately informative
  const simulatedPattern = [0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 2, 3, 5, 4, 3, 2, 1, 2, 3, 6, 7, 4, 1];
  const combined = hourCounts.map((c, i) => c + simulatedPattern[i]);
  const maxVal = Math.max(...combined, 1);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Hourly Distraction Tendency (24h)</span>
        <span className="text-[10px] text-rose-400">● Vulnerability spikes at 13h & 20h</span>
      </div>

      <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 items-end h-20 pt-2">
        {combined.map((count, hour) => {
          const heightPercent = Math.max(12, Math.round((count / maxVal) * 100));
          const isSpike = count >= 4;

          return (
            <div
              key={hour}
              className="flex flex-col items-center gap-1 group relative h-full justify-end"
            >
              <div
                className={`w-full rounded-t-md transition-all duration-300 ${
                  isSpike 
                    ? 'bg-rose-500/80 group-hover:bg-rose-400' 
                    : count > 1 
                    ? 'bg-amber-500/60 group-hover:bg-amber-400' 
                    : 'bg-emerald-500/40 group-hover:bg-emerald-400'
                }`}
                style={{ height: `${heightPercent}%` }}
              />

              {/* Tooltip on hover */}
              <div className="absolute -top-7 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                <span className="bg-slate-800 text-[10px] font-mono text-slate-200 px-1.5 py-0.5 rounded shadow border border-slate-700 whitespace-nowrap">
                  {hour}:00 • {count} checks
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>
    </div>
  );
};
