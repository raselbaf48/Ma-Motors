import { createClient } from '@supabase/supabase-js';
import { 
  Bike, 
  PurchaseRecord, 
  SaleRecord, 
  CustomerInquiry, 
  SellBikeSubmission, 
  ShowroomSettings 
} from '../types/bike';
import { 
  INITIAL_BIKES, 
  INITIAL_PURCHASES, 
  INITIAL_SALES, 
  INITIAL_INQUIRIES, 
  INITIAL_SELL_REQUESTS, 
  DEFAULT_SETTINGS 
} from '../data/mockBikes';
import { findModelSpec, getModelDefaultImage, getModelDefaultBrakingSystem } from '../data/bangladeshBikes';

const getEnv = (key: string, fallback: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.[key]) {
      return (import.meta as any).env[key];
    }
  } catch {
    // ignore
  }
  try {
    if (typeof process !== 'undefined' && process.env?.[key]) {
      return process.env[key];
    }
  } catch {
    // ignore
  }
  return fallback;
};

export const SUPABASE_URL = getEnv('VITE_SUPABASE_URL', 'https://vgcngeszamnczpdggugb.supabase.co').trim();
export const SUPABASE_ANON_KEY = getEnv(
  'VITE_SUPABASE_ANON_KEY',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnY25nZXN6YW1uY3pwZGdndWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1Mjc3NDEsImV4cCI6MjEwNjEwMzc0MX0.GXB55kU8UGkCCEOKnWPy0JLLklvxYWvRcMNGOV93QZM'
).trim();

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Master & Admin Emails
export const MASTER_ADMIN_EMAIL = 'raselbaf48@gmail.com';
export const DEFAULT_ADMIN_EMAILS = [
  'raselbaf48@gmail.com',
  'rasel399486@gmail.com',
  'sarmin474455@gmail.com'
];

export function getAdminEmails(): string[] {
  try {
    const custom = localStorage.getItem('mamotors_admin_emails');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return Array.from(new Set([MASTER_ADMIN_EMAIL.toLowerCase(), ...parsed.map(e => String(e).trim().toLowerCase())]));
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_ADMIN_EMAILS.map(e => e.toLowerCase());
}

export function isEmailAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const cleanEmail = email.trim().toLowerCase();
  return getAdminEmails().includes(cleanEmail);
}

export type UserRole = 'admin' | 'customer' | 'guest';

export interface AppUserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  isMasterAdmin: boolean;
}

export function determineUserRole(email: string | null | undefined): UserRole {
  if (!email) return 'guest';
  return isEmailAdmin(email) ? 'admin' : 'customer';
}

// -------------------------------------------------------------
// BIKE MAPPERS & SYNC
// -------------------------------------------------------------

const META_PREFIX = '__MAMOTORS_META__:';

export function serializeBikeToSupabase(bike: Bike) {
  const meta = {
    originalPrice: bike.originalPrice,
    buyingPrice: bike.buyingPrice,
    askingPrice: bike.askingPrice,
    mfgYear: bike.mfgYear,
    regYear: bike.regYear,
    regNumber: bike.regNumber,
    registrationYear: bike.registrationYear,
    registrationCity: bike.registrationCity,
    ownersCount: bike.ownersCount,
    warrantyMonths: bike.warrantyMonths,
    color: bike.color,
    colorHex: bike.colorHex,
    category: bike.category,
    transmission: bike.transmission,
    conditionGrade: bike.conditionGrade,
    conditionLabel: bike.conditionLabel,
    fuelSupply: bike.fuelSupply,
    smartCardStatus: bike.smartCardStatus,
    fingerprintDone: bike.fingerprintDone,
    additionalCosts: bike.additionalCosts,
    totalAdditionalCost: bike.totalAdditionalCost,
    documentPdfUrl: bike.documentPdfUrl,
    documentPdfName: bike.documentPdfName,
    uploadedDocuments: bike.uploadedDocuments,
    sellerInfo: bike.sellerInfo,
    specs: bike.specs,
    inspection: bike.inspection,
    featured: bike.featured,
    brandLogoUrl: bike.brandLogoUrl
  };

  return {
    name: bike.name,
    brand: bike.brand,
    model: bike.model,
    year: bike.year || bike.mfgYear,
    engine_cc: bike.cc,
    price: bike.price || bike.askingPrice,
    discount_price: bike.askingPrice,
    mileage: bike.mileageKm,
    fuel_type: bike.fuelType || 'Petrol',
    braking_system: bike.brakingSystem || 'Dual Channel ABS',
    status: bike.status.toLowerCase(),
    image_url: bike.images?.[0] || '',
    images: bike.images || [],
    description: `${META_PREFIX}${JSON.stringify(meta)}`
  };
}

