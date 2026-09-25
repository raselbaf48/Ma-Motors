import React, { useState } from 'react';
import { Bike } from '../types/bike';
import { BikeVisual } from '../components/common/BikeVisual';
import { BikeCard } from '../components/bike/BikeCard';
import { formatBDT } from '../utils/formatters';
import { 
  ShieldCheck, 
  Layers, 
  FileCheck, 
  Phone, 
  MessageCircle, 
  Download, 
  Calendar, 
  Gauge, 
  Award, 
  Check, 
  ChevronRight, 
  ArrowLeft,
  Calculator,
  Sliders,
  Sparkles,
  Info,
  FileText,
  Eye,
  ExternalLink,
  Tag,
  User
} from 'lucide-react';

interface BikeDetailsPageProps {
  bike: Bike;
  allBikes: Bike[];
  onBack: () => void;
  onSelectBike: (bike: Bike) => void;
  onCompareToggle: (bike: Bike) => void;
  isCompared: boolean;
  onOpenInquiry: (bike: Bike, type?: 'Test Ride' | 'Purchase Inquiry' | 'EMI Financing') => void;
}

export const BikeDetailsPage: React.FC<BikeDetailsPageProps> = ({
  bike,
  allBikes,
  onBack,
  onSelectBike,
  onCompareToggle,
  isCompared,
  onOpenInquiry
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'inspection' | 'documents'>('details');
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const effectiveAskingPrice = bike.askingPrice || bike.price || 0;
  const effectiveBuyingPrice = bike.buyingPrice || Math.round(effectiveAskingPrice * 0.82);

  // Interactive Mini EMI Estimator state (in BDT)
  const [downPayment, setDownPayment] = useState(Math.round(effectiveAskingPrice * 0.25));
  const [tenureMonths, setTenureMonths] = useState(24);
  const annualInterestRate = 0.095; // 9.5%

  const principal = Math.max(0, effectiveAskingPrice - downPayment);
  const monthlyRate = annualInterestRate / 12;
  const estimatedEmi = tenureMonths > 0 && principal > 0
    ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1))
    : 0;

  // Similar bikes
  const similarBikes = allBikes
    .filter((b) => b.id !== bike.id && (b.brand === bike.brand || b.category === bike.category))
    .slice(0, 3);

  const photoLabels = [
    '3/4 Dynamic Profile',
    'Cockpit & Digital Console',
    'Engine Block & Headers',
    'Rear Swingarm & Disc'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button onClick={onBack} className="hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Inventory</span>
        </button>
        <span>/</span>
        <span>{bike.brand}</span>
        <span>/</span>
        <span className="text-slate-200 font-semibold truncate">{bike.name}</span>
      </div>

      {/* Main Hero Showcase: Gallery Left + Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
            <BikeVisual bike={bike} aspect="16/9" />

            {/* Photo perspective label */}
            <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md border border-slate-800 px-2.5 py-1 rounded text-[11px] text-slate-300 font-mono">
              View {activePhotoIndex + 1}/4: {photoLabels[activePhotoIndex]}
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={() => onCompareToggle(bike)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-md border transition-colors ${
                  isCompared
                    ? 'bg-cyan-950/80 border-cyan-500 text-cyan-400'
                    : 'bg-slate-900/80 border-slate-700 text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
              </button>
            </div>
          </div>

          {/* Gallery Thumbnails Strip */}
          <div className="grid grid-cols-4 gap-2.5">
            {photoLabels.map((label, idx) => (
              <button
                key={label}
                onClick={() => setActivePhotoIndex(idx)}
                className={`p-2 rounded-xl text-left border transition-all text-xs ${
                  activePhotoIndex === idx
                    ? 'bg-slate-800 border-cyan-500 text-white font-semibold shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="font-mono text-[10px] text-cyan-400 uppercase">Angle 0{idx + 1}</div>
                <div className="text-[11px] truncate mt-0.5">{label}</div>
              </button>
            ))}
          </div>

          {/* Core Identification Strip (User Requested Details) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <div className="text-[10px] font-mono uppercase text-slate-400">MFG Year</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">{bike.mfgYear || bike.year}</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <div className="text-[10px] font-mono uppercase text-slate-400">Reg Year</div>
              <div className="text-sm font-bold text-white font-mono mt-0.5">{bike.regYear || bike.year}</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <div className="text-[10px] font-mono uppercase text-slate-400">Reg Number</div>
              <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5 truncate" title={bike.regNumber || bike.inspection.registrationNumber}>
                {bike.regNumber || bike.inspection.registrationNumber}
              </div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
              <div className="text-[10px] font-mono uppercase text-slate-400">Document (PDF)</div>
              <button 
                onClick={() => setShowPdfPreview(true)}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 mt-1 truncate"
              >
                <FileCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">View Paper PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                {bike.brand} · {bike.model}
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                BRTA Paper Verified
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-white font-display">
              {bike.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-2 font-mono">
              <span className="bg-slate-800 px-2 py-0.5 rounded text-white border border-slate-700">
                Reg: {bike.regNumber || bike.inspection.registrationNumber}
              </span>
              <span>·</span>
              <span>Reg Year: {bike.regYear || bike.year}</span>
              <span>·</span>
              <span>Grade {bike.conditionGrade}</span>
            </div>
          </div>

          {/* Pricing & Transparency Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div>
              <div className="text-xs text-slate-400 font-medium">Asking Price (বিক্রয় মূল্য)</div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  {formatBDT(effectiveAskingPrice)}
                </span>
                {bike.originalPrice > effectiveAskingPrice && (
                  <span className="text-sm font-mono text-slate-500 line-through">
                    {formatBDT(bike.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Buying Price & Valuation Transparency */}
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                <span>Showroom Buying Price (ক্রয় মূল্য):</span>
              </div>
              <span className="font-mono font-semibold text-slate-200">
                {formatBDT(effectiveBuyingPrice)}
              </span>
            </div>

            <div className="text-xs text-emerald-400 flex items-center gap-1 pt-0.5">
              <Check className="w-3.5 h-3.5" />
              <span>Includes 12M Warranty, BRTA Name Transfer Assistance & Servicing</span>
            </div>
          </div>

          {/* Interactive Mini EMI Estimator */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                Estimated Monthly EMI (BDT)
              </span>
              <span className="font-mono text-sm font-bold text-cyan-400 tabular-nums">
                {formatBDT(estimatedEmi)} / month
              </span>
            </div>

            {/* Down Payment Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Down Payment</span>
                <span>{formatBDT(downPayment)}</span>
              </div>
              <input
                type="range"
                min={Math.round(effectiveAskingPrice * 0.15)}
                max={Math.round(effectiveAskingPrice * 0.6)}
                step="5000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Tenure Buttons */}
            <div className="flex items-center gap-2 text-xs">
              {[12, 24, 36].map((months) => (
                <button
                  key={months}
                  onClick={() => setTenureMonths(months)}
                  className={`flex-1 py-1 rounded-lg border text-center font-mono transition-colors ${
                    tenureMonths === months
                      ? 'bg-slate-800 border-cyan-500 text-cyan-400 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {months} Mo
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onOpenInquiry(bike, 'Test Ride')}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-600/30 text-center"
            >
              Book Showroom Test Ride
            </button>

            <button
              onClick={() => onOpenInquiry(bike, 'Purchase Inquiry')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors text-center border border-slate-700"
            >
              Request Price Hold / Reserve Online
            </button>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`https://wa.me/8801711890432?text=Hello%20Ma%20Motors,%20I%20am%20interested%20in%20${encodeURIComponent(bike.name)}%20(Reg:%20${encodeURIComponent(bike.regNumber || bike.inspection.registrationNumber)})`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 hover:bg-emerald-900/60 text-center flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Live</span>
              </a>

              <button
                onClick={() => setShowPdfPreview(true)}
                className="py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 bg-slate-950 border border-slate-800 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                title="View verified documents PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Document (PDF)</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 text-center">
            7-Day Buyback / Swap Protection · Zero Odometer Rollback Guarantee
          </div>
        </div>
      </div>

      {/* Tabbed Detailed Specifications & Documents Module */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'details'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950'
            }`}
          >
            Complete Bike Details & Pricing
          </button>
          <button
            onClick={() => setActiveTab('inspection')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'inspection'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950'
            }`}
          >
            50-Point Inspection ({bike.inspection.overallScore}/100)
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'specs'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950'
            }`}
          >
            Technical Specs
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'documents'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-950'
            }`}
          >
            BRTA Registration & Document (PDF)
          </button>
        </div>

        {/* Tab 0: Complete Bike Details (Explicitly Requested by User) */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Core Bike Identity Details */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/80 text-xs">
                <div className="p-3 font-bold text-slate-200 bg-slate-900/60 uppercase tracking-wider flex items-center justify-between">
                  <span>Bike Identity & Registration Details</span>
                  <span className="text-[11px] text-cyan-400 font-mono">Verified Unit</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-slate-400">Brand</span>
                  <span className="font-semibold text-white">{bike.brand}</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-slate-400">Model Name</span>
                  <span className="font-semibold text-white">{bike.model || bike.name}</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-slate-400">MFG Year (Manufacturing)</span>
                  <span className="font-mono text-white font-semibold">{bike.mfgYear || bike.year}</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-slate-400">Reg Year (Registration)</span>
                  <span className="font-mono text-white font-semibold">{bike.regYear || bike.year}</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-slate-400">Registration Number</span>
                  <span className="font-mono text-cyan-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {bike.regNumber || bike.inspection.registrationNumber}
                  </span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-slate-400">Odometer / Mileage</span>
                  <span className="font-mono text-slate-200">{bike.mileageKm.toLocaleString()} km</span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <span className="text-slate-400">Engine Displacement</span>
                  <span className="font-mono text-slate-200">{bike.cc} cc</span>
                </div>
              </div>

              {/* Financial & Document Details */}
              <div className="space-y-4">
                <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/80 text-xs">
                  <div className="p-3 font-bold text-slate-200 bg-slate-900/60 uppercase tracking-wider">
                    Showroom Financial Assessment
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <span className="text-slate-400 block">Asking Price (বিক্রয় মূল্য)</span>
                      <span className="text-[10px] text-slate-500">Customer purchase price</span>
                    </div>
                    <span className="font-mono text-lg font-bold text-white tabular-nums">
                      {formatBDT(effectiveAskingPrice)}
                    </span>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <span className="text-slate-400 block">Buying Price (ক্রয় মূল্য)</span>
                      <span className="text-[10px] text-slate-500">Inventory acquisition valuation</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-slate-300 tabular-nums">
                      {formatBDT(effectiveBuyingPrice)}
                    </span>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <span className="text-slate-400 block">Estimated Gross Margin</span>
                      <span className="text-[10px] text-slate-500">Includes 50-point servicing, parts & warranty</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-emerald-400 tabular-nums">
                      {formatBDT(effectiveAskingPrice - effectiveBuyingPrice)}
                    </span>
                  </div>
                </div>

                {/* PDF Document File Card */}
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Document (PDF)</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {bike.documentPdfName || `BRTA_Clearance_${bike.regNumber?.replace(/[^a-zA-Z0-9]/g, '_') || 'DOC'}.pdf`}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Official digital scan containing Blue Book, Smart Card, Tax Token receipt, and Showroom Legal Inspection Report.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setShowPdfPreview(true)}
                      className="flex-1 py-1.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View PDF Document</span>
                    </button>
                    <button
                      onClick={handleDownloadPdf}
                      className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sourced Seller Information (বিক্রেতার তথ্য) */}
            {bike.sellerInfo && (
              <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/80 text-xs">
                <div className="p-3 font-bold text-slate-200 bg-slate-900/60 uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>Sourced Seller Record (বাইক বিক্রেতার তথ্য)</span>
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    Sourced Direct
                  </span>
                </div>
                <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Seller Name (বিক্রেতার নাম):</span>
                    <span className="font-semibold text-white text-sm">{bike.sellerInfo.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Mobile Phone (মোবাইল নম্বর):</span>
                    <span className="font-mono text-cyan-400 font-bold">{bike.sellerInfo.phone}</span>
                  </div>
                  {bike.sellerInfo.nid && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">National ID (এনআইডি):</span>
                      <span className="font-mono text-slate-200">{bike.sellerInfo.nid}</span>
                    </div>
                  )}
                  {bike.sellerInfo.purchaseDate && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">Acquisition Date (ক্রয়ের তারিখ):</span>
                      <span className="font-mono text-slate-200">{bike.sellerInfo.purchaseDate}</span>
                    </div>
                  )}
                  {bike.sellerInfo.memoOrStampNo && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">Stamp / Memo No (চুক্তি স্ট্যাম্প নং):</span>
                      <span className="font-mono text-emerald-400 font-semibold">{bike.sellerInfo.memoOrStampNo}</span>
                    </div>
                  )}
                  {bike.sellerInfo.address && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">Address (ঠিকানা):</span>
                      <span className="text-slate-300">{bike.sellerInfo.address}</span>
                    </div>
                  )}
                </div>
                {bike.sellerInfo.notes && (
                  <div className="p-3 bg-slate-900/40">
                    <span className="text-slate-400 block text-[11px] mb-1">Agreement / Seller Notes (চুক্তির নোট):</span>
                    <p className="text-slate-300 italic">{bike.sellerInfo.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 1: 50-Point Condition Report */}
        {activeTab === 'inspection' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black font-mono text-emerald-400">{bike.inspection.engineHealth}%</div>
                <div className="text-xs text-slate-400 mt-1">Engine & Compression</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black font-mono text-emerald-400">{bike.inspection.chassisFrame}%</div>
                <div className="text-xs text-slate-400 mt-1">Chassis & Frame</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black font-mono text-sky-400">{bike.inspection.tyresSuspension}%</div>
                <div className="text-xs text-slate-400 mt-1">Tyres & Suspension</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                <div className="text-2xl font-black font-mono text-emerald-400">{bike.inspection.electricals}%</div>
                <div className="text-xs text-slate-400 mt-1">Electricals & ECU</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center col-span-2 sm:col-span-1">
                <div className="text-2xl font-black font-mono text-amber-400">{bike.inspection.bodyPaint}%</div>
                <div className="text-xs text-slate-400 mt-1">Body & Factory Paint</div>
              </div>
            </div>

            {/* Written Mechanical Notes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Engine & Drivetrain</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {bike.inspection.engineNotes}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-sky-400" />
                  <span>Tyres & Brake Pads</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {bike.inspection.tyresNotes}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Cosmetic & Scratches</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {bike.inspection.scratchesNotes}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Full Specifications Table */}
        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/80">
              <div className="p-3 font-bold text-slate-200 bg-slate-900/60 uppercase tracking-wider">
                Engine & Performance
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Engine Type</span>
                <span className="font-semibold text-slate-200 text-right">{bike.specs.engine}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Max Power</span>
                <span className="font-semibold text-slate-200 font-mono">{bike.specs.maxPower}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Max Torque</span>
                <span className="font-semibold text-slate-200 font-mono">{bike.specs.maxTorque}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Top Speed (Verified)</span>
                <span className="font-semibold text-slate-200 font-mono">{bike.specs.topSpeed}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Transmission</span>
                <span className="font-semibold text-slate-200">{bike.transmission}</span>
              </div>
            </div>

            <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/80">
              <div className="p-3 font-bold text-slate-200 bg-slate-900/60 uppercase tracking-wider">
                Braking, Chassis & Dimensions
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">ABS Configuration</span>
                <span className="font-semibold text-slate-200">{bike.specs.absType}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Front Brake</span>
                <span className="font-semibold text-slate-200">{bike.specs.frontBrake}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Rear Brake</span>
                <span className="font-semibold text-slate-200">{bike.specs.rearBrake}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Fuel Tank Capacity</span>
                <span className="font-semibold text-slate-200 font-mono">{bike.specs.fuelTankCapacity}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-400">Curb Weight / Seat Height</span>
                <span className="font-semibold text-slate-200 font-mono">{bike.specs.curbWeight} / {bike.specs.seatHeight}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Legal & Registration Checklist */}
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>BRTA Government Papers & Status</span>
              </h4>
              <div className="space-y-2 text-xs divide-y divide-slate-800">
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">BRTA Registration Number:</span>
                  <span className="font-mono text-cyan-400 font-bold">{bike.regNumber || bike.inspection.registrationNumber}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Manufacturing Year (MFG):</span>
                  <span className="font-mono text-white font-semibold">{bike.mfgYear || bike.year}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Registration Year:</span>
                  <span className="font-mono text-white font-semibold">{bike.regYear || bike.year}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Tax Token Validity:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{bike.inspection.taxTokenValidUntil}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Insurance Validity:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{bike.inspection.insuranceValidUntil}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Fitness Validity:</span>
                  <span className="font-mono text-emerald-400 font-semibold">{bike.inspection.fitnessValidUntil}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Showroom Title Guarantee (Bangladesh)</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% Guaranteed BRTA Name Transfer into Buyer's National ID (NID).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Verified 1st Owner history directly sourced from original owner.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero Police records, zero bank hypothecation liens, BRTA clearance ready.</span>
                </li>
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => setShowPdfPreview(true)}
                  className="w-full py-2 px-3 bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/25 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>View & Download Official PDF Document</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Similar Motorcycles Carousel */}
      {similarBikes.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white font-display">
              Similar Inspected Bikes
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              In {bike.brand} & {bike.category} Category
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarBikes.map((simBike) => (
              <BikeCard
                key={simBike.id}
                bike={simBike}
                onSelect={onSelectBike}
                onCompareToggle={onCompareToggle}
                isCompared={false}
                onQuickInquire={() => onOpenInquiry(simBike)}
                layout="grid"
              />
            ))}
          </div>
        </section>
      )}

      {/* Document PDF Modal Preview */}
      {showPdfPreview && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">BRTA Vehicle Clearance Document (PDF)</h4>
                  <div className="text-[11px] font-mono text-slate-400">
                    {bike.documentPdfName || `BRTA_Record_${bike.regNumber || 'VEHICLE'}.pdf`}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowPdfPreview(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto font-mono text-xs">
              {/* Fake PDF Header */}
              <div className="text-center pb-4 border-b border-slate-800 space-y-1">
                <div className="text-sm font-bold text-white uppercase tracking-wider">
                  GOVERNMENT OF THE PEOPLE'S REPUBLIC OF BANGLADESH
                </div>
                <div className="text-slate-400 text-xs">
                  BANGLADESH ROAD TRANSPORT AUTHORITY (BRTA)
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  VEHICLE VERIFICATION & NO-OBJECTION CERTIFICATE (NOC)
                </div>
              </div>

              {/* PDF Meta details */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">VEHICLE REGISTRATION NO:</span>
                  <span className="text-white font-bold text-sm text-cyan-400">{bike.regNumber || bike.inspection.registrationNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">VEHICLE MAKE / BRAND:</span>
                  <span className="text-white font-bold">{bike.brand}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">MODEL NAME:</span>
                  <span className="text-white font-bold">{bike.model}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">MFG YEAR:</span>
                  <span className="text-white font-bold">{bike.mfgYear || bike.year}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">REGISTRATION YEAR:</span>
                  <span className="text-white font-bold">{bike.regYear || bike.year}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">ENGINE CAPACITY:</span>
                  <span className="text-white font-bold">{bike.cc} CC</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">ACQUISITION BUYING PRICE:</span>
                  <span className="text-white font-bold">{formatBDT(effectiveBuyingPrice)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">SHOWROOM ASKING PRICE:</span>
                  <span className="text-white font-bold text-emerald-400">{formatBDT(effectiveAskingPrice)}</span>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl text-emerald-300 space-y-1 text-xs">
                <div className="font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>OFFICIAL BRTA VERIFICATION PASSED</span>
                </div>
                <div className="text-[11px] text-emerald-400/90 leading-relaxed font-sans">
                  Tax token valid until {bike.inspection.taxTokenValidUntil}. Fitness valid until {bike.inspection.fitnessValidUntil}. Insurance active until {bike.inspection.insuranceValidUntil}. No recorded traffic offences, bank hypothecation, or theft reports against this chassis.
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-800">
                <span>Verified by Ma Motors Showroom Bangladesh Legal Registry</span>
                <span className="font-mono">DIGITAL SIGNATURE ID: #MP-BRTA-{bike.id.toUpperCase()}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowPdfPreview(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close Preview
              </button>
              <button
                onClick={handleDownloadPdf}
                className="px-5 py-2 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function handleDownloadPdf() {
    alert(`Downloading ${bike.documentPdfName || `BRTA_Paper_${bike.regNumber || 'Bike'}.pdf`} ... Complete certified document package.`);
  }
};
