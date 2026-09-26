import React, { useState } from 'react';
import { ActivePage } from '../../types/bike';
import { 
  Menu, 
  Phone, 
  Plus
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
}

export const AppTopBar: React.FC<AppTopBarProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileSidebar,
  onToggleSidebar,
  onQuickAddBike,
  onQuickAddPurchase,
  inStockCount,
  hotline = '+880 1711-890432',
  showroomName = 'Ma Motors',
  logoUrl
}) => {
  const [logoError, setLogoError] = useState(false);

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
    <header className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Sidebar Toggle Button (With smooth animation) & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar || onOpenMobileSidebar}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-850 transition-all flex items-center justify-center active:scale-95 shadow-sm group"
            aria-label="Toggle sidebar menu"
            title="Toggle sidebar menu"
          >
            <Menu className="w-5 h-5 group-hover:scale-105 transition-transform" />
          </button>

          <div className="flex items-center gap-2.5">
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight font-display truncate">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right: Quick Actions & Showroom Logo at the Right Corner */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={`tel:${hotline}`}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{hotline}</span>
          </a>

          {/* Showroom Logo in the Right Corner for all sidebar options - Large & Prominent */}
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2.5 pl-2 sm:pl-3.5 border-l border-slate-800/80 cursor-pointer group shrink-0"
            title={`${showroomName} - Showroom Logo`}
          >
            {Boolean(logoUrl && logoUrl.trim()) && !logoError ? (
              <img 
                src={logoUrl!} 
                alt={showroomName} 
                onError={() => setLogoError(true)} 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl object-cover border-2 border-cyan-500/50 shadow-md shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-400 transition-all shrink-0 bg-slate-900" 
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-base sm:text-xl shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
                M
              </div>
            )}
            <div className="hidden sm:block text-left leading-tight">
              <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-cyan-300 transition-colors truncate max-w-[130px]">
                {showroomName}
              </span>
              <span className="text-[10px] text-cyan-400 block font-semibold uppercase tracking-wider mt-0.5">
                Showroom
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
