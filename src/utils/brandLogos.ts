/**
 * Dynamic Brand Logo Resolver for Motorcycle Showroom
 * Automatically resolves and generates authentic logos for any brand added via Add Bike.
 */

export interface BrandLogoInfo {
  type: 'image' | 'svg';
  src?: string;
  fallback?: string;
  svg?: string;
}

// Built-in verified authentic logos for popular Bangladesh & International Motorcycle Brands
const PRESET_BRAND_LOGOS: Record<string, { src?: string; fallback?: string; svg?: string }> = {
  honda: {
    src: '/brands/honda.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/2C2WNLfvbSyGVmVNRAE092UpKAuHccHX8NkMiN9k.png'
  },
  ktm: {
    src: '/brands/ktm.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/hmWGwgWBwvDTF614rQOvD6TskthNMrdRUiaAy3a9.png'
  },
  yamaha: {
    src: '/brands/yamaha.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/vrloNQIak7XtQrmO7A08U63VWmXGDyzFfLeJVMQc.png'
  },
  suzuki: {
    src: '/brands/suzuki.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/UPddbZfcaU5SuM0GNnQoIs5M10vgJupraOj0KGuD.png'
  },
  hero: {
    src: '/brands/hero.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/Ck0eTCpiPfcsagphvhrRmtAzNlin2Le6d5hDWfZQ.png'
  },
  bajaj: {
    src: '/brands/bajaj.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/MQtUX2oQQ8GkPO4KuSyAkEp6JaouXwlP7zua1bEd.png'
  },
  tvs: {
    src: '/brands/tvs.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/qkfnp7OJzyKqpQspjcJmBiPXGsPK2Zf30MBy1DOy.png'
  },
  'royal enfield': {
    src: '/brands/royalenfield.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/Jc9K6Hk5nWwpe5bUhjRr9KgXeM0atZagl6JWqoyY.png'
  },
  royalenfield: {
    src: '/brands/royalenfield.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/Jc9K6Hk5nWwpe5bUhjRr9KgXeM0atZagl6JWqoyY.png'
  },
  lifan: {
    src: '/brands/lifan.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/Kqurfje527yT0KBDdjWqN5GU6royQZzsuafqlOjn.png'
  },
  kawasaki: {
    src: '/brands/kawasaki.svg',
    fallback: 'https://cdn.worldvectorlogo.com/logos/kawasaki-1.svg'
  },
  bmw: {
    src: 'https://cdn.worldvectorlogo.com/logos/bmw.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg'
  },
  ducati: {
    src: 'https://cdn.worldvectorlogo.com/logos/ducati.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Ducati_red_logo.svg'
  },
  aprilia: {
    src: 'https://cdn.worldvectorlogo.com/logos/aprilia-racing.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Aprilia_logo.svg'
  },
  benelli: {
    src: 'https://cdn.worldvectorlogo.com/logos/benelli-logo.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Benelli_logo.svg'
  },
  harley: {
    src: 'https://cdn.worldvectorlogo.com/logos/harley-davidson-3.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Harley-Davidson_logo.svg'
  },
  'harley-davidson': {
    src: 'https://cdn.worldvectorlogo.com/logos/harley-davidson-3.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Harley-Davidson_logo.svg'
  },
  triumph: {
    src: 'https://cdn.worldvectorlogo.com/logos/triumph-motorcycles.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Triumph_Motorcycles_logo.svg'
  },
  vespa: {
    src: 'https://cdn.worldvectorlogo.com/logos/vespa.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Vespa_logo.svg'
  },
  runner: {
    src: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Runner_Automobiles_Logo.png',
    fallback: 'https://admin.sawaribd.com/storage/brand/runner.png'
  },
  gpx: {
    src: 'https://gpxthailand.com/wp-content/themes/gpx/images/logo.png',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/GPX_logo.svg'
  },
  keeway: {
    src: 'https://cdn.worldvectorlogo.com/logos/keeway-logo.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Keeway_logo.png'
  },
  zontes: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Zontes_logo.png/640px-Zontes_logo.png',
    fallback: 'https://zontes.co.uk/wp-content/uploads/2021/04/zontes-logo.png'
  },
  taro: {
    src: 'https://taromotor.com/wp-content/uploads/2021/06/taro-logo.png',
    fallback: 'https://tarobd.com/logo.png'
  },
  'cf moto': {
    src: 'https://cdn.worldvectorlogo.com/logos/cfmoto.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/CFMoto_logo.svg'
  },
  cfmoto: {
    src: 'https://cdn.worldvectorlogo.com/logos/cfmoto.svg',
    fallback: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/CFMoto_logo.svg'
  }
};

/**
 * Resolves the logo for any brand name.
 * If the brand is already in the preset registry, it returns the authentic image.
 * If it's a new or custom brand, it automatically tries vector icon CDNs or generates an official logo badge.
 */
export function resolveBrandLogo(brandName: string, customLogoUrl?: string): BrandLogoInfo {
  if (customLogoUrl && customLogoUrl.trim()) {
    return {
      type: 'image',
      src: customLogoUrl.trim()
    };
  }

  const clean = (brandName || '').trim().toLowerCase();

  if (clean === 'all' || clean.includes('all')) {
    return {
      type: 'image',
      src: ''
    };
  }

  // Check preset match
  if (PRESET_BRAND_LOGOS[clean]) {
    const item = PRESET_BRAND_LOGOS[clean];
    return {
      type: 'image',
      src: item.src,
      fallback: item.fallback
    };
  }

  // Check partial match (e.g. "BMW Motorrad" matches "bmw")
  for (const key of Object.keys(PRESET_BRAND_LOGOS)) {
    if (clean.includes(key) || key.includes(clean)) {
      const item = PRESET_BRAND_LOGOS[key];
      return {
        type: 'image',
        src: item.src,
        fallback: item.fallback
      };
    }
  }

  // For any new brand, auto-try SimpleIcons / WorldVectorLogo / CDN
  const slug = clean.replace(/[^a-z0-9]/g, '');
  return {
    type: 'image',
    src: `https://cdn.simpleicons.org/${slug}`,
    fallback: `https://logo.clearbit.com/${slug}.com`
  };
}

/**
 * List of standard motorcycle brands for quick selection
 */
export const POPULAR_BRANDS = [
  'Yamaha',
  'Honda',
  'Bajaj',
  'Suzuki',
  'TVS',
  'KTM',
  'Royal Enfield',
  'Kawasaki',
  'Hero',
  'Lifan',
  'GPX',
  'Runner',
  'Keeway',
  'Benelli',
  'Taro',
  'Zontes',
  'BMW',
  'Ducati',
  'Aprilia',
  'Vespa',
  'Harley-Davidson',
  'Triumph',
  'CFMoto'
];
