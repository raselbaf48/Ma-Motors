import React, { useState } from 'react';
import { CustomerInquiry, ShowroomSettings } from '../types/bike';
import { 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  Search, 
  Phone,
  User,
  PhoneCall
} from 'lucide-react';

interface ContactViewProps {
  inquiries: CustomerInquiry[];
  onUpdateInquiryStatus: (id: string, status: CustomerInquiry['status']) => void;
  onSubmitInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt'>) => void;
  settings?: ShowroomSettings;
}

export const ContactView: React.FC<ContactViewProps> = ({
  inquiries,
  onUpdateInquiryStatus,
  onSubmitInquiry,
  settings
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'showroom' | 'new_lead'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+880 1');
  const [email, setEmail] = useState('');
  const [bikeName, setBikeName] = useState('Yamaha YZF-R15 V4');
  const [inquiryType, setInquiryType] = useState<CustomerInquiry['inquiryType']>('Test Ride');
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = 
      inq.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      inq.bikeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.inquiryType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitInquiry({
      customerName: name,
      phone,
      email: email || 'customer@mamotors.bd',
      bikeName,
      inquiryType,
      notes,
      status: 'New'
    });
    setSavedSuccess(true);
    setName('');
    setNotes('');
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('leads');
    }, 1500);
  };

  const newCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Contact
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Customer inquiries, leads, and showroom contact info
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${(settings?.whatsapp || '+880 1739-840603').replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(settings?.showroomName || 'Ma Motors')},%20I%20have%20an%20inquiry.`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-400 font-semibold text-xs rounded-xl transition-colors"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${(settings?.hotline || '+880 1739-840603').replace(/\s+/g, '')}`}
            className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Hotline</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'leads'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          <span>Leads & Inquiries ({inquiries.length})</span>
          {newCount > 0 && (
            <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-mono">
              {newCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('showroom')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'showroom'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Showroom Location
        </button>

        <button
          onClick={() => setActiveTab('new_lead')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'new_lead'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          + Add Lead
        </button>
      </div>

      {/* Tab 1: Leads */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="relative w-full sm:max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customer, phone, bike..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
              <span className="text-slate-500 text-[11px] mr-1 shrink-0">Filter:</span>
              {['ALL', 'New', 'Contacted', 'Test Ride Scheduled', 'Closed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-md text-[11px] shrink-0 transition-colors border ${
                    statusFilter === st
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {st === 'ALL' ? 'All' : st}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 text-[11px] border-b border-slate-800 uppercase tracking-wider font-mono">
                  <tr>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Bike</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Notes</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 font-sans text-xs">
                        No inquiries found.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3 font-sans">
                          <div className="font-semibold text-white">{inq.customerName}</div>
                          <div className="text-cyan-400 font-mono text-[11px]">{inq.phone}</div>
                        </td>
                        <td className="p-3 font-sans">
                          <span className="text-slate-200">{inq.bikeName}</span>
                        </td>
                        <td className="p-3 text-cyan-400 font-medium">
                          {inq.inquiryType}
                        </td>
                        <td className="p-3 text-slate-400 max-w-[220px] truncate text-[11px] font-sans">
                          {inq.notes || 'Interested in this bike'}
                        </td>
                        <td className="p-3">
                          <select
                            value={inq.status}
                            onChange={(e) => onUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Test Ride Scheduled">Test Ride</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-3 text-right font-sans">
                          <div className="flex items-center justify-end gap-1">
                            <a
                              href={`tel:${inq.phone}`}
                              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px]"
                            >
                              Call
                            </a>
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.customerName)},%20greeting%20from%20Ma%20Motors%20regarding%20${encodeURIComponent(inq.bikeName)}.`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-1 bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded hover:bg-emerald-900/60 text-[11px]"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Showroom Info */}
      {activeTab === 'showroom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">
              Showroom Details
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div className="text-slate-400 text-[11px]">Showroom Name</div>
                <div className="text-white font-bold text-base">{settings?.showroomName || 'Ma Motors'}</div>
                <div className="text-slate-300">{settings?.address || '14 No Ghat, South Potenga, Potenga, Chittagong'}</div>
              </div>

              {/* Showroom Manager Card */}
              <div className="p-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-xl border border-cyan-500/30 flex items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3">
                  {settings?.managerPhotoUrl ? (
                    <img
                      src={settings.managerPhotoUrl}
                      alt={settings.managerName || 'Manager'}
                      className="w-11 h-11 rounded-xl object-cover border-2 border-cyan-500/50 shadow-md shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shrink-0">
                      <User className="w-5 h-5 text-slate-950" />
                    </div>
                  )}
                  <div>
                    <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider font-mono">
                      Showroom Manager
                    </div>
                    <div className="text-white font-bold text-sm">
                      {settings?.managerName || 'Saddam Hossain'}
                    </div>
                    <div className="text-slate-300 font-mono text-[11px]">
                      {settings?.managerContact || settings?.hotline || '+880 1739-840603'}
                    </div>
                  </div>
                </div>

                <a
                  href={`tel:${(settings?.managerContact || settings?.hotline || '+880 1739-840603').replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 shrink-0"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold mb-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Hotline</span>
                  </div>
                  <div className="font-mono text-white text-xs">{settings?.hotline || '+880 1739-840603'}</div>
                  <div className="text-[10px] text-slate-500">{settings?.openingHours || '9:00 AM - 9:00 PM'}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </div>
                  <div className="font-mono text-white text-xs truncate">{settings?.email || 'mamotors.bd@gmail.com'}</div>
                  <div className="text-[10px] text-slate-500">Inquiry & Sales</div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-white font-semibold">Business Hours</div>
                    <div className="text-slate-400 text-[11px]">{settings?.openingHours || 'Saturday to Thursday: 9:00 AM - 9:00 PM'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-white">
              Location Map & Directions
            </h3>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-slate-300">
                  <span className="font-semibold text-white">Location:</span> 14 No Ghat, South Potenga, Potenga, Chittagong.
                </div>
              </div>
              <p className="text-slate-400 text-[11px]">
                Conveniently located near 14 No Ghat, South Potenga. Ample parking and bike inspection area available.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: New Lead */}
      {activeTab === 'new_lead' && (
        <div className="max-w-lg bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">
            Add Customer Lead
          </h3>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs">
              Lead added successfully!
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Customer Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Phone Number *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Inquiry Type</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Test Ride">Test Ride</option>
                  <option value="Price Inquiry">Price Inquiry</option>
                  <option value="Paper Check">Paper Check</option>
                  <option value="Exchange">Exchange Offer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Target Bike</label>
              <input
                type="text"
                value={bikeName}
                onChange={(e) => setBikeName(e.target.value)}
                placeholder="e.g. Yamaha R15 V4"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Notes / Requirement</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Customer preferences, budget, or notes..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save Lead</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
