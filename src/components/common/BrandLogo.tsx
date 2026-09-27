import React, { useState } from 'react';
import { resolveBrandLogo } from '../../utils/brandLogos';

interface BrandLogoProps {
  brand: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  customLogoUrl?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  brand,
  className = '',
  size = 'md',
  customLogoUrl
}) => {
  const norm = (brand || '').trim().toLowerCase();
  const [imgError, setImgError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const dimensions = size === 'sm' ? 'w-5 h-4' : size === 'lg' ? 'w-9 h-7' : 'w-7 h-5';

  if (norm === 'all' || norm.includes('all')) {
    return (
      <div className={`${dimensions} rounded bg-slate-900 flex items-center justify-center text-cyan-400 shrink-0 ${className}`}>
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </div>
    );
  }

  const brandInfo = resolveBrandLogo(brand, customLogoUrl);
  const currentSrc = useFallback
    ? (brandInfo.fallback || brandInfo.src)
    : (brandInfo.src || brandInfo.fallback);

  if (currentSrc && !imgError) {
    return (
      <div className={`p-0.5 rounded bg-white shrink-0 flex items-center justify-center ${dimensions} ${className}`}>
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
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`${dimensions} rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-white uppercase shrink-0 ${className}`}>
      {brand.slice(0, 2)}
    </div>
  );
};
