import React, { useState } from 'react';
import { Bike, ActivePage } from '../types/bike';
import { BikeCard } from '../components/bike/BikeCard';
import { BikeVisual } from '../components/common/BikeVisual';
import { POPULAR_BRANDS, TRUST_PROMISES, TESTIMONIALS } from '../data/mockBikes';
import { formatBDT } from '../utils/formatters';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  FileCheck, 
  Award, 
  RefreshCw, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  Flame, 
  ArrowUpRight,
  Gauge,
  Calendar,
  Layers,
  Wrench
} from 'lucide-react';

interface HomePageProps {
  bikes: Bike[];
  onNavigate: (page: ActivePage) => void;
  onSelectBike: (bike: Bike) => void;
  onCompareToggle: (bike: Bike) => void;
  isCompared: (bikeId: string) => boolean;
  onQuickInquire: (bike: Bike) => void;
  onBrandSearch: (brand: string) => void;
  onApplyQuickSearch: (query: string, brand: string, maxPrice: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  bikes,
  onNavigate,
  onSelectBike,
  onCompareToggle,
  isCompared,
  onQuickInquire,
  onBrandSearch,
  onApplyQuickSearch
}) => {
  // Hero Search states in BDT
  const [searchBrand, setSearchBrand] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMaxBudget, setSearchMaxBudget] = useState('500000');

  // Featured Carousel Tab
  const [featuredTab, setFeaturedTab] = useState<'All' | 'Sport' | 'Naked' | 'Cruiser'>('All');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const featuredBikes = bikes.filter((b) => {
    if (featuredTab === 'All') return b.featured || b.conditionGrade === 'A+';
    return b.category === featuredTab;
  });

  const dealOfTheWeek = bikes.find((b) => b.id === 'bike-1') || bikes[0];
  const dealPrice = dealOfTheWeek ? (dealOfTheWeek.askingPrice || dealOfTheWeek.price) : 0;
  const dealEmi = Math.round((dealPrice * 0.8 * (0.10 / 12) * Math.pow(1 + 0.10 / 12, 24)) / (Math.pow(1 + 0.10 / 12, 24) - 1));

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyQuickSearch(searchQuery, searchBrand, Number(searchMaxBudget));
    onNavigate('inventory');
  };

  const handleNextCarousel = () => {
    if (carouselIndex + 3 < featuredBikes.length) {
      setCarouselIndex((prev) => prev + 1);
    } else {
      setCarouselIndex(0);
    }
  };

  const handlePrevCarousel = () => {
    if (carouselIndex > 0) {
      setCarouselIndex((prev) => prev - 1);
    } else {
      setCarouselIndex(Math.max(0, featuredBikes.length - 3));
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800/80 pt-10 pb-16 sm:pb-24">
        {/* Ambient atmospheric glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy & Search Module */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>BRTA Verified Papers · Zero Tampering · 12M Engine Warranty</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
                Certified Recondition <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
                  Motorcycles in BDT.
                </span>{' '}
                Zero Regret.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Every machine in our Dhaka showroom passes a transparent 50-point mechanical inspection with genuine BRTA registration paperwork, tax token verification, and guaranteed legal title ownership.
              </p>

              {/* Quick Search Box */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-slate-900/90 border border-slate-700/80 p-3 sm:p-4 rounded-2xl shadow-2xl backdrop-blur-md space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Brand select */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Brand
                    </label>
                    <select
                      value={searchBrand}
                      onChange={(e) => setSearchBrand(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="ALL">All Brands (Yamaha, Honda, Bajaj...)</option>
                      {POPULAR_BRANDS.map((b) => (
                        <option key={b.name} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Model Search Keyword */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Model / Keyword
                    </label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="R15 V4, Pulsar N250, Gixxer..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Max Budget in BDT */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Max Price ({formatBDT(Number(searchMaxBudget))})
                    </label>
                    <select
                      value={searchMaxBudget}
                      onChange={(e) => setSearchMaxBudget(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    >
                      <option value="200000">Under ৳2,00,000</option>
                      <option value="300000">Under ৳3,00,000</option>
                      <option value="400000">Under ৳4,00,000</option>
                      <option value="600000">Up to ৳6,00,000</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Free Test Rides
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      BDT EMI Facilities
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-600/30 flex items-center justify-center gap-2"
                  >
                    <span>Search Bikes ({bikes.length} Available)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Hero Showcase Card (Deal of the Week) */}
            <div className="lg:col-span-5">
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl overflow-hidden group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                    <Flame className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                    <span>Showroom Pick of the Week</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Score {dealOfTheWeek.inspection.overallScore}/100
                  </span>
                </div>

                <div 
                  onClick={() => onSelectBike(dealOfTheWeek)}
                  className="rounded-xl overflow-hidden cursor-pointer"
                >
                  <BikeVisual bike={dealOfTheWeek} aspect="16/9" />
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 
                        onClick={() => onSelectBike(dealOfTheWeek)}
                        className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer"
                      >
                        {dealOfTheWeek.name}
                      </h3>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        MFG {dealOfTheWeek.mfgYear || dealOfTheWeek.year} · Reg {dealOfTheWeek.regYear || dealOfTheWeek.year} · {dealOfTheWeek.cc} cc · {dealOfTheWeek.mileageKm.toLocaleString()} km
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-bold font-mono text-white">
                        {formatBDT(dealPrice)}
                      </div>
                      <div className="text-[11px] text-cyan-400 font-mono">
                        EMI from {formatBDT(dealEmi)}/mo
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onQuickInquire(dealOfTheWeek)}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors text-center"
                    >
                      Book Test Ride
                    </button>
                    <button
                      onClick={() => onSelectBike(dealOfTheWeek)}
                      className="flex-1 py-2 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors text-center flex items-center justify-center gap-1"
                    >
                      <span>Inspection Sheet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">50+</div>
            <div className="text-xs text-slate-400 mt-1">Multi-Point Checkpoints</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-400">100%</div>
            <div className="text-xs text-slate-400 mt-1">BRTA Papers Verified</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white">1,800+</div>
            <div className="text-xs text-slate-400 mt-1">Happy Riders in BD</div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-center">
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">7-Day</div>
            <div className="text-xs text-slate-400 mt-1">Hassle-Free Bike Swap</div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED BIKES CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Curated Stock
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
              Featured Pre-Owned Motorcycles
            </h2>
          </div>

          {/* Segmented Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(['All', 'Sport', 'Naked', 'Cruiser'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setFeaturedTab(tab);
                  setCarouselIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  featuredTab === tab
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab} Motorcycles
              </button>
            ))}

            <div className="hidden sm:flex items-center gap-1 pl-2">
              <button
                onClick={handlePrevCarousel}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextCarousel}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBikes.slice(carouselIndex, carouselIndex + 3).map((bike) => (
            <BikeCard
              key={bike.id}
              bike={bike}
              onSelect={onSelectBike}
              onCompareToggle={onCompareToggle}
              isCompared={isCompared(bike.id)}
              onQuickInquire={onQuickInquire}
              layout="grid"
            />
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('inventory')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            <span>View All {bikes.length} Inspected Motorcycles</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </section>

      {/* 4. EXPLORE BY BRAND QUICK LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Authorized & Popular
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
            Browse by Brand
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {POPULAR_BRANDS.map((b) => (
            <button
              key={b.name}
              onClick={() => onBrandSearch(b.name)}
              className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/80 rounded-xl p-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 group flex flex-col items-center justify-center min-h-[90px]"
            >
              <div className="text-xs font-black tracking-wider text-slate-200 group-hover:text-cyan-400 font-display transition-colors">
                {b.name}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                {b.count} In Stock
              </div>
              <div className="text-[9px] text-slate-600 mt-0.5 font-mono">
                {b.origin}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. "WHY CHOOSE US" / 50-POINT INSPECTION DEEP DIVE */}
      <section className="bg-slate-900/50 border-y border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Transparency First
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display leading-tight">
                Why MotoPrime Recondition Standards Win
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Buying a pre-owned bike shouldn't feel like a gamble. We dismantle the risk by inspecting compression, valve clearance, fork truing, electrical harnesses, and BRTA paper registration before listing.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Full Digital Inspection Card</div>
                    <div className="text-xs text-slate-400">View exact scratch locations and tyre health percentages before test riding.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Guaranteed BRTA Document Transfer</div>
                    <div className="text-xs text-slate-400">Our legal liaison handles title ownership transfer to your name with zero headaches.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Instant Trade-in / Exchange Bonus</div>
                    <div className="text-xs text-slate-400">Bring your old motorcycle and upgrade in less than 90 minutes.</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
                >
                  <span>Learn more about our certification lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Checklist Visual Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TRUST_PROMISES.map((promise, index) => (
                <div
                  key={promise.title}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="text-xs font-mono text-cyan-400 font-bold">
                    0{index + 1}. Checklist
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {promise.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {promise.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTANT VALUATION / SELL BIKE CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Looking to Sell or Upgrade?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Get an Instant Cash Offer for Your Motorcycle (BDT)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Fill in your bike details in 2 minutes. Receive a competitive valuation, free doorstep inspection, and same-day payment into your bank account.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => onNavigate('sell')}
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30 transition-colors whitespace-nowrap"
            >
              Get Free Bike Valuation
            </button>
            <button
              onClick={() => onNavigate('emi')}
              className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors whitespace-nowrap"
            >
              EMI Calculator (BDT)
            </button>
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Real Owners · Real Stories
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
            Customer Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{test.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-white">{test.name}</div>
                  <span className="text-[10px] text-emerald-400 font-medium">Verified Buyer</span>
                </div>
                <div className="text-[11px] text-cyan-400 font-mono mt-0.5">
                  Purchased {test.bikePurchased}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {test.city} · {test.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
