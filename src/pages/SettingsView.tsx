import React, { useState } from 'react';
import { ShowroomSettings } from '../types/bike';
import { MASTER_ADMIN_EMAIL, getAdminEmails } from '../utils/firebase';
import { 
  Building2, 
  Save, 
  CheckCircle2, 
  Download, 
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  User,
  Loader2,
  ChevronDown,
  Camera,
  Crown,
  Shield,
  Plus,
  Mail
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
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [logoPreviewError, setLogoPreviewError] = useState(false);
  const [managerPhotoPreviewError, setManagerPhotoPreviewError] = useState(false);
  const [logoMenuOpen, setLogoMenuOpen] = useState(false);
  const [managerMenuOpen, setManagerMenuOpen] = useState(false);

  // Admin Gmail Access Management State
  const [adminEmails, setAdminEmails] = useState<string[]>(() => getAdminEmails());
  const [newAdminEmailInput, setNewAdminEmailInput] = useState('');
  const [adminEmailError, setAdminEmailError] = useState('');

  const handleAddAdminEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminEmailError('');
    const email = newAdminEmailInput.trim().toLowerCase();
    if (!email || !email.includes('@')) {
      setAdminEmailError('সঠিক Gmail এড্রেস লিখুন');
      return;
    }
    if (adminEmails.includes(email)) {
      setAdminEmailError('এই Gmail ইতিমধ্যে অ্যাডমিন তালিকায় রয়েছে');
      return;
    }
    const updated = [...adminEmails, email];
    setAdminEmails(updated);
    try {
      localStorage.setItem('mamotors_admin_emails', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setNewAdminEmailInput('');
  };

  const handleRemoveAdminEmail = (emailToRemove: string) => {
    if (emailToRemove.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase()) {
      return; // Primary Master Admin cannot be removed
    }
    const updated = adminEmails.filter((e) => e.toLowerCase() !== emailToRemove.toLowerCase());
    setAdminEmails(updated);
    try {
      localStorage.setItem('mamotors_admin_emails', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Direct Gallery Upload for Logo
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setLogoPreviewError(false);
        setFormData((prev) => ({ ...prev, logoUrl: dataUrl }));
        setHasUnsavedChanges(true);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, logoUrl: '' }));
    setLogoPreviewError(false);
    setHasUnsavedChanges(true);
  };

  // Direct Gallery Upload for Manager Photo
  const handleManagerPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setManagerPhotoPreviewError(false);
        setFormData((prev) => ({ ...prev, managerPhotoUrl: dataUrl }));
        setHasUnsavedChanges(true);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveManagerPhoto = () => {
    setFormData((prev) => ({ ...prev, managerPhotoUrl: '' }));
    setManagerPhotoPreviewError(false);
    setHasUnsavedChanges(true);
  };

  const updateField = (field: keyof ShowroomSettings, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      onUpdateSettings(formData);
      setIsSaving(false);
      setSavedSuccess(true);
      setHasUnsavedChanges(false);
      setTimeout(() => setSavedSuccess(false), 2500);
    }, 450);
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

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 max-w-4xl mx-auto">
      {/* Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            শোরুমের তথ্য ও প্রোফাইল সেটিংস
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>Export Data</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Showroom Logo Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>Showroom Logo</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Logo Preview */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950 border-2 border-cyan-500/50 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
              {Boolean(formData.logoUrl && formData.logoUrl.trim()) && !logoPreviewError ? (
                <img
                  src={formData.logoUrl!}
                  alt="Showroom Logo"
                  onError={() => setLogoPreviewError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
                  M
                </div>
              )}
            </div>

            {/* Change Photo Dropdown Menu */}
            <div className="relative">
              <input
                type="file"
                id="settings-logo-file"
                accept="image/*"
                onChange={(e) => {
                  handleLogoFileUpload(e);
                  setLogoMenuOpen(false);
                }}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => {
                  setLogoMenuOpen(!logoMenuOpen);
                  setManagerMenuOpen(false);
                }}
                className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Change Photo</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${logoMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {logoMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setLogoMenuOpen(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-40 overflow-hidden">
                    <label
                      htmlFor="settings-logo-file"
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer transition-colors"
                    >
                      <UploadCloud className="w-4 h-4 text-cyan-400" />
                      <span>Upload</span>
                    </label>

                    {Boolean(formData.logoUrl && formData.logoUrl.trim()) && (
                      <button
                        type="button"
                        onClick={() => {
                          handleRemoveLogo();
                          setLogoMenuOpen(false);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2.5 cursor-pointer transition-colors border-t border-slate-800/80"
                      >
                        <Trash2 className="w-4 h-4 text-rose-400" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Manager Profile & Photo */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <User className="w-4 h-4 text-cyan-400" />
              <span>Manager Profile</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Manager Photo Preview */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-950 border-2 border-cyan-500/50 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
              {Boolean(formData.managerPhotoUrl && formData.managerPhotoUrl.trim()) && !managerPhotoPreviewError ? (
                <img
                  src={formData.managerPhotoUrl!}
                  alt="Manager Photo"
                  onError={() => setManagerPhotoPreviewError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md">
                  <User className="w-5 h-5 text-slate-950" />
                </div>
              )}
            </div>

            {/* Change Photo Dropdown Menu */}
            <div className="relative">
              <input
                type="file"
                id="settings-manager-photo-file"
                accept="image/*"
                onChange={(e) => {
                  handleManagerPhotoUpload(e);
                  setManagerMenuOpen(false);
                }}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => {
                  setManagerMenuOpen(!managerMenuOpen);
                  setLogoMenuOpen(false);
                }}
                className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Change Photo</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${managerMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {managerMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setManagerMenuOpen(false)} 
                  />
                  <div className="absolute left-0 mt-2 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-1 z-40 overflow-hidden">
                    <label
                      htmlFor="settings-manager-photo-file"
                      className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 flex items-center gap-2.5 cursor-pointer transition-colors"
                    >
                      <UploadCloud className="w-4 h-4 text-cyan-400" />
                      <span>Upload</span>
                    </label>

                    {Boolean(formData.managerPhotoUrl && formData.managerPhotoUrl.trim()) && (
                      <button
                        type="button"
                        onClick={() => {
                          handleRemoveManagerPhoto();
                          setManagerMenuOpen(false);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2.5 cursor-pointer transition-colors border-t border-slate-800/80"
                      >
                        <Trash2 className="w-4 h-4 text-rose-400" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">ম্যানেজারের নাম *</label>
              <input
                type="text"
                required
                value={formData.managerName}
                onChange={(e) => updateField('managerName', e.target.value)}
                placeholder="Saddam Hossain"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-semibold focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">মোবাইল নম্বর *</label>
              <input
                type="text"
                required
                value={formData.managerContact || ''}
                onChange={(e) => updateField('managerContact', e.target.value)}
                placeholder="+880 1739-840603"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-semibold focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: General Showroom Information */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Showroom Details</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">শোরুমের নাম *</label>
              <input
                type="text"
                required
                value={formData.showroomName}
                onChange={(e) => updateField('showroomName', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500 font-semibold"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">হটলাইন / মোবাইল নম্বর *</label>
              <input
                type="text"
                required
                value={formData.hotline}
                onChange={(e) => updateField('hotline', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-slate-400 block mb-1">ঠিকানা *</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-slate-400 block mb-1">সময়সূচি (Opening Hours)</label>
              <input
                type="text"
                value={formData.openingHours}
                onChange={(e) => updateField('openingHours', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
              savedSuccess 
                ? 'bg-emerald-500 text-slate-950'
                : hasUnsavedChanges
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/25 active:scale-95'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>সংরক্ষণ হচ্ছে...</span>
              </>
            ) : savedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>সংরক্ষিত হয়েছে!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>তথ্য সংরক্ষণ করুন</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
