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
import { 
  supabase,
  deserializeBikeFromSupabase,
  serializeBikeToSupabase,
  deserializePurchaseFromSupabase,
  serializePurchaseToSupabase,
  deserializeSaleFromSupabase,
  serializeSaleToSupabase,
  deserializeInquiryFromSupabase,
  serializeInquiryToSupabase,
  deserializeSellRequestFromSupabase,
  serializeSellRequestToSupabase,
  deserializeSettingsFromSupabase,
  serializeSettingsToSupabase
} from './utils/supabase';

import { AppSidebar } from './components/layout/AppSidebar';
import { AppTopBar } from './components/layout/AppTopBar';
import { useAuth } from './context/AuthContext';
import { AdminRestrictedNotice } from './components/common/AdminRestrictedNotice';

import { DashboardView } from './pages/DashboardView';
import { StockView } from './pages/StockView';
import { PurchaseView } from './pages/PurchaseView';
import { SellView } from './pages/SellView';
import { ContactView } from './pages/ContactView';
import { SettingsView } from './pages/SettingsView';
import { BikeDetailView } from './pages/BikeDetailView';
import { AdditionalCostPage } from './pages/AdditionalCostPage';
import { AddBikePage } from './pages/AddBikePage';
import { AdminPage } from './pages/AdminPage';
import { AdminPinModal } from './components/modals/AdminPinModal';

