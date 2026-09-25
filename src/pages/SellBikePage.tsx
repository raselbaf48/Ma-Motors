import React, { useState } from 'react';
import { SellBikeSubmission, ConditionGrade } from '../types/bike';
import { POPULAR_BRANDS } from '../data/mockBikes';
import { formatBDT } from '../utils/formatters';
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Calculator,
  User,
  Phone,
  Mail,
  Camera,
  FileCheck
} from 'lucide-react';

interface SellBikePageProps {
  onSubmitSellRequest: (request: Omit<SellBikeSubmission, 'id' | 'createdAt'>) => void;
}

export const SellBikePage: React.FC<SellBikePageProps> = ({ onSubmitSellRequest }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [brand, setBrand] = useState('Yamaha');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2022);
  const [cc, setCc] = useState(150);
  const [registrationCity, setRegistrationCity] = useState('Dhaka Metro');

  const [mileageKm, setMileageKm] = useState(12000);
  const [ownersCount, setOwnersCount] = useState(1);
  const [conditionGrade, setConditionGrade] = useState<ConditionGrade>('A');
  const [insuranceStatus, setInsuranceStatus] = useState('Tax Token & Fitness Valid');
  const [hasAccident, setHasAccident] = useState('No, 100% Accidental Free');

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'Front 3/4 View',
    'Cockpit / Meter Console'
  ]);

  const [sellerName, setSellerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [expectedPrice, setExpectedPrice] = useState(240000);

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Instant Smart Valuation Algorithm in BDT
  const calculateEstimate = () => {
    let base = 350000;
    if (cc >= 300) base = 480000;
    else if (cc >= 200) base = 380000;
    else if (cc >= 150) base = 280000;
    else base = 180000;

    // Age depreciation
    const age = 2026 - year;
    const ageFactor = Math.max(0.45, 1 - age * 0.08);

    // Mileage depreciation
    const mileageFactor = Math.max(0.65, 1 - (mileageKm / 50000) * 0.22);

    // Condition bonus
    const conditionFactor = conditionGrade === 'A+' ? 1.08 : conditionGrade === 'A' ? 0.98 : 0.85;

    const median = Math.round(base * ageFactor * mileageFactor * conditionFactor);
    const minOffer = Math.round(median * 0.92 / 1000) * 1000;
    const maxOffer = Math.round(median * 1.06 / 1000) * 1000;

    return { minOffer, maxOffer };
  };

  const { minOffer, maxOffer } = calculateEstimate();

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as any);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as any);
  };

  const handleSimulatePhotoAdd = () => {
    if (uploadedPhotos.length < 5) {
      setUploadedPhotos([...uploadedPhotos, `Angle View ${uploadedPhotos.length + 1}`]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerName || !phone) return;

    const refId = `SEL-${Math.floor(1000 + Math.random() * 9000)}`;

    onSubmitSellRequest({
      sellerName,
      phone,
      email,
      brand,
      model: model || `${brand} Special Edition`,
      year,
      cc,
      mileageKm,
      conditionGrade,
      expectedPrice,
      estimatedOfferMin: minOffer,
      estimatedOfferMax: maxOffer,
      photosCount: uploadedPhotos.length,
      status: 'Pending Review',
      notes: `Registered in ${registrationCity}, ${ownersCount} owner(s), ${insuranceStatus}.`
    });

    setSubmittedRef(refId);
  };

  if (submittedRef) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Submission Received · Ref #{submittedRef}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Valuation Submitted Successfully!
          </h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Thank you, <span className="text-white font-bold">{sellerName}</span>. Your {year} {brand} {model || 'motorcycle'} has an estimated cash value between{' '}
            <span className="text-emerald-400 font-mono font-bold">{formatBDT(minOffer)} – {formatBDT(maxOffer)}</span>.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left text-xs space-y-3 max-w-md mx-auto">
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            Next 3 Simple Steps:
          </div>
          <div className="flex items-start gap-2.5 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold shrink-0">1</span>
            <span>Our vehicle evaluation engineer will call you at <strong className="text-white">{phone}</strong> within 2 hours.</span>
          </div>
          <div className="flex items-start gap-2.5 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold shrink-0">2</span>
            <span>Free 15-minute doorstep inspection or quick visit to our Tejgaon, Dhaka Showroom.</span>
          </div>
          <div className="flex items-start gap-2.5 text-slate-300">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-bold shrink-0">3</span>
            <span>Instant digital bank transfer upon BRTA paperwork handoff. Zero hassle.</span>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmittedRef(null);
            setCurrentStep(1);
          }}
          className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-cyan-500/20"
        >
          Submit Another Bike
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Same-Day Cash Payment · Free Doorstep Inspection in Dhaka</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
          Sell Your Motorcycle in 3 Easy Steps (BDT)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Enter your bike details for an instant algorithm valuation. No middlemen fees, zero listing waiting time.
        </p>
      </div>

      {/* Step Progress Indicators */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 max-w-lg mx-auto">
        {[
          { step: 1, label: 'Bike Specs' },
          { step: 2, label: 'Condition & Usage' },
          { step: 3, label: 'Photos Upload' },
          { step: 4, label: 'Offer & Contact' }
        ].map((s) => (
          <div key={s.step} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full text-xs font-bold font-mono flex items-center justify-center transition-colors ${
                currentStep === s.step
                  ? 'bg-cyan-500 text-slate-950 font-black ring-4 ring-cyan-500/20'
                  : currentStep > s.step
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {currentStep > s.step ? '✓' : s.step}
            </div>
            <span className="text-xs hidden sm:inline text-slate-300 font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Main Two-Column Layout: Form on Left, Real-time Valuation Meter on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Area (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* STEP 1: BIKE DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Step 1: Motorcycle Details & Make
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Brand *</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {POPULAR_BRANDS.map((b) => (
                      <option key={b.name} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. YZF-R15 V4, Pulsar NS200..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Manufacturing Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Displacement (CC)</label>
                  <select
                    value={cc}
                    onChange={(e) => setCc(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    <option value={125}>125 cc</option>
                    <option value={150}>150 - 160 cc</option>
                    <option value={200}>200 - 250 cc</option>
                    <option value={350}>350 cc & above</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-300 block mb-1">BRTA Registration Zone</label>
                  <select
                    value={registrationCity}
                    onChange={(e) => setRegistrationCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Dhaka Metro">Dhaka Metro (Mirpur / Ekuria / Uttara)</option>
                    <option value="Chattogram Metro">Chattogram Metro</option>
                    <option value="Sylhet Metro">Sylhet Metro</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Rangpur">Rangpur</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <span>Continue to Condition</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: USAGE & CONDITION */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Step 2: Odometer Mileage & Bike Health
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-300 mb-1">
                    <span>Odometer Reading</span>
                    <span className="text-cyan-400 font-mono font-bold">{mileageKm.toLocaleString()} km</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={mileageKm}
                    onChange={(e) => setMileageKm(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1,000 km</span>
                    <span>25,000 km</span>
                    <span>50,000+ km</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Number of Previous Owners</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setOwnersCount(num)}
                          className={`flex-1 py-2 rounded-lg border font-mono transition-colors ${
                            ownersCount === num
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {num} Owner{num > 1 ? 's' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Visual Cosmetic Grade</label>
                    <select
                      value={conditionGrade}
                      onChange={(e) => setConditionGrade(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="A+">Grade A+ (Showroom scratchless mint)</option>
                      <option value="A">Grade A (Minor normal wear)</option>
                      <option value="B">Grade B (Visible scratches / dents)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Accident & Frame History</label>
                  <select
                    value={hasAccident}
                    onChange={(e) => setHasAccident(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option>No, 100% Accidental Free (Original chassis & forks)</option>
                    <option>Minor drop / parking scratch on fairing</option>
                    <option>Repaired cosmetic body panel</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <span>Continue to Photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PHOTO ATTACHMENTS */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Step 3: Upload Clear Vehicle Photos
              </h2>

              <p className="text-xs text-slate-400">
                Clear photos from both sides, odometer screen, and engine block help us lock in top cash offers for your motorcycle.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {uploadedPhotos.map((photo, i) => (
                  <div
                    key={photo}
                    className="aspect-video bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center space-y-1 relative"
                  >
                    <Camera className="w-5 h-5 text-emerald-400" />
                    <span className="text-[11px] font-medium text-slate-300">{photo}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Ready</span>
                  </div>
                ))}

                {uploadedPhotos.length < 5 && (
                  <button
                    type="button"
                    onClick={handleSimulatePhotoAdd}
                    className="aspect-video border-2 border-dashed border-slate-800 hover:border-cyan-500/60 rounded-xl p-3 flex flex-col items-center justify-center text-center space-y-1 text-slate-400 hover:text-white transition-colors"
                  >
                    <Upload className="w-5 h-5 text-cyan-400" />
                    <span className="text-[11px] font-semibold">Upload Photo</span>
                    <span className="text-[10px] text-slate-500">JPG, PNG (Max 5MB)</span>
                  </button>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <span>Lock In Valuation Offer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT & SUBMISSION */}
          {currentStep === 4 && (
            <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
              <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
                Step 4: Contact Details & Expected Price (BDT)
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Full Legal Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      placeholder="e.g. Shakib Al Hasan"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Phone / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 1711-000000"
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">Your Expected Price (৳ BDT) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-cyan-400">৳</span>
                      <input
                        type="number"
                        required
                        step="1000"
                        value={expectedPrice}
                        onChange={(e) => setExpectedPrice(Number(e.target.value))}
                        className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono font-bold focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                      Formatted: {formatBDT(expectedPrice)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="shakib@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-cyan-500/25 flex items-center gap-1.5"
                >
                  <span>Submit for Instant Cash Offer</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Sticky Valuation Widget (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Real-Time Estimate
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              Dhaka Market Aligned
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Estimated Showroom Cash Payout:</div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums">
              {formatBDT(minOffer)} – {formatBDT(maxOffer)}
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Based on {year} {brand} {model || 'motorcycle'} ({cc}cc) with {mileageKm.toLocaleString()} km in Grade {conditionGrade} condition.
            </p>
          </div>

          {/* Value Factors Breakdown */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2.5">
            <div className="font-semibold text-slate-300">Why MotoPrime Buys Faster:</div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Paperwork & BRTA Transfer:</span>
              <span className="text-emerald-400 font-semibold">100% Free / Showroom Handles</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Payout Timeline:</span>
              <span className="text-slate-200 font-mono">Immediate Bank Transfer</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Doorstep Inspection:</span>
              <span className="text-slate-200">Zero Cost in Dhaka</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <a
              href="https://wa.me/8801711890432?text=Hello%20MotoPrime,%20I%20want%20to%20sell%20my%20bike%20instantly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline block"
            >
              Need an instant direct WhatsApp evaluation? Chat with our valuer →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
