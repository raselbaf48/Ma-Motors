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
            {logoUrl && !logoError && (
              <img 
                src={logoUrl} 
                alt={showroomName} 
                onError={() => setLogoError(true)} 
                className="w-7 h-7 rounded-lg object-cover border border-cyan-500/40 hidden sm:block" 
              />
            )}
            <h1 className="text-lg font-bold text-white tracking-tight font-display">
              {getPageTitle()}
            </h1>
            <span className="text-slate-600 text-sm hidden sm:inline">|</span>
            <span className="text-xs text-slate-400 hidden sm:inline font-medium">
              {showroomName}
            </span>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('stock')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-slate-700 transition-colors"
          >
            <span className="text-slate-400">In Stock:</span>
            <span className="font-bold text-cyan-400">{inStockCount}</span>
          </button>

          <a
            href={`tel:${hotline}`}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{hotline}</span>
          </a>

          {currentPage === 'stock' && onQuickAddBike && (
            <button
              onClick={onQuickAddBike}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Bike</span>
            </button>
          )}

          {currentPage === 'purchase' && onQuickAddPurchase && (
            <button
              onClick={onQuickAddPurchase}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New Purchase</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
