import React, { useState } from 'react';
import { ShowroomSettings } from '../types/bike';
import { 
  Building2, 
  Save, 
  CheckCircle2, 
  Download, 
  Image as ImageIcon,
  ExternalLink,
  UploadCloud,
  Trash2,
  User,
  RotateCcw
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
  const [managerPhotoPreviewError, setManagerPhotoPreviewError] = useState(false);

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setLogoPreviewError(false);
        const updated = { ...formData, logoUrl: dataUrl };
        setFormData(updated);
        onUpdateSettings(updated);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveLogo = () => {
    setLogoPreviewError(false);
    const updated = { ...formData, logoUrl: '' };
    setFormData(updated);
    onUpdateSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleManagerPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setManagerPhotoPreviewError(false);
        const updated = { ...formData, managerPhotoUrl: dataUrl };
        setFormData(updated);
        onUpdateSettings(updated);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveManagerPhoto = () => {
    setManagerPhotoPreviewError(false);
    const updated = { ...formData, managerPhotoUrl: '' };
    setFormData(updated);
    onUpdateSettings(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>Showroom Logo (শোরুমের লোগো)</span>
            </div>
            {Boolean(formData.logoUrl && formData.logoUrl.trim()) && (
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>লোগো মুছে ফেলুন</span>
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {/* Logo Preview */}
            <div className="w-24 h-24 rounded-2xl bg-slate-950 border-2 border-cyan-500/40 flex items-center justify-center overflow-hidden shrink-0 shadow-lg relative group">
              {Boolean(formData.logoUrl && formData.logoUrl.trim()) && !logoPreviewError ? (
                <>
                  <img
                    src={formData.logoUrl!}
                    alt="Showroom Logo Preview"
                    onError={() => setLogoPreviewError(true)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] text-white font-mono bg-slate-950/80 px-2 py-0.5 rounded">Active</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-md mx-auto">
                    M
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Default Logo</div>
                </div>
              )}
            </div>

            {/* Upload Controls & URL input */}
            <div className="flex-1 space-y-3 text-xs w-full">
              {/* Direct Gallery / Device Upload Button */}
              <div className="flex flex-wrap gap-2.5">
                <input
                  type="file"
                  id="settings-logo-file"
                  accept="image/*"
                  onChange={handleLogoFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="settings-logo-file"
                  className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>গ্যালারি থেকে লোগো সিলেক্ট করুন (Choose from Gallery)</span>
                </label>
              </div>

              {/* Or Web Link URL */}
              <div className="space-y-1 pt-1">
                <label className="text-slate-400 block font-medium">
                  অথবা ছবির ওয়েব লিঙ্ক / Google Photos URL পেস্ট করুন:
                </label>
                <input
                  type="url"
                  value={formData.logoUrl || ''}
                  onChange={(e) => {
                    setLogoPreviewError(false);
                    setFormData({ ...formData, logoUrl: e.target.value });
                  }}
                  placeholder="https://lh3.googleusercontent.com/... or image link"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                ✓ নির্বাচিত লোগোটি সাইডবার, হেডার (উপরের বার), এবং সেলস মেমো/চালানে তাৎক্ষণিকভাবে সংরক্ষিত হয়ে প্রদর্শিত হবে।
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Business Identity */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3.5">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Showroom Profile (শোরুমের বিবরণ)</span>
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
              <label className="text-slate-400 block mb-1">Showroom Contact No (Hotline) *</label>
              <input
                type="text"
                required
                value={formData.hotline}
                onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">WhatsApp *</label>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Showroom Address *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Business Hours</label>
              <input
                type="text"
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Manager Profile & Photo */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Manager Profile (ম্যানেজারের তথ্য ও ছবি)</span>
            </div>
            {Boolean(formData.managerPhotoUrl && formData.managerPhotoUrl.trim()) && (
              <button
                type="button"
                onClick={handleRemoveManagerPhoto}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ছবি মুছে ফেলুন</span>
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {/* Manager Photo Preview */}
            <div className="w-24 h-24 rounded-2xl bg-slate-950 border-2 border-cyan-500/40 flex items-center justify-center overflow-hidden shrink-0 shadow-lg relative group">
              {Boolean(formData.managerPhotoUrl && formData.managerPhotoUrl.trim()) && !managerPhotoPreviewError ? (
                <>
                  <img
                    src={formData.managerPhotoUrl!}
                    alt="Manager Photo"
                    onError={() => setManagerPhotoPreviewError(true)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] text-white font-mono bg-slate-950/80 px-2 py-0.5 rounded">Active</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md mx-auto">
                    <User className="w-6 h-6 text-slate-950" />
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">No Photo</div>
                </div>
              )}
            </div>

            {/* Manager Photo Upload & Name/Contact Fields */}
            <div className="flex-1 space-y-3 text-xs w-full">
              <div className="flex flex-wrap gap-2.5">
                <input
                  type="file"
                  id="settings-manager-photo-file"
                  accept="image/*"
                  onChange={handleManagerPhotoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="settings-manager-photo-file"
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>গ্যালারি থেকে ম্যানেজারের ছবি আপলোড করুন</span>
                </label>
              </div>

              {/* Optional Photo URL */}
              <div className="space-y-1">
                <label className="text-slate-400 block font-medium">
                  অথবা ম্যানেজারের ছবির ওয়েব লিঙ্ক পেস্ট করুন:
                </label>
                <input
                  type="url"
                  value={formData.managerPhotoUrl || ''}
                  onChange={(e) => {
                    setManagerPhotoPreviewError(false);
                    setFormData({ ...formData, managerPhotoUrl: e.target.value });
                  }}
                  placeholder="https://example.com/manager-photo.jpg"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-slate-400 block mb-1">ম্যানেজারের নাম (Manager Name) *</label>
                  <input
                    type="text"
                    required
                    value={formData.managerName}
                    onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
                    placeholder="Saddam Hossain"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-semibold focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">ম্যানেজারের মোবাইল নম্বর (Manager Contact) *</label>
                  <input
                    type="text"
                    required
                    value={formData.managerContact || ''}
                    onChange={(e) => setFormData({ ...formData, managerContact: e.target.value })}
                    placeholder="+880 1739-840603"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
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
