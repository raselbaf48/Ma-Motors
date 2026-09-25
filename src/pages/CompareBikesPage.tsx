import React, { useState } from 'react';
import { Bike, ActivePage } from '../types/bike';
import { BikeVisual } from '../components/common/BikeVisual';
import { formatBDT } from '../utils/formatters';
import { 
  Layers, 
  X, 
  Plus, 
  Check, 
  ShieldCheck, 
  ArrowRight,
  RotateCcw,
  FileText
} from 'lucide-react';

interface CompareBikesPageProps {
  comparedBikes: Bike[];
  allBikes: Bike[];
  onRemoveBike: (bikeId: string) => void;
  onAddBike: (bike: Bike) => void;
  onClearAll: () => void;
  onSelectBike: (bike: Bike) => void;
  onOpenInquiry: (bike: Bike) => void;
  onNavigate: (page: ActivePage) => void;
}

export const CompareBikesPage: React.FC<CompareBikesPageProps> = ({
  comparedBikes,
  allBikes,
  onRemoveBike,
  onAddBike,
  onClearAll,
  onSelectBike,
  onOpenInquiry,
  onNavigate
}) => {
  const [selectorSlot, setSelectorSlot] = useState<number | null>(null);

  const availableToAdd = allBikes.filter(
    (b) => !comparedBikes.some((cb) => cb.id === b.id)
  );

  // If empty, suggest adding bikes or navigating to inventory
  if (comparedBikes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-slate-900 border border-slate-800 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
          <Layers className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Compare Motorcycles Side-by-Side (BDT)
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            You haven't selected any bikes to compare yet. Add up to 3 models from our showroom inventory to evaluate specifications, BRTA registration numbers, and BDT prices.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onNavigate('inventory')}
            className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Browse Inventory & Compare
          </button>
        </div>

        {/* Quick Suggestions to Compare */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="text-xs font-mono uppercase text-slate-400 mb-4">
            Or Click to Start Comparing Popular Dhaka Picks:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allBikes.slice(0, 3).map((b) => (
              <div
                key={b.id}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-cyan-400 font-mono">{b.brand} · {b.cc} cc</div>
                  <div className="text-sm font-bold text-white mt-1">{b.name}</div>
                  <div className="text-xs font-mono text-emerald-400 mt-2 font-bold">{formatBDT(b.askingPrice || b.price)}</div>
                </div>
                <button
                  onClick={() => onAddBike(b)}
                  className="mt-4 w-full py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-cyan-600 flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Compare</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Spec comparison metrics
  const comparisonRows = [
    { label: 'Asking Price (বিক্রয় মূল্য)', render: (b: Bike) => formatBDT(b.askingPrice || b.price) },
    { label: 'Buying Price (ক্রয় মূল্য)', render: (b: Bike) => formatBDT(b.buyingPrice || Math.round((b.askingPrice || b.price) * 0.82)) },
    { label: 'Brand & Model', render: (b: Bike) => `${b.brand} ${b.model || b.name}` },
    { label: 'MFG Year (তৈরি)', render: (b: Bike) => b.mfgYear || b.year },
    { label: 'Reg Year (রেজিস্ট্রেশন)', render: (b: Bike) => b.regYear || b.year },
    { label: 'Reg Number (নাম্বার)', render: (b: Bike) => b.regNumber || b.inspection.registrationNumber },
    { label: 'Document (PDF)', render: (b: Bike) => b.documentPdfName ? `Verified PDF (${b.documentPdfName})` : 'Clear BRTA Docs' },
    { label: 'Condition Grade', render: (b: Bike) => `Grade ${b.conditionGrade} (${b.conditionLabel})` },
    { label: '50-Pt Inspection Score', render: (b: Bike) => `${b.inspection.overallScore} / 100` },
    { label: 'Engine Health Rating', render: (b: Bike) => `${b.inspection.engineHealth}% Verified` },
    { label: 'Displacement (CC)', render: (b: Bike) => `${b.cc} cc` },
    { label: 'Max Power', render: (b: Bike) => b.specs.maxPower },
    { label: 'Max Torque', render: (b: Bike) => b.specs.maxTorque },
    { label: 'Odometer Mileage', render: (b: Bike) => `${b.mileageKm.toLocaleString()} km` },
    { label: 'Top Speed', render: (b: Bike) => b.specs.topSpeed },
    { label: 'Brakes & ABS', render: (b: Bike) => b.specs.absType },
    { label: 'Fuel Tank Capacity', render: (b: Bike) => b.specs.fuelTankCapacity },
    { label: 'Warranty Included', render: (b: Bike) => `${b.warrantyMonths} Months Mechanical` }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Spec Comparison
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
            Compare Motorcycles ({comparedBikes.length}/3)
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
          <button
            onClick={() => onNavigate('inventory')}
            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700"
          >
            Back to Inventory
          </button>
        </div>
      </div>

      {/* Comparison Table Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            {/* Sticky Cards Header */}
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80">
                <th className="p-4 w-48 text-xs font-mono text-slate-400 uppercase tracking-wider align-bottom">
                  Vehicle Specs & Identification
                </th>

                {/* Compared Bike Headers */}
                {comparedBikes.map((bike) => (
                  <th key={bike.id} className="p-4 w-72 align-top">
                    <div className="space-y-3">
                      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                        <BikeVisual bike={bike} aspect="16/9" />
                        <button
                          onClick={() => onRemoveBike(bike.id)}
                          className="absolute top-2 right-2 p-1 bg-slate-950/80 rounded-full text-slate-400 hover:text-cyan-400 border border-slate-800"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <div className="text-[11px] font-mono text-cyan-400 font-semibold">{bike.brand}</div>
                        <div 
                          onClick={() => onSelectBike(bike)}
                          className="text-sm font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer truncate"
                          title={bike.name}
                        >
                          {bike.name}
                        </div>
                        <div className="text-base font-bold font-mono text-white mt-1">
                          {formatBDT(bike.askingPrice || bike.price)}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {bike.regNumber || bike.inspection.registrationNumber}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onOpenInquiry(bike)}
                          className="flex-1 py-1.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors text-center"
                        >
                          Inquire / Test Ride
                        </button>
                      </div>
                    </div>
                  </th>
                ))}

                {/* Empty slot placeholder (if < 3 bikes) */}
                {comparedBikes.length < 3 && (
                  <th className="p-4 w-72 align-middle">
                    <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center space-y-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-300">
                        Add Another Bike
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Select a model to compare side-by-side
                      </p>

                      <select
                        onChange={(e) => {
                          const chosen = allBikes.find((b) => b.id === e.target.value);
                          if (chosen) onAddBike(chosen);
                          e.target.value = '';
                        }}
                        defaultValue=""
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                      >
                        <option value="" disabled>Choose motorcycle...</option>
                        {availableToAdd.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name} ({formatBDT(b.askingPrice || b.price)})
                          </option>
                        ))}
                      </select>
                    </div>
                  </th>
                )}
              </tr>
            </thead>

            {/* Spec Rows */}
            <tbody className="divide-y divide-slate-800/70 text-xs">
              {comparisonRows.map((row, index) => (
                <tr
                  key={row.label}
                  className={index % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/20'}
                >
                  <td className="p-3.5 font-semibold text-slate-400 bg-slate-950/40">
                    {row.label}
                  </td>
                  {comparedBikes.map((bike) => (
                    <td key={bike.id} className="p-3.5 text-slate-200 font-mono">
                      {row.render(bike)}
                    </td>
                  ))}
                  {comparedBikes.length < 3 && (
                    <td className="p-3.5 text-slate-600 text-center font-mono">
                      —
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
