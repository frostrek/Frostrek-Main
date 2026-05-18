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
                    { name: 'Fintech & Custom Wallets', href: '/products/frostrek-web3-commerce', desc: 'Centralised fan loyalty currency that bypasses gateway commissions.', icon: 'Trophy' },
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
                    { name: 'AI for Sales', href: '/solutions/sales', desc: 'Outbound voice agents, smart outreach, and automated scheduling to close deals.', icon: 'TrendingUp' },
                    { name: 'AI for Support', href: '/solutions/support', desc: '24/7 customer service across WhatsApp, chat & voice.', icon: 'Headset' },
                    { name: 'Manufacturing Intelligence', href: '/solutions/manufacturing', desc: 'Real-time factory optimization and production AI.', icon: 'Factory' },
                ],
            },
            {
                title: '02 OPERATIONS & COMMERCE',
                items: [
                    { name: 'AI for ERP', href: '/solutions/erp', desc: 'Custom knowledge bases, internal support agents, and integrated data tools.', icon: 'Server' },
                    { name: 'AI for eCommerce', href: '/solutions/ecommerce', desc: 'Cart recovery, content generation, competitor tracking.', icon: 'ShoppingCart' },
                    { name: 'Fintech & Custom Wallets', href: '/solutions/web3', desc: 'Centralised closed-loop digital loyalty currencies to bypass commissions.', icon: 'Trophy' },
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
