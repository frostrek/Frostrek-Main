export const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    {
        label: 'Products',
        href: '/products',
        megaMenu: [
            {
                title: '01 CORE AI AGENTS',
                items: [
                    { name: 'AI Calling Agent', href: '/products/ai-calling-agent', desc: 'Outbound & inbound voice AI for high-volume reminders and support.', icon: '/icons/Voice-ai-green.png', hoverBgClass: 'hover:bg-[#F0FDF4]' },
                    { name: 'WhatsApp Bot', href: '/products/whatsapp-bot', desc: 'Automated conversational flows on WhatsApp Business for leads.', icon: '/optimized/ai-agents-red.webp', hoverBgClass: 'hover:bg-[#FEF2F2]' },
                    { name: 'Website Chatbot (Frosty)', href: '/products/frosty-ai', desc: 'Embedded AI assistant trained on your docs for 24/7 support.', icon: '/icons/machine-learning-lavender.png', hoverBgClass: 'hover:bg-[#FDF4FA]' },
                ],
            },
            {
                title: '02 ENTERPRISE PLATFORMS',
                items: [
                    { name: 'Manufacturing AI OS', href: '/products/frostrek-manufacturing-os', desc: 'Real-time factory intelligence and production optimization.', icon: '/icons/manufacturing-lavender.png', hoverBgClass: 'hover:bg-[#FDF4FA]' },
                    { name: 'VettEdge', href: '/products/vettedge', desc: 'AI-driven investment vetting and credit underwriting platform.', icon: '/icons/ai-blue.png', hoverBgClass: 'hover:bg-[#F0F9FF]' },
                    { name: 'Vedashi Ecommerce', href: '/products/vedashi-ecommerce', desc: 'Premium, hyper-personalized online storefronts with WhatsApp recovery.', icon: '/optimized/vedashi-logo-sm.webp', hoverBgClass: 'hover:bg-[#F0FDF4]' },
                    { name: 'Hiyring', href: '/products/hiyring', desc: 'Transforming talent acquisition through autonomous AI video interviews.', icon: '/products/hiyring-logo.png', hoverBgClass: 'hover:bg-[#FFF7ED]' },
                ],
            },
        ],
    },
    {
        label: 'Solutions',
        href: '/solutions',
        megaMenu: [
            {
                title: '01 INTELLIGENT AUTOMATION',
                items: [
                    { name: 'AI Agents', href: '/solutions/ai-agents', desc: 'Intelligent, autonomous AI agents built for your business workflows.', icon: '/optimized/ai-agents-red.webp', hoverBgClass: 'hover:bg-[#FEF2F2]' },
                    { name: 'Manufacturing Intelligence', href: '/solutions/manufacturing-intelligence', desc: 'Real-time factory optimization and production AI.', icon: '/icons/manufacturing-lavender.png', hoverBgClass: 'hover:bg-[#FDF4FA]' },
                    { name: 'Voice AI', href: '/solutions/voice-ai', desc: 'Custom Voice AI systems for high-volume inbound and outbound calls.', icon: '/icons/Voice-ai-green.png', hoverBgClass: 'hover:bg-[#F0FDF4]' },
                ],
            },
            {
                title: '02 DIGITAL INFRASTRUCTURE',
                items: [
                    { name: 'Fintech & Custom Wallets', href: '/solutions/fintech-custom-wallets', desc: 'Centralised closed-loop digital loyalty currencies to bypass commissions.', icon: '/icons/fintech-yellow.png', hoverBgClass: 'hover:bg-[#FFFBEB]' },
                    { name: 'Multivendor Dashboard', href: '/solutions/multivendor-dashboard', desc: 'Consolidated automated command center for all your e-commerce channels.', icon: '/icons/multivendor-blue.png', hoverBgClass: 'hover:bg-[#F0F9FF]' },
                ],
            },
            {
                title: '03 AI/ML SERVICES',
                items: [
                    { name: 'LLM Model Training', href: '/solutions/llm-model-training', desc: 'Custom LLM fine-tuning, RLHF alignment, and RAG for enterprises.', icon: '/icons/machine-learning-green.png', hoverBgClass: 'hover:bg-[#F0FDF4]' },
                ],
            },
        ],
    },
    {
        label: 'Resources',
        href: '/resources',
        megaMenu: [
            {
                title: '',
                items: [
                    { name: 'Blog', href: '/resources/blog', desc: 'Read our latest articles and updates.', icon: '/icons/data-analytics-green.png', hoverBgClass: 'hover:bg-[#F0FDF4]' },
                    { name: 'FAQ', href: '/resources/faq', desc: 'Frequently asked questions.', icon: '/optimized/architecture-green.webp', hoverBgClass: 'hover:bg-[#F0FDF4]' },
                    { name: 'Case Studies', href: '/resources/case-studies', desc: 'Success stories and use cases.', icon: '/optimized/valuation-green.webp', hoverBgClass: 'hover:bg-[#FDF4FA]' },
                ],
            }
        ]
    },
    { label: 'Contact', href: '/contact' },
];

export const COMPANY_INFO = {
    name: 'Frostrek AI',
    address: '4th Floor, Unit No. 455, JMD Empire, Sector 62, Gurugram',
    contact: 'contact@frostrek.ai',
    socials: {
        linkedin: 'https://www.linkedin.com/company/frostrek/',
        instagram: 'https://www.instagram.com/frostrekai?igsh=bndyYWZ1NTA4NWR1',
    }
};
