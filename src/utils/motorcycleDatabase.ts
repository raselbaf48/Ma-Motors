/**
 * Motorcycle Database with Models, Braking Systems, Engine CC, and Categories.
 * Allows instant 1-click selection and automatic determination of Braking System.
 */

export interface ModelPreset {
  model: string;
  brakingSystem: 'Dual Channel ABS' | 'Single Channel ABS' | 'Dual Disc' | 'CBS' | 'Front Disc / Rear Drum' | 'Drum Brakes';
  cc: number;
  category: 'Sport' | 'Naked' | 'Commuter' | 'Cruiser' | 'Tourer' | 'Scooter';
  fuelSupply?: 'FI' | 'Carburetor' | 'Electric';
}

export const BRAND_MODELS_DB: Record<string, ModelPreset[]> = {
  yamaha: [
    { model: 'YZF-R15 V4 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 155, category: 'Sport' },
    { model: 'YZF-R15M V4 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 155, category: 'Sport' },
    { model: 'YZF-R15 V3 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 155, category: 'Sport' },
    { model: 'MT-15 V2 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 155, category: 'Naked' },
    { model: 'MT-15 V1 Single ABS', brakingSystem: 'Single Channel ABS', cc: 155, category: 'Naked' },
    { model: 'FZ-S V3 Single ABS', brakingSystem: 'Single Channel ABS', cc: 149, category: 'Naked' },
    { model: 'FZ-S V4 Deluxe Single ABS', brakingSystem: 'Single Channel ABS', cc: 149, category: 'Naked' },
    { model: 'FZ-X Single ABS', brakingSystem: 'Single Channel ABS', cc: 149, category: 'Commuter' },
    { model: 'FZ-S V2 Dual Disc', brakingSystem: 'Dual Disc', cc: 149, category: 'Naked' },
    { model: 'FZ-S V2 Single Disc', brakingSystem: 'Front Disc / Rear Drum', cc: 149, category: 'Naked' },
    { model: 'Saluto 125 Disc', brakingSystem: 'Front Disc / Rear Drum', cc: 125, category: 'Commuter' },
    { model: 'Saluto 125 Drum', brakingSystem: 'Drum Brakes', cc: 125, category: 'Commuter' },
    { model: 'Ray ZR 125 Fi Hybrid CBS', brakingSystem: 'CBS', cc: 125, category: 'Scooter' },
    { model: 'Aerox 155 ABS', brakingSystem: 'Single Channel ABS', cc: 155, category: 'Scooter' }
  ],
  honda: [
    { model: 'CBR 150R Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 149, category: 'Sport' },
    { model: 'CBR 150R Repsol Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 149, category: 'Sport' },
    { model: 'X-Blade 160 Single ABS', brakingSystem: 'Single Channel ABS', cc: 162, category: 'Naked' },
    { model: 'X-Blade 160 Dual Disc', brakingSystem: 'Dual Disc', cc: 162, category: 'Naked' },
    { model: 'CB Hornet 160R Single ABS', brakingSystem: 'Single Channel ABS', cc: 162, category: 'Naked' },
    { model: 'CB Hornet 160R Dual Disc', brakingSystem: 'Dual Disc', cc: 162, category: 'Naked' },
    { model: 'CB Shine 125 Disc CBS', brakingSystem: 'CBS', cc: 125, category: 'Commuter' },
    { model: 'SP 125 Disc CBS', brakingSystem: 'CBS', cc: 125, category: 'Commuter' },
    { model: 'Livo 110 Disc CBS', brakingSystem: 'CBS', cc: 110, category: 'Commuter' },
    { model: 'Livo 110 Drum', brakingSystem: 'Drum Brakes', cc: 110, category: 'Commuter' },
    { model: 'Dio 110 CBS', brakingSystem: 'CBS', cc: 110, category: 'Scooter' }
  ],
  bajaj: [
    { model: 'Pulsar N160 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 164, category: 'Naked' },
    { model: 'Pulsar N250 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 249, category: 'Naked' },
    { model: 'Pulsar F250 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 249, category: 'Sport' },
    { model: 'Pulsar NS400Z Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 373, category: 'Naked' },
    { model: 'Dominar 400 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 373, category: 'Tourer' },
    { model: 'Dominar 250 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 248, category: 'Tourer' },
    { model: 'Pulsar NS160 Single ABS Fi', brakingSystem: 'Single Channel ABS', cc: 160, category: 'Naked' },
    { model: 'Pulsar 150 Twin Disc ABS', brakingSystem: 'Single Channel ABS', cc: 150, category: 'Commuter' },
    { model: 'Pulsar 150 Twin Disc', brakingSystem: 'Dual Disc', cc: 150, category: 'Commuter' },
    { model: 'Pulsar 150 Single Disc', brakingSystem: 'Front Disc / Rear Drum', cc: 150, category: 'Commuter' },
    { model: 'Discover 125 Disc CBS', brakingSystem: 'CBS', cc: 125, category: 'Commuter' },
    { model: 'Discover 125 Disc', brakingSystem: 'Front Disc / Rear Drum', cc: 125, category: 'Commuter' },
    { model: 'Discover 110 Disc CBS', brakingSystem: 'CBS', cc: 115, category: 'Commuter' },
    { model: 'Discover 125 Drum', brakingSystem: 'Drum Brakes', cc: 125, category: 'Commuter' },
    { model: 'Platina 110 H-Gear Disc', brakingSystem: 'Front Disc / Rear Drum', cc: 115, category: 'Commuter' },
    { model: 'Platina 100 ES Drum', brakingSystem: 'Drum Brakes', cc: 102, category: 'Commuter' },
    { model: 'Avenger 160 Street ABS', brakingSystem: 'Single Channel ABS', cc: 160, category: 'Cruiser' }
  ],
  suzuki: [
    { model: 'Gixxer SF FI Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 155, category: 'Sport' },
    { model: 'Gixxer SF FI Single ABS', brakingSystem: 'Single Channel ABS', cc: 155, category: 'Sport' },
    { model: 'Gixxer FI Single ABS', brakingSystem: 'Single Channel ABS', cc: 155, category: 'Naked' },
    { model: 'Gixxer Carb Dual Disc', brakingSystem: 'Dual Disc', cc: 155, category: 'Naked' },
    { model: 'Gixxer Monotone Single Disc', brakingSystem: 'Front Disc / Rear Drum', cc: 155, category: 'Naked' },
    { model: 'GSX-R 150 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 147, category: 'Sport' },
    { model: 'GSX-S 150 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 147, category: 'Naked' },
    { model: 'Hayate EP 110 Drum', brakingSystem: 'Drum Brakes', cc: 113, category: 'Commuter' },
    { model: 'Burgman Street 125 CBS', brakingSystem: 'CBS', cc: 125, category: 'Scooter' },
    { model: 'Access 125 Disc CBS', brakingSystem: 'CBS', cc: 125, category: 'Scooter' }
  ],
  tvs: [
    { model: 'Apache RR 310 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 312, category: 'Sport' },
    { model: 'Apache RTR 200 4V Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 197, category: 'Naked' },
    { model: 'Apache RTR 160 4V Single ABS', brakingSystem: 'Single Channel ABS', cc: 159, category: 'Naked' },
    { model: 'Apache RTR 160 4V Dual Disc', brakingSystem: 'Dual Disc', cc: 159, category: 'Naked' },
    { model: 'Apache RTR 160 2V Single ABS', brakingSystem: 'Single Channel ABS', cc: 159, category: 'Naked' },
    { model: 'Apache RTR 160 2V Single Disc', brakingSystem: 'Front Disc / Rear Drum', cc: 159, category: 'Naked' },
    { model: 'Raider 125 Disc CBS', brakingSystem: 'CBS', cc: 125, category: 'Commuter' },
    { model: 'Metro Plus 110 Disc CBS', brakingSystem: 'CBS', cc: 110, category: 'Commuter' },
    { model: 'Metro Plus 110 Drum', brakingSystem: 'Drum Brakes', cc: 110, category: 'Commuter' },
    { model: 'Radeon 110 Disc CBS', brakingSystem: 'CBS', cc: 110, category: 'Commuter' },
    { model: 'NTorq 125 Race Edition Disc', brakingSystem: 'CBS', cc: 125, category: 'Scooter' }
  ],
  ktm: [
    { model: 'RC 390 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 373, category: 'Sport' },
    { model: 'Duke 390 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 373, category: 'Naked' },
    { model: 'RC 200 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 199, category: 'Sport' },
    { model: 'Duke 200 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 199, category: 'Naked' },
    { model: 'Duke 125 Single Channel ABS', brakingSystem: 'Single Channel ABS', cc: 125, category: 'Naked' },
    { model: 'RC 125 Single Channel ABS', brakingSystem: 'Single Channel ABS', cc: 125, category: 'Sport' },
    { model: '250 Adventure Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 248, category: 'Tourer' },
    { model: '390 Adventure Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 373, category: 'Tourer' }
  ],
  'royal enfield': [
    { model: 'Classic 350 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 349, category: 'Cruiser' },
    { model: 'Hunter 350 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 349, category: 'Naked' },
    { model: 'Meteor 350 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 349, category: 'Cruiser' },
    { model: 'Bullet 350 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 349, category: 'Cruiser' },
    { model: 'Himalayan 450 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 452, category: 'Tourer' },
    { model: 'Interceptor 650 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 648, category: 'Cruiser' }
  ],
  hero: [
    { model: 'Karizma XMR 210 Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 210, category: 'Sport' },
    { model: 'Xpulse 200 4V Single ABS', brakingSystem: 'Single Channel ABS', cc: 199, category: 'Tourer' },
    { model: 'Xtreme 160R 4V Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 163, category: 'Naked' },
    { model: 'Xtreme 160R Single ABS', brakingSystem: 'Single Channel ABS', cc: 163, category: 'Naked' },
    { model: 'Hunk 150R Single ABS', brakingSystem: 'Single Channel ABS', cc: 149, category: 'Naked' },
    { model: 'Hunk 150 Dual Disc', brakingSystem: 'Dual Disc', cc: 149, category: 'Naked' },
    { model: 'Glamour XTEC 125 Disc CBS', brakingSystem: 'CBS', cc: 125, category: 'Commuter' },
    { model: 'Passion XPRO Disc CBS', brakingSystem: 'CBS', cc: 110, category: 'Commuter' },
    { model: 'Splendor Plus 100 Drum', brakingSystem: 'Drum Brakes', cc: 97, category: 'Commuter' },
    { model: 'HF Deluxe 100 Drum', brakingSystem: 'Drum Brakes', cc: 97, category: 'Commuter' }
  ],
  kawasaki: [
    { model: 'Ninja 300 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 296, category: 'Sport' },
    { model: 'Ninja 400 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 399, category: 'Sport' },
    { model: 'Ninja ZX-4RR Dual ABS', brakingSystem: 'Dual Channel ABS', cc: 399, category: 'Sport' },
    { model: 'Ninja 125 Single ABS', brakingSystem: 'Single Channel ABS', cc: 125, category: 'Sport' },
    { model: 'Z125 Pro Single ABS', brakingSystem: 'Single Channel ABS', cc: 125, category: 'Naked' },
    { model: 'KLX 150 Dual Disc', brakingSystem: 'Dual Disc', cc: 144, category: 'Tourer' }
  ],
  lifan: [
    { model: 'KPR 165R Carb Single ABS', brakingSystem: 'Single Channel ABS', cc: 165, category: 'Sport' },
    { model: 'KPR 165R FI Single ABS', brakingSystem: 'Single Channel ABS', cc: 165, category: 'Sport' },
    { model: 'KPR 150 Dual Disc', brakingSystem: 'Dual Disc', cc: 149, category: 'Sport' },
    { model: 'KP350 Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 350, category: 'Naked' },
    { model: 'KPT 150 4V Single ABS', brakingSystem: 'Single Channel ABS', cc: 150, category: 'Tourer' }
  ],
  gpx: [
    { model: 'Demon GR200R Dual Channel ABS', brakingSystem: 'Dual Channel ABS', cc: 198, category: 'Sport' },
    { model: 'Demon 150GR Dual Disc', brakingSystem: 'Dual Disc', cc: 149, category: 'Sport' },
    { model: 'Raptor 180 Single ABS', brakingSystem: 'Single Channel ABS', cc: 180, category: 'Naked' }
  ],
  runner: [
    { model: 'Bolt 165R Single ABS', brakingSystem: 'Single Channel ABS', cc: 165, category: 'Naked' },
    { model: 'Knight Rider V2 Dual Disc', brakingSystem: 'Dual Disc', cc: 150, category: 'Naked' },
    { model: 'Turbo 125 Disc', brakingSystem: 'Front Disc / Rear Drum', cc: 125, category: 'Commuter' },
    { model: 'Bullet 100 Drum', brakingSystem: 'Drum Brakes', cc: 100, category: 'Commuter' }
  ]
};

/**
 * Intelligent Braking System Auto-Detector
 * Automatically determines the exact braking system from model name and brand.
 */
export function autoDetectBrakingSystem(brand: string, model: string): {
  brakingSystem: 'Dual Channel ABS' | 'Single Channel ABS' | 'Dual Disc' | 'CBS' | 'Front Disc / Rear Drum' | 'Drum Brakes';
  cc?: number;
  category?: 'Sport' | 'Naked' | 'Commuter' | 'Cruiser' | 'Tourer' | 'Scooter';
  isAutoMatched: boolean;
} {
  const normBrand = (brand || '').trim().toLowerCase();
  const normModel = (model || '').trim().toLowerCase();

  // 1. Direct match from database presets
  for (const [bKey, models] of Object.entries(BRAND_MODELS_DB)) {
    if (normBrand.includes(bKey) || bKey.includes(normBrand)) {
      const found = models.find(
        (m) =>
          normModel.includes(m.model.toLowerCase()) ||
          m.model.toLowerCase().includes(normModel)
      );
      if (found) {
        return {
          brakingSystem: found.brakingSystem,
          cc: found.cc,
          category: found.category,
          isAutoMatched: true
        };
      }
    }
  }

  // 2. Intelligent pattern recognition
  // Dual Channel ABS triggers
  if (
    normModel.includes('dual channel abs') ||
    normModel.includes('dual abs') ||
    normModel.includes('2 channel abs') ||
    normModel.includes('dual channel') ||
    normModel.includes('r15 v4') ||
    normModel.includes('r15m') ||
    normModel.includes('r15 v3') ||
    normModel.includes('mt-15 v2') ||
    normModel.includes('n160 dual') ||
    normModel.includes('n250') ||
    normModel.includes('f250') ||
    normModel.includes('ns400') ||
    normModel.includes('dominar') ||
    normModel.includes('duke 200') ||
    normModel.includes('duke 250') ||
    normModel.includes('duke 390') ||
    normModel.includes('rc 200') ||
    normModel.includes('rc 390') ||
    normModel.includes('rr 310') ||
    normModel.includes('rtr 200') ||
    normModel.includes('classic 350') ||
    normModel.includes('hunter 350') ||
    normModel.includes('meteor 350') ||
    normModel.includes('bullet 350') ||
    normModel.includes('ninja 300') ||
    normModel.includes('ninja 400') ||
    normModel.includes('cbr 150r') ||
    normModel.includes('gsx-r 150') ||
    normModel.includes('gsx-s 150') ||
    normModel.includes('gr200r') ||
    normModel.includes('karizma xmr') ||
    normModel.includes('zt310') ||
    normModel.includes('155 g1')
  ) {
    return {
      brakingSystem: 'Dual Channel ABS',
      isAutoMatched: true
    };
  }

  // Single Channel ABS triggers
  if (
    normModel.includes('single channel abs') ||
    normModel.includes('single abs') ||
    normModel.includes('1 channel abs') ||
    normModel.includes('single channel') ||
    normModel.includes('abs') ||
    normModel.includes('fz-s v3') ||
    normModel.includes('fz-s v4') ||
    normModel.includes('fzs v3') ||
    normModel.includes('fzs v4') ||
    normModel.includes('fz-x') ||
    normModel.includes('mt-15') ||
    normModel.includes('gixxer sf fi') ||
    normModel.includes('gixxer fi') ||
    normModel.includes('ns160') ||
    normModel.includes('rtr 160 4v') ||
    normModel.includes('rtr 160 2v') ||
    normModel.includes('xpulse 200') ||
    normModel.includes('xtreme 160r') ||
    normModel.includes('hunk 150r') ||
    normModel.includes('kpr 165') ||
    normModel.includes('bolt 165') ||
    normModel.includes('x-blade') ||
    normModel.includes('hornet 160') ||
    normModel.includes('duke 125') ||
    normModel.includes('rc 125')
  ) {
    return {
      brakingSystem: 'Single Channel ABS',
      isAutoMatched: true
    };
  }

  // CBS / Combi Brake triggers
  if (
    normModel.includes('cbs') ||
    normModel.includes('combi') ||
    normModel.includes('raider 125') ||
    normModel.includes('metro plus') ||
    normModel.includes('radeon') ||
    normModel.includes('livo') ||
    normModel.includes('sp 125') ||
    normModel.includes('cb shine') ||
    normModel.includes('glamour xtec') ||
    normModel.includes('passion xpro') ||
    normModel.includes('burgman') ||
    normModel.includes('access 125') ||
    normModel.includes('ray zr') ||
    normModel.includes('dio') ||
    normModel.includes('activa')
  ) {
    return {
      brakingSystem: 'CBS',
      isAutoMatched: true
    };
  }

  // Dual Disc triggers (non-ABS)
  if (
    normModel.includes('dual disc') ||
    normModel.includes('twin disc') ||
    normModel.includes('double disc') ||
    normModel.includes('dd') ||
    normModel.includes('fz-s v2 dd') ||
    normModel.includes('kpr 150') ||
    normModel.includes('knight rider')
  ) {
    return {
      brakingSystem: 'Dual Disc',
      isAutoMatched: true
    };
  }

  // Drum triggers
  if (
    normModel.includes('drum') ||
    normModel.includes('splendor') ||
    normModel.includes('hf deluxe') ||
    normModel.includes('platina') ||
    normModel.includes('bullet 100') ||
    normModel.includes('ad80') ||
    normModel.includes('metro 100')
  ) {
    return {
      brakingSystem: 'Drum Brakes',
      isAutoMatched: true
    };
  }

  // Default fallback for general commuter/sport
  return {
    brakingSystem: 'Single Channel ABS',
    isAutoMatched: false
  };
}

/**
 * Intelligent Fuel Supply Auto-Detector (Fi vs Carburetor vs Electric)
 * Automatically determines fuel delivery system from motorcycle model name.
 */
export function detectFuelSupply(brand: string, model: string): 'FI' | 'Carburetor' | 'Electric' {
  const norm = (model || '').toLowerCase();
  const normBrand = (brand || '').toLowerCase();

  if (norm.includes('electric') || norm.includes('ev') || norm.includes('battery') || normBrand.includes('green') || normBrand.includes('akij')) {
    return 'Electric';
  }

  // Check if matching preset has fuelSupply
  const brandList = BRAND_MODELS_DB[normBrand];
  if (brandList) {
    const match = brandList.find(p => p.model.toLowerCase() === norm);
    if (match && match.fuelSupply) {
      return match.fuelSupply;
    }
  }

  // Known FI motorcycles
  if (
    norm.includes('fi') ||
    norm.includes('injection') ||
    norm.includes('r15') ||
    norm.includes('mt-15') ||
    norm.includes('v3') ||
    norm.includes('v4') ||
    norm.includes('fz-x') ||
    norm.includes('gixxer') ||
    norm.includes('n160') ||
    norm.includes('n250') ||
    norm.includes('f250') ||
    norm.includes('ns400') ||
    norm.includes('dominar') ||
    norm.includes('duke') ||
    norm.includes('rc 200') ||
    norm.includes('rc 390') ||
    norm.includes('adventure 390') ||
    norm.includes('rr 310') ||
    norm.includes('rtr 160 4v fi') ||
    norm.includes('rtr 200 4v') ||
    norm.includes('ronin') ||
    norm.includes('classic 350') ||
    norm.includes('hunter 350') ||
    norm.includes('meteor') ||
    norm.includes('bullet 350') ||
    norm.includes('xpulse 200') ||
    norm.includes('xtreme 160r') ||
    norm.includes('karizma') ||
    norm.includes('aerox') ||
    norm.includes('cbr') ||
    norm.includes('gsx-r') ||
    norm.includes('gsx-s') ||
    norm.includes('raider') ||
    norm.includes('zontes') ||
    norm.includes('cfmoto') ||
    norm.includes('sr 250') ||
    norm.includes('sr 300') ||
    norm.includes('sr 450') ||
    norm.includes('gr200r') ||
    norm.includes('benelli 165s')
  ) {
    return 'FI';
  }
  return 'Carburetor';
}
