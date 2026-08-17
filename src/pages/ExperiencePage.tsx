import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Zap, Linkedin } from 'lucide-react';
import VoiceCallWidget from '../components/experience/VoiceCallWidget';
import ChatbotDemo from '../components/experience/ChatbotDemo';
import LinkedinOutreachDemo from '../components/demos/LinkedinOutreachDemo';
import CuteBackground from '../components/ui/CuteBackground';
import { useEffect } from 'react';
import SEO from '../components/seo/SEO';
import SplitTextReveal from '../components/ui/SplitTextReveal';

const ExperiencePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-white text-gray-900">
            <SEO
                title="Experience AI in Action | Frostrek AI"
                description="Try Frostrek AI solutions yourself. Test our autonomous voice agents, enterprise chatbots, and smart outreach tools live."
                path="/experience"
            />
            {/* Background */}
            <CuteBackground />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 shadow-sm mx-auto">
                            <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                            <span className="text-sm font-semibold text-[#2D6A4F] font-body">Interactive Demo</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black leading-[1.1] tracking-[-0.01em]">
                                <SplitTextReveal as="span" type="chars" stagger={0.03} once={false}>
                                    Experience
                                </SplitTextReveal>
                                {' '}
                                <span className="relative inline-block text-[#2D6A4F]">
                                    <SplitTextReveal as="span" type="chars" stagger={0.03} once={false} delay={0.3}>
                                        AI in Action
                                    </SplitTextReveal>
                                    <motion.span
                                        className="absolute -bottom-1.5 left-0 h-1 bg-gradient-to-r from-[#2D6A4F] to-[#2D6A4F]/40 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    />
                                </span>
                            </h1>
                        </div>

                        <SplitTextReveal
                            as="p"
                            className="text-lg sm:text-xl max-w-2xl mx-auto text-slate-600 font-body leading-relaxed"
                            type="words"
                            stagger={0.015}
                            once={false}
                            delay={0.6}
                        >
                            Don't just read about our AI solutions - try them yourself. Test our voice AI and chatbot live, right here.
                        </SplitTextReveal>
                    </div>
                </div>
            </section>

            {/* Demo Cards Section */}
            <section className="relative pb-24 px-4 sm:px-6 lg:px-8 z-10">
                <div className="max-w-6xl mx-auto space-y-16">
                    {/* Top Row: Voice & Chat */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Voice AI Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm bg-[#F0FDF4] border border-[#BBF7D0]">
                                    <img src="/icons/Voice-ai-green.webp" alt="Voice AI" className="w-6 h-6 object-contain" loading="lazy" width={512} height={512} />
                                </div>
                                <div className="space-y-0.5">
                                    <h2 className="text-2xl font-serif font-semibold text-gray-900 leading-none">Voice AI Agent</h2>
                                    <p className="text-xs sm:text-sm text-slate-500 font-body">Real-time voice conversation</p>
                                </div>
                            </div>

                            <VoiceCallWidget />

                            <div className="rounded-2xl p-5 border bg-[#F0FDF4] border-[#BBF7D0] shadow-sm">
                                <h3 className="font-serif font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <Zap className="w-4.5 h-4.5 text-[#1B4332]" />
                                    What to try:
                                </h3>
                                <ul className="text-sm space-y-1.5 text-slate-600 font-body">
                                    <li className="flex items-center gap-1.5">• Ask about Frostrek's services</li>
                                    <li className="flex items-center gap-1.5">• Request a demo or quote</li>
                                    <li className="flex items-center gap-1.5">• Inquire about AI solutions</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Chatbot Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br from-[#D67CBA] to-[#C060A0]">
                                    <MessageSquare className="w-5.5 h-5.5 text-white" />
                                </div>
                                <div className="space-y-0.5">
                                    <h2 className="text-2xl font-serif font-semibold text-gray-900 leading-none">AI Chatbot</h2>
                                    <p className="text-xs sm:text-sm text-slate-500 font-body">Interactive text assistant</p>
                                </div>
                            </div>

                            <ChatbotDemo />

                            <div className="rounded-2xl p-5 border bg-gradient-to-r from-[#FDF4FA] to-white border-[#F2BAE4] shadow-sm">
                                <h3 className="font-serif font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4.5 h-4.5 text-[#D67CBA]" />
                                    Features:
                                </h3>
                                <ul className="text-sm space-y-1.5 text-slate-600 font-body">
                                    <li className="flex items-center gap-1.5">• Natural language understanding</li>
                                    <li className="flex items-center gap-1.5">• Streaming responses</li>
                                    <li className="flex items-center gap-1.5">• Context-aware replies</li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Row: LinkedIn Outreach & Future Products */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* LinkedIn Outreach Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-[#0077B5]">
                                    <Linkedin className="w-5.5 h-5.5 text-white" />
                                </div>
                                <div className="space-y-0.5">
                                    <span className="inline-block py-0.5 px-2.5 rounded-full text-[9px] font-semibold tracking-wider mb-1 bg-[#0077B5]/10 text-[#0077B5] font-body">
                                        NEW
                                    </span>
                                    <h2 className="text-2xl font-serif font-semibold text-gray-900 leading-none">LinkedIn Outreach</h2>
                                    <p className="text-xs sm:text-sm text-slate-500 font-body">Automated lead generation</p>
                                </div>
                            </div>

                            <LinkedinOutreachDemo />

                            <div className="rounded-2xl p-5 border bg-gradient-to-r from-[#E8F5EE]/30 to-white border-blue-100 shadow-sm">
                                <h3 className="font-serif font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Zap className="w-4.5 h-4.5 text-[#0077B5]" />
                                    Features:
                                </h3>
                                <ul className="text-sm space-y-1.5 text-slate-600 font-body">
                                    <li className="flex items-center gap-1.5">• Target industry & location filtering</li>
                                    <li className="flex items-center gap-1.5">• Decision maker identification</li>
                                    <li className="flex items-center gap-1.5">• Verified contact extraction</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Placeholder for Future Product */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6 flex flex-col items-center justify-center"
                        >
                            <div className="w-full h-full min-h-[400px] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 border-gray-200 bg-gray-50/50">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-white border border-gray-100 shadow-sm">
                                    <Sparkles className="w-8 h-8 text-[#2D6A4F]" />
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-2 text-gray-900">More Coming Soon</h3>
                                <p className="text-center text-sm max-w-xs text-slate-500 font-body font-medium leading-relaxed">
                                    We're building more AI-powered tools. Stay tuned for exciting new demos!
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ExperiencePage;
