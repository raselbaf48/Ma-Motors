import React, { useState } from 'react';
import { Bike, AdditionalCostCategory, AdditionalCostItem } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Wrench, 
  Droplets, 
  Sparkles, 
  Tag, 
  DollarSign, 
  Check, 
  Calendar,
  FileText
} from 'lucide-react';

interface AdditionalCostPageProps {
  bike: Bike;
  onBack: () => void;
  onUpdateBike: (bike: Bike) => void;
  showroomName?: string;
  logoUrl?: string;
}

export const AdditionalCostPage: React.FC<AdditionalCostPageProps> = ({
  bike,
  onBack,
  onUpdateBike,
  showroomName = 'Ma Motors',
  logoUrl
}) => {
  const [logoError, setLogoError] = useState(false);
  // Form states for adding new additional cost
  const [category, setCategory] = useState<AdditionalCostCategory>('Service');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(1000);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [successMsg, setSuccessMsg] = useState('');

  // Calculations
  const currentCosts = bike.additionalCosts || [];
  const totalAdditionalCost = currentCosts.reduce((sum, c) => sum + c.amount, 0);

  const handleAddCost = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    const newCost: AdditionalCostItem = {
      id: `cost-${Date.now()}`,
      category,
      description: description.trim() || `${category} Charge`,
      amount: Number(amount),
      date: date || new Date().toISOString().split('T')[0]
    };

    const updatedCosts = [...currentCosts, newCost];
    const newTotal = updatedCosts.reduce((s, c) => s + c.amount, 0);

    const updatedBike: Bike = {
      ...bike,
      additionalCosts: updatedCosts,
      totalAdditionalCost: newTotal
    };

    onUpdateBike(updatedBike);
    setDescription('');
    setAmount(1000);
    setSuccessMsg(`${category} খরচ (${formatBDT(newCost.amount)}) সফলভাবে সংরক্ষণ করা হয়েছে!`);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleRemoveCost = (costId: string) => {
    const updatedCosts = currentCosts.filter((c) => c.id !== costId);
    const newTotal = updatedCosts.reduce((s, c) => s + c.amount, 0);

    const updatedBike: Bike = {
      ...bike,
      additionalCosts: updatedCosts,
      totalAdditionalCost: newTotal
    };

    onUpdateBike(updatedBike);
  };

  const categoryConfig: Record<AdditionalCostCategory, { bn: string; icon: any; colorClass: string }> = {
    Service: { bn: 'সার্ভিস', icon: Wrench, colorClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    Wash: { bn: 'ওয়াশ', icon: Droplets, colorClass: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
    Polish: { bn: 'পলিশ', icon: Sparkles, colorClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    Parts: { bn: 'পার্টস', icon: Tag, colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    Repair: { bn: 'মেরামত', icon: Wrench, colorClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    Other: { bn: 'অন্যান্য', icon: DollarSign, colorClass: 'bg-slate-700/30 text-slate-300 border-slate-600/30' }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950 text-slate-100 pb-16 font-sans">
      {/* Top Header / Navigation Bar - Strictly mobile responsive without overflow */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 w-full">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer shrink-0 shadow-sm"
              title="বাইক ডিটেইলসে ফিরে যান"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span className="hidden xs:inline">Back</span>
            </button>

            <div className="h-4 w-px bg-slate-800 shrink-0" />

            <div className="min-w-0 flex-1">
              <h1 className="text-xs sm:text-base font-bold text-white truncate leading-tight">
                Additional Cost
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate mt-0.5">
                {bike.name} {bike.regNumber ? `• ${bike.regNumber}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onBack}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md shrink-0"
            >
              Done (সম্পন্ন)
            </button>

            {/* Showroom Logo in Right Corner - Large & Prominent */}
            <div 
              className="pl-2 sm:pl-3 border-l border-slate-800 flex items-center shrink-0 cursor-pointer group"
              onClick={onBack}
              title={`${showroomName} - Showroom Logo`}
            >
              {Boolean(logoUrl && logoUrl.trim()) && !logoError ? (
                <img 
                  src={logoUrl!} 
                  alt={showroomName} 
                  onError={() => setLogoError(true)} 
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl object-cover border-2 border-cyan-500/50 shadow-md shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-400 transition-all shrink-0 bg-slate-900" 
                />
              ) : (
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-sm sm:text-base shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
                  M
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Single Card: Sudhu Eituku E (Only Additional Cost) */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6 space-y-4 w-full">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-6 shadow-xl space-y-4 w-full">
          {/* Card Header */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3 flex-wrap">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xs sm:text-base font-bold text-white truncate">
                  Additional Cost (অতিরিক্ত প্রস্তুতি ও সার্ভিস খরচ)
                </h2>
                <p className="text-[10px] sm:text-xs text-slate-400 truncate mt-0.5">
                  সার্ভিসিং, ওয়াশ, পলিশ, পার্টস বদলানোর যাবতীয় অতিরিক্ত খরচ
                </p>
              </div>
            </div>

            <div className="bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-500/30 text-xs font-mono font-bold text-cyan-400 shrink-0">
              +{formatBDT(totalAdditionalCost)}
            </div>
          </div>

          {/* Success Alert */}
          {successMsg && (
            <div className="p-2.5 sm:p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-xs text-emerald-300 animate-fade-in shadow-md">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{successMsg}</span>
            </div>
          )}

          {/* Add New Expense Form */}
          <form onSubmit={handleAddCost} className="bg-slate-950/70 p-3 sm:p-5 rounded-xl border border-slate-800 space-y-3.5 w-full">
            <div className="text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>নতুন খরচ যোগ করুন (Add New Expense)</span>
            </div>

            {/* Category Pills */}
            <div>
              <label className="text-[11px] sm:text-xs text-slate-300 font-medium block mb-1.5">
                Expense Category (খরচের ধরন) *
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
                {(['Service', 'Wash', 'Polish', 'Parts', 'Repair', 'Other'] as AdditionalCostCategory[]).map((cat) => {
                  const isSelected = category === cat;
                  const config = categoryConfig[cat];
                  const IconComponent = config.icon;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="text-[11px] truncate w-full">{config.bn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Amount and Shortcuts */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                <label className="text-[11px] sm:text-xs text-slate-300 font-medium">
                  Cost Amount (খরচের পরিমাণ ৳) *
                </label>
                <div className="flex items-center gap-1 overflow-x-auto pb-0.5 scrollbar-none flex-wrap">
                  {[500, 1000, 1500, 2500, 5000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className="px-2 py-0.5 text-[10px] sm:text-[11px] rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer"
                    >
                      {formatBDT(preset)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-2 sm:top-2.5 text-slate-400 font-mono text-sm font-bold">৳</span>
                <input
                  type="number"
                  min="1"
                  required
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="e.g. 1500"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 sm:py-2.5 text-white font-mono font-bold text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Description & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] sm:text-xs text-slate-300 font-medium block mb-1">
                  Description / Notes (কাজের বিবরণ ও নোট)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. মোবিল চেঞ্জ, নতুন ব্রেক প্যাড, পলিশ"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] sm:text-xs text-slate-300 font-medium block mb-1">
                  Expense Date (তারিখ)
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Save Additional Cost</span>
            </button>
          </form>

          {/* Saved Expenses Log List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
              <span className="font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Cost Breakdown Log (খরচের তালিকা)</span>
                <span className="bg-slate-800 text-cyan-400 px-1.5 py-0.5 rounded-full text-[10px] font-mono">
                  {currentCosts.length}
                </span>
              </span>
              <span className="text-cyan-300 font-mono font-bold text-xs sm:text-sm">
                Total: +{formatBDT(totalAdditionalCost)}
              </span>
            </div>

            {currentCosts.length === 0 ? (
              <div className="p-6 sm:p-8 text-center bg-slate-950/60 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs space-y-1.5">
                <Wrench className="w-6 h-6 mx-auto text-slate-600" />
                <p className="font-medium text-slate-400">কোনো অতিরিক্ত খরচ এখনো যুক্ত করা হয়নি।</p>
                <p className="text-[11px] text-slate-500">
                  উপরের ফর্ম থেকে বাইকটির সার্ভিসিং, পার্টস পরিবর্তন, ওয়াশ বা পলিশ খরচ এন্ট্রি করুন।
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/80 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                {currentCosts.map((item, idx) => {
                  const conf = categoryConfig[item.category] || categoryConfig.Other;
                  return (
                    <div
                      key={item.id}
                      className="p-2.5 sm:p-3.5 flex items-center justify-between gap-2.5 text-xs hover:bg-slate-900/60 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <span className="text-slate-500 font-mono text-[10px] sm:text-[11px] w-3.5 text-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold border shrink-0 ${conf.colorClass}`}>
                          {item.category}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-white font-medium truncate text-xs">
                            {item.description}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 flex items-center gap-1">
                            <Calendar className="w-3 h-3 shrink-0" />
                            <span>{item.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <span className="font-mono font-bold text-cyan-300 text-xs sm:text-sm">
                          +{formatBDT(item.amount)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCost(item.id)}
                          className="p-1 sm:p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Subtotal footer row */}
                <div className="p-3 bg-slate-950/90 flex items-center justify-between text-xs font-semibold text-slate-300 border-t border-slate-800">
                  <span className="text-[11px] sm:text-xs">মোট অতিরিক্ত খরচ:</span>
                  <span className="text-cyan-400 font-mono font-bold text-sm sm:text-base">
                    +{formatBDT(totalAdditionalCost)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