export default function App() {
  const { 
    isAdmin, 
    isPinModalOpen, 
    closePinModal, 
    openPinModal, 
    verifyAdminPin 
  } = useAuth();

  // Navigation: Default to 'dashboard' if admin, or 'stock' (Our Collection) for customers
  const [currentPage, setCurrentPage] = useState<ActivePage>(() => {
    try {
      const isPinAuthed = localStorage.getItem('mamotors_admin_pin_session') === 'true';
      return isPinAuthed ? 'dashboard' : 'stock';
    } catch {
      return 'stock';
    }
  });

  // Automatically redirect customer to 'stock' if on 'dashboard'
  useEffect(() => {
    if (!isAdmin && (currentPage === 'dashboard' || currentPage === 'home')) {
      setCurrentPage('stock');
    }
  }, [isAdmin, currentPage]);

  // Sidebar hidden by default on all devices like mobile view
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Reference to main scroll container to ensure scroll resets to top upon navigation
  const mainScrollRef = useRef<HTMLElement>(null);

  // Storage Keys for persistent storage
  const STORAGE_KEYS = {
    BIKES: 'mamotors_bikes_v2',
    PURCHASES: 'mamotors_purchases_v2',
    SALES: 'mamotors_sales_v2',
    INQUIRIES: 'mamotors_inquiries_v2',
    SELL_REQUESTS: 'mamotors_sell_requests_v2',
    SETTINGS: 'mamotors_settings_v2'
  };

  // Core Data States with localStorage persistence
  const [bikes, setBikes] = useState<Bike[]>(() => {
    try {
      const saved = localStorage.getItem('mamotors_bikes_v2');
      return saved ? JSON.parse(saved) : INITIAL_BIKES;
    } catch {
      return INITIAL_BIKES;
    }
  });

  const [purchases, setPurchases] = useState<PurchaseRecord[]>(() => {
    try {
      const saved = localStorage.getItem('mamotors_purchases_v2');
      return saved ? JSON.parse(saved) : INITIAL_PURCHASES;
    } catch {
      return INITIAL_PURCHASES;
    }
  });

  const [sales, setSales] = useState<SaleRecord[]>(() => {
    try {
      const saved = localStorage.getItem('mamotors_sales_v2');
      return saved ? JSON.parse(saved) : INITIAL_SALES;
    } catch {
      return INITIAL_SALES;
    }
  });

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('mamotors_inquiries_v2');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [sellRequests, setSellRequests] = useState<SellBikeSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('mamotors_sell_requests_v2');
      return saved ? JSON.parse(saved) : INITIAL_SELL_REQUESTS;
    } catch {
      return INITIAL_SELL_REQUESTS;
    }
  });

  const [settings, setSettings] = useState<ShowroomSettings>(() => {
    try {
      const saved = localStorage.getItem('mamotors_settings_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Default logo removed - clear previous temporary logo file references if any
        if (parsed.logoUrl === '/app-logo.jpg' || parsed.logoUrl === '/logo.svg') {
          parsed.logoUrl = '';
        }
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  // Sync state changes automatically to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BIKES, JSON.stringify(bikes));
    } catch (err) {
      console.warn('LocalStorage save error (bikes):', err);
    }
  }, [bikes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
    } catch (err) {
      console.warn('LocalStorage save error (purchases):', err);
    }
  }, [purchases]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
    } catch (err) {
      console.warn('LocalStorage save error (sales):', err);
    }
  }, [sales]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (err) {
      console.warn('LocalStorage save error (inquiries):', err);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SELL_REQUESTS, JSON.stringify(sellRequests));
    } catch (err) {
      console.warn('LocalStorage save error (sellRequests):', err);
    }
  }, [sellRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (err) {
      console.warn('LocalStorage save error (settings):', err);
    }
  }, [settings]);

  // Initial Supabase Data Fetch & Realtime Listeners
  useEffect(() => {
    let isMounted = true;

    const fetchSupabaseData = async () => {
      try {
        const [bRes, pRes, sRes, inqRes, srRes, setRes] = await Promise.all([
          supabase.from('bikes').select('*').order('created_at', { ascending: false }),
          supabase.from('purchases').select('*').order('created_at', { ascending: false }),
          supabase.from('sales').select('*').order('created_at', { ascending: false }),
          supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
          supabase.from('sell_requests').select('*').order('created_at', { ascending: false }),
          supabase.from('settings').select('*').eq('id', 'main_settings').single()
        ]);

        if (!isMounted) return;

        if (bRes.data && bRes.data.length > 0) {
          const parsedBikes = bRes.data.map(deserializeBikeFromSupabase);
          setBikes(parsedBikes);
          setSelectedBike((prev) => prev ? (parsedBikes.find(b => b.id === prev.id) || parsedBikes[0]) : parsedBikes[0]);
        }
        if (pRes.data && pRes.data.length > 0) {
          setPurchases(pRes.data.map(deserializePurchaseFromSupabase));
        }
        if (sRes.data && sRes.data.length > 0) {
          setSales(sRes.data.map(deserializeSaleFromSupabase));
        }
        if (inqRes.data && inqRes.data.length > 0) {
          setInquiries(inqRes.data.map(deserializeInquiryFromSupabase));
        }
        if (srRes.data && srRes.data.length > 0) {
          setSellRequests(srRes.data.map(deserializeSellRequestFromSupabase));
        }
        if (setRes.data) {
          setSettings(deserializeSettingsFromSupabase(setRes.data));
        }
      } catch (err) {
        console.warn('Supabase initial fetch, continuing with cache:', err);
      }
    };

    fetchSupabaseData();

    // Supabase Real-time Changes Subscription
    const channel = supabase
      .channel('mamotors-live-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bikes' }, () => {
        supabase.from('bikes').select('*').order('created_at', { ascending: false }).then(({ data }) => {
          if (data && data.length > 0 && isMounted) {
            setBikes(data.map(deserializeBikeFromSupabase));
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'purchases' }, () => {
        supabase.from('purchases').select('*').order('created_at', { ascending: false }).then(({ data }) => {
          if (data && isMounted) {
            setPurchases(data.map(deserializePurchaseFromSupabase));
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sales' }, () => {
        supabase.from('sales').select('*').order('created_at', { ascending: false }).then(({ data }) => {
          if (data && isMounted) {
            setSales(data.map(deserializeSaleFromSupabase));
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inquiries' }, () => {
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }).then(({ data }) => {
          if (data && isMounted) {
            setInquiries(data.map(deserializeInquiryFromSupabase));
          }
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sell_requests' }, () => {
        supabase.from('sell_requests').select('*').order('created_at', { ascending: false }).then(({ data }) => {
          if (data && isMounted) {
            setSellRequests(data.map(deserializeSellRequestFromSupabase));
          }
        });
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

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

  // Stock operations (Synced with Supabase Cloud)
  const handleAddBikeToStock = async (newBike: Bike) => {
    setBikes((prev) => [newBike, ...prev]);
    try {
      const payload = serializeBikeToSupabase(newBike);
      const { data, error } = await supabase.from('bikes').insert([payload]).select();
      if (data && data[0]) {
        const cloudBike = deserializeBikeFromSupabase(data[0]);
        setBikes((prev) => [cloudBike, ...prev.filter((b) => b.id !== newBike.id)]);
      }
      if (error) console.warn('Supabase add bike error:', error.message);
    } catch (err) {
      console.warn('Supabase add bike exception:', err);
    }
  };

  const handleUpdateBike = async (updatedBike: Bike) => {
    setBikes((prev) => prev.map((b) => (b.id === updatedBike.id ? updatedBike : b)));
    if (selectedBike?.id === updatedBike.id) {
      setSelectedBike(updatedBike);
    }
    try {
      const payload = serializeBikeToSupabase(updatedBike);
      const { error } = await supabase.from('bikes').update(payload).eq('id', updatedBike.id);
      if (error) console.warn('Supabase update bike error:', error.message);
    } catch (err) {
      console.warn('Supabase update bike exception:', err);
    }
  };

  const handleDeleteBike = async (bikeId: string) => {
    setBikes((prev) => prev.filter((b) => b.id !== bikeId));
    try {
      const { error } = await supabase.from('bikes').delete().eq('id', bikeId);
      if (error) console.warn('Supabase delete bike error:', error.message);
    } catch (err) {
      console.warn('Supabase delete bike exception:', err);
    }
  };

  // Purchase operations (Option 3 - Synced with Supabase Cloud)
  const handleAddPurchase = async (record: PurchaseRecord, alsoAddToStock: boolean) => {
    setPurchases((prev) => [record, ...prev]);
    try {
      const payload = serializePurchaseToSupabase(record);
      const { error } = await supabase.from('purchases').insert([payload]);
      if (error) console.warn('Supabase add purchase error:', error.message);
    } catch (err) {
      console.warn('Supabase add purchase exception:', err);
    }

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
      handleAddBikeToStock(newBike);
    }
  };

  const handleDeletePurchase = async (id: string) => {
    setPurchases((prev) => prev.filter((p) => p.id !== id));
    try {
      const { error } = await supabase.from('purchases').delete().eq('id', id);
      if (error) console.warn('Supabase delete purchase error:', error.message);
    } catch (err) {
      console.warn('Supabase delete purchase exception:', err);
    }
  };

  // Sell operations (Option 4 - Synced with Supabase Cloud)
  const handleAddSale = async (sale: SaleRecord) => {
    setSales((prev) => [sale, ...prev]);
    // Automatically mark the sold bike as 'Sold' in stock
    setBikes((prev) =>
      prev.map((b) => (b.id === sale.bikeId ? { ...b, status: 'Sold', inStock: false } : b))
    );
    try {
      const payload = serializeSaleToSupabase(sale);
      const { error } = await supabase.from('sales').insert([payload]);
      if (error) console.warn('Supabase add sale error:', error.message);
      if (sale.bikeId) {
        await supabase.from('bikes').update({ status: 'sold' }).eq('id', sale.bikeId);
      }
    } catch (err) {
      console.warn('Supabase add sale exception:', err);
    }
  };

  const handleUpdateSellRequestStatus = async (id: string, status: SellBikeSubmission['status']) => {
    setSellRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
    try {
      const { error } = await supabase.from('sell_requests').update({ status: status.toLowerCase() }).eq('id', id);
      if (error) console.warn('Supabase update sell request error:', error.message);
    } catch (err) {
      console.warn('Supabase update sell request exception:', err);
    }
  };

  // Contact operations (Option 5 - Synced with Supabase Cloud)
  const handleUpdateInquiryStatus = async (id: string, status: CustomerInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    try {
      const { error } = await supabase.from('inquiries').update({ status: status.toLowerCase() }).eq('id', id);
      if (error) console.warn('Supabase update inquiry error:', error.message);
    } catch (err) {
      console.warn('Supabase update inquiry exception:', err);
    }
  };

  const handleAddInquiry = async (inquiryData: Omit<CustomerInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: CustomerInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    try {
      const payload = serializeInquiryToSupabase(newInquiry);
      const { error } = await supabase.from('inquiries').insert([payload]);
      if (error) console.warn('Supabase add inquiry error:', error.message);
    } catch (err) {
      console.warn('Supabase add inquiry exception:', err);
    }
  };

  // Settings operations (Option 6 - Synced with Supabase Cloud)
  const handleUpdateSettings = async (newSettings: ShowroomSettings) => {
    setSettings(newSettings);
    try {
      const payload = serializeSettingsToSupabase(newSettings);
      const { error } = await supabase.from('settings').upsert(payload);
      if (error) console.warn('Supabase update settings error:', error.message);
    } catch (err) {
      console.warn('Supabase update settings exception:', err);
    }
  };

  const handleResetDemoData = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.BIKES);
      localStorage.removeItem(STORAGE_KEYS.PURCHASES);
      localStorage.removeItem(STORAGE_KEYS.SALES);
      localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
      localStorage.removeItem(STORAGE_KEYS.SELL_REQUESTS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    } catch {
      // ignore
    }
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
    if (!isAdmin) {
      return (
        <div key="add-bike-page" className="animate-page-enter fixed inset-0 w-screen h-screen overflow-y-auto overflow-x-hidden bg-slate-950 p-6 flex items-center justify-center">
          <AdminRestrictedNotice
            pageTitle="Add Bike to Stock"
            onOpenLogin={() => openPinModal(() => setCurrentPage('add-bike'))}
            onBackToCollection={() => setCurrentPage('stock')}
          />
          <AdminPinModal 
            isOpen={isPinModalOpen} 
            onClose={closePinModal} 
            verifyPin={verifyAdminPin} 
          />
        </div>
      );
    }

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
        managerName={settings.managerName}
        managerContact={settings.managerContact}
        managerPhotoUrl={settings.managerPhotoUrl}
        onUpdateManagerPhoto={(newPhoto) => {
          handleUpdateSettings({ ...settings, managerPhotoUrl: newPhoto });
        }}
        onUpdateLogo={(newLogo) => {
          handleUpdateSettings({ ...settings, logoUrl: newLogo });
        }}
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
            onUpdateLogo={(newLogo) => {
              handleUpdateSettings({ ...settings, logoUrl: newLogo });
            }}
          />
        </div>

        {/* Viewport for the 6 Sidebar Modules with Page Entrance Animation */}
        <main ref={mainScrollRef} className="flex-1 bg-slate-950 overflow-y-auto overflow-x-hidden min-h-0">
          <div key={currentPage} className="animate-page-enter w-full min-h-full">
            {/* 1. Dashboard (Admin Only) */}
            {currentPage === 'dashboard' && (
              isAdmin ? (
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
              ) : (
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
              )
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
              isAdmin ? (
                <PurchaseView
                  purchases={purchases}
                  onAddPurchase={handleAddPurchase}
                  onDeletePurchase={handleDeletePurchase}
                  isAddModalOpen={isPurchaseAddModalOpen}
                  onCloseAddModal={() => setIsPurchaseAddModalOpen(false)}
                />
              ) : (
                <AdminRestrictedNotice
                  pageTitle="Purchase Management"
                  onOpenLogin={() => openPinModal(() => setCurrentPage('purchase'))}
                  onBackToCollection={() => setCurrentPage('stock')}
                />
              )
            )}

            {/* 4. Sell */}
            {currentPage === 'sell' && (
              isAdmin ? (
                <SellView
                  sales={sales}
                  sellRequests={sellRequests}
                  bikes={bikes}
                  onAddSale={handleAddSale}
                  onUpdateSellStatus={handleUpdateSellRequestStatus}
                />
              ) : (
                <AdminRestrictedNotice
                  pageTitle="Sales & Financial Entries"
                  onOpenLogin={() => openPinModal(() => setCurrentPage('sell'))}
                  onBackToCollection={() => setCurrentPage('stock')}
                />
              )
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
              isAdmin ? (
                <SettingsView
                  settings={settings}
                  onUpdateSettings={handleUpdateSettings}
                  onResetDemoData={handleResetDemoData}
                  bikesCount={bikes.length}
                  purchasesCount={purchases.length}
                  salesCount={sales.length}
                />
              ) : (
                <AdminRestrictedNotice
                  pageTitle="Showroom Settings"
                  onOpenLogin={() => openPinModal(() => setCurrentPage('settings'))}
                  onBackToCollection={() => setCurrentPage('stock')}
                />
              )
            )}

            {/* 7. Dedicated Admin Panel */}
            {currentPage === 'admin' && (
              isAdmin ? (
                <AdminPage
                  bikes={bikes}
                  inquiries={inquiries}
                  sellRequests={sellRequests}
                  onAddBike={handleAddBikeToStock}
                  onUpdateBike={handleUpdateBike}
                  onDeleteBike={handleDeleteBike}
                  onUpdateInquiryStatus={handleUpdateInquiryStatus}
                  onUpdateSellStatus={handleUpdateSellRequestStatus}
                  onNavigate={handleNavigate}
                />
              ) : (
                <AdminRestrictedNotice
                  pageTitle="Dealer DMS Admin"
                  onOpenLogin={() => openPinModal(() => setCurrentPage('admin'))}
                  onBackToCollection={() => setCurrentPage('stock')}
                />
              )
            )}
          </div>
        </main>

        {/* Global Admin PIN Modal */}
        <AdminPinModal
          isOpen={isPinModalOpen}
          onClose={closePinModal}
          verifyPin={verifyAdminPin}
        />
      </div>
    </div>
  );
}
