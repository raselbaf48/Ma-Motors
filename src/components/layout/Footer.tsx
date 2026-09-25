import React from 'react';
import { ActivePage } from '../../types/bike';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  MessageCircle, 
  ArrowUpRight 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onBrandClick: (brand: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onBrandClick }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-sm">
      {/* Trust Banner Bar */}
      <div className="border-b border-slate-900 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">50-Point Certified</div>
              <div className="text-xs text-slate-400 mt-0.5">Strict mechanical and structural quality standards on every bike.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">12-Month Warranty</div>
              <div className="text-xs text-slate-400 mt-0.5">Engine and gearbox peace-of-mind warranty included with free roadside support.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">7-Day Swap Guarantee</div>
              <div className="text-xs text-slate-400 mt-0.5">Not your dream ride? Swap with any other model in stock within 7 days.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200">WhatsApp Live Chat</div>
              <div className="text-xs text-slate-400 mt-0.5">Get 360° walkaround videos & instant finance quotes directly on your phone.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Showroom Pitch */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">
              M
            </div>
            <div className="text-xl font-bold tracking-tight text-white font-display">
              Moto<span className="text-cyan-400">Prime</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Bangladesh's premier certified recondition motorcycle destination. We eliminate the uncertainty of second-hand bikes with BRTA paper verification, master inspections, transparent health scorecards, and guaranteed legal title ownership.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://wa.me/8801711890432?text=Hello%20MotoPrime,%20I%20am%20interested%20in%20a%20reconditioned%20bike"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 hover:bg-emerald-900/80 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chat on WhatsApp
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
            >
              <span>Showroom Map</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Explore</div>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('menu')} className="hover:text-cyan-400 transition-colors text-cyan-400 font-semibold flex items-center gap-1">
                <span>☰ Sidebar Options Hub (মেনু)</span>
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('inventory')} className="hover:text-cyan-400 transition-colors">
                All Inventory (BDT Stock)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('compare')} className="hover:text-cyan-400 transition-colors">
                Side-by-Side Comparison
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('sell')} className="hover:text-cyan-400 transition-colors">
                Instant Valuation & Sell
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('emi')} className="hover:text-cyan-400 transition-colors">
                BDT EMI Installment Calculator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('admin')} className="hover:text-cyan-400 transition-colors text-slate-500">
                Staff Admin DMS & Edit
              </button>
            </li>
          </ul>
        </div>

        {/* Brands */}
        <div>
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Top Brands</div>
          <ul className="space-y-2 text-xs">
            {['Yamaha', 'Honda', 'Bajaj', 'Suzuki', 'TVS', 'KTM'].map((brand) => (
              <li key={brand}>
                <button
                  onClick={() => onBrandClick(brand)}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {brand} Reconditioned
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Showroom Visit Info */}
        <div>
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">Showroom & Hub</div>
          <div className="space-y-2.5 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Plot 18, Block B, Tejgaon Industrial Area, Dhaka-1208, Bangladesh</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <a href="tel:+8801711890432" className="hover:text-white transition-colors">
                +880 1711-890432
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <a href="mailto:showroom@motoprime.com.bd" className="hover:text-white transition-colors">
                showroom@motoprime.com.bd
              </a>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>Saturday - Thursday: 10:00 AM - 9:00 PM<br/>Friday: 3:00 PM - 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} MotoPrime Recondition Showroom. All prices in BDT (৳).
          </div>
          <div className="flex items-center gap-4">
            <span>BRTA Verified Documents</span>
            <span>·</span>
            <span>Zero Odometer Tampering Guarantee</span>
            <span>·</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-300">
              Customer Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
