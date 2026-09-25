import React, { useState } from 'react';
import { ActivePage } from '../types/bike';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: (userName: string) => void;
  onNavigate: (page: ActivePage) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = tab === 'signin' ? (email.split('@')[0] || 'Rider Tanvir') : (name || 'New Rider');
    onLoginSuccess(displayName);
    onNavigate('inventory');
  };

  const handleDemoLogin = () => {
    onLoginSuccess('Tanvir Ahmed');
    onNavigate('inventory');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xl mx-auto shadow-lg shadow-cyan-500/30">
          M
        </div>
        <h1 className="text-2xl font-extrabold text-white font-display">
          {tab === 'signin' ? 'Sign In to MotoPrime' : 'Create Rider Account'}
        </h1>
        <p className="text-xs text-slate-400">
          {tab === 'signin'
            ? 'Access your saved bikes, test ride bookings, and instant trade-in valuations.'
            : 'Join over 4,500 verified riders in Bangladesh and get early alerts on new arrivals.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setTab('signin')}
            className={`py-2 text-center rounded-lg font-bold transition-colors ${
              tab === 'signin'
                ? 'bg-cyan-500 text-slate-950 font-black shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab('signup')}
            className={`py-2 text-center rounded-lg font-bold transition-colors ${
              tab === 'signup'
                ? 'bg-cyan-500 text-slate-950 font-black shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Demo Fast Sign-In */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2.5 px-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-xs font-bold text-cyan-400 flex items-center justify-center gap-2 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>One-Click Demo Sign-In (Tanvir Ahmed)</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[11px] text-slate-500 uppercase tracking-wider font-mono">
            Or With Email
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {tab === 'signup' && (
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tanvir@example.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {tab === 'signup' && (
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1711-000000"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-300">Password</label>
              {tab === 'signin' && (
                <button type="button" className="text-[11px] text-cyan-400 hover:underline">
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg font-bold text-xs shadow-lg shadow-cyan-500/25 transition-colors"
          >
            {tab === 'signin' ? 'Sign In to Account' : 'Create Rider Account'}
          </button>
        </form>
      </div>
    </div>
  );
};
