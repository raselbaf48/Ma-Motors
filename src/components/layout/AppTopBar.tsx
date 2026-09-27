import React, { useState, useRef, useEffect } from 'react';
import { ActivePage } from '../../types/bike';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, 
  Phone, 
  Crown,
  User,
  LogOut,
  RefreshCw,
  ChevronDown
} from 'lucide-react';

interface AppTopBarProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenMobileSidebar: () => void;
  onToggleSidebar?: () => void;
  onQuickAddBike?: () => void;
  onQuickAddPurchase?: () => void;
  inStockCount: number;
  totalInvestment: number;
  hotline?: string;
  showroomName?: string;
  logoUrl?: string;
  onUpdateLogo?: (newLogoUrl: string) => void;
}

export const AppTopBar: React.FC<AppTopBarProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileSidebar,
  onToggleSidebar,
  hotline = '+880 1711-890432',
  showroomName = 'Ma Motors',
  logoUrl
}) => {
  const [logoError, setLogoError] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { 
    user, 
    isAdmin, 
    signInWithGmail, 
    switchAccount, 
    signOut,
    loading: authLoading 
  } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
      case 'home':
        return 'Dashboard';
      case 'stock':
      case 'inventory':
        return 'Our Collection';
      case 'purchase':
        return 'Purchase';
      case 'sell':
        return 'Sales';
      case 'contact':
        return 'Contact';
      case 'settings':
        return 'Settings';
      case 'details':
        return 'Bike Details';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 py-2.5 sm:py-3">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Sidebar Toggle Button + Showroom Brand + Page Title */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <button
            onClick={onToggleSidebar || onOpenMobileSidebar}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-850 transition-all flex items-center justify-center active:scale-95 shadow-sm group shrink-0 cursor-pointer"
            aria-label="Toggle sidebar menu"
            title="Toggle sidebar menu"
          >
            <Menu className="w-5 h-5 group-hover:scale-105 transition-transform" />
          </button>

          {/* Showroom Mini Brand (On the Left) */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            title={showroomName}
          >
            {Boolean(logoUrl && logoUrl.trim()) && !logoError ? (
              <img 
                src={logoUrl!} 
                alt={showroomName} 
                onError={() => setLogoError(true)} 
                className="w-8 h-8 rounded-full object-cover border border-cyan-500/50 shadow-sm shrink-0 bg-slate-900 group-hover:border-cyan-400 transition-colors" 
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm shrink-0 border border-cyan-400/50">
                {showroomName.charAt(0)}
              </div>
            )}

            <div className="hidden lg:block leading-tight">
              <span className="text-xs font-bold text-white block group-hover:text-cyan-300 transition-colors truncate max-w-[120px]">
                {showroomName}
              </span>
              <span className="text-[9px] text-cyan-400 block font-semibold uppercase tracking-wider">
                Showroom
              </span>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden sm:block shrink-0" />

          {/* Page Title */}
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight font-display truncate">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right Corner: Hotline & Customer Photo / Gmail Photo / Login Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Hotline link (Hidden on tiny screens) */}
          <a
            href={`tel:${hotline}`}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{hotline}</span>
          </a>

          {/* RIGHT CORNER USER AUTHENTICATION AREA */}
          {user ? (
            /* When Logged in: Display Customer Photo / Gmail Photo */
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-full sm:rounded-xl bg-slate-900 border border-slate-750 hover:border-cyan-500/50 hover:bg-slate-850 transition-all cursor-pointer group shadow-sm active:scale-95"
                title={`${user.displayName} (${isAdmin ? 'Master Admin' : 'Customer'}) - Click for options`}
              >
                {/* Gmail Profile Picture */}
                <div className="relative shrink-0">
                  {user.photoURL && !photoError ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      onError={() => setPhotoError(true)}
                      className={`w-8 h-8 sm:w-8 sm:h-8 rounded-full object-cover border-2 shadow-sm ${
                        isAdmin ? 'border-amber-400' : 'border-cyan-400'
                      }`}
                    />
                  ) : (
                    <div className={`w-8 h-8 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm border-2 ${
                      isAdmin 
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-black border-amber-300' 
                        : 'bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 border-cyan-300'
                    }`}>
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}

                  {/* Tiny badge at bottom right of avatar */}
                  {isAdmin && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-md">
                      <Crown className="w-2 h-2 fill-black stroke-black" />
                    </div>
                  )}
                </div>

                {/* Display name & Role (Shown on tablet/desktop) */}
                <div className="hidden sm:block text-left leading-tight pr-1">
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate max-w-[110px]">
                    {user.displayName}
                  </div>
                  <div className="text-[10px] font-mono mt-0.5 flex items-center gap-1">
                    {isAdmin ? (
                      <span className="text-amber-400 font-bold flex items-center gap-0.5">
                        <Crown className="w-2.5 h-2.5" />
                        <span>Admin</span>
                      </span>
                    ) : (
                      <span className="text-cyan-400 font-medium">Customer</span>
                    )}
                  </div>
                </div>

                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Account Summary */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 mb-2">
                    <div className="flex items-center gap-3">
                      {user.photoURL && !photoError ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="w-10 h-10 rounded-full object-cover border border-cyan-400 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-sm shrink-0">
                          {user.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                          <span className="truncate">{user.displayName}</span>
                          {isAdmin && <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      {isAdmin ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>Master Admin (All Access)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          <User className="w-3 h-3 text-cyan-400" />
                          <span>Customer Access</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions: Switch Gmail / Logout */}
                  <div className="space-y-1 text-xs">
                    <button
                      type="button"
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await switchAccount();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer text-left"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                      <span>অন্য Gmail অ্যাকাউন্ট নির্বাচন করুন</span>
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        setIsUserMenuOpen(false);
                        await signOut();
                      }}
                      className="w-full px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors flex items-center gap-2 cursor-pointer text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>লগআউট (Sign out)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* When NOT Logged in: Display Prominent Login Button right in this corner */
            <button
              type="button"
              onClick={() => signInWithGmail()}
              disabled={authLoading}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs shadow-md shadow-white/10 hover:shadow-cyan-500/20 transition-all cursor-pointer active:scale-95 group border border-slate-200 shrink-0"
              title="Login With Gmail"
            >
              {/* Google G Logo */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.27 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.42l4.02-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.64 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                />
              </svg>
              <span className="tracking-tight">
                {authLoading ? 'Connecting...' : 'Login With Gmail'}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