export function deserializeBikeFromSupabase(row: any): Bike {
  let meta: any = {};
  if (row.description && typeof row.description === 'string' && row.description.startsWith(META_PREFIX)) {
    try {
      meta = JSON.parse(row.description.slice(META_PREFIX.length));
    } catch {
      meta = {};
    }
  }

  const spec = findModelSpec(row.brand, row.model);
  const effectiveCc = row.engine_cc || spec?.cc || 150;
  const defaultImg = row.image_url || spec?.image || getModelDefaultImage(row.brand, row.model);
  const images = (Array.isArray(row.images) && row.images.length > 0) ? row.images : [defaultImg];

  const statusMap: Record<string, 'Available' | 'Reserved' | 'Sold'> = {
    available: 'Available',
    reserved: 'Reserved',
    sold: 'Sold'
  };

  const status = statusMap[String(row.status || '').toLowerCase()] || 'Available';

  return {
    id: String(row.id),
    name: row.name || `${row.brand} ${row.model}`,
    brand: row.brand,
    brandLogoUrl: meta.brandLogoUrl,
    model: row.model,
    mfgYear: meta.mfgYear || row.year || 2023,
    regYear: meta.regYear || row.year || 2023,
    regNumber: meta.regNumber || 'Dhaka Metro-LA 12-3456',
    buyingPrice: meta.buyingPrice || Math.round(Number(row.price) * 0.85) || 200000,
    askingPrice: Number(row.discount_price || row.price) || 250000,
    additionalCosts: meta.additionalCosts || [],
    totalAdditionalCost: meta.totalAdditionalCost || 0,
    documentPdfUrl: meta.documentPdfUrl,
    documentPdfName: meta.documentPdfName || 'BRTA_Record.pdf',
    year: row.year || meta.mfgYear || 2023,
    price: Number(row.price) || 250000,
    originalPrice: meta.originalPrice || Math.round(Number(row.price) * 1.1),
    cc: effectiveCc,
    mileageKm: row.mileage || 5000,
    conditionGrade: meta.conditionGrade || 'A+',
    conditionLabel: meta.conditionLabel || 'Showroom Mint',
    fuelType: (row.fuel_type as any) || 'Petrol',
    fuelSupply: meta.fuelSupply || spec?.fuelSupply || 'FI',
    brakingSystem: row.braking_system || getModelDefaultBrakingSystem(row.brand, row.model, effectiveCc),
    transmission: meta.transmission || 'Manual',
    color: meta.color || 'Verified Color',
    colorHex: meta.colorHex || '#06b6d4',
    category: meta.category || spec?.category || 'Sport',
    featured: meta.featured ?? true,
    inStock: status !== 'Sold',
    status,
    registrationYear: meta.registrationYear || row.year || 2023,
    registrationCity: meta.registrationCity || 'Dhaka North',
    ownersCount: meta.ownersCount ?? 1,
    warrantyMonths: meta.warrantyMonths ?? 12,
    smartCardStatus: meta.smartCardStatus || 'Yes',
    fingerprintDone: meta.fingerprintDone || 'Yes',
    uploadedDocuments: meta.uploadedDocuments || [],
    sellerInfo: meta.sellerInfo,
    images,
    specs: meta.specs || {
      engine: `${effectiveCc}cc 4-Stroke Engine`,
      maxPower: `${Math.round(effectiveCc / 9)} HP`,
      maxTorque: `${Math.round(effectiveCc / 11)} Nm`,
      fuelTankCapacity: '12 L',
      topSpeed: `${effectiveCc >= 200 ? 145 : effectiveCc >= 150 ? 132 : 105} km/h`,
      curbWeight: '142 kg',
      seatHeight: '800 mm',
      frontBrake: 'Disc ABS',
      rearBrake: 'Disc',
      absType: row.braking_system || 'Single/Dual Channel ABS',
      brakingSystem: row.braking_system || 'Single Channel ABS',
      fuelSupply: 'FI',
      tyreConditionPct: 92,
      batteryHealthPct: 95
    },
    inspection: meta.inspection || {
      overallScore: 94,
      engineHealth: 96,
      chassisFrame: 100,
      tyresSuspension: 92,
      electricals: 96,
      bodyPaint: 94,
      scratchesNotes: 'Showroom verified, no chassis damage',
      tyresNotes: 'Good tread condition',
      engineNotes: 'Clean compression and sound',
      documentsVerified: true,
      registrationNumber: meta.regNumber || 'Dhaka Metro-LA 12-3456',
      taxTokenValidUntil: '2027-12-31',
      insuranceValidUntil: '2026-11-30',
      fitnessValidUntil: '2027-12-31',
      ownershipTransferGuaranteed: true
    }
  };
}

