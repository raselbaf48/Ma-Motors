import React from 'react';
import { ActivePage } from '../../types/bike';
import { 
  Home, 
  Bike as BikeIcon, 
  Layers, 
  Tag, 
  Calculator, 
  ShieldCheck, 
  SlidersHorizontal, 
  MapPin, 
  User, 
  X, 
  LogOut,
  LogIn,
  Settings,
  FileText,
  Clock,
  Flame,
  Award
} from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  isLoggedIn: boolean;
  userName: string;
  onLogout?: () => void;
  onLoginClick?: () => void;
  bikesCount?: number;
  compareCount?: number;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  isLoggedIn,
  userName,
  onLogout,
  onLoginClick,
  bikesCount = 8,
  compareCount = 0
}) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      page: 'home' as ActivePage,
      label: 'Showroom Home',
      icon: Home,
      badge: 'Main'
    },
    {
      page: 'inventory' as ActivePage,
      label: 'Inventory',
      icon: BikeIcon,
      badge: `${bikesCount}`
    },
    {
      page: 'compare' as ActivePage,
      label: 'Compare Bikes',
      icon: Layers,
      badge: compareCount > 0 ? `${compareCount}` : undefined
    },
    {
      page: 'sell' as ActivePage,
      label: 'Sell Your Bike',
      icon: Tag,
      badge: 'Cash'
    },
    {
      page: 'emi' as ActivePage,
      label: 'EMI Calculator',
      icon: Calculator
    },
    {
      page: 'about' as ActivePage,
      label: '50-Point Certification',
      icon: ShieldCheck
    },
    {
      page: 'admin' as ActivePage,
      label: 'Dealer DMS (Admin)',
      icon: SlidersHorizontal,
      badge: 'DMS'
    },
    {
      page: 'contact' as ActivePage,
      label: 'Showroom & Contact',
      icon: MapPin
    },
    {
      page: 'auth' as ActivePage,
      label: 'Rider Profile / Settings',
      icon: Settings
    }
  ];

  const handleItemClick = (page: ActivePage) => {
    onNavigate(page);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dark backdrop overlay with blur */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      {/* Slide-out Sidebar Drawer (Exact style from screenshot) */}
      <div className="relative w-80 max-w-[85vw] h-full bg-[#0b101b] border-r border-slate-800 flex flex-col justify-between z-10 shadow-2xl overflow-y-auto animate-slide-in">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-cyan-500/25">
              M
            </div>
            <div>
              <div className="text-base font-black tracking-wider text-white uppercase font-display flex items-center gap-1">
                Moto<span className="text-cyan-400">Prime</span>
              </div>
              <div className="text-[9px] font-mono text-slate-400 tracking-wider uppercase">
                Dhaka Hub · BDT (৳)
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <button
                key={item.page}
                onClick={() => handleItemClick(item.page)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive 
                      ? 'bg-black/30 text-white' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom User Profile Badge & Logout (Matches Screenshot 2) */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-3">
          {/* User Card */}
          <div className="p-3 rounded-xl bg-[#111726] border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <User className="w-5 h-5 text-slate-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold truncate">
                {isLoggedIn ? 'RIDER MODE' : 'SHOWROOM GUEST'}
              </div>
              <div className="text-xs font-bold text-white truncate">
                {userName || 'LAC Rasel'}
              </div>
            </div>

            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
          </div>

          {/* Logout / Login Button */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                if (onLogout) onLogout();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-300 bg-slate-900/90 hover:bg-slate-800 hover:text-white border border-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>LOGOUT</span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (onLoginClick) onLoginClick();
                handleItemClick('auth');
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors flex items-center justify-center gap-2 shadow-md shadow-cyan-600/30"
            >
              <LogIn className="w-4 h-4" />
              <span>SIGN IN / PROFILE</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
