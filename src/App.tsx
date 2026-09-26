import React, { useState, useEffect, useRef } from 'react';
import { 
  Bike, 
  ActivePage, 
  CustomerInquiry, 
  SellBikeSubmission,
  PurchaseRecord,
  SaleRecord,
  ShowroomSettings
} from './types/bike';
import { 
  INITIAL_BIKES, 
  INITIAL_INQUIRIES, 
  INITIAL_SELL_REQUESTS,
  INITIAL_PURCHASES,
  INITIAL_SALES,
  DEFAULT_SETTINGS
} from './data/mockBikes';
import { findModelSpec, getModelDefaultImage, getModelDefaultBrakingSystem } from './data/bangladeshBikes';

import { AppSidebar } from './components/layout/AppSidebar';
import { AppTopBar } from './components/layout/AppTopBar';

import { DashboardView } from './pages/DashboardView';
import { StockView } from './pages/StockView';
import { PurchaseView } from './pages/PurchaseView';
import { SellView } from './pages/SellView';
import { ContactView } from './pages/ContactView';
import { SettingsView } from './pages/SettingsView';
import { BikeDetailView } from './pages/BikeDetailView';
import { AdditionalCostPage } from './pages/AdditionalCostPage';
import { AddBikePage } from './pages/AddBikePage';

