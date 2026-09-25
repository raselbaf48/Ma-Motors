import React, { useState } from 'react';
import { ShowroomSettings } from '../types/bike';
import { 
  Building2, 
  Save, 
  CheckCircle2, 
  Download, 
  RotateCcw,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';

interface SettingsViewProps {
  settings: ShowroomSettings;
  onUpdateSettings: (newSettings: ShowroomSettings) => void;
  onResetDemoData: () => void;
  bikesCount: number;
  purchasesCount: number;
  salesCount: number;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onResetDemoData,
  bikesCount,
  purchasesCount,
  salesCount
}) => {
  const [formData, setFormData] = useState<ShowroomSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [logoPreviewError, setLogoPreviewError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportData = () => {
    const exportObj = {
      timestamp: new Date().toISOString(),
      showroom: formData,
      stats: {
        bikesCount,
        purchasesCount,
        salesCount
      }
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ma_motors_settings_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleReset = () => {
    onResetDemoData();
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Showroom profile, Google Photos logo, and contact info
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Export Data (JSON)</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {resetSuccess && (
        <div className="p-3 bg-cyan-950/80 border border-cyan-500/40 rounded-xl text-cyan-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Data reset to initial state.</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Showroom Logo Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3.5">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ImageIcon className="w-4 h-4 text-cyan-400" />
            <span>Showroom Logo (Google Photos / Web Link)</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {/* Logo Preview */}
            <div className="w-20 h-20 rounded-2xl bg-slate-950 border-2 border-slate-800 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
              {formData.logoUrl && !logoPreviewError ? (
                <img
                  src={formData.logoUrl}
                  alt="Showroom Logo Preview"
                  onError={() => setLogoPreviewError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-2">
                  <div className="text-slate-600 font-bold text-xl">M</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">No Logo</div>
                </div>
              )}
            </div>

            {/* Input field */}
            <div className="flex-1 space-y-2 text-xs w-full">
              <label className="text-slate-300 block font-medium">
                Logo Image Link / Google Photos URL
              </label>
              <input
                type="url"
                value={formData.logoUrl || ''}
                onChange={(e) => {
                  setLogoPreviewError(false);
                  setFormData({ ...formData, logoUrl: e.target.value });
                }}
                placeholder="https://lh3.googleusercontent.com/... or Google Photos share link"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Paste your Google Photos link or any public image URL. This logo will be displayed on the Sidebar, Header, and Sales Invoices.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Business Identity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3.5">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Showroom Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Showroom Name *</label>
              <input
                type="text"
                required
                value={formData.showroomName}
                onChange={(e) => setFormData({ ...formData, showroomName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-semibold focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Hotline *</label>
              <input
                type="text"
                required
                value={formData.hotline}
                onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">WhatsApp</label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-slate-400 block mb-1">Showroom Address *</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Business Hours</label>
              <input
                type="text"
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Manager / Contact Person</label>
              <input
                type="text"
                value={formData.managerName}
                onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="submit"
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow transition-colors flex items-center gap-1.5 text-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
