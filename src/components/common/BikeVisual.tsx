import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Bike } from '../../types/bike';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

interface BikeVisualProps {
  bike: Bike;
  className?: string;
  aspect?: '4/3' | '16/9' | 'auto';
  showDetails?: boolean;
  activeImageIndex?: number;
  customImageUrl?: string;
  onSlideChange?: (index: number) => void;
  autoPlay?: boolean;
  slideOnHoverOnly?: boolean;
}

const PRESET_BIKE_PHOTOS: Record<string, string> = {
  // Yamaha
  'yamaha-r15-1': '/bikes/yamaha-r15-v4.jpg',
  'yamaha-r15-2': '/bikes/yamaha-r15-v3.jpg',
  'yamaha-r15-3': '/bikes/yamaha-r15-v4.jpg',
  'yamaha-r15-4': '/bikes/yamaha-r15-v3.jpg',
  'yamaha-mt-1': '/bikes/yamaha-mt15.jpg',
  'yamaha-mt-2': '/bikes/yamaha-fzs.jpg',
  'yamaha-mt-3': '/bikes/yamaha-mt15.jpg',
  'mt15-1': '/bikes/yamaha-mt15.jpg',
  'fzs-1': '/bikes/yamaha-fzs.jpg',

  // Honda
  'honda-cbr-1': '/bikes/honda-cbr.jpg',
  'honda-cbr-2': '/bikes/honda-cbr150r.jpg',
  'honda-cbr-3': '/bikes/honda-cbr.jpg',
  'honda-cbr-4': '/bikes/honda-cbr150r.jpg',
  'honda-hornet-1': '/bikes/honda-cbr150r.jpg',
  'honda-hornet-2': '/bikes/honda-cbr.jpg',

  // Royal Enfield
  'enfield-classic-1': '/bikes/royal-enfield-classic.jpg',
  'enfield-classic-2': '/bikes/royal-enfield-bullet.jpg',
  'enfield-classic-3': '/bikes/royal-enfield-classic.jpg',
  'enfield-classic-4': '/bikes/royal-enfield-bullet.jpg',
  're-classic-1': '/bikes/royal-enfield-classic.jpg',
  're-classic-2': '/bikes/royal-enfield-bullet.jpg',
  'enfield-hunter-1': '/bikes/royal-enfield-classic.jpg',
  'enfield-hunter-2': '/bikes/royal-enfield-bullet.jpg',

  // Suzuki
  'suzuki-gixxer-1': '/bikes/suzuki-gixxer-sf.jpg',
  'suzuki-gixxer-2': '/bikes/suzuki-gixxer.jpg',
  'suzuki-gixxer-3': '/bikes/suzuki-gixxer-155.jpg',

  // Bajaj
  'pulsar-ns-1': '/bikes/bajaj-pulsar-ns.jpg',
  'bajaj-ns200-1': '/bikes/bajaj-pulsar-ns.jpg',
  'bajaj-ns200-2': '/bikes/bajaj-pulsar-150.jpg',
  'bajaj-ns200-3': '/bikes/bajaj-pulsar-ns.jpg',
  'bajaj-dominar-1': '/bikes/bajaj-pulsar-ns.jpg',
  'bajaj-dominar-2': '/bikes/bajaj-pulsar-150.jpg',

  // KTM
  'ktm-rc-1': '/bikes/ktm-rc.jpg',
  'ktm-duke-1': '/bikes/ktm-duke.jpg',
  'ktm-duke-2': '/bikes/ktm-rc.jpg',
  'ktm-duke-3': '/bikes/ktm-duke.jpg',

  // TVS
  'tvs-apache-1': '/bikes/tvs-apache-4v.png',
  'tvs-apache-2': '/bikes/tvs-apache-2v.jpg',
  'tvs-apache-3': '/bikes/tvs-apache-rr.jpg',

  // Kawasaki
  'ninja-125-1': '/bikes/kawasaki-ninja.png',
  'kawasaki-ninja-1': '/bikes/kawasaki-ninja.png',
  'kawasaki-ninja-2': '/bikes/kawasaki-ninja.png',
  'kawasaki-ninja-3': '/bikes/kawasaki-ninja.png'
};

