import React, { useState, useEffect, useRef } from 'react';
import { Bike } from '../../types/bike';
import { BikeVisual } from '../common/BikeVisual';
import { formatBDT } from '../../utils/formatters';
import { 
  CheckCircle2, 
  Layers, 
  Gauge, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  FileCheck
} from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
  onSelect: (bike: Bike) => void;
  onCompareToggle: (bike: Bike) => void;
  isCompared: boolean;
  onQuickInquire?: (bike: Bike) => void;
  layout?: 'grid' | 'list';
}

export const BikeCard: React.FC<BikeCardProps> = ({
  bike,
  onSelect,
  onCompareToggle,
  isCompared,
  onQuickInquire,
  layout = 'grid'
}) => {
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '40px 0px 40px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const effectivePrice = bike.askingPrice || bike.price || 0;
  // Approximate 24-month EMI with 20% down payment and ~10% annual interest
  const downPayment = Math.round(effectivePrice * 0.2);
  const principal = effectivePrice - downPayment;
  const monthlyRate = 0.10 / 12;
  const tenure = 24;
  const emi = Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1));

  if (layout === 'list') {
    return (
      <div 
        ref={cardRef}
        className={`bg-slate-900/80 border border-slate-800/90 rounded-xl overflow-hidden hover:border-slate-700 transition-all duration-500 ease-out flex flex-col sm:flex-row group ${
          hasEnteredView ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-3'
        }`}
      >
        {/* Left Visual */}
        <div 
          onClick={() => onSelect(bike)}
          className="sm:w-72 shrink-0 cursor-pointer relative"
        >
          <BikeVisual bike={bike} aspect="4/3" />
        </div>

        {/* Right Info */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                {bike.brand} · {bike.model} · {bike.category}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Score: {bike.inspection.overallScore}/100</span>
              </div>
            </div>

            <h3 
              onClick={() => onSelect(bike)}
              className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {bike.name}
            </h3>

            {/* Registration & Model details */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mt-2 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                MFG {bike.mfgYear || bike.year} · Reg {bike.regYear || bike.year}
              </span>
              <span>·</span>
              <span className={`px-1.5 py-0.5 rounded border text-[11px] font-mono ${
                bike.regNumber === 'ON TEST'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'text-slate-300 font-medium bg-slate-800/80 border-slate-700/60'
              }`}>
                {bike.regNumber || 'ON TEST'}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-slate-500" />
                {bike.mileageKm.toLocaleString()} km
              </span>
              <span>·</span>
              <span>{bike.cc} cc</span>
              {bike.fuelSupply && (
                <>
                  <span>·</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    bike.fuelSupply === 'Carburetor' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' :
                    bike.fuelSupply === 'Electric' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                    'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {bike.fuelSupply === 'Carburetor' ? 'Carb' : bike.fuelSupply}
                  </span>
                </>
              )}
              {bike.documentPdfName && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <FileCheck className="w-3.5 h-3.5" />
                    PDF Doc Verified
                  </span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-400 line-clamp-1 mt-2">
              {bike.inspection.scratchesNotes}
            </p>
          </div>

          <div className="pt-4 mt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-white tabular-nums">
                  {formatBDT(effectivePrice)}
                </span>
                {bike.originalPrice > effectivePrice && (
                  <span className="text-xs font-mono line-through text-slate-500">
                    {formatBDT(bike.originalPrice)}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-cyan-400 font-mono">
                EMI from {formatBDT(emi)}/mo (24m)
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onCompareToggle(bike);
                }}
                className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                  isCompared
                    ? 'bg-cyan-950/70 border-cyan-500/60 text-cyan-400'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                }`}
                title={isCompared ? 'Remove from comparison' : 'Add to compare'}
              >
                <Layers className="w-4 h-4" />
              </button>

              {onQuickInquire && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickInquire(bike);
                  }}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Book Test Ride
                </button>
              )}

              <button
                type="button"
                onClick={() => onSelect(bike)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-sm transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div 
      ref={cardRef}
      className={`bg-slate-900/90 border border-slate-800/90 rounded-xl overflow-hidden hover:border-slate-700/80 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-500 ease-out flex flex-col group ${
        hasEnteredView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-30 translate-y-4 scale-[0.98]'
      }`}
    >
      {/* Top Image Artwork */}
      <div 
        onClick={() => onSelect(bike)} 
        className="cursor-pointer relative overflow-hidden"
      >
        <BikeVisual bike={bike} aspect="4/3" />
      </div>

      {/* Body Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Clean Unboxed Text with Separators */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>{bike.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <span>{bike.cc} cc</span>
              {bike.fuelSupply && (
                <span className={`px-1 py-0.2 rounded text-[9px] font-bold ${
                  bike.fuelSupply === 'Carburetor' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' :
                  bike.fuelSupply === 'Electric' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                  'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                }`}>
                  {bike.fuelSupply === 'Carburetor' ? 'Carb' : bike.fuelSupply}
                </span>
              )}
            </span>
            <span aria-hidden="true">·</span>
            <span>MFG {bike.mfgYear || bike.year}</span>
          </div>

          {/* Bike Title */}
          <h3 
            onClick={() => onSelect(bike)}
            className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1"
            title={bike.name}
          >
            {bike.name}
          </h3>

          <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className={`px-1.5 py-0.5 rounded border ${
              bike.regNumber === 'ON TEST'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                : 'bg-slate-800 text-slate-300 border-slate-700/60'
            }`}>
              {bike.regNumber || 'ON TEST'}
            </span>
            <span className="text-slate-400">{bike.regNumber === 'ON TEST' ? 'On Test' : `Reg: ${bike.regYear || bike.year}`}</span>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800/70 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Gauge className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="font-mono">{bike.mileageKm.toLocaleString()} km</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-mono">{bike.warrantyMonths}m Warranty</span>
            </div>
          </div>
        </div>

        {/* Price & Action Area */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold font-mono text-white tabular-nums">
                {formatBDT(effectivePrice)}
              </span>
              {bike.originalPrice > effectivePrice && (
                <span className="text-xs font-mono line-through text-slate-500">
                  {formatBDT(bike.originalPrice)}
                </span>
              )}
            </div>
            <div className="text-[11px] text-cyan-400 font-mono">
              EMI from {formatBDT(emi)}/mo
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle(bike);
              }}
              className={`p-2 rounded-lg text-xs font-medium border transition-colors ${
                isCompared
                  ? 'bg-cyan-950/70 border-cyan-500/60 text-cyan-400'
                  : 'bg-slate-800/80 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
              title={isCompared ? 'Remove from comparison' : 'Compare this bike'}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onSelect(bike)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
