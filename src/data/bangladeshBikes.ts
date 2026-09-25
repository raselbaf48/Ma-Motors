export interface BDModelSpec {
  name: string;
  category: 'Sport' | 'Naked' | 'Scooter' | 'Cruiser' | 'Commuter' | 'Tourer';
  cc: number;
  fuelType: 'Petrol' | 'Electric' | 'Hybrid';
  fuelSupply: 'FI' | 'Carburetor' | 'Electric';
  image: string;
}

// Complete Bangladesh Available Brands List
export const BD_BRANDS = [
  'Yamaha',
  'Honda',
  'Bajaj',
  'Suzuki',
  'TVS',
  'Hero',
  'Royal Enfield',
  'KTM',
  'Kawasaki',
  'Lifan',
  'GPX',
  'Runner',
  'Benelli',
  'Keeway',
  'Taro',
  'Haojue',
  'Aprilia',
  'Vespa',
  'Zontes',
  'CFMoto',
  'FKM',
  'Italjet',
  'Roadmaster',
  'Speeder',
  'Akij',
  'Green Tiger',
  'Walton',
  'Other'
];

// High quality curated motorcycle visuals matching models in BD
const BIKE_PICS = {
  // Sports & Faired
  yamahaR15V4: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
  yamahaR15V3: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
  hondaCbr: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
  suzukiGixxerSf: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
  ktmRc: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80',
  kawasakiNinja: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
  lifanKpr: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
  gpxDemon: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',
  heroKarizma: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
  taroGp: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80',

  // Naked Streetfighters
  yamahaFzs: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80',
  yamahaMt15: 'https://images.unsplash.com/photo-1571658734974-6563604f3db6?auto=format&fit=crop&w=1200&q=80',
  bajajPulsarNs: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1200&q=80',
  bajajPulsar150: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80',
  tvsApache4V: 'https://images.unsplash.com/photo-1547549082-6bc09f2049ae?auto=format&fit=crop&w=1200&q=80',
  tvsApache2V: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80',
  hondaHornet: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80',
  suzukiGixxer155: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80',
  ktmDuke: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=1200&q=80',
  heroThriller: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80',
  heroHunk: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80',
  zontesStreet: 'https://images.unsplash.com/photo-1571658734974-6563604f3db6?auto=format&fit=crop&w=1200&q=80',
  benelliTnt: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=1200&q=80',

  // Cruisers & Retros
  royalEnfieldHunter: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
  royalEnfieldClassic: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
  royalEnfieldMeteor: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=1200&q=80',
  bajajAvenger: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
  keewaySuperlight: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',

  // Commuters
  commuterStandard: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=1200&q=80',
  commuterShine: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=1200&q=80',
  commuterSplendor: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=1200&q=80',
  commuterDiscover: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=1200&q=80',

  // Scooters
  scooterModern: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
  vespaRetro: 'https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=1200&q=80',

  // Electric
  evGreen: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
};

