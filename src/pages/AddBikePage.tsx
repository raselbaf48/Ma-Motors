import React, { useState, useMemo } from 'react';
import { Bike } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { SearchableSelect } from '../components/common/SearchableSelect';
import { BD_BRANDS, BD_MODEL_DATABASE, BDModelSpec } from '../data/bangladeshBikes';
export type { BDModelSpec };
export { BD_BRANDS, BD_MODEL_DATABASE };
import { 
  ArrowLeft, 
  Bike as BikeIcon, 
  Check, 
  DollarSign, 
  FileText, 
  Camera, 
  Zap,
  CreditCard,
  Fingerprint,
  UploadCloud,
  X,
  AlertCircle,
  Sparkles,
  Layers,
  User
} from 'lucide-react';

interface AddBikePageProps {
  onBack: () => void;
  onAddBike: (newBike: Bike) => void;
  showroomName?: string;
  logoUrl?: string;
}

// All major BRTA Circles across Bangladesh with their official vehicle series prefix
interface BRTAOffice {
  id: string;
  name: string;
  seriesPrefix: string;
}

const BRTA_OFFICES: BRTAOffice[] = [
  // Dhaka Metropolitan & District
  { id: 'mirpur', name: 'Dhaka Metro - Mirpur (ঢাকা মেট্রো - মিরপুর)', seriesPrefix: 'Dhaka Metro' },
  { id: 'ekuria', name: 'Dhaka Metro - Ekuria / Keraniganj (ঢাকা মেট্রো - ইকুরিয়া)', seriesPrefix: 'Dhaka Metro' },
  { id: 'uttara', name: 'Dhaka Metro - Uttara (ঢাকা মেট্রো - উত্তরা)', seriesPrefix: 'Dhaka Metro' },
  { id: 'diabari', name: 'Dhaka Metro - Diabari (ঢাকা মেট্রো - দিয়াবাড়ি)', seriesPrefix: 'Dhaka Metro' },
  { id: 'dhaka-dist', name: 'Dhaka District - Savar (ঢাকা জেলা - সাভার)', seriesPrefix: 'Dhaka' },
  
  // Surrounding Dhaka Division
  { id: 'gazipur', name: 'Gazipur (গাজীপুর)', seriesPrefix: 'Gazipur' },
  { id: 'narayanganj', name: 'Narayanganj (নারায়ণগঞ্জ)', seriesPrefix: 'Narayanganj' },
  { id: 'narsingdi', name: 'Narsingdi (নরসিংদী)', seriesPrefix: 'Narsingdi' },
  { id: 'manikganj', name: 'Manikganj (মানিকগঞ্জ)', seriesPrefix: 'Manikganj' },
  { id: 'munshiganj', name: 'Munshiganj (মুন্সীগঞ্জ)', seriesPrefix: 'Munshiganj' },
  { id: 'tangail', name: 'Tangail (টাঙ্গাইল)', seriesPrefix: 'Tangail' },
  { id: 'kishoreganj', name: 'Kishoreganj (কিশোরগঞ্জ)', seriesPrefix: 'Kishoreganj' },
  { id: 'faridpur', name: 'Faridpur (ফরিদপুর)', seriesPrefix: 'Faridpur' },
  { id: 'gopalganj', name: 'Gopalganj (গোপালগঞ্জ)', seriesPrefix: 'Gopalganj' },
  { id: 'madaripur', name: 'Madaripur (মাদারীপুর)', seriesPrefix: 'Madaripur' },
  { id: 'shariatpur', name: 'Shariatpur (শরীয়তপুর)', seriesPrefix: 'Shariatpur' },
  { id: 'rajbari', name: 'Rajbari (রাজবাড়ী)', seriesPrefix: 'Rajbari' },

  // Chattogram Division
  { id: 'chattogram-metro', name: 'Chattogram Metro (চট্টগ্রাম মেট্রো)', seriesPrefix: 'Chatto Metro' },
  { id: 'chattogram-dist', name: 'Chattogram District (চট্টগ্রাম জেলা)', seriesPrefix: 'Chattogram' },
  { id: 'cumilla', name: 'Cumilla (কুমিল্লা)', seriesPrefix: 'Cumilla' },
  { id: 'brahmanbaria', name: 'Brahmanbaria (ব্রাহ্মণবাড়িয়া)', seriesPrefix: 'Brahmanbaria' },
  { id: 'feni', name: 'Feni (ফেনী)', seriesPrefix: 'Feni' },
  { id: 'noakhali', name: 'Noakhali (নোয়াখালী)', seriesPrefix: 'Noakhali' },
  { id: 'chandpur', name: 'Chandpur (চাঁদপুর)', seriesPrefix: 'Chandpur' },
  { id: 'lakshmipur', name: 'Lakshmipur (লক্ষ্মীপুর)', seriesPrefix: 'Lakshmipur' },
  { id: 'coxsbazar', name: 'Cox\'s Bazar (কক্সবাজার)', seriesPrefix: 'Cox\'s Bazar' },
  { id: 'khagrachhari', name: 'Khagrachhari (খাগড়াছড়ি)', seriesPrefix: 'Khagrachhari' },
  { id: 'rangamati', name: 'Rangamati (রাঙ্গামাটি)', seriesPrefix: 'Rangamati' },
  { id: 'bandarban', name: 'Bandarban (বান্দরবান)', seriesPrefix: 'Bandarban' },

  // Sylhet Division
  { id: 'sylhet-metro', name: 'Sylhet Metro (সিলেট মেট্রো)', seriesPrefix: 'Sylhet Metro' },
  { id: 'sylhet-dist', name: 'Sylhet District (সিলেট জেলা)', seriesPrefix: 'Sylhet' },
  { id: 'moulvibazar', name: 'Moulvibazar (মৌলভীবাজার)', seriesPrefix: 'Moulvibazar' },
  { id: 'habiganj', name: 'Habiganj (হবিগঞ্জ)', seriesPrefix: 'Habiganj' },
  { id: 'sunamganj', name: 'Sunamganj (সুনামগঞ্জ)', seriesPrefix: 'Sunamganj' },

  // Rajshahi Division
  { id: 'rajshahi-metro', name: 'Rajshahi Metro (রাজশাহী মেট্রো)', seriesPrefix: 'Rajshahi Metro' },
  { id: 'rajshahi-dist', name: 'Rajshahi District (রাজশাহী জেলা)', seriesPrefix: 'Rajshahi' },
  { id: 'bogura', name: 'Bogura (বগুড়া)', seriesPrefix: 'Bogura' },
  { id: 'pabna', name: 'Pabna (পাবনা)', seriesPrefix: 'Pabna' },
  { id: 'sirajganj', name: 'Sirajganj (সিরাজগঞ্জ)', seriesPrefix: 'Sirajganj' },
  { id: 'naogaon', name: 'Naogaon (নওগাঁ)', seriesPrefix: 'Naogaon' },
  { id: 'natore', name: 'Natore (নাটোর)', seriesPrefix: 'Natore' },
  { id: 'chapai', name: 'Chapainawabganj (চাঁপাইনবাবগঞ্জ)', seriesPrefix: 'Chapai' },
  { id: 'joypurhat', name: 'Joypurhat (জয়পুরহাট)', seriesPrefix: 'Joypurhat' },

  // Khulna Division
  { id: 'khulna-metro', name: 'Khulna Metro (খুলনা মেট্রো)', seriesPrefix: 'Khulna Metro' },
  { id: 'khulna-dist', name: 'Khulna District (খুলনা জেলা)', seriesPrefix: 'Khulna' },
  { id: 'jashore', name: 'Jashore (যশোর)', seriesPrefix: 'Jashore' },
  { id: 'kushtia', name: 'Kushtia (কুষ্টিয়া)', seriesPrefix: 'Kushtia' },
  { id: 'jhenaidah', name: 'Jhenaidah (ঝিনাইদহ)', seriesPrefix: 'Jhenaidah' },
  { id: 'satkhira', name: 'Satkhira (সাতক্ষীরা)', seriesPrefix: 'Satkhira' },
  { id: 'bagerhat', name: 'Bagerhat (বাগেরহাট)', seriesPrefix: 'Bagerhat' },
  { id: 'chuadanga', name: 'Chuadanga (চুয়াডাঙ্গা)', seriesPrefix: 'Chuadanga' },
  { id: 'meherpur', name: 'Meherpur (মেহেরপুর)', seriesPrefix: 'Meherpur' },
  { id: 'magura', name: 'Magura (মাগুরা)', seriesPrefix: 'Magura' },
  { id: 'narail', name: 'Narail (নড়াইল)', seriesPrefix: 'Narail' },

  // Barishal Division
  { id: 'barishal-metro', name: 'Barishal Metro (বরিশাল মেট্রো)', seriesPrefix: 'Barishal Metro' },
  { id: 'barishal-dist', name: 'Barishal District (বরিশাল জেলা)', seriesPrefix: 'Barishal' },
  { id: 'patuakhali', name: 'Patuakhali (পটুয়াখালী)', seriesPrefix: 'Patuakhali' },
  { id: 'bhola', name: 'Bhola (ভোলা)', seriesPrefix: 'Bhola' },
  { id: 'barguna', name: 'Barguna (বরগুনা)', seriesPrefix: 'Barguna' },
  { id: 'pirojpur', name: 'Pirojpur (পিরোজপুর)', seriesPrefix: 'Pirojpur' },
  { id: 'jhalokati', name: 'Jhalokati (ঝালকাঠি)', seriesPrefix: 'Jhalokati' },

  // Rangpur Division
  { id: 'rangpur-metro', name: 'Rangpur Metro (রংপুর মেট্রো)', seriesPrefix: 'Rangpur Metro' },
  { id: 'rangpur-dist', name: 'Rangpur District (রংপুর জেলা)', seriesPrefix: 'Rangpur' },
  { id: 'dinajpur', name: 'Dinajpur (দিনাজপুর)', seriesPrefix: 'Dinajpur' },
  { id: 'thakurgaon', name: 'Thakurgaon (ঠাকুরগাঁও)', seriesPrefix: 'Thakurgaon' },
  { id: 'panchagarh', name: 'Panchagarh (পঞ্চগড়)', seriesPrefix: 'Panchagarh' },
  { id: 'nilphamari', name: 'Nilphamari (নীলফামারী)', seriesPrefix: 'Nilphamari' },
  { id: 'gaibandha', name: 'Gaibandha (গাইবান্ধা)', seriesPrefix: 'Gaibandha' },
  { id: 'kurigram', name: 'Kurigram (কুড়িগ্রাম)', seriesPrefix: 'Kurigram' },
  { id: 'lalmonirhat', name: 'Lalmonirhat (লালমনিরহাট)', seriesPrefix: 'Lalmonirhat' },

  // Mymensingh Division
  { id: 'mymensingh', name: 'Mymensingh (ময়মনসিংহ)', seriesPrefix: 'Mymensingh' },
  { id: 'jamalpur', name: 'Jamalpur (জামালপুর)', seriesPrefix: 'Jamalpur' },
  { id: 'netrokona', name: 'Netrokona (নেত্রকোণা)', seriesPrefix: 'Netrokona' },
  { id: 'sherpur', name: 'Sherpur (শেরপুর)', seriesPrefix: 'Sherpur' }
];


