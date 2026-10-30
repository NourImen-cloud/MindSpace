import React, { useState } from 'react';
import { 
  Hourglass, 
  Play, 
  Sliders, 
  Sparkles, 
  Volume2, 
  Layers, 
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { Task } from '../../types';

export const FocusModeView: React.FC = () => {
  const { 
    tasks, 
    startFocusSession, 
    currentAmbient, 
    setAmbientSound, 
    ambientVolume, 
    setAmbientVolume,
    settings 
  } = useMindSpace();

  const [selectedDuration, setSelectedDuration] = useState<number>(settings.focusPresetMinutes || 25);
  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    tasks.find(t => t.status === 'scheduled')?.id || tasks[0]?.id || ''
  );

  const presets = [
    { label: 'Micro (15m)', value: 15, desc: 'Ultra-low friction jumpstart' },
    { label: 'Standard (25m)', value: 25, desc: 'Balanced single-task sprint' },
    { label: 'Deep (45m)', value: 45, desc: 'Unbroken analytical problem solving' },
    { label: 'Extended (60m)', value: 60, desc: 'Immersion writing & architecture' },
  ];

  const activeTask = tasks.find(t => t.id === selectedTaskId);

  const handleLaunch = () => {
    startFocusSession(activeTask, selectedDuration);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Hourglass className="w-5 h-5 text-emerald-400" />
          <span>Focus Mode & Attention Sanctuary</span>
        </h2>
        <p className="text-xs text-slate-400">
          Tailor your focus duration without rigid one-size-fits-all dogmas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Duration Presets & Custom Slider */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-400" />
              <span>Select Focus Duration</span>
            </h3>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {presets.map(p => (
                <button
                  key={p.value}
                  onClick={() => setSelectedDuration(p.value)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedDuration === p.value
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold shadow-md'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold">{p.label}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{p.desc}</div>
                </button>
              ))}
            </div>

            {/* Custom slider */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Fine-tune minutes:</span>
                <span className="font-mono text-emerald-400 font-bold">{selectedDuration} minutes</span>
              </div>
              <input
                type="range"
                min={5}
                max={90}
                step={5}
                value={selectedDuration}
                onChange={e => setSelectedDuration(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Select Anchor Task */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Choose Anchor Task for this Session</span>
            </h3>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {tasks.filter(t => t.status !== 'completed').map(task => {
                const isSelected = selectedTaskId === task.id;
                return (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-200 font-semibold'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-xs font-medium text-slate-200 truncate">{task.title}</div>
                      <div className="text-[10px] text-slate-400">{task.estimatedMinutes}m estimated</div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Ambient Soundscape & Launch button */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-teal-400" />
              <span>Synthesized Ambient Sound</span>
            </h3>
            <p className="text-xs text-slate-400">
              Generative acoustic masking to drown out distracting environments.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {(['none', 'rain', 'forest', 'brown_noise'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setAmbientSound(type)}
                  className={`p-2.5 rounded-xl border text-xs capitalize font-medium transition-all ${
                    currentAmbient === type
                      ? 'bg-teal-500/15 border-teal-500/40 text-teal-300 font-semibold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type === 'brown_noise' ? 'Warm Drone' : type === 'none' ? 'Mute' : type}
                </button>
              ))}
            </div>

            {currentAmbient !== 'none' && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Volume:</span>
                  <span className="font-mono text-teal-400">{Math.round(ambientVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={1}
                  step={0.05}
                  value={ambientVolume}
                  onChange={e => setAmbientVolume(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Launch Big Button */}
          <button
            onClick={handleLaunch}
            className="w-full py-4 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Enter Focus Sanctuary ({selectedDuration}m)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
