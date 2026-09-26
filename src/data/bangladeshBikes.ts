export interface BDModelSpec {
  name: string;
  category: 'Sport' | 'Naked' | 'Scooter' | 'Cruiser' | 'Commuter' | 'Tourer';
  cc: number;
  fuelType: 'Petrol' | 'Electric' | 'Hybrid';
  fuelSupply: 'FI' | 'Carburetor' | 'Electric';
  brakingSystem?: string;
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
  'Jawa',
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

// High quality authentic motorcycle visuals matching models in BD (Real model-specific photos)
export const BIKE_PICS = {
  // Sports & Faired Racing (Real R15, CBR, Gixxer SF, KTM RC, Ninja, Apache RR)
  yamahaR15V4: '/bikes/yamaha-r15-v4.jpg',
  yamahaR15V3: '/bikes/yamaha-r15-v3.jpg',
  hondaCbr: '/bikes/honda-cbr.jpg',
  suzukiGixxerSf: '/bikes/suzuki-gixxer-sf.jpg',
  ktmRc: '/bikes/ktm-rc.jpg',
  kawasakiNinja: '/bikes/kawasaki-ninja.png',
  tvsApacheRr: '/bikes/tvs-apache-rr.jpg',
  lifanKpr: '/bikes/yamaha-r15-v3.jpg',
  gpxDemon: '/bikes/yamaha-r15-v4.jpg',
  heroKarizma: '/bikes/honda-cbr.jpg',
  taroGp: '/bikes/yamaha-r15-v4.jpg',
  cfMotoSr: '/bikes/yamaha-r15-v4.jpg',

  // Naked Streetfighters & Sport Commuters (Real MT-15, FZ, Pulsar NS, Apache 4V, etc.)
  yamahaMt15: '/bikes/yamaha-mt15.jpg',
  yamahaFzs: '/bikes/yamaha-fzs.jpg',
  yamahaFz16: '/bikes/yamaha-fz16.jpg',
  yamahaFzx: '/bikes/yamaha-fz16.jpg',
  bajajPulsarNs: '/bikes/bajaj-pulsar-ns.jpg',
  bajajPulsarN160: '/bikes/bajaj-pulsar-ns.jpg',
  bajajPulsar150: '/bikes/bajaj-pulsar-150.jpg',
  tvsApache4V: '/bikes/tvs-apache-4v.png',
  tvsApache2V: '/bikes/tvs-apache-2v.jpg',
  tvsRaider: '/bikes/tvs-apache-4v.png',
  hondaHornet: '/bikes/yamaha-fzs.jpg',
  hondaXBlade: '/bikes/yamaha-fzs.jpg',
  suzukiGixxer155: '/bikes/suzuki-gixxer-155.jpg',
  ktmDuke: '/bikes/ktm-duke.jpg',
  heroThriller: '/bikes/hero-passion.jpg',
  heroHunk: '/bikes/hero-passion.jpg',
  heroXtreme: '/bikes/hero-passion.jpg',
  zontesStreet: '/bikes/yamaha-mt15.jpg',
  benelliTnt: '/bikes/yamaha-mt15.jpg',

  // Cruisers & Retros
  royalEnfieldHunter: '/bikes/royal-enfield-classic.jpg',
  royalEnfieldClassic: '/bikes/royal-enfield-classic.jpg',
  royalEnfieldBullet: '/bikes/royal-enfield-bullet.jpg',
  royalEnfieldMeteor: '/bikes/royal-enfield-classic.jpg',
  bajajAvenger: '/bikes/bajaj-avenger.jpg',
  keewaySuperlight: '/bikes/royal-enfield-classic.jpg',
  jawaClassic: '/bikes/royal-enfield-classic.jpg',

  // Commuters (Shine, Discover, Splendor, Passion, Platina, etc.)
  commuterStandard: '/bikes/hero-splendor.jpg',
  commuterShine: '/bikes/hero-passion.jpg',
  commuterSplendor: '/bikes/hero-splendor.jpg',
  commuterPassion: '/bikes/hero-passion.jpg',
  commuterDiscover: '/bikes/bajaj-discover.jpg',

  // Scooters & Maxi Scooters (Ntorq, Activa, Access, Dio, etc.)
  scooterModern: '/bikes/tvs-ntorq.jpg',
  tvsNtorq: '/bikes/tvs-ntorq.jpg',
  scooterActiva: '/bikes/honda-activa.jpg',
  scooterAccess: '/bikes/suzuki-access.jpg',
  vespaRetro: '/bikes/suzuki-access.jpg',

  // Adventure & Tourers
  adventureTourer: '/bikes/tvs-apache-rr.jpg',

  // Electric Bikes & Scooters
  evGreen: '/bikes/tvs-ntorq.jpg'
};

// Rich BD Model Database with Auto-Fill properties:
// - cc (Engine Displacement)
// - category (Classification)
// - fuelType (Petrol / Electric)
// - fuelSupply (FI / Carburetor / Electric)
// - image (Default high resolution bike photograph)
export const BD_MODEL_DATABASE: Record<string, BDModelSpec[]> = {
  'Yamaha': [
    { name: 'FZ-S V4 Deluxe Fi ABS (TCS Edition)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V4 Standard Fi', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V3 Dual ABS', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V3 Deluxe (Golden Wheels)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V3 Vintage Edition', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V3 Standard (Single ABS)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V2 Dual Disc Fi', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ-S V2 Single Disc (Carburetor)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ V3 Fi', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ V2 Fi', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFzs },
    { name: 'FZ 16 (Classic Carburetor)', category: 'Naked', cc: 153, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFz16 },
    { name: 'FZ-X 150 Fi ABS', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFz16 },
    { name: 'Fazer V2 Fi (Semi-Faired)', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaFz16 },
    { name: 'Fazer V1 (150cc Carb)', category: 'Tourer', cc: 153, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.yamahaFz16 },
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
    { name: 'YZF-R3 (321cc Supersport)', category: 'Sport', cc: 321, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 },
    { name: 'Tenere 700 (Adventure)', category: 'Tourer', cc: 689, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 }
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
    { name: 'Hornet 2.0 (184cc Dual ABS)', category: 'Naked', cc: 184, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'CB200X (Urban Explorer Tourer)', category: 'Tourer', cc: 184, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'CB300F (Streetfighter Dual ABS)', category: 'Naked', cc: 293, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'CB300R Neo Sports Cafe', category: 'Naked', cc: 286, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'SP 160 Dual Disc ABS (eSP Engine)', category: 'Naked', cc: 162, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'SP 160 Single Disc', category: 'Naked', cc: 162, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.hondaHornet },
    { name: 'CB Hornet 160R Dual Disc ABS', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
    { name: 'CB Hornet 160R CBS', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
    { name: 'CB Hornet 160R Single Disc', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.hondaHornet },
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
    { name: 'Shine 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterStandard },
    { name: 'Livo 110 Disc CBS', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterShine },
    { name: 'Livo 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterShine },
    { name: 'Dream 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'CD 80', category: 'Commuter', cc: 80, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Wave Alpha 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Dio 125 Fi (H-Smart Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Dio 110 (H-Smart Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Activa 125 Fi (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Activa 6G (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Beat 110 Fi (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Scoopy 110 (Retro Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Click 125 (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Click 160 ABS (Scooter)', category: 'Scooter', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Vario 160 ABS (Smart Key Scooter)', category: 'Scooter', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Vario 125 (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'ADV 160 (Adventure Scooter)', category: 'Scooter', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'PCX 160 (Luxury Scooter)', category: 'Scooter', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'CB 350 H\'ness (Retro Cruiser)', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'CB 350RS (Scrambler Cruiser)', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic }
  ],

  'Bajaj': [
    { name: 'Pulsar N160 Dual Channel ABS (USD Forks)', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarN160 },
    { name: 'Pulsar N160 Single ABS', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarN160 },
    { name: 'Pulsar N250 Dual ABS', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar F250 Dual ABS', category: 'Tourer', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar N150 Single ABS', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarN160 },
    { name: 'Pulsar P150 Dual Disc ABS', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarN160 },
    { name: 'Pulsar NS400Z Dual ABS', category: 'Naked', cc: 373, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar NS200 Fi Dual ABS (USD Forks)', category: 'Naked', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
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
    { name: 'Pulsar 180F (Neon Edition)', category: 'Naked', cc: 180, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsar150 },
    { name: 'Pulsar 135 LS', category: 'Commuter', cc: 135, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsar150 },
    { name: 'Pulsar 220F (Semi-Faired)', category: 'Sport', cc: 220, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar AS 150', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Pulsar AS 200', category: 'Tourer', cc: 200, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajPulsarNs },
    { name: 'Discover 125 Disc (CBS Edition)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 125 Drum', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 125 ST', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 110 Disc', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 100M', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 100T', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 135', category: 'Commuter', cc: 135, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Discover 150', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterDiscover },
    { name: 'Platina 110 ABS', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Platina 110 H-Gear Disc', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Platina 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Platina 100 ES (Electric Start)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Platina 100 KS', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Platina 125', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'CT 110X (Rugged Edition)', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'CT 100 ES', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'CT 100 B', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Boxer 150', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Avenger 160 Street ABS', category: 'Cruiser', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajAvenger },
    { name: 'Avenger 220 Cruise', category: 'Cruiser', cc: 220, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajAvenger },
    { name: 'Avenger 150 Street', category: 'Cruiser', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.bajajAvenger },
    { name: 'Dominar 400 UG Dual ABS (USD Forks)', category: 'Tourer', cc: 373, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.bajajPulsarNs },
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
    { name: 'V-Strom SX 250 (Adventure Tourer)', category: 'Tourer', cc: 249, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.suzukiGixxerSf },
    { name: 'Burgman Street 125 Ride Connect (Bluetooth)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Burgman Street 125 Standard', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Burgman Street EX (12-inch Rear Wheel)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Access 125 Fi (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Avenis 125 (Sporty Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Let\'s 110 (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Hayate 110 EP', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Hayate 110 Special Edition', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'GS 150R (6-Speed)', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Intruder 150 Fi ABS (Modern Cruiser)', category: 'Cruiser', cc: 155, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'Intruder 150 Carburetor', category: 'Cruiser', cc: 155, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.royalEnfieldClassic }
  ],

  'TVS': [
    { name: 'Apache RTR 160 4V Fi ABS (SmartXonnect TFT / Riding Modes)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 160 4V Special Edition (Bullpup Exhaust)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 160 4V Dual Disc (Carburetor)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 160 4V Single Disc (Carburetor)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 200 4V Fi Dual Channel ABS (Riding Modes)', category: 'Naked', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 200 4V Carburetor', category: 'Naked', cc: 200, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache4V },
    { name: 'Apache RTR 160 2V ABS (Single Disc)', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RTR 160 2V Race Edition', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RTR 160 2V Glossy Edition', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RTR 160 2V Matte Edition', category: 'Naked', cc: 160, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RTR 180 2V ABS', category: 'Naked', cc: 177, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RTR 150 (Old Shape)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache2V },
    { name: 'Apache RR 310 (Supersport Fi)', category: 'Sport', cc: 312, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApacheRr },
    { name: 'Apache RTR 310 (Street Naked Fi)', category: 'Naked', cc: 312, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache4V },
    { name: 'Ronin 225 Dual Channel ABS (Retro Scrambler)', category: 'Cruiser', cc: 225, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Ronin 225 Single Channel ABS', category: 'Cruiser', cc: 225, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Raider 125 (SmartXonnect TFT Edition)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache4V },
    { name: 'Raider 125 Super Squad Edition', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsApache4V },
    { name: 'Raider 125 Standard Disc', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsApache4V },
    { name: 'Stryker 125', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Metro Plus 110 Disc', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Metro Plus 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Metro 100 (Self Start)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Metro 100 (Kick Start)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Radeon 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Star City Plus 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'XL 100 Heavy Duty i-Touch', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'XL 100 Winner Edition', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Max 125', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Ntorq 125 Race XP (Fi Bluetooth)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsNtorq },
    { name: 'Ntorq 125 Race Edition', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsNtorq },
    { name: 'Ntorq 125 Super Squad', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsNtorq },
    { name: 'Jupiter 125 (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.tvsNtorq },
    { name: 'Jupiter 110 (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsNtorq },
    { name: 'Wego 110 (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.tvsNtorq },
    { name: 'iQube EV (Electric Scooter)', category: 'Scooter', cc: 100, fuelType: 'Electric', fuelSupply: 'Electric', image: BIKE_PICS.tvsNtorq }
  ],

  'Hero': [
    { name: 'Karizma XMR 210 Dual Channel ABS', category: 'Sport', cc: 210, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroKarizma },
    { name: 'Karizma ZMR 223 Fi', category: 'Sport', cc: 223, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroKarizma },
    { name: 'Karizma R 223', category: 'Sport', cc: 223, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroKarizma },
    { name: 'Thriller 160R 4V (Dual ABS)', category: 'Naked', cc: 163, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Thriller 160R Fi ABS (2V Double Disc)', category: 'Naked', cc: 163, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Thriller 160R Single Disc', category: 'Naked', cc: 163, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Xtreme 125R (Sprint-EBT ABS)', category: 'Naked', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroXtreme },
    { name: 'Xtreme 160R Stealth Edition', category: 'Naked', cc: 163, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Xtreme 200S 4V (Faired Sport)', category: 'Sport', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroKarizma },
    { name: 'Xtreme 200R Dual Disc', category: 'Naked', cc: 200, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'Hunk 150R Dual Disc ABS', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'Hunk 150 Double Disc (Matte / Glossy)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'Hunk 150 Single Disc (Classic)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'CBZ Xtreme 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'CBZ 150 Classic', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'Xtreme Sports 150 Double Disc', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.heroHunk },
    { name: 'Xpulse 200 4V (Adventure Tourer)', category: 'Tourer', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Xpulse 200T 4V (Tourer)', category: 'Tourer', cc: 200, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.heroThriller },
    { name: 'Glamour 125 XTEC (Fi Bluetooth)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterSplendor },
    { name: 'Glamour 125 Disc (BS4 / Carb)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Glamour 125 Drum', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Super Splendor 125', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Ignitor 125 Fi (Techno Edition)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterSplendor },
    { name: 'Ignitor 125 Disc (Carburetor)', category: 'Commuter', cc: 125, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Passion XTEC 110 (Fi LED)', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterSplendor },
    { name: 'Passion Pro 110 i3S Disc', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Passion Pro 110 Drum', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Passion Plus 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Plus XTEC (Fi Bluetooth)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Plus Self Cast Wheel', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Plus IBS i3S', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Ismart 110', category: 'Commuter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Splendor Pro', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'HF Deluxe (Self Start Cast Wheel)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'HF Deluxe (Kick Start Spoke Wheel)', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'HF 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterSplendor },
    { name: 'Dawn 100', category: 'Commuter', cc: 100, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard },
    { name: 'Xoom 110 (Sporty Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Maestro Edge 125 Fi (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Maestro Edge 110 (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.scooterModern },
    { name: 'Pleasure Plus 110 XTEC (Scooter)', category: 'Scooter', cc: 110, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern },
    { name: 'Destini 125 XTEC (Scooter)', category: 'Scooter', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern }
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
    { name: 'Bullet 350 Black Gold', category: 'Cruiser', cc: 350, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'Himalayan 450 (Adventure Tourer)', category: 'Tourer', cc: 452, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldMeteor },
    { name: 'Guerrilla 450 (Roadster Dual ABS)', category: 'Naked', cc: 452, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Continental GT 650 (Cafe Racer)', category: 'Sport', cc: 648, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Interceptor 650 (Twin Cylinder Cruiser)', category: 'Cruiser', cc: 648, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldClassic }
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
    { name: 'Ninja 400 Dual ABS', category: 'Sport', cc: 399, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja },
    { name: 'Z125 Pro', category: 'Naked', cc: 125, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja },
    { name: 'Z250 Dual ABS', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja },
    { name: 'Z400 Dual ABS', category: 'Naked', cc: 399, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja },
    { name: 'KLX 150 BF (Dual Sport Dirt)', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.kawasakiNinja },
    { name: 'D-Tracker 150 (Supermoto)', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.kawasakiNinja },
    { name: 'W175 (Retro Classic)', category: 'Cruiser', cc: 177, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.royalEnfieldClassic },
    { name: 'Versys-X 250 (Adventure Tourer)', category: 'Tourer', cc: 249, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.kawasakiNinja }
  ],

  'Lifan': [
    { name: 'KPR 165R Fi (CBS Edition)', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.lifanKpr },
    { name: 'KPR 165R Carburetor', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.lifanKpr },
    { name: 'KPR 150 Dual Disc', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.lifanKpr },
    { name: 'KP 165 4V (Naked Street)', category: 'Naked', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.lifanKpr },
    { name: 'KP 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.lifanKpr },
    { name: 'KPT 150 (Adventure Tourer)', category: 'Tourer', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.lifanKpr },
    { name: 'KPT 200 (Adventure Tourer)', category: 'Tourer', cc: 198, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.lifanKpr },
    { name: 'K19 165 (Modern Cruiser)', category: 'Cruiser', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'KP Mini 150', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.lifanKpr },
    { name: 'LF150-10B', category: 'Commuter', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.commuterStandard }
  ],

  'GPX': [
    { name: 'Demon GR165RR (4V ABS)', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.gpxDemon },
    { name: 'Demon GR165R Fi (Double Disc)', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.gpxDemon },
    { name: 'Demon GR165R Carburetor', category: 'Sport', cc: 165, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.gpxDemon },
    { name: 'Demon 150 GR', category: 'Sport', cc: 150, fuelType: 'Petrol', fuelSupply: 'Carburetor', image: BIKE_PICS.gpxDemon },
    { name: 'Legend 150 Fi (Cafe Racer)', category: 'Cruiser', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Legend 250 Twin (Retro Cafe)', category: 'Cruiser', cc: 234, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.royalEnfieldHunter },
    { name: 'Raptor 180', category: 'Naked', cc: 180, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.gpxDemon }
  ],

  'Jawa': [
    { name: 'Jawa 42 2.1 (Dual Channel ABS)', category: 'Cruiser', cc: 293, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.jawaClassic },
    { name: 'Jawa Classic 300 (Chrome Retro)', category: 'Cruiser', cc: 293, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.jawaClassic },
    { name: 'Jawa Perak (Bobber Special)', category: 'Cruiser', cc: 334, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.jawaClassic },
    { name: 'Yezdi Roadster (Dual ABS)', category: 'Cruiser', cc: 334, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.jawaClassic },
    { name: 'Yezdi Scrambler', category: 'Naked', cc: 334, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.jawaClassic },
    { name: 'Yezdi Adventure', category: 'Tourer', cc: 334, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.jawaClassic }
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
    { name: 'Leoncino 250 (Scrambler)', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.benelliTnt },
    { name: '302R (Supersport Dual ABS)', category: 'Sport', cc: 300, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaR15V4 }
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
    { name: '350R (Naked Streetfighter)', category: 'Naked', cc: 348, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.zontesStreet },
    { name: '350E (Luxury Maxi Scooter)', category: 'Scooter', cc: 349, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.scooterModern }
  ],

  'CFMoto': [
    { name: '150NK (Naked Street)', category: 'Naked', cc: 150, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: '250NK (Naked Street Dual ABS)', category: 'Naked', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 },
    { name: '250SR (Racing Sport Dual ABS)', category: 'Sport', cc: 250, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.cfMotoSr },
    { name: '300SR (Racing Sport)', category: 'Sport', cc: 292, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.cfMotoSr },
    { name: '450SR (Twin Cylinder Supersport)', category: 'Sport', cc: 450, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.cfMotoSr },
    { name: '450NK (Naked Street Twin)', category: 'Naked', cc: 450, fuelType: 'Petrol', fuelSupply: 'FI', image: BIKE_PICS.yamahaMt15 }
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

// Helper function to find a model's specification
export function findModelSpec(brand: string, modelName: string): BDModelSpec | undefined {
  if (!brand || !modelName) return undefined;
  const brandModels = BD_MODEL_DATABASE[brand];
  if (!brandModels) return undefined;
  return brandModels.find((m) => m.name.toLowerCase() === modelName.toLowerCase()) 
    || brandModels.find((m) => m.name.toLowerCase().includes(modelName.toLowerCase()))
    || brandModels.find((m) => modelName.toLowerCase().includes(m.name.toLowerCase()));
}

// Helper to get matching image for any brand and model (with intelligent keyword detection)
export function getModelDefaultImage(brand: string, modelName: string): string {
  const match = findModelSpec(brand, modelName);
  if (match && match.image) return match.image;

  const m = (modelName || '').toLowerCase();
  const b = (brand || '').toLowerCase();

  // Yamaha models
  if (m.includes('r15m') || m.includes('r15 v4') || m.includes('r15-v4') || m.includes('v4')) return BIKE_PICS.yamahaR15V4;
  if (m.includes('r15 v3') || m.includes('r15s') || m.includes('r15 v2') || m.includes('r15 v1') || m.includes('r15')) return BIKE_PICS.yamahaR15V3;
  if (m.includes('mt-15') || m.includes('mt15') || m.includes('xsr')) return BIKE_PICS.yamahaMt15;
  if (m.includes('fz-x') || m.includes('fzx') || m.includes('fazer') || m.includes('fz 16') || m.includes('fz16')) return BIKE_PICS.yamahaFz16;
  if (m.includes('fz-s') || m.includes('fzs') || m.includes('fz')) return BIKE_PICS.yamahaFzs;

  // Bajaj models
  if (m.includes('avenger')) return BIKE_PICS.bajajAvenger;
  if (m.includes('discover')) return BIKE_PICS.commuterDiscover;
  if (m.includes('ns') || m.includes('n160') || m.includes('n250') || m.includes('n150') || m.includes('p150')) return BIKE_PICS.bajajPulsarNs;
  if (m.includes('pulsar')) return BIKE_PICS.bajajPulsar150;

  // TVS models
  if (m.includes('rr 310') || m.includes('rr310')) return BIKE_PICS.tvsApacheRr;
  if (m.includes('4v') || m.includes('raider')) return BIKE_PICS.tvsApache4V;
  if (m.includes('2v') || m.includes('apache')) return BIKE_PICS.tvsApache2V;
  if (m.includes('ntorq') || m.includes('jupiter') || m.includes('wego') || m.includes('iqube')) return BIKE_PICS.tvsNtorq;

  // Suzuki models
  if (m.includes('sf') || m.includes('gsx-r')) return BIKE_PICS.suzukiGixxerSf;
  if (m.includes('gixxer') || m.includes('bandit') || m.includes('gsx')) return BIKE_PICS.suzukiGixxer155;
  if (m.includes('access') || m.includes('burgman') || m.includes('avenis')) return BIKE_PICS.scooterAccess;

  // Royal Enfield models
  if (m.includes('bullet')) return BIKE_PICS.royalEnfieldBullet;
  if (b.includes('royal enfield') || m.includes('classic') || m.includes('hunter') || m.includes('meteor') || m.includes('himalayan')) return BIKE_PICS.royalEnfieldClassic;

  // Honda models
  if (m.includes('cbr')) return BIKE_PICS.hondaCbr;
  if (m.includes('activa') || m.includes('dio') || m.includes('beat') || m.includes('scoopy')) return BIKE_PICS.scooterActiva;
  if (m.includes('shine') || m.includes('sp 125') || m.includes('sp125') || m.includes('livo')) return BIKE_PICS.commuterShine;

  // Hero models
  if (m.includes('splendor') || m.includes('hf deluxe')) return BIKE_PICS.commuterSplendor;
  if (m.includes('passion') || m.includes('glamour') || m.includes('thriller') || m.includes('hunk') || m.includes('xtreme')) return BIKE_PICS.commuterPassion;

  // KTM & Kawasaki
  if (m.includes('rc')) return BIKE_PICS.ktmRc;
  if (m.includes('duke')) return BIKE_PICS.ktmDuke;
  if (m.includes('ninja') || b.includes('kawasaki')) return BIKE_PICS.kawasakiNinja;

  // Brand fallbacks
  if (brand === 'Yamaha') return BIKE_PICS.yamahaFzs;
  if (brand === 'Honda') return BIKE_PICS.hondaCbr;
  if (brand === 'Bajaj') return BIKE_PICS.bajajPulsarNs;
  if (brand === 'Suzuki') return BIKE_PICS.suzukiGixxerSf;
  if (brand === 'TVS') return BIKE_PICS.tvsApache4V;
  if (brand === 'Hero') return BIKE_PICS.commuterSplendor;
  if (brand === 'Royal Enfield') return BIKE_PICS.royalEnfieldClassic;
  if (brand === 'KTM') return BIKE_PICS.ktmRc;
  return BIKE_PICS.yamahaFzs;
}

// Available Braking Systems in Bangladesh
export const BD_BRAKING_SYSTEMS = [
  'Dual Channel ABS',
  'Single Channel ABS',
  'CBS',
  'Dual Disc',
  'Front Disc / Rear Drum',
  'Drum Brakes'
] as const;

export type BDBrakingSystem = typeof BD_BRAKING_SYSTEMS[number];

// Helper to intelligently detect braking system from brand, model name, and engine cc
export function getModelDefaultBrakingSystem(brand: string, modelName: string, cc?: number): string {
  const m = (modelName || '').toLowerCase().trim();
  const b = (brand || '').toLowerCase().trim();

  // 1. Dual Channel ABS Models
  if (
    m.includes('dual abs') || 
    m.includes('dual channel') || 
    m.includes('dual-channel') || 
    m.includes('r15m') || 
    m.includes('r15 v4') || 
    m.includes('mt-15 v2') || 
    m.includes('n160 dual') || 
    (m.includes('n160') && !m.includes('single')) ||
    m.includes('n250') || 
    m.includes('f250') || 
    m.includes('ns400') || 
    m.includes('rr 310') || 
    m.includes('rr310') || 
    m.includes('rtr 310') || 
    m.includes('classic 350') || 
    m.includes('bullet 350') || 
    m.includes('hunter 350') || 
    m.includes('meteor 350') || 
    m.includes('himalayan') || 
    m.includes('duke 200') || 
    m.includes('duke 250') || 
    m.includes('duke 390') || 
    m.includes('rc 200') || 
    m.includes('rc 390') || 
    m.includes('dominar 400') || 
    m.includes('dominar 250') || 
    m.includes('rtr 200 4v dual') ||
    m.includes('karizma xmr') ||
    m.includes('thriller 160r 4v dual') ||
    m.includes('speed 400') ||
    m.includes('scrambler 400') ||
    m.includes('cbr 150r dual') ||
    m.includes('cbr 150r repsol') ||
    m.includes('cbr 250r') ||
    m.includes('hornet 2.0') ||
    m.includes('cb300') ||
    m.includes('cb150r') ||
    m.includes('ninja 125') ||
    m.includes('ninja 400') ||
    m.includes('nmax 155') ||
    m.includes('xmax') ||
    m.includes('mt-03') ||
    m.includes('r3') ||
    m.includes('aerox 155') ||
    (m.includes('r15 v3') && (m.includes('indian') || m.includes('dual') || m.includes('motogp') || m.includes('uniball') || m.includes('r15s')))
  ) {
    return 'Dual Channel ABS';
  }

  // 2. Non-ABS Dual Disc Models (Both front & rear disc without ABS)
  if (
    m.includes('v2 dual disc') || 
    m.includes('150 twin disc') && !m.includes('abs') ||
    m.includes('r15 v2') ||
    (m.includes('r15 v3') && m.includes('indonesian')) ||
    (m.includes('mt-15') && m.includes('indonesian')) ||
    m.includes('rtr 160 4v dual disc') ||
    m.includes('rtr 160 2v dual disc') ||
    m.includes('gixxer dual disc') ||
    m.includes('cb trigger 150 dual disc') ||
    m.includes('hunk 150 dual disc') ||
    m.includes('xtreme 160r dual disc') ||
    m.includes('pulsar 180') ||
    m.includes('pulsar 220') ||
    (m.includes('dual disc') && !m.includes('abs')) ||
    (m.includes('twin disc') && !m.includes('abs')) ||
    (m.includes('double disc') && !m.includes('abs'))
  ) {
    return 'Dual Disc';
  }

  // 3. Single Channel ABS Models (Front wheel ABS + Rear Disc/Drum)
  if (
    m.includes('single abs') || 
    m.includes('single channel') || 
    m.includes('single-channel') || 
    m.includes('fi abs') || 
    m.includes('tcs') || 
    m.includes('fz-s v4') || 
    m.includes('fzs v4') || 
    m.includes('fz-s v3') || 
    m.includes('fzs v3') || 
    m.includes('fz v3') || 
    m.includes('fz-x') || 
    m.includes('fzx') || 
    (m.includes('mt-15') && !m.includes('dual') && !m.includes('indonesian')) || 
    m.includes('xsr 155') ||
    m.includes('gixxer sf') || 
    (m.includes('gixxer') && (m.includes('fi') || m.includes('abs') || m.includes('monotone'))) || 
    m.includes('gsx-r') ||
    m.includes('gsx-s') ||
    m.includes('apache rtr 160 4v fi') || 
    m.includes('apache rtr 160 4v abs') || 
    m.includes('apache rtr 200 4v single') || 
    m.includes('pulsar n160 single') ||
    m.includes('pulsar n150') || 
    m.includes('pulsar 150 twin disc fi abs') || 
    m.includes('ns160') || 
    m.includes('ns200') || 
    m.includes('sp 160') || 
    m.includes('x-blade 160') || 
    m.includes('xblade') || 
    m.includes('hornet 160r abs') ||
    m.includes('thriller 160r') || 
    m.includes('xtreme 160r') || 
    m.includes('xtreme 200') || 
    m.includes('xpulse 200') || 
    m.includes('ronin') || 
    m.includes('avenger 160') || 
    m.includes('kpr 165 fi') || 
    m.includes('kpr 165') || 
    m.includes('gr165r') || 
    m.includes('abs')
  ) {
    return 'Single Channel ABS';
  }

  // 4. Combi Brake System (CBS) / UBS / SBT / IBS (Common on scooters & select 110-125cc bikes)
  if (
    m.includes('cbs') || 
    m.includes('combi') || 
    m.includes('ubs') || 
    m.includes('sbt') || 
    m.includes('ibs') || 
    m.includes('sync') || 
    m.includes('raider 125') || 
    m.includes('raider') || 
    m.includes('sp 125') || 
    m.includes('sp125') || 
    (m.includes('shine 125') && m.includes('disc')) || 
    (m.includes('livo') && m.includes('disc')) || 
    (m.includes('discover 125') && m.includes('cbs')) || 
    m.includes('ntorq') || 
    m.includes('activa') || 
    m.includes('access') || 
    m.includes('dio') || 
    m.includes('ray zr') || 
    m.includes('fascino') || 
    m.includes('jupiter') || 
    m.includes('burgman') || 
    m.includes('avenis') || 
    m.includes('glamour xtec') || 
    m.includes('passion xtec') ||
    m.includes('maestro') ||
    m.includes('pleasure') ||
    m.includes('radeon')
  ) {
    return 'CBS';
  }

  // 5. Pure Drum Brakes (Standard 100-110cc commuter and retro utility bikes)
  if (
    m.includes('drum') ||
    m.includes('cd 80') || 
    m.includes('cd 100') || 
    m.includes('dream 110') || 
    m.includes('crux') || 
    m.includes('hf deluxe') || 
    m.includes('splendor plus') || 
    m.includes('splendor+ ') || 
    m.includes('splendor ismart') || 
    m.includes('discover 100') || 
    m.includes('discover 110') || 
    m.includes('ct 100') || 
    m.includes('ct100') || 
    m.includes('platina 100') || 
    m.includes('platina 110 drum') || 
    m.includes('platina es') || 
    m.includes('metro 100') || 
    m.includes('metro plus drum') || 
    m.includes('hayate') || 
    m.includes('shine 100') || 
    m.includes('saluto 125 drum') || 
    m.includes('saluto 110') || 
    m.includes('xl 100') || 
    (cc && cc <= 110 && !m.includes('disc'))
  ) {
    return 'Drum Brakes';
  }

  // 6. Front Disc / Rear Drum (Traditional 125-150cc commuter standard)
  if (
    m.includes('disc') || 
    m.includes('single disc') || 
    m.includes('ug4') || 
    m.includes('pulsar 150 single') || 
    m.includes('pulsar 150 neon') || 
    m.includes('fz-s v2 single') || 
    m.includes('fz 16') || 
    m.includes('fazer') || 
    m.includes('apache rtr 160 2v single') || 
    m.includes('hunk 150 single') || 
    m.includes('stryker') || 
    m.includes('glamour 125 disc') || 
    m.includes('passion pro disc') || 
    m.includes('discover 125 disc') || 
    (cc && cc >= 125 && cc < 150)
  ) {
    return 'Front Disc / Rear Drum';
  }

  // If cc >= 150, standard BD default is Single Channel ABS
  if (cc && cc >= 150) {
    return 'Single Channel ABS';
  }

  // Commuter fallback
  return cc && cc > 110 ? 'Front Disc / Rear Drum' : 'Drum Brakes';
}

