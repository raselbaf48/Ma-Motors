import React, { useState } from 'react';
import { Bike, CustomerInquiry } from '../../types/bike';
import { formatBDT } from '../../utils/formatters';
import { 
  X, 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  Mail, 
  CheckCircle, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  bike: Bike | null;
  onSubmitInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt'>) => void;
  defaultType?: 'Test Ride' | 'Purchase Inquiry' | 'EMI Financing' | 'General Query';
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  bike,
  onSubmitInquiry,
  defaultType = 'Test Ride'
}) => {
  const [inquiryType, setInquiryType] = useState<'Test Ride' | 'Purchase Inquiry' | 'EMI Financing' | 'General Query'>(defaultType);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-09-28');
  const [timeSlot, setTimeSlot] = useState('2:00 PM - 3:00 PM');
  const [locationType, setLocationType] = useState<'Showroom' | 'Doorstep'>('Showroom');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) return;

    onSubmitInquiry({
      customerName,
      phone,
      email,
      bikeId: bike?.id,
      bikeName: bike?.name || 'General Inquiry',
      inquiryType,
      preferredDate: `${preferredDate} (${timeSlot}) at ${locationType}`,
      notes: notes || `Customer requested ${inquiryType} for ${bike?.name || 'reconditioned bikes'}.`,
      status: 'New'
    });

    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  const effectivePrice = bike ? (bike.askingPrice || bike.price) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">
              Appointment Request Confirmed!
            </h3>
            <p className="text-sm text-slate-300">
              Thank you, <span className="text-white font-semibold">{customerName}</span>. Your {inquiryType.toLowerCase()} request for{' '}
              <span className="text-cyan-400 font-semibold">{bike?.name || 'our showroom'}</span> has been received.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl text-left border border-slate-800 text-xs space-y-1.5 text-slate-400">
              <div className="flex justify-between">
                <span>Date & Slot:</span>
                <span className="font-semibold text-slate-200">{preferredDate} · {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-semibold text-slate-200">{locationType} Test Ride</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Contact:</span>
                <span className="font-semibold text-slate-200">{phone}</span>
              </div>
              {bike?.regNumber && (
                <div className="flex justify-between">
                  <span>Bike Reg Number:</span>
                  <span className="font-semibold text-cyan-400 font-mono">{bike.regNumber}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Our showroom executive will call or WhatsApp you within 30 minutes to confirm vehicle availability.
            </p>
            <button
              onClick={handleResetAndClose}
              className="w-full py-2.5 rounded-lg text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Header */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Obligation · Free Test Ride · BRTA Verified</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                {bike ? `Inquire about ${bike.name}` : 'Book Showroom Consultation'}
              </h3>
              {bike && (
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Asking Price: {formatBDT(effectivePrice)} · {bike.regYear || bike.year} Reg · {bike.cc} cc
                </div>
              )}
            </div>

            {/* Inquiry Type Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
              {(['Test Ride', 'Purchase Inquiry', 'EMI Financing'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setInquiryType(type)}
                  className={`py-1.5 text-center font-medium rounded-md transition-colors ${
                    inquiryType === type
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Personal Details */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tanvir Ahmed"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1700-000000"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tanvir@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Time Window
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option>10:00 AM - 11:30 AM</option>
                      <option>12:00 PM - 1:30 PM</option>
                      <option>2:00 PM - 3:30 PM</option>
                      <option>4:00 PM - 5:30 PM</option>
                      <option>6:00 PM - 7:30 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Ride Location Option */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Test Ride Mode
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setLocationType('Showroom')}
                    className={`p-2 rounded-lg border text-left transition-colors ${
                      locationType === 'Showroom'
                        ? 'border-cyan-500 bg-cyan-500/10 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div>Tejgaon Showroom Track</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Tejgaon Industrial Area Hub</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocationType('Doorstep')}
                    className={`p-2 rounded-lg border text-left transition-colors ${
                      locationType === 'Doorstep'
                        ? 'border-cyan-500 bg-cyan-500/10 text-white font-semibold'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    <div>Doorstep Test Ride</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Dhaka Metro Area Delivery</div>
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Additional Notes or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Need assistance with BRTA ownership transfer, trade-in exchange, or EMI installment scheme..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md shadow-cyan-600/20 transition-colors"
              >
                Confirm Appointment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
