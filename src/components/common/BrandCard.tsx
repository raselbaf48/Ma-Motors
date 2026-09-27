import React, { useState } from 'react';
import { resolveBrandLogo } from '../../utils/brandLogos';

interface BrandCardProps {
  brand: string;
  isSelected: boolean;
  onClick: () => void;
  count?: number;
  customLogoUrl?: string;
}

export const BrandCard: React.FC<BrandCardProps> = ({
  brand,
  isSelected,
  onClick,
  count,
  customLogoUrl
}) => {
  const norm = (brand || '').trim().toLowerCase();
  const isAll = norm === 'all' || norm.includes('all');
  const [imgError, setImgError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const brandInfo = resolveBrandLogo(brand, customLogoUrl);
  const currentSrc = useFallback
    ? (brandInfo.fallback || brandInfo.src)
    : (brandInfo.src || brandInfo.fallback);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 w-36 sm:w-44 h-24 sm:h-28 rounded-2xl p-3 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center relative select-none group ${
        isSelected
          ? 'bg-white ring-4 ring-cyan-400 border-2 border-cyan-500 shadow-xl shadow-cyan-500/25 scale-[1.03]'
          : 'bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:shadow-md hover:scale-[1.02]'
      }`}
    >
      {/* Active check indicator badge */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow">
          <svg className="w-2.5 h-2.5 stroke-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}

      {/* Main Logo Container */}
      <div className="flex-1 flex items-center justify-center w-full px-2 py-1">
        {isAll ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-cyan-400 mb-1 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <span className="text-[11px] font-black tracking-wider text-slate-900 uppercase font-display">
              ALL BRANDS
            </span>
          </div>
        ) : currentSrc && !imgError ? (
          <img
            src={currentSrc}
            alt={brand}
            onError={() => {
              if (!useFallback && brandInfo.fallback) {
                setUseFallback(true);
              } else {
                setImgError(true);
              }
            }}
            className="max-h-12 sm:max-h-14 max-w-[85%] object-contain filter drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-sm sm:text-base font-black tracking-wider text-slate-900 uppercase font-display px-2 py-1 rounded bg-slate-100 border border-slate-300">
              {brand}
            </span>
          </div>
        )}
      </div>

      {count !== undefined && count > 0 && (
        <span className="text-[9px] font-mono font-bold text-slate-400 group-hover:text-slate-600">
          {count} {count === 1 ? 'Bike' : 'Bikes'}
        </span>
      )}
    </button>
  );
};
