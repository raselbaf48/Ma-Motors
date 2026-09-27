import React, { useState, useMemo } from 'react';
import { Bike } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { SearchableSelect } from '../components/common/SearchableSelect';
import { BD_BRANDS, BD_MODEL_DATABASE, BDModelSpec, getModelDefaultImage, getModelDefaultBrakingSystem, BIKE_PICS } from '../data/bangladeshBikes';
export type { BDModelSpec };
export { BD_BRANDS, BD_MODEL_DATABASE };
import { 
  ArrowLeft, 
  Bike as BikeIcon, 
  Check, 
  DollarSign, 
  FileText, 
  Zap,
  CreditCard,
  Fingerprint,
  UploadCloud,
  X,
  AlertCircle,
  Sparkles,
  Layers,
  User,
  RotateCcw,
  Trash2,
  Star,
  Plus,
  ImageIcon,
  ShieldCheck,
  Camera
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
  const [brakingSystem, setBrakingSystem] = useState<string>('Single Channel ABS');
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

  // 5. Photos & Remarks (REAL MULTI-PHOTO UPLOAD)
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
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
  const isRegistered = Boolean(selectedBrtaId && selectedBrtaId.trim() !== '');

  // Auto calculate BRTA registration number
  // If NO BRTA circle is selected, Registration No is literally "ON TEST"
  const prefix = currentBrta ? currentBrta.seriesPrefix : '';
  const alpha = regAlphabet || (typeof cc === 'number' && cc <= 125 ? 'HA' : 'LA');
  const displaySerial = regSerial.trim() || '55';
  const displayNumber = regNumberCode.trim() || '1234';
  const computedRegNumber = isRegistered
    ? `${prefix}-${alpha}-${displaySerial}-${displayNumber}`
    : 'ON TEST';

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

  // When Model changes: AUTO-FILL CC, Fuel Supply (FI/Carb), Braking System, Fuel Type, Category (NO preset pictures)
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

        // Auto-detect braking system directly from model
        const autoBrake = getModelDefaultBrakingSystem(brand, selectedVal, foundSpec.cc);
        setBrakingSystem(autoBrake);

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

        // Flash auto-fill notice (Specs only, no preset photo message)
        setAutoFilledNotice(`মডেল অনুযায়ী স্বয়ংক্রিয়ভাবে লোড হয়েছে: ${foundSpec.cc}cc · ${foundSpec.fuelSupply || 'Carb'} · ব্রেকিং: ${autoBrake}`);
        setTimeout(() => setAutoFilledNotice(null), 4000);
      } else {
        // Auto-detect braking system for non-standard models
        const autoBrake = getModelDefaultBrakingSystem(brand, selectedVal);
        if (autoBrake) {
          setBrakingSystem(autoBrake);
        }
      }
    }
  };

  // Multi-photo file upload handler from gallery / file chooser (No camera)
  const handleBikePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedPhotos((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    // Reset so same files can be re-selected if desired
    e.target.value = '';
  };

  // Add real photo via external image URL
  const handleAddPhotoByUrl = () => {
    const trimmed = customUrlInput.trim();
    if (!trimmed) return;
    setUploadedPhotos((prev) => [...prev, trimmed]);
    setCustomUrlInput('');
  };

  // Remove photo by index
  const handleRemovePhoto = (idxToRemove: number) => {
    setUploadedPhotos((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  // Set any photo as the primary cover photo
  const handleSetCoverPhoto = (idxToCover: number) => {
    setUploadedPhotos((prev) => {
      const target = prev[idxToCover];
      const remaining = prev.filter((_, idx) => idx !== idxToCover);
      return [target, ...remaining];
    });
  };

  // Clear all uploaded photos
  const handleClearAllPhotos = () => {
    setUploadedPhotos([]);
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
  const heroImageSrc = uploadedPhotos.length > 0 ? uploadedPhotos[0] : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Smart Card is only required IF a BRTA circle is selected (registered bike)
    if (isRegistered) {
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
      brakingSystem: brakingSystem || 'Single Channel ABS',
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
      smartCardStatus: isRegistered && smartCardStatus ? smartCardStatus : undefined,
      fingerprintDone: isRegistered && smartCardStatus === 'No' ? (fingerprintDone || 'No') : undefined,
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
      images: uploadedPhotos,
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
        frontBrake: brakingSystem === 'Drum Brakes' ? 'Drum Brake' : 'Hydraulic Disc',
        rearBrake: brakingSystem.includes('Dual') ? 'Hydraulic Disc' : 'Drum Brake',
        absType: brakingSystem || 'Single Channel ABS',
        brakingSystem: brakingSystem || 'Single Channel ABS',
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
            {Boolean(logoUrl && logoUrl.trim()) && !logoError ? (
              <img 
                src={logoUrl!} 
                alt={showroomName} 
                onError={() => setLogoError(true)} 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-cyan-500/60 shadow-md shadow-cyan-500/25 group-hover:scale-105 group-hover:border-cyan-400 transition-all shrink-0 bg-slate-900" 
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black text-base sm:text-xl shadow-md shadow-cyan-500/25 group-hover:scale-105 transition-transform shrink-0 border-2 border-cyan-500/40">
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
              <div className="md:col-span-5 relative bg-slate-950 min-h-[190px] h-52 md:h-auto overflow-hidden flex items-center justify-center">
                {heroImageSrc ? (
                  <>
                    <img 
                      src={heroImageSrc} 
                      alt={effectiveModel ? `${brand} ${effectiveModel}` : 'Bike Preview'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 font-mono font-bold">
                        {category || 'Motorcycle'} · {effectiveCc}cc {fuelSupply ? `· ${fuelSupply}` : ''} {brakingSystem ? `· ${brakingSystem}` : ''}
                      </span>
                      {uploadedPhotos.length > 1 && (
                        <span className="px-2 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-mono text-[11px] flex items-center gap-1 font-semibold">
                          <Camera className="w-3.5 h-3.5" /> {uploadedPhotos.length} Photos
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500 w-full h-full">
                    <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 mb-2 text-slate-400">
                      <Camera className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-300">কোনো আসল ছবি আপলোড করা হয়নি</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">নিচে সেকশন ৫ থেকে শোরুমের বাস্তব ছবি যোগ করুন</span>
                    <span className="mt-2 text-[10px] text-cyan-400 font-mono px-2 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 font-medium">
                      একাধিক ছবি সাপোর্ট করে
                    </span>
                  </div>
                )}
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

              {/* Fuel Supply Option: Fi / Carb (Auto fill with model) */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5 text-xs">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Engine Fuel Supply (ফুয়েল সিস্টেম): Fi / Carb</span>
                    <span className="text-rose-400 font-bold">*</span>
                  </label>
                  {fuelSupply && (
                    <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      {model && !isCustomModel ? `Auto-filled: ${fuelSupply}` : 'Selected'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {/* FI Option Button */}
                  <button
                    type="button"
                    onClick={() => setFuelSupply('FI')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      fuelSupply === 'FI'
                        ? 'bg-gradient-to-br from-cyan-500/25 to-cyan-500/5 border-cyan-400 text-cyan-300 ring-2 ring-cyan-500/40 font-bold shadow-md shadow-cyan-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black tracking-wide font-mono">FI</span>
                      {fuelSupply === 'FI' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-medium">Fuel Injection (ইনজেকশন)</span>
                  </button>

                  {/* Carburetor Option Button */}
                  <button
                    type="button"
                    onClick={() => setFuelSupply('Carburetor')}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                      fuelSupply === 'Carburetor'
                        ? 'bg-gradient-to-br from-amber-500/25 to-amber-500/5 border-amber-400 text-amber-300 ring-2 ring-amber-500/40 font-bold shadow-md shadow-amber-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black tracking-wide font-mono">Carb</span>
                      {fuelSupply === 'Carburetor' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-medium">Carburetor (কার্বুরেটর)</span>
                  </button>

                  {/* Electric Option Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setFuelSupply('Electric');
                      setFuelType('Electric');
                    }}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer col-span-2 sm:col-span-1 ${
                      fuelSupply === 'Electric'
                        ? 'bg-gradient-to-br from-emerald-500/25 to-emerald-500/5 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/40 font-bold shadow-md shadow-emerald-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black tracking-wide font-mono">Electric</span>
                      {fuelSupply === 'Electric' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-medium">Battery EV (ব্যাটারি)</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-mono">
                  {model ? `✓ মডেল অনুযায়ী স্বয়ংক্রিয়ভাবে "${fuelSupply || 'FI'}" সিলেক্ট হয়েছে। প্রয়োজনে পরিবর্তন করতে পারেন।` : 'মডেল সিলেক্ট করলে Fi / Carb অটো ফিল হবে।'}
                </p>
              </div>

              {/* Braking System Selector (Dual Channel ABS, Single Channel ABS, CBS, Dual Disc, Disc + Drum, Drum) */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-300 font-semibold flex items-center gap-1.5 text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Braking System (বাইকের ব্রেকিং সিস্টেম)</span>
                    <span className="text-rose-400 font-bold">*</span>
                  </label>
                  {brakingSystem && (
                    <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      {model && !isCustomModel ? `Auto-filled: ${brakingSystem}` : 'Selected'}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'Dual Channel ABS', label: 'Dual Channel ABS', desc: 'সামনে ও পেছনে দুই চাকাতেই ABS' },
                    { id: 'Single Channel ABS', label: 'Single Channel ABS', desc: 'সামনে ABS + পেছনে ডিস্ক/ড্রাম' },
                    { id: 'CBS', label: 'CBS (Combi Brake)', desc: 'কম্বাইন্ড ব্রেকিং সিস্টেম' },
                    { id: 'Dual Disc', label: 'Dual Disc', desc: 'সামনে ও পেছনে দুই চাকাতেই ডিস্ক' },
                    { id: 'Front Disc / Rear Drum', label: 'Disc + Drum', desc: 'সামনে ডিস্ক, পেছনে ড্রাম' },
                    { id: 'Drum Brakes', label: 'Drum Brakes', desc: 'দুই চাকাতেই ড্রাম ব্রেক' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setBrakingSystem(option.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        brakingSystem === option.id
                          ? 'bg-gradient-to-br from-cyan-500/25 to-cyan-500/5 border-cyan-400 text-white ring-2 ring-cyan-500/40 font-bold shadow-md shadow-cyan-500/10'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-mono tracking-tight">{option.label}</span>
                        {brakingSystem === option.id && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal mt-0.5 leading-tight">{option.desc}</div>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-1 font-mono">
                  {model ? `✓ মডেল অনুযায়ী স্বয়ংক্রিয়ভাবে "${brakingSystem}" সিলেক্ট হয়েছে। যেকোনোটিতে ক্লিক করে পরিবর্তন করতে পারেন।` : 'মডেল অনুযায়ী ব্রেকিং সিস্টেম অটো ফিল হবে।'}
                </p>
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
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 block font-semibold">
                    BRTA Circle (বিআরটিএ সার্কেল):
                  </label>
                  {selectedBrtaId && (
                    <button
                      type="button"
                      onClick={() => setSelectedBrtaId('')}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-mono underline cursor-pointer"
                    >
                      Reset to ON TEST (অন টেস্ট করুন)
                    </button>
                  )}
                </div>
                <SearchableSelect
                  label="Select BRTA Circle (বিআরটিএ সার্কেল নির্বাচন করুন)"
                  placeholder="-- অন টেস্ট / বিআরটিএ সার্কেল ছাড়া (ON TEST) --"
                  searchPlaceholder="সার্কেল লিখে খুঁজুন (e.g. Mirpur, Ekuria, Savar, Sylhet, Gazipur...)"
                  value={selectedBrtaId}
                  options={[
                    { value: '', label: '-- কোনো বিআরটিএ সার্কেল নেই / অন টেস্ট (ON TEST) --', badge: 'ON TEST' },
                    ...BRTA_OFFICES.map((b) => ({
                      value: b.id,
                      label: b.name,
                      badge: b.seriesPrefix
                    }))
                  ]}
                  onChange={(val) => setSelectedBrtaId(val)}
                  allowCustom={false}
                />
              </div>

              {/* If NO BRTA circle selected: Registration No is literally "ON TEST" */}
              {!isRegistered ? (
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">রেজিস্ট্রেশন স্ট্যাটাস:</span>
                    <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 font-black text-xs rounded tracking-wider shadow">
                      ON TEST
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-amber-500/20">
                    <span className="text-slate-400 text-[11px]">রেজিস্ট্রেশন নম্বর:</span>
                    <span className="text-amber-300 font-bold text-sm tracking-wide">
                      ON TEST
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    কোনো বিআরটিএ সার্কেল সিলেক্ট করা না থাকায় রেজিস্ট্রেশন নম্বর <strong className="text-amber-300">ON TEST</strong> থাকবে এবং এই বাইকের ক্ষেত্রে কোনো স্মার্ট কার্ডের অপশন প্রযোজ্য হবে না।
                  </p>
                </div>
              ) : (
                /* 4 Clean Boxes when a BRTA Circle is selected */
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
              )}

              {/* Smart Card Option: ONLY SHOW WHEN REGISTERED */}
              {/* Kono BRTA circle select na thakle (ON TEST thakle) Smart Card er option show hbe na */}
              {isRegistered ? (
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
              ) : null}

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

          {/* Section 5: Bike Photos */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Camera className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white font-display">
                5. Bike Photos (বাইকের আসল ছবি)
              </h3>
            </div>

            <div className="space-y-4">
              {/* Primary Real Photo Upload Controls */}
              <div>
                <input
                  type="file"
                  id="bike-photos-multi-upload"
                  accept="image/*"
                  multiple
                  onChange={handleBikePhotoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="bike-photos-multi-upload"
                  className="flex items-center justify-between p-4 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-xl bg-slate-950/80 hover:bg-slate-950 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="font-bold text-white text-xs block group-hover:text-cyan-300 transition-colors">
                        গ্যালারি / ফাইল থেকে ছবি নির্বাচন করুন (Select Photos from Gallery)
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        একসাথে একাধিক আসল ছবি সিলেক্ট করতে পারেন
                      </span>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 group-hover:bg-cyan-400 transition-all shrink-0">
                    Browse Files
                  </span>
                </label>
              </div>

              {/* Add Photo by Web URL (Optional) */}
              <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5">
                <label className="text-xs text-slate-400 block font-medium">
                  বা ছবির ওয়েব লিঙ্ক যুক্ত করুন (Add Photo via Web URL):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://example.com/bike-photo.jpg"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddPhotoByUrl();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoByUrl}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Uploaded Photos Management Grid */}
              {uploadedPhotos.length > 0 ? (
                <div className="p-4 bg-slate-950 border border-cyan-500/30 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-display">
                        আপলোডকৃত আসল ছবিসমূহ
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-[11px] font-bold">
                        {uploadedPhotos.length}টি ছবি
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="bike-photos-multi-upload"
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-lg text-[11px] font-semibold cursor-pointer transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> আরও ছবি যোগ করুন
                      </label>
                      <button
                        type="button"
                        onClick={handleClearAllPhotos}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-800/40 rounded-lg text-[11px] font-medium transition-all"
                      >
                        সব মুছুন
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {uploadedPhotos.map((photoUrl, idx) => {
                      const isCover = idx === 0;
                      return (
                        <div
                          key={idx}
                          className={`group relative rounded-xl overflow-hidden border bg-slate-900 transition-all ${
                            isCover 
                              ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/10' 
                              : 'border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {/* Image */}
                          <div className="aspect-[4/3] w-full overflow-hidden bg-slate-950 relative">
                            <img
                              src={photoUrl}
                              alt={`Bike photo ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            
                            {/* Cover Badge */}
                            {isCover ? (
                              <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-cyan-500 text-slate-950 font-bold text-[10px] flex items-center gap-1 shadow-md">
                                <Star className="w-3 h-3 fill-slate-950" />
                                <span>মূল কভার ছবি</span>
                              </div>
                            ) : (
                              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-300 font-mono text-[9px] border border-slate-800">
                                #{idx + 1}
                              </span>
                            )}

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              title="ছবি মুছে ফেলুন"
                              className="absolute top-1.5 right-1.5 p-1 rounded-md bg-slate-950/80 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors border border-slate-800"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Footer Action */}
                          <div className="p-1.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                            {isCover ? (
                              <span className="text-[10px] text-cyan-400 font-medium px-1">
                                Primary View
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleSetCoverPhoto(idx)}
                                className="w-full text-center text-[10px] text-slate-400 hover:text-cyan-300 py-0.5 font-medium transition-colors hover:underline"
                              >
                                মূল ছবি বানান (Set as Cover)
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-6 border border-slate-800/80 bg-slate-950/50 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
                    <ImageIcon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-300 block">
                      এখনো কোনো আসল ছবি যুক্ত করা হয়নি
                    </span>
                    <span className="text-[11px] text-slate-500 block max-w-sm mt-0.5">
                      ওপরের বাটন দিয়ে শোরুমের বাইকের আসল ছবি আপলোড করুন (সামনে, পেছনের চাকা, মিটার কনসোল, সাইড প্রোফাইল)।
                    </span>
                  </div>
                </div>
              )}
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
