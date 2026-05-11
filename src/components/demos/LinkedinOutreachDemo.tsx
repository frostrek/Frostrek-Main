import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Users, ArrowRight, CheckCircle2, User } from 'lucide-react';
import Button from '../ui/Button';

const LinkedinOutreachDemo = () => {
    const [step, setStep] = useState<'input' | 'processing' | 'results'>('input');
    const [progress, setProgress] = useState(0);
    const [processText, setProcessText] = useState('Initializing...');
    const [formData, setFormData] = useState({
        niche: '',
        location: '',
        size: ''
    });

    const dummyLeads = [
        {
            name: "Sarah Jenkins",
            role: "Chief Executive Officer",
            company: "TechNova Solutions",
            location: formData.location || "San Francisco, CA",
            employees: "50-200",
            linkedin: "linkedin.com/in/sarah-j"
        },
        {
            name: "Michael Chen",
            role: "Founder & CTO",
            company: "DataFlow Systems",
            location: formData.location || "Austin, TX",
            employees: "10-50",
            linkedin: "linkedin.com/in/mchen"
        },
        {
            name: "Emily Rodriguez",
            role: "VP of Engineering",
            company: "CloudScale Inc",
            location: formData.location || "New York, NY",
            employees: "200-500",
            linkedin: "linkedin.com/in/erodriguez"
        }
    ];

    const startSimulation = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');
        setProgress(0);

        // Simulation Timeline
        const sequence = [
            { time: 500, text: `Scraping LinkedIn for "${formData.niche || 'Tech'}" companies...`, progress: 20 },
            { time: 1500, text: `Filtering by location: "${formData.location || 'Global'}"...`, progress: 45 },
            { time: 2500, text: "Identifying Decision Makers (CEO, Founder)...", progress: 70 },
            { time: 3500, text: "Extracting verified email and contact info...", progress: 90 },
            { time: 4500, text: "Finalizing Lead List...", progress: 100 }
        ];

        sequence.forEach(({ time, text, progress: prog }) => {
            setTimeout(() => {
                setProcessText(text);
                setProgress(prog);
                if (prog === 100) {
                    setTimeout(() => setStep('results'), 500);
                }
            }, time);
        });
    };

    const resetDemo = () => {
        setStep('input');
        setFormData({ niche: '', location: '', size: '' });
        setProgress(0);
    };

    return (
        <div className="w-full rounded-3xl overflow-hidden border shadow-lg bg-white border-[#2D6A4F]/10 font-body">
            {/* Content Area - Compact */}
            <div className="p-5 md:p-6 min-h-[320px] flex flex-col justify-center bg-white">
                <AnimatePresence mode="wait">

                    {/* STEP 1: INPUT */}
                    {step === 'input' && (
                        <motion.form
                            key="input"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onSubmit={startSimulation}
                            className="max-w-md mx-auto w-full space-y-5"
                        >
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">
                                        Target Industry / Niche <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            required
                                            type="text"
                                            placeholder="e.g. Healthcare, SaaS, E-commerce"
                                            value={formData.niche}
                                            onChange={e => setFormData({ ...formData, niche: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl outline-none border border-gray-200 focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 text-gray-900 bg-gray-50/50 font-bold placeholder-gray-400 transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">
                                            Location <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="City or Country"
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl outline-none border border-gray-200 focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 text-gray-900 bg-gray-50/50 font-bold placeholder-gray-400 transition-all text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">
                                            Company Size <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <select
                                                value={formData.size}
                                                onChange={e => setFormData({ ...formData, size: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl outline-none border border-gray-200 focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 text-gray-900 bg-gray-50/50 font-bold appearance-none cursor-pointer transition-all text-sm"
                                            >
                                                <option value="" disabled>Select Size</option>
                                                <option value="1-10">1-10 Employees</option>
                                                <option value="11-50">11-50 Employees</option>
                                                <option value="51-200">51-200 Employees</option>
                                                <option value="201-500">201-500 Employees</option>
                                                <option value="500+">500+ Employees</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-4 text-sm font-extrabold uppercase tracking-widest text-white shadow-lg border-none bg-[#0077B5] hover:bg-[#006396] shadow-blue-500/10 cursor-pointer"
                            >
                                Start Automation <ArrowRight className="w-5 h-5 ml-2 text-white" />
                            </Button>
                        </motion.form>
                    )}

                    {/* STEP 2: PROCESSING */}
                    {step === 'processing' && (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center space-y-8 max-w-sm mx-auto"
                        >
                            <div className="relative w-24 h-24">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        cx="50" cy="50" r="45"
                                        fill="none"
                                        stroke="rgba(0,0,0,0.06)"
                                        strokeWidth="8"
                                    />
                                    <motion.circle
                                        cx="50" cy="50" r="45"
                                        fill="none"
                                        stroke="#0077B5"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: progress / 100 }}
                                        transition={{ duration: 0.5 }}
                                        transform="rotate(-90 50 50)"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-bold font-mono text-gray-900">{progress}%</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h4 className="text-lg font-serif font-extrabold text-gray-900 animate-pulse">Running Automation...</h4>
                                <p className="text-sm text-slate-500 font-medium max-w-xs">
                                    {processText}
                                </p>
                            </div>

                            <div className="space-y-2 w-full">
                                {/* Console Logs Simulation - Perfectly high-contrast styled console */}
                                <div className="text-xs font-mono text-left p-3.5 rounded-2xl w-full h-24 overflow-hidden space-y-1 bg-[#F4FAF7] border border-emerald-100 text-emerald-800 font-bold">
                                    <p>{`> Initializing search module... [OK]`}</p>
                                    <p>{`> Target: ${formData.niche || 'Technology'}`}</p>
                                    {progress > 20 && <p className="animate-pulse">{`> Scraping company profiles...`}</p>}
                                    {progress > 50 && <p>{`> Found 142 potential matches`}</p>}
                                    {progress > 70 && <p className="animate-pulse">{`> Identifying decision makers...`}</p>}
                                    {progress > 90 && <p>{`> Verifying contact details...`}</p>}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: RESULTS */}
                    {step === 'results' && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full space-y-6"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                                    Leads Extracted
                                </h3>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    3 Verified Matches
                                </span>
                            </div>

                            <div className="grid gap-3.5">
                                {dummyLeads.map((lead, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-4 rounded-xl border flex items-center justify-between group cursor-pointer transition-all bg-white border-gray-150 hover:border-[#0077B5]/50 hover:bg-gray-50/50 shadow-sm"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-blue-50 border border-blue-100">
                                                <User className="w-5.5 h-5.5 text-[#0077B5]" />
                                            </div>
                                            <div>
                                                {/* FIXED: text-gray-900 instead of text-white */}
                                                <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-[#0077B5] transition-colors">
                                                    {lead.name}
                                                </h4>
                                                <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                    {lead.role} • <span className="text-slate-700 font-bold">{lead.company}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3.5">
                                            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                                                <MapPin className="w-3 h-3 text-[#0077B5]" /> {lead.location}
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#0077B5] transition-all group-hover:translate-x-1" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* FIXED: Reset Button has explicit, legible slate-700 text on hover/active states */}
                            <button
                                onClick={resetDemo}
                                className="w-full py-3.5 mt-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 font-extrabold text-xs uppercase tracking-widest transition-all cursor-pointer"
                            >
                                Start New Search
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LinkedinOutreachDemo;
