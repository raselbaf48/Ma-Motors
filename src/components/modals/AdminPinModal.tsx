import React, { useState, useEffect, useRef } from 'react';
import { Crown, X, Check, KeyRound } from 'lucide-react';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  verifyPin: (pin: string) => boolean;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  verifyPin
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
      setShake(false);
      setIsSuccess(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const checkPin = (pinToCheck: string) => {
    const isValid = verifyPin(pinToCheck);
    if (isValid) {
      setIsSuccess(true);
      setError(false);
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 300);
    } else {
      // Auto Mismatch: trigger shake and immediately auto-reset!
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setTimeout(() => {
        setPin('');
        setError(false);
        inputRef.current?.focus();
      }, 450);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isSuccess) return;
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setError(false);
    setPin(val);
    
    // Auto Match on 4th digit
    if (val.length === 4) {
      checkPin(val);
    }
  };

  const handleQuickFill = () => {
    setPin('1111');
    checkPin('1111');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 text-center space-y-5 transition-all ${
          shake ? 'animate-bounce' : ''
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Crown Icon / Header */}
        <div className="pt-2">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            {isSuccess ? (
              <Check className="w-7 h-7 text-emerald-400 animate-in zoom-in" />
            ) : (
              <Crown className="w-7 h-7" />
            )}
          </div>
          <h2 className="text-lg font-bold text-white mt-3 font-display">
            Master Admin Login
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            মাস্টার অ্যাডমিন প্যানেল আনলক করতে পিন দিন
          </p>
        </div>

        {/* PIN Input with automatic matching & auto-reset */}
        <div className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pin}
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              autoFocus
              placeholder="••••"
            />

            {/* 4 Interactive PIN Digits Boxes */}
            <div className="flex items-center justify-center gap-3 py-1">
              {[0, 1, 2, 3].map((index) => {
                const hasDigit = pin.length > index;
                const isCurrent = pin.length === index;

                return (
                  <div
                    key={index}
                    className={`w-12 h-14 rounded-2xl flex items-center justify-center text-xl font-bold transition-all ${
                      isSuccess
                        ? 'border-2 border-emerald-500 bg-emerald-500/10 text-emerald-400'
                        : error
                        ? 'border-2 border-rose-500 bg-rose-500/10 text-rose-400'
                        : isCurrent
                        ? 'border-2 border-amber-400 bg-amber-400/15 shadow-md shadow-amber-400/20 text-amber-300'
                        : hasDigit
                        ? 'border-2 border-amber-400/80 bg-amber-400/10 text-amber-300'
                        : 'border border-slate-700 bg-slate-800/80 text-slate-500'
                    }`}
                  >
                    {hasDigit ? (
                      <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                    ) : isCurrent ? (
                      <span className="w-0.5 h-5 bg-amber-400 animate-pulse" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Message */}
          <div className="min-h-[22px]">
            {isSuccess ? (
              <p className="text-xs text-emerald-400 font-medium flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>পিন সঠিক! অ্যাডমিন আনলক হচ্ছে...</span>
              </p>
            ) : error ? (
              <p className="text-xs text-rose-400 font-medium animate-pulse">
                ভুল পিন! স্বয়ংক্রিয়ভাবে রিসেট হয়েছে, পুনরায় লিখুন
              </p>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                <KeyRound className="w-3.5 h-3.5 text-amber-400/80" />
                <span>ডিফল্ট পিন: <strong className="text-amber-300 font-mono">1111</strong> (অটো ম্যাচ)</span>
              </div>
            )}
          </div>
        </div>

        {/* 1-Click Quick Fill Button */}
        <div className="pt-2 border-t border-slate-800/80">
          <button
            type="button"
            onClick={handleQuickFill}
            className="w-full py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>১-ক্লিকে পিন (1111) দিয়ে লগইন করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
