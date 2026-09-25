import React, { useState } from 'react';
import { PurchaseRecord, ConditionGrade } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { 
  Search, 
  Plus, 
  FileText, 
  X, 
  Trash2
} from 'lucide-react';

interface PurchaseViewProps {
  purchases: PurchaseRecord[];
  onAddPurchase: (record: PurchaseRecord, alsoAddToStock: boolean) => void;
  onDeletePurchase: (id: string) => void;
  isAddModalOpen?: boolean;
  onCloseAddModal?: () => void;
}

export const PurchaseView: React.FC<PurchaseViewProps> = ({
  purchases,
  onAddPurchase,
  onDeletePurchase,
  isAddModalOpen = false,
  onCloseAddModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(isAddModalOpen);
  const [selectedRecord, setSelectedRecord] = useState<PurchaseRecord | null>(null);

  // Form states
  const [formBrand, setFormBrand] = useState('Yamaha');
  const [formModel, setFormModel] = useState('');
  const [formBikeName, setFormBikeName] = useState('');
  const [formMfgYear, setFormMfgYear] = useState(2023);
  const [formRegYear, setFormRegYear] = useState(2023);
  const [formRegNumber, setFormRegNumber] = useState('');
  const [formSellerName, setFormSellerName] = useState('');
  const [formSellerPhone, setFormSellerPhone] = useState('');
  const [formSellerAddress, setFormSellerAddress] = useState('Dhaka');
  const [formPurchasePrice, setFormPurchasePrice] = useState(260000);
  const [formEstimatedSellPrice, setFormEstimatedSellPrice] = useState(310000);
  const [formPaymentMethod, setFormPaymentMethod] = useState<'Bank Transfer' | 'Cash' | 'Cheque'>('Bank Transfer');
  const [formDocStatus, setFormDocStatus] = useState<'BRTA Papers Verified' | 'Pending Transfer' | 'Original Smart Card Received'>('BRTA Papers Verified');
  const [formConditionGrade, setFormConditionGrade] = useState<ConditionGrade>('A');
  const [formMileageKm, setFormMileageKm] = useState(7000);
  const [alsoAddToStock, setAlsoAddToStock] = useState(true);

  const filteredPurchases = purchases.filter((p) => {
    const matchesSearch = 
      p.bikeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sellerPhone.includes(searchQuery) ||
      p.regNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || p.documentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalInvestment = purchases.reduce((sum, p) => sum + p.purchasePrice, 0);
  const totalProjectedSelling = purchases.reduce((sum, p) => sum + p.estimatedSellingPrice, 0);
  const projectedGrossProfit = totalProjectedSelling - totalInvestment;
  const avgPurchaseCost = purchases.length > 0 ? Math.round(totalInvestment / purchases.length) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: PurchaseRecord = {
      id: `pur-${Date.now()}`,
      bikeName: formBikeName || `${formBrand} ${formModel}`,
      brand: formBrand,
      model: formModel || 'Standard',
      mfgYear: formMfgYear,
      regYear: formRegYear,
      regNumber: formRegNumber,
      sellerName: formSellerName,
      sellerPhone: formSellerPhone,
      sellerAddress: formSellerAddress,
      purchaseDate: new Date().toISOString().split('T')[0],
      purchasePrice: formPurchasePrice,
      estimatedSellingPrice: formEstimatedSellPrice,
      paymentMethod: formPaymentMethod,
      documentStatus: formDocStatus,
      conditionGrade: formConditionGrade,
      mileageKm: formMileageKm,
      notes: 'Purchased for showroom inventory.'
    };

    onAddPurchase(newRecord, alsoAddToStock);
    setIsModalOpen(false);
    if (onCloseAddModal) onCloseAddModal();
  };

  const openNewModal = () => {
    setFormBrand('Yamaha');
    setFormModel('');
    setFormBikeName('');
    setFormMfgYear(2023);
    setFormRegYear(2023);
    setFormRegNumber(`Dhaka Metro-LA-${Math.floor(10 + Math.random() * 89)}-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormSellerName('');
    setFormSellerPhone('+880 1');
    setFormSellerAddress('Dhaka');
    setFormPurchasePrice(260000);
    setFormEstimatedSellPrice(310000);
    setFormPaymentMethod('Bank Transfer');
    setFormDocStatus('BRTA Papers Verified');
    setFormConditionGrade('A');
    setFormMileageKm(8000);
    setAlsoAddToStock(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
            Purchase (শো-রুমের জন্য বাইক ক্রয়)
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            শো-রুমের স্টক সমৃদ্ধ করতে বিক্রেতা ও রাইডারদের কাছ থেকে বাইক কেনা ও খরচের হিসাব
          </p>
        </div>

        <button
          onClick={openNewModal}
          className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>+ নতুন বাইক ক্রয় এন্ট্রি</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-slate-400">Total Purchases</div>
          <div className="text-xl font-bold text-white font-mono mt-1">
            {formatBDT(totalInvestment)}
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">{purchases.length} bikes</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-slate-400">Average Cost</div>
          <div className="text-xl font-bold text-slate-300 font-mono mt-1">
            {formatBDT(avgPurchaseCost)}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-slate-400">Expected Selling</div>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
            {formatBDT(totalProjectedSelling)}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl">
          <div className="text-[11px] text-slate-400">Projected Margin</div>
          <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
            +{formatBDT(projectedGrossProfit)}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="relative w-full sm:max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bike, seller, reg..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
          <span className="text-slate-500 text-[11px] mr-1 shrink-0">Doc:</span>
          {['ALL', 'BRTA Papers Verified', 'Original Smart Card Received', 'Pending Transfer'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-md text-[11px] shrink-0 transition-colors border ${
                statusFilter === st
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-semibold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {st === 'ALL' ? 'All' : st.replace(' Received', '').replace('BRTA ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Purchases Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 text-[11px] border-b border-slate-800 uppercase tracking-wider font-mono">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Bike</th>
                <th className="p-3">Reg No</th>
                <th className="p-3">Seller</th>
                <th className="p-3">Cost (৳)</th>
                <th className="p-3">Est. Sell</th>
                <th className="p-3">Margin</th>
                <th className="p-3">Payment</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredPurchases.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400 font-sans text-xs">
                    No purchase records found.
                  </td>
                </tr>
              ) : (
                filteredPurchases.map((pur) => {
                  const margin = pur.estimatedSellingPrice - pur.purchasePrice;
                  return (
                    <tr key={pur.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3 text-slate-400 whitespace-nowrap">
                        {pur.purchaseDate}
                      </td>
                      <td className="p-3 font-sans">
                        <div className="font-semibold text-white">
                          {pur.bikeName}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {pur.brand} · MFG {pur.mfgYear}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="bg-slate-950 px-2 py-0.5 rounded text-cyan-400 font-medium border border-slate-800 text-[11px]">
                          {pur.regNumber}
                        </span>
                      </td>
                      <td className="p-3 font-sans">
                        <div className="text-slate-200">{pur.sellerName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{pur.sellerPhone}</div>
                      </td>
                      <td className="p-3 font-semibold text-slate-200">
                        {formatBDT(pur.purchasePrice)}
                      </td>
                      <td className="p-3 font-semibold text-emerald-400">
                        {formatBDT(pur.estimatedSellingPrice)}
                      </td>
                      <td className="p-3 font-semibold text-cyan-400">
                        +{formatBDT(margin)}
                      </td>
                      <td className="p-3">
                        <span className="bg-slate-950 px-2 py-0.5 rounded text-slate-300 text-[10px] border border-slate-800">
                          {pur.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedRecord(pur)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                            title="Receipt"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeletePurchase(pur.id)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Purchase Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <h3 className="text-sm font-bold text-white">
                Record New Purchase
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  if (onCloseAddModal) onCloseAddModal();
                }}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
              {/* Bike details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Brand</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {['Yamaha', 'Honda', 'Bajaj', 'Suzuki', 'TVS', 'KTM', 'Royal Enfield', 'Hero'].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Model</label>
                  <input
                    type="text"
                    required
                    value={formModel}
                    onChange={(e) => setFormModel(e.target.value)}
                    placeholder="e.g. FZ-S V3"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-slate-400 block mb-1">Bike Title</label>
                <input
                  type="text"
                  required
                  value={formBikeName}
                  onChange={(e) => setFormBikeName(e.target.value)}
                  placeholder="e.g. Yamaha FZ-S V3 Fi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">MFG / Reg Year</label>
                  <input
                    type="number"
                    value={formRegYear}
                    onChange={(e) => setFormRegYear(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Reg Number</label>
                  <input
                    type="text"
                    required
                    value={formRegNumber}
                    onChange={(e) => setFormRegNumber(e.target.value)}
                    placeholder="Dhaka Metro-LA-55-9012"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Seller details */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800">
                <div>
                  <label className="text-slate-400 block mb-1">Seller Name</label>
                  <input
                    type="text"
                    required
                    value={formSellerName}
                    onChange={(e) => setFormSellerName(e.target.value)}
                    placeholder="Seller Name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Seller Phone</label>
                  <input
                    type="text"
                    required
                    value={formSellerPhone}
                    onChange={(e) => setFormSellerPhone(e.target.value)}
                    placeholder="+880 1..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <label className="text-slate-400 block mb-1">Purchase Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={formPurchasePrice}
                    onChange={(e) => setFormPurchasePrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Expected Selling (৳)</label>
                  <input
                    type="number"
                    required
                    value={formEstimatedSellPrice}
                    onChange={(e) => setFormEstimatedSellPrice(Number(e.target.value))}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Payment Method</label>
                  <select
                    value={formPaymentMethod}
                    onChange={(e) => setFormPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cash">Cash</option>
                    <option value="Cheque">Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Document Status</label>
                  <select
                    value={formDocStatus}
                    onChange={(e) => setFormDocStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="BRTA Papers Verified">BRTA Papers Verified</option>
                    <option value="Original Smart Card Received">Original Smart Card Received</option>
                    <option value="Pending Transfer">Pending Transfer</option>
                  </select>
                </div>
              </div>

              {/* Add to stock checkbox */}
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300">Also add this bike to Stock inventory</span>
                <input
                  type="checkbox"
                  checked={alsoAddToStock}
                  onChange={(e) => setAlsoAddToStock(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    if (onCloseAddModal) onCloseAddModal();
                  }}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Purchase Memo Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white">Purchase Voucher</h4>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Date:</span>
                <span className="text-white">{selectedRecord.purchaseDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Bike:</span>
                <span className="text-cyan-400 font-semibold">{selectedRecord.bikeName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Reg:</span>
                <span className="text-white">{selectedRecord.regNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seller:</span>
                <span className="text-white">{selectedRecord.sellerName} ({selectedRecord.sellerPhone})</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2 font-bold">
                <span className="text-slate-400">Purchase Cost:</span>
                <span className="text-white">{formatBDT(selectedRecord.purchasePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment:</span>
                <span className="text-emerald-400">{selectedRecord.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Docs:</span>
                <span className="text-cyan-400">{selectedRecord.documentStatus}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
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
