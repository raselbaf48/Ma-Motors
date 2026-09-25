import React, { useState } from 'react';
import { ActivePage } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { 
  Calculator, 
  ArrowRight, 
  DollarSign, 
  Percent, 
  Calendar, 
  ShieldCheck, 
  FileText,
  CheckCircle2,
  PieChart
} from 'lucide-react';

interface EmiCalculatorPageProps {
  onNavigate: (page: ActivePage) => void;
  onFilterByBudget?: (maxPrice: number) => void;
}

export const EmiCalculatorPage: React.FC<EmiCalculatorPageProps> = ({
  onNavigate,
  onFilterByBudget
}) => {
  const [vehiclePrice, setVehiclePrice] = useState(320000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [tenureMonths, setTenureMonths] = useState(24);
  const [annualRate, setAnnualRate] = useState(9.5);

  const downPaymentAmount = Math.round((vehiclePrice * downPaymentPercent) / 100);
  const principal = Math.max(0, vehiclePrice - downPaymentAmount);

  const monthlyRate = annualRate / 100 / 12;
  const emi = tenureMonths > 0 && principal > 0
    ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1))
    : 0;

  const totalAmountPayable = Math.round(emi * tenureMonths);
  const totalInterest = Math.max(0, totalAmountPayable - principal);

  const principalShare = totalAmountPayable > 0 ? Math.round((principal / totalAmountPayable) * 100) : 100;
  const interestShare = 100 - principalShare;

  const handleBrowseBikes = () => {
    if (onFilterByBudget) {
      onFilterByBudget(vehiclePrice);
    }
    onNavigate('inventory');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Top Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Calculator className="w-3.5 h-3.5" />
          <span>Transparent Automotive Financing Calculator (BDT ৳)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Motorcycle EMI & Monthly Installment Estimator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Calculate your exact monthly payments in Bangladeshi Taka (৳), total interest breakdown, and explore flexible financing with our certified partner banks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Card (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <h2 className="text-base font-bold text-white font-display flex items-center justify-between">
            <span>Loan Parameters (BDT ৳)</span>
            <span className="text-xs font-mono text-slate-400 font-normal">Zero Hidden Documentation Charges</span>
          </h2>

          {/* 1. Bike Price */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300 uppercase tracking-wider">
                Motorcycle Price (৳ BDT)
              </label>
              <div className="flex items-center gap-1 font-mono font-bold text-white text-base">
                <span className="text-cyan-400">৳</span>
                <input
                  type="number"
                  step="5000"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Math.max(50000, Number(e.target.value)))}
                  className="w-32 bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-right text-cyan-400 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="650000"
              step="5000"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>{formatBDT(100000)}</span>
              <span>{formatBDT(350000)}</span>
              <span>{formatBDT(650000)}</span>
            </div>
          </div>

          {/* 2. Down Payment */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300 uppercase tracking-wider">
                Down Payment ({downPaymentPercent}%)
              </label>
              <span className="font-mono font-bold text-emerald-400 text-sm">
                {formatBDT(downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>10% ({formatBDT(Math.round(vehiclePrice * 0.1))})</span>
              <span>30%</span>
              <span>60% ({formatBDT(Math.round(vehiclePrice * 0.6))})</span>
            </div>
          </div>

          {/* 3. Loan Tenure Months */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300 uppercase tracking-wider">
                Loan Tenure (Repayment Duration)
              </label>
              <span className="font-mono font-bold text-cyan-400 text-sm">
                {tenureMonths} Months ({tenureMonths / 12} {tenureMonths / 12 === 1 ? 'Year' : 'Years'})
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[12, 24, 36, 48, 60].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenureMonths(t)}
                  className={`py-2 rounded-lg text-xs font-mono font-bold border transition-colors ${
                    tenureMonths === t
                      ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {t}m
                </button>
              ))}
            </div>
          </div>

          {/* 4. Interest Rate */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-slate-300 uppercase tracking-wider">
                Annual Interest Rate (Bank Partner)
              </label>
              <span className="font-mono font-bold text-white text-sm">
                {annualRate.toFixed(1)}% p.a.
              </span>
            </div>
            <input
              type="range"
              min="7.0"
              max="16.0"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>7.0% (Prime Bank)</span>
              <span>9.5% (Standard)</span>
              <span>16.0% (Finance Co)</span>
            </div>
          </div>
        </div>

        {/* Right Output Visualizer Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-1 pb-4 border-b border-slate-800">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Your Monthly EMI (BDT)
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tabular-nums">
              {formatBDT(emi)}
              <span className="text-sm font-normal text-slate-400 font-sans"> / mo</span>
            </div>
            <div className="text-xs text-cyan-400 font-mono">
              For {tenureMonths} monthly installments
            </div>
          </div>

          {/* Visual Progress Bar (Principal vs Interest) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400">Principal: {principalShare}%</span>
              <span className="text-amber-400">Interest: {interestShare}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden flex border border-slate-800">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${principalShare}%` }}
              />
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${interestShare}%` }}
              />
            </div>
          </div>

          {/* Detailed Financial Summary Table */}
          <div className="space-y-2 text-xs divide-y divide-slate-800 font-mono">
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Loan Principal Amount:</span>
              <span className="text-white font-bold">{formatBDT(principal)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Down Payment Paid:</span>
              <span className="text-emerald-400 font-bold">{formatBDT(downPaymentAmount)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Total Interest Payable:</span>
              <span className="text-amber-400 font-bold">{formatBDT(totalInterest)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-sm">
              <span className="text-slate-200">Total Amount Payable:</span>
              <span className="text-white">{formatBDT(totalAmountPayable)}</span>
            </div>
          </div>

          {/* CTA Action */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleBrowseBikes}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-1.5"
            >
              <span>Explore Bikes in this Budget ({formatBDT(vehiclePrice)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] text-slate-500 text-center">
              Approvals within 4 business hours with certified national bank partners in Bangladesh.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
