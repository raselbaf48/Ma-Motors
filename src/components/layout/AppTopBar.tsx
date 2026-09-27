import React, { useState } from 'react';
import { ActivePage } from '../../types/bike';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, 
  Phone, 
  Crown,
  LogOut,
  Lock,
  Unlock,
  ShieldCheck
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
  const { isAdmin, logoutAdmin, openPinModal } = useAuth();

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
        return 'Contact Us';
      case 'settings':
        return 'Settings';
      case 'details':
        return 'Bike Details';
      default:
        return isAdmin ? 'Dashboard' : 'Our Collection';
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
            onClick={() => onNavigate(isAdmin ? 'dashboard' : 'stock')}
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

        {/* Right Corner: Hotline & Admin PIN Login Area */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Hotline link (Hidden on tiny screens) */}
          <a
            href={`tel:${hotline}`}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{hotline}</span>
          </a>

          {/* RIGHT CORNER ADMIN PIN AUTHENTICATION */}
          {isAdmin ? (
            /* When Master Admin is UNLOCKED: Only Logout button (No "Master Admin PIN Active" text) */
            <button
              type="button"
              onClick={() => logoutAdmin()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-white border border-rose-500/30 hover:border-rose-500/50 text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-sm"
              title="লগআউট করুন"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Logout</span>
            </button>
          ) : (
            /* When LOCKED: Show "Admin Login" (PIN 1111) Button */
            <button
              type="button"
              onClick={() => openPinModal()}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer active:scale-95 group shrink-0"
              title="Admin Login (PIN 1111)"
            >
              <Crown className="w-4 h-4 fill-slate-950 stroke-slate-950 group-hover:scale-110 transition-transform" />
              <span>Admin Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
