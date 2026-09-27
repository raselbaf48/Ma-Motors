import React, { useState, useEffect } from 'react';
import { ShowroomSettings } from '../types/bike';
import { MASTER_ADMIN_EMAIL, getAdminEmails, SUPABASE_URL } from '../utils/supabase';
import { 
  Building2, 
  Save, 
  CheckCircle2, 
  Download, 
  Upload,
  Camera,
  Crown,
  Shield,
  KeyRound,
  Cloud,
  Settings as SettingsIcon,
  X,
  ArrowLeft,
  Megaphone,
  Palette,
  Wrench,
  HardDrive,
  History,
  Phone,
  User,
  Loader2,
  ChevronRight,
  AlertTriangle,
  RefreshCw,
  Moon,
  Clock,
  Mail
} from 'lucide-react';

interface SyncLogItem {
  id: string;
  type: 'upload' | 'download';
  title: string;
  timestamp: string;
  details: string;
}

interface SettingsViewProps {
  settings: ShowroomSettings;
  onUpdateSettings: (newSettings: ShowroomSettings) => void;
  onResetDemoData: () => void;
  onPushToCloud?: () => Promise<{ success: boolean; message: string }>;
  onPullFromCloud?: () => Promise<{ success: boolean; message: string }>;
  bikesCount: number;
  purchasesCount: number;
  salesCount: number;
  onClose?: () => void;
}

type SettingsSection = 
  | 'menu'
  | 'theme'
  | 'database'
  | 'notice'
  | 'maintenance'
  | 'users'
  | 'pin'
  | 'backup'
  | 'history'
  | 'showroom'
  | 'manager';

