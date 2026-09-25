import React from 'react';
import { Bike } from '../../types/bike';
import { Layers, X, ArrowRight } from 'lucide-react';

interface CompareFloatingBarProps {
  comparedBikes: Bike[];
  onRemoveBike: (bikeId: string) => void;
  onClearAll: () => void;
  onLaunchCompare: () => void;
}

export const CompareFloatingBar: React.FC<CompareFloatingBarProps> = ({
  comparedBikes,
  onRemoveBike,
  onClearAll,
  onLaunchCompare
}) => {
  if (comparedBikes.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl p-3 backdrop-blur-md animate-slide-up">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Compare Tray</span>
              <span className="text-[10px] font-mono text-cyan-400">
                ({comparedBikes.length}/3 selected)
              </span>
            </div>
            <div className="text-[10px] text-slate-400 hidden sm:block">
              Side-by-side specs, power, and condition
            </div>
          </div>
        </div>

        {/* Selected Bikes preview pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {comparedBikes.map((bike) => (
            <div
              key={bike.id}
              className="flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200"
            >
              <span className="font-medium truncate max-w-[100px] sm:max-w-[130px]">
                {bike.name}
              </span>
              <button
                onClick={() => onRemoveBike(bike.id)}
                className="p-0.5 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                title="Remove from comparison"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearAll}
            className="text-[11px] text-slate-400 hover:text-white px-2 py-1"
          >
            Clear
          </button>
          <button
            onClick={onLaunchCompare}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-600/30 transition-colors"
          >
            <span>Compare</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
