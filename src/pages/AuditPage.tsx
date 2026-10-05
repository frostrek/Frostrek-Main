import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle2, 
    ArrowRight, 
    Clock, 
    FileText, 
    Target, 
    Layers, 
    BarChart3, 
    Search,
    Send
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import CuteBackground from '../components/ui/CuteBackground';

const AUDIT_DELIVERABLES = [
    {
        title: 'Multi-Engine AI Citation Benchmark',
        desc: 'We test your brand across Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini against 25+ high-intent buyer prompts in your niche.',
        timeline: 'Day 1–2',
        icon: Search,
        accent: '#0284C7',
        bg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]'
    },
    {
        title: 'Entity Architecture & Knowledge Graph Audit',
        desc: 'Diagnostic review of your JSON-LD schemas, Wikidata alignments, Google Knowledge Panel entity anchors, and topical clusters.',
        timeline: 'Day 2–3',
        icon: Layers,
        accent: '#6D28D9',
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]'
    },
    {
        title: 'AI Crawler & Machine-Readability Diagnostic',
        desc: 'Verification of server-side HTML rendering, robots.txt bot rules, llms.txt ingest readiness, and crawler extraction without JavaScript dependencies.',
        timeline: 'Day 3–4',
        icon: FileText,
        accent: '#166534',
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]'
    },
    {
        title: 'Competitor GEO & AEO Share-of-Voice Analysis',
        desc: 'Direct head-to-head comparison against your top 3 competitors to pinpoint citation frequency, sentiment, and recommendation bias in AI engines.',
        timeline: 'Day 4–5',
        icon: BarChart3,
        accent: '#C2410C',
        bg: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]'
    },
    {
        title: 'Prioritized 90-Day GEO / AEO Action Roadmap',
        desc: 'A prioritized executive playbook of high-impact fixes, structured data additions, and content engineering moves to capture citation real estate.',
        timeline: 'Day 5–7',
        icon: Target,
        accent: '#2D6A4F',
        bg: 'bg-[#E8F5EE]',
        border: 'border-[#2D6A4F]/20'
    }
];

export default function AuditPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        website: '',
        competitors: '',
        notes: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate immediate receipt confirmation
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 800);
    };

    return (
        <article className="min-h-screen bg-brand-light-bg pt-28 pb-20 relative overflow-hidden font-body text-primary">
            <SEO
                title="Free AI Visibility & Citation Audit | Frostrek AI"
                description="Get a comprehensive evaluation of your brand's visibility across Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini. Delivered in 5 to 7 business days."
                path="/audit"
            />
            <CuteBackground />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-6xl">
                {/* Header */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-6"
                    >
                        <Clock className="w-3.5 h-3.5" />
                        Delivered in 5 to 7 Business Days • Zero Cost
                    </motion.div>

                    <SplitTextReveal
                        as="h1"
                        className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] mb-6 tracking-tight"
                        type="chars"
                        stagger={0.02}
                    >
                        Free AI Visibility & Citation Audit
                    </SplitTextReveal>

                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Find out exactly how Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini answer questions about your brand. We audit your entity graphs, crawlability, and competitor citations to give you a definitive action plan.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left: What You Get */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                            <h2 className="font-serif text-2xl text-[#2D6A4F] font-bold mb-3">
                                What You Get in Your Audit Report
                            </h2>
                            <p className="text-sm text-gray-500 mb-8">
                                Every audit is performed by our senior AI Search strategists using live engine prompting and proprietary attribution diagnostics.
                            </p>

                            <div className="space-y-4">
                                {AUDIT_DELIVERABLES.map((item) => (
                                    <div
                                        key={item.title}
                                        className={`p-4 sm:p-5 rounded-2xl border ${item.border} ${item.bg} transition-all hover:translate-x-1`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white border border-gray-100 shadow-sm"
                                                style={{ color: item.accent }}
                                            >
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                                                        {item.title}
                                                    </h3>
                                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/80 border border-gray-200 text-gray-600 shrink-0">
                                                        {item.timeline}
                                                    </span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Guarantee / Trust note */}
                        <div className="p-6 rounded-2xl bg-[#E8F5EE]/60 border border-[#2D6A4F]/20 flex items-start gap-4">
                            <CheckCircle2 className="w-6 h-6 text-[#2D6A4F] shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 mb-1">
                                    No Obligation & Completely Confidential
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Your audit findings, prompt evaluation logs, and competitor gap metrics belong entirely to you. After delivery, you can implement the roadmap with your team or partner with Frostrek.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Request Form */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl shadow-[#2D6A4F]/5 sticky top-28">
                            {submitted ? (
                                <div className="text-center py-10 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/30 text-[#2D6A4F] flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h2 className="font-serif text-2xl font-bold text-[#2D6A4F]">
                                        Audit Request Received
                                    </h2>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Thank you! Our AI visibility team has queued your domain <strong className="text-gray-900">{formData.website || 'for audit'}</strong>. We will complete your multi-engine diagnostic and email your comprehensive report to <strong className="text-gray-900">{formData.email}</strong> within 5 to 7 business days.
                                    </p>
                                    <div className="pt-4">
                                        <a
                                            href="https://calendly.com/akash-mittal-frostrek/30min"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-[#2D6A4F] underline hover:text-[#1B4332]"
                                        >
                                            Prefer a direct debrief call? Book on Calendly
                                            <ArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6">
                                        <h2 className="font-serif text-2xl text-gray-900 font-bold mb-2">
                                            Request Your Free Audit
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            Fill out this form and our engineering team will initiate your brand's AI search probe.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                                                Your Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="e.g. Sarah Jenkins"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                                                Work Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="sarah@company.com"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                                                Company Website URL *
                                            </label>
                                            <input
                                                type="url"
                                                required
                                                value={formData.website}
                                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                placeholder="https://yourcompany.com"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                                                Top 2-3 Competitors (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.competitors}
                                                onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                                                placeholder="competitor1.com, competitor2.com"
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                                                Specific Questions or Focus Areas
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={formData.notes}
                                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                placeholder="e.g. We want to be cited for 'enterprise supply chain AI'..."
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full mt-2 py-3.5 px-6 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-medium text-sm transition-all shadow-md shadow-[#2D6A4F]/20 hover:shadow-lg hover:shadow-[#2D6A4F]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <span>Submitting request...</span>
                                            ) : (
                                                <>
                                                    <span>Claim Your Free Audit (5-7 Days)</span>
                                                    <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-[11px] text-center text-gray-400 mt-3">
                                            We respect your privacy. No spam. Report delivered directly to your inbox.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
