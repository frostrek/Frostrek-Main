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
    Send,
    ShieldCheck
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import CuteBackground from '../components/ui/CuteBackground';

const AUDIT_DELIVERABLES = [
    {
        title: 'Multi-Engine AI Citation Benchmark',
        desc: 'We test your brand across Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini against high-intent buyer prompts in your niche.',
        timeline: 'Initial Snapshot',
        icon: Search,
        accent: '#0284C7',
        bg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]'
    },
    {
        title: 'Entity Architecture & Knowledge Graph Audit',
        desc: 'Diagnostic review of your JSON-LD schemas, official profile alignments, Google Knowledge Panel entity anchors, and topical clusters.',
        timeline: 'Core Review',
        icon: Layers,
        accent: '#6D28D9',
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]'
    },
    {
        title: 'AI Crawler & Machine-Readability Diagnostic',
        desc: 'Verification of server-side HTML rendering, robots.txt bot rules, crawlability, and search crawler accessibility.',
        timeline: 'Technical QA',
        icon: FileText,
        accent: '#166534',
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]'
    },
    {
        title: 'Competitor AI Share-of-Voice Analysis',
        desc: 'Direct head-to-head comparison against relevant competitors to examine citation frequency and recommendation presence.',
        timeline: 'Benchmarking',
        icon: BarChart3,
        accent: '#C2410C',
        bg: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]'
    },
    {
        title: 'Prioritized Search & AI Action Roadmap',
        desc: 'A prioritized overview of high-impact technical fixes, structured data improvements, and content opportunities.',
        timeline: 'Roadmap',
        icon: Target,
        accent: '#2D6A4F',
        bg: 'bg-[#E8F5EE]',
        border: 'border-[#2D6A4F]/20'
    }
];

const auditWebPageSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.frostrek.ai/audit#webpage',
    name: 'Free SEO & AI Visibility Audit | Frostrek AI',
    description: "Get an initial review of your website's discoverability and a sample of relevant AI-search questions.",
    url: 'https://www.frostrek.ai/audit',
    inLanguage: 'en',
    isPartOf: {
        '@type': 'WebSite',
        '@id': 'https://www.frostrek.ai/#website',
        name: 'Frostrek AI',
        url: 'https://www.frostrek.ai',
    },
    about: {
        '@type': 'Organization',
        '@id': 'https://www.frostrek.ai/#organization',
    },
    mainEntity: {
        '@type': 'Service',
        '@id': 'https://www.frostrek.ai/audit#service',
    },
});

const auditServiceSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.frostrek.ai/audit#service',
    name: 'Free SEO & AI Visibility Audit',
    description: "A preliminary assessment reviewing your website's discoverability, technical search health, and relevant AI-search prompt opportunities.",
    provider: {
        '@type': 'Organization',
        '@id': 'https://www.frostrek.ai/#organization',
        name: 'Frostrek AI',
        url: 'https://www.frostrek.ai',
    },
    serviceType: 'SEO, GEO & AEO Preliminary Audit',
    areaServed: ['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Worldwide'],
});