export const BikeVisual: React.FC<BikeVisualProps> = ({
  bike,
  className = '',
  aspect = '4/3',
  activeImageIndex,
  customImageUrl,
  onSlideChange,
  autoPlay = true,
  slideOnHoverOnly = false
}) => {
  const [imageError, setImageError] = useState(false);

  const brandColors: Record<string, { primary: string; secondary: string; accent: string }> = {
    Yamaha: { primary: '#1d4ed8', secondary: '#0f172a', accent: '#38bdf8' },
    Honda: { primary: '#dc2626', secondary: '#18181b', accent: '#f97316' },
    'Royal Enfield': { primary: '#334155', secondary: '#1c1917', accent: '#d97706' },
    Bajaj: { primary: '#e11d48', secondary: '#1e293b', accent: '#fb7185' },
    Suzuki: { primary: '#0284c7', secondary: '#0f172a', accent: '#38bdf8' },
    TVS: { primary: '#b91c1c', secondary: '#18181b', accent: '#ef4444' },
    KTM: { primary: '#ea580c', secondary: '#18181b', accent: '#f97316' },
    Kawasaki: { primary: '#16a34a', secondary: '#0f172a', accent: '#4ade80' }
  };

  const currentTheme = brandColors[bike.brand] || {
    primary: bike.colorHex || '#ea580c',
    secondary: '#1e293b',
    accent: '#f97316'
  };

  // Collect all valid pictures for this bike (User uploaded photos or mapped presets)
  const rawList = useMemo(() => {
    if (customImageUrl && customImageUrl.trim()) return [customImageUrl.trim()];
    if (bike.images && Array.isArray(bike.images) && bike.images.length > 0) {
      const mapped = bike.images
        .map((img) => PRESET_BIKE_PHOTOS[img] || img)
        .filter((img) => Boolean(img && img.trim()));
      if (mapped.length > 0) return mapped;
    }
    return [];
  }, [bike.images, customImageUrl]);

  const isControlled = typeof activeImageIndex === 'number';
  const [internalIndex, setInternalIndex] = useState(activeImageIndex ?? 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  // Sync internalIndex when controlled activeImageIndex changes
  useEffect(() => {
    if (typeof activeImageIndex === 'number') {
      setInternalIndex(activeImageIndex);
    }
  }, [activeImageIndex]);

  // IntersectionObserver: Detect when this bike box scrolls into view on mobile
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '60px 0px 60px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onSlideChangeRef = useRef(onSlideChange);
  useEffect(() => {
    onSlideChangeRef.current = onSlideChange;
  }, [onSlideChange]);

  const currentSlide = isControlled ? (activeImageIndex ?? 0) : internalIndex;
  const currentSlideRef = useRef(currentSlide);
  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  const [prevSlide, setPrevSlide] = useState(currentSlide);

  useEffect(() => {
    if (currentSlide !== prevSlide) {
      const timer = setTimeout(() => {
        setPrevSlide(currentSlide);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, prevSlide]);

  const goToSlide = (nextIndex: number) => {
    if (!isControlled) {
      setInternalIndex(nextIndex);
    }
    if (onSlideChangeRef.current) {
      onSlideChangeRef.current(nextIndex);
    }
  };

  // Slideshow auto-advance:
  // Starts automatically when scrolled into view on mobile (isInView) OR when hovered with cursor on desktop (isHovered)
  useEffect(() => {
    if (rawList.length <= 1) return;

    const shouldPlay = autoPlay && (isInView || isHovered);
    if (!shouldPlay) return;

    const interval = setInterval(() => {
      const current = currentSlideRef.current;
      const next = (current + 1) % rawList.length;
      goToSlide(next);
    }, 2800); // Smooth 2.8s slide transition

    return () => clearInterval(interval);
  }, [rawList.length, isHovered, isInView, autoPlay, isControlled]);

  const handleNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const current = currentSlideRef.current;
    const next = (current + 1) % rawList.length;
    goToSlide(next);
  };

  const handlePrev = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const current = currentSlideRef.current;
    const next = (current - 1 + rawList.length) % rawList.length;
    goToSlide(next);
  };

  const handleSelectDot = (e: React.MouseEvent | React.TouchEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    goToSlide(idx);
  };

  // Touch Swipe for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Horizontal swipe threshold: 30px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      const current = currentSlideRef.current;
      if (deltaX < 0) {
        // Swiped left -> next photo
        const next = (current + 1) % rawList.length;
        goToSlide(next);
      } else {
        // Swiped right -> previous photo
        const prevIdx = (current - 1 + rawList.length) % rawList.length;
        goToSlide(prevIdx);
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const aspectClass = aspect === '4/3' ? 'aspect-[4/3]' : aspect === '16/9' ? 'aspect-[16/9]' : 'h-full min-h-[220px]';

  // If real image URL exists and hasn't failed loading
  if (rawList.length > 0 && !imageError) {
    return (
      <div 
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full overflow-hidden bg-slate-950 flex items-center justify-center select-none group ${aspectClass} ${className}`}
      >
        {/* Slideshow Image Stack: Smooth Visible / Invisible Dissolve Cross-Fade */}
        {rawList.map((imgUrl, idx) => {
          const isCurrent = currentSlide === idx;
          const isPrevious = prevSlide === idx && !isCurrent;

          let animClasses = 'opacity-0 z-0 pointer-events-none';
          if (isCurrent) {
            animClasses = 'opacity-100 z-20';
          } else if (isPrevious) {
            animClasses = 'opacity-0 z-10 pointer-events-none';
          }

          return (
            <img
              key={idx}
              src={imgUrl}
              alt={`${bike.name} - Photo ${idx + 1}`}
              onError={() => setImageError(true)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out will-change-[opacity] ${animClasses}`}
              loading={idx === 0 ? 'eager' : 'lazy'}
            />
          );
        })}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none z-10" />

        {/* Brand & CC Watermark */}
        <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none z-20">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-200 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-md shadow">
            {bike.brand}
          </span>
          <span className="text-[11px] font-mono text-slate-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800/80 backdrop-blur-md">
            {bike.cc} cc
          </span>
        </div>

        {/* Slideshow Next & Previous Arrow Controls (Always Visible & Clickable) */}
        {rawList.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={handlePrev}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handlePrev(e);
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/85 hover:bg-slate-900 active:bg-cyan-500 active:text-slate-950 text-white hover:text-cyan-400 border border-slate-700/90 backdrop-blur-md transition-all shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              type="button"
              aria-label="Next photo"
              onClick={handleNext}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleNext(e);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-slate-950/85 hover:bg-slate-900 active:bg-cyan-500 active:text-slate-950 text-white hover:text-cyan-400 border border-slate-700/90 backdrop-blur-md transition-all shadow-xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Pagination Dots at Bottom Center */}
            <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-30 pointer-events-auto">
              {rawList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Slide ${idx + 1}`}
                  onClick={(e) => handleSelectDot(e, idx)}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleSelectDot(e, idx);
                  }}
                  className={`transition-all rounded-full cursor-pointer p-0.5 ${
                    currentSlide === idx
                      ? 'w-6 h-1.5 bg-cyan-400 shadow-md shadow-cyan-400/50'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            {/* Slideshow Photo Counter in Corner */}
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 text-[10px] font-mono text-slate-300 bg-slate-950/85 px-2 py-0.5 rounded-md border border-slate-800/90 backdrop-blur-md z-20 shadow">
              <Camera className="w-3 h-3 text-cyan-400" />
              <span>{currentSlide + 1}/{rawList.length}</span>
            </div>
          </>
        )}
      </div>
    );
  }

  // Fallback: Precision Engineered Motorcycle Vector Silhouette (No Grade, No Inspection score)
  const isSport = bike.category === 'Sport';
  const isCruiser = bike.category === 'Cruiser' || bike.brand === 'Royal Enfield';

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 flex items-center justify-center select-none group ${aspectClass} ${className}`}
    >
      {/* Showroom Ambient Studio Lighting */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${currentTheme.primary} 0%, transparent 65%)`
        }}
      />

      {/* Grid Floor Perspective */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />
      <div 
        className="absolute bottom-2 inset-x-0 h-10 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 8px',
          transform: 'perspective(120px) rotateX(45deg)'
        }}
      />

      {/* Center Shadow Pod */}
      <div className="absolute bottom-4 w-3/4 h-3 bg-black/80 blur-md rounded-full pointer-events-none transition-transform duration-300 group-hover:scale-105" />

      {/* Precision Engineered Motorcycle Vector Silhouette */}
      <div className="relative z-10 w-full max-w-[88%] h-[78%] flex items-center justify-center p-2 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
        <svg
          viewBox="0 0 460 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
        >
          {/* Wheel Shadows */}
          <ellipse cx="85" cy="208" rx="42" ry="7" fill="#000000" fillOpacity="0.7" />
          <ellipse cx="375" cy="208" rx="42" ry="7" fill="#000000" fillOpacity="0.7" />

          {/* Rear Wheel & Tyre */}
          <circle cx="85" cy="180" r="44" stroke="#27272a" strokeWidth="12" />
          <circle cx="85" cy="180" r="44" stroke="#18181b" strokeWidth="6" strokeDasharray="3 4" />
          <circle cx="85" cy="180" r="32" stroke="#52525b" strokeWidth="2" />
          {/* Rear Disc & Caliper */}
          <circle cx="85" cy="180" r="20" stroke="#71717a" strokeWidth="2.5" strokeDasharray="2 3" />
          <rect x="76" y="160" width="8" height="14" rx="2" fill={currentTheme.accent} />
          {/* Rear Rim Spokes */}
          <line x1="85" y1="148" x2="85" y2="212" stroke="#a1a1aa" strokeWidth="2" />
          <line x1="53" y1="180" x2="117" y2="180" stroke="#a1a1aa" strokeWidth="2" />
          <line x1="62" y1="157" x2="108" y2="203" stroke="#71717a" strokeWidth="1.5" />
          <line x1="62" y1="203" x2="108" y2="157" stroke="#71717a" strokeWidth="1.5" />

          {/* Front Wheel & Tyre */}
          <circle cx="375" cy="180" r="44" stroke="#27272a" strokeWidth="12" />
          <circle cx="375" cy="180" r="44" stroke="#18181b" strokeWidth="6" strokeDasharray="3 4" />
          <circle cx="375" cy="180" r="32" stroke="#52525b" strokeWidth="2" />
          {/* Front Dual Disc & Caliper */}
          <circle cx="375" cy="180" r="24" stroke="#a1a1aa" strokeWidth="3" strokeDasharray="2 3" />
          <rect x="382" y="164" width="9" height="18" rx="2" fill={currentTheme.accent} />
          {/* Front Rim Spokes */}
          <line x1="375" y1="148" x2="375" y2="212" stroke="#e4e4e7" strokeWidth="2" />
          <line x1="343" y1="180" x2="407" y2="180" stroke="#e4e4e7" strokeWidth="2" />
          <line x1="352" y1="157" x2="398" y2="203" stroke="#a1a1aa" strokeWidth="1.5" />
          <line x1="352" y1="203" x2="398" y2="157" stroke="#a1a1aa" strokeWidth="1.5" />

          {/* Swingarm & Rear Suspension */}
          <path d="M85 180 L180 175 L210 160" stroke="#52525b" strokeWidth="8" strokeLinecap="round" />
          <line x1="165" y1="172" x2="195" y2="132" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
          {/* Chain / Belt Drive */}
          <line x1="85" y1="186" x2="180" y2="180" stroke="#3f3f46" strokeWidth="3" strokeDasharray="4 2" />

          {/* Engine Block & Transmission */}
          <rect x="175" y="142" width="70" height="52" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="2.5" />
          {/* Engine Cooling Fins */}
          <line x1="182" y1="150" x2="238" y2="150" stroke="#52525b" strokeWidth="2" />
          <line x1="182" y1="158" x2="238" y2="158" stroke="#52525b" strokeWidth="2" />
          <line x1="182" y1="166" x2="238" y2="166" stroke="#52525b" strokeWidth="2" />
          <line x1="182" y1="174" x2="238" y2="174" stroke="#52525b" strokeWidth="2" />
          <circle cx="225" cy="180" r="9" fill="#27272a" stroke="#71717a" strokeWidth="1.5" />

          {/* Exhaust Header & Muffler */}
          <path d="M225 152 Q215 200 190 202 L115 198 L85 190" stroke="#71717a" strokeWidth="6" strokeLinecap="round" />
          <rect x="90" y="184" width="75" height="14" rx="4" fill="#27272a" stroke="#a1a1aa" strokeWidth="1.5" />
          <circle cx="92" cy="191" r="4" fill="#09090b" />

          {/* Main Frame Chassis */}
          <path d="M140 135 L210 135 L245 150 L235 185" stroke="#3f3f46" strokeWidth="5" strokeLinecap="round" />
          <line x1="210" y1="135" x2="335" y2="108" stroke="#27272a" strokeWidth="7" strokeLinecap="round" />

          {/* Front Golden Inverted USD Suspension Forks */}
          <line x1="375" y1="180" x2="338" y2="92" stroke="#eab308" strokeWidth="7" strokeLinecap="round" />
          <line x1="365" y1="180" x2="330" y2="95" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" />

          {/* Handlebar & Brake Lever */}
          <path d="M336 90 L330 76 L320 78" stroke="#d4d4d8" strokeWidth="4" strokeLinecap="round" />
          <line x1="322" y1="78" x2="310" y2="82" stroke="#e4e4e7" strokeWidth="2" strokeLinecap="round" />
          {/* Mirror */}
          <path d="M330 76 L324 62 L312 60" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="310" cy="60" rx="8" ry="4" fill="#18181b" stroke="#a1a1aa" strokeWidth="1" />

          {/* Fuel Tank & Bodywork */}
          {isSport ? (
            <g>
              <path
                d="M210 132 C210 132 230 92 280 92 C320 92 345 105 345 118 L330 155 L285 145 Z"
                fill={currentTheme.primary}
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              <path
                d="M245 96 L310 115 L295 138 Z"
                fill={currentTheme.accent}
                fillOpacity="0.85"
              />
              <path
                d="M335 96 L368 114 L350 148 L320 148 Z"
                fill={currentTheme.primary}
              />
              <polygon points="360,118 368,114 362,126" fill="#38bdf8" />
              <path d="M336 92 L356 70 C364 80 368 95 368 110 Z" fill="#0284c7" fillOpacity="0.45" stroke="#38bdf8" strokeWidth="1" />
              <path d="M140 132 L210 132 C200 120 180 118 165 118 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
              <path d="M135 132 L95 112 L140 110 L165 118 Z" fill={currentTheme.primary} />
              <polygon points="92,112 88,110 95,116" fill="#ef4444" />
            </g>
          ) : isCruiser ? (
            <g>
              <path
                d="M215 138 C215 138 235 100 275 100 C310 100 330 112 335 125 L290 142 Z"
                fill={currentTheme.primary}
                stroke="#fbbf24"
                strokeWidth="1.5"
              />
              <ellipse cx="270" cy="118" rx="14" ry="7" fill="#d4d4d8" stroke="#ffffff" strokeWidth="1" />
              <circle cx="356" cy="116" r="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="3" />
              <circle cx="356" cy="116" r="9" fill="#fef08a" fillOpacity="0.8" />
              <path d="M145 138 C160 144 190 144 215 138 C205 124 170 122 145 138 Z" fill="#451a03" stroke="#78350f" strokeWidth="1.5" />
              <path d="M80 152 C95 130 125 125 145 138 L140 148 C120 140 95 146 80 162 Z" fill={currentTheme.primary} stroke="#a1a1aa" strokeWidth="1" />
            </g>
          ) : (
            <g>
              <path
                d="M210 134 C210 134 235 94 285 94 C318 94 340 106 342 120 L290 144 Z"
                fill={currentTheme.primary}
              />
              <polygon points="290,115 342,126 312,154" fill={currentTheme.accent} />
              <polygon points="340,94 362,106 352,128 335,116" fill="#18181b" stroke={currentTheme.accent} strokeWidth="1.5" />
              <line x1="350" y1="112" x2="358" y2="108" stroke="#38bdf8" strokeWidth="2.5" />
              <path d="M140 134 L210 134 C200 122 175 120 155 120 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
              <path d="M135 134 L105 118 L140 118 Z" fill={currentTheme.primary} />
            </g>
          )}

          {/* Front Mudguard Fender */}
          <path d="M348 152 C362 142 390 144 402 156" stroke={currentTheme.primary} strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand & CC Watermark */}
      <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300 bg-slate-950/75 px-2 py-0.5 rounded border border-slate-800 backdrop-blur-sm">
          {bike.brand}
        </span>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-800/80">
          {bike.cc} cc
        </span>
      </div>
    </div>
  );
};
