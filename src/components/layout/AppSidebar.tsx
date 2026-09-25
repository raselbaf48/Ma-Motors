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
  MapPin,
  ChevronLeft
} from 'lucide-react';

interface AppSidebarProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  bikesCount: number;
  inStockCount: number;
  inquiriesCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  desktopOpen?: boolean;
  onToggleDesktop?: () => void;
  showroomName?: string;
  logoUrl?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentPage,
  onNavigate,
  bikesCount,
  inStockCount,
  inquiriesCount,
  mobileOpen,
  onCloseMobile,
  desktopOpen = true,
  onToggleDesktop,
  showroomName = 'Ma Motors',
  logoUrl
}) => {
  const [logoError, setLogoError] = useState(false);

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
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <button 
          onClick={() => {
            onNavigate('dashboard');
            onCloseMobile();
          }}
          className="flex items-center gap-3 text-left group overflow-hidden"
        >
          {logoUrl && !logoError ? (
            <img 
              src={logoUrl} 
              alt={showroomName} 
              onError={() => setLogoError(true)}
              className="w-10 h-10 rounded-xl object-cover border border-cyan-500/40 shadow-md group-hover:scale-105 transition-transform shrink-0" 
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
              M
            </div>
          )}
          <div className="truncate">
            <div className="font-extrabold text-white text-base tracking-tight font-display truncate group-hover:text-cyan-300 transition-colors">
              {showroomName}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Motorcycle Showroom
            </div>
          </div>
        </button>

        {/* Mobile close button with smooth animation */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all active:scale-95"
          aria-label="Close sidebar"
          title="Close menu"
        >
          <X className="w-5 h-5 transition-transform duration-200 hover:rotate-90" />
        </button>

        {/* Desktop collapse button */}
        {onToggleDesktop && (
          <button
            onClick={onToggleDesktop}
            className="hidden md:flex p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-900 transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Navigation Items (Without numbers, with staggered entry animation) */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id || 
            (item.id === 'stock' && currentPage === 'details') ||
            (item.id === 'dashboard' && currentPage === 'home') ||
            (item.id === 'stock' && currentPage === 'inventory');

          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onCloseMobile();
              }}
              style={{
                transitionDelay: mobileOpen ? `${index * 40 + 60}ms` : '0ms'
              }}
              className={`w-full text-left rounded-xl px-3.5 py-3 transition-all duration-300 flex items-center justify-between border transform active:scale-[0.98] ${
                mobileOpen 
                  ? 'translate-x-0 opacity-100' 
                  : '-translate-x-4 opacity-0 md:translate-x-0 md:opacity-100'
              } ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-transparent text-white border-cyan-500/40 font-semibold shadow-md shadow-cyan-500/15'
                  : 'text-slate-400 border-transparent hover:bg-slate-900/90 hover:text-white hover:translate-x-1'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isActive && (
                  <div className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-full shadow-sm shadow-cyan-400/50 shrink-0" />
                )}
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold transition-all ${
                  isActive
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30 shadow-sm'
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
      <div className="p-3 m-3 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1.5 text-xs text-slate-400">
        <div className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span>Tejgaon, Dhaka</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <a href="tel:+8801711890432" className="hover:text-cyan-400 transition-colors">
            +880 1711-890432
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Collapsible with smooth animation) */}
      <aside 
        className={`hidden md:block shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ease-in-out overflow-hidden ${
          desktopOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-64 h-full">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Slide-over Drawer with Smooth Slide & Fade Animation */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
          mobileOpen 
            ? 'pointer-events-auto opacity-100 visible' 
            : 'pointer-events-none opacity-0 invisible delay-250'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Dark Frosted Backdrop with Smooth Fade */}
        <div 
          className={`fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity duration-300 ease-out ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onCloseMobile}
        />

        {/* Animated Sliding Drawer with Cubic-Bezier curve & subtle cyan edge shadow */}
        <div 
          className={`relative w-72 max-w-[85vw] h-full z-10 shadow-[0_0_50px_rgba(0,0,0,0.9),4px_0_25px_rgba(6,182,212,0.15)] transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) transform ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
};