export default function AuditPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        source: 'SEO_GEO_AEO_FREE_AUDIT',
        business_name: '',
        website_url: '',
        contact_name: '',
        business_email: '',
        target_market: 'India',
        business_type: 'SaaS',
        top_priority: 'Google rankings',
        top_competitors: '',
        contact_permission: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate local receipt confirmation
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 600);
    };

    return (
        <article className="min-h-screen bg-brand-light-bg pt-28 pb-20 relative overflow-hidden font-body text-primary">
            <SEO
                title="Free SEO & AI Visibility Audit | Frostrek AI"
                description="Request a preliminary review of your website's discoverability and a sample of relevant AI-search questions."
                path="/audit"
                schema={[auditWebPageSchema, auditServiceSchema]}
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
                        Preliminary Discoverability Review • Zero Cost
                    </motion.div>

                    <SplitTextReveal
                        as="h1"
                        className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] mb-6 tracking-tight"
                        type="chars"
                        stagger={0.015}
                    >
                        Request a Free SEO & AI Visibility Audit
                    </SplitTextReveal>

                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Get an initial review of your website’s discoverability and a sample of relevant AI-search questions. We will outline visible opportunities and explain the next steps for a deeper paid engagement.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Left: What You Get */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                            <h2 className="font-serif text-2xl text-[#2D6A4F] font-bold mb-3">
                                What You Get in Your Preliminary Review
                            </h2>
                            <p className="text-sm text-gray-500 mb-8">
                                Every audit begins with understanding what prevents people and search systems from discovering your pages, prioritising what matters for buyers.
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
                            <ShieldCheck className="w-6 h-6 text-[#2D6A4F] shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 mb-1">
                                    Transparent Scope & Responsible Execution
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    The free preliminary review provides a high-level opportunity snapshot. A large-scale technical crawl, 50–200 prompt panel benchmark, or extensive engineering implementation is scoped separately with defined deliverables.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Request Form (Tab 10 Blueprint) */}
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
                                        Thanks. We will review your website (<strong className="text-gray-900">{formData.website_url || 'provided domain'}</strong>) and contact you at <strong className="text-gray-900">{formData.business_email}</strong> about the initial SEO and AI visibility assessment.
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
                                        <h2 className="font-serif text-xl sm:text-2xl text-gray-900 font-bold mb-1.5">
                                            Request Free Audit Snapshot
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            Share your website, business category, target countries and priority issue.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-3.5">
                                        {/* Hidden campaign source */}
                                        <input type="hidden" name="source" value={formData.source} />

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                                Business / Company Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.business_name}
                                                onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                                                placeholder="e.g. Acme Corporation"
                                                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                                Website URL *
                                            </label>
                                            <input
                                                type="url"
                                                required
                                                value={formData.website_url}
                                                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                                placeholder="https://yourcompany.com"
                                                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                                    Your Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.contact_name}
                                                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                                                    placeholder="e.g. Sarah Jenkins"
                                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                                    Business Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.business_email}
                                                    onChange={(e) => setFormData({ ...formData, business_email: e.target.value })}
                                                    placeholder="sarah@company.com"
                                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                                    Target Market *
                                                </label>
                                                <select
                                                    value={formData.target_market}
                                                    onChange={(e) => setFormData({ ...formData, target_market: e.target.value })}
                                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all bg-white"
                                                >
                                                    <option value="India">India</option>
                                                    <option value="USA">USA</option>
                                                    <option value="UK">UK</option>
                                                    <option value="UAE">UAE</option>
                                                    <option value="Multiple">Multiple Markets</option>
                                                    <option value="Other">Other Global</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                                    Business Type (Optional)
                                                </label>
                                                <select
                                                    value={formData.business_type}
                                                    onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                                                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all bg-white"
                                                >
                                                    <option value="SaaS">SaaS / B2B Tech</option>
                                                    <option value="E-commerce">E-commerce / D2C</option>
                                                    <option value="Services">Professional Services</option>
                                                    <option value="Healthcare">Healthcare & Clinics</option>
                                                    <option value="Education">Education & Study Abroad</option>
                                                    <option value="Other">Other Sector</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                                Top Priority *
                                            </label>
                                            <select
                                                value={formData.top_priority}
                                                onChange={(e) => setFormData({ ...formData, top_priority: e.target.value })}
                                                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all bg-white"
                                            >
                                                <option value="Google rankings">Google Search Rankings & Technical Health</option>
                                                <option value="AI mentions">AI Search Mentions & Citations (ChatGPT/Perplexity)</option>
                                                <option value="Site issues">Technical Crawling, Core Web Vitals & Indexing</option>
                                                <option value="Content">Content Quality, Direct Answers & FAQs</option>
                                                <option value="Leads">Conversion Rate & Qualified Lead Attribution</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                                                Top Competitors (Optional)
                                            </label>
                                            <textarea
                                                rows={2}
                                                value={formData.top_competitors}
                                                onChange={(e) => setFormData({ ...formData, top_competitors: e.target.value })}
                                                placeholder="Up to 3 competitor URLs or names..."
                                                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all resize-none"
                                            />
                                        </div>

                                        <div className="flex items-start gap-2 pt-1">
                                            <input
                                                type="checkbox"
                                                id="contact_permission"
                                                required
                                                checked={formData.contact_permission}
                                                onChange={(e) => setFormData({ ...formData, contact_permission: e.target.checked })}
                                                className="mt-0.5 rounded text-[#2D6A4F] focus:ring-[#2D6A4F] border-gray-300"
                                            />
                                            <label htmlFor="contact_permission" className="text-[11px] text-gray-600 leading-tight">
                                                I agree to be contacted about this audit request. *
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full mt-2 py-3 px-6 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-[#2D6A4F]/20 hover:shadow-lg hover:shadow-[#2D6A4F]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <span>Submitting request...</span>
                                            ) : (
                                                <>
                                                    <span>Request Free Audit Snapshot</span>
                                                    <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-[10px] text-center text-gray-400 mt-2">
                                            Preliminary review snapshot • Zero cost • No unpromised SLA
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