const SAMPLE_PRESET_IMAGES = [
  {
    name: 'Yamaha Cyan Sport',
    url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Dark Sport Bike',
    url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Street Fighter Naked',
    url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Royal Cruiser',
    url: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80'
  }
];

interface UploadedDocumentItem {
  id: string;
  name: string;
  size: string;
  type: string;
}

export const AddBikePage: React.FC<AddBikePageProps> = ({
  onBack,
  onAddBike,
  showroomName = 'Ma Motors',
  logoUrl
}) => {
  const [logoError, setLogoError] = useState(false);

  // 1. Basic Information (Category comes FIRST before Brand, NO defaults!)
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [isCustomModel, setIsCustomModel] = useState(false);
  const [customModelText, setCustomModelText] = useState('');
  const [autoFilledNotice, setAutoFilledNotice] = useState<string | null>(null);

  // 2. Engine & Specifications (Auto-filled on model select, read-only locked)
  const [cc, setCc] = useState<number | ''>('');
  const [customCcVal, setCustomCcVal] = useState<number | ''>('');
  const [fuelSupply, setFuelSupply] = useState<'FI' | 'Carburetor' | 'Electric' | ''>('');
  const [mileageKm, setMileageKm] = useState<number | ''>('');
  const [fuelType, setFuelType] = useState<string>('');
  const [color, setColor] = useState('');

  // 3. Papers & BRTA Documents (NO defaults)
  const [selectedBrtaId, setSelectedBrtaId] = useState<string>('');
  const [regAlphabet, setRegAlphabet] = useState<string>('');
  const [regSerial, setRegSerial] = useState('');
  const [regNumberCode, setRegNumberCode] = useState('');
  const [mfgYear, setMfgYear] = useState<number | ''>('');
  const [regYear, setRegYear] = useState<number | ''>('');
  const [ownersCount, setOwnersCount] = useState<number | ''>('');

  // Smart Card & Fingerprint: NO default selection, Smart Card is REQUIRED
  const [smartCardStatus, setSmartCardStatus] = useState<'Yes' | 'No' | 'Pending' | null>(null);
  const [fingerprintDone, setFingerprintDone] = useState<'Yes' | 'No' | null>(null);
  const [smartCardError, setSmartCardError] = useState(false);

  // Uploaded Documents
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocumentItem[]>([]);

  // 4. Pricing & Financials (NO defaults)
  const [buyingPrice, setBuyingPrice] = useState<number | ''>('');
  const [askingPrice, setAskingPrice] = useState<number | ''>('');

  // 5. Photos & Remarks
  const [imageUrl, setImageUrl] = useState(SAMPLE_PRESET_IMAGES[0].url);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [notes, setNotes] = useState('');

  // 6. Seller Information (বিক্রেতার তথ্য - যার কাছ থেকে বাইক কেনা হয়েছে)
  const [sellerName, setSellerName] = useState('');
  const [sellerPhone, setSellerPhone] = useState('');
  const [sellerNid, setSellerNid] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [memoOrStampNo, setMemoOrStampNo] = useState('');
  const [sellerNotes, setSellerNotes] = useState('');
  const [sellerError, setSellerError] = useState(false);

  // Find active BRTA office object
  const currentBrta = BRTA_OFFICES.find((b) => b.id === selectedBrtaId);

  // Auto calculate BRTA registration number
  const prefix = currentBrta ? currentBrta.seriesPrefix : 'Dhaka Metro';
  const alpha = regAlphabet || (typeof cc === 'number' && cc <= 125 ? 'HA' : 'LA');
  const displaySerial = regSerial.trim() || '55';
  const displayNumber = regNumberCode.trim() || '1234';
  const computedRegNumber = `${prefix}-${alpha}-${displaySerial}-${displayNumber}`;

  // Filter models based on Brand and Category
  const filteredModels = useMemo(() => {
    if (!brand || !BD_MODEL_DATABASE[brand]) return [];
    const brandAllModels = BD_MODEL_DATABASE[brand];
    if (!category) return brandAllModels;
    return brandAllModels.filter((m) => m.category === category);
  }, [brand, category]);

  // When Category changes:
  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    // If current selected model doesn't belong to new category, reset model
    if (brand && model && !isCustomModel) {
      const match = BD_MODEL_DATABASE[brand]?.find((m) => m.name === model);
      if (match && newCat && match.category !== newCat) {
        setModel('');
      }
    }
  };

  // When Brand changes:
  const handleBrandChange = (newBrand: string) => {
    setBrand(newBrand);
    setModel('');
    setIsCustomModel(false);
    setCustomModelText('');
    setFuelSupply('');
    setAutoFilledNotice(null);
  };

  // When Model changes: AUTO-FILL CC, Fuel Supply (FI/Carb), Fuel Type, Category, and Bike Picture!
  const handleModelChange = (selectedVal: string) => {
    if (selectedVal === '__CUSTOM__') {
      setIsCustomModel(true);
      setModel('');
      setCc('');
      setCustomCcVal('');
      setFuelSupply('Carburetor');
      setAutoFilledNotice(null);
    } else {
      setIsCustomModel(false);
      setModel(selectedVal);

      // Find spec in database
      const foundSpec = brand && BD_MODEL_DATABASE[brand]
        ? BD_MODEL_DATABASE[brand].find((m) => m.name === selectedVal)
        : null;

      if (foundSpec) {
        // Auto fill CC directly from Model - locked!
        setCc(foundSpec.cc);
        setCustomCcVal(foundSpec.cc);

        // Auto fill Fuel Supply (FI / Carburetor)
        setFuelSupply(foundSpec.fuelSupply || 'Carburetor');

        // Auto fill Fuel Type
        setFuelType(foundSpec.fuelType);

        // Auto fill default bike picture for this model!
        if (foundSpec.image) {
          setImageUrl(foundSpec.image);
          setCustomUrlInput('');
        }

        // Auto fill Category if not already selected
        if (!category) {
          setCategory(foundSpec.category);
        }

        // Auto fill Registration Alphabet based on CC: <= 125 -> Ha (হ), > 125 -> La (ল)
        if (foundSpec.cc <= 125) {
          setRegAlphabet('HA');
        } else {
          setRegAlphabet('LA');
        }

        // Flash auto-fill notice
        setAutoFilledNotice(`মডেল অনুযায়ী লোড হয়েছে: ${foundSpec.cc}cc · ${foundSpec.fuelSupply || 'Carb'} · ${foundSpec.fuelType} · ${foundSpec.category} (বাইকের ছবি যুক্ত হয়েছে)`);
        setTimeout(() => setAutoFilledNotice(null), 4000);
      }
    }
  };

  // Manual CC change handler
  const handleCcChange = (newCc: number) => {
    setCc(newCc);
    if (newCc <= 125) {
      setRegAlphabet('HA'); // হ
    } else {
      setRegAlphabet('LA'); // ল
    }
  };

  // Handle Document Files Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newItems: UploadedDocumentItem[] = files.map((file) => ({
      id: `doc-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg')
    }));
    setUploadedDocs((prev) => [...prev, ...newItems]);
  };

  const handleRemoveDoc = (id: string) => {
    setUploadedDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const effectiveModel = isCustomModel ? customModelText.trim() : model;
  const effectiveCc = isCustomModel ? (Number(customCcVal) || 150) : (Number(cc) || 150);
  const numBuyingPrice = Number(buyingPrice) || 0;
  const numAskingPrice = Number(askingPrice) || 0;
  const projectedProfit = numAskingPrice - numBuyingPrice;
  const projectedMarginPct = numAskingPrice > 0 ? Math.round((projectedProfit / numAskingPrice) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Smart Card is strictly mandatory
    if (!smartCardStatus) {
      setSmartCardError(true);
      const el = document.getElementById('smart-card-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (smartCardStatus === 'No' && !fingerprintDone) {
      setSmartCardError(true);
      const el = document.getElementById('smart-card-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setSmartCardError(false);

    // 6. Seller Information Validation (Required)
    if (!sellerName.trim() || !sellerPhone.trim()) {
      setSellerError(true);
      const el = document.getElementById('seller-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setSellerError(false);

    const bikeBrand = brand.trim() || 'Motorcycle';
    const bikeModel = effectiveModel || 'Standard';
    const bikeTitle = `${bikeBrand} ${bikeModel}`.trim();
    const finalImage = customUrlInput.trim() || imageUrl || SAMPLE_PRESET_IMAGES[0].url;

    const currentYear = new Date().getFullYear();
    const parsedMfgYear = Number(mfgYear) || currentYear;
    const parsedRegYear = Number(regYear) || currentYear;

    const newBike: Bike = {
      id: `bike-${Date.now()}`,
      name: bikeTitle,
      brand: bikeBrand,
      model: bikeModel,
      mfgYear: parsedMfgYear,
      regYear: parsedRegYear,
      year: parsedMfgYear,
      regNumber: computedRegNumber,
      buyingPrice: numBuyingPrice,
      askingPrice: numAskingPrice,
      price: numAskingPrice,
      originalPrice: Math.round(numAskingPrice * 1.15),
      cc: effectiveCc,
      mileageKm: Number(mileageKm) || 0,
      conditionGrade: 'A',
      conditionLabel: 'Verified',
      fuelType: (fuelType as any) || 'Petrol',
      fuelSupply: (fuelSupply as any) || 'FI',
      transmission: 'Manual',
      color: color.trim() || 'Black',
      colorHex: '#06b6d4',
      category: (category as any) || 'Sport',
      featured: false,
      inStock: true,
      status: 'Available',
      registrationYear: parsedRegYear,
      registrationCity: prefix,
      ownersCount: Number(ownersCount) || 1,
      warrantyMonths: 12,
      smartCardStatus,
      fingerprintDone: smartCardStatus === 'No' ? (fingerprintDone || 'No') : undefined,
      uploadedDocuments: uploadedDocs,
      sellerInfo: {
        name: sellerName.trim(),
        phone: sellerPhone.trim(),
        nid: sellerNid.trim() || undefined,
        address: sellerAddress.trim() || undefined,
        purchaseDate: purchaseDate || undefined,
        memoOrStampNo: memoOrStampNo.trim() || undefined,
        notes: sellerNotes.trim() || undefined,
      },
      images: [finalImage],
      documentPdfName: uploadedDocs.length > 0 ? uploadedDocs[0].name : 'BRTA_Papers.pdf',
      specs: {
        engine: `${effectiveCc}cc ${fuelSupply || 'FI'} Single Cylinder`,
        fuelSupply: (fuelSupply as any) || 'FI',
        maxPower: '18 HP',
        maxTorque: '14.2 Nm',
        fuelTankCapacity: '12 L',
        topSpeed: '135 km/h',
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
        scratchesNotes: notes,
        tyresNotes: 'Good tread condition',
        engineNotes: 'Smooth sound, original engine',
        documentsVerified: true,
        registrationNumber: computedRegNumber,
        taxTokenValidUntil: '2027-12-31',
        insuranceValidUntil: '2026-11-30',
        fitnessValidUntil: '2027-12-31',
        ownershipTransferGuaranteed: true
      }
    };

    onAddBike(newBike);
    onBack();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Back to Collection</span>
            </button>

            <div className="h-5 w-px bg-slate-800 hidden sm:block" />

            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight font-display flex items-center gap-2">
                <span>Add Bike to Stock</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  New Entry
                </span>
              </h1>
            </div>
          </div>

          {/* Showroom Logo in Right Corner */}
          <div 
            className="flex items-center gap-2.5 pl-3 border-l border-slate-800/80 cursor-pointer group shrink-0"
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
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Hero Preview Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Photo Preview */}
              <div className="md:col-span-5 relative bg-slate-950 h-52 md:h-auto overflow-hidden">
                <img 
                  src={customUrlInput || imageUrl} 
                  alt={effectiveModel ? `${brand} ${effectiveModel}` : 'Bike Preview'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = SAMPLE_PRESET_IMAGES[0].url;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 font-mono font-bold">
                    {category || 'Motorcycle'} · {effectiveCc}cc {fuelSupply ? `· ${fuelSupply}` : ''}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-300 font-mono font-medium">
                    {prefix}
                  </span>
                </div>
              </div>

              {/* Live Preview Info */}
              <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    {brand || 'Select Brand'}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                    {brand || effectiveModel ? `${brand} ${effectiveModel}`.trim() : 'New Bike Entry'}
                  </h2>
                  <div className="text-xs text-slate-400 font-mono mt-1 flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-cyan-300 font-bold">
                      {computedRegNumber}
                    </span>
                    <span>· {regYear || 'Year'} · {typeof mileageKm === 'number' ? mileageKm.toLocaleString() : '0'} km</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block font-sans">Buying Price</span>
                    <span className="text-slate-300 font-bold text-sm">
                      {numBuyingPrice > 0 ? formatBDT(numBuyingPrice) : '৳ 0'}
                    </span>
                  </div>
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block font-sans">Asking Price</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {numAskingPrice > 0 ? formatBDT(numAskingPrice) : '৳ 0'}
                    </span>
                  </div>
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 block font-sans">Est. Profit</span>
                    <span className={`font-bold text-sm ${projectedProfit >= 0 ? 'text-cyan-400' : 'text-rose-400'}`}>
                      {projectedProfit >= 0 ? '+' : ''}{formatBDT(projectedProfit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Sections Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Section 1: Basic Information (Category FIRST -> Brand -> Filtered Model) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <BikeIcon className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-display">
                  1. Basic Information (প্রাথমিক তথ্য)
                </h3>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* 1.1 Category Selection (FIRST as requested!) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Category (ক্যাটেগরি):</span>
                    </label>
                    {category && (
                      <button
                        type="button"
                        onClick={() => handleCategoryChange('')}
                        className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        Reset / Show All
                      </button>
                    )}
                  </div>
                  <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer text-xs"
                  >
                    <option value="" className="text-slate-500">
                      -- All Categories (সব ধরনের বাইক) --
                    </option>
                    <option value="Sport">Sport (স্পোর্টস)</option>
                    <option value="Naked">Naked / Street (নেকেড)</option>
                    <option value="Scooter">Scooter (স্কুটার)</option>
                    <option value="Cruiser">Cruiser (ক্রুজার)</option>
                    <option value="Commuter">Commuter (কমিউটার / সাধারণ)</option>
                    <option value="Tourer">Tourer / Adventure (ট্যুরার)</option>
                  </select>
                </div>

                {/* 1.2 Brand Selection (All Bangladesh Available Brands with Searchable Modal) */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">
                    Brand (বাংলাদেশে প্রচলিত ব্র্যান্ডসমূহ):
                  </label>
                  <SearchableSelect
                    label="Select Brand (ব্র্যান্ড নির্বাচন করুন)"
                    placeholder="-- Select Brand (ব্র্যান্ড নির্বাচন করুন) --"
                    searchPlaceholder="ব্র্যান্ডের নাম লিখে খুঁজুন (e.g. Yamaha, Honda, Bajaj, Suzuki...)"
                    value={brand}
                    options={BD_BRANDS.map((b) => ({
                      value: b,
                      label: b,
                      badge: BD_MODEL_DATABASE[b] ? `${BD_MODEL_DATABASE[b].length} Models` : undefined
                    }))}
                    onChange={handleBrandChange}
                    allowCustom={true}
                    onCustomSelect={handleBrandChange}
                  />
                </div>

                {/* 1.3 Model Selection (Filtered by Brand and Category with Searchable Modal) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-slate-300 font-semibold">
                      Model (মডেল তালিকা):
                    </label>
                    {brand && (
                      <span className="text-[10px] font-mono text-cyan-400">
                        {filteredModels.length} {category ? `${category} ` : ''}Models
                      </span>
                    )}
                  </div>
                  
                  <SearchableSelect
                    label={brand ? `${brand} ${category ? `(${category})` : ''} Models` : 'Model (মডেল)'}
                    placeholder={
                      !brand 
                        ? '-- Please select Brand first --' 
                        : filteredModels.length === 0 
                        ? `-- No ${category} models found for ${brand} --`
                        : `-- Select or search model (মডেল নির্বাচন করুন) --`
                    }
                    searchPlaceholder="মডেলের নাম লিখে খুঁজুন (e.g. FZ-S, R15, Pulsar, Gixxer, Dio...)"
                    value={effectiveModel}
                    disabled={!brand}
                    options={filteredModels.map((m) => ({
                      value: m.name,
                      label: m.name,
                      subLabel: `${m.cc}cc · ${m.fuelType}`,
                      badge: m.category
                    }))}
                    onChange={handleModelChange}
                    allowCustom={true}
                    onCustomSelect={(customVal) => {
                      setIsCustomModel(true);
                      setCustomModelText(customVal);
                      setModel(customVal);
                    }}
                  />

                  {/* Auto-filled Notification Banner */}
                  {autoFilledNotice && (
                    <div className="mt-2 p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono flex items-center gap-1.5 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{autoFilledNotice}</span>
                    </div>
                  )}
                </div>

                {/* Custom Model Input if selected */}
                {isCustomModel && (
                  <div className="pt-1">
                    <label className="text-cyan-400 block mb-1 font-medium text-[11px]">
                      Enter Custom Model Name (মডেলের নাম লিখুন):
                    </label>
                    <input
                      type="text"
                      required
                      value={customModelText}
                      onChange={(e) => setCustomModelText(e.target.value)}
                      placeholder="e.g. FZ-S V3 Dark Knight"
                      className="w-full bg-slate-950 border border-cyan-500/60 rounded-xl p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors text-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Engine & Specifications (Auto-filled from Model, Locked, NO CC list) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white font-display">
                    2. Engine & Specifications (ইঞ্জিন ও স্পেসিফিকেশন)
                  </h3>
                </div>
                {model && !isCustomModel && (
                  <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> Auto-filled from Model (Locked)
                  </span>
                )}
              </div>

              {/* CC and Mileage */}
              <div className="text-xs space-y-2">
                <div className="grid grid-cols-2 gap-3">
                  {/* Engine CC - Locked to model, NO dropdown list! */}
                  <div>
                    <label className="text-slate-400 block mb-1 font-medium flex items-center justify-between">
                      <span>Engine CC (ইঞ্জিন সিসি):</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {isCustomModel ? 'Custom' : 'মডেল থেকে নির্ধারিত'}
                      </span>
                    </label>

                    {!isCustomModel ? (
                      <div className="relative">
                        <div className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between shadow-inner select-none cursor-not-allowed">
                          <span className={`font-mono font-bold text-sm ${cc ? 'text-cyan-400' : 'text-slate-500'}`}>
                            {cc ? `${cc} cc` : '-- মডেল সিলেক্ট করুন --'}
                          </span>
                          <span className="text-[9px] text-cyan-400 font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                            Locked
                          </span>
                        </div>
                        <input type="hidden" value={cc || ''} />
                      </div>
                    ) : (
                      <input
                        type="number"
                        required
                        value={customCcVal === '' ? '' : customCcVal}
                        onChange={(e) => {
                          const val = e.target.value === '' ? '' : Number(e.target.value);
                          setCustomCcVal(val);
                          setCc(val);
                          if (typeof val === 'number') {
                            setRegAlphabet(val <= 125 ? 'HA' : 'LA');
                          }
                        }}
                        placeholder="e.g. 150"
                        className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl p-2.5 text-cyan-400 font-mono font-bold text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    )}
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                      {isCustomModel ? 'কাস্টম সিসি লিখুন' : 'মডেল অনুযায়ী সিসি স্বয়ংক্রিয় লকড'}
                    </span>
                  </div>

                  {/* Mileage */}
                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">Mileage (রানিং কিমি):</label>
                    <input
                      type="number"
                      required
                      value={mileageKm === '' ? '' : mileageKm}
                      onChange={(e) => setMileageKm(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="e.g. 12000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                      {typeof mileageKm === 'number' ? `রান: ${mileageKm.toLocaleString()} কিমি` : 'রানিং কিমি লিখুন'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fuel Type and Color */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium flex items-center justify-between">
                    <span>Fuel Type (ফুয়েল):</span>
                    {fuelType && !isCustomModel && (
                      <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Auto
                      </span>
                    )}
                  </label>
                  {!isCustomModel && fuelType ? (
                    <div className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 text-slate-300 font-medium select-none cursor-not-allowed flex items-center justify-between">
                      <span className="truncate">{fuelType === 'Petrol' ? 'Petrol (পেট্রোল / অকটেন)' : fuelType}</span>
                      <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20 shrink-0 ml-1">
                        Locked
                      </span>
                    </div>
                  ) : (
                    <select
                      required
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                    >
                      <option value="" disabled className="text-slate-600">-- Select Fuel --</option>
                      <option value="Petrol">Petrol (পেট্রোল / অকটেন)</option>
                      <option value="Electric">Electric (বৈদ্যুতিক)</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  )}
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Color (রং)</label>
                  <input
                    type="text"
                    required
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="e.g. Cyan / Black"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Papers & BRTA Documents (Smart Card Mandatory) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-display">
                  3. Papers & BRTA Documents (কাগজপত্র ও বিআরটিএ)
                </h3>
              </div>

              {/* BRTA Circle Selection Dropdown with Searchable Modal */}
              <div className="text-xs space-y-1">
                <label className="text-slate-300 block font-semibold">
                  BRTA Circle (বিআরটিএ সার্কেল):
                </label>
                <SearchableSelect
                  label="Select BRTA Circle (বিআরটিএ সার্কেল নির্বাচন করুন)"
                  placeholder="-- Select BRTA Circle (সার্কেল নির্বাচন করুন) --"
                  searchPlaceholder="সার্কেল লিখে খুঁজুন (e.g. Mirpur, Ekuria, Savar, Sylhet, Gazipur...)"
                  value={selectedBrtaId}
                  options={BRTA_OFFICES.map((b) => ({
                    value: b.id,
                    label: b.name,
                    badge: b.seriesPrefix
                  }))}
                  onChange={(val) => setSelectedBrtaId(val)}
                  allowCustom={false}
                />
              </div>

              {/* 4 Clean Boxes without micro-labels */}
              <div className="space-y-1.5 pt-1">
                <div className="grid grid-cols-12 gap-2 text-xs font-mono">
                  {/* Box 1: Prefix */}
                  <div className="col-span-4 flex items-center justify-center p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-cyan-300 font-bold text-xs truncate">
                    {prefix}
                  </div>

                  {/* Box 2: Alphabet */}
                  <div className="col-span-3">
                    <select
                      value={alpha}
                      onChange={(e) => setRegAlphabet(e.target.value)}
                      className="w-full bg-slate-950 border border-cyan-500/50 rounded-xl p-2.5 text-cyan-300 font-bold focus:outline-none focus:border-cyan-400 text-xs cursor-pointer"
                    >
                      <option value="HA">HA (হ)</option>
                      <option value="LA">LA (ল)</option>
                      <option value="MA">MA (ম)</option>
                      <option value="DA">DA (দ)</option>
                      <option value="KA">KA (ক)</option>
                      <option value="GA">GA (গ)</option>
                    </select>
                  </div>

                  {/* Box 3: Serial with demo placeholder */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      maxLength={3}
                      value={regSerial}
                      onChange={(e) => setRegSerial(e.target.value)}
                      placeholder="55"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold text-center focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                    />
                  </div>

                  {/* Box 4: 4-Digits with demo placeholder */}
                  <div className="col-span-3">
                    <input
                      type="text"
                      maxLength={4}
                      value={regNumberCode}
                      onChange={(e) => setRegNumberCode(e.target.value)}
                      placeholder="1234"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-bold text-center focus:outline-none focus:border-cyan-500 placeholder-slate-600"
                    />
                  </div>
                </div>

                {/* Composed Live Registration Number Display */}
                <div className="mt-1 p-2 bg-slate-950/90 border border-cyan-500/20 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 text-[11px]">রেজিস্ট্রেশন নম্বর:</span>
                  <span className="text-cyan-400 font-bold text-xs tracking-wide">
                    {computedRegNumber}
                  </span>
                </div>
              </div>

              {/* Smart Card Option: MUST BE SELECTED, NO DEFAULT */}
              <div id="smart-card-section" className={`pt-2 space-y-2 border-t rounded-xl transition-all ${
                smartCardError ? 'border-rose-500/80 p-2 bg-rose-500/5' : 'border-slate-800/80'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Smart Card (স্মার্ট কার্ড) <span className="text-rose-400 font-bold">*</span>:</span>
                  </span>
                  
                  {/* Smart Card Status Buttons - Unselected by default */}
                  <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                    {(['Yes', 'No', 'Pending'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          setSmartCardStatus(status);
                          setSmartCardError(false);
                          if (status !== 'No') {
                            setFingerprintDone(null);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          smartCardStatus === status
                            ? status === 'Yes' 
                              ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                              : status === 'Pending'
                              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                              : 'bg-rose-500 text-white shadow-md font-bold'
                            : 'text-slate-400 hover:text-white bg-transparent'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Validation message if user missed selecting Smart Card */}
                {smartCardError && !smartCardStatus && (
                  <p className="text-rose-400 text-[11px] font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>স্মার্ট কার্ড অপশনটি অবশ্যই নির্বাচন করতে হবে (Yes, No বা Pending)।</span>
                  </p>
                )}

                {/* If Smart Card is "No", dynamically show Fingerprint option (MUST SELECT) */}
                {smartCardStatus === 'No' && (
                  <div className="p-2.5 bg-slate-950/90 border border-amber-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs transition-all">
                    <span className="text-amber-400 font-medium flex items-center gap-1.5">
                      <Fingerprint className="w-4 h-4 text-amber-400" />
                      <span>Fingerprint (ফিঙ্গারপ্রিন্ট দেওয়া হয়েছে?) <span className="text-rose-400 font-bold">*</span>:</span>
                    </span>
                    <div className="flex items-center gap-1.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                      {(['Yes', 'No'] as const).map((fp) => (
                        <button
                          key={fp}
                          type="button"
                          onClick={() => {
                            setFingerprintDone(fp);
                            setSmartCardError(false);
                          }}
                          className={`px-3.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                            fingerprintDone === fp
                              ? fp === 'Yes'
                                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                                : 'bg-rose-500 text-white font-bold shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {fp}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {smartCardError && smartCardStatus === 'No' && !fingerprintDone && (
                  <p className="text-rose-400 text-[11px] font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>ফিঙ্গারপ্রিন্ট দেওয়া হয়েছে কিনা তা নির্বাচন করুন (Yes / No)।</span>
                  </p>
                )}
              </div>

              {/* Submit Documents (PDF / Image Upload) */}
              <div className="pt-2 space-y-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Submit Documents (কাগজপত্র আপলোড / ইমপোর্ট):</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">PDF বা ছবি</span>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    id="doc-upload"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="doc-upload"
                    className="w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl bg-slate-950/60 hover:bg-slate-950 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-2 text-cyan-400 group-hover:scale-105 transition-transform">
                      <UploadCloud className="w-4 h-4" />
                      <span className="text-xs font-semibold text-white group-hover:text-cyan-300">
                        Upload PDF / Image Files
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Tax Token, Smart Card, স্লিপ বা কাগজপত্র যুক্ত করতে ক্লিক করুন
                    </p>
                  </label>
                </div>

                {/* Uploaded Documents List */}
                {uploadedDocs.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {uploadedDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {doc.type.includes('pdf') ? (
                            <FileText className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          ) : (
                            <Camera className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          )}
                          <span className="text-slate-200 truncate">{doc.name}</span>
                          <span className="text-[10px] text-slate-500">({doc.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDoc(doc.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Manufacturing & Registration Years */}
              <div className="grid grid-cols-3 gap-3 text-xs pt-1 border-t border-slate-800/80">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Mfg Year</label>
                  <input
                    type="number"
                    required
                    value={mfgYear === '' ? '' : mfgYear}
                    onChange={(e) => setMfgYear(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 2023"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Reg Year</label>
                  <input
                    type="number"
                    required
                    value={regYear === '' ? '' : regYear}
                    onChange={(e) => setRegYear(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 2023"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Owner</label>
                  <select
                    required
                    value={ownersCount === '' ? '' : ownersCount}
                    onChange={(e) => setOwnersCount(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  >
                    <option value="" disabled className="text-slate-600">-- Select --</option>
                    <option value={1}>1st Owner</option>
                    <option value={2}>2nd Owner</option>
                    <option value={3}>3rd Owner</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Pricing & Financials */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white font-display">
                  4. Pricing & Financials (মূল্য ও হিসাব)
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Buying Price (ক্রয়মূল্য ৳)</label>
                  <input
                    type="number"
                    required
                    step={1000}
                    value={buyingPrice === '' ? '' : buyingPrice}
                    onChange={(e) => setBuyingPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 250000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono font-bold focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <span className="text-[11px] text-slate-500 font-mono mt-1 block">
                    {numBuyingPrice > 0 ? formatBDT(numBuyingPrice) : '৳ 0'}
                  </span>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Asking Price (বিক্রয়মূল্য ৳)</label>
                  <input
                    type="number"
                    required
                    step={1000}
                    value={askingPrice === '' ? '' : askingPrice}
                    onChange={(e) => setAskingPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 300000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-emerald-400 font-mono font-bold focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <span className="text-[11px] text-emerald-500/80 font-mono mt-1 block">
                    {numAskingPrice > 0 ? formatBDT(numAskingPrice) : '৳ 0'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">প্রত্যাশিত লাভ (Gross Profit):</span>
                <span className={`font-bold ${projectedProfit >= 0 ? 'text-cyan-300' : 'text-rose-400'}`}>
                  {projectedProfit >= 0 ? '+' : ''}{formatBDT(projectedProfit)} ({projectedMarginPct}%)
                </span>
              </div>
            </div>
          </div>

          {/* Section 5: Photos & Remarks */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Camera className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-display">
                5. Photos & Remarks (বাইকের ছবি ও নোট)
              </h3>
            </div>

            <div className="space-y-3">
              <label className="text-xs text-slate-400 block font-medium">
                Choose a sample photo or enter a direct image URL (বাইকের ফটো নির্বাচন করুন):
              </label>

              {/* Sample Preset Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SAMPLE_PRESET_IMAGES.map((sample, idx) => {
                  const isSelected = (imageUrl === sample.url && !customUrlInput);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setImageUrl(sample.url);
                        setCustomUrlInput('');
                      }}
                      className={`group relative rounded-xl overflow-hidden border text-left p-1 transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-cyan-400 ring-2 ring-cyan-500/40' 
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img 
                        src={sample.url} 
                        alt={sample.name} 
                        className="w-full h-16 object-cover rounded-lg"
                      />
                      <span className="text-[10px] text-slate-300 font-medium block truncate mt-1 px-1">
                        {sample.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Image URL Input */}
              <div className="text-xs pt-1">
                <label className="text-slate-400 block mb-1 font-medium">Or Custom Image URL (সরাসরি ছবির লিঙ্ক):</label>
                <input
                  type="url"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  placeholder="https://example.com/bike-photo.jpg"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Inspection / Notes */}
              <div className="text-xs pt-1">
                <label className="text-slate-400 block mb-1 font-medium">Remarks / Inspection Notes (বাইকের অবস্থা বা মন্তব্য):</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="যেমন: ইঞ্জিন সাউন্ড মসৃণ, ফ্রেশ কন্ডিশন, অল পেপারস আপডেট..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Seller Information (সেলার বা বিক্রেতার তথ্য - যার কাছ থেকে বাইক কেনা হয়েছে) */}
          <div 
            id="seller-section" 
            className={`bg-slate-900 border rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm transition-all ${
              sellerError ? 'border-rose-500 bg-rose-500/5 ring-1 ring-rose-500/30' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-display">
                  6. Seller Information (সেলার বা বিক্রেতার তথ্য - যার কাছ থেকে বাইক কেনা হয়েছে)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                Sourcing Record
              </span>
            </div>

            {sellerError && (!sellerName.trim() || !sellerPhone.trim()) && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>অনুগ্রহ করে বিক্রেতার নাম ও মোবাইল নম্বর পূরণ করুন।</span>
              </div>
            )}

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Seller Name */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold flex items-center justify-between">
                    <span>Seller Name (বিক্রেতার নাম) <span className="text-rose-400 font-bold">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={sellerName}
                    onChange={(e) => {
                      setSellerName(e.target.value);
                      if (sellerError && e.target.value.trim()) setSellerError(false);
                    }}
                    placeholder="e.g. মোঃ তারেক হোসেন"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Seller Phone */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold flex items-center justify-between">
                    <span>Mobile Phone (মোবাইল নম্বর) <span className="text-rose-400 font-bold">*</span></span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={sellerPhone}
                    onChange={(e) => {
                      setSellerPhone(e.target.value);
                      if (sellerError && e.target.value.trim()) setSellerError(false);
                    }}
                    placeholder="e.g. 01712-345678"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Seller NID */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">
                    National ID / NID (জাতীয় পরিচয়পত্র নম্বর)
                  </label>
                  <input
                    type="text"
                    value={sellerNid}
                    onChange={(e) => setSellerNid(e.target.value)}
                    placeholder="e.g. 19921234567890 (১০ বা ১৭ ডিজিট)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Purchase Date */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">
                    Purchase Date (বাইক ক্রয়ের তারিখ)
                  </label>
                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                  />
                </div>

                {/* Memo or Stamp No */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">
                    Stamp / Cash Memo No (চুক্তি স্ট্যাম্প বা মেমো নং)
                  </label>
                  <input
                    type="text"
                    value={memoOrStampNo}
                    onChange={(e) => setMemoOrStampNo(e.target.value)}
                    placeholder="e.g. STAMP-300TK-8921 / MEMO-504"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                {/* Seller Address */}
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">
                    Seller Address / Area (বিক্রেতার ঠিকানা / এলাকা)
                  </label>
                  <input
                    type="text"
                    value={sellerAddress}
                    onChange={(e) => setSellerAddress(e.target.value)}
                    placeholder="e.g. রোড #৩, সেক্টর #১০, উত্তরা, ঢাকা"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {/* Seller Notes / Remarks */}
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">
                  Seller Agreement Notes / Remarks (বিক্রেতার সাথে চুক্তি বা শর্তাবলীর নোট):
                </label>
                <textarea
                  rows={2}
                  value={sellerNotes}
                  onChange={(e) => setSellerNotes(e.target.value)}
                  placeholder="e.g. মূল মালিকের কাছ থেকে ৩ শ' টাকার স্ট্যাম্পে ক্রয় করা হয়েছে। বিআরটিএ বায়োমেট্রিক ফিঙ্গারপ্রিন্ট সম্পন্ন..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3 pb-8">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel (বাতিল)
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Save & Add to Stock (স্টকে যুক্ত করুন)</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
