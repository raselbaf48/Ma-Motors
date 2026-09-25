import React, { useState } from 'react';
import { Bike, SaleRecord, AdditionalCostCategory, AdditionalCostItem } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { BikeVisual } from '../components/common/BikeVisual';
import { 
  ArrowLeft, 
  Edit3, 
  CheckCircle2, 
  DollarSign, 
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Camera,
  Zap,
  Gauge,
  Calendar,
  Tag,
  Share2,
  ExternalLink,
  Wrench,
  Droplets,
  Sparkles
} from 'lucide-react';

interface BikeDetailViewProps {
  bike: Bike;
  onBack: () => void;
  onUpdateBike: (bike: Bike) => void;
  onRecordSale: (sale: SaleRecord) => void;
  onNavigateToSales: () => void;
  onNavigateToCost?: () => void;
  showroomName?: string;
  logoUrl?: string;
}

export const BikeDetailView: React.FC<BikeDetailViewProps> = ({
  bike,
  onBack,
  onUpdateBike,
  onRecordSale,
  onNavigateToSales,
  onNavigateToCost,
  showroomName = 'Ma Motors',
  logoUrl
}) => {
  const [logoError, setLogoError] = useState(false);
  const isSold = bike.status === 'Sold';
  const effectiveAskingPrice = bike.askingPrice || bike.price || 0;
  const effectiveBuyingPrice = bike.buyingPrice || Math.round(effectiveAskingPrice * 0.82);

  // Gallery active photo index
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Sale Modal state (Pic/Bik er ei interface ta agei show hbe na, Sale This Bike click korle open hbe)
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('+880 1');
  const [buyerAddress, setBuyerAddress] = useState('Dhaka');
  const [buyerNid, setBuyerNid] = useState('');
  const [salePrice, setSalePrice] = useState<number>(effectiveAskingPrice);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Bank Transfer' | 'EMI Financing'>('Bank Transfer');
  const [warrantyMonths, setWarrantyMonths] = useState(12);
  const [saleNotes, setSaleNotes] = useState('');
  const [saleSuccess, setSaleSuccess] = useState(false);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editBrand, setEditBrand] = useState(bike.brand);
  const [editModel, setEditModel] = useState(bike.model);
  const [editName, setEditName] = useState(bike.name);
  const [editRegYear, setEditRegYear] = useState(bike.regYear || bike.year);
  const [editRegNumber, setEditRegNumber] = useState(bike.regNumber || bike.inspection?.registrationNumber || '');
  const [editBuyingPrice, setEditBuyingPrice] = useState(effectiveBuyingPrice);
  const [editAskingPrice, setEditAskingPrice] = useState(effectiveAskingPrice);
  const [editCc, setEditCc] = useState(bike.cc);
  const [editMileage, setEditMileage] = useState(bike.mileageKm);
  const [editStatus, setEditStatus] = useState(bike.status || 'Available');
  
  // Multiple Photos state in Edit modal
  const [editImages, setEditImages] = useState<string[]>(bike.images || []);
  const [newImageUrl, setNewImageUrl] = useState('');

  const totalPrepCost = bike.additionalCosts?.reduce((sum, c) => sum + c.amount, 0) || bike.totalAdditionalCost || 0;
  const totalShowroomInvestment = effectiveBuyingPrice + totalPrepCost;
  const calculatedProfit = salePrice - totalShowroomInvestment;
  const projectedMargin = effectiveAskingPrice - totalShowroomInvestment;

  // Photo gallery helpers
  const validImages = (bike.images || []).filter(img => 
    img && (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/') || img.startsWith('data:'))
  );
  const hasMultipleImages = validImages.length > 1;

  const handleNextImage = () => {
    if (validImages.length === 0) return;
    setActiveImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const handlePrevImage = () => {
    if (validImages.length === 0) return;
    setActiveImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  // Open Edit Modal with refreshed values
  const handleOpenEdit = () => {
    setEditBrand(bike.brand);
    setEditModel(bike.model);
    setEditName(bike.name);
    setEditRegYear(bike.regYear || bike.year);
    setEditRegNumber(bike.regNumber || bike.inspection?.registrationNumber || '');
    setEditBuyingPrice(effectiveBuyingPrice);
    setEditAskingPrice(effectiveAskingPrice);
    setEditCc(bike.cc);
    setEditMileage(bike.mileageKm);
    setEditStatus(bike.status || 'Available');
    setEditImages([...(bike.images || [])]);
    setNewImageUrl('');
    setIsEditModalOpen(true);
  };

  // Add Photo to list in Edit modal
  const handleAddPhotoUrl = () => {
    const trimmed = newImageUrl.trim();
    if (!trimmed) return;
    setEditImages((prev) => [...prev, trimmed]);
    setNewImageUrl('');
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setEditImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Handle Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Bike = {
      ...bike,
      brand: editBrand,
      model: editModel,
      name: editName || `${editBrand} ${editModel}`,
      regYear: editRegYear,
      year: editRegYear,
      regNumber: editRegNumber,
      buyingPrice: editBuyingPrice,
      askingPrice: editAskingPrice,
      price: editAskingPrice,
      cc: editCc,
      mileageKm: editMileage,
      status: editStatus as any,
      inStock: editStatus !== 'Sold',
      images: editImages.length > 0 ? editImages : bike.images
    };
    onUpdateBike(updated);
    setIsEditModalOpen(false);
    setActiveImageIndex(0);
  };

  // Handle Sale Submit
  const handleConfirmSale = (e: React.FormEvent) => {
    e.preventDefault();
    const newSale: SaleRecord = {
      id: `sale-${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      bikeId: bike.id,
      bikeName: bike.name,
      regNumber: bike.regNumber || bike.inspection?.registrationNumber || 'N/A',
      saleDate: new Date().toISOString().split('T')[0],
      buyerName,
      buyerPhone,
      buyerAddress: buyerAddress || 'Dhaka',
      buyerNid: buyerNid || 'N/A',
      buyingPrice: effectiveBuyingPrice,
      salePrice,
      profit: calculatedProfit,
      paymentMethod,
      warrantyMonths,
      status: 'Completed',
      notes: saleNotes || 'Direct sale recorded from bike details page.'
    };

    onRecordSale(newSale);
    setSaleSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar - Dedicated Page Header */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Back button to collection */}
          <button
            onClick={onBack}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs flex items-center gap-2 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to Our Collection</span>
          </button>

          {/* Right: Status badge & Edit button */}
          <div className="flex items-center gap-3">
            {isSold && (
              <div className="bg-red-600 border border-red-400 text-white font-black text-xs px-3.5 py-1.5 rounded-xl uppercase tracking-wider shadow">
                Sold Out
              </div>
            )}
            
            <button
              onClick={handleOpenEdit}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-850 hover:to-slate-750 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Edit Details & Photos</span>
              <span className="sm:hidden">Edit</span>
            </button>

            {/* Showroom Logo in Right Corner - Large & Prominent */}
            <div 
              className="pl-2 sm:pl-3.5 border-l border-slate-800 flex items-center gap-2.5 shrink-0 cursor-pointer group"
              onClick={onBack}
              title={`${showroomName} - Showroom Logo`}
            >
              {logoUrl && !logoError ? (
                <img 
                  src={logoUrl} 
                  alt={showroomName} 
                  onError={() => setLogoError(true)} 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl object-cover border-2 border-cyan-500/50 shadow-md shadow-cyan-500/20 group-hover:scale-105 group-hover:border-cyan-400 transition-all shrink-0 bg-slate-900" 
                />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-base sm:text-xl shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
                  M
                </div>
              )}
              <div className="hidden md:block text-left leading-tight">
                <span className="text-xs sm:text-sm font-bold text-white block group-hover:text-cyan-300 transition-colors">
                  {showroomName}
                </span>
                <span className="text-[10px] text-cyan-400 block font-semibold uppercase tracking-wider mt-0.5">
                  Showroom
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Success Banner if Sale Confirmed */}
        {saleSuccess && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-2xl space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Sale successfully confirmed! This bike is now marked as Sold Out.</span>
            </div>
            <p className="text-xs text-slate-300">
              The sale invoice has been generated and saved to the Sales section.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onNavigateToSales}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
              >
                Go to Sales & View Invoices
              </button>
              <button
                onClick={onBack}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs rounded-xl transition-colors"
              >
                Return to Our Collection
              </button>
            </div>
          </div>
        )}

        {/* 3D Showcase Card & Photo Gallery */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-t border-l border-slate-700/60 border-r-2 border-b-4 border-slate-950 shadow-2xl">
          {/* Photo Display Area */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
            <BikeVisual 
              bike={bike} 
              aspect="16/9" 
              activeImageIndex={activeImageIndex} 
            />

            {/* Sold Out Badge overlay */}
            {isSold && (
              <div className="absolute top-4 right-4 z-20 bg-red-600 border-2 border-red-400 text-white font-black text-sm px-4 py-1.5 rounded-xl shadow-xl uppercase tracking-wider">
                Sold Out
              </div>
            )}

            {/* Previous / Next Arrows for Multiple Photos */}
            {hasMultipleImages && (
              <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-20">
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 text-white pointer-events-auto backdrop-blur-md transition-all shadow-lg hover:scale-110"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 text-white pointer-events-auto backdrop-blur-md transition-all shadow-lg hover:scale-110"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Photo Counter */}
            {validImages.length > 0 && (
              <div className="absolute bottom-3 right-3 z-20 bg-slate-950/85 px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 backdrop-blur-md shadow flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeImageIndex + 1} / {validImages.length}</span>
              </div>
            )}
          </div>

          {/* Multiple Photos Thumbnail Strip */}
          {hasMultipleImages && (
            <div className="p-3 bg-slate-950/90 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] text-slate-400 font-mono shrink-0 mr-1">Photos:</span>
              {validImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx 
                      ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/20' 
                      : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Title & Key Overview */}
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  {bike.brand} · {bike.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white font-display mt-0.5">
                  {bike.name}
                </h1>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400">Showroom Asking Price</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  {formatBDT(effectiveAskingPrice)}
                </div>
              </div>
            </div>

            {/* Key Specifications Grid - Minimal and Clean */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs mb-1 font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>ENGINE</span>
                </div>
                <div className="font-bold text-white text-base font-mono">{bike.cc} cc</div>
                <div className="text-[11px] text-slate-400 font-mono">Displacement</div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs mb-1 font-mono">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>RUN / ODOMETER</span>
                </div>
                <div className="font-bold text-white text-base font-mono">{bike.mileageKm.toLocaleString()} km</div>
                <div className="text-[11px] text-slate-400 font-mono">Genuine Reading</div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs mb-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>REG YEAR</span>
                </div>
                <div className="font-bold text-white text-base font-mono">{bike.regYear || bike.year}</div>
                <div className="text-[11px] text-slate-400 font-mono">Registration Date</div>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-cyan-400 text-xs mb-1 font-mono">
                  <Tag className="w-3.5 h-3.5" />
                  <span>REGISTRATION NO</span>
                </div>
                <div className="font-bold text-cyan-300 text-xs sm:text-sm font-mono truncate">
                  {bike.regNumber || bike.inspection?.registrationNumber || 'Dhaka Metro'}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">BRTA Registered</div>
              </div>
            </div>
          </div>
        </div>

        {/* Showroom Cost & Valuation Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400">Showroom Buying Cost</div>
            <div className="text-xl font-bold text-slate-300 font-mono mt-1">
              {formatBDT(effectiveBuyingPrice)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Procurement amount</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl relative group">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>Additional Cost (অতিরিক্ত খরচ)</span>
              <button
                type="button"
                onClick={() => onNavigateToCost?.()}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30 hover:border-cyan-400 cursor-pointer flex items-center gap-1"
                title="অতিরিক্ত খরচের আলাদা পেজ ওপেন করুন"
              >
                <Plus className="w-3 h-3" />
                <span>Add Cost</span>
              </button>
            </div>
            <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
              +{formatBDT(totalPrepCost)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {bike.additionalCosts?.length || 0} entries (Service, Wash, Parts)
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400">Total Showroom Investment</div>
            <div className="text-xl font-bold text-amber-300 font-mono mt-1">
              {formatBDT(totalShowroomInvestment)}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Buying + Additional Cost</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div className="text-xs text-slate-400">Target Asking Price</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
              {formatBDT(effectiveAskingPrice)}
            </div>
            <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
              Margin: {projectedMargin >= 0 ? `+${formatBDT(projectedMargin)}` : formatBDT(projectedMargin)}
            </div>
          </div>
        </div>

        {/* Additional Cost Breakdown Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Additional Cost (অতিরিক্ত প্রস্তুতি ও সার্ভিস খরচ)</span>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    +{formatBDT(totalPrepCost)}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  সার্ভিসিং, ওয়াশ, পলিশ, পার্টস বদলানোর যাবতীয় অতিরিক্ত খরচ
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToCost?.()}
              className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{bike.additionalCosts && bike.additionalCosts.length > 0 ? 'Manage on Cost Page' : 'Add Additional Cost'}</span>
            </button>
          </div>

          {(!bike.additionalCosts || bike.additionalCosts.length === 0) ? (
            <div className="p-4 bg-slate-950/60 rounded-xl border border-dashed border-slate-800 text-center text-xs text-slate-500">
              কোনো অতিরিক্ত খরচ এখনো যুক্ত করা হয়নি। সার্ভিসিং, ওয়াশ, পার্টস ইত্যাদি খরচ যোগ করতে 
              <button 
                type="button" 
                onClick={() => onNavigateToCost?.()} 
                className="text-cyan-400 font-semibold underline ml-1 hover:text-cyan-300 cursor-pointer"
              >
                Add Additional Cost এ ক্লিক করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {bike.additionalCosts.map((c) => (
                <div key={c.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        c.category === 'Service' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        c.category === 'Wash' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                        c.category === 'Polish' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        c.category === 'Parts' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        c.category === 'Repair' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        {c.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{c.date}</span>
                    </div>
                    <div className="text-slate-200 mt-1 font-medium truncate max-w-[160px]">{c.description}</div>
                  </div>
                  <div className="font-mono font-bold text-cyan-300 text-sm">
                    +{formatBDT(c.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM SALE ACTION BAR (Pic/Sale er interface agei show hbe na, Sale This Bike click korle open hbe) */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-2 border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">
                {isSold ? 'Sales Record' : 'Sale This Bike (বাইক বিক্রয় করুন)'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {isSold 
                ? 'This bike is currently marked as Sold Out in the showroom inventory.' 
                : 'Click the button to record sale invoice and mark this bike as Sold.'}
            </p>
          </div>

          {isSold ? (
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white font-extrabold text-xs px-3.5 py-2 rounded-xl border border-red-400 uppercase tracking-wider shadow">
                Sold Out
              </div>
              <button
                onClick={onNavigateToSales}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-xs rounded-xl transition-colors border border-slate-700"
              >
                View Sales Invoices →
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setSalePrice(effectiveAskingPrice);
                setIsSaleModalOpen(true);
              }}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              <DollarSign className="w-4 h-4" />
              <span>Sale This Bike (বাইক বিক্রয় করুন)</span>
            </button>
          )}
        </div>
      </main>

      {/* SALE MODAL - Opens ONLY when user clicks "Sale This Bike" */}
      {isSaleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Record Bike Sale</h3>
                  <div className="text-[11px] text-slate-400 font-mono truncate max-w-xs">{bike.name}</div>
                </div>
              </div>
              <button
                onClick={() => setIsSaleModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={(e) => {
              handleConfirmSale(e);
              setIsSaleModalOpen(false);
            }} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Buyer Name *</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Buyer Phone *</label>
                  <input
                    type="text"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+880 1..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Buyer Address</label>
                  <input
                    type="text"
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    placeholder="e.g. Mirpur-10, Dhaka"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Buyer NID</label>
                  <input
                    type="text"
                    value={buyerNid}
                    onChange={(e) => setBuyerNid(e.target.value)}
                    placeholder="National ID Number"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <label className="text-slate-400 block mb-1">Final Sale Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 font-mono font-bold text-sm focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Total Showroom Cost (৳)</label>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 font-mono text-sm font-semibold">
                    {formatBDT(totalShowroomInvestment)}
                    {totalPrepCost > 0 && (
                      <span className="text-[10px] text-cyan-400 block font-normal">
                        ({formatBDT(effectiveBuyingPrice)} + {formatBDT(totalPrepCost)} prep)
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Realized Profit (৳)</label>
                  <div className={`p-2 bg-slate-900 border border-slate-800 rounded-lg font-mono font-bold text-sm ${calculatedProfit >= 0 ? 'text-cyan-400' : 'text-red-400'}`}>
                    {calculatedProfit >= 0 ? `+${formatBDT(calculatedProfit)}` : formatBDT(calculatedProfit)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Cash">Cash Payment</option>
                    <option value="Bank Transfer">Bank Transfer / Online</option>
                    <option value="EMI Financing">Bank EMI Financing</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1 font-medium">Showroom Warranty</label>
                  <select
                    value={warrantyMonths}
                    onChange={(e) => setWarrantyMonths(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={6}>6 Months Warranty</option>
                    <option value={12}>12 Months (1 Year) Warranty</option>
                    <option value={24}>24 Months (2 Years) Warranty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-medium">Notes / Remarks</label>
                <input
                  type="text"
                  value={saleNotes}
                  onChange={(e) => setSaleNotes(e.target.value)}
                  placeholder="Ownership transfer handover, gate pass issued..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSaleModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs hover:bg-slate-850"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Sale & Record in Sales (বিক্রয় সম্পন্ন)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL - Set Bike Photos (Google Photos / URL) & Details */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl my-8">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-cyan-400" />
                <span>Edit Bike Details & Photos</span>
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 max-h-[82vh] overflow-y-auto text-xs">
              {/* PHOTO URLS SECTION (Multiple Pic Set Kora Jbe) */}
              <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span>Bike Photos (Google Photos / Photo URLs)</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {editImages.length} photo{editImages.length === 1 ? '' : 's'} added
                  </span>
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Enter photo URLs (Google Photos share link, direct image URL, or Unsplash link). Multiple photos can be added and will show on the Box and Details gallery.
                </p>

                {/* Add new photo URL input */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Paste photo link: https://..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono text-xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPhotoUrl();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoUrl}
                    className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>

                {/* Current Photos List / Thumbnails */}
                {editImages.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-medium text-slate-400">Current Photos (First photo is Box cover):</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {editImages.map((url, idx) => (
                        <div key={idx} className="relative group bg-slate-900 rounded-lg overflow-hidden border border-slate-800 aspect-video flex items-center justify-center">
                          {url.startsWith('http') || url.startsWith('/') ? (
                            <img src={url} alt={`Bike pic ${idx + 1}`} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-[10px] text-slate-500 font-mono truncate px-1">{url}</span>
                          )}
                          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-1.5">
                            <span className="text-[10px] bg-slate-900/90 text-cyan-300 px-1 rounded font-mono">
                              #{idx + 1} {idx === 0 && 'Cover'}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              className="p-1 rounded bg-red-600/90 hover:bg-red-500 text-white transition-colors"
                              title="Delete photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Brand */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Brand</label>
                  <select
                    value={editBrand}
                    onChange={(e) => setEditBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {['Yamaha', 'Honda', 'Bajaj', 'Suzuki', 'TVS', 'KTM', 'Royal Enfield', 'Kawasaki', 'Hero'].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Model</label>
                  <input
                    type="text"
                    required
                    value={editModel}
                    onChange={(e) => setEditModel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Full Title</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Reg Year & Number */}
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-slate-400 block mb-1">Reg Year</label>
                  <input
                    type="number"
                    value={editRegYear}
                    onChange={(e) => setEditRegYear(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-slate-400 block mb-1">Reg Number</label>
                  <input
                    type="text"
                    required
                    value={editRegNumber}
                    onChange={(e) => setEditRegNumber(e.target.value)}
                    placeholder="e.g. Dhaka Metro-LA-54-9102"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <label className="text-slate-400 block mb-1">Buying Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={editBuyingPrice}
                    onChange={(e) => setEditBuyingPrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Asking Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={editAskingPrice}
                    onChange={(e) => setEditAskingPrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* CC, Mileage */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-slate-400 block mb-1">Engine (cc)</label>
                  <input
                    type="number"
                    value={editCc}
                    onChange={(e) => setEditCc(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Mileage (km)</label>
                  <input
                    type="number"
                    value={editMileage}
                    onChange={(e) => setEditMileage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-slate-400 block mb-1">Stock Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Available">Available (In Stock)</option>
                  <option value="Sold">Sold Out</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg text-slate-400 hover:text-white text-xs hover:bg-slate-850"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