// Rich BD Model Database with Auto-Fill properties:
// - cc (Engine Displacement)
// - category (Classification)
// - fuelType (Petrol / Electric)
// - fuelSupply (FI / Carburetor / Electric)
// - image (Default high resolution bike photograph)
export const BD_MODEL_DATABASE: Record<string, BDModelSpec[]> = {
  'Yamaha': [
    { name: 'FZ-S V4 Deluxe Fi ABS', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V4 Standard Fi', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V3 Dual ABS', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V3 Deluxe (Golden Wheels)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V3 Vintage Edition', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V3 Standard (Single ABS)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V2 Dual Disc Fi', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V2 Single Disc', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ V3 Fi', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ V2 Fi', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ 16 (Classic Carburetor)', category: 'Naked', cc: 153, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-X 150 Fi ABS', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'Fazer V2 Fi (Semi-Faired)', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'Fazer V1 (150cc Carb)', category: 'Tourer', cc: 153, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs },
    { name: 'R15M V4 Dual Channel ABS (Quickshifter)', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 },
    { name: 'R15 V4 Racing Blue (Dual ABS)', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 },
    { name: 'R15 V4 Dark Knight / Metallic Red', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 },
    { name: 'R15 V4 Intensity White', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 },
    { name: 'R15 V3 Dual Channel ABS (Indian)', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V3 },
    { name: 'R15 V3 Indonesian (Golden USD Fork)', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V3 },
    { name: 'R15 V3 Monster Energy MotoGP', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V3 },
    { name: 'R15S V3 Uniball Single Seat', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V3 },
    { name: 'R15 V2 Dual Disc', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V3 },
    { name: 'R15 V1 (Original Special)', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V3 },
    { name: 'MT-15 V2 Dual Channel ABS (USD Fork)', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: 'MT-15 V1 Dual Channel ABS', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: 'MT-15 V1 Single ABS', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: 'MT-15 Indonesian Version', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: 'XSR 155 (Indonesian Neo-Retro)', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: 'Saluto 125 Disc UBS', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Saluto 125 Drum', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Saluto 125 Special Edition', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Saluto 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'SZ-RR V2 (150cc)', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Crux 106', category: 'Commuter', cc: 106, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Gladiator 125', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Aerox 155 Fi Connected ABS (Scooter)', category: 'Scooter', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Ray ZR 125 Fi Hybrid (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Ray ZR Street Rally 125 (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Fascino 125 Fi Hybrid (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'NMax 155 (Maxi Scooter)', category: 'Scooter', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'XMax 250 (Maxi Scooter)', category: 'Scooter', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'MT-03 (321cc Twin Cylinder)', category: 'Naked', cc: 321, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: 'YZF-R3 (321cc Supersport)', category: 'Sport', cc: 321, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 }
  ],

  'Honda': [
    { name: 'CBR 150R Repsol Dual ABS (USD Forks)', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaCbr },
    { name: 'CBR 150R Dual Channel ABS (Indonesian)', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaCbr },
    { name: 'CBR 150R Tricolor ABS', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaCbr },
    { name: 'CBR 150R MotoGP Edition', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaCbr },
    { name: 'CBR 150R Thai Version', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaCbr },
    { name: 'CBR 250R Dual ABS', category: 'Sport', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaCbr },
    { name: 'CB150R Streetster ABS', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'CB150R ExMotion ABS', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'CB150R Streetfire Special Edition', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'CB Hornet 160R Dual Disc ABS', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
    { name: 'CB Hornet 160R CBS', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
    { name: 'CB Hornet 160R Single Disc', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
    { name: 'Hornet 2.0 (184cc Dual ABS)', category: 'Naked', cc: 184, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'X-Blade 160 Dual Disc ABS', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
    { name: 'X-Blade 160 Single Disc', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
    { name: 'CB Trigger 150 Dual Disc', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
    { name: 'CB Trigger 150 Single Disc', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
    { name: 'CB Unicorn 150', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterShine },
    { name: 'CB Unicorn 160', category: 'Commuter', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterShine },
    { name: 'CB150 Verza', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterShine },
    { name: 'SP 125 Fi Disc (eSP Technology)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterShine },
    { name: 'SP 125 Fi Drum', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterShine },
    { name: 'CB Shine 125 SP (5-Speed)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterShine },
    { name: 'CB Shine 125 Disc', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterShine },
    { name: 'CB Shine 125 Drum', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterShine },
    { name: 'Livo 110 Disc CBS', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterShine },
    { name: 'Livo 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterShine },
    { name: 'Dream 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'CD 80', category: 'Commuter', cc: 80, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Wave Alpha 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Dio 110 (H-Smart Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Dio 125 Fi (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Activa 125 Fi (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Activa 6G (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Beat 110 Fi (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Vario 160 ABS (Smart Key Scooter)', category: 'Scooter', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Vario 125 (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'ADV 160 (Adventure Scooter)', category: 'Scooter', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'PCX 160 (Luxury Scooter)', category: 'Scooter', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'CB 350 H\'ness (Retro Cruiser)', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'CB 350RS (Scrambler Cruiser)', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic }
  ],

  'Bajaj': [
    { name: 'Pulsar N160 Dual Channel ABS (USD Forks)', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar N160 Single ABS', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar N250 Dual ABS', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar F250 Dual ABS', category: 'Tourer', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar NS200 Fi Dual ABS', category: 'Naked', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar NS200 (Carburetor Twin Disc)', category: 'Naked', cc: 200, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar NS160 Fi ABS (Dual Disc)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar NS160 Fi ABS (Single Disc)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar NS160 Twin Disc (Carburetor)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar NS160 Single Disc', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar NS125', category: 'Naked', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar 150 Twin Disc (Dual Disc)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsar150 },
    { name: 'Pulsar 150 Single Disc (Classic)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsar150 },
    { name: 'Pulsar 150 Neon Edition', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsar150 },
    { name: 'Pulsar 150 Classic (Dtsi)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsar150 },
    { name: 'Pulsar 180 (UG4 / Dtsi)', category: 'Naked', cc: 180, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsar150 },
    { name: 'Pulsar 135 LS', category: 'Commuter', cc: 135, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsar150 },
    { name: 'Pulsar 220F (Semi-Faired)', category: 'Sport', cc: 220, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Discover 125 Disc (CBS Edition)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 125 Drum', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 110 Disc', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 135', category: 'Commuter', cc: 135, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Platina 110 H-Gear Disc', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Platina 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Platina 100 ES (Electric Start)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Platina 100 KS', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'CT 100 ES', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'CT 100 B', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Boxer 150', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Avenger 160 Street ABS', category: 'Cruiser', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajAvenger },
    { name: 'Avenger 150 Street', category: 'Cruiser', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajAvenger },
    { name: 'Dominar 400 Dual ABS', category: 'Tourer', cc: 373, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Dominar 250 Dual ABS', category: 'Tourer', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Chetak EV (Electric Scooter)', category: 'Scooter', cc: 100, fuelType: 'Electric', fuelSupply: 'Electric', image: BIKE_PICS.evGreen }
  ],

  'Suzuki': [
    { name: 'Gixxer SF Fi ABS (Special Edition)', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'Gixxer SF Fi Disc (New Shape)', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'Gixxer SF Fi MotoGP Edition', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'Gixxer SF Carburetor (New Shape)', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'Gixxer SF (Old Shape Double Disc)', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'Gixxer SF (Old Shape Single Disc)', category: 'Sport', cc: 155, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'Gixxer SF 250 Dual ABS', category: 'Sport', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'Gixxer 155 Fi ABS (New Naked)', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxer155 },
    { name: 'Gixxer 155 Carburetor Disc (New Naked)', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.suzukiGixxer155 },
    { name: 'Gixxer 155 (Old Shape Double Disc)', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.suzukiGixxer155 },
    { name: 'Gixxer 155 (Old Shape Single Disc)', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.suzukiGixxer155 },
    { name: 'Gixxer 250 Dual ABS (Naked)', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxer155 },
    { name: 'GSX-R 150 Dual ABS (Keyless / MotoGP)', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'GSX-R 150 Key Edition', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'GSX-S 150 (Streetfighter Naked)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxer155 },
    { name: 'GSX-150 Bandit (Dual Disc)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxer155 },
    { name: 'Burgman Street 125 Ride Connect (Bluetooth)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Burgman Street 125 Standard', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Access 125 Fi (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Avenis 125 (Sporty Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Let\'s 110 (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Hayate 110 EP', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Hayate 110 Special Edition', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Intruder 150 Fi ABS (Modern Cruiser)', category: 'Cruiser', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'Intruder 150 Carburetor', category: 'Cruiser', cc: 155, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.royalEnfieldClassic }
  ],

  'TVS': [
    { name: 'Apache RTR 160 4V Fi ABS (SmartXonnect TFT)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 160 4V Dual Disc (Carburetor)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 160 4V Single Disc (Carburetor)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 160 4V Special Edition (Bullpup Exhaust)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 200 4V Fi Dual Channel ABS', category: 'Naked', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 200 4V Carburetor', category: 'Naked', cc: 200, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 160 2V ABS (Single Disc)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RTR 160 2V Race Edition', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RTR 160 2V Glossy Edition', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RTR 160 2V Matte Edition', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RTR 150 (Old Shape)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RR 310 (Supersport)', category: 'Sport', cc: 312, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 },
    { name: 'Ronin 225 Dual Channel ABS (Retro Scrambler)', category: 'Cruiser', cc: 225, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Raider 125 (SmartXonnect TFT Edition)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache2V },
    { name: 'Raider 125 Standard Disc', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Stryker 125', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Metro Plus 110 Disc', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Metro Plus 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Metro 100 (Self Start)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Metro 100 (Kick Start)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Radeon 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Star City Plus 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'XL 100 Heavy Duty i-Touch', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Ntorq 125 Race XP (Fi Bluetooth)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Ntorq 125 Race Edition', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Jupiter 110 (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Wego 110 (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern }
  ],

  'Hero': [
    { name: 'Karizma XMR 210 Dual Channel ABS', category: 'Sport', cc: 210, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroKarizma },
    { name: 'Karizma ZMR 223 Fi', category: 'Sport', cc: 223, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroKarizma },
    { name: 'Karizma R 223', category: 'Sport', cc: 223, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroKarizma },
    { name: 'Thriller 160R 4V (Dual ABS)', category: 'Naked', cc: 163, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Thriller 160R Fi ABS (2V Double Disc)', category: 'Naked', cc: 163, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Thriller 160R Single Disc', category: 'Naked', cc: 163, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Hunk 150R Dual Disc ABS', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'Hunk 150 Double Disc (Matte / Glossy)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'Hunk 150 Single Disc (Classic)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'CBZ Xtreme 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'Xtreme Sports 150 Double Disc', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'Xpulse 200 4V (Adventure Tourer)', category: 'Tourer', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Xpulse 200T', category: 'Tourer', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Glamour 125 XTEC (Fi Bluetooth)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterSplendor },
    { name: 'Glamour 125 Disc (BS4 / Carb)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Glamour 125 Drum', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Ignitor 125 Fi (Techno Edition)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterSplendor },
    { name: 'Ignitor 125 Disc (Carburetor)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Passion XTEC 110 (Fi LED)', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterSplendor },
    { name: 'Passion Pro 110 i3S Disc', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Passion Pro 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Plus XTEC (Fi Bluetooth)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Plus Self Cast Wheel', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Plus IBS i3S', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Ismart 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Pro', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'HF Deluxe (Self Start Cast Wheel)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'HF Deluxe (Kick Start Spoke Wheel)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Dawn 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Maestro Edge 125 Fi (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Maestro Edge 110 (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Pleasure Plus 110 XTEC (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Destini 125 (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern }
  ],

  'Royal Enfield': [
    { name: 'Hunter 350 Rebel (Dual ABS)', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Hunter 350 Dapper', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Hunter 350 Retro', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Classic 350 Dark (Dual Channel ABS)', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'Classic 350 Signals Edition', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'Classic 350 Halcyon (Dual ABS)', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'Classic 350 Chrome Edition', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'Meteor 350 Supernova (Tourer Cruiser)', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldMeteor },
    { name: 'Meteor 350 Stellar', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldMeteor },
    { name: 'Meteor 350 Fireball', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldMeteor },
    { name: 'Bullet 350 Standard', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'Bullet 350 Black Gold', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic }
  ],

  'KTM': [
    { name: 'Duke 125 (European ABS)', category: 'Naked', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmDuke },
    { name: 'Duke 125 (Indian ABS)', category: 'Naked', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmDuke },
    { name: 'Duke 200 (BS6 Dual Channel ABS)', category: 'Naked', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmDuke },
    { name: 'Duke 250 Dual Channel ABS', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmDuke },
    { name: 'Duke 390 (Quickshifter+)', category: 'Naked', cc: 373, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmDuke },
    { name: 'RC 125 (New Shape GP)', category: 'Sport', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmRc },
    { name: 'RC 125 (Old Shape White/Orange)', category: 'Sport', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmRc },
    { name: 'RC 200 (New Shape GP Edition)', category: 'Sport', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmRc },
    { name: 'RC 200 (Old Shape Dual ABS)', category: 'Sport', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmRc },
    { name: 'RC 390 Dual Channel ABS', category: 'Sport', cc: 373, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmRc },
    { name: '250 Adventure', category: 'Tourer', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmDuke },
    { name: '390 Adventure', category: 'Tourer', cc: 373, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.ktmDuke }
  ],

  'Kawasaki': [
    { name: 'Ninja 125 ABS', category: 'Sport', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja },
    { name: 'Ninja 250SL', category: 'Sport', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja },
    { name: 'Ninja 300 Dual Channel ABS', category: 'Sport', cc: 296, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja },
    { name: 'Z125 Pro', category: 'Naked', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja },
    { name: 'Z250 Dual ABS', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja },
    { name: 'KLX 150 BF (Dual Sport Dirt)', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.kawasakiNinja },
    { name: 'D-Tracker 150 (Supermoto)', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.kawasakiNinja }
  ],

  'Lifan': [
    { name: 'KPR 165R Fi (CBS Edition)', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.lifanKpr },
    { name: 'KPR 165R Carburetor', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.lifanKpr },
    { name: 'KPR 150 Dual Disc', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.lifanKpr },
    { name: 'KP 165 4V (Naked Street)', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.lifanKpr },
    { name: 'KP 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.lifanKpr },
    { name: 'KPT 150 (Adventure Tourer)', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.lifanKpr },
    { name: 'K19 165 (Modern Cruiser)', category: 'Cruiser', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'KP Mini 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.lifanKpr }
  ],

  'GPX': [
    { name: 'Demon GR165RR (4V ABS)', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.gpxDemon },
    { name: 'Demon GR165R Fi (Double Disc)', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.gpxDemon },
    { name: 'Demon GR165R Carburetor', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.gpxDemon },
    { name: 'Demon 150 GR', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.gpxDemon },
    { name: 'Legend 150 Fi (Cafe Racer)', category: 'Cruiser', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Raptor 180', category: 'Naked', cc: 180, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.gpxDemon }
  ],

  'Runner': [
    { name: 'Bolt 165R Dual Disc', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs },
    { name: 'Knight 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs },
    { name: 'Turbo 125', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Bullet 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Cheetah 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Royal+ 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Kite Plus (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Skooty 110 (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern }
  ],

  'Benelli': [
    { name: 'TNT 150i (Inverted Forks)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.benelliTnt },
    { name: 'TNT 165S (Triple Spark Fi)', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.benelliTnt },
    { name: 'TNT 135', category: 'Naked', cc: 135, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.benelliTnt },
    { name: 'TRK 251 (Adventure Tourer)', category: 'Tourer', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.benelliTnt },
    { name: 'Leoncino 250 (Scrambler)', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.benelliTnt }
  ],

  'Keeway': [
    { name: 'RKR 165 (Racing Sport)', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.lifanKpr },
    { name: 'RKF 125', category: 'Naked', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'RKS 150 Sport', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs },
    { name: 'RKV 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs },
    { name: 'Superlight 150 (American Cruiser)', category: 'Cruiser', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.keewaySuperlight },
    { name: 'K-Light 202', category: 'Cruiser', cc: 200, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.keewaySuperlight }
  ],

  'Taro': [
    { name: 'GP 1 Special Edition (Dual Disc)', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.taroGp },
    { name: 'GP 2 (Racing Fairing)', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.taroGp },
    { name: 'Imola 150 (Sport Maxi Scooter)', category: 'Scooter', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern }
  ],

  'Haojue': [
    { name: 'DR 160 Fi (Dual Disc CBS)', category: 'Naked', cc: 162, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'TR 150S (Cruiser)', category: 'Cruiser', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajAvenger },
    { name: 'KA 135', category: 'Commuter', cc: 135, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'TZ 150', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Lind 125 (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Lucky 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard }
  ],

  'Aprilia': [
    { name: 'GPR 150 ABS (Super Sport)', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 },
    { name: 'Café 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: 'Tuono 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: 'FX 150', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'SR 150 Race (Italian Scooter)', category: 'Scooter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'SR 125 Storm (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'SXR 160 (Maxi Scooter)', category: 'Scooter', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'SXR 125 (Maxi Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern }
  ],

  'Vespa': [
    { name: 'Elegante 150 (Italian Luxury)', category: 'Scooter', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.vespaRetro },
    { name: 'Notte 125 (Matte Black)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.vespaRetro },
    { name: 'SXL 150 (Square Headlamp)', category: 'Scooter', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.vespaRetro },
    { name: 'VXL 150 (Classic Round Headlamp)', category: 'Scooter', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.vespaRetro },
    { name: 'Urban Club 125', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.vespaRetro },
    { name: 'Primavera 150', category: 'Scooter', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.vespaRetro }
  ],

  'Zontes': [
    { name: 'ZT155-U (Naked Street)', category: 'Naked', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.zontesStreet },
    { name: 'ZT155-G1 (Modern Scrambler)', category: 'Cruiser', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'ZT155-U1 (Dual Sport Adventure)', category: 'Tourer', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.zontesStreet },
    { name: '350T (Adventure Tourer Dual ABS)', category: 'Tourer', cc: 348, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.zontesStreet },
    { name: '350R (Naked Streetfighter)', category: 'Naked', cc: 348, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.zontesStreet }
  ],

  'CFMoto': [
    { name: '150NK (Naked Street)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: '250NK (Naked Street Dual ABS)', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: '250SR (Racing Sport Dual ABS)', category: 'Sport', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 },
    { name: '300SR (Racing Sport)', category: 'Sport', cc: 292, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 }
  ],

  'FKM': [
    { name: 'Street Fighter 165', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'Street Scrambler 165 SX', category: 'Cruiser', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter }
  ],

  'Italjet': [
    { name: 'Dragster 200 (Super Scooter)', category: 'Scooter', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern }
  ],

  'Roadmaster': [
    { name: 'Rapido 165 (Dual Disc)', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs },
    { name: 'Delight 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Velocity 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Prime 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard }
  ],

  'Speeder': [
    { name: 'Countryman 165 (Cafe Racer)', category: 'Cruiser', cc: 165, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'NSX 165R (Sport Fairing)', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.lifanKpr },
    { name: 'Big Daddy 150', category: 'Cruiser', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajAvenger }
  ],

  'Akij': [
    { name: 'Durbar (Electric Bike)', category: 'Commuter', cc: 100, fuelType: 'Electric', fuelSupply: 'Electric', image: BIKE_PICS.evGreen },
    { name: 'Samrat (Electric Bike)', category: 'Commuter', cc: 100, fuelType: 'Electric', fuelSupply: 'Electric', image: BIKE_PICS.evGreen },
    { name: 'Poni (Electric Scooter)', category: 'Scooter', cc: 80, fuelType: 'Electric', fuelSupply: 'Electric', image: BIKE_PICS.evGreen }
  ],

  'Green Tiger': [
    { name: 'GT-5 (Electric Scooter)', category: 'Scooter', cc: 100, fuelType: 'Electric', fuelSupply: 'Electric', image: BIKE_PICS.evGreen },
    { name: 'GT-Eagle (Electric Bike)', category: 'Commuter', cc: 100, fuelType: 'Electric', fuelSupply: 'Electric', image: BIKE_PICS.evGreen },
    { name: 'GT-Cyber (Electric Sport)', category: 'Sport', cc: 125, fuelType: 'Electric', fuelSupply: 'Electric', image: BIKE_PICS.evGreen }
  ],

  'Walton': [
    { name: 'Prizm 125', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Fusion 125', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Cruze 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard }
  ],

  'Other': [
    { name: 'Custom / Other Model', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs }
  ]
};