// -------------------------------------------------------------
// PURCHASES MAPPERS & SYNC
// -------------------------------------------------------------
export function serializePurchaseToSupabase(p: PurchaseRecord) {
  const meta = {
    brand: p.brand,
    model: p.model,
    mfgYear: p.mfgYear,
    regYear: p.regYear,
    regNumber: p.regNumber,
    sellerAddress: p.sellerAddress,
    estimatedSellingPrice: p.estimatedSellingPrice,
    mileageKm: p.mileageKm,
    conditionGrade: p.conditionGrade,
    paymentMethod: p.paymentMethod,
    documentStatus: p.documentStatus
  };

  return {
    bike_name: p.bikeName,
    seller_name: p.sellerName,
    seller_phone: p.sellerPhone,
    purchase_price: p.purchasePrice,
    purchase_date: p.purchaseDate || new Date().toISOString().split('T')[0],
    notes: `${META_PREFIX}${JSON.stringify(meta)}`
  };
}

export function deserializePurchaseFromSupabase(row: any): PurchaseRecord {
  let meta: any = {};
  if (row.notes && typeof row.notes === 'string' && row.notes.startsWith(META_PREFIX)) {
    try {
      meta = JSON.parse(row.notes.slice(META_PREFIX.length));
    } catch {
      meta = {};
    }
  }

  return {
    id: String(row.id),
    bikeId: meta.bikeId || row.id,
    bikeName: row.bike_name,
    brand: meta.brand || 'Yamaha',
    model: meta.model || 'Motorcycle',
    mfgYear: meta.mfgYear || 2023,
    regYear: meta.regYear || 2023,
    regNumber: meta.regNumber || 'Dhaka Metro-LA',
    sellerName: row.seller_name,
    sellerPhone: row.seller_phone,
    sellerAddress: meta.sellerAddress || 'Dhaka',
    purchasePrice: Number(row.purchase_price) || 0,
    estimatedSellingPrice: meta.estimatedSellingPrice || Math.round(Number(row.purchase_price) * 1.15),
    purchaseDate: row.purchase_date || new Date().toISOString().split('T')[0],
    mileageKm: meta.mileageKm || 5000,
    conditionGrade: meta.conditionGrade || 'A',
    paymentMethod: meta.paymentMethod || 'Bank Transfer',
    documentStatus: meta.documentStatus || 'BRTA Papers Verified',
    notes: row.notes?.startsWith(META_PREFIX) ? '' : row.notes
  };
}

// -------------------------------------------------------------
// SALES MAPPERS & SYNC
// -------------------------------------------------------------
export function serializeSaleToSupabase(s: SaleRecord | any) {
  const meta = {
    invoiceNumber: s.invoiceNumber,
    regNumber: s.regNumber,
    buyerAddress: s.buyerAddress,
    buyerNid: s.buyerNid,
    buyingPrice: s.buyingPrice,
    profit: s.profit,
    warrantyMonths: s.warrantyMonths,
    status: s.status,
    notes: s.notes
  };

  return {
    bike_id: s.bikeId && !String(s.bikeId).startsWith('bike-') ? s.bikeId : null,
    bike_name: s.bikeName || 'Motorcycle',
    customer_name: s.buyerName || s.customerName || 'Valued Buyer',
    customer_phone: s.buyerPhone || s.customerPhone || '+880 1700-000000',
    sale_price: s.salePrice || 0,
    sale_date: s.saleDate || new Date().toISOString().split('T')[0],
    payment_method: s.paymentMethod || 'Cash'
  };
}

