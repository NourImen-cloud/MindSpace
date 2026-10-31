import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  HardDrive, 
  ShieldCheck, 
  Download, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  Lock,
  Sparkles 
} from 'lucide-react';
import { useMindSpace } from '../../store/MindSpaceContext';

export const SettingsView: React.FC = () => {
  const { 
    settings, 
    updateSettings, 
    exportDatabase, 
    importDatabase, 
    resetAllData 
  } = useMindSpace();

  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleDownloadBackup = () => {
    const jsonStr = exportDatabase();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindspace-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importDatabase(importJsonText);
    if (success) {
      setImportStatus('Successfully restored MindSpace database!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Failed to import: Invalid JSON format.');
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Quicksand',sans-serif] flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-purple-600" />
          <span>Settings & Local-First Privacy 🌸</span>
        </h2>
        <p className="text-xs text-purple-600/80 font-medium">
          Your study habits and data belong to you. Stored locally on this device by default.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Section 1: Device Pairing & Local-First */}
        <div className="p-6 rounded-[30px] bg-white border border-purple-100 shadow-[0_8px_30px_rgba(139,92,246,0.04)] space-y-4">
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-purple-600" />
            <span>Local-First Sync Protocol</span>
          </h3>

          <div className="p-3.5 rounded-2xl bg-[#FAF7FD] border border-purple-100 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Device Pairing Code</span>
              <span className="font-mono text-purple-700 font-black bg-white px-2.5 py-0.5 rounded-lg border border-purple-200">
                {settings.deviceSyncId}
              </span>
            </div>
            <p className="text-slate-500 text-[11px] font-medium leading-relaxed">
              Pair your phone with your desktop for seamless cross-device synchronization without cloud intermediaries.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Optional Encrypted Cloud Sync</div>
                <div className="text-[11px] text-slate-500 font-medium">End-to-end encrypted backup</div>
              </div>
              <button
                onClick={() => updateSettings({ cloudSyncEnabled: !settings.cloudSyncEnabled })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.cloudSyncEnabled ? 'bg-purple-600' : 'bg-slate-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.cloudSyncEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Local-Only Isolation Mode</div>
                <div className="text-[11px] text-slate-500 font-medium">Zero external internet requests</div>
              </div>
              <button
                onClick={() => updateSettings({ localOnlyMode: !settings.localOnlyMode })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.localOnlyMode ? 'bg-purple-600' : 'bg-slate-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.localOnlyMode ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Monitoring & Anti-Scroll Controls */}
        <div className="p-6 rounded-[30px] bg-white border border-purple-100 shadow-[0_8px_30px_rgba(139,92,246,0.04)] space-y-4">
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-pink-500" />
            <span>Anti-Scrolling & Chime Controls</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Intentional Pause Interceptor</div>
                <div className="text-[11px] text-slate-500 font-medium">Breathing pause before social media</div>
              </div>
              <button
                onClick={() => updateSettings({ enableIntentionalPause: !settings.enableIntentionalPause })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.enableIntentionalPause ? 'bg-purple-600' : 'bg-slate-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.enableIntentionalPause ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Strict Lockout Enforcement</div>
                <div className="text-[11px] text-slate-500 font-medium">Hard cooldown when daily limit is hit</div>
              </div>
              <button
                onClick={() => updateSettings({ enableStrictBlocking: !settings.enableStrictBlocking })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.enableStrictBlocking ? 'bg-purple-600' : 'bg-slate-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.enableStrictBlocking ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Tibetan Bowl & Mindfulness Chimes</div>
                <div className="text-[11px] text-slate-500 font-medium">Acoustic chime on session completion</div>
              </div>
              <button
                onClick={() => updateSettings({ enableSoundEffects: !settings.enableSoundEffects })}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  settings.enableSoundEffects ? 'bg-purple-600' : 'bg-slate-200'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.enableSoundEffects ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backup & Portability */}
      <div className="p-6 rounded-[30px] bg-white border border-purple-100 shadow-[0_8px_30px_rgba(139,92,246,0.04)] space-y-4">
        <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
          <Download className="w-4 h-4 text-purple-600" />
          <span>Local Data Portability (Export & Restore)</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <button
            onClick={handleDownloadBackup}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-md shadow-purple-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON Backup</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">
            Export all subjects, tasks, distraction logs, and reflections anytime.
          </span>
        </div>

        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-slate-600 block">
            Paste JSON Backup to Restore:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste JSON here..."
              value={importJsonText}
              onChange={e => setImportJsonText(e.target.value)}
              className="flex-1 bg-[#FAF7FD] border border-purple-200 rounded-2xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-600 font-medium"
            />
            <button
              onClick={handleImport}
              className="px-4 py-2 rounded-2xl bg-white border border-purple-200 text-xs font-bold text-purple-700 hover:bg-purple-50"
            >
              Restore
            </button>
          </div>
          {importStatus && <p className="text-xs text-emerald-600 font-bold">{importStatus}</p>}
        </div>

        {/* Reset */}
        <div className="pt-3 border-t border-purple-50 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-rose-600">Reset Local Database</div>
            <div className="text-[11px] text-slate-400 font-medium">Reverts to initial study demo data</div>
          </div>

          {showConfirmReset ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetAllData();
                  setShowConfirmReset(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                Yes, Reset Everything
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold"
            >
              Reset Data
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