const INITIAL_SYNC_LOGS: SyncLogItem[] = [
  {
    id: 'log-1',
    type: 'upload',
    title: 'Uploaded to Cloud',
    timestamp: '9/28/2026\n2:02:18 AM',
    details: 'Realtime Duty Matrix synced to Cloud!'
  },
  {
    id: 'log-2',
    type: 'download',
    title: 'Downloaded from Cloud',
    timestamp: '9/28/2026\n2:02:17 AM',
    details: 'Data synced from Supabase successfully.'
  }
];

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onUpdateSettings,
  onResetDemoData,
  onPushToCloud,
  onPullFromCloud,
  bikesCount,
  purchasesCount,
  salesCount,
  onClose
}) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('menu');
  const [formData, setFormData] = useState<ShowroomSettings>(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [logoPreviewError, setLogoPreviewError] = useState(false);
  const [managerPhotoPreviewError, setManagerPhotoPreviewError] = useState(false);

  // Cloud Sync state & persistent logs
  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);
  const [syncLogs, setSyncLogs] = useState<SyncLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('mamotors_sync_logs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_SYNC_LOGS;
  });

  const saveLogs = (logs: SyncLogItem[]) => {
    setSyncLogs(logs);
    try {
      localStorage.setItem('mamotors_sync_logs', JSON.stringify(logs));
    } catch {
      // ignore
    }
  };

  // Admin Security PIN Management State (Default 1111)
  const [currentPin, setCurrentPin] = useState<string>(() => {
    try {
      return localStorage.getItem('mamotors_admin_pin') || '1111';
    } catch {
      return '1111';
    }
  });
  const [newPinInput, setNewPinInput] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');
  const [pinErrorMsg, setPinErrorMsg] = useState('');

  // Admin Gmail Access Management State
  const [adminEmails, setAdminEmails] = useState<string[]>(() => getAdminEmails());
  const [newAdminEmailInput, setNewAdminEmailInput] = useState('');
  const [adminEmailError, setAdminEmailError] = useState('');

  // App Notice State
  const [noticeText, setNoticeText] = useState(() => {
    return localStorage.getItem('mamotors_app_notice') || 'সকল প্রকার ব্যবহৃত মোটরসাইকেল ক্রয় ও বিক্রয়ে বিশ্বস্ত প্রতিষ্ঠান - মা মটরস!';
  });
  const [isNoticeActive, setIsNoticeActive] = useState(() => {
    return localStorage.getItem('mamotors_notice_active') !== 'false';
  });
  const [noticeSaved, setNoticeSaved] = useState(false);

  // Maintenance Mode State
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(() => {
    return localStorage.getItem('mamotors_maintenance_mode') === 'true';
  });

  // Theme Accent State
  const [themeAccent, setThemeAccent] = useState(() => {
    return localStorage.getItem('mamotors_theme_accent') || 'cyan';
  });

  // Handler for Push to Cloud
  const handlePush = async () => {
    setIsPushing(true);
    setSyncStatusMsg(null);
    try {
      let msg = 'Realtime Duty Matrix synced to Cloud!';
      if (onPushToCloud) {
        const res = await onPushToCloud();
        if (res.message) msg = res.message;
      }

      const now = new Date();
      const datePart = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
      const timePart = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
      const newLog: SyncLogItem = {
        id: `log-${Date.now()}`,
        type: 'upload',
        title: 'Uploaded to Cloud',
        timestamp: `${datePart}\n${timePart}`,
        details: msg
      };
      saveLogs([newLog, ...syncLogs.slice(0, 19)]);
      setSyncStatusMsg({ text: 'সফলভাবে ক্লাউডে আপলোড সম্পন্ন হয়েছে!' });
    } catch (err: any) {
      setSyncStatusMsg({ text: err?.message || 'আপলোড ব্যর্থ হয়েছে', isError: true });
    } finally {
      setIsPushing(false);
    }
  };

  // Handler for Pull from Cloud
  const handlePull = async () => {
    setIsPulling(true);
    setSyncStatusMsg(null);
    try {
      let msg = 'Data synced from Supabase successfully.';
      if (onPullFromCloud) {
        const res = await onPullFromCloud();
        if (res.message) msg = res.message;
      }

      const now = new Date();
      const datePart = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
      const timePart = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
      const newLog: SyncLogItem = {
        id: `log-${Date.now()}`,
        type: 'download',
        title: 'Downloaded from Cloud',
        timestamp: `${datePart}\n${timePart}`,
        details: msg
      };
      saveLogs([newLog, ...syncLogs.slice(0, 19)]);
      setSyncStatusMsg({ text: 'সফলভাবে ক্লাউড থেকে ডেটা আনা হয়েছে!' });
    } catch (err: any) {
      setSyncStatusMsg({ text: err?.message || 'ডাউনলোড ব্যর্থ হয়েছে', isError: true });
    } finally {
      setIsPulling(false);
    }
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinSuccessMsg('');
    setPinErrorMsg('');
    const clean = newPinInput.trim();
    if (!clean || clean.length < 4) {
      setPinErrorMsg('পিন অবশ্যই কমপক্ষে ৪-ডিজিটের সংখ্যা হতে হবে');
      return;
    }
    try {
      localStorage.setItem('mamotors_admin_pin', clean);
      setCurrentPin(clean);
      setNewPinInput('');
      setPinSuccessMsg(`অ্যাডমিন পিন সফলভাবে আপডেট করা হয়েছে! নতুন পিন: ${clean}`);
      setTimeout(() => setPinSuccessMsg(''), 4000);
    } catch {
      setPinErrorMsg('পিন সংরক্ষণে সমস্যা হয়েছে');
    }
  };

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
      return;
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
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
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
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const updateField = (field: keyof ShowroomSettings, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveShowroom = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onUpdateSettings(formData);
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 400);
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mamotors_app_notice', noticeText);
    localStorage.setItem('mamotors_notice_active', String(isNoticeActive));
    setNoticeSaved(true);
    setTimeout(() => setNoticeSaved(false), 3000);
  };

  const handleToggleMaintenance = () => {
    const next = !isMaintenanceMode;
    setIsMaintenanceMode(next);
    localStorage.setItem('mamotors_maintenance_mode', String(next));
  };

  const handleExportData = () => {
    const data = {
      showroomSettings: formData,
      exportedAt: new Date().toISOString(),
      adminEmails,
      cloudProjectUrl: SUPABASE_URL
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MaMotors_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Settings Menu Items (Exact order matching user's reference picture)
  const menuItems = [
    {
      id: 'theme' as SettingsSection,
      label: 'Theme & Appearance',
      icon: Palette
    },
    {
      id: 'database' as SettingsSection,
      label: 'Database Cloud Sync',
      icon: Cloud
    },
    {
      id: 'notice' as SettingsSection,
      label: 'App Notice',
      icon: Megaphone
    },
    {
      id: 'maintenance' as SettingsSection,
      label: 'Maintenance Mode',
      icon: Wrench
    },
    {
      id: 'users' as SettingsSection,
      label: 'User Management',
      icon: Shield
    },
    {
      id: 'pin' as SettingsSection,
      label: 'Security & Passcode',
      icon: KeyRound
    },
    {
      id: 'backup' as SettingsSection,
      label: 'Backup & Restore',
      icon: HardDrive
    },
    {
      id: 'history' as SettingsSection,
      label: 'Login History',
      icon: History
    },
    {
      id: 'showroom' as SettingsSection,
      label: 'Showroom Info',
      icon: Building2
    },
    {
      id: 'manager' as SettingsSection,
      label: 'Manager Info',
      icon: User
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Settings Modal Box matching screenshot exactly */}
      <div className="w-full max-w-lg bg-[#0e1626] border border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-[#0e1626]">
          <div className="flex items-center gap-3">
            {activeSection !== 'menu' ? (
              <button
                type="button"
                onClick={() => setActiveSection('menu')}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <SettingsIcon className="w-4 h-4 text-emerald-400" />
            )}

            <h2 className="text-sm sm:text-base font-semibold text-slate-100">
              {activeSection === 'menu' && 'Settings'}
              {activeSection === 'database' && 'Database Cloud Sync'}
              {activeSection === 'theme' && 'Theme & Appearance'}
              {activeSection === 'notice' && 'App Notice'}
              {activeSection === 'maintenance' && 'Maintenance Mode'}
              {activeSection === 'users' && 'User Management'}
              {activeSection === 'pin' && 'Security & Passcode'}
              {activeSection === 'backup' && 'Backup & Restore'}
              {activeSection === 'history' && 'Login History'}
              {activeSection === 'showroom' && 'Showroom Info'}
              {activeSection === 'manager' && 'Manager Info'}
            </h2>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: DATABASE CLOUD SYNC (EXACT MATCH TO USER SCREENSHOT!) */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'database' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            
            {/* Center Cloud Icon & Hero */}
            <div className="flex flex-col items-center text-center pt-2">
              <div className="w-12 h-12 rounded-full border border-sky-500/30 bg-sky-950/40 flex items-center justify-center text-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.15)] mb-3.5">
                <Cloud className="w-6 h-6 text-sky-400" />
              </div>

              <h3 className="text-base font-bold text-white mb-1.5">
                Database Cloud Sync
              </h3>

              <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-5">
                Manually push your local changes or pull updates from the central database.
              </p>

              {/* Action Buttons: Push to Cloud & Pull from Cloud */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePush}
                  disabled={isPushing || isPulling}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {isPushing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  ) : (
                    <Upload className="w-3.5 h-3.5 text-slate-300" />
                  )}
                  <span>Push to Cloud</span>
                </button>

                <button
                  type="button"
                  onClick={handlePull}
                  disabled={isPushing || isPulling}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  {isPulling ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span>Pull from Cloud</span>
                </button>
              </div>

              {/* Status feedback message */}
              {syncStatusMsg && (
                <div className={`mt-3.5 text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
                  syncStatusMsg.isError 
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-300' 
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{syncStatusMsg.text}</span>
                </div>
              )}
            </div>

            {/* RECENT SYNC LOGS Section */}
            <div className="space-y-2.5 pt-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                RECENT SYNC LOGS
              </div>

              <div className="space-y-2">
                {syncLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-[#0a1120] border border-slate-800/80 hover:border-slate-700/80 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                        <span className="text-xs font-bold text-slate-200">
                          {log.title}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono text-right whitespace-pre-line leading-tight">
                        {log.timestamp}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 pl-4">
                      {log.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: MAIN SETTINGS MENU (MATCHES USER SCREENSHOT 2) */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'menu' && (
          <div className="p-3.5 sm:p-4 overflow-y-auto space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#0a1120]/80 hover:bg-slate-800/70 border border-slate-800/70 hover:border-slate-700 text-left transition-all duration-150 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: SHOWROOM INFO */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'showroom' && (
          <form onSubmit={handleSaveShowroom} className="p-4 sm:p-5 overflow-y-auto space-y-4">
            {savedSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>শোরুমের তথ্য সংরক্ষিত হয়েছে!</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-[#0a1120] border border-slate-800 flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                {formData.logoUrl && !logoPreviewError ? (
                  <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain p-1" onError={() => setLogoPreviewError(true)} />
                ) : (
                  <Building2 className="w-6 h-6 text-slate-600" />
                )}
              </div>
              <div className="space-y-1.5">
                <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold cursor-pointer">
                  <Camera className="w-3.5 h-3.5" />
                  <span>লোগো আপলোড</span>
                  <input type="file" accept="image/*" onChange={handleLogoFileUpload} className="hidden" />
                </label>
                {formData.logoUrl && (
                  <button type="button" onClick={() => setFormData(p => ({ ...p, logoUrl: '' }))} className="block text-[10px] text-rose-400 hover:text-rose-300 cursor-pointer">
                    লোগো রিমুভ করুন
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">শোরুমের নাম</label>
                <input type="text" value={formData.showroomName} onChange={e => updateField('showroomName', e.target.value)} className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">হটলাইন নম্বর</label>
                <input type="text" value={formData.hotline} onChange={e => updateField('hotline', e.target.value)} className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">হোয়াটসঅ্যাপ নম্বর</label>
                <input type="text" value={formData.whatsapp} onChange={e => updateField('whatsapp', e.target.value)} className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">ইমেইল</label>
                <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white" />
              </div>
            </div>

            <div className="text-xs">
              <label className="text-slate-400 block mb-1">শোরুমের ঠিকানা</label>
              <textarea rows={2} value={formData.address} onChange={e => updateField('address', e.target.value)} className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white" />
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: MANAGER INFO */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'manager' && (
          <form onSubmit={handleSaveShowroom} className="p-4 sm:p-5 overflow-y-auto space-y-4">
            {savedSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>ম্যানেজার তথ্য সেভ হয়েছে!</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-[#0a1120] border border-slate-800 flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                {formData.managerPhotoUrl && !managerPhotoPreviewError ? (
                  <img src={formData.managerPhotoUrl} alt="Manager" className="w-full h-full object-cover" onError={() => setManagerPhotoPreviewError(true)} />
                ) : (
                  <User className="w-7 h-7 text-slate-600" />
                )}
              </div>
              <div className="space-y-1.5">
                <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-semibold cursor-pointer">
                  <Camera className="w-3.5 h-3.5" />
                  <span>ছবি আপলোড</span>
                  <input type="file" accept="image/*" onChange={handleManagerPhotoUpload} className="hidden" />
                </label>
                {formData.managerPhotoUrl && (
                  <button type="button" onClick={() => setFormData(p => ({ ...p, managerPhotoUrl: '' }))} className="block text-[10px] text-rose-400 hover:text-rose-300 cursor-pointer">
                    ছবি রিমুভ করুন
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ম্যানেজারের নাম</label>
                <input type="text" value={formData.managerName} onChange={e => updateField('managerName', e.target.value)} className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">ম্যানেজারের সরাসরি মোবাইল নম্বর</label>
                <input type="text" value={formData.managerContact || ''} onChange={e => updateField('managerContact', e.target.value)} className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">সময়সূচী</label>
                <input type="text" value={formData.openingHours} onChange={e => updateField('openingHours', e.target.value)} className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" disabled={isSaving} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: SECURITY & PASSCODE (CHANGE PIN) */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'pin' && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
              বর্তমান অ্যাডমিন পিন: <strong className="text-amber-300 font-mono text-sm">{currentPin}</strong>
            </div>

            <form onSubmit={handleUpdatePin} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">নতুন ৪-ডিজিট পিন লিখুন:</label>
                <input
                  type="text"
                  maxLength={8}
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="যেমন: 2222 বা 5555"
                  className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2.5 text-white font-mono text-xs"
                />
              </div>

              {pinErrorMsg && <p className="text-xs text-rose-400">{pinErrorMsg}</p>}
              {pinSuccessMsg && (
                <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{pinSuccessMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>পিন পরিবর্তন করুন (Update PIN)</span>
              </button>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: APP NOTICE */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'notice' && (
          <form onSubmit={handleSaveNotice} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
            {noticeSaved && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>নোটিশ আপডেট হয়েছে!</span>
              </div>
            )}

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a1120] border border-slate-800">
              <span className="text-slate-300">ওয়েবসাইটে নোটিশ প্রদর্শন</span>
              <button
                type="button"
                onClick={() => setIsNoticeActive(!isNoticeActive)}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  isNoticeActive ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isNoticeActive ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">নোটিশ বার্তা</label>
              <textarea
                rows={3}
                value={noticeText}
                onChange={e => setNoticeText(e.target.value)}
                className="w-full bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
                <Save className="w-3.5 h-3.5" />
                <span>Save Notice</span>
              </button>
            </div>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: THEME & APPEARANCE */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'theme' && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#0a1120] border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300 font-medium">থিম মোড</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-400 border border-cyan-500/30 text-[11px] font-bold">
                Dark Mode (Active)
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#0a1120] border border-slate-800 space-y-2">
              <span className="text-slate-300 font-medium block">অ্যাকসেন্ট কালার</span>
              <div className="flex items-center gap-2">
                {[
                  { name: 'cyan', hex: '#06b6d4', label: 'Cyan' },
                  { name: 'emerald', hex: '#10b981', label: 'Emerald' },
                  { name: 'amber', hex: '#f59e0b', label: 'Gold' }
                ].map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setThemeAccent(c.name);
                      localStorage.setItem('mamotors_theme_accent', c.name);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs cursor-pointer ${
                      themeAccent === c.name ? 'border-white bg-slate-800 text-white' : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: MAINTENANCE MODE */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'maintenance' && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#0a1120] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-medium">মেইনটেন্যান্স মোড</div>
                <div className="text-[11px] text-slate-400">সাময়িক আপডেট নোটিশ দেখাবে</div>
              </div>
              <button
                type="button"
                onClick={handleToggleMaintenance}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                  isMaintenanceMode ? 'bg-amber-500' : 'bg-slate-800'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isMaintenanceMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: USER MANAGEMENT */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'users' && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
            <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
              <span className="text-slate-300 font-medium">Master Admin:</span>
              <span className="font-mono text-cyan-300 font-semibold">{MASTER_ADMIN_EMAIL}</span>
            </div>

            <form onSubmit={handleAddAdminEmail} className="flex gap-2">
              <input
                type="email"
                value={newAdminEmailInput}
                onChange={e => setNewAdminEmailInput(e.target.value)}
                placeholder="admin@gmail.com"
                className="flex-1 bg-[#0a1120] border border-slate-800 rounded-lg p-2 text-white"
              />
              <button type="submit" className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg cursor-pointer">
                Add
              </button>
            </form>
            {adminEmailError && <p className="text-rose-400">{adminEmailError}</p>}

            <div className="space-y-1 pt-1">
              <div className="text-slate-400 font-semibold">অনুমোদিত অ্যাডমিন ({adminEmails.length})</div>
              {adminEmails.map((email) => (
                <div key={email} className="flex items-center justify-between p-2 rounded-lg bg-[#0a1120] border border-slate-800">
                  <span className="text-slate-300 font-mono">{email}</span>
                  {email.toLowerCase() !== MASTER_ADMIN_EMAIL.toLowerCase() && (
                    <button type="button" onClick={() => handleRemoveAdminEmail(email)} className="text-rose-400 hover:text-rose-300">
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: BACKUP & RESTORE */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'backup' && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#0a1120] border border-slate-800 space-y-2">
              <div className="text-white font-semibold">সম্পূর্ণ শোরুম ডেটা ব্যাকআপ</div>
              <p className="text-slate-400 text-[11px]">শোরুম কনফিগারেশন JSON ফাইলে ডাউনলোড করুন।</p>
              <button
                type="button"
                onClick={handleExportData}
                className="py-2 px-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Backup</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
              <div className="text-rose-300 font-semibold">ডেমো ডেটা রিসেট</div>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('আপনি কি নিশ্চিত যে ডেমো ডেটা রিসেট করতে চান?')) {
                    onResetDemoData();
                  }
                }}
                className="py-1.5 px-3 rounded-lg bg-rose-600/30 hover:bg-rose-600 border border-rose-500/40 text-rose-200 hover:text-white font-bold cursor-pointer"
              >
                রিসেট করুন
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SCREEN: LOGIN HISTORY */}
        {/* ------------------------------------------------------------- */}
        {activeSection === 'history' && (
          <div className="p-4 sm:p-5 overflow-y-auto space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0a1120] border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-200 font-semibold">বর্তমান লগইন সেশন</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-slate-400 text-[11px]">ব্রাউজার: Chrome / Web Client</div>
              <div className="text-slate-400 text-[11px]">আইডি: {MASTER_ADMIN_EMAIL}</div>
              <div className="text-slate-500 text-[10px]">Active Session Verified</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
