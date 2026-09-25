import React, { useState, useMemo } from 'react';
import { Bike, CustomerInquiry, PurchaseRecord, SaleRecord, ActivePage } from '../types/bike';
import { formatBDT } from '../utils/formatters';
import { 
  Bike as BikeIcon, 
  ArrowDownLeft, 
  ArrowUpRight, 
  TrendingUp, 
  Calendar, 
  Award,
  BarChart3,
  PieChart as PieIcon,
  DollarSign,
  LayoutGrid
} from 'lucide-react';

interface DashboardViewProps {
  bikes: Bike[];
  purchases: PurchaseRecord[];
  sales: SaleRecord[];
  inquiries: CustomerInquiry[];
  onNavigate: (page: ActivePage) => void;
  onSelectBike: (bike: Bike) => void;
  onOpenAddBikeModal: () => void;
  onOpenAddPurchaseModal: () => void;
  showroomName?: string;
}

interface MonthlyStat {
  key: string; // YYYY-MM
  name: string; // Month Year
  shortName: string; // Mon 'YY
  salesAmount: number;
  purchasesAmount: number;
  profit: number;
  bikesSold: number;
  bikesPurchased: number;
  marginPct: number;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const PIE_COLORS = [
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#8b5cf6', // Purple
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#f97316'  // Orange
];

// Helper to format concise currency for bar tops (e.g. ৳7.5L, ৳165k)
function formatShortBDT(val: number): string {
  if (val >= 10000000) {
    const crore = (val / 10000000).toFixed(1).replace('.0', '');
    return `৳${crore}Cr`;
  }
  if (val >= 100000) {
    const lakh = (val / 100000).toFixed(1).replace('.0', '');
    return `৳${lakh}L`;
  }
  if (val >= 1000) {
    return `৳${Math.round(val / 1000)}k`;
  }
  return `৳${val}`;
}

// Helper functions for SVG Pie/Donut Chart
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, innerRadius: number, startAngle: number, endAngle: number) {
  const sweep = endAngle - startAngle;
  const safeEndAngle = sweep >= 360 ? startAngle + 359.99 : endAngle;

  const start = polarToCartesian(x, y, radius, safeEndAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const innerStart = polarToCartesian(x, y, innerRadius, safeEndAngle);
  const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);
  const largeArcFlag = safeEndAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    'L', innerEnd.x, innerEnd.y,
    'A', innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
    'Z'
  ].join(' ');
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  bikes,
  purchases,
  sales,
  onNavigate,
  onOpenAddPurchaseModal,
  showroomName = 'Ma Motors'
}) => {
  const inStockBikes = bikes.filter((b) => b.inStock !== false && b.status !== 'Sold');

  const totalStockAskingValue = inStockBikes.reduce((sum, b) => sum + (b.askingPrice || b.price), 0);
  const totalSalesRevenue = sales.reduce((sum, s) => sum + s.salePrice, 0);
  const totalRealizedProfit = sales.reduce((sum, s) => sum + s.profit, 0);
  const totalPurchasesCost = purchases.reduce((sum, p) => sum + p.purchasePrice, 0);
  const avgProfitPerBike = sales.length > 0 ? Math.round(totalRealizedProfit / sales.length) : 0;

  // Chart View State: 'bar' | 'pie' | 'both'
  const [chartViewMode, setChartViewMode] = useState<'both' | 'bar' | 'pie'>('both');
  const [pieMetric, setPieMetric] = useState<'sales' | 'profit' | 'units'>('sales');

  // Hover states for interactive tooltips
  const [hoveredMonthKey, setHoveredMonthKey] = useState<string | null>(null);

  // Aggregate Data Month-Wise (Sorted Chronologically: May -> Jun -> Jul -> Aug -> Sep)
  const monthlyStatsChronological = useMemo(() => {
    const statsMap: Record<string, MonthlyStat> = {};

    const getMonthStat = (dateStr: string): MonthlyStat => {
      const parts = dateStr.split('-');
      const year = parseInt(parts[0], 10) || new Date().getFullYear();
      const monthIdx = (parseInt(parts[1], 10) || 1) - 1;
      const key = `${year}-${String(monthIdx + 1).padStart(2, '0')}`;

      if (!statsMap[key]) {
        statsMap[key] = {
          key,
          name: `${MONTH_NAMES[monthIdx]} ${year}`,
          shortName: `${MONTH_NAMES[monthIdx].slice(0, 3)} '${String(year).slice(2)}`,
          salesAmount: 0,
          purchasesAmount: 0,
          profit: 0,
          bikesSold: 0,
          bikesPurchased: 0,
          marginPct: 0
        };
      }
      return statsMap[key];
    };

    // Add Sales
    sales.forEach((s) => {
      const stat = getMonthStat(s.saleDate || new Date().toISOString().slice(0, 10));
      stat.salesAmount += s.salePrice;
      stat.profit += s.profit;
      stat.bikesSold += 1;
    });

    // Add Purchases
    purchases.forEach((p) => {
      const stat = getMonthStat(p.purchaseDate || new Date().toISOString().slice(0, 10));
      stat.purchasesAmount += p.purchasePrice;
      stat.bikesPurchased += 1;
    });

    const list = Object.values(statsMap).map((m) => {
      m.marginPct = m.salesAmount > 0 ? Math.round((m.profit / m.salesAmount) * 100) : 0;
      return m;
    });

    // Sort chronologically (oldest to newest for bar chart timeline)
    list.sort((a, b) => a.key.localeCompare(b.key));
    return list;
  }, [sales, purchases]);

  // Selected Month State
  const [selectedMonthKey, setSelectedMonthKey] = useState<string>(
    monthlyStatsChronological[monthlyStatsChronological.length - 1]?.key || ''
  );

  const selectedMonthData = useMemo(() => {
    return monthlyStatsChronological.find((m) => m.key === selectedMonthKey) || monthlyStatsChronological[monthlyStatsChronological.length - 1];
  }, [monthlyStatsChronological, selectedMonthKey]);

  // Active Month (either hovered on chart or selected)
  const activeMonthData = useMemo(() => {
    if (hoveredMonthKey) {
      return monthlyStatsChronological.find((m) => m.key === hoveredMonthKey) || selectedMonthData;
    }
    return selectedMonthData;
  }, [hoveredMonthKey, selectedMonthData, monthlyStatsChronological]);

  // Best Profit Month
  const bestMonthKey = useMemo(() => {
    if (monthlyStatsChronological.length === 0) return '';
    return [...monthlyStatsChronological].sort((a, b) => b.profit - a.profit)[0]?.key;
  }, [monthlyStatsChronological]);

  // Max value calculation for Bar Chart Y-Axis Scale
  const maxYValue = useMemo(() => {
    let max = 100000;
    monthlyStatsChronological.forEach((m) => {
      if (m.salesAmount > max) max = m.salesAmount;
      if (m.purchasesAmount > max) max = m.purchasesAmount;
    });
    // Round up to clean ceiling (e.g. nearest 200,000)
    const step = 200000;
    return Math.ceil(max / step) * step;
  }, [monthlyStatsChronological]);

  // Prepare Pie Chart Slices
  const pieSlices = useMemo(() => {
    const totalVal = monthlyStatsChronological.reduce((acc, m) => {
      if (pieMetric === 'sales') return acc + m.salesAmount;
      if (pieMetric === 'profit') return acc + m.profit;
      return acc + m.bikesSold;
    }, 0);

    if (totalVal === 0) return [];

    let currentAngle = 0;
    return monthlyStatsChronological.map((m, index) => {
      const val = pieMetric === 'sales' ? m.salesAmount : pieMetric === 'profit' ? m.profit : m.bikesSold;
      const angle = (val / totalVal) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle += angle;

      const pct = Math.round((val / totalVal) * 100);
      const color = PIE_COLORS[index % PIE_COLORS.length];

      return {
        month: m,
        val,
        pct,
        color,
        startAngle,
        endAngle,
        path: describeArc(150, 150, 120, 68, startAngle, endAngle)
      };
    });
  }, [monthlyStatsChronological, pieMetric]);

  // Total for Pie Chart
  const pieTotalValue = useMemo(() => {
    return monthlyStatsChronological.reduce((acc, m) => {
      if (pieMetric === 'sales') return acc + m.salesAmount;
      if (pieMetric === 'profit') return acc + m.profit;
      return acc + m.bikesSold;
    }, 0);
  }, [monthlyStatsChronological, pieMetric]);

  // Format Y-axis tick values (e.g. 10L, 8L, 6L, 4L, 2L, 0)
  const yTicks = [
    maxYValue,
    Math.round((maxYValue * 3) / 4),
    Math.round(maxYValue / 2),
    Math.round(maxYValue / 4),
    0
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Showroom Header */}
      <div className="bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
          {showroomName}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Showroom Overview & Performance
        </p>
      </div>

      {/* 4 Clean High-Level Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total In Stock */}
        <div 
          onClick={() => onNavigate('stock')}
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl cursor-pointer transition-colors shadow"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>In-Stock Value</span>
            <BikeIcon className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-2">
            {formatBDT(totalStockAskingValue)}
          </div>
          <div className="text-xs text-cyan-400 font-medium mt-1 font-mono">
            {inStockBikes.length} Bikes in Stock
          </div>
        </div>

        {/* Total Sales Revenue */}
        <div 
          onClick={() => onNavigate('sell')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-4 rounded-xl cursor-pointer transition-colors shadow"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Sales</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-2">
            {formatBDT(totalSalesRevenue)}
          </div>
          <div className="text-xs text-emerald-400 font-medium mt-1 font-mono">
            {sales.length} Bikes Sold
          </div>
        </div>

        {/* Total Realized Profit */}
        <div 
          onClick={() => onNavigate('sell')}
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl cursor-pointer transition-colors shadow"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Net Profit</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 mt-2">
            +{formatBDT(totalRealizedProfit)}
          </div>
          <div className="text-xs text-cyan-400 font-medium mt-1 font-mono">
            Avg: +{formatBDT(avgProfitPerBike)} / bike
          </div>
        </div>

        {/* Total Purchases Cost */}
        <div 
          onClick={() => onNavigate('purchase')}
          className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 p-4 rounded-xl cursor-pointer transition-colors shadow"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Total Purchases</span>
            <ArrowDownLeft className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-300 mt-2">
            {formatBDT(totalPurchasesCost)}
          </div>
          <div className="text-xs text-blue-400 font-medium mt-1 font-mono">
            {purchases.length} Bikes Purchased
          </div>
        </div>
      </div>

      {/* MONTH-WISE VISUAL CHARTS SECTION */}
      <div className="space-y-4">
        {/* Controls Bar: Title & Chart Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">
                Monthly Performance
              </h3>
            </div>
          </div>

          {/* Toggle between Both / Bar / Pie */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setChartViewMode('both')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                chartViewMode === 'both'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Both</span>
            </button>
            <button
              onClick={() => setChartViewMode('bar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                chartViewMode === 'bar'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Bar</span>
            </button>
            <button
              onClick={() => setChartViewMode('pie')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                chartViewMode === 'pie'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" />
              <span>Pie</span>
            </button>
          </div>
        </div>

        {/* Dynamic Month Highlight Header Banner */}
        {activeMonthData && (
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-mono font-bold text-sm border border-cyan-500/20">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-black text-white font-display">
                    {activeMonthData.name}
                  </span>
                  {activeMonthData.key === bestMonthKey && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                      <Award className="w-3 h-3" /> Top Month
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs font-mono">
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">SALES</span>
                <span className="text-emerald-400 font-bold text-sm sm:text-base">
                  {formatBDT(activeMonthData.salesAmount)}
                </span>
                <span className="text-[10px] text-slate-500 block">{activeMonthData.bikesSold} Sold</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">PURCHASE</span>
                <span className="text-blue-400 font-bold text-sm sm:text-base">
                  {formatBDT(activeMonthData.purchasesAmount)}
                </span>
                <span className="text-[10px] text-slate-500 block">{activeMonthData.bikesPurchased} Purchased</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-sans">NET PROFIT</span>
                <span className="text-cyan-300 font-bold text-sm sm:text-base">
                  +{formatBDT(activeMonthData.profit)}
                </span>
                <span className="text-[10px] text-emerald-400 block font-semibold">{activeMonthData.marginPct}% margin</span>
              </div>
            </div>
          </div>
        )}

        {/* CHARTS CONTAINER */}
        <div className={`grid gap-5 ${
          chartViewMode === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
        }`}>
          {/* 1. X-Y AXIS VERTICAL BAR CHART */}
          {(chartViewMode === 'both' || chartViewMode === 'bar') && (
            <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 ${
              chartViewMode === 'both' ? 'lg:col-span-7' : 'w-full'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white font-display">
                    Sales & Purchases
                  </h4>
                </div>

                {/* Legend: Sales & Purchases */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block shadow-sm shadow-emerald-400/50" />
                    <span className="font-semibold text-emerald-400">Sales</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block shadow-sm shadow-blue-500/50" />
                    <span className="font-semibold text-blue-400">Purchases</span>
                  </div>
                </div>
              </div>

              {/* Responsive SVG Bar Chart */}
              <div className="relative w-full overflow-x-auto">
                <div className="min-w-[480px]">
                  <svg 
                    viewBox="0 0 600 280" 
                    className="w-full h-64 select-none overflow-visible"
                  >
                    {/* Horizontal Grid lines and Y-axis labels */}
                    {yTicks.map((val, idx) => {
                      const yPos = 62 + idx * 40;
                      return (
                        <g key={idx}>
                          <line
                            x1="55"
                            y1={yPos}
                            x2="590"
                            y2={yPos}
                            stroke="#1e293b"
                            strokeDasharray={idx === 4 ? '0' : '4 4'}
                            strokeWidth={idx === 4 ? '1.5' : '1'}
                          />
                          <text
                            x="50"
                            y={yPos + 4}
                            textAnchor="end"
                            fontSize="9"
                            fill="#64748b"
                            fontFamily="monospace"
                          >
                            ৳{Math.round(val / 1000)}k
                          </text>
                        </g>
                      );
                    })}

                    {/* Bars & X-Axis Month Columns */}
                    {monthlyStatsChronological.map((m, index) => {
                      const totalMonths = monthlyStatsChronological.length;
                      const colWidth = 490 / totalMonths;
                      const xGroupStart = 65 + index * colWidth;
                      const barGroupCenterX = xGroupStart + colWidth / 2;

                      const isSelected = selectedMonthKey === m.key;
                      const isHovered = hoveredMonthKey === m.key;

                      const chartHeight = 160;
                      const baseY = 222;

                      const salesH = Math.max(6, (m.salesAmount / maxYValue) * chartHeight);
                      const purchasesH = Math.max(6, (m.purchasesAmount / maxYValue) * chartHeight);

                      const barW = Math.min(24, Math.max(14, colWidth / 3.2));
                      const salesBarX = barGroupCenterX - barW - 2;
                      const purchasesBarX = barGroupCenterX + 2;

                      return (
                        <g 
                          key={m.key} 
                          className="cursor-pointer group"
                          onClick={() => setSelectedMonthKey(m.key)}
                          onMouseEnter={() => setHoveredMonthKey(m.key)}
                          onMouseLeave={() => setHoveredMonthKey(null)}
                        >
                          {/* Column Highlight Background */}
                          {(isHovered || isSelected) && (
                            <rect
                              x={xGroupStart + 2}
                              y="20"
                              width={colWidth - 4}
                              height="240"
                              fill="#06b6d4"
                              fillOpacity={isSelected ? '0.08' : '0.04'}
                              rx="8"
                            />
                          )}

                          {/* 1. Sales Amount Text on Top of Bar */}
                          <text
                            x={salesBarX + barW / 2}
                            y={baseY - salesH - 5}
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight="700"
                            fill={isSelected || isHovered ? '#34d399' : '#10b981'}
                            fontFamily="monospace"
                          >
                            {formatShortBDT(m.salesAmount)}
                          </text>

                          {/* 1. Sales Vertical Bar (Green/Emerald) */}
                          <rect
                            x={salesBarX}
                            y={baseY - salesH}
                            width={barW}
                            height={salesH}
                            fill={isSelected || isHovered ? '#10b981' : '#059669'}
                            rx="3.5"
                            className="transition-all duration-300"
                          >
                            <title>{m.name} Sales: {formatBDT(m.salesAmount)}</title>
                          </rect>

                          {/* 2. Purchases Amount Text on Top of Bar */}
                          <text
                            x={purchasesBarX + barW / 2}
                            y={baseY - purchasesH - 5}
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight="700"
                            fill={isSelected || isHovered ? '#60a5fa' : '#3b82f6'}
                            fontFamily="monospace"
                          >
                            {formatShortBDT(m.purchasesAmount)}
                          </text>

                          {/* 2. Purchases Vertical Bar (Blue) */}
                          <rect
                            x={purchasesBarX}
                            y={baseY - purchasesH}
                            width={barW}
                            height={purchasesH}
                            fill={isSelected || isHovered ? '#3b82f6' : '#2563eb'}
                            rx="3.5"
                            className="transition-all duration-300"
                          >
                            <title>{m.name} Purchases: {formatBDT(m.purchasesAmount)}</title>
                          </rect>

                          {/* Month Label on X-Axis */}
                          <text
                            x={barGroupCenterX}
                            y="244"
                            textAnchor="middle"
                            fontSize="11"
                            fontWeight={isSelected ? '700' : '600'}
                            fill={isSelected ? '#38bdf8' : isHovered ? '#ffffff' : '#94a3b8'}
                            fontFamily="monospace"
                          >
                            {m.shortName}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* 2. PIE CHART / DONUT CHART */}
          {(chartViewMode === 'both' || chartViewMode === 'pie') && (
            <div className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 ${
              chartViewMode === 'both' ? 'lg:col-span-5' : 'w-full'
            }`}>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white font-display">
                    Distribution
                  </h4>
                </div>

                {/* Metric Selector for Pie */}
                <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[10px] font-mono">
                  <button
                    onClick={() => setPieMetric('sales')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      pieMetric === 'sales'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sales
                  </button>
                  <button
                    onClick={() => setPieMetric('profit')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      pieMetric === 'profit'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Profit
                  </button>
                  <button
                    onClick={() => setPieMetric('units')}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      pieMetric === 'units'
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Bikes
                  </button>
                </div>
              </div>

              {/* Pie SVG and Center Statistics */}
              <div className="flex flex-col items-center justify-center relative">
                <svg
                  viewBox="0 0 300 300"
                  className="w-56 h-56 select-none overflow-visible"
                >
                  <g>
                    {pieSlices.map((slice) => {
                      const isHovered = hoveredMonthKey === slice.month.key;
                      const isSelected = selectedMonthKey === slice.month.key;
                      return (
                        <path
                          key={slice.month.key}
                          d={slice.path}
                          fill={slice.color}
                          stroke="#090d16"
                          strokeWidth="3"
                          className="transition-all duration-300 cursor-pointer hover:opacity-90"
                          style={{
                            transformOrigin: '150px 150px',
                            transform: isHovered || isSelected ? 'scale(1.05)' : 'scale(1)',
                            filter: isHovered || isSelected ? 'drop-shadow(0 0 10px rgba(6,182,212,0.4))' : 'none'
                          }}
                          onClick={() => setSelectedMonthKey(slice.month.key)}
                          onMouseEnter={() => setHoveredMonthKey(slice.month.key)}
                          onMouseLeave={() => setHoveredMonthKey(null)}
                        >
                          <title>{`${slice.month.name}: ${formatBDT(slice.val)} (${slice.pct}%)`}</title>
                        </path>
                      );
                    })}
                  </g>
                </svg>

                {/* Donut Center Display */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-28">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    {activeMonthData ? activeMonthData.shortName : 'TOTAL'}
                  </div>
                  <div className="text-sm sm:text-base font-bold font-mono text-white leading-tight mt-0.5">
                    {pieMetric === 'units' 
                      ? `${activeMonthData ? activeMonthData.bikesSold : pieTotalValue} Bikes`
                      : formatBDT(activeMonthData ? (pieMetric === 'sales' ? activeMonthData.salesAmount : activeMonthData.profit) : pieTotalValue)
                    }
                  </div>
                  <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                    {pieMetric === 'sales' ? 'Revenue' : pieMetric === 'profit' ? 'Net Profit' : 'Sold'}
                  </div>
                </div>
              </div>

              {/* Pie Legend List with percentage share */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                {pieSlices.map((slice) => {
                  const isSelected = selectedMonthKey === slice.month.key;
                  return (
                    <div
                      key={slice.month.key}
                      onClick={() => setSelectedMonthKey(slice.month.key)}
                      onMouseEnter={() => setHoveredMonthKey(slice.month.key)}
                      onMouseLeave={() => setHoveredMonthKey(null)}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-slate-950 border border-cyan-500/40' 
                          : 'hover:bg-slate-950/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0" 
                          style={{ backgroundColor: slice.color }} 
                        />
                        <span className="text-slate-300 font-sans font-medium">
                          {slice.month.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-bold">
                        <span className="text-slate-400">{slice.pct}%</span>
                        <span className="text-white">
                          {pieMetric === 'units' ? `${slice.val} pcs` : formatBDT(slice.val)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
