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
                    { name: 'Lead Generation Agent', href: '/products/lead-agent', desc: 'Scrapes and enriches leads automatically from multiple sources.', icon: 'Users' },
                ],
            },
            {
                title: '02 ENTERPRISE PLATFORMS',
                items: [
                    { name: 'Manufacturing AI OS', href: '/products/frostrek-manufacturing-os', desc: 'Real-time factory intelligence and production optimization.', icon: 'Factory' },
                    { name: 'Web3 Commerce Wallet', href: '/products/frostrek-web3-commerce', desc: 'Decentralized sports merchandise and secure NFT ecosystem.', icon: 'Trophy' },
                    { name: 'CRM & ERP Automation', href: '/products/erpnext-ai', desc: 'Intelligent add-ons to streamline your existing workflows.', icon: 'Database' },
                ],
            },
            {
                title: '03 SMART AUTOMATION',
                items: [
                    { name: 'Invoice & Document AI', href: '/products/invoice-ai', desc: 'Extract and process data from invoices and contracts instantly.', icon: 'FileText' },
                    { name: 'Workflow Builder', href: '/products/workflow-builder', desc: 'Connect 100s of apps in custom no-code automation flows.', icon: 'Share2' },
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
                    { name: 'AI for Sales', href: '/solutions/sales', desc: 'Lead gen, CRM automation, and calling to close deals.', icon: 'TrendingUp' },
                    { name: 'AI for Support', href: '/solutions/support', desc: '24/7 customer service across WhatsApp, chat & voice.', icon: 'Headset' },
                    { name: 'Manufacturing Intelligence', href: '/solutions/manufacturing', desc: 'Real-time factory optimization and production AI.', icon: 'Factory' },
                ],
            },
            {
                title: '02 OPERATIONS & COMMERCE',
                items: [
                    { name: 'AI for ERP', href: '/solutions/erp', desc: 'Invoice AI, workflow builder, and internal knowledge bots.', icon: 'Server' },
                    { name: 'AI for eCommerce', href: '/solutions/ecommerce', desc: 'Cart recovery, content generation, competitor tracking.', icon: 'ShoppingCart' },
                    { name: 'Web3 Ecosystems', href: '/solutions/web3', desc: 'Next-gen decentralized commerce and NFT platforms.', icon: 'Trophy' },
                ],
            },
        ],
    },
    { label: 'Contact', href: '/contact' },
    { label: 'Resources', href: '/resources' },
];

export const COMPANY_INFO = {
    name: 'Frostrek',
    address: '4th Floor, Unit No. 455, JMD Empire, Sector 62, Gurgaon',
    contact: 'contact@frostrek.com',
    socials: {
        linkedin: 'https://www.linkedin.com/company/frostrek/',
        instagram: 'https://www.instagram.com/frostrekai?igsh=bndyYWZ1NTA4NWR1',
    }
};
