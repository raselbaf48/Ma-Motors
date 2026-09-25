import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck,
  Compass,
  ArrowUpRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Showroom Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
          <Phone className="w-3.5 h-3.5" />
          <span>Showroom Open 7 Days in Dhaka · Immediate WhatsApp Response</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
          Get in Touch with MotoPrime Showroom
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Have questions about a reconditioned bike, BRTA registration verification, down payment EMI plans, or want to schedule a test ride? We're here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-slate-300">
                Thank you, <span className="text-white font-semibold">{name}</span>. One of our motorcycle sales specialists will contact you via phone or WhatsApp at <strong className="text-cyan-400">{phone}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setPhone('');
                  setEmail('');
                  setMessage('');
                }}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg text-xs font-bold transition-colors shadow-lg shadow-cyan-500/20"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base font-bold text-white font-display">
                Send an Online Inquiry
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mahfuz Rahman"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1711-000000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-300 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mahfuz@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Subject / Area of Interest
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option>General Showroom Inquiry</option>
                    <option>Specific Bike In-Stock Availability</option>
                    <option>BRTA Ownership Transfer Questions</option>
                    <option>EMI / Financing & Down Payment Help</option>
                    <option>Sell or Trade-in My Old Bike</option>
                    <option>Book a Doorstep Test Ride</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">
                    Message or Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us which bike you're looking for, your budget in BDT (৳), or any specific queries..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Showroom Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Contact Cards & Direct Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Direct Buttons */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Immediate Help Channels
            </h3>

            <div className="space-y-2.5">
              <a
                href="https://wa.me/8801711890432?text=Hello%20MotoPrime,%20I%20have%20an%20inquiry%20regarding%20reconditioned%20bikes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-between transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Live Advisory</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+8801711890432"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <span>Sales Desk: +880 1711-890432</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Open</span>
              </a>
            </div>
          </div>

          {/* Showroom Details Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Showroom Location & Hours
            </h3>

            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">MotoPrime Hub & Central Showroom</div>
                  <div className="text-slate-400 mt-0.5">
                    Plot 18, Block B, Tejgaon Industrial Area, Dhaka-1208, Bangladesh
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Visiting Hours</div>
                  <div className="text-slate-400 mt-0.5">
                    Saturday – Thursday: 10:00 AM – 9:00 PM<br />
                    Friday: 3:00 PM – 9:00 PM (Test Rides Open)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Email Address</div>
                  <div className="text-slate-400 mt-0.5">
                    showroom@motoprime.com.bd
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showroom Interactive Map Placeholder */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-white font-display">
          Showroom Location Map
        </h2>
        <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 relative flex items-center justify-center p-6 text-center">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <div className="relative z-10 space-y-3 max-w-md bg-slate-900/90 border border-slate-800 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">MotoPrime Showroom & Test Track</div>
              <div className="text-xs text-slate-400 mt-1">Plot 18, Block B, Tejgaon Industrial Area, Dhaka</div>
            </div>
            <div className="flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Free Customer Motorcycle Parking Available</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
