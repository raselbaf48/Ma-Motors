import React from 'react';
import { Lock, Crown, ShieldAlert, ArrowLeft } from 'lucide-react';
import { MASTER_ADMIN_EMAIL } from '../../utils/firebase';

interface AdminRestrictedNoticeProps {
  pageTitle: string;
  onOpenLogin: () => void;
  onBackToCollection?: () => void;
}

export const AdminRestrictedNotice: React.FC<AdminRestrictedNoticeProps> = ({
  pageTitle,
  onOpenLogin,
  onBackToCollection
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center shadow-2xl shadow-black/60 space-y-5 animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Admin Access Only</span>
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {pageTitle}
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            এই সেকশনটি এবং শোরুমের অভ্যন্তরীণ আর্থিক তথ্য শুধুমাত্র মাস্টার অ্যাডমিন একাউন্ট (<span className="text-amber-300 font-mono font-semibold">{MASTER_ADMIN_EMAIL}</span>) এর জন্য সংরক্ষিত।
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-left text-xs space-y-1.5 text-slate-300">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>অ্যাডমিন হিসেবে প্রবেশ করতে চান?</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal pl-6">
            নিচের বাটনে ক্লিক করে আপনার <span className="text-amber-300 font-mono">{MASTER_ADMIN_EMAIL}</span> জিমেইল একাউন্ট নির্বাচন করে সাইন ইন করুন।
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onOpenLogin}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Crown className="w-4 h-4" />
            <span>Login as Master Admin</span>
          </button>

          {onBackToCollection && (
            <button
              type="button"
              onClick={onBackToCollection}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Collection</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
