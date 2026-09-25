import React, { useState } from 'react';
import { SaleRecord, SellBikeSubmission, Bike } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { 
  Search, 
  Plus, 
  FileText, 
  CheckCircle2, 
  X
} from 'lucide-react';

interface SellViewProps {
  sales: SaleRecord[];
  sellRequests: SellBikeSubmission[];
  bikes: Bike[];
  onAddSale: (sale: SaleRecord) => void;
  onUpdateSellStatus: (id: string, status: SellBikeSubmission['status']) => void;
}

export const SellView: React.FC<SellViewProps> = ({
  sales,
  sellRequests,
  bikes,
  onAddSale,
  onUpdateSellStatus
}) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'requests'>('sales');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<SaleRecord | null>(null);

  // Available bikes for new sale
  const availableBikes = bikes.filter((b) => b.status === 'Available');

  // Sale Modal Form
  const [selectedBikeId, setSelectedBikeId] = useState<string>(availableBikes[0]?.id || '');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('+880 1');
  const [buyerAddress, setBuyerAddress] = useState('Dhaka');
  const [buyerNid, setBuyerNid] = useState('');
  const [salePrice, setSalePrice] = useState<number>(availableBikes[0]?.askingPrice || 320000);
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'Bank Transfer' | 'EMI Financing'>('Bank Transfer');
  const [warrantyMonths, setWarrantyMonths] = useState(12);
  const [notes, setNotes] = useState('');

  const currentSelectedBike = bikes.find((b) => b.id === selectedBikeId) || availableBikes[0];
  const purchaseCost = currentSelectedBike?.buyingPrice || 0;
  const profit = salePrice - purchaseCost;

  // Filtered sales
  const filteredSales = sales.filter((s) => {
    return (
      s.bikeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.buyerPhone.includes(searchQuery) ||
      s.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.regNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // KPI Analytics
  const totalRevenue = sales.reduce((sum, s) => sum + s.salePrice, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
  const avgProfit = sales.length > 0 ? Math.round(totalProfit / sales.length) : 0;

  const handleBikeChange = (bikeId: string) => {
    setSelectedBikeId(bikeId);
    const bike = bikes.find((b) => b.id === bikeId);
    if (bike) {
      setSalePrice(bike.askingPrice || bike.price);
    }
  };

  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSelectedBike) return;

    const newSale: SaleRecord = {
      id: `sale-${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      bikeId: currentSelectedBike.id,
      bikeName: currentSelectedBike.name,
      regNumber: currentSelectedBike.regNumber || currentSelectedBike.inspection?.registrationNumber || 'N/A',
      saleDate: new Date().toISOString().split('T')[0],
      buyerName,
      buyerPhone,
      buyerAddress: buyerAddress || 'Dhaka',
      buyerNid: buyerNid || 'N/A',
      buyingPrice: currentSelectedBike.buyingPrice || 0,
      salePrice,
      profit,
      paymentMethod,
      warrantyMonths,
      status: 'Completed',
      notes
    };

    onAddSale(newSale);
    setIsModalOpen(false);
    setSelectedInvoice(newSale);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
            Sales (শো-রুম থেকে বাইক বিক্রি)
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            শো-রুম থেকে কাস্টমারদের কাছে বাইক বিক্রয়, ইনভয়েস ও মেমোর হিসাব
          </p>
        </div>

        <button
          onClick={() => {
            if (availableBikes.length > 0) {
              setSelectedBikeId(availableBikes[0].id);
              setSalePrice(availableBikes[0].askingPrice || availableBikes[0].price);
              setBuyerName('');
              setIsModalOpen(true);
            }
          }}
          disabled={availableBikes.length === 0}
          className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-semibold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ নতুন বিক্রি রেকর্ড করুন</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-slate-400">Total Sales</div>
          <div className="text-xl font-bold text-white font-mono mt-1">
            {formatBDT(totalRevenue)}
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{sales.length} bikes sold</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-slate-400">Total Profit</div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
            +{formatBDT(totalProfit)}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-slate-400">Avg Profit / Bike</div>
          <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
            +{formatBDT(avgProfit)}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-slate-400">Available to Sell</div>
          <div className="text-xl font-bold text-slate-200 font-mono mt-1">
            {availableBikes.length} <span className="text-xs text-slate-400 font-normal">bikes</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('sales')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'sales'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Sales Invoices ({sales.length})
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'requests'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          Customer Sell Requests ({sellRequests.length})
        </button>
      </div>

      {/* Sales Invoices Tab */}
      {activeTab === 'sales' && (
        <div className="space-y-4">
          <div className="relative max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoice, buyer, bike..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 text-[11px] border-b border-slate-800 uppercase tracking-wider font-mono">
                  <tr>
                    <th className="p-3">Invoice</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Bike</th>
                    <th className="p-3">Reg No</th>
                    <th className="p-3">Buyer</th>
                    <th className="p-3">Sold Price</th>
                    <th className="p-3">Profit</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filteredSales.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-slate-400 font-sans text-xs">
                        No sales records found.
                      </td>
                    </tr>
                  ) : (
                    filteredSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3 text-cyan-400 font-bold">
                          {sale.invoiceNumber}
                        </td>
                        <td className="p-3 text-slate-400 whitespace-nowrap">
                          {sale.saleDate}
                        </td>
                        <td className="p-3 font-sans">
                          <div className="font-semibold text-white">{sale.bikeName}</div>
                        </td>
                        <td className="p-3">
                          <span className="bg-slate-950 px-2 py-0.5 rounded text-slate-300 font-medium border border-slate-800 text-[11px]">
                            {sale.regNumber}
                          </span>
                        </td>
                        <td className="p-3 font-sans">
                          <div className="text-slate-200">{sale.buyerName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{sale.buyerPhone}</div>
                        </td>
                        <td className="p-3 font-semibold text-emerald-400">
                          {formatBDT(sale.salePrice)}
                        </td>
                        <td className="p-3 font-semibold text-cyan-400">
                          +{formatBDT(sale.profit)}
                        </td>
                        <td className="p-3">
                          <span className="bg-slate-950 px-2 py-0.5 rounded text-slate-300 text-[10px] border border-slate-800">
                            {sale.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setSelectedInvoice(sale)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                            title="Invoice Memo"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
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

      {/* Customer Sell Submissions */}
      {activeTab === 'requests' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 text-[11px] border-b border-slate-800 uppercase tracking-wider font-mono">
                <tr>
                  <th className="p-3">Seller</th>
                  <th className="p-3">Bike</th>
                  <th className="p-3">Year / KM</th>
                  <th className="p-3">Asking (৳)</th>
                  <th className="p-3">Estimated Offer</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {sellRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 font-sans">
                      <div className="font-semibold text-white">{req.sellerName}</div>
                      <div className="text-[11px] text-cyan-400 font-mono">{req.phone}</div>
                    </td>
                    <td className="p-3 font-sans">
                      <div className="text-slate-200">{req.brand} {req.model}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{req.cc} cc · Grade {req.conditionGrade}</div>
                    </td>
                    <td className="p-3 text-slate-300">
                      {req.year} · {req.mileageKm.toLocaleString()} km
                    </td>
                    <td className="p-3 font-semibold text-slate-200">
                      {formatBDT(req.expectedPrice)}
                    </td>
                    <td className="p-3 text-emerald-400 font-semibold">
                      {formatBDT(req.estimatedOfferMin)} - {formatBDT(req.estimatedOfferMax)}
                    </td>
                    <td className="p-3">
                      <select
                        value={req.status}
                        onChange={(e) => onUpdateSellStatus(req.id, e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Inspection Scheduled">Inspection Scheduled</option>
                        <option value="Offer Made">Offer Made</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(req.sellerName)},%20we%20reviewed%20your%20bike%20sell%20request%20at%20Ma%20Motors.`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-emerald-950 border border-emerald-500/30 text-emerald-400 rounded hover:bg-emerald-900/60 font-semibold text-[11px] inline-block font-sans"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record New Sale Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-bold text-white">
                Record Bike Sale
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSale} className="p-4 sm:p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
              <div className="text-xs">
                <label className="text-slate-400 block mb-1">Select Bike from In-Stock</label>
                <select
                  value={selectedBikeId}
                  onChange={(e) => handleBikeChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500 font-medium"
                >
                  {availableBikes.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.regNumber}) - Asking: {formatBDT(b.askingPrice || b.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Buyer Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Buyer Name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Buyer Phone</label>
                  <input
                    type="text"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+880 1..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Buyer Address</label>
                  <input
                    type="text"
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    placeholder="e.g. Dhaka"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Buyer NID</label>
                  <input
                    type="text"
                    value={buyerNid}
                    onChange={(e) => setBuyerNid(e.target.value)}
                    placeholder="NID Number"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <label className="text-slate-400 block mb-1">Sale Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={salePrice}
                    onChange={(e) => setSalePrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 font-mono font-bold focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Calculated Profit</label>
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400 font-mono font-bold">
                    +{formatBDT(profit)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="EMI Financing">Financing / EMI</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Warranty</label>
                  <select
                    value={warrantyMonths}
                    onChange={(e) => setWarrantyMonths(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={6}>6 Months</option>
                    <option value={12}>12 Months (1 Year)</option>
                    <option value={24}>24 Months (2 Years)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
                >
                  Complete Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Memo Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white">Sales Invoice</h4>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-white font-bold font-sans">Ma Motors</span>
                <span className="text-cyan-400 font-bold">{selectedInvoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span className="text-white">{selectedInvoice.saleDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bike:</span>
                <span className="text-white font-semibold">{selectedInvoice.bikeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Reg No:</span>
                <span className="text-white">{selectedInvoice.regNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Buyer:</span>
                <span className="text-white">{selectedInvoice.buyerName} ({selectedInvoice.buyerPhone})</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 font-bold">
                <span className="text-slate-400">Amount Paid:</span>
                <span className="text-emerald-400">{formatBDT(selectedInvoice.salePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Profit Realized:</span>
                <span className="text-cyan-400">+{formatBDT(selectedInvoice.profit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment:</span>
                <span className="text-slate-300">{selectedInvoice.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Warranty:</span>
                <span className="text-slate-300">{selectedInvoice.warrantyMonths} Months</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
