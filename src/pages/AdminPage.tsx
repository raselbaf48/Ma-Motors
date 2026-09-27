import React, { useState } from 'react';
import { Bike, CustomerInquiry, SellBikeSubmission, ConditionGrade, ActivePage } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { POPULAR_BRANDS } from '../utils/brandLogos';
import { BrandLogo } from '../components/common/BrandLogo';
import { BRAND_MODELS_DB, autoDetectBrakingSystem, detectFuelSupply } from '../utils/motorcycleDatabase';
import { handleNumericKeyDown, sanitizeNumeric, handleTextOnlyKeyDown, sanitizeTextOnly } from '../utils/inputValidation';
import { 
  SlidersHorizontal, 
  Layers, 
  DollarSign, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle, 
  X, 
  Search, 
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  User,
  ShieldCheck,
  TrendingUp,
  Tag,
  FileText,
  UploadCloud,
  FileCheck,
  Check,
  Zap,
  Lock
} from 'lucide-react';

interface AdminPageProps {
  bikes: Bike[];
  inquiries: CustomerInquiry[];
  sellRequests: SellBikeSubmission[];
  onAddBike: (newBike: Bike) => void;
  onUpdateBike: (updatedBike: Bike) => void;
  onDeleteBike: (bikeId: string) => void;
  onUpdateInquiryStatus: (inquiryId: string, status: CustomerInquiry['status']) => void;
  onUpdateSellStatus: (sellId: string, status: SellBikeSubmission['status']) => void;
  onNavigate: (page: ActivePage) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  bikes,
  inquiries,
  sellRequests,
  onAddBike,
  onUpdateBike,
  onDeleteBike,
  onUpdateInquiryStatus,
  onUpdateSellStatus,
  onNavigate
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'inventory' | 'inquiries' | 'sell_requests'>('inventory');

  // Search in inventory
  const [inventorySearch, setInventorySearch] = useState('');

