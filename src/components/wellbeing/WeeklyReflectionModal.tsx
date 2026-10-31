import React, { useState } from 'react';
import { 
  BookHeart, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  History, 
  FileText,
  Heart
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';
import { MindSpaceAIEngine } from '../../utils/aiEngine';

export const WeeklyReflectionModal: React.FC = () => {
  const { 
    reflections, 
    addReflection, 
    momentum, 
    tasks 
  } = useMindSpace();

  const [wins, setWins] = useState('');
  const [distractionsFaced, setDistractionsFaced] = useState('');
  const [triggers, setTriggers] = useState('');
  const [adjustments, setAdjustments] = useState('');
  const [rating, setRating] = useState<number>(8);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;

  const handleGenerateReport = () => {
    const report = MindSpaceAIEngine.generateWeeklyReport(
      reflections,
      momentum.totalReturns,
      momentum.screenTimeSavedMinutes,
      completedTasksCount
    );
    setGeneratedReport(report);
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wins.trim() && !adjustments.trim()) return;

    addReflection({
      weekStartDate: new Date().toISOString().split('T')[0],
      winsAndHighlights: wins.trim(),
      mainDistractionsFaced: distractionsFaced.trim(),
      recurringTriggers: triggers.split(',').map(s => s.trim()).filter(Boolean),
      adjustmentsForNextWeek: adjustments.trim(),
      mindfulnessRating: rating
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    setWins('');
    setDistractionsFaced('');
    setTriggers('');
    setAdjustments('');
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Quicksand',sans-serif] flex items-center gap-2">
            <BookHeart className="w-6 h-6 text-pink-500" />
            <span>Weekly Reflection Journal</span>
          </h2>
          <p className="text-xs text-purple-600/80 font-medium">
            Pause once a week to celebrate study wins and recalibrate routines with kindness.
          </p>
        </div>

        <button
          onClick={handleGenerateReport}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-black text-xs shadow-md shadow-purple-200 transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Generate AI Weekly Report</span>
        </button>
      </div>

      {/* Generated Report */}
      {generatedReport && (
        <div className="p-5 sm:p-6 rounded-[28px] bg-purple-50 border border-purple-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-purple-800 font-black text-sm">
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Personalized Weekly Attention Report 🌸</span>
            </div>
            <button
              onClick={() => setGeneratedReport(null)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700"
            >
              Dismiss
            </button>
          </div>
          <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans bg-white p-4 rounded-2xl border border-purple-100 font-medium">
            {generatedReport}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSaveReflection} className="p-5 sm:p-6 rounded-[30px] bg-white border border-purple-100 shadow-[0_8px_30px_rgba(139,92,246,0.04)] space-y-4">
        <h3 className="text-sm font-extrabold text-slate-800">
          Guided Reflection Prompts
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              1. What went well this week? (Study milestones & wins)
            </label>
            <textarea
              rows={3}
              placeholder="Finished Mathematics exercise set 1, completed biology notes..."
              value={wins}
              onChange={e => setWins(e.target.value)}
              className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              2. What distracted you most frequently?
            </label>
            <textarea
              rows={3}
              placeholder="Instagram explore feed when tired at 2:00 PM..."
              value={distractionsFaced}
              onChange={e => setDistractionsFaced(e.target.value)}
              className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              3. Recurring triggers identified (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Afternoon dip, Complex physics problem, Fatigue"
              value={triggers}
              onChange={e => setTriggers(e.target.value)}
              className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">
              4. One small adjustment to test next week
            </label>
            <input
              type="text"
              placeholder="e.g. Make warm tea and do 5-min stretch before checking phone"
              value={adjustments}
              onChange={e => setAdjustments(e.target.value)}
              className="w-full bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-medium"
            />
          </div>
        </div>

        {/* Rating Slider */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-xs font-bold text-slate-600">
            <span>Overall Study Calmness & Mindful Attention:</span>
            <span className="text-purple-700 font-black">{rating} / 10 🌸</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Saved to reflection archives!</span>
            </span>
          ) : <div />}

          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 text-white font-black text-xs shadow-md shadow-purple-200 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Reflection</span>
          </button>
        </div>
      </form>

      {/* Archives */}
      {reflections.length > 0 && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-purple-600" />
            <span>Past Weekly Reviews</span>
          </h4>
          <div className="space-y-2">
            {reflections.map(r => (
              <div
                key={r.id}
                className="p-4 rounded-[22px] bg-white border border-purple-100 space-y-1.5 text-xs shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-800">Week of {r.weekStartDate}</span>
                  <span className="text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                    Rating: {r.mindfulnessRating}/10
                  </span>
                </div>
                {r.winsAndHighlights && (
                  <p className="text-slate-600"><strong>Wins:</strong> {r.winsAndHighlights}</p>
                )}
                {r.adjustmentsForNextWeek && (
                  <p className="text-purple-700 font-medium"><strong>Next step:</strong> {r.adjustmentsForNextWeek}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
