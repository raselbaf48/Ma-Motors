import React from 'react';
import { ConditionGrade } from '../../types/bike';
import { formatBDT } from '../../utils/formatters';
import { Filter, RotateCcw, X, Check } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  selectedBrands: string[];
  maxPrice: number;
  minPrice: number;
  ccRanges: string[]; // e.g. '100-150', '155-180', '200-250', '300+'
  selectedYears: number[];
  maxMileage: number;
  conditionGrade: string; // 'ALL' | 'A+' | 'A' | 'B'
  category: string; // 'ALL' | 'Sport' | 'Cruiser' | 'Naked' | 'Tourer' | 'Commuter'
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  availableBrands: string[];
  totalResultsCount: number;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  availableBrands,
  totalResultsCount,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  const ccOptions = [
    { label: '100 - 150 cc', value: '100-150' },
    { label: '155 - 180 cc', value: '155-180' },
    { label: '200 - 250 cc', value: '200-250' },
    { label: '300 cc & Above', value: '300+' }
  ];

  const yearOptions = [2024, 2023, 2022, 2021, 2020];
  const conditionGrades: { id: string; label: string; desc: string }[] = [
    { id: 'ALL', label: 'All Grades', desc: 'Any verified bike' },
    { id: 'A+', label: 'Grade A+', desc: 'Showroom mint (<10k km)' },
    { id: 'A', label: 'Grade A', desc: 'Minor cosmetic wear' },
    { id: 'B', label: 'Grade B', desc: 'Value for money' }
  ];

  const categories = ['ALL', 'Sport', 'Cruiser', 'Naked', 'Tourer', 'Commuter'];

  const handleBrandToggle = (brand: string) => {
    const updated = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onChange({ ...filters, selectedBrands: updated });
  };

  const handleCcToggle = (range: string) => {
    const updated = filters.ccRanges.includes(range)
      ? filters.ccRanges.filter((r) => r !== range)
      : [...filters.ccRanges, range];
    onChange({ ...filters, ccRanges: updated });
  };

  const handleYearToggle = (year: number) => {
    const updated = filters.selectedYears.includes(year)
      ? filters.selectedYears.filter((y) => y !== year)
      : [...filters.selectedYears, year];
    onChange({ ...filters, selectedYears: updated });
  };

  return (
    <aside className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Filter Inventory
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
            {totalResultsCount}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Condition Grade Tabs (Interactive Buttons) */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Condition Grade
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {conditionGrades.map((g) => {
            const isSelected = filters.conditionGrade === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => onChange({ ...filters, conditionGrade: g.id })}
                className={`px-2.5 py-2 text-left rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-400 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{g.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-cyan-400" />}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 truncate">{g.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Brand Selection */}
      <div className="space-y-2.5 pt-4 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Manufacturer / Brand
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {availableBrands.map((brand) => {
            const isChecked = filters.selectedBrands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer py-1 px-1.5 rounded hover:bg-slate-800/60"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleBrandToggle(brand)}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900 cursor-pointer"
                  />
                  <span>{brand}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider in BDT */}
      <div className="space-y-2.5 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-300 uppercase tracking-wider">
            Max Asking Price (BDT)
          </label>
          <span className="font-mono font-bold text-cyan-400 tabular-nums">
            {formatBDT(filters.maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="100000"
          max="650000"
          step="10000"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-cyan-500 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>{formatBDT(100000)}</span>
          <span>{formatBDT(350000)}</span>
          <span>{formatBDT(650000)}</span>
        </div>
      </div>

      {/* CC Displacement Ranges */}
      <div className="space-y-2.5 pt-4 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Displacement (CC)
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {ccOptions.map((opt) => {
            const isSelected = filters.ccRanges.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleCcToggle(opt.value)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left transition-colors ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-500/80 text-cyan-400 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Model / Reg Year */}
      <div className="space-y-2.5 pt-4 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Model / Reg Year
        </label>
        <div className="flex items-center gap-2">
          {yearOptions.map((yr) => {
            const isSelected = filters.selectedYears.includes(yr);
            return (
              <button
                key={yr}
                type="button"
                onClick={() => handleYearToggle(yr)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-medium border text-center transition-colors ${
                  isSelected
                    ? 'bg-cyan-600 text-white border-cyan-500 font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {yr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Odometer Mileage Limit */}
      <div className="space-y-2.5 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-slate-300 uppercase tracking-wider">
            Max Odometer
          </label>
          <span className="font-mono text-slate-300 tabular-nums">
            {filters.maxMileage >= 35000 ? 'Any Mileage' : `< ${filters.maxMileage.toLocaleString()} km`}
          </span>
        </div>
        <input
          type="range"
          min="5000"
          max="35000"
          step="5000"
          value={filters.maxMileage}
          onChange={(e) => onChange({ ...filters, maxMileage: Number(e.target.value) })}
          className="w-full accent-cyan-500 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>5k km</span>
          <span>20k km</span>
          <span>35k+ km</span>
        </div>
      </div>

      {/* Category Segment Tabs */}
      <div className="space-y-2.5 pt-4 border-t border-slate-800">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Style Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onChange({ ...filters, category: cat })}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  isSelected
                    ? 'bg-cyan-600 text-white font-bold border border-cyan-500'
                    : 'text-slate-400 hover:text-white bg-slate-800/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
