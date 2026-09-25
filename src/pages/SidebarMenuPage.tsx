import React, { useState } from 'react';
import { ActivePage, Bike } from '../types/bike';
import { POPULAR_BRANDS } from '../data/mockBikes';
import { formatBDT } from '../utils/formatters';
import { 
  Bike as BikeIcon, 
  Layers, 
  Calculator, 
  Tag, 
  ShieldCheck, 
  PhoneCall, 
  SlidersHorizontal, 
  User, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Flame, 
  Wrench, 
  Compass, 
  DollarSign, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Gauge
} from 'lucide-react';

interface SidebarMenuPageProps {
  onNavigate: (page: ActivePage) => void;
  onBrandSearch: (brand: string) => void;
  previousPage: ActivePage;
  bikesCount: number;
  compareCount: number;
}

interface MenuOptionItem {
  id: string;
  title: string;
  banglaTitle: string;
  description: string;
  category: 'inventory' | 'finance' | 'quality' | 'dealership';
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  badge?: string;
  badgeColor?: string;
  targetPage: ActivePage;
  features: string[];
}

export const SidebarMenuPage: React.FC<SidebarMenuPageProps> = ({
  onNavigate,
  onBrandSearch,
  previousPage,
  bikesCount,
  compareCount
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'inventory' | 'finance' | 'quality' | 'dealership'>('all');

  const menuOptions: MenuOptionItem[] = [
    {
      id: 'opt-home',
      title: 'Showroom',
      banglaTitle: 'শো-রুম হোম',
      description: 'শো-রুমের প্রধান পেজ, সপ্তাহের সেরা ডিল, ব্র্যান্ড তালিকা এবং কাস্টমার রিভিউ।',
      category: 'inventory',
      icon: Flame,
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      badge: 'Main',
      badgeColor: 'bg-cyan-950/80 text-cyan-400 border-cyan-500/30',
      targetPage: 'home',
      features: ['Deal of the Week', 'Popular Brands', 'Customer Testimonials']
    },
    {
      id: 'opt-inventory',
      title: 'Inventory',
      banglaTitle: 'ইনভেন্টরি (সকল বাইক)',
      description: 'সব ভেরিফাইড বাইকের তালিকা, ফিল্টার, বিডিটি (৳) মূল্য ও বিআরটিএ পেপার ভেরিফিকেশন।',
      category: 'inventory',
      icon: BikeIcon,
      iconBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      badge: `${bikesCount} Bikes`,
      badgeColor: 'bg-blue-950/80 text-blue-400 border-blue-500/30',
      targetPage: 'inventory',
      features: ['Filter by Brand & CC', 'Live BDT (৳) Price', 'Condition Grades']
    },
    {
      id: 'opt-compare',
      title: 'Compare',
      banglaTitle: 'কম্পেয়ার (বাইক তুলনা)',
      description: 'পাশাপাশি ৩টি বাইকের স্পেক্স, পাওয়ার, সিসি ও দাম তুলনা করুন।',
      category: 'inventory',
      icon: Layers,
      iconBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      badge: compareCount > 0 ? `${compareCount} Selected` : 'Up to 3',
      badgeColor: compareCount > 0 ? 'bg-sky-950 text-sky-300 border-sky-500/40 font-bold' : 'bg-slate-900 text-slate-400 border-slate-700',
      targetPage: 'compare',
      features: ['Side-by-side Specs', 'Engine Power', 'Registration Details']
    },
    {
      id: 'opt-sell',
      title: 'Sell Your Bike',
      banglaTitle: 'বাইক বিক্রি করুন',
      description: 'আপনার বাইকের ইনস্ট্যান্ট ভ্যালুয়েশন হিসাব করুন এবং দ্রুত ক্যাশ অফার পান।',
      category: 'finance',
      icon: Tag,
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      badge: 'Instant Valuation',
      badgeColor: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30',
      targetPage: 'sell',
      features: ['Smart Calculator', 'Free Inspection', 'Same-day Payment']
    },
    {
      id: 'opt-emi',
      title: 'EMI Calculator',
      banglaTitle: 'ইএমআই ক্যালকুলেটর',
      description: 'ডাউন পেমেন্ট, মেয়াদ ও সুদের হার অনুযায়ী সঠিক মাসিক কিস্তি হিসাব করুন।',
      category: 'finance',
      icon: Calculator,
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      badge: 'Bank EMI',
      badgeColor: 'bg-amber-950/80 text-amber-400 border-amber-500/30',
      targetPage: 'emi',
      features: ['Monthly Installment', 'Down Payment Slider', 'Tenure Selection']
    },
    {
      id: 'opt-about',
      title: 'About Us',
      banglaTitle: 'আমাদের সম্পর্কে',
      description: 'আমাদের ৫০-পয়েন্ট কোয়ালিটি টেস্টিং ল্যাব, শো-রুম ফ্যাসিলিটি ও ১২ মাসের ওয়ারেন্টি নীতিমালা।',
      category: 'quality',
      icon: ShieldCheck,
      iconBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      badge: 'Certified',
      badgeColor: 'bg-teal-950/80 text-teal-400 border-teal-500/30',
      targetPage: 'about',
      features: ['50-Point Certification', '12M Warranty', '7-Day Bike Swap']
    },
    {
      id: 'opt-contact',
      title: 'Contact',
      banglaTitle: 'যোগাযোগ ও শোরুম',
      description: 'তেজগাঁও ঢাকা শো-রুমের ঠিকানা, ফোন, হোয়াটসঅ্যাপ ও ডিরেক্ট মেসেজ।',
      category: 'dealership',
      icon: MapPin,
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      badge: 'Dhaka Hub',
      badgeColor: 'bg-cyan-950/80 text-cyan-400 border-cyan-500/30',
      targetPage: 'contact',
      features: ['Tejgaon Location', 'WhatsApp Chat', 'Phone Support']
    },
    {
      id: 'opt-admin',
      title: 'Dealer DMS Portal (Admin)',
      banglaTitle: 'ডিলার অ্যাডমিন প্যানেল',
      description: 'বাইকের তথ্য এডিট (Brand, Model, MFG Year, Reg Year, Reg Number, Buying & Asking Price, PDF)।',
      category: 'dealership',
      icon: SlidersHorizontal,
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      badge: 'Admin',
      badgeColor: 'bg-purple-950/80 text-purple-400 border-purple-500/30',
      targetPage: 'admin',
      features: ['Edit Bike Details', 'Upload PDF Document', 'Manage Leads']
    },
    {
      id: 'opt-auth',
      title: 'Rider Account',
      banglaTitle: 'রাইডার অ্যাকাউন্ট',
      description: 'লগইন বা সাইন আপ করে আপনার টেস্ট রাইড শিডিউল ও সংরক্ষিত বাইক দেখুন।',
      category: 'dealership',
      icon: User,
      iconBg: 'bg-slate-700/30 text-slate-300 border-slate-700',
      badge: 'Profile',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      targetPage: 'auth',
      features: ['Saved Bikes', 'Test Ride Tracking', 'Demo Login']
    }
  ];

  // Filtering options
  const filteredOptions = menuOptions.filter((opt) => {
    if (selectedCategory !== 'all' && opt.category !== selectedCategory) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        opt.title.toLowerCase().includes(q) ||
        opt.banglaTitle.toLowerCase().includes(q) ||
        opt.description.toLowerCase().includes(q) ||
        opt.features.some((f) => f.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => onNavigate(previousPage || 'home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Return to Previous Page ({previousPage.toUpperCase()})</span>
          </button>
          <span>/</span>
          <span className="text-white font-semibold font-mono">Sidebar Options Hub (সাইডবার অপশন মেনু)</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Active Currency:</span>
          <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-bold">
            Bangladeshi Taka (BDT ৳)
          </span>
        </div>
      </div>

      {/* Hero Banner for Sidebar Hub */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Navigation Hub · প্রতি অপশন আলাদা আলাদা ইন্টারফেসে লোড হবে</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
            Menu
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            যেকোনো অপশন নির্বাচন করুন, সেই অপশনের সম্পূর্ণ ইন্টারফেসটি সরাসরি আলাদা পেজে ওপেন হবে।
          </p>

          {/* Quick Search inside Sidebar */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search any option (e.g. Inventory, EMI, Sell, Compare, Admin, Inspection)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
        {[
          { id: 'all', label: 'All Showroom Options (সব অপশন)' },
          { id: 'inventory', label: 'Bike Inventory & Compare (বাইক ব্রাউজিং)' },
          { id: 'finance', label: 'Sell & EMI Finance (বিক্রি ও কিস্তি)' },
          { id: 'quality', label: '50-Point Inspection & Lab (গুণমান যাচাই)' },
          { id: 'dealership', label: 'Admin DMS & Showroom Hub (ডিলারশিপ)' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === tab.id
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Options Grid: Every Option Card Links to its Separate Interface Page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <div
              key={opt.id}
              onClick={() => onNavigate(opt.targetPage)}
              className="group relative bg-slate-900/90 border border-slate-800 hover:border-cyan-500/70 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div className="space-y-4">
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${opt.iconBg} transition-transform group-hover:scale-110 duration-200`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  {opt.badge && (
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${opt.badgeColor}`}>
                      {opt.badge}
                    </span>
                  )}
                </div>

                {/* Titles */}
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 font-semibold mb-0.5">
                    {opt.banglaTitle}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {opt.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {opt.description}
                </p>

                {/* Key feature pills */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  {opt.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button: Opens Interface in Separate Page */}
              <div className="pt-6 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-300">
                  Target: <strong className="text-white font-mono">/{opt.targetPage}</strong>
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(opt.targetPage);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-600 group-hover:bg-cyan-500 text-white rounded-xl font-bold shadow-md shadow-cyan-600/20 transition-all"
                >
                  <span>Open Interface</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Brand Shortcuts Strip */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Direct Brand Jump
            </div>
            <h3 className="text-lg font-bold text-white font-display mt-0.5">
              Open Inventory Filtered by Manufacturer
            </h3>
            <p className="text-xs text-slate-400">
              Click any brand to open the inventory interface pre-filtered for that motorcycle maker.
            </p>
          </div>
          <button
            onClick={() => onNavigate('inventory')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>View All Stock</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-2">
          {POPULAR_BRANDS.map((b) => (
            <button
              key={b.name}
              onClick={() => onBrandSearch(b.name)}
              className="p-3 bg-slate-950 border border-slate-800 hover:border-cyan-500/80 rounded-xl text-center transition-all group"
            >
              <div className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors font-display">
                {b.name}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                {b.count} Bikes
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Footer Info Box */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-center text-xs text-slate-400">
        MotoPrime Showroom · তেজগাঁও ঢাকা · প্রতিটি অপশন সিলেক্ট করার পর ডেডিকেটেড পেজ লোড হয়।
      </div>
    </div>
  );
};
