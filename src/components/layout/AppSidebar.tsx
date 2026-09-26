import React, { useState } from 'react';
import { ActivePage } from '../../types/bike';
import { 
  LayoutDashboard, 
  Bike, 
  ArrowDownLeft, 
  ArrowUpRight, 
  PhoneCall, 
  Settings, 
  X, 
  Phone,
  MapPin
} from 'lucide-react';

interface AppSidebarProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  bikesCount: number;
  inStockCount: number;
  inquiriesCount: number;
  isOpen?: boolean;
  onClose?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  desktopOpen?: boolean;
  onToggleDesktop?: () => void;
  showroomName?: string;
  logoUrl?: string;
  hotline?: string;
  address?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentPage,
  onNavigate,
  bikesCount,
  inStockCount,
  inquiriesCount,
  isOpen,
  onClose,
  mobileOpen = false,
  onCloseMobile,
  desktopOpen = false,
  onToggleDesktop,
  showroomName = 'Ma Motors',
  logoUrl,
  hotline = '+880 1739-840603',
  address = '14 No Ghat, South Potenga, Potenga, Chittagong'
}) => {
  const [logoError, setLogoError] = useState(false);

  // Active open state (hidden by default on all screens)
  const isDrawerOpen = typeof isOpen === 'boolean' 
    ? isOpen 
    : Boolean(mobileOpen || desktopOpen);

  const handleClose = () => {
    if (onClose) onClose();
    if (onCloseMobile) onCloseMobile();
    if (onToggleDesktop) onToggleDesktop();
  };

  const navItems = [
    {
      id: 'dashboard' as ActivePage,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'stock' as ActivePage,
      label: 'Our Collection',
      icon: Bike,
      badge: inStockCount > 0 ? `${inStockCount}` : undefined
    },
    {
      id: 'purchase' as ActivePage,
      label: 'Purchase',
      icon: ArrowDownLeft,
    },
    {
      id: 'sell' as ActivePage,
      label: 'Sales',
      icon: ArrowUpRight,
    },
    {
      id: 'contact' as ActivePage,
      label: 'Contact',
      icon: PhoneCall,
      badge: inquiriesCount > 0 ? `${inquiriesCount}` : undefined
    },
    {
      id: 'settings' as ActivePage,
      label: 'Settings',
      icon: Settings
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Brand Header */}
      <div className="p-3 border-b border-slate-800/80 flex items-center justify-between shrink-0">
        <button 
          type="button"
          onClick={() => {
            onNavigate('dashboard');
            handleClose();
          }}
          className="flex items-center gap-2 text-left group overflow-hidden cursor-pointer min-w-0"
        >
          {Boolean(logoUrl && logoUrl.trim()) && !logoError ? (
            <img 
              src={logoUrl!} 
              alt={showroomName} 
              onError={() => setLogoError(true)} 
              className="w-7 h-7 rounded-lg object-cover border border-cyan-500/40 shadow-sm group-hover:scale-105 transition-transform shrink-0" 
            />
          ) : (
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
              M
            </div>
          )}
          <div className="truncate">
            <div className="font-bold text-white text-xs tracking-tight font-display truncate group-hover:text-cyan-300 transition-colors">
              {showroomName}
            </div>
            <div className="text-[9px] text-cyan-400 font-medium truncate">
              Showroom Portal
            </div>
          </div>
        </button>

        <button 
          onClick={handleClose}
          type="button"
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors cursor-pointer shrink-0"
          title="Close Sidebar"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onNavigate(item.id);
                handleClose();
              }}
              className={`w-full text-left rounded-lg px-2.5 py-2 transition-all duration-150 flex items-center justify-between border cursor-pointer group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-transparent text-white border-cyan-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 border-transparent hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <Icon className={`w-3.5 h-3.5 shrink-0 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                    : 'bg-slate-900 text-slate-400'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-2.5 m-2 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1.5 text-xs text-slate-400 shrink-0">
        <div className="flex items-start gap-1.5 text-slate-300 leading-tight">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
          <span className="text-[10px] font-medium leading-snug break-words">
            {address || '14 No Ghat, South Potenga, Potenga, Chittagong'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <a href={`tel:${hotline.replace(/\s+/g, '')}`} className="hover:text-cyan-400 transition-colors truncate">
            {hotline}
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: Inline Push Sidebar (Compact w-52, smoothly expands/collapses inline so right side is never obscured!) */}
      <aside 
        className={`hidden md:flex flex-col h-full bg-slate-950 text-slate-200 shrink-0 z-30 transition-all duration-300 ease-in-out overflow-hidden select-none ${
          isDrawerOpen 
            ? 'w-52 opacity-100 border-r border-slate-800/80 shadow-xl' 
            : 'w-0 opacity-0 pointer-events-none border-r-0'
        }`}
      >
        <div className="w-52 h-full flex flex-col">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile: Compact Slide-Over Drawer with light backdrop */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
          isDrawerOpen ? 'pointer-events-auto opacity-100 visible' : 'pointer-events-none opacity-0 invisible delay-150'
        }`}
      >
        <div 
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
            isDrawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleClose}
        />
        <aside 
          className={`fixed inset-y-0 left-0 w-52 max-w-[80vw] h-full z-10 bg-slate-950 text-slate-200 border-r border-slate-800 shadow-2xl transition-transform duration-300 transform flex flex-col select-none ${
            isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </aside>
      </div>
    </>
  );
};
