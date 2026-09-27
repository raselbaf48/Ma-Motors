import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BrandCard } from './BrandCard';
import { Bike } from '../../types/bike';

interface ShopByBrandsProps {
  brands: string[];
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
  bikes: Bike[];
}

export const ShopByBrands: React.FC<ShopByBrandsProps> = ({
  brands,
  selectedBrand,
  onSelectBrand,
  bikes
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Popular motorcycle brands priority ordering as in Bangladesh showrooms
  const priorityOrder = [
    'ALL',
    'Honda',
    'KTM',
    'Yamaha',
    'Suzuki',
    'Hero',
    'Royal Enfield',
    'Bajaj',
    'TVS',
    'Kawasaki',
    'Lifan'
  ];

  // Combine inventory brands with all popular showroom brands
  const allBrandsSet = new Set(['ALL', ...priorityOrder.slice(1), ...brands]);
  const sortedBrands = Array.from(allBrandsSet).sort((a, b) => {
    const idxA = priorityOrder.findIndex((p) => p.toLowerCase() === a.toLowerCase());
    const idxB = priorityOrder.findIndex((p) => p.toLowerCase() === b.toLowerCase());
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-3.5 my-2">
      {/* Section Header with Left/Right Scroll Arrows */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Shop By Brands</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            আপনার পছন্দের সেরা ব্র্যান্ড সিলেক্ট করে বাইক খুঁজুন
          </p>
        </div>

        {/* Circular Scroll Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            aria-label="Scroll left"
            title="Previous brands"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            aria-label="Scroll right"
            title="Next brands"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Brand Cards Row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {sortedBrands.map((brand) => {
          const isSelected = selectedBrand.toLowerCase() === brand.toLowerCase();
          const count = brand === 'ALL'
            ? bikes.filter((b) => b.status !== 'Sold').length
            : bikes.filter((b) => b.brand.toLowerCase() === brand.toLowerCase() && b.status !== 'Sold').length;

          // Look if any bike of this brand has a custom brandLogoUrl
          const customLogo = bikes.find(
            (b) => b.brand.toLowerCase() === brand.toLowerCase() && b.brandLogoUrl
          )?.brandLogoUrl;

          return (
            <BrandCard
              key={brand}
              brand={brand}
              isSelected={isSelected}
              onClick={() => onSelectBrand(brand)}
              count={count}
              customLogoUrl={customLogo}
            />
          );
        })}
      </div>
    </div>
  );
};
