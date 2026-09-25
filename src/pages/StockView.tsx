import React, { useState } from 'react';
import { Bike } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { BikeVisual } from '../components/common/BikeVisual';
import { 
  Search, 
  Plus, 
  X,
  Gauge,
  Calendar,
  Zap,
  Tag,
  Camera,
  Trash2
} from 'lucide-react';

interface StockViewProps {
  bikes: Bike[];
  onSelectBike: (bike: Bike) => void;
  onAddBike: (newBike: Bike) => void;
  onUpdateBike: (bike: Bike) => void;
  onDeleteBike: (bikeId: string) => void;
  onNavigateToDetails: () => void;
  onNavigateToAddBike?: () => void;
  isAddModalOpen?: boolean;
  onCloseAddModal?: () => void;
}

export const StockView: React.FC<StockViewProps> = ({
  bikes,
  onSelectBike,
  onAddBike,
  onUpdateBike,
  onDeleteBike,
  onNavigateToDetails,
  onNavigateToAddBike,
  isAddModalOpen = false,
  onCloseAddModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Available' | 'Sold'>('ALL');

  // Modal state for Add Bike
  const [isModalOpen, setIsModalOpen] = useState(isAddModalOpen);

  // Form State
  const [formBrand, setFormBrand] = useState('Yamaha');
  const [formModel, setFormModel] = useState('');
  const [formName, setFormName] = useState('');
  const [formMfgYear, setFormMfgYear] = useState(2023);
  const [formRegYear, setFormRegYear] = useState(2023);
  const [formRegNumber, setFormRegNumber] = useState('');
  const [formBuyingPrice, setFormBuyingPrice] = useState(280000);
  const [formAskingPrice, setFormAskingPrice] = useState(330000);
  const [formCc, setFormCc] = useState(150);
  const [formMileage, setFormMileage] = useState(5000);
  const [formCategory, setFormCategory] = useState<'Sport' | 'Cruiser' | 'Naked' | 'Commuter' | 'Tourer'>('Sport');
  const [formImages, setFormImages] = useState<string[]>(['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80']);
  const [formImageUrl, setFormImageUrl] = useState('');

  const filteredBikes = bikes.filter((bike) => {
    const matchesSearch = 
      bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (bike.regNumber && bike.regNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesBrand = selectedBrand === 'ALL' || bike.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesStatus = statusFilter === 'ALL' || 
      (statusFilter === 'Available' ? bike.status !== 'Sold' : bike.status === 'Sold');

    return matchesSearch && matchesBrand && matchesStatus;
  });

  const inStockList = bikes.filter((b) => b.status !== 'Sold');
  const totalCost = inStockList.reduce((acc, b) => acc + (b.buyingPrice || 0), 0);
  const totalAsking = inStockList.reduce((acc, b) => acc + (b.askingPrice || b.price), 0);
  const totalPrepCost = inStockList.reduce(
    (acc, b) => acc + (b.totalAdditionalCost || b.additionalCosts?.reduce((s, c) => s + c.amount, 0) || 0),
    0
  );

  const uniqueBrands = ['ALL', ...Array.from(new Set(bikes.map((b) => b.brand)))];

  const handleOpenAdd = () => {
    setFormBrand('Yamaha');
    setFormModel('');
    setFormName('');
    setFormMfgYear(2023);
    setFormRegYear(2023);
    setFormRegNumber(`Dhaka Metro-LA-${Math.floor(10 + Math.random() * 89)}-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormBuyingPrice(250000);
    setFormAskingPrice(300000);
    setFormCc(150);
    setFormMileage(6000);
    setFormCategory('Sport');
    setFormImages(['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80']);
    setFormImageUrl('');
    setIsModalOpen(true);
  };

  const handleAddPhotoUrl = () => {
    const trimmed = formImageUrl.trim();
    if (!trimmed) return;
    setFormImages((prev) => [...prev, trimmed]);
    setFormImageUrl('');
  };

  const handleRemovePhoto = (idxToRemove: number) => {
    setFormImages((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `bike-${Date.now()}`;
    const newBike: Bike = {
      id: newId,
      name: formName || `${formBrand} ${formModel}`,
      brand: formBrand,
      model: formModel || 'Standard',
      mfgYear: formMfgYear,
      regYear: formRegYear,
      year: formMfgYear,
      regNumber: formRegNumber,
      buyingPrice: formBuyingPrice,
      askingPrice: formAskingPrice,
      price: formAskingPrice,
      originalPrice: Math.round(formAskingPrice * 1.15),
      cc: formCc,
      mileageKm: formMileage,
      conditionGrade: 'A',
      conditionLabel: 'Good',
      fuelType: 'Petrol',
      transmission: 'Manual',
      color: 'Cyan / Black',
      colorHex: '#06b6d4',
      category: formCategory,
      featured: false,
      inStock: true,
      status: 'Available',
      registrationYear: formRegYear,
      registrationCity: 'Dhaka',
      ownersCount: 1,
      warrantyMonths: 12,
      images: formImages.length > 0 ? formImages : ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1000&q=80'],
      documentPdfName: 'BRTA_Papers.pdf',
      specs: {
        engine: `${formCc}cc Single Cylinder`,
        maxPower: '18 HP',
        maxTorque: '14.2 Nm',
        fuelTankCapacity: '12 L',
        topSpeed: '130 km/h',
        curbWeight: '140 kg',
        seatHeight: '800 mm',
        frontBrake: 'Disc ABS',
        rearBrake: 'Disc',
        absType: 'Single Channel',
        tyreConditionPct: 90,
        batteryHealthPct: 95
      },
      inspection: {
        overallScore: 92,
        engineHealth: 94,
        chassisFrame: 98,
        tyresSuspension: 90,
        electricals: 95,
        bodyPaint: 92,
        scratchesNotes: 'Well maintained',
        tyresNotes: 'Good tread condition',
        engineNotes: 'Clean sound, crisp throttle',
        documentsVerified: true,
        registrationNumber: formRegNumber,
        taxTokenValidUntil: '2027-12-31',
        insuranceValidUntil: '2026-11-30',
        fitnessValidUntil: '2027-12-31',
        ownershipTransferGuaranteed: true
      }
    };
    onAddBike(newBike);
    setIsModalOpen(false);
    if (onCloseAddModal) onCloseAddModal();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
            Our Collection
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            {inStockList.length} bikes currently in showroom collection
          </p>
        </div>

        <button
          onClick={() => {
            if (onNavigateToAddBike) {
              onNavigateToAddBike();
            } else {
              handleOpenAdd();
            }
          }}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 shrink-0 self-start sm:self-center cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Bike</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl shadow">
          <div className="text-[11px] text-slate-400">Total in Collection</div>
          <div className="text-xl font-bold text-white font-mono mt-1">
            {inStockList.length} <span className="text-xs text-slate-400 font-normal">available</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl shadow">
          <div className="text-[11px] text-slate-400">Procurement Cost</div>
          <div className="text-xl font-bold text-slate-300 font-mono mt-1">
            {formatBDT(totalCost)}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl shadow">
          <div className="text-[11px] text-slate-400">Total Prep Cost (রেডি খরচ)</div>
          <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
            +{formatBDT(totalPrepCost)}
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl shadow">
          <div className="text-[11px] text-slate-400">Total Collection Value</div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
            {formatBDT(totalAsking)}
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bike name, brand, reg..."
              className="w-full pl-8 pr-7 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${
                statusFilter === 'ALL'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({bikes.length})
            </button>
            <button
              onClick={() => setStatusFilter('Available')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${
                statusFilter === 'Available'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              In Stock ({inStockList.length})
            </button>
            <button
              onClick={() => setStatusFilter('Sold')}
              className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${
                statusFilter === 'Sold'
                  ? 'bg-red-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sold Out ({bikes.filter((b) => b.status === 'Sold').length})
            </button>
          </div>
        </div>

        {/* Brand Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
          <span className="text-slate-500 text-[11px] mr-1 shrink-0">Brand:</span>
          {uniqueBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-2.5 py-0.5 rounded-md text-[11px] shrink-0 transition-colors border ${
                selectedBrand === brand
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Box Shape Bike Grid */}
      {filteredBikes.length === 0 ? (
        <div className="p-12 text-center text-slate-400 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <p className="text-sm">No bikes found in this collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBikes.map((bike) => {
            const isSold = bike.status === 'Sold';
            const askingPrice = bike.askingPrice || bike.price || 0;

            return (
              <div
                key={bike.id}
                onClick={() => {
                  onSelectBike(bike);
                  onNavigateToDetails();
                }}
                className={`group relative rounded-2xl cursor-pointer select-none transition-all duration-300 transform-gpu overflow-hidden
                  /* 3D Box Raised Effect & Shadows */
                  bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950
                  border-t border-l border-slate-700/60
                  border-r-2 border-r-slate-950
                  border-b-[5px] border-b-slate-950
                  shadow-[0_12px_24px_-6px_rgba(0,0,0,0.8),0_6px_12px_-4px_rgba(0,0,0,0.5)]
                  hover:shadow-[0_22px_36px_-8px_rgba(6,182,212,0.3),0_12px_18px_-4px_rgba(0,0,0,0.7)]
                  hover:-translate-y-2 hover:border-t-cyan-500/50 hover:border-l-cyan-500/50
                `}
              >
                {/* 3D Box Corner Highlight */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent group-hover:via-cyan-400/80 transition-all pointer-events-none" />

                {/* Sold Out Red Box Badge (Alada box shape e red hbe) */}
                {isSold && (
                  <div className="absolute top-3 right-3 z-20">
                    <div className="bg-red-600 border-2 border-red-400 text-white font-black text-xs px-3 py-1 rounded-lg shadow-lg uppercase tracking-wider backdrop-blur-md animate-pulse">
                      Sold Out
                    </div>
                  </div>
                )}

                {/* Bike Image Area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950/80">
                  <BikeVisual bike={bike} aspect="16/9" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Box Content - Only Key Points */}
                <div className="p-4 space-y-3">
                  {/* Brand & Bike Name */}
                  <div>
                    <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wide">
                      {bike.brand}
                    </div>
                    <h3 className="font-bold text-white text-base font-display truncate group-hover:text-cyan-300 transition-colors">
                      {bike.name}
                    </h3>
                  </div>

                  {/* 4 Key Points Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-[9px] text-slate-500">ENGINE</div>
                        <div className="font-semibold text-slate-200">{bike.cc} cc</div>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 flex items-center gap-2">
                      <Gauge className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-[9px] text-slate-500">RUN</div>
                        <div className="font-semibold text-slate-200">{bike.mileageKm.toLocaleString()} km</div>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-[9px] text-slate-500">REG YEAR</div>
                        <div className="font-semibold text-slate-200">{bike.regYear || bike.year}</div>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div className="truncate">
                        <div className="text-[9px] text-slate-500">REG NO</div>
                        <div className="font-semibold text-cyan-300 truncate text-[11px]">
                          {bike.regNumber || 'Dhaka Metro'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Details Row */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                        Price
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight drop-shadow-sm">
                        {formatBDT(askingPrice)}
                      </span>
                    </div>

                    <div className="text-right">
                      {(bike.additionalCosts?.length ?? 0) > 0 ? (
                        <div>
                          <div className="text-[10px] text-slate-400 font-medium">Addl Cost</div>
                          <div className="font-mono text-cyan-300 font-bold text-xs">
                            +{formatBDT(bike.totalAdditionalCost || bike.additionalCosts?.reduce((s, c) => s + c.amount, 0) || 0)}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 group-hover:text-cyan-400 transition-colors font-medium">
                          Details →
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Subtle bottom indicator */}
                <div className="h-1 w-full bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-emerald-500 transition-all" />
              </div>
            );
          })}
        </div>
      )}

      {/* Add Bike Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-bold text-white">
                Add Bike to Collection
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  if (onCloseAddModal) onCloseAddModal();
                }}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-4 sm:p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Brand</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
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
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    placeholder="e.g. FZ-S V3"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-slate-400 block mb-1">Full Title</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Yamaha FZ-S V3 Dual ABS"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Reg Year</label>
                  <input
                    type="number"
                    value={formRegYear}
                    onChange={(e) => setFormRegYear(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-slate-400 block mb-1">Reg Number</label>
                  <input
                    type="text"
                    required
                    value={formRegNumber}
                    onChange={(e) => setFormRegNumber(e.target.value)}
                    placeholder="Dhaka Metro-LA-55-9012"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <label className="text-slate-400 block mb-1">Buying Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={formBuyingPrice}
                    onChange={(e) => setFormBuyingPrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Asking Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={formAskingPrice}
                    onChange={(e) => setFormAskingPrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* CC, Mileage */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Engine (cc)</label>
                  <input
                    type="number"
                    value={formCc}
                    onChange={(e) => setFormCc(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Mileage (km)</label>
                  <input
                    type="number"
                    value={formMileage}
                    onChange={(e) => setFormMileage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Photos Section */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-cyan-300 font-semibold text-xs flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Bike Photos (Google Photos / Image URLs)</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formImages.length} photo{formImages.length === 1 ? '' : 's'}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="Paste image link: https://..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-cyan-500"
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
                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {formImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {formImages.map((url, idx) => (
                      <div key={idx} className="relative group bg-slate-900 rounded-lg overflow-hidden border border-slate-800 aspect-video flex items-center justify-center">
                        {url.startsWith('http') || url.startsWith('/') ? (
                          <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[9px] text-slate-500 font-mono truncate px-1">{url}</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-1 right-1 p-1 rounded bg-red-600/90 hover:bg-red-500 text-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    if (onCloseAddModal) onCloseAddModal();
                  }}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
                >
                  Add to Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