  // Add / Edit Modal state
  const [isBikeModalOpen, setIsBikeModalOpen] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);

  // Form Fields for Add/Edit as requested by user:
  // Brand, Model Name, MFG Year, Reg year, reg Number, buying price, Asking price, Document (Pdf)
  const [formBrand, setFormBrand] = useState('Yamaha');
  const [formCustomBrand, setFormCustomBrand] = useState('');
  const [isCustomBrand, setIsCustomBrand] = useState(false);
  const [formBrandLogoUrl, setFormBrandLogoUrl] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formMfgYear, setFormMfgYear] = useState<number>(2023);
  const [formRegYear, setFormRegYear] = useState<number>(2023);
  const [formIsOnTest, setFormIsOnTest] = useState<boolean>(false);
  const [formRegNumber, setFormRegNumber] = useState('');
  const [formBuyingPrice, setFormBuyingPrice] = useState<number>(250000);
  const [formAskingPrice, setFormAskingPrice] = useState<number>(300000);
  const [formDocumentPdfName, setFormDocumentPdfName] = useState('BRTA_Clearance_Doc.pdf');
  const [formDocumentPdfUrl, setFormDocumentPdfUrl] = useState('');

  // Additional helpful fields
  const [formName, setFormName] = useState('');
  const [formCc, setFormCc] = useState(155);
  const [formMileage, setFormMileage] = useState(6500);
  const [formGrade, setFormGrade] = useState<ConditionGrade>('A+');
  const [formCategory, setFormCategory] = useState<'Sport' | 'Cruiser' | 'Naked' | 'Commuter' | 'Tourer' | 'Scooter'>('Sport');
  const [formBrakingSystem, setFormBrakingSystem] = useState<string>('Dual Channel ABS');
  const [isAutoBrakeSelected, setIsAutoBrakeSelected] = useState<boolean>(true);
  const [formStatus, setFormStatus] = useState<'Available' | 'Reserved' | 'Sold'>('Available');

  // Document preview state
  const [previewPdfBike, setPreviewPdfBike] = useState<Bike | null>(null);

  const CURRENT_YEAR = new Date().getFullYear();
  const ALL_MFG_YEARS = Array.from({ length: CURRENT_YEAR - 2010 + 1 }, (_, i) => CURRENT_YEAR - i);
  const availableRegYears = ALL_MFG_YEARS.filter((yr) => yr >= formMfgYear).sort((a, b) => a - b);

  const handleBuyingPriceChange = (val: number) => {
    setFormBuyingPrice(val);
    if (val > 0) {
      setFormAskingPrice(Math.round(val * 1.20));
    }
  };

  const handleMfgYearChange = (year: number) => {
    setFormMfgYear(year);
    if (formRegYear < year) {
      setFormRegYear(year);
    }
  };

  const handleToggleOnTest = (checked: boolean) => {
    setFormIsOnTest(checked);
    if (checked) {
      setFormRegNumber('On Test');
    } else if (formRegNumber === 'On Test') {
      setFormRegNumber(`Dhaka Metro-LA-55-${Math.floor(1000 + Math.random() * 9000)}`);
    }
  };

  const openAddModal = () => {
    setEditingBike(null);
    setFormBrand('Yamaha');
    setFormCustomBrand('');
    setIsCustomBrand(false);
    setFormBrandLogoUrl('');
    setFormModel('YZF-R15 V4 Dual ABS');
    setFormBrakingSystem('Dual Channel ABS');
    setIsAutoBrakeSelected(true);
    setFormName('Yamaha YZF-R15 V4 Racing');
    setFormMfgYear(2023);
    setFormRegYear(2023);
    setFormIsOnTest(false);
    setFormRegNumber('Dhaka Metro-LA-55-9012');
    setFormBuyingPrice(250000);
    setFormAskingPrice(Math.round(250000 * 1.20));
    setFormDocumentPdfName('BRTA_Clearance_R15V4.pdf');
    setFormDocumentPdfUrl('');
    setFormCc(155);
    setFormMileage(5500);
    setFormGrade('A+');
    setFormCategory('Sport');
    setFormStatus('Available');
    setIsBikeModalOpen(true);
  };

  const openEditModal = (bike: Bike) => {
    setEditingBike(bike);
    const isStandard = POPULAR_BRANDS.some((b) => b.toLowerCase() === bike.brand.toLowerCase());
    if (isStandard) {
      setFormBrand(bike.brand);
      setFormCustomBrand('');
      setIsCustomBrand(false);
    } else {
      setFormBrand('Other');
      setFormCustomBrand(bike.brand);
      setIsCustomBrand(true);
    }
    setFormBrandLogoUrl(bike.brandLogoUrl || '');
    setFormModel(bike.model || bike.name);
    setFormBrakingSystem(bike.brakingSystem || bike.specs?.brakingSystem || 'Single Channel ABS');
    setIsAutoBrakeSelected(false);
    setFormName(bike.name);
    setFormMfgYear(bike.mfgYear || bike.year || 2023);
    setFormRegYear(bike.regYear || bike.year || 2023);
    const isOnTest = (bike.regNumber || '').toLowerCase().includes('on test');
    setFormIsOnTest(isOnTest);
    setFormRegNumber(bike.regNumber || bike.inspection?.registrationNumber || 'Dhaka Metro-LA-12-3456');
    setFormBuyingPrice(bike.buyingPrice || Math.round((bike.askingPrice || bike.price) * 0.82));
    setFormAskingPrice(bike.askingPrice || bike.price);
    setFormDocumentPdfName(bike.documentPdfName || `BRTA_Papers_${bike.regNumber || 'Doc'}.pdf`);
    setFormDocumentPdfUrl(bike.documentPdfUrl || '');
    setFormCc(bike.cc);
    setFormMileage(bike.mileageKm);
    setFormGrade(bike.conditionGrade);
    setFormCategory(bike.category);
    setFormStatus(bike.status);
    setIsBikeModalOpen(true);
  };

  const handleSaveBike = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBrand = (isCustomBrand && formCustomBrand.trim()) ? formCustomBrand.trim() : formBrand;
    if (!finalBrand || !formModel) return;

    const computedName = formName.trim() ? formName.trim() : `${finalBrand} ${formModel}`;

    if (editingBike) {
      // Update existing bike
      const updated: Bike = {
        ...editingBike,
        name: computedName,
        brand: finalBrand,
        brandLogoUrl: formBrandLogoUrl.trim() || undefined,
        model: formModel,
        brakingSystem: formBrakingSystem,
        mfgYear: Number(formMfgYear),
        regYear: formIsOnTest ? Number(formMfgYear) : Number(formRegYear),
        year: Number(formMfgYear),
        regNumber: formIsOnTest ? 'On Test' : formRegNumber,
        registrationYear: formIsOnTest ? Number(formMfgYear) : Number(formRegYear),
        buyingPrice: Number(formBuyingPrice),
        askingPrice: Number(formAskingPrice),
        price: Number(formAskingPrice),
        originalPrice: Math.max(Number(formAskingPrice), editingBike.originalPrice || Number(formAskingPrice)),
        documentPdfName: formDocumentPdfName,
        documentPdfUrl: formDocumentPdfUrl,
        cc: Number(formCc),
        mileageKm: Number(formMileage),
        conditionGrade: formGrade,
        category: formCategory,
        status: formStatus,
        inspection: {
          ...editingBike.inspection,
          registrationNumber: formRegNumber
        }
      };
      onUpdateBike(updated);
    } else {
      // Add new bike
      const newBike: Bike = {
        id: `bike-${Date.now()}`,
        name: computedName,
        brand: finalBrand,
        brandLogoUrl: formBrandLogoUrl.trim() || undefined,
        model: formModel,
        brakingSystem: formBrakingSystem,
        mfgYear: Number(formMfgYear),
        regYear: formIsOnTest ? Number(formMfgYear) : Number(formRegYear),
        year: Number(formMfgYear),
        regNumber: formIsOnTest ? 'On Test' : formRegNumber,
        registrationYear: formIsOnTest ? Number(formMfgYear) : Number(formRegYear),
        buyingPrice: Number(formBuyingPrice),
        askingPrice: Number(formAskingPrice),
        price: Number(formAskingPrice),
        originalPrice: Math.round(Number(formAskingPrice) * 1.15),
        documentPdfName: formDocumentPdfName,
        documentPdfUrl: formDocumentPdfUrl,
        cc: Number(formCc),
        mileageKm: Number(formMileage),
        conditionGrade: formGrade,
        conditionLabel: formGrade === 'A+' ? 'Showroom Mint' : formGrade === 'A' ? 'Inspected Good' : 'Fair Condition',
        fuelType: 'Petrol',
        transmission: 'Manual',
        color: 'Showroom Cyan / Silver',
        colorHex: '#06b6d4',
        category: formCategory,
        featured: false,
        inStock: true,
        status: formStatus,
        registrationCity: 'Dhaka BRTA',
        ownersCount: 1,
        warrantyMonths: 12,
        images: ['sample-bike'],
        specs: {
          engine: `${formCc}cc Liquid-Cooled 4-Stroke`,
          maxPower: '18.4 HP @ 10,000 RPM',
          maxTorque: '14.2 Nm @ 7,500 RPM',
          fuelTankCapacity: '11 Liters',
          topSpeed: '140 km/h',
          curbWeight: '142 kg',
          seatHeight: '815 mm',
          frontBrake: 'Disc Brake with ABS',
          rearBrake: 'Disc Brake',
          absType: 'Dual Channel ABS',
          tyreConditionPct: 90,
          batteryHealthPct: 95
        },
        inspection: {
          overallScore: 94,
          engineHealth: 95,
          chassisFrame: 100,
          tyresSuspension: 92,
          electricals: 96,
          bodyPaint: 92,
          scratchesNotes: 'Verified genuine original parts with zero frame alteration.',
          tyresNotes: 'Good tread depth remaining.',
          engineNotes: 'Smooth idling and crisp acceleration.',
          documentsVerified: true,
          registrationNumber: formRegNumber,
          taxTokenValidUntil: '2027',
          insuranceValidUntil: '2026',
          fitnessValidUntil: '2027',
          ownershipTransferGuaranteed: true
        }
      };
      onAddBike(newBike);
    }

    setIsBikeModalOpen(false);
  };

  const handleSimulatePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormDocumentPdfName(file.name);
    }
  };

  const filteredInventory = bikes.filter((b) => {
    if (!inventorySearch.trim()) return true;
    const q = inventorySearch.toLowerCase();
    return (
      b.name.toLowerCase().includes(q) ||
      b.brand.toLowerCase().includes(q) ||
      (b.model && b.model.toLowerCase().includes(q)) ||
      (b.regNumber && b.regNumber.toLowerCase().includes(q)) ||
      (b.inspection?.registrationNumber && b.inspection.registrationNumber.toLowerCase().includes(q))
    );
  });

  const totalInventoryValue = bikes.reduce((acc, curr) => acc + (curr.askingPrice || curr.price), 0);
  const totalBuyingValue = bikes.reduce((acc, curr) => acc + (curr.buyingPrice || Math.round((curr.askingPrice || curr.price) * 0.82)), 0);
  const availableCount = bikes.filter((b) => b.status === 'Available').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;
  const pendingSellCount = sellRequests.filter((s) => s.status === 'Pending Review').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Admin Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-base shadow">
            M
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
              <span>MotoPrime Showroom Admin DMS</span>
              <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.2 rounded">
                Admin Console
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Tejgaon Hub, Dhaka · BDT Currency (৳) Active
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('menu')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 transition-colors"
            title="Open Sidebar Options in Separate Page"
          >
            <span>☰ Sidebar Options</span>
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit to Showroom</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Main Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Admin Navigation */}
        <aside className="w-full md:w-64 bg-slate-900/70 border-r border-slate-800 p-4 space-y-2">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-2 mb-2">
            Showroom DMS Menu
          </div>

          <button
            onClick={() => setActiveAdminTab('inventory')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeAdminTab === 'inventory'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Inventory & Edit Bikes</span>
            </div>
            <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
              activeAdminTab === 'inventory' ? 'bg-slate-950 text-cyan-300' : 'bg-slate-950 text-slate-300'
            }`}>
              {bikes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveAdminTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeAdminTab === 'dashboard'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Financial Overview</span>
            </div>
          </button>

          <button
            onClick={() => setActiveAdminTab('inquiries')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeAdminTab === 'inquiries'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Customer Inquiries</span>
            </div>
            {newInquiriesCount > 0 && (
              <span className="font-mono text-[10px] bg-cyan-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                {newInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveAdminTab('sell_requests')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
              activeAdminTab === 'sell_requests'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Sell Submissions</span>
            </div>
            {pendingSellCount > 0 && (
              <span className="font-mono text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded-full">
                {pendingSellCount}
              </span>
            )}
          </button>
        </aside>

        {/* Right Admin Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden space-y-6">
          {/* TAB 1: INVENTORY MANAGEMENT TABLE (DEFAULT) */}
          {activeAdminTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">
                    Motorcycle Inventory & Spec Editor
                  </h2>
                  <p className="text-xs text-slate-400">
                    Admin can edit bike details: Brand, Model Name, MFG Year, Reg Year, Reg Number, Buying Price, Asking Price, and Document (PDF).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                      placeholder="Search Brand, Model, Reg #..."
                      className="pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button
                    onClick={openAddModal}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition-colors whitespace-nowrap"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Bike</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-3">Brand & Model</th>
                        <th className="p-3">MFG & Reg Year</th>
                        <th className="p-3">Reg Number</th>
                        <th className="p-3">Buying Price (৳)</th>
                        <th className="p-3">Asking Price (৳)</th>
                        <th className="p-3">Document (PDF)</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {filteredInventory.map((bike) => (
                        <tr key={bike.id} className="hover:bg-slate-800/40">
                          {/* Brand & Model */}
                          <td className="p-3">
                            <div className="font-bold text-white">{bike.brand} {bike.model}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{bike.name}</div>
                          </td>

                          {/* MFG & Reg Year */}
                          <td className="p-3 font-mono text-slate-300">
                            <div>MFG: {bike.mfgYear || bike.year}</div>
                            <div className="text-[11px] text-cyan-400 font-semibold">Reg: {bike.regYear || bike.year}</div>
                          </td>

                          {/* Reg Number */}
                          <td className="p-3 font-mono">
                            <span className="bg-slate-950 px-2 py-1 rounded text-cyan-400 font-bold border border-slate-800">
                              {bike.regNumber || bike.inspection.registrationNumber}
                            </span>
                          </td>

                          {/* Buying Price */}
                          <td className="p-3 font-mono font-medium text-slate-300">
                            {formatBDT(bike.buyingPrice || Math.round((bike.askingPrice || bike.price) * 0.82))}
                          </td>

                          {/* Asking Price */}
                          <td className="p-3 font-mono font-bold text-emerald-400">
                            {formatBDT(bike.askingPrice || bike.price)}
                          </td>

                          {/* Document PDF */}
                          <td className="p-3">
                            <button
                              onClick={() => setPreviewPdfBike(bike)}
                              className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                              title="Click to view BRTA verified document"
                            >
                              <FileText className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="truncate max-w-[110px]">
                                {bike.documentPdfName || 'BRTA_Doc.pdf'}
                              </span>
                            </button>
                          </td>

                          {/* Status */}
                          <td className="p-3">
                            <select
                              value={bike.status}
                              onChange={(e) => {
                                onUpdateBike({
                                  ...bike,
                                  status: e.target.value as any
                                });
                              }}
                              className={`bg-slate-950 border text-[11px] font-semibold rounded px-2 py-1 focus:outline-none ${
                                bike.status === 'Available'
                                  ? 'border-emerald-500/40 text-emerald-400'
                                  : bike.status === 'Reserved'
                                  ? 'border-amber-500/40 text-amber-400'
                                  : 'border-slate-700 text-slate-500'
                              }`}
                            >
                              <option value="Available">Available</option>
                              <option value="Reserved">Reserved</option>
                              <option value="Sold">Sold</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => openEditModal(bike)}
                                className="p-2 rounded bg-slate-800 text-slate-200 hover:text-white hover:bg-cyan-600 transition-colors"
                                title="Edit full bike details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${bike.name}?`)) {
                                    onDeleteBike(bike.id);
                                  }
                                }}
                                className="p-2 rounded bg-slate-800 text-slate-400 hover:text-amber-400 hover:bg-slate-700 transition-colors"
                                title="Delete bike"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FINANCIAL OVERVIEW */}
          {activeAdminTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white font-display">
                    Dealership Financial Overview (BDT)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Live inventory acquisition valuation, retail pricing, and customer inquiries.
                  </p>
                </div>
                <button
                  onClick={openAddModal}
                  className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg shadow-lg shadow-cyan-500/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Bike</span>
                </button>
              </div>

              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Bikes In Stock</div>
                  <div className="text-2xl font-black font-mono text-white tabular-nums">
                    {availableCount} <span className="text-xs font-normal text-slate-500">of {bikes.length} total</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono pt-1">
                    Ready for delivery in Dhaka
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Total Asking Price Value</div>
                  <div className="text-2xl font-black font-mono text-white tabular-nums">
                    {formatBDT(totalInventoryValue)}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono pt-1">
                    Acquisition cost: {formatBDT(totalBuyingValue)}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Active Inquiries / Leads</div>
                  <div className="text-2xl font-black font-mono text-cyan-400 tabular-nums">
                    {inquiries.length} Leads
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono pt-1">
                    {newInquiriesCount} new unattended
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
                  <div className="text-xs text-slate-400 font-medium">Sell Requests Pending</div>
                  <div className="text-2xl font-black font-mono text-amber-400 tabular-nums">
                    {pendingSellCount} Submissions
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono pt-1">
                    Awaiting physical evaluation
                  </div>
                </div>
              </div>

              {/* Quick Inquiries Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-display">
                    Recent Customer Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveAdminTab('inquiries')}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    View All Inquiries →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono">
                      <tr>
                        <th className="p-2.5">Customer</th>
                        <th className="p-2.5">Bike Target</th>
                        <th className="p-2.5">Inquiry Type</th>
                        <th className="p-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {inquiries.slice(0, 4).map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-800/40">
                          <td className="p-2.5">
                            <div className="font-semibold text-white">{inq.customerName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{inq.phone}</div>
                          </td>
                          <td className="p-2.5 text-slate-200">{inq.bikeName}</td>
                          <td className="p-2.5 text-cyan-400 font-mono">{inq.inquiryType}</td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                              inq.status === 'New'
                                ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            }`}>
                              {inq.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES & TEST RIDES TABLE */}
          {activeAdminTab === 'inquiries' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Customer Inquiries & Test Ride Bookings
                </h2>
                <p className="text-xs text-slate-400">
                  Manage incoming customer leads, test ride schedules, and communication status.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-3">Customer Info</th>
                        <th className="p-3">Bike Interested In</th>
                        <th className="p-3">Inquiry Type</th>
                        <th className="p-3">Preferred Date / Slot</th>
                        <th className="p-3">Notes</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-800/40">
                          <td className="p-3">
                            <div className="font-bold text-white">{inq.customerName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{inq.phone}</div>
                            {inq.email && <div className="text-[10px] text-slate-500">{inq.email}</div>}
                          </td>

                          <td className="p-3">
                            <span className="font-semibold text-slate-200">{inq.bikeName}</span>
                          </td>

                          <td className="p-3 font-mono text-cyan-400 font-semibold">
                            {inq.inquiryType}
                          </td>

                          <td className="p-3 text-slate-300 font-mono text-[11px]">
                            {inq.preferredDate || 'Flexible'}
                          </td>

                          <td className="p-3 text-slate-400 max-w-xs text-[11px]">
                            {inq.notes}
                          </td>

                          <td className="p-3">
                            <select
                              value={inq.status}
                              onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Test Ride Scheduled">Test Ride Scheduled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SELL REQUESTS SUBMISSIONS TABLE */}
          {activeAdminTab === 'sell_requests' && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
                  Customer Bike Sell & Trade-in Submissions
                </h2>
                <p className="text-xs text-slate-400">
                  Review customer bikes submitted for sale, inspect valuations, and make purchase offers.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-3">Seller Details</th>
                        <th className="p-3">Bike Details</th>
                        <th className="p-3">Odometer & Grade</th>
                        <th className="p-3">Seller Asking Price (৳)</th>
                        <th className="p-3">Estimated Offer (৳)</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {sellRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-800/40">
                          <td className="p-3">
                            <div className="font-bold text-white">{req.sellerName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{req.phone}</div>
                            {req.email && <div className="text-[10px] text-slate-500">{req.email}</div>}
                          </td>

                          <td className="p-3">
                            <div className="font-bold text-slate-200">{req.brand} {req.model}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{req.year} · {req.cc} cc</div>
                          </td>

                          <td className="p-3 font-mono text-slate-300">
                            <div>{req.mileageKm.toLocaleString()} km</div>
                            <div className="text-[10px] text-emerald-400">Grade {req.conditionGrade}</div>
                          </td>

                          <td className="p-3 font-mono font-bold text-white">
                            {formatBDT(req.expectedPrice)}
                          </td>

                          <td className="p-3 font-mono text-emerald-400 font-bold">
                            {formatBDT(req.estimatedOfferMin)} – {formatBDT(req.estimatedOfferMax)}
                          </td>

                          <td className="p-3">
                            <select
                              value={req.status}
                              onChange={(e) => onUpdateSellStatus(req.id, e.target.value as any)}
                              className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                            >
                              <option value="Pending Review">Pending Review</option>
                              <option value="Inspection Scheduled">Inspection Scheduled</option>
                              <option value="Offer Made">Offer Made</option>
                              <option value="Accepted">Accepted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Bike Modal: Exactly includes the requested fields */}
      {isBikeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl relative p-6">
            <button
              onClick={() => setIsBikeModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                {editingBike ? 'Edit Motorcycle Details' : 'New Inventory Entry'}
              </span>
              <h3 className="text-lg font-bold text-white font-display">
                {editingBike ? `Edit: ${editingBike.name}` : 'Add Motorcycle to Showroom Inventory'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                All prices in Bangladeshi Taka (BDT ৳). All details persist across showroom pages.
              </p>
            </div>

            <form onSubmit={handleSaveBike} className="space-y-4 text-xs">
              {/* Field Group 1: Brand & Model Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-300">
                      Brand (ব্র্যান্ড) *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const next = !isCustomBrand;
                        setIsCustomBrand(next);
                        if (next) {
                          setFormCustomBrand('');
                        }
                      }}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                    >
                      {isCustomBrand ? 'তালিকা থেকে সিলেক্ট করুন' : '+ অন্য কোনো ব্র্যান্ড'}
                    </button>
                  </div>

                  {isCustomBrand ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          required
                          value={formCustomBrand}
                          onChange={(e) => {
                            setFormCustomBrand(e.target.value);
                            setFormBrand(e.target.value);
                          }}
                          placeholder="যেকোনো ব্র্যান্ড লিখুন (যেমন: BMW, Runner, GPX...)"
                          className="flex-1 bg-slate-950 border border-cyan-500/60 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-400 font-semibold"
                        />
                        <div className="w-12 h-9 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-slate-700 shadow-sm" title="Auto Brand Logo Preview">
                          <BrandLogo brand={formCustomBrand || 'Other'} size="sm" customLogoUrl={formBrandLogoUrl} />
                        </div>
                      </div>
                      <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>ব্র্যান্ডের আসল লোগো স্বয়ংক্রিয়ভাবে ডিটেক্ট হবে</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <select
                        value={formBrand}
                        onChange={(e) => setFormBrand(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500 font-semibold"
                      >
                        {POPULAR_BRANDS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      <div className="w-12 h-9 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-slate-700 shadow-sm" title="Auto Brand Logo Preview">
                        <BrandLogo brand={formBrand} size="sm" customLogoUrl={formBrandLogoUrl} />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Model Name (মডেলের নাম) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formModel}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormModel(val);
                      const currentBrand = (isCustomBrand && formCustomBrand.trim()) ? formCustomBrand.trim() : formBrand;
                      const detected = autoDetectBrakingSystem(currentBrand, val);
                      setFormBrakingSystem(detected.brakingSystem);
                      if (detected.cc) setFormCc(detected.cc);
                      if (detected.category) setFormCategory(detected.category);
                      setIsAutoBrakeSelected(detected.isAutoMatched);
                    }}
                    placeholder="e.g. YZF-R15 V4 Dual ABS, FZ-S V3, Pulsar N160..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500 font-semibold"
                  />
                </div>
              </div>

              {/* Quick Model Presets for Brand */}
              {(() => {
                const currentBrand = (isCustomBrand && formCustomBrand.trim()) ? formCustomBrand.trim() : formBrand;
                const models = BRAND_MODELS_DB[currentBrand.toLowerCase()] || [];
                if (models.length === 0) return null;
                return (
                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{currentBrand}-এর মডেল নির্বাচন (ক্লিক করলেই ব্রেকিং সিস্টেম অটো সেট হবে):</span>
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                      {models.map((m) => (
                        <button
                          key={m.model}
                          type="button"
                          onClick={() => {
                            setFormModel(m.model);
                            setFormBrakingSystem(m.brakingSystem);
                            setFormCc(m.cc);
                            setFormCategory(m.category);
                            setFormName(`${currentBrand} ${m.model}`);
                            setIsAutoBrakeSelected(true);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 transition-all border cursor-pointer active:scale-95 ${
                            formModel === m.model
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                              : 'bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white border-slate-800'
                          }`}
                        >
                          <span>{m.model}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Braking System: Strictly Auto-Calculated, Manual change disabled */}
              <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Braking System (ব্রেকিং সিস্টেম)</span>
                  </label>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shadow-sm">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    <span>মডেল অনুযায়ী অটো-সিলেক্টেড (লক করা)</span>
                  </span>
                </div>
                <div className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-white font-mono text-xs flex items-center justify-between font-bold cursor-not-allowed select-none opacity-95">
                  <span className="text-cyan-300 font-bold">{formBrakingSystem}</span>
                  <span className="text-[10px] text-slate-400 font-normal">ম্যানুয়াল পরিবর্তন করা যাবে না</span>
                </div>
              </div>

              {/* Full Display Name */}
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Full Display Listing Name (পূর্ণ নাম)
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Yamaha YZF-R15 V4 Racing Edition"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* On-Test Checkbox */}
              <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="admin-ontest-checkbox"
                    checked={formIsOnTest}
                    onChange={(e) => handleToggleOnTest(e.target.checked)}
                    className="w-4 h-4 rounded accent-cyan-500 cursor-pointer"
                  />
                  <label htmlFor="admin-ontest-checkbox" className="text-white font-semibold cursor-pointer select-none">
                    Bike On-Test (আনরেজিস্টার্ড / রেজিস্ট্রেশন এখনো হয়নি)
                  </label>
                </div>
                {formIsOnTest && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                    On-Test Active
                  </span>
                )}
              </div>

              {/* Field Group 2: MFG Year, Reg Year, Reg Number */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* MFG Dropdown (Name changed to MFG, 2010 to Running Year) */}
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    MFG *
                  </label>
                  <select
                    value={formMfgYear}
                    onChange={(e) => handleMfgYearChange(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono font-bold focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {ALL_MFG_YEARS.map((yr) => (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reg Year Dropdown (Hidden if Bike On-Test, only >= MFG Year up to running year) */}
                {!formIsOnTest ? (
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">
                      Reg Year *
                    </label>
                    <select
                      value={formRegYear}
                      onChange={(e) => setFormRegYear(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-cyan-400 font-mono font-bold focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      {availableRegYears.map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                {/* Reg Number */}
                <div className={formIsOnTest ? 'sm:col-span-2' : ''}>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Reg Number *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={formIsOnTest}
                    value={formIsOnTest ? 'On Test' : formRegNumber}
                    onChange={(e) => setFormRegNumber(e.target.value)}
                    placeholder="e.g. Dhaka Metro-LA-55-9012"
                    className={`w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono font-bold focus:outline-none focus:border-cyan-500 ${
                      formIsOnTest ? 'text-amber-400 opacity-80 cursor-not-allowed' : 'text-cyan-400'
                    }`}
                  />
                </div>
              </div>

              {/* Field Group 3: Buying Price & Asking Price in BDT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-300">
                      Buying Price (ক্রয় মূল্য - BDT ৳) *
                    </label>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400">৳</span>
                    <input
                      type="number"
                      required
                      step="1000"
                      value={formBuyingPrice}
                      onChange={(e) => handleBuyingPriceChange(Number(e.target.value))}
                      placeholder="250000"
                      className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono font-bold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    Formatted: {formatBDT(formBuyingPrice)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-300">
                      Asking Price (বিক্রয় মূল্য - BDT ৳) *
                    </label>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ক্রয়মূল্যের ২০% বেশি (+20% Auto)
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-emerald-400">৳</span>
                    <input
                      type="number"
                      required
                      step="1000"
                      value={formAskingPrice}
                      onChange={(e) => setFormAskingPrice(Number(e.target.value))}
                      placeholder="300000"
                      className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-emerald-500/40 rounded-lg text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="text-[11px] text-emerald-400/80 mt-1 font-mono flex items-center justify-between">
                    <span>Formatted: {formatBDT(formAskingPrice)}</span>
                    <span className="text-[9px] text-slate-400">প্রফিট: {formatBDT(formAskingPrice - formBuyingPrice)}</span>
                  </div>
                </div>
              </div>

              {/* Field Group 4: Document (PDF) Upload / Selection */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <label className="font-semibold text-slate-300 block">
                  Document (PDF) - BRTA Registration, Blue Book & Papers
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 w-full relative">
                    <FileText className="w-4 h-4 text-cyan-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formDocumentPdfName}
                      onChange={(e) => setFormDocumentPdfName(e.target.value)}
                      placeholder="e.g. BRTA_Paper_Clearance.pdf"
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <label className="cursor-pointer px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-semibold flex items-center gap-1.5 border border-slate-700 whitespace-nowrap">
                    <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Attach PDF File</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleSimulatePdfUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>PDF verification badge will be displayed on the public bike details page.</span>
                </div>
              </div>

              {/* Additional Bike Parameters: CC, Mileage, Grade, Status */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Engine (CC)</label>
                  <input
                    type="number"
                    value={formCc}
                    onChange={(e) => setFormCc(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Mileage (KM)</label>
                  <input
                    type="number"
                    value={formMileage}
                    onChange={(e) => setFormMileage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Condition Grade</label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="A+">Grade A+ (Mint)</option>
                    <option value="A">Grade A (Good)</option>
                    <option value="B">Grade B (Fair)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBikeModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-cyan-500/25 transition-colors"
                >
                  {editingBike ? 'Update Bike Details' : 'Save New Motorcycle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Document Preview Modal in Admin */}
      {previewPdfBike && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <div>
                  <h4 className="text-sm font-bold text-white">BRTA Document Record (PDF)</h4>
                  <div className="text-[11px] font-mono text-slate-400">{previewPdfBike.documentPdfName || 'BRTA_Document.pdf'}</div>
                </div>
              </div>
              <button
                onClick={() => setPreviewPdfBike(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 font-mono text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Brand & Model:</span>
                  <span className="text-white font-bold">{previewPdfBike.brand} {previewPdfBike.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Registration Number:</span>
                  <span className="text-cyan-400 font-bold">{previewPdfBike.regNumber || previewPdfBike.inspection.registrationNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MFG Year / Reg Year:</span>
                  <span className="text-white">{previewPdfBike.mfgYear || previewPdfBike.year} / {previewPdfBike.regYear || previewPdfBike.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Showroom Buying Price:</span>
                  <span className="text-white">{formatBDT(previewPdfBike.buyingPrice || Math.round((previewPdfBike.askingPrice || previewPdfBike.price) * 0.82))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer Asking Price:</span>
                  <span className="text-emerald-400 font-bold">{formatBDT(previewPdfBike.askingPrice || previewPdfBike.price)}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-300 text-[11px]">
                <div className="font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>BRTA Tax Token & Fitness Validated</span>
                </div>
                <div className="text-emerald-400/80 font-sans mt-0.5">
                  Tax token valid until {previewPdfBike.inspection.taxTokenValidUntil}. Legal ownership transfer guaranteed.
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setPreviewPdfBike(null)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