export function deserializeSaleFromSupabase(row: any): SaleRecord {
  let meta: any = {};
  return {
    id: String(row.id),
    invoiceNumber: meta.invoiceNumber || `INV-${String(row.id).slice(0, 8).toUpperCase()}`,
    bikeId: row.bike_id || String(row.id),
    bikeName: row.bike_name,
    regNumber: meta.regNumber || 'Dhaka Metro-LA',
    buyerName: row.customer_name || 'Valued Customer',
    buyerPhone: row.customer_phone || '+880 1700-000000',
    buyerAddress: meta.buyerAddress || 'Dhaka',
    buyerNid: meta.buyerNid,
    saleDate: row.sale_date || new Date().toISOString().split('T')[0],
    buyingPrice: Math.round(Number(row.sale_price) * 0.85),
    salePrice: Number(row.sale_price) || 0,
    profit: Math.round(Number(row.sale_price) * 0.15),
    paymentMethod: (row.payment_method as any) || 'Bank Transfer',
    warrantyMonths: meta.warrantyMonths || 12,
    status: 'Completed',
    notes: row.notes || ''
  };
}

// -------------------------------------------------------------
// INQUIRIES MAPPERS & SYNC
// -------------------------------------------------------------
export function serializeInquiryToSupabase(inq: Omit<CustomerInquiry, 'id' | 'createdAt'> | CustomerInquiry) {
  return {
    bike_name: inq.bikeName || 'General Inquiry',
    customer_name: inq.customerName,
    customer_phone: inq.phone,
    customer_email: inq.email || '',
    message: inq.notes || '',
    status: (inq.status || 'New').toLowerCase()
  };
}

export function deserializeInquiryFromSupabase(row: any): CustomerInquiry {
  const statusMap: Record<string, CustomerInquiry['status']> = {
    new: 'New',
    contacted: 'Contacted',
    'test ride scheduled': 'Test Ride Scheduled',
    closed: 'Closed'
  };

  return {
    id: String(row.id),
    bikeName: row.bike_name || 'Showroom Inquiry',
    customerName: row.customer_name,
    phone: row.customer_phone,
    email: row.customer_email || '',
    inquiryType: 'Purchase Inquiry',
    notes: row.message || '',
    status: statusMap[String(row.status || '').toLowerCase()] || 'New',
    createdAt: row.created_at || new Date().toISOString()
  };
}

// -------------------------------------------------------------
// SELL REQUESTS MAPPERS & SYNC
// -------------------------------------------------------------
export function serializeSellRequestToSupabase(req: SellBikeSubmission) {
  return {
    owner_name: req.sellerName,
    phone: req.phone,
    bike_brand: req.brand,
    bike_model: req.model,
    reg_year: req.year,
    asking_price: req.expectedPrice,
    odometer: req.mileageKm,
    status: (req.status || 'Pending Review').toLowerCase()
  };
}

export function deserializeSellRequestFromSupabase(row: any): SellBikeSubmission {
  const statusMap: Record<string, SellBikeSubmission['status']> = {
    pending: 'Pending Review',
    'pending review': 'Pending Review',
    'inspection scheduled': 'Inspection Scheduled',
    'offer made': 'Offer Made',
    accepted: 'Accepted',
    rejected: 'Rejected'
  };

  return {
    id: String(row.id),
    sellerName: row.owner_name,
    phone: row.phone,
    email: '',
    brand: row.bike_brand,
    model: row.bike_model,
    year: row.reg_year || 2022,
    cc: 150,
    mileageKm: row.odometer || 0,
    conditionGrade: 'A',
    expectedPrice: Number(row.asking_price) || 0,
    estimatedOfferMin: Math.round(Number(row.asking_price || 150000) * 0.88),
    estimatedOfferMax: Math.round(Number(row.asking_price || 150000) * 0.95),
    photosCount: 2,
    status: statusMap[String(row.status || '').toLowerCase()] || 'Pending Review',
    createdAt: row.created_at || new Date().toISOString()
  };
}

// -------------------------------------------------------------
// SETTINGS MAPPERS & SYNC
// -------------------------------------------------------------
export function serializeSettingsToSupabase(s: ShowroomSettings) {
  return {
    id: 'main_settings',
    showroom_name: s.showroomName,
    tagline: s.tagline,
    phone: s.hotline,
    email: s.email,
    address: s.address,
    logo_url: s.logoUrl || ''
  };
}

export function deserializeSettingsFromSupabase(row: any): ShowroomSettings {
  return {
    ...DEFAULT_SETTINGS,
    showroomName: row.showroom_name || DEFAULT_SETTINGS.showroomName,
    tagline: row.tagline || DEFAULT_SETTINGS.tagline,
    hotline: row.phone || DEFAULT_SETTINGS.hotline,
    email: row.email || DEFAULT_SETTINGS.email,
    address: row.address || DEFAULT_SETTINGS.address,
    logoUrl: row.logo_url || DEFAULT_SETTINGS.logoUrl
  };
}
