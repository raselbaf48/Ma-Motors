export interface BikeSpecs {
  engine: string;
  maxPower: string;
  maxTorque: string;
  fuelTankCapacity: string;
  topSpeed: string;
  curbWeight: string;
  seatHeight: string;
  frontBrake: string;
  rearBrake: string;
  absType: string;
  brakingSystem?: 'Dual Channel ABS' | 'Single Channel ABS' | 'Dual Disc' | 'Disc + Drum' | 'CBS' | 'Drum Brakes' | string;
  fuelSupply?: 'FI' | 'Carburetor' | 'Electric';
  tyreConditionPct: number;
  batteryHealthPct: number;
}

export interface InspectionReport {
  overallScore: number; // out of 100
  engineHealth: number; // percentage
  chassisFrame: number;
  tyresSuspension: number;
  electricals: number;
  bodyPaint: number;
  scratchesNotes: string;
  tyresNotes: string;
  engineNotes: string;
  documentsVerified: boolean;
  registrationNumber: string;
  taxTokenValidUntil: string;
  insuranceValidUntil: string;
  fitnessValidUntil: string;
  ownershipTransferGuaranteed: boolean;
}

export type ConditionGrade = 'A+' | 'A' | 'B';

export type AdditionalCostCategory = 'Service' | 'Wash' | 'Polish' | 'Parts' | 'Repair' | 'Other';

export interface AdditionalCostItem {
  id: string;
  category: AdditionalCostCategory;
  description: string;
  amount: number;
  date: string;
}

export interface Bike {
  id: string;
  name: string;
  brand: string;
  brandLogoUrl?: string;
  model: string;
  mfgYear: number;
  regYear: number;
  regNumber: string;
  buyingPrice: number;
  askingPrice: number;
  additionalCosts?: AdditionalCostItem[];
  totalAdditionalCost?: number;
  documentPdfUrl?: string;
  documentPdfName?: string;
  year: number; // alias to mfgYear
  price: number; // alias to askingPrice
  originalPrice: number;
  cc: number;
  mileageKm: number;
  conditionGrade: ConditionGrade;
  conditionLabel: string;
  fuelType: 'Petrol' | 'Electric' | 'Hybrid';
  fuelSupply?: 'FI' | 'Carburetor' | 'Electric';
  brakingSystem?: 'Dual Channel ABS' | 'Single Channel ABS' | 'Dual Disc' | 'Disc + Drum' | 'CBS' | 'Drum Brakes' | string;
  transmission: 'Manual' | 'Automatic' | 'Quickshifter';
  color: string;
  colorHex: string;
  category: 'Sport' | 'Cruiser' | 'Naked' | 'Commuter' | 'Tourer' | 'Scooter';
  featured: boolean;
  inStock: boolean;
  status: 'Available' | 'Reserved' | 'Sold';
  registrationYear: number;
  registrationCity: string;
  ownersCount: number;
  warrantyMonths: number;
  smartCardStatus?: 'Yes' | 'No' | 'Pending';
  fingerprintDone?: 'Yes' | 'No';
  uploadedDocuments?: { id: string; name: string; size: string; type: string; url?: string }[];
  sellerInfo?: SellerInfo;
  images: string[];
  specs: BikeSpecs;
  inspection: InspectionReport;
}

export interface SellerInfo {
  name: string;
  phone: string;
  nid?: string;
  address?: string;
  purchaseDate?: string;
  memoOrStampNo?: string;
  notes?: string;
}

export interface CustomerInquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  bikeId?: string;
  bikeName: string;
  inquiryType: 'Test Ride' | 'Purchase Inquiry' | 'EMI Financing' | 'General Query';
  preferredDate?: string;
  notes: string;
  status: 'New' | 'Contacted' | 'Test Ride Scheduled' | 'Closed';
  createdAt: string;
}

export interface SellBikeSubmission {
  id: string;
  sellerName: string;
  phone: string;
  email: string;
  brand: string;
  model: string;
  year: number;
  cc: number;
  mileageKm: number;
  conditionGrade: ConditionGrade;
  expectedPrice: number;
  estimatedOfferMin: number;
  estimatedOfferMax: number;
  photosCount: number;
  status: 'Pending Review' | 'Inspection Scheduled' | 'Offer Made' | 'Accepted' | 'Rejected';
  createdAt: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  bikePurchased: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface PurchaseRecord {
  id: string;
  bikeId?: string;
  bikeName: string;
  brand: string;
  model: string;
  mfgYear: number;
  regYear: number;
  regNumber: string;
  sellerName: string;
  sellerPhone: string;
  sellerAddress?: string;
  purchaseDate: string;
  purchasePrice: number;
  estimatedSellingPrice: number;
  paymentMethod: 'Bank Transfer' | 'Cash' | 'Cheque';
  documentStatus: 'BRTA Papers Verified' | 'Pending Transfer' | 'Original Smart Card Received';
  conditionGrade: ConditionGrade;
  mileageKm: number;
  notes?: string;
}

export interface SaleRecord {
  id: string;
  invoiceNumber: string;
  bikeId: string;
  bikeName: string;
  regNumber: string;
  buyerName: string;
  buyerPhone: string;
  buyerAddress?: string;
  buyerNid?: string;
  saleDate: string;
  buyingPrice: number;
  salePrice: number;
  profit: number;
  paymentMethod: 'Bank Transfer' | 'Cash' | 'EMI Financing';
  warrantyMonths: number;
  status: 'Completed' | 'Pending Payment' | 'Delivered';
  notes?: string;
}

export interface ShowroomSettings {
  showroomName: string;
  tagline: string;
  hotline: string;
  whatsapp: string;
  email: string;
  address: string;
  tradeLicense: string;
  currencySymbol: string;
  managerName: string;
  managerContact?: string;
  managerPhotoUrl?: string;
  openingHours: string;
  logoUrl?: string;
}

export type ActivePage = 
  | 'dashboard'
  | 'stock'
  | 'purchase'
  | 'sell'
  | 'contact'
  | 'settings'
  | 'details'
  | 'cost'
  | 'add-bike'
  | 'home' 
  | 'inventory' 
  | 'compare' 
  | 'emi' 
  | 'about' 
  | 'auth' 
  | 'admin'
  | 'menu';
