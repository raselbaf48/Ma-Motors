import React from 'react';
import { ActivePage } from '../types/bike';
import { 
  ShieldCheck, 
  Award, 
  Wrench, 
  FileCheck, 
  Users, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const inspectionStages = [
    {
      step: '01',
      title: 'Structural Frame & Alignment',
      desc: 'Laser alignment checking for past accidental bends, fork trueness, swingarm pivot play, and factory weld integrity.'
    },
    {
      step: '02',
      title: 'Engine Compression & Thermals',
      desc: 'Digital compression gauge testing, valve clearance inspection, oil quality spectroscopy, and cooling system thermal efficiency.'
    },
    {
      step: '03',
      title: 'ECU & Electrical Diagnostics',
      desc: 'OBD-II scanner diagnostics reading sensor fault history, battery load test, stator coil output, and ABS solenoid engagement.'
    },
    {
      step: '04',
      title: 'BRTA Legal Paper & NOC Verification',
      desc: 'Direct check with BRTA database. Zero unpaid traffic fines, clean NOC certificate, verified chassis & engine serial numbers.'
    }
  ];

  const showroomFacilities = [
    {
      name: 'Dynamic Inspection Bay',
      desc: 'Hydraulic lifts with computer-guided diagnostic equipment for underbody inspection.'
    },
    {
      name: 'Motorcycle Detailing & Ceramic Lab',
      desc: 'Multi-stage paint correction, anti-corrosion rust proofing, and OEM decal preservation.'
    },
    {
      name: 'Rider Consultation Lounge',
      desc: 'Comfortable waiting area, helmet fitting area, and private financing deliberation suites.'
    },
    {
      name: 'Showroom Private Test Track',
      desc: 'Enclosed 400m smooth surface tarmac for testing clutch pickup, brakes, and handling.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* 1. Hero & Mission */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Award className="w-3.5 h-3.5" />
          <span>Founded in 2018 · Over 4,500 Certified Bikes Delivered in Bangladesh</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Eliminating the Trust Deficit in Pre-Owned Motorcycles
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          For years in Bangladesh, buying a used bike meant meeting strangers, worrying about fake blue books, or inheriting cracked engine heads. MotoPrime replaces the gamble with clinical 50-point inspection, BRTA legal ownership title guarantees, and genuine warranty backing.
        </p>
      </section>

      {/* 2. Key Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Accidental Junk</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We reject over 45% of bikes submitted to us. If a motorcycle has frame damage, flood exposure, or odometer tampering, it never enters our showroom.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Flawless BRTA Paperwork</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every bike sold includes guaranteed ownership title transfer to the buyer’s NID name. We handle police clearance, tax tokens, and fitness certificates.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600/10 border border-sky-500/30 text-sky-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Warranty & Buyback</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Drive away with up to 12 months of mechanical coverage on internal engine parts and transmission gears, plus a 7-day unconditional exchange policy.
          </p>
        </div>
      </section>

      {/* 3. The 50-Point Inspection Process */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Master Diagnostic Protocol
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            The MotoPrime 50-Point Certification Standard
          </h2>
          <p className="text-xs text-slate-400">
            How our master technicians scrutinize every machine before it qualifies for the showroom floor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {inspectionStages.map((stage) => (
            <div
              key={stage.step}
              className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2 relative"
            >
              <div className="text-2xl font-black font-mono text-cyan-400">
                {stage.step}
              </div>
              <h3 className="text-sm font-bold text-white">
                {stage.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Showroom Facilities */}
      <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-10 space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            Infrastructure
          </div>
          <h2 className="text-2xl font-bold text-white font-display">
            Modern Dealership & Certification Hub
          </h2>
          <p className="text-xs text-slate-400">
            Visit our 18,000 sq.ft state-of-the-art facility in Tejgaon Industrial Area, Dhaka.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {showroomFacilities.map((fac) => (
            <div key={fac.name} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{fac.name}</span>
              </div>
              <p className="text-xs text-slate-400 pl-5 leading-relaxed">
                {fac.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Location & Map Placeholder */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-display">
              Visit MotoPrime Showroom Dhaka
            </h2>
            <p className="text-xs text-slate-400">
              Conveniently located at Plot 18, Block B, Tejgaon Industrial Area with ample motorcycle test tracks.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-cyan-500/20"
          >
            Get Showroom Directions
          </button>
        </div>

        {/* Styled Map Embed Placeholder */}
        <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 relative flex items-center justify-center p-6 text-center">
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
          <div className="relative z-10 space-y-3 max-w-sm">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">MotoPrime Recondition Showroom & Hub</div>
              <div className="text-xs text-slate-400 mt-1">Plot 18, Block B, Tejgaon Industrial Area, Dhaka-1208</div>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full inline-block">
              Open 7 Days a Week · Free Onsite Test Track
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