export default function App() {
  // Navigation: Default to 'dashboard' (Option 1)
  const [currentPage, setCurrentPage] = useState<ActivePage>('dashboard');
  // Sidebar hidden by default on all devices like mobile view
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Reference to main scroll container to ensure scroll resets to top upon navigation
  const mainScrollRef = useRef<HTMLElement>(null);

  // Core Data States
  const [bikes, setBikes] = useState<Bike[]>(INITIAL_BIKES);
  const [purchases, setPurchases] = useState<PurchaseRecord[]>(INITIAL_PURCHASES);
  const [sales, setSales] = useState<SaleRecord[]>(INITIAL_SALES);
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(INITIAL_INQUIRIES);
  const [sellRequests, setSellRequests] = useState<SellBikeSubmission[]>(INITIAL_SELL_REQUESTS);
  const [settings, setSettings] = useState<ShowroomSettings>(DEFAULT_SETTINGS);

  // Selected bike for detailed technical view
  const [selectedBike, setSelectedBike] = useState<Bike | null>(INITIAL_BIKES[0]);

  // Quick modals triggers from TopBar
  const [isStockAddModalOpen, setIsStockAddModalOpen] = useState(false);
  const [isPurchaseAddModalOpen, setIsPurchaseAddModalOpen] = useState(false);

  // Scroll to top on page navigation so user always starts from the top of the page
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  const handleNavigate = (page: ActivePage) => {
    setCurrentPage(page);
    setSidebarOpen(false); // Hide sidebar immediately upon clicking any option
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  };

  // Bike Inspection & Specs viewer
  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    setCurrentPage('details');
  };

  // Stock operations
  const handleAddBikeToStock = (newBike: Bike) => {
    setBikes((prev) => [newBike, ...prev]);
  };

  const handleUpdateBike = (updatedBike: Bike) => {
    setBikes((prev) => prev.map((b) => (b.id === updatedBike.id ? updatedBike : b)));
    if (selectedBike?.id === updatedBike.id) {
      setSelectedBike(updatedBike);
    }
  };

  const handleDeleteBike = (bikeId: string) => {
    setBikes((prev) => prev.filter((b) => b.id !== bikeId));
  };

  // Purchase operations (Option 3)
  const handleAddPurchase = (record: PurchaseRecord, alsoAddToStock: boolean) => {
    setPurchases((prev) => [record, ...prev]);

    if (alsoAddToStock) {
      const spec = findModelSpec(record.brand, record.model);
      const defaultImg = spec?.image || getModelDefaultImage(record.brand, record.model);
      const fuelSupply = spec?.fuelSupply || 'FI';
      const effectiveCc = spec?.cc || 150;
      const category = spec?.category || 'Sport';

      const newBike: Bike = {
        id: `bike-${Date.now()}`,
        name: record.bikeName,
        brand: record.brand,
        model: record.model,
        mfgYear: record.mfgYear,
        regYear: record.regYear,
        year: record.mfgYear,
        regNumber: record.regNumber,
        buyingPrice: record.purchasePrice,
        askingPrice: record.estimatedSellingPrice,
        price: record.estimatedSellingPrice,
        originalPrice: Math.round(record.estimatedSellingPrice * 1.15),
        cc: effectiveCc,
        mileageKm: record.mileageKm,
        conditionGrade: record.conditionGrade,
        conditionLabel: record.conditionGrade === 'A+' ? 'Showroom Mint' : 'Inspected Good',
        fuelType: spec?.fuelType || 'Petrol',
        fuelSupply,
        brakingSystem: getModelDefaultBrakingSystem(record.brand, record.model, effectiveCc),
        transmission: 'Manual',
        color: 'Showroom Verified',
        colorHex: '#06b6d4',
        category,
        featured: false,
        inStock: true,
        status: 'Available',
        registrationYear: record.regYear,
        registrationCity: 'Dhaka North',
        ownersCount: 1,
        warrantyMonths: 12,
        images: [defaultImg],
        documentPdfName: 'BRTA_Procurement_Record.pdf',
        specs: {
          engine: `${effectiveCc}cc ${fuelSupply} 4-Stroke Engine`,
          maxPower: `${Math.round(effectiveCc / 9)} HP`,
          maxTorque: `${Math.round(effectiveCc / 11)} Nm`,
          fuelTankCapacity: '12 L',
          topSpeed: `${effectiveCc >= 200 ? 145 : effectiveCc >= 150 ? 132 : 105} km/h`,
          curbWeight: `${effectiveCc >= 200 ? 165 : 138} kg`,
          seatHeight: '800 mm',
          frontBrake: 'Disc ABS',
          rearBrake: 'Disc',
          absType: effectiveCc >= 150 ? 'Single/Dual ABS' : 'Standard Disc',
          brakingSystem: getModelDefaultBrakingSystem(record.brand, record.model, effectiveCc),
          fuelSupply,
          tyreConditionPct: 92,
          batteryHealthPct: 96
        },
        inspection: {
          overallScore: 94,
          engineHealth: 96,
          chassisFrame: 100,
          tyresSuspension: 92,
          electricals: 96,
          bodyPaint: 94,
          scratchesNotes: 'Zero chassis damage, smooth body paint',
          tyresNotes: 'Good condition',
          engineNotes: 'Clean engine compression',
          documentsVerified: true,
          registrationNumber: record.regNumber,
          taxTokenValidUntil: '2027-12-31',
          insuranceValidUntil: '2026-11-30',
          fitnessValidUntil: '2027-12-31',
          ownershipTransferGuaranteed: true
        }
      };
      setBikes((prev) => [newBike, ...prev]);
    }
  };

  const handleDeletePurchase = (id: string) => {
    setPurchases((prev) => prev.filter((p) => p.id !== id));
  };

  // Sell operations (Option 4)
  const handleAddSale = (sale: SaleRecord) => {
    setSales((prev) => [sale, ...prev]);
    // Automatically mark the sold bike as 'Sold' in stock
    setBikes((prev) =>
      prev.map((b) => (b.id === sale.bikeId ? { ...b, status: 'Sold', inStock: false } : b))
    );
  };

  const handleUpdateSellRequestStatus = (id: string, status: SellBikeSubmission['status']) => {
    setSellRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  // Contact operations (Option 5)
  const handleUpdateInquiryStatus = (id: string, status: CustomerInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const handleAddInquiry = (inquiryData: Omit<CustomerInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: CustomerInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  // Settings operations (Option 6)
  const handleUpdateSettings = (newSettings: ShowroomSettings) => {
    setSettings(newSettings);
  };

  const handleResetDemoData = () => {
    setBikes(INITIAL_BIKES);
    setPurchases(INITIAL_PURCHASES);
    setSales(INITIAL_SALES);
    setInquiries(INITIAL_INQUIRIES);
    setSellRequests(INITIAL_SELL_REQUESTS);
    setSettings(DEFAULT_SETTINGS);
  };

  // Counts for sidebar and topbar
  const inStockCount = bikes.filter((b) => b.status !== 'Sold').length;
  const totalInvestment = purchases.reduce((sum, p) => sum + p.purchasePrice, 0);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Dedicated Full-Page Add Bike View (Scrollable full height dedicated page)
  if (currentPage === 'add-bike') {
    return (
      <div key="add-bike-page" className="animate-page-enter fixed inset-0 w-screen h-screen overflow-y-auto overflow-x-hidden bg-slate-950">
        <AddBikePage
          onBack={() => setCurrentPage('stock')}
          onAddBike={(newBike) => {
            handleAddBikeToStock(newBike);
          }}
          showroomName={settings.showroomName || 'Ma Motors'}
          logoUrl={settings.logoUrl}
        />
      </div>
    );
  }

  // Dedicated Full-Page Additional Cost Management View (Scrollable full height dedicated page)
  if (currentPage === 'cost' && selectedBike) {
    return (
      <div key={`cost-${selectedBike.id}`} className="animate-page-enter fixed inset-0 w-screen h-screen overflow-y-auto overflow-x-hidden bg-slate-950">
        <AdditionalCostPage
          bike={selectedBike}
          onBack={() => setCurrentPage('details')}
          onUpdateBike={(updatedBike) => {
            handleUpdateBike(updatedBike);
            setSelectedBike(updatedBike);
          }}
          showroomName={settings.showroomName || 'Ma Motors'}
          logoUrl={settings.logoUrl}
        />
      </div>
    );
  }

  // Dedicated Full-Page Bike Details View (Scrollable full height dedicated page)
  if (currentPage === 'details' && selectedBike) {
    return (
      <div key={`details-${selectedBike.id}`} className="animate-page-enter fixed inset-0 w-screen h-screen overflow-y-auto overflow-x-hidden bg-slate-950">
        <BikeDetailView
          bike={selectedBike}
          onBack={() => setCurrentPage('stock')}
          onUpdateBike={(updatedBike) => {
            handleUpdateBike(updatedBike);
            setSelectedBike(updatedBike);
          }}
          onRecordSale={(sale) => {
            handleAddSale(sale);
            const updatedBike: Bike = {
              ...selectedBike,
              status: 'Sold',
              inStock: false
            };
            handleUpdateBike(updatedBike);
            setSelectedBike(updatedBike);
          }}
          onNavigateToSales={() => setCurrentPage('sell')}
          onNavigateToCost={() => setCurrentPage('cost')}
          showroomName={settings.showroomName || 'Ma Motors'}
          logoUrl={settings.logoUrl}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-row font-sans select-none">
      <AppSidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        bikesCount={bikes.length}
        inStockCount={inStockCount}
        inquiriesCount={inquiries.length}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        showroomName={settings.showroomName || 'Ma Motors'}
        logoUrl={settings.logoUrl}
        hotline={settings.hotline}
        address={settings.address}
      />

      {/* Main Content Area - In flex-row, so desktop push sidebar never obscures right side content! */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden transition-all duration-300 relative">
        {/* Top Bar with 3-bar toggle button, page title, quick actions & hotline - Permanently Fixed */}
        <div className="shrink-0 z-30 w-full">
          <AppTopBar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenMobileSidebar={() => setSidebarOpen(true)}
            onToggleSidebar={handleToggleSidebar}
            onQuickAddBike={() => setIsStockAddModalOpen(true)}
            onQuickAddPurchase={() => setIsPurchaseAddModalOpen(true)}
            inStockCount={inStockCount}
            totalInvestment={totalInvestment}
            hotline={settings.hotline}
            showroomName={settings.showroomName || 'Ma Motors'}
            logoUrl={settings.logoUrl}
          />
        </div>

        {/* Viewport for the 6 Sidebar Modules with Page Entrance Animation */}
        <main ref={mainScrollRef} className="flex-1 bg-slate-950 overflow-y-auto overflow-x-hidden min-h-0">
          <div key={currentPage} className="animate-page-enter w-full min-h-full">
            {/* 1. Dashboard */}
            {(currentPage === 'dashboard' || currentPage === 'home') && (
              <DashboardView
                bikes={bikes}
                purchases={purchases}
                sales={sales}
                inquiries={inquiries}
                onNavigate={handleNavigate}
                onSelectBike={handleSelectBike}
                onOpenAddBikeModal={() => {
                  setCurrentPage('stock');
                  setIsStockAddModalOpen(true);
                }}
                onOpenAddPurchaseModal={() => {
                  setCurrentPage('purchase');
                  setIsPurchaseAddModalOpen(true);
                }}
              />
            )}

            {/* 2. Stock (ki ki bike stock e ase) */}
            {(currentPage === 'stock' || currentPage === 'inventory') && (
              <StockView
                bikes={bikes}
                onSelectBike={handleSelectBike}
                onAddBike={handleAddBikeToStock}
                onUpdateBike={handleUpdateBike}
                onDeleteBike={handleDeleteBike}
                onNavigateToDetails={() => setCurrentPage('details')}
                onNavigateToAddBike={() => setCurrentPage('add-bike')}
                isAddModalOpen={isStockAddModalOpen}
                onCloseAddModal={() => setIsStockAddModalOpen(false)}
              />
            )}

            {/* 3. Purchase */}
            {currentPage === 'purchase' && (
              <PurchaseView
                purchases={purchases}
                onAddPurchase={handleAddPurchase}
                onDeletePurchase={handleDeletePurchase}
                isAddModalOpen={isPurchaseAddModalOpen}
                onCloseAddModal={() => setIsPurchaseAddModalOpen(false)}
              />
            )}

            {/* 4. Sell */}
            {currentPage === 'sell' && (
              <SellView
                sales={sales}
                sellRequests={sellRequests}
                bikes={bikes}
                onAddSale={handleAddSale}
                onUpdateSellStatus={handleUpdateSellRequestStatus}
              />
            )}

            {/* 5. Contact */}
            {currentPage === 'contact' && (
              <ContactView
                inquiries={inquiries}
                onUpdateInquiryStatus={handleUpdateInquiryStatus}
                onSubmitInquiry={handleAddInquiry}
                settings={settings}
              />
            )}

            {/* 6. Settings */}
            {currentPage === 'settings' && (
              <SettingsView
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onResetDemoData={handleResetDemoData}
                bikesCount={bikes.length}
                purchasesCount={purchases.length}
                salesCount={sales.length}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
