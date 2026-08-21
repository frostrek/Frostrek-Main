export interface NavItem {
    label: string;
    href?: string;
    megaMenu?: {
        title: string;
        items: {
            name: string;
            href: string;
            desc: string;
            icon: string;
            hoverBgClass?: string;
        }[];
    }[];
}

export const NAV_ITEMS: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    {
        label: 'Products',
        megaMenu: [
            {
                title: '01 AGENT BASED PLATFORMS',
                items: [

                    { name: 'Frosty Agent', href: '/products/frosty-agent', desc: 'Embedded AI assistant trained on your docs for 24/7 support.', icon: '/icons/machine-learning-lavender.webp', hoverBgClass: 'hover:bg-[#FDF4FA]' },
                    { name: 'VettEdge', href: '/products/vettedge', desc: 'AI-driven investment vetting and credit underwriting platform.', icon: '/icons/ai-blue.webp', hoverBgClass: 'hover:bg-[#F0F9FF]' },
                ],
            },
            {
                title: '02 ENTERPRISE PLATFORMS',
                items: [

                    { name: 'Vedashi Herbals', href: '/products/vedashi-ecommerce', desc: 'A premium Russian e-commerce platform importing authentic Indian wellness products and Ayurvedic cosmetics directly for the Russian market.', icon: '/optimized/vedashi-logo-sm.webp', hoverBgClass: 'hover:bg-[#F0FDF4]' },
                    { name: 'Hiyring', href: '/products/hiyring', desc: 'Transforming talent acquisition through autonomous AI video interviews.', icon: '/products/hiyring-logo.png', hoverBgClass: 'hover:bg-[#FFF7ED]' },
                ],
            },
        ],
    },
    {
        label: 'Solutions',
        megaMenu: [
            {
                title: '01 INTELLIGENT AUTOMATION',
                items: [
                    { name: 'AI Agents', href: '/solutions/ai-agents', desc: 'Intelligent, autonomous AI agents built for your business workflows.', icon: '/optimized/ai-agents-red.webp', hoverBgClass: 'hover:bg-[#FEF2F2]' },
                    { name: 'Manufacturing Intelligence', href: '/solutions/manufacturing-intelligence', desc: 'Real-time factory optimization and production AI.', icon: '/icons/manufacturing-lavender.webp', hoverBgClass: 'hover:bg-[#FDF4FA]' },
                    { name: 'Voice AI', href: '/solutions/voice-ai', desc: 'Custom Voice AI systems for high-volume inbound and outbound calls.', icon: '/icons/Voice-ai-green.webp', hoverBgClass: 'hover:bg-[#F0FDF4]' },
                ],
            },
            {
                title: '02 DIGITAL INFRASTRUCTURE',
                items: [
                    { name: 'Fintech & Custom Wallets', href: '/solutions/fintech-custom-wallets', desc: 'Centralised closed-loop digital loyalty currencies to bypass commissions.', icon: '/icons/fintech-yellow.webp', hoverBgClass: 'hover:bg-[#FFFBEB]' },
                    { name: 'Multivendor Dashboard', href: '/solutions/multivendor-dashboard', desc: 'Consolidated automated command center for all your e-commerce channels.', icon: '/icons/multivendor-blue.webp', hoverBgClass: 'hover:bg-[#F0F9FF]' },
                ],
            },
            {
                title: '03 AI/ML SERVICES',
                items: [
                    { name: 'LLM Model Training', href: '/solutions/llm-model-training', desc: 'Custom LLM fine-tuning, RLHF alignment, and RAG for enterprises.', icon: '/icons/machine-learning-green.webp', hoverBgClass: 'hover:bg-[#F0FDF4]' },
                ],
            },
        ],
    },
    {
        label: 'Resources',
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

export const EXTERNAL_LINKS = {
    linkedin: 'https://www.linkedin.com/company/frostrek/',
    instagram: 'https://www.instagram.com/frostrekai?igsh=bndyYWZ1NTA4NWR1',
    twitter: 'https://twitter.com/frostrek',
    youtube: 'https://www.youtube.com/@frostrekai',
    facebook: 'https://www.facebook.com/people/Frostrek-Ai/pfbid0VWudotryavaCWUi3utjYrUJYh35mGbSHmq73RnhksigdjJA28XQVBgNLz1Nryympl/',
    whatsapp: 'https://wa.me/17574722491',
    calendly: 'https://calendly.com/akash-mittal-frostrek/30min',
    hiyring: 'https://hiyring.com',
    vedashi: 'https://vedashiherbals.com',
    akashLinkedin: 'https://www.linkedin.com/in/akash-mittal/',
    frosty: 'https://frostyagent.com'
};

export const COMPANY_INFO = {
    name: 'Frostrek AI',
    address: '4th Floor, Unit No. 455, JMD Empire, Sector 62, Gurugram',
    contact: 'contact@frostrek.com',
    socials: {
        linkedin: EXTERNAL_LINKS.linkedin,
        instagram: EXTERNAL_LINKS.instagram,
        twitter: EXTERNAL_LINKS.twitter,
        youtube: EXTERNAL_LINKS.youtube,
        facebook: EXTERNAL_LINKS.facebook,
        whatsapp: EXTERNAL_LINKS.whatsapp,
    }
};
