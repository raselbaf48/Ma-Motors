import React, { useState, useMemo } from 'react';
import { Bike, ActivePage } from '../types/bike';
import { BikeCard } from '../components/bike/BikeCard';
import { FilterSidebar, FilterState } from '../components/bike/FilterSidebar';
import { formatBDT } from '../utils/formatters';
import { 
  LayoutGrid, 
  List, 
  Search, 
  SlidersHorizontal, 
  X, 
  ArrowUpDown, 
  RotateCcw,
  Sparkles,
  Bike as BikeIcon
} from 'lucide-react';

interface BikeListingPageProps {
  bikes: Bike[];
  onSelectBike: (bike: Bike) => void;
  onCompareToggle: (bike: Bike) => void;
  isCompared: (bikeId: string) => boolean;
  onQuickInquire: (bike: Bike) => void;
  initialFilters?: Partial<FilterState>;
}

export const BikeListingPage: React.FC<BikeListingPageProps> = ({
  bikes,
  onSelectBike,
  onCompareToggle,
  isCompared,
  onQuickInquire,
  initialFilters
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc' | 'cc-desc'>('featured');

  const defaultFilters: FilterState = {
    searchQuery: '',
    selectedBrands: [],
    maxPrice: 650000,
    minPrice: 100000,
    ccRanges: [],
    selectedYears: [],
    maxMileage: 35000,
    conditionGrade: 'ALL',
    category: 'ALL',
    ...initialFilters
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const availableBrands = useMemo(() => {
    return Array.from(new Set(bikes.map((b) => b.brand))).sort();
  }, [bikes]);

  // Filter & Sort Logic
  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {
      const bikePrice = bike.askingPrice || bike.price;

      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = bike.name.toLowerCase().includes(query);
        const matchesBrand = bike.brand.toLowerCase().includes(query);
        const matchesModel = bike.model.toLowerCase().includes(query);
        const matchesReg = bike.regNumber?.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesModel && !matchesReg) return false;
      }

      // Brand filter
      if (filters.selectedBrands.length > 0) {
        if (!filters.selectedBrands.includes(bike.brand)) return false;
      }

      // Price filter in BDT
      if (bikePrice > filters.maxPrice) return false;

      // CC Ranges
      if (filters.ccRanges.length > 0) {
        const matchesAnyCc = filters.ccRanges.some((range) => {
          if (range === '100-150') return bike.cc >= 100 && bike.cc <= 150;
          if (range === '155-180') return bike.cc >= 155 && bike.cc <= 180;
          if (range === '200-250') return bike.cc >= 200 && bike.cc <= 250;
          if (range === '300+') return bike.cc >= 300;
          return true;
        });
        if (!matchesAnyCc) return false;
      }

      // Year filter (matches mfgYear or regYear)
      if (filters.selectedYears.length > 0) {
        const bikeMfg = bike.mfgYear || bike.year;
        const bikeReg = bike.regYear || bike.year;
        if (!filters.selectedYears.includes(bikeMfg) && !filters.selectedYears.includes(bikeReg)) return false;
      }

      // Mileage filter
      if (bike.mileageKm > filters.maxMileage) return false;

      // Condition Grade
      if (filters.conditionGrade !== 'ALL') {
        if (bike.conditionGrade !== filters.conditionGrade) return false;
      }

      // Category
      if (filters.category !== 'ALL') {
        if (bike.category !== filters.category) return false;
      }

      return true;
    });
  }, [bikes, filters]);

  // Sort logic
  const sortedBikes = useMemo(() => {
    const list = [...filteredBikes];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => (a.askingPrice || a.price) - (b.askingPrice || b.price));
      case 'price-desc':
        return list.sort((a, b) => (b.askingPrice || b.price) - (a.askingPrice || a.price));
      case 'year-desc':
        return list.sort((a, b) => (b.regYear || b.year) - (a.regYear || a.year));
      case 'mileage-asc':
        return list.sort((a, b) => a.mileageKm - b.mileageKm);
      case 'cc-desc':
        return list.sort((a, b) => b.cc - a.cc);
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredBikes, sortBy]);

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedBrands: [],
      maxPrice: 650000,
      minPrice: 100000,
      ccRanges: [],
      selectedYears: [],
      maxMileage: 35000,
      conditionGrade: 'ALL',
      category: 'ALL'
    });
  };

  const removeBrandFilter = (brand: string) => {
    setFilters({
      ...filters,
      selectedBrands: filters.selectedBrands.filter((b) => b !== brand)
    });
  };

  const activeFiltersCount = 
    (filters.searchQuery ? 1 : 0) +
    filters.selectedBrands.length +
    filters.ccRanges.length +
    filters.selectedYears.length +
    (filters.maxPrice < 650000 ? 1 : 0) +
    (filters.maxMileage < 35000 ? 1 : 0) +
    (filters.conditionGrade !== 'ALL' ? 1 : 0) +
    (filters.category !== 'ALL' ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Live Showroom Floor · Dhaka
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
            Pre-Owned & Recondition Bikes (BDT)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Showing <span className="text-white font-semibold font-mono">{sortedBikes.length}</span> of {bikes.length} verified motorcycles available for immediate delivery
          </p>
        </div>

        {/* Search Input bar on Top */}
        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              placeholder="Search brand, model, Reg no..."
              className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters({ ...filters, searchQuery: '' })}
                className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-20">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            availableBrands={availableBrands}
            totalResultsCount={sortedBikes.length}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 lg:hidden">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                onReset={handleResetFilters}
                availableBrands={availableBrands}
                totalResultsCount={sortedBikes.length}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setMobileFilterOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Right Content Area (9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          {/* Controls Bar: Mobile filter trigger, Active tags, Sort, View mode toggle */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-xs font-semibold text-white rounded-lg border border-slate-700"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-slate-800 text-cyan-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-slate-800 text-cyan-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                {sortedBikes.length} Bikes in BDT
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 hidden sm:inline">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Asking Price: Low to High (BDT)</option>
                <option value="price-desc">Asking Price: High to Low (BDT)</option>
                <option value="year-desc">Newest Reg Year</option>
                <option value="mileage-asc">Lowest Mileage</option>
                <option value="cc-desc">Highest Engine CC</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags Row */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-500 text-[11px]">Active Filters:</span>

              {filters.selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs"
                >
                  <span>{b}</span>
                  <button
                    onClick={() => removeBrandFilter(b)}
                    className="hover:text-cyan-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {filters.conditionGrade !== 'ALL' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs">
                  <span>Grade {filters.conditionGrade}</span>
                  <button
                    onClick={() => setFilters({ ...filters, conditionGrade: 'ALL' })}
                    className="hover:text-cyan-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.maxPrice < 650000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs">
                  <span>Max {formatBDT(filters.maxPrice)}</span>
                  <button
                    onClick={() => setFilters({ ...filters, maxPrice: 650000 })}
                    className="hover:text-cyan-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-[11px] text-cyan-400 hover:underline font-medium ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Bikes Result Grid / List */}
          {sortedBikes.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <BikeIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">No Matching Motorcycles Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price range, clearing brand selections, or resetting the filters to view all available showroom bikes.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {sortedBikes.map((bike) => (
                <BikeCard
                  key={bike.id}
                  bike={bike}
                  onSelect={onSelectBike}
                  onCompareToggle={onCompareToggle}
                  isCompared={isCompared(bike.id)}
                  onQuickInquire={onQuickInquire}
                  layout="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedBikes.map((bike) => (
                <BikeCard
                  key={bike.id}
                  bike={bike}
                  onSelect={onSelectBike}
                  onCompareToggle={onCompareToggle}
                  isCompared={isCompared(bike.id)}
                  onQuickInquire={onQuickInquire}
                  layout="list"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
