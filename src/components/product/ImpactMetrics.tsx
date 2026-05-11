import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ProductStatistic } from '../../utils/productData';
import { LayoutDashboard, BarChart3, PieChart, ArrowUpRight, Activity } from 'lucide-react';

// Color palette for metrics - clean pie chart colors
const METRIC_COLORS = [
    { fill: '#2D6A4F', light: '#E8F5EE', darkBg: 'rgba(45, 106, 79, 0.1)', name: 'forest-deep' },
    { fill: '#34A853', light: '#EDF9F1', darkBg: 'rgba(52, 168, 83, 0.1)', name: 'forest-soft' },
    { fill: '#1B4332', light: '#E1EFEA', darkBg: 'rgba(27, 67, 50, 0.1)', name: 'forest-dark' },
    { fill: '#40916C', light: '#EAF6F0', darkBg: 'rgba(64, 145, 108, 0.1)', name: 'forest-medium' },
];

// Clean Filled Pie Chart Component
const CircularProgress = ({ value, label, delay, index = 0, breakdown }: { value: string, label: string, delay: number, index?: number, breakdown?: { value: number; label: string; color?: string }[] }) => {
    // Determine segments: either from breakdown or single value
    let segments: { value: number; color: string; label?: string }[] = [];

    if (breakdown && breakdown.length > 0) {
        segments = breakdown.map((item, i) => {
            const color = METRIC_COLORS[(index + i) % METRIC_COLORS.length].fill;
            return { value: item.value, color, label: item.label };
        });
    } else {
        const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
        const isPercentage = value.includes('%');
        const percentage = isPercentage ? numValue : 100;
        const colors = METRIC_COLORS[index % METRIC_COLORS.length];
        segments = [{ value: percentage, color: colors.fill }];
    }

    const size = 100;
    const center = size / 2;
    const radius = 40;

    // Calculate paths
    let accumulatedAngle = -90;
    const paths = segments.map((segment) => {
        const percentage = segment.value;
        const angle = (percentage / 100) * 360;
        const startAngle = accumulatedAngle;
        const endAngle = startAngle + angle;
        accumulatedAngle = endAngle;

        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;

        const x1 = center + radius * Math.cos(startRad);
        const y1 = center + radius * Math.sin(startRad);
        const x2 = center + radius * Math.cos(endRad);
        const y2 = center + radius * Math.sin(endRad);

        const largeArc = angle > 180 ? 1 : 0;

        // Correct path for 100% or close to it
        const d = percentage >= 100
            ? `M ${center} ${center - radius} A ${radius} ${radius} 0 1 1 ${center - 0.001} ${center - radius} Z`
            : `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

        return { d, color: segment.color, label: segment.label };
    });

    return (
        <div className="flex flex-col items-center justify-center h-full p-3 font-body bg-white rounded-xl">
            {/* Pie Chart */}
            <div className="relative w-24 h-24 mb-2">
                <motion.svg
                    viewBox={`0 0 ${size} ${size}`}
                    className="w-full h-full drop-shadow-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay }}
                >
                    {/* Background circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="#F9FBFA"
                        stroke="#E8F5EE"
                        strokeWidth="0.5"
                    />

                    {/* Slices */}
                    {paths.map((path, i) => (
                        <motion.path
                            key={i}
                            d={path.d}
                            fill={path.color}
                            stroke="#fff"
                            strokeWidth="1.5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: delay + (i * 0.1) }}
                        />
                    ))}
                </motion.svg>
            </div>

            {/* Label */}
            <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3 }}
            >
                <p className="text-xs font-extrabold leading-tight text-gray-800">
                    {label}
                </p>
                {breakdown ? (
                    <div className="flex gap-1.5 justify-center mt-1.5 flex-wrap">
                        {segments.map((seg, i) => (
                            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded font-extrabold bg-[#E8F5EE] text-[#2D6A4F]">
                                {seg.value}%
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-[10px] font-bold text-slate-500 mt-1">
                        {value}
                    </p>
                )}
            </motion.div>
        </div>
    );
};

const BarChart = ({ value, label, delay, index = 0 }: { value: string, label: string, delay: number, index?: number }) => {
    let heightPercent = 80;
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue)) {
        if (value.toLowerCase().includes('x')) {
            heightPercent = Math.min(Math.max(numValue * 20, 20), 100);
        } else if (value.includes('%')) {
            heightPercent = Math.min(Math.max(numValue, 10), 100);
        }
    }

    const colors = METRIC_COLORS[index % METRIC_COLORS.length];

    return (
        <div className="flex flex-col justify-end h-full p-4 relative group bg-white rounded-xl">
            <div className="flex items-end justify-center gap-3 h-28 mb-3 w-full px-2">
                <motion.div
                    className="w-8 rounded-t-lg bg-gray-100"
                    initial={{ height: 0 }}
                    whileInView={{ height: '30%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay }}
                />
                <motion.div
                    className="w-8 rounded-t-lg relative"
                    style={{ backgroundColor: colors.fill }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: delay + 0.2 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delay + 1 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-extrabold text-[#2D6A4F] px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap bg-[#E8F5EE] border border-[#2D6A4F]/20"
                    >
                        {value}
                    </motion.div>
                </motion.div>
            </div>
            <p className="font-bold text-xs text-center text-slate-500 leading-tight">{label}</p>
        </div>
    );
};

// Trend Line
const TrendChart = ({ value, label, delay }: { value: string, label: string, delay: number }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4 relative group bg-white rounded-xl">
            <div className="relative w-full h-28 mb-3 flex items-center justify-center">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                    <motion.path
                        d="M0,45 C20,45 40,40 50,25 C60,10 80,10 100,5"
                        fill="none"
                        stroke="#2D6A4F"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay, ease: "easeInOut" }}
                    />
                    <motion.path
                        d="M0,45 C20,45 40,40 50,25 C60,10 80,10 100,5 L100,50 L0,50 Z"
                        fill="url(#trendGradientSmall)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: delay + 0.5 }}
                    />
                    <defs>
                        <linearGradient id="trendGradientSmall" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute top-0 right-0">
                    <span className="text-sm font-extrabold px-2 py-0.5 rounded-md text-[#2D6A4F] bg-[#E8F5EE] border border-[#2D6A4F]/20">{value}</span>
                </div>
            </div>
            <p className="font-bold text-xs text-center text-slate-500 leading-tight">{label}</p>
        </div>
    );
};

const DashboardWidget = ({ stat, index, activeView }: { stat: ProductStatistic, index: number, activeView: 'grid' | 'bar' | 'pie' }) => {
    const isPercentage = stat.value.includes('%');
    const isMultiplier = stat.value.toLowerCase().includes('x');
    const isHighPercentage = isPercentage && parseFloat(stat.value) > 90;

    let Content;

    if (activeView === 'bar') {
        Content = BarChart;
    } else if (activeView === 'pie') {
        Content = CircularProgress;
    } else {
        Content = TrendChart;
        if (isHighPercentage || stat.breakdown) Content = CircularProgress;
        else if (isMultiplier) Content = BarChart;
    }

    return (
        <div className="rounded-2xl border shadow-[0_4px_20px_rgba(45,106,79,0.03)] p-2.5 bg-white border-[#2D6A4F]/10 hover:shadow-md transition-shadow duration-300">
            {/* Widget Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b mb-1 border-[#2D6A4F]/10">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#2D6A4F]">{stat.label.split(' ')[0]} METRIC</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2D6A4F]" />
            </div>
            <div className="h-40">
                <Content value={stat.value} label={stat.label} delay={index * 0.15} index={index} breakdown={stat.breakdown} />
            </div>
        </div>
    );
};

export const ImpactMetrics = ({ statistics }: { statistics: ProductStatistic[] }) => {
    const [activeView, setActiveView] = useState<'grid' | 'bar' | 'pie'>('grid');

    return (
        <div className="max-w-5xl mx-auto font-body">
            {/* FIXED: beautiful white enterprise-grade dashboard widget with subtle light green borders */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="rounded-3xl border shadow-xl overflow-hidden flex bg-white border-[#2D6A4F]/15"
            >
                {/* Side Control Bar */}
                <div className="w-16 md:w-20 border-r flex flex-col items-center py-6 gap-6 hidden sm:flex bg-[#F9FBFA] border-[#2D6A4F]/15">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-serif font-black text-sm bg-[#2D6A4F] text-white">F</div>
                    <div className="flex flex-col gap-4 mt-4 w-full px-4">
                        <button
                            onClick={() => setActiveView('grid')}
                            className={`p-2.5 rounded-xl shadow-sm transition-all cursor-pointer ${activeView === 'grid' ? 'bg-[#2D6A4F] text-white shadow-md' : 'text-slate-400 hover:bg-gray-100 hover:text-[#2D6A4F]'}`}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setActiveView('bar')}
                            className={`p-2.5 rounded-xl transition-all cursor-pointer ${activeView === 'bar' ? 'bg-[#2D6A4F] text-white shadow-md' : 'text-slate-400 hover:bg-gray-100 hover:text-[#2D6A4F]'}`}
                        >
                            <BarChart3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setActiveView('pie')}
                            className={`p-2.5 rounded-xl transition-all cursor-pointer ${activeView === 'pie' ? 'bg-[#2D6A4F] text-white shadow-md' : 'text-slate-400 hover:bg-gray-100 hover:text-[#2D6A4F]'}`}
                        >
                            <PieChart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main Dashboard Panel */}
                <div className="flex-1 p-6 md:p-8 bg-[#F9FBFA]/40">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-0.5">
                            <h3 className="text-xl font-serif font-black flex items-center gap-2 text-gray-900">
                                Performance Overview
                                <span className="flex h-2.5 w-2.5 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2D6A4F]"></span>
                                </span>
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 font-medium">Live data from enterprise deployments</p>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            <div className="px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-sm bg-white border-gray-200 text-slate-600">Last 30 Days</div>
                            <div className="px-3.5 py-1.5 rounded-full border text-xs font-extrabold shadow-sm flex items-center gap-2 bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F]">
                                <Activity className="w-3.5 h-3.5 text-[#2D6A4F]" />
                                +24% YoY
                            </div>
                        </div>
                    </div>

                    {/* Mobile Controls (Visible only on small screens) */}
                    <div className="flex sm:hidden gap-2 mb-6 p-1.5 rounded-xl bg-gray-150/40 border border-gray-200 w-fit mx-auto">
                        <button
                            onClick={() => setActiveView('grid')}
                            className={`p-2 rounded-lg transition-all ${activeView === 'grid' ? 'bg-white shadow text-[#2D6A4F]' : 'text-slate-400'}`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveView('bar')}
                            className={`p-2 rounded-lg transition-all ${activeView === 'bar' ? 'bg-white shadow text-[#2D6A4F]' : 'text-slate-400'}`}
                        >
                            <BarChart3 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setActiveView('pie')}
                            className={`p-2 rounded-lg transition-all ${activeView === 'pie' ? 'bg-white shadow text-[#2D6A4F]' : 'text-slate-400'}`}
                        >
                            <PieChart className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {statistics.map((stat, idx) => (
                            <DashboardWidget key={idx} stat={stat} index={idx} activeView={activeView} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
