import React, { useState } from 'react';
import { ActivePage } from '../../types/bike';
import { useAuth } from '../../context/AuthContext';
import { MASTER_ADMIN_EMAIL } from '../../utils/supabase';
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
  ShieldCheck, 
  User, 
  MessageCircle, 
  Crown, 
  Lock, 
  RefreshCw, 
  LogOut, 
  ChevronRight,
  Sparkles
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
  managerName?: string;
  managerContact?: string;
  managerPhotoUrl?: string;
  onUpdateManagerPhoto?: (photoUrl: string) => void;
  onUpdateLogo?: (logoUrl: string) => void;
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
  address = '14 No Ghat, South Potenga, Potenga, Chittagong',
  managerName = 'Saddam Hossain',
  managerContact = '+880 1739-840603',
  managerPhotoUrl = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&h=200&q=80',
  onUpdateManagerPhoto,
  onUpdateLogo
}) => {
  const [logoError, setLogoError] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  const { 
    isAdmin, 
    openPinModal 
  } = useAuth();

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
      adminOnly: true
    },
    {
      id: 'stock' as ActivePage,
      label: 'Our Collection',
      icon: Bike,
      badge: inStockCount > 0 ? `${inStockCount}` : undefined,
      adminOnly: false
    },
    {
      id: 'purchase' as ActivePage,
      label: 'Purchase',
      icon: ArrowDownLeft,
      adminOnly: true,
      badge: undefined
    },
    {
      id: 'sell' as ActivePage,
      label: 'Sales',
      icon: ArrowUpRight,
      adminOnly: true,
      badge: undefined
    },
    {
      id: 'contact' as ActivePage,
      label: 'Contact Us',
      icon: PhoneCall,
      badge: isAdmin && inquiriesCount > 0 ? `${inquiriesCount}` : undefined,
      adminOnly: false
    },
    {
      id: 'settings' as ActivePage,
      label: 'Settings',
      icon: Settings,
      adminOnly: true,
      badge: undefined
    }
  ];

  // In Customer View (!isAdmin), completely hide locked admin options
  const visibleNavItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  const handleNavClick = (item: typeof navItems[0]) => {
    onNavigate(item.id);
    handleClose();
  };

  const cleanContactNumber = (managerContact || hotline || '').replace(/[^\d+]/g, '');
  const whatsappNumber = cleanContactNumber.startsWith('+') 
    ? cleanContactNumber.slice(1) 
    : cleanContactNumber.startsWith('0') 
      ? `88${cleanContactNumber}` 
      : cleanContactNumber;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950">
      {/* Brand Header with Round Logo */}
      <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between shrink-0">
        <button 
          type="button"
          onClick={() => {
            onNavigate('dashboard');
            handleClose();
          }}
          className="flex items-center gap-2.5 text-left group overflow-hidden cursor-pointer min-w-0"
        >
          {Boolean(logoUrl && logoUrl.trim()) && !logoError ? (
            <img 
              src={logoUrl!} 
              alt={showroomName} 
              onError={() => setLogoError(true)} 
              className="w-8 h-8 rounded-full object-cover border-2 border-cyan-500/60 shadow-sm group-hover:scale-105 group-hover:border-cyan-400 transition-all shrink-0 bg-slate-900 overflow-hidden" 
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0 border border-cyan-400/50">
              M
            </div>
          )}
          <div className="truncate">
            <div className="font-bold text-white text-xs sm:text-sm tracking-tight font-display truncate group-hover:text-cyan-300 transition-colors">
              {showroomName}
            </div>
            <div className="text-[9px] text-cyan-400 font-medium truncate flex items-center gap-1">
              <span>Showroom Portal</span>
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping inline-block" />
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
      <nav className="p-2.5 space-y-1 flex-1 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`w-full text-left rounded-xl px-3 py-2 transition-all duration-150 flex items-center justify-between border cursor-pointer group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-transparent text-white border-cyan-500/40 font-semibold shadow-sm'
                  : 'text-slate-400 border-transparent hover:bg-slate-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive 
                    ? 'text-cyan-400' 
                    : 'text-slate-400 group-hover:text-slate-300'
                }`} />
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

      {/* Sidebar Bottom: Manager/Admin Info Section */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/90 space-y-2.5 shrink-0">
        {/* Manager / Admin Profile Card with Round Picture, Name & Phone Number */}
        <div className="p-2.5 rounded-xl bg-gradient-to-b from-slate-900/90 to-slate-900/60 border border-slate-800/90 space-y-2 shadow-sm">
          <div className="flex items-center gap-2.5">
            {/* Round Picture */}
            <div className="relative shrink-0">
              {Boolean(managerPhotoUrl && managerPhotoUrl.trim()) && !photoError ? (
                <img
                  src={managerPhotoUrl}
                  alt={managerName}
                  onError={() => setPhotoError(true)}
                  className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400/80 shadow-md shadow-cyan-500/20 bg-slate-900"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md border-2 border-cyan-400/80">
                  {managerName ? managerName.charAt(0).toUpperCase() : <User className="w-5 h-5 text-slate-950" />}
                </div>
              )}
              {/* Online / Verified Admin Dot */}
              <div 
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full" 
                title="Verified Admin Online" 
              />
            </div>

            {/* Manager Name & Role */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white truncate font-display">
                  {managerName || 'Saddam Hossain'}
                </span>
                <span title="Verified Showroom Admin" className="shrink-0 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                </span>
              </div>
              <div className="text-[10px] text-cyan-400 font-medium truncate">
                Manager & Admin
              </div>
            </div>
          </div>

          {/* Manager Contact Number & Action Buttons */}
          <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between gap-1.5 text-xs">
            <a
              href={`tel:${cleanContactNumber}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 font-mono text-[10px] font-semibold transition-colors truncate"
              title="Call Manager Directly"
            >
              <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{managerContact || '+880 1739-840603'}</span>
            </a>

            <div className="flex items-center gap-1 shrink-0">
              {/* Direct Phone Call */}
              <a
                href={`tel:${cleanContactNumber}`}
                className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 transition-all border border-cyan-500/20"
                title="Call Manager Directly"
              >
                <Phone className="w-3 h-3" />
              </a>

              {/* WhatsApp Chat */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-all border border-emerald-500/20"
                title="Message on WhatsApp"
              >
                <MessageCircle className="w-3 h-3" />
              </a>

              {/* Settings / Edit Profile - Only show for Admin */}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('settings');
                    handleClose();
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700/80 cursor-pointer"
                  title="Edit Manager & Showroom Settings"
                >
                  <Settings className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. Showroom Address */}
        <div className="p-2 rounded-xl bg-slate-900/40 border border-slate-800/50 flex items-start gap-1.5 text-[10px] text-slate-400">
          <MapPin className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
          <span className="line-clamp-2 leading-tight">
            {address || '14 No Ghat, South Potenga, Potenga, Chittagong'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: Inline Push Sidebar (Compact w-64, smoothly expands/collapses inline so right side is never obscured!) */}
      <aside 
        className={`hidden md:flex flex-col h-full bg-slate-950 text-slate-200 shrink-0 z-30 transition-all duration-300 ease-in-out overflow-hidden select-none ${
          isDrawerOpen 
            ? 'w-64 opacity-100 border-r border-slate-800/80 shadow-xl' 
            : 'w-0 opacity-0 pointer-events-none border-r-0'
        }`}
      >
        <div className="w-64 h-full flex flex-col">
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
          className={`fixed inset-y-0 left-0 w-64 max-w-[85vw] h-full z-10 bg-slate-950 text-slate-200 border-r border-slate-800 shadow-2xl transition-transform duration-300 transform flex flex-col select-none ${
            isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </aside>
      </div>
    </>
  );
};
