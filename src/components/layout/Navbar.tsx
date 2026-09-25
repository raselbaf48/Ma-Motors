import React, { useState } from 'react';
import { ActivePage } from '../../types/bike';
import { SidebarDrawer } from './SidebarDrawer';
import { 
  Compass, 
  Layers, 
  Calculator, 
  Tag, 
  Info, 
  PhoneCall, 
  SlidersHorizontal, 
  ShieldCheck, 
  Menu, 
  X, 
  User, 
  LogOut,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  compareCount: number;
  wishlistCount: number;
  isLoggedIn: boolean;
  userName?: string;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  compareCount,
  wishlistCount,
  isLoggedIn,
  userName = 'LAC Rasel',
  onLoginClick,
  onLogoutClick
}) => {
  const [isSidebarDrawerOpen, setIsSidebarDrawerOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Showroom', page: 'home' },
    { label: 'Inventory', page: 'inventory' },
    { label: 'Compare', page: 'compare' },
    { label: 'Sell Your Bike', page: 'sell' },
    { label: 'EMI Calculator', page: 'emi' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <>
      {/* Slide-out Sidebar Drawer (Exact style from screenshot) */}
      <SidebarDrawer
        isOpen={isSidebarDrawerOpen}
        onClose={() => setIsSidebarDrawerOpen(false)}
        currentPage={currentPage}
        onNavigate={onNavigate}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={onLogoutClick}
        onLoginClick={onLoginClick}
        compareCount={compareCount}
      />

      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090d16]/95 backdrop-blur-md">
        {/* Top Notice Bar */}
        <div className="hidden sm:flex items-center justify-between px-6 py-1 bg-slate-900/60 border-b border-slate-800/40 text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Certified 50-Point Pre-Purchase Quality Guarantee
            </span>
            <span className="text-slate-600">·</span>
            <span>Showroom Hours: Mon - Sat 9:00 AM - 8:30 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+8801711890432" className="hover:text-cyan-400 transition-colors">
              Sales Desk: +880 1711-890432
            </a>
            <button 
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1 font-mono text-[11px] transition-colors ${
                currentPage === 'admin' ? 'text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Dealer DMS Portal
            </button>
          </div>
        </div>

        {/* Main Navigation Bar (Matches Screenshot 1) */}
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Left: Hamburger Button [☰] + Logo Badge + Brand Name */}
          <div className="flex items-center gap-3">
            {/* Hamburger Button matching Screenshot 1 */}
            <button
              onClick={() => setIsSidebarDrawerOpen(true)}
              className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="Open Sidebar Menu"
              title="Open Sidebar Menu"
            >
              <Menu className="w-5 h-5 text-slate-200" />
            </button>

            {/* Logo Badge & Brand Name */}
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform">
                M
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-white flex items-center gap-1 font-display">
                  Moto<span className="text-cyan-400">Prime</span>
                </div>
                <div className="text-[10px] tracking-wider text-slate-400 uppercase -mt-1 font-mono">
                  Dhaka Hub · BDT (৳)
                </div>
              </div>
            </button>
          </div>

          {/* Center: Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`transition-colors py-1 relative whitespace-nowrap ${
                    isActive
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Compare, Sell CTA, User Avatar (Matches Screenshot 1 top-right) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare Quick Pill */}
            <button
              onClick={() => onNavigate('compare')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                compareCount > 0
                  ? 'bg-slate-900 border-cyan-500/60 text-cyan-400 shadow-sm shadow-cyan-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
              title="Compare up to 3 bikes"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compare</span>
              {compareCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] flex items-center justify-center font-bold">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Sell CTA button */}
            <button
              onClick={() => onNavigate('sell')}
              className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-sm shadow-cyan-600/25 transition-colors whitespace-nowrap"
            >
              <span>Sell Bike</span>
            </button>

            {/* User Avatar Circle (Matches Screenshot 1) */}
            <button
              onClick={() => setIsSidebarDrawerOpen(true)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 hover:border-cyan-400 transition-colors shrink-0 bg-slate-800 flex items-center justify-center"
              title="Open Profile & Menu"
            >
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <User className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

