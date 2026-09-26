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
  Trash2,
  UploadCloud,
  ShieldCheck
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
  const [selectedBrakingSystem, setSelectedBrakingSystem] = useState<string>('ALL');

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
  const [formBrakingSystem, setFormBrakingSystem] = useState<string>('Single Channel ABS');
  const [formImages, setFormImages] = useState<string[]>([]);
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

    let matchesBrake = true;
    if (selectedBrakingSystem !== 'ALL') {
      const bikeBrake = (bike.brakingSystem || bike.specs?.brakingSystem || bike.specs?.absType || '').toLowerCase();
      const target = selectedBrakingSystem.toLowerCase();
      if (target.includes('dual') && !bikeBrake.includes('dual')) matchesBrake = false;
      else if (target.includes('single') && !bikeBrake.includes('single')) matchesBrake = false;
      else if (target.includes('cbs') && !bikeBrake.includes('cbs')) matchesBrake = false;
      else if (target.includes('disc') && !bikeBrake.includes('disc')) matchesBrake = false;
    }

    return matchesSearch && matchesBrand && matchesStatus && matchesBrake;
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
    setFormImages([]);
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
      fuelSupply: 'FI',
      brakingSystem: formBrakingSystem,
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
      images: formImages,
      documentPdfName: 'BRTA_Papers.pdf',
      specs: {
        engine: `${formCc}cc Single Cylinder`,
        maxPower: '18 HP',
        maxTorque: '14.2 Nm',
        fuelTankCapacity: '12 L',
        topSpeed: '130 km/h',
        curbWeight: '140 kg',
        seatHeight: '800 mm',
        frontBrake: formBrakingSystem.includes('Drum') ? 'Drum' : 'Disc ABS',
        rearBrake: formBrakingSystem.includes('Dual') ? 'Disc' : 'Drum',
        absType: formBrakingSystem,
        brakingSystem: formBrakingSystem,
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1800px] w-full mx-auto">
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

        {/* Braking System Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs pt-2 border-t border-slate-800/60">
          <span className="text-slate-400 text-[11px] mr-1 shrink-0 flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>ব্রেকিং সিস্টেম:</span>
          </span>
          {[
            { id: 'ALL', label: 'All Brakes' },
            { id: 'Dual Channel ABS', label: 'Dual ABS' },
            { id: 'Single Channel ABS', label: 'Single ABS' },
            { id: 'CBS', label: 'CBS' },
            { id: 'Dual Disc', label: 'Dual Disc' }
          ].map((sys) => (
            <button
              key={sys.id}
              onClick={() => setSelectedBrakingSystem(sys.id)}
              className={`px-2.5 py-0.5 rounded-md text-[11px] shrink-0 transition-colors border ${
                selectedBrakingSystem === sys.id
                  ? 'bg-indigo-500/25 text-indigo-300 border-indigo-500/40 font-semibold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {sys.label}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-5 xl:gap-6">
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
                  {/* Brand & Bike Name & Badges */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wide">
                        {bike.brand} · {bike.category}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Braking System Badge */}
                        {(bike.brakingSystem || bike.specs?.brakingSystem || bike.specs?.absType) && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {bike.brakingSystem || bike.specs?.brakingSystem || (bike.specs?.absType?.includes('Dual') ? 'Dual ABS' : 'Single ABS')}
                          </span>
                        )}
                        {bike.fuelSupply && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            bike.fuelSupply === 'Carburetor' 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                              : bike.fuelSupply === 'Electric'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          }`}>
                            {bike.fuelSupply === 'Carburetor' ? 'Carb' : bike.fuelSupply}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="font-bold text-white text-base font-display truncate group-hover:text-cyan-300 transition-colors mt-0.5">
                      {bike.name}
                    </h3>
                  </div>

                  {/* 4 Key Points Grid with Braking System */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-[9px] text-slate-500">ENGINE</div>
                        <div className="font-semibold text-slate-200">
                          {bike.cc} cc {bike.fuelSupply ? `· ${bike.fuelSupply === 'Carburetor' ? 'Carb' : bike.fuelSupply}` : ''}
                        </div>
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
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div className="truncate">
                        <div className="text-[9px] text-slate-500">BRAKES</div>
                        <div className="font-semibold text-slate-200 truncate text-[11px]">
                          {bike.brakingSystem || bike.specs?.brakingSystem || (bike.specs?.absType?.includes('Dual') ? 'Dual ABS' : 'Single ABS')}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-[9px] text-slate-500">REG YEAR</div>
                        <div className="font-semibold text-slate-200">{bike.regYear || bike.year}</div>
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
        <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg shadow-2xl my-auto flex flex-col max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950 shrink-0">
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

            <form onSubmit={handleSubmitForm} className="p-4 sm:p-5 space-y-3.5 overflow-y-auto flex-1">
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
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormModel(val);
                      const lower = val.toLowerCase();
                      if (
                        lower.includes('dual abs') ||
                        lower.includes('dual channel') ||
                        lower.includes('r15') ||
                        lower.includes('ns400') ||
                        lower.includes('n250') ||
                        lower.includes('f250') ||
                        lower.includes('n160 dual') ||
                        lower.includes('rr 310') ||
                        lower.includes('cbr') ||
                        lower.includes('duke') ||
                        lower.includes('ninja') ||
                        lower.includes('dominar') ||
                        lower.includes('classic 350 dark')
                      ) {
                        setFormBrakingSystem('Dual Channel ABS');
                      } else if (
                        lower.includes('single abs') ||
                        lower.includes('single channel') ||
                        lower.includes('abs') ||
                        lower.includes('fz-s') ||
                        lower.includes('mt-15') ||
                        lower.includes('gixxer') ||
                        lower.includes('ns160')
                      ) {
                        setFormBrakingSystem('Single Channel ABS');
                      } else if (lower.includes('dual disc') || lower.includes('twin disc')) {
                        setFormBrakingSystem('Dual Disc');
                      } else if (lower.includes('cbs') || lower.includes('combi')) {
                        setFormBrakingSystem('CBS');
                      } else if (lower.includes('drum')) {
                        setFormBrakingSystem('Drum Brakes');
                      }
                    }}
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

              {/* Braking System and Category */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Braking System (ব্রেকিং সিস্টেম)</label>
                  <select
                    value={formBrakingSystem}
                    onChange={(e) => setFormBrakingSystem(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Dual Channel ABS">Dual Channel ABS</option>
                    <option value="Single Channel ABS">Single Channel ABS</option>
                    <option value="CBS">CBS (Combi Brake)</option>
                    <option value="Dual Disc">Dual Disc</option>
                    <option value="Front Disc / Rear Drum">Front Disc / Rear Drum</option>
                    <option value="Drum Brakes">Drum Brakes</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Sport">Sport</option>
                    <option value="Naked">Naked</option>
                    <option value="Commuter">Commuter</option>
                    <option value="Cruiser">Cruiser</option>
                    <option value="Tourer">Tourer</option>
                  </select>
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
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="file"
                    id="stock-modal-file-upload"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (!files || files.length === 0) return;
                      Array.from(files).forEach((file) => {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            setFormImages((prev) => [...prev, ev.target!.result as string]);
                          }
                        };
                        reader.readAsDataURL(file);
                      });
                      e.target.value = '';
                    }}
                  />
                  <label
                    htmlFor="stock-modal-file-upload"
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 hover:border-cyan-500/40 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Device Photos</span>
                  </label>

                  <div className="flex-1 flex gap-2">
                    <input
                      type="url"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="Or paste image URL: https://..."
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
