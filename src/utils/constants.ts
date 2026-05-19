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
                    { name: 'AI Calling Agent', href: '/products/voice-ai', desc: 'Outbound & inbound voice AI for high-volume reminders and support.', icon: 'Mic' },
                    { name: 'WhatsApp Bot', href: '/products/whatsapp-agents', desc: 'Automated conversational flows on WhatsApp Business for leads.', icon: 'MessageSquare' },
                    { name: 'Website Chatbot (Frosty)', href: '/products/frosty-ai', desc: 'Embedded AI assistant trained on your docs for 24/7 support.', icon: 'Bot' },
                ],
            },
            {
                title: '02 ENTERPRISE PLATFORMS',
                items: [
                    { name: 'Manufacturing AI OS', href: '/products/frostrek-manufacturing-os', desc: 'Real-time factory intelligence and production optimization.', icon: 'Factory' },
                    { name: 'VettEdge', href: '/products/vettedge', desc: 'AI-driven investment vetting and credit underwriting platform.', icon: 'Shield' },
                    { name: 'Vedashi Ecommerce', href: '/products/vedashi-ecommerce', desc: 'Premium, hyper-personalized online storefronts with WhatsApp recovery.', icon: 'ShoppingBag' },
                    { name: 'Hiyring', href: '/products/hiyring', desc: 'Transforming talent acquisition through autonomous AI video interviews.', icon: 'Users' },
                ],
            },
        ],
    },
    {
        label: 'Solutions',
        href: '/solutions',
        megaMenu: [
            {
                title: '01 SALES & COMMUNICATION',
                items: [
                    { name: 'AI for Sales', href: '/solutions/sales', desc: 'Voice AI calling, WhatsApp bots, and messaging to close deals.', icon: 'TrendingUp' },
                    { name: 'Manufacturing Intelligence', href: '/solutions/manufacturing', desc: 'Real-time factory optimization and production AI.', icon: 'Factory' },
                    { name: 'AI Agents', href: '/products/frosty-ai', desc: 'Intelligent conversational AI agents for 24/7 automated support.', icon: 'Bot' },
                    { name: 'Voice AI', href: '/products/voice-ai', desc: 'Natural voice interactions with sub-200ms processing latency.', icon: 'Mic' },
                ],
            },
            {
                title: '02 OPERATIONS & COMMERCE',
                items: [
                    { name: 'Fintech & Custom Wallets', href: '/solutions/web3', desc: 'Centralised closed-loop digital loyalty currencies to bypass commissions.', icon: 'Trophy' },
                    { name: 'Multivendor Dashboard', href: '/products/multivendor-dashboard', desc: 'Consolidated automated command center for all your e-commerce channels.', icon: 'Layers' },
                ],
            },
        ],
    },
    { label: 'Contact', href: '/contact' },
    { label: 'Resources', href: '/resources' },
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
