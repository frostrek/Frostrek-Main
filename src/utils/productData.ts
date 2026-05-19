import {
    Bot, Mic, Share2, ShoppingCart, Headset, BarChart, Server, Globe, Smartphone, Zap, Shield, Users, Clock, Phone, FileText, Activity, Podcast, Calendar, DollarSign, Filter, Eye, MousePointerClick, Send, CheckCircle, Truck, RefreshCw, Settings, Factory, Brain, ShieldCheck, Cpu, Radio, Database, TrendingUp, ShoppingBag, Layers, MessageSquare
} from 'lucide-react';

export interface ProductStatistic {
    value: string;
    label: string;
    icon?: any;
    breakdown?: { value: number; label: string; color?: string; }[];
}

export interface ProductProcessStep {
    step: string;
    title: string;
    description: string;
}

export interface UseCase {
    title: string;
    description: string;
    icon?: any;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface ProductFeature {
    title: string;
    description: string;
    icon: any;
}

export interface ProductBenefit {
    title: string;
    description: string;
    image?: string;
}

export interface ProductData {
    id: string;
    tagline: string;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    heroImage?: string;
    demoImage?: string; // For Experience Zone
    isCaseStudy?: boolean; // Marks product as a live Frostrek build
    statistics: ProductStatistic[];
    features: ProductFeature[];
    process: ProductProcessStep[];
    benefits: ProductBenefit[];
    useCases: UseCase[];
    faq: FAQItem[];
    keywords?: string;
}

export const PRODUCT_DATA: Record<string, ProductData> = {
    '/products/vettedge': {
        id: 'vettedge',
        tagline: 'AI FINANCE & UNDERWRITING',
        title: 'VettEdge',
        subtitle: 'Intelligent Investment Vetting & Credit Underwriting',
        description: 'An enterprise-grade financial vetting and credit underwriting platform powered by autonomous AI agents. Accelerate due diligence, automate compliance checks, and minimize risk in real-time.',
        badge: 'Fintech · Underwriting · Compliance',
        keywords: 'autonomous credit underwriting AI, investment vetting platform, automated financial due diligence, AI finance compliance software',
        isCaseStudy: true,
        heroImage: '/saf-hero.png',
        demoImage: '/saf-dashboard.png',

        statistics: [
            {
                value: '99.2%',
                label: 'Underwriting Accuracy',
                icon: ShieldCheck,
            },
            {
                value: '15 mins',
                label: 'Avg. Vetting Time',
                icon: Clock,
            },
            {
                value: '70%',
                label: 'Operational Savings',
                icon: DollarSign,
            },
            {
                value: 'Zero',
                label: 'Compliance Breaches',
                icon: Shield,
            },
        ],

        process: [
            {
                step: '01',
                title: 'Ingest & Parse',
                description: 'AI parsing engines ingest tax returns, bank statements, and legal corporate filings instantly, extracting structured financial variables.',
            },
            {
                step: '02',
                title: 'Analyze & Verify',
                description: 'Autonomous agents cross-reference credit bureaus, fraud registers, and internal rulesets to run advanced credit scoring models.',
            },
            {
                step: '03',
                title: 'Decide & Comply',
                description: 'Generate auditing-compliant vetting reports and underwriting decisions, ready for human officer sign-off in minutes.',
            },
        ],

        features: [
            {
                title: 'Automated Underwriting',
                description: 'State-of-the-art underwriting engines execute sophisticated risk evaluation algorithms based on thousands of data points.',
                icon: Cpu,
            },
            {
                title: 'Smart Document Parsing',
                description: 'Extract structured balance sheets, P&Ls, and tax data from unformatted PDF bank statements and tax filings with 99.9% accuracy.',
                icon: FileText,
            },
            {
                title: 'Anti-Fraud Auditing',
                description: 'Real-time checking against global financial watchlist, AML records, and entity registers to identify risk vectors.',
                icon: ShieldCheck,
            },
            {
                title: 'Continuous Compliance',
                description: 'Adherence to regional underwriting regulations and finance audits with self-documenting decision trails.',
                icon: Shield,
            },
            {
                title: 'Executive Summary Builder',
                description: 'Generate human-readable financial analysis briefs summarizing credit risks and positive indicators instantly.',
                icon: Brain,
            },
        ],

        benefits: [
            {
                title: 'Audit-Ready Traceability',
                description: 'Every recommendation made by VettEdge is fully traced back to source document clauses and metrics, allowing seamless human review and verification.',
            },
            {
                title: 'Accelerate Deal Flow',
                description: 'Slash transaction cycles from weeks to minutes, allowing your investment and underwriting teams to focus on high-value structuring rather than repetitive data entry.',
            },
        ],

        useCases: [
            {
                title: 'Commercial Banks',
                description: 'Drastically cut business loan approval time from weeks to minutes while maintaining absolute risk accuracy.',
                icon: DollarSign,
            },
            {
                title: 'Venture Capital & PE',
                description: 'Perform high-throughput due diligence on potential portfolio investments, verifying claims in seconds.',
                icon: TrendingUp,
            },
            {
                title: 'Micro-Lenders',
                description: 'Deploy micro-credit assessment at scale, unlocking fast capital for small businesses.',
                icon: Zap,
            },
        ],

        faq: [
            {
                question: 'Is VettEdge compliant with global banking regulations?',
                answer: 'Yes. VettEdge is engineered to follow strict audit trails and complies with major financial standards including GDPR and local credit regulations. Every decision is fully explained with traceable data steps.',
            },
            {
                question: 'Can it parse scanned paper documents?',
                answer: 'Absolutely. We utilize advanced OCR alongside deep learning models to parse hand-signed applications and poorly scanned documents with industry-leading precision.',
            },
        ],
    },
    '/products/vedashi-ecommerce': {
        id: 'vedashi-ecommerce',
        tagline: 'AI E-COMMERCE PLATFORM',
        title: 'Vedashi Ecommerce',
        subtitle: 'Cinematic Hyper-Personalized Shopping Ecosystem',
        description: 'A high-performance enterprise e-commerce platform built to drive conversions through hyper-personalization, intelligent product recommendations, WhatsApp cart recovery, and GSAP-powered premium layouts.',
        badge: 'E-Commerce · Personalization · Conversions',
        keywords: 'hyper-personalized ecommerce AI platform, bespoke retail recommendation engine, WhatsApp shopping cart recovery, premium GSAP online storefronts',
        isCaseStudy: true,
        heroImage: '/pcc-hero.png',
        demoImage: '/pcc-dashboard.png',

        statistics: [
            {
                value: '3.5x',
                label: 'Conversion Lift',
                icon: TrendingUp,
            },
            {
                value: '45%',
                label: 'Cart Recovery Rate',
                icon: RefreshCw,
            },
            {
                value: '99.9%',
                label: 'Uptime Architecture',
                icon: Server,
            },
            {
                value: 'Sub-1s',
                label: 'Load Response Time',
                icon: Zap,
            },
        ],

        process: [
            {
                step: '01',
                title: 'Hyper-Personalization',
                description: 'Analyze customer behavior patterns and real-time browsing context to dynamically adjust layout and product rankings.',
            },
            {
                step: '02',
                title: 'Engage & Convert',
                description: 'Present personalized recommendations, visual search options, and seamless checkout flows to reduce purchase friction.',
            },
            {
                step: '03',
                title: 'Re-Engage Automatically',
                description: 'Deploy automated cart-recovery sequences via WhatsApp or email to capture lost revenue with tailored promotional offers.',
            },
        ],

        features: [
            {
                title: 'Personalized Recommendations',
                description: 'Recommend target products based on high-affinity matching models, past purchases, and contextual shopping search history.',
                icon: ShoppingBag,
            },
            {
                title: 'Cinematic Storefronts',
                description: 'Deliver ultra-premium brand experiences with fast loading, glassmorphism designs, and smooth scroll animations.',
                icon: Layers,
            },
            {
                title: 'WhatsApp Cart Recovery',
                description: 'Re-engage shoppers who left items in their carts using interactive WhatsApp bots with one-click purchase links.',
                icon: MessageSquare,
            },
            {
                title: 'Dynamic Pricing & Offers',
                description: 'Adjust prices and launch custom discounts in real-time based on demand, seasonal trends, and competitor behavior.',
                icon: DollarSign,
            },
            {
                title: 'Predictive Inventory',
                description: 'Forecast retail inventory needs to optimize warehousing costs and prevent stockouts or overstocks.',
                icon: Database,
            },
        ],

        benefits: [
            {
                title: 'Unparalleled User Engagement',
                description: 'Turn passive visitors into loyal customers by tailoring every visual element, recommendation, and discount directly to their real-time interests.',
            },
            {
                title: 'Recover Lost Revenue',
                description: 'Re-engage cart abandoners instantly in their favorite chat apps where open rates are 98%, bypassing email inbox noise to recapture revenue.',
            },
        ],

        useCases: [
            {
                title: 'D2C Brands',
                description: 'Scale online storefronts to handle high-frequency campaigns with personalized landing page experiences.',
                icon: ShoppingBag,
            },
            {
                title: 'Multi-Brand Retail',
                description: 'Integrate complex product catalogs and manage personalized discovery for millions of unique visitors.',
                icon: Layers,
            },
            {
                title: 'Global E-Commerce',
                description: 'Deploy multi-currency and multi-language shopping systems that operate seamlessly around the globe.',
                icon: Globe,
            },
        ],

        faq: [
            {
                question: 'Does Vedashi Ecommerce support integration with third-party logistics?',
                answer: 'Yes, Vedashi Ecommerce comes with pre-built APIs to connect with top logistics networks, WMS systems, and ERP backends.',
            },
            {
                question: 'How does the WhatsApp recovery feature work?',
                answer: 'When a customer abandons their cart, a secure webhook triggers a personalized message on WhatsApp. The shopper can complete the purchase via a one-click magic link.',
            },
        ],
    },
    '/products/frostrek-manufacturing-os': {
        id: 'frostrek-manufacturing-os',
        tagline: 'MANUFACTURING INTELLIGENCE PLATFORM',
        title: 'Frostrek Manufacturing OS',
        subtitle: 'From Disconnected Systems to Real-Time Factory Visibility',
        description:
            'Our flagship manufacturing platform that unifies disconnected factory systems (ERP, WMS, SCADA) into a single intelligence hub. Built from the ground up to deliver live sensor dashboards, automated cost analytics, and an AI-driven production scheduler capable of recovering massive production losses.',
        badge: 'Enterprise Platform',
        keywords: 'manufacturing telemetry AI integration USA, AI production scheduling engine UK, real-time factory floor analytics India, predictive maintenance AI globally',
        isCaseStudy: true,
        heroImage: '/saf-hero.png',        // replace with your actual image path
        demoImage: '/saf-dashboard.png',   // replace with your actual image path

        statistics: [
            {
                value: '4',
                label: 'Systems Unified',
                icon: Database,
                breakdown: [
                    { value: 25, label: 'Syspro ERP' },
                    { value: 25, label: 'Fusion WMS' },
                    { value: 25, label: 'CFAM PLC' },
                    { value: 25, label: 'Famsun SCADA' },
                ],
            },
            {
                value: '30s',
                label: 'Live Sensor Refresh',
                icon: Zap,
            },
            {
                value: '25t',
                label: 'Weekly Production Recovered',
                icon: TrendingUp,
            },
            {
                value: 'R19.5M',
                label: 'Annual Value Recovered',
                icon: DollarSign,
            },
        ],

        process: [
            {
                step: '01',
                title: 'Connect All Sources',
                description:
                    'Read-only integrations to Syspro ERP (SQL), Fusion WMS (REST API), CFAM Allen Bradley PLC (EtherNet/IP), and Famsun SCADA (MQTT) - zero changes to the factory firewall.',
            },
            {
                step: '02',
                title: 'Unify & Visualise',
                description:
                    'A cloud-hosted FastAPI + TimescaleDB backend streams all data to a Next.js real-time dashboard accessible on any device - including from outside the factory.',
            },
            {
                step: '03',
                title: 'Intelligence & Optimisation',
                description:
                    'Phase 2 adds live cost-per-kg analytics and sensor alerting. Phase 3 deploys a Google OR-Tools AI scheduler that sequences production runs to minimise changeover time.',
            },
        ],

        features: [
            {
                title: 'Real-Time Factory Dashboard',
                description:
                    'Live extruder telemetry, equipment status, sales orders, and warehouse job cards in a single unified view - accessible from any device, anywhere.',
                icon: Eye,
            },
            {
                title: 'Digital Shift Handover',
                description:
                    'Structured digital handover forms replace WhatsApp voice notes and drop cards - every shift, every team, every quality reading captured and searchable.',
                icon: Clock,
            },
            {
                title: 'Live Cost Per KG Engine',
                description:
                    'Real-time production cost per product calculated from raw material consumption (Syspro BOM), energy watt readings (CFAM PLC), and labour costs - updating every batch.',
                icon: DollarSign,
            },
            {
                title: 'Automated Sensor Alerting',
                description:
                    'Configurable threshold alerts per product per sensor. Critical alerts fire to WhatsApp (Twilio) and email within 60 seconds - before quality fails, not after.',
                icon: Radio,
            },
            {
                title: 'AI Production Scheduler',
                description:
                    'Google OR-Tools constraint solver sequences the weekly production plan to group similar mixes, minimise changeover time, and protect delivery deadlines.',
                icon: Brain,
            },
            {
                title: 'Load-Shedding Resilient',
                description:
                    'Every data point is buffered to a local SQLite store before cloud push. On power return, the agent auto-replays all buffered data with zero gaps - even after a 6-hour outage.',
                icon: ShieldCheck,
            },
        ],

        benefits: [
            {
                title: 'Zero New Hardware Required',
                description:
                    'The entire platform runs on one existing factory Windows PC and a cloud server. No PLC modifications, no new sensors, no firewall changes - pure software intelligence layered on top of existing systems.',
            },
            {
                title: 'Full Visibility From Anywhere',
                description:
                    'The MD can view live extruder readings, production output, and cost per kg from his phone while off-site. Shift leaders submit handovers digitally. QC controllers log NIR and moisture readings on the floor.',
            },
            {
                title: 'Recovering 25+ Tonnes Per Week',
                description:
                    'Twenty changeovers per week at 1–2 hours each equals up to 42 tonnes of lost production. The AI scheduler recovers half of that with zero capital investment - purely through smarter sequencing.',
            },
        ],

        useCases: [
            {
                title: 'Aquatic Feed Manufacturing',
                description:
                    'Tilapia, trout, abalone, catfish, koi, and pet food - all product lines unified on one platform with per-product cost tracking and alert thresholds.',
                icon: Factory,
            },
            {
                title: 'Multi-Shift Operations',
                description:
                    'Four rotating shift teams. Digital handovers, quality capture, and shift performance reporting - structured, searchable, and never lost in a WhatsApp group.',
                icon: Clock,
            },
            {
                title: 'ERP + Factory Floor Integration',
                description:
                    'Sales orders from Syspro, warehouse movements from Fusion WMS, and live PLC sensor data - joined and displayed together for the first time.',
                icon: Cpu,
            },
        ],

        faq: [
            {
                question: 'Does this require changes to existing factory systems?',
                answer:
                    'No. Every integration is read-only. The factory firewall requires zero changes. Data flows outbound only - from the factory to the cloud. Existing systems are never modified.',
            },
            {
                question: 'How does it handle South African load-shedding?',
                answer:
                    'The on-premise data agent writes every reading to a local SQLite buffer before pushing to the cloud. When power returns, the agent replays all buffered data in chronological order. Zero data gaps are guaranteed even after a 6-hour outage.',
            },
            {
                question: 'How long does Phase 1 take to deploy?',
                answer:
                    'Phase 1 - the full real-time dashboard and digital shift handover - is delivered in 6 to 8 weeks. All four data sources are connected within the first four weeks.',
            },
            {
                question: 'What does the AI scheduler actually do?',
                answer:
                    'It takes the weekly Syspro order book, applies a learned changeover time matrix (built from real shift handover data), and uses Google OR-Tools to find the production sequence that minimises total changeover time while guaranteeing all delivery deadlines are met. A human production manager reviews and approves every plan before it goes live.',
            },
            {
                question: 'Is this only for aquatic feed manufacturers?',
                answer:
                    'No. The architecture - connecting ERP, WMS, PLCs, and SCADA into a unified intelligence platform - applies to any 24/7 process manufacturer running disconnected systems. Feed mills, food processing, chemicals, plastics, and similar operations are all candidates.',
            },
        ],
    },
    '/products/frosty-ai': {
        id: 'frosty-ai',
        tagline: 'AUTOMATE CUSTOMER SUPPORT',
        title: 'Frosty AI Agent',
        subtitle: 'Intelligent Conversations, Infinite Scale',
        description: 'Empower your support team with a next-gen AI agent that understands context, sentiment, and intent. Resolve up to 80% of inquiries instantly without human intervention.',
        badge: 'Top Rated Support AI',
        keywords: 'enterprise customer support AI bots USA, automated ticket triage system UK, multilingual conversational AI agents India, custom knowledge base chatbots globally',
        heroImage: '/agent1.png',
        demoImage: '/optimized/chatbot-rafiki.webp',
        statistics: [
            { value: '80%', label: 'Automated Resolutions', icon: Zap },
            { value: '24/7', label: 'Availability', icon: Clock },
            { value: '30s', label: 'Avg. Response Time', icon: BarChart },
            { value: '3x', label: 'ROI in Year 1', icon: Database },
        ],
        process: [
            { step: '01', title: 'Connect Data', description: 'Link your Knowledge Base, CRM, and past tickets.' },
            { step: '02', title: 'Train Agent', description: 'Our AI automatically learns your brand voice and policies.' },
            { step: '03', title: 'Go Live', description: 'Deploy instantly across Web, WhatsApp, and Social channels.' }
        ],
        features: [
            { title: 'Contextual Understanding', description: 'Goes beyond keywords to understand customer intent and urgency.', icon: Bot },
            { title: 'Sentiment Analysis', description: 'Detects frustration and intelligently routes to human agents.', icon: Headset },
            { title: 'Omnichannel Deployment', description: 'One agent, everywhere: Website, WhatsApp, Messenger, Instagram.', icon: Share2 },
            { title: 'Smart Handoff', description: 'Seamlessly transfers complex issues to humans with full chat history.', icon: Users },
        ],
        benefits: [
            { title: 'Scale Without Hiring', description: 'Handle peak season traffic without adding headcount.' },
            { title: 'Consistent Experience', description: 'Deliver on-brand responses 100% of the time.' },
        ],
        useCases: [
            { title: 'E-Commerce Support', description: 'Order tracking, returns, and product FAQs.', icon: ShoppingCart },
            { title: 'SaaS Helpdesk', description: 'Technical troubleshooting and account management.', icon: Server },
            { title: 'Banking Assistant', description: 'Balance checks, transaction history, and fraud alerts.', icon: Shield },
        ],
        faq: [
            { question: 'How long does it take to train?', answer: 'Most clients are live within 2 weeks. Our pre-trained models require minimal fine-tuning.' },
            { question: 'Does it integrate with Zendesk/Salesforce?', answer: 'Yes, we have native integrations with all major helpdesk and CRM platforms.' },
            { question: 'What happens if the AI makes a mistake?', answer: 'You can set confidence thresholds. Low-confidence queries are automatically routed to humans.' },
        ]
    },
    '/products/voice-ai': {
        id: 'voice-ai',
        tagline: 'REVOLUTIONIZE YOUR CALL CENTER',
        title: 'Voice AI Agent',
        subtitle: 'Human-like Voice Interactions at Scale',
        description: 'Create better customer experiences with less effort. Deploy low-latency voice AI agents that handle inbound support and outbound sales calls with natural, human-like fluidity.',
        badge: 'Low Latency Voice',
        keywords: 'low-latency voice AI agents USA, human-like outbound sales AI UK, automated inbound voice support India, compliant AI debt collection bots globally',
        heroImage: '/optimized/frostrek_VA.webp',
        demoImage: '/vn1.png',
        statistics: [
            { value: '50%', label: 'Reduction in Costs', icon: BarChart },
            { value: '90%', label: 'Call Automation', icon: Phone },
            { value: '1.2s', label: 'Ultra-Low Latency', icon: Zap },
            { value: '40+', label: 'Languages Supported', icon: Globe },
        ],
        process: [
            { step: '01', title: 'Design Flow', description: 'Use our drag-and-drop builder to create conversation paths.' },
            { step: '02', title: 'Select Voice', description: 'Choose from our library of premium neural voices or clone your own.' },
            { step: '03', title: 'Deploy', description: 'Integrate with your telephony provider (Twilio, Vonage, etc.) instantly.' }
        ],
        features: [
            { title: 'Real-time Transcription', description: 'Transcribes and analyzes calls as they happen for instant insights.', icon: FileText },
            { title: 'Natural Voice Synthesis', description: 'Indistinguishable from human agents with emotional modulation.', icon: Mic },
            { title: 'Interrupt Handling', description: 'Handles interruptions and "umms" naturally like a real person.', icon: Activity },
            { title: 'Inbound & Outbound', description: 'Perfect for support hotlines or proactive sales outreach.', icon: Podcast },
        ],
        benefits: [
            { title: 'Endless Capacity', description: 'Never put a customer on hold again.' },
            { title: 'Perfect Compliance', description: 'Every call adheres strictly to regulatory scripts.' },
        ],
        useCases: [
            { title: 'Appointment Scheduling', description: 'Clinics, Salons, and Service businesses.', icon: Calendar },
            { title: 'Debt Collection', description: 'Empathetic, compliant, and persistent payment reminders.', icon: DollarSign },
            { title: 'Lead Qualification', description: 'Filter inbound leads before routing to sales executives.', icon: Filter },
        ],
        faq: [
            { question: 'Does it sound robotic?', answer: 'Not at all. We use the latest neural TTS engines for hyper-realistic intonation and breathing.' },
            { question: 'Can it handle accents?', answer: 'Yes, our models are trained on diverse datasets to understand global accents.' },
            { question: 'Is it PCI compliant?', answer: 'Yes, we support secure DTMF masking for credit card payments.' },
        ]
    },
    '/products/whatsapp-agents': {
        id: 'whatsapp',
        tagline: 'ENGAGE WHERE IT MATTERS',
        title: 'WhatsApp Automation',
        subtitle: 'Turn Conversations into Revenue',
        description: 'Unlock the power of the world\'s most popular messaging app. Automate notifications, support, and sales directly in WhatsApp with official API integration.',
        badge: 'Meta Business Partner',
        keywords: 'WhatsApp API automation India, automated WhatsApp sales funnels UK, meta verified business bots USA, WhatsApp cart recovery AI globally',
        heroImage: '/wp1.png', // Placeholder
        demoImage: '/wp2.png',
        statistics: [
            { value: '98%', label: 'Open Rate', icon: Eye },
            { value: '45%', label: 'Click-Through Rate', icon: MousePointerClick },
            { value: '5x', label: 'Higher Conversion', icon: BarChart },
            { value: '2B+', label: 'Active Users', icon: Users },
        ],
        process: [
            { step: '01', title: 'Get Verified', description: 'We help you apply for the official WhatsApp Business API.' },
            { step: '02', title: 'Build Templates', description: 'Create rich message templates for approval.' },
            { step: '03', title: 'Launch Campaigns', description: 'Send broadcasts and handle responses automatically.' }
        ],
        features: [
            { title: 'Automated Broadcasts', description: 'Send personalized offers and updates to thousands instantly.', icon: Send },
            { title: 'Interactive Buttons', description: 'Guide customers with Quick Replies and Call-to-Action buttons.', icon: Smartphone },
            { title: 'Catalog Integration', description: 'Showcase products and process orders without leaving the chat.', icon: ShoppingCart },
            { title: 'Green Tick Support', description: 'Assistance in getting the verified business badge.', icon: CheckCircle },
        ],
        benefits: [
            { title: 'Instant Reach', description: 'Reach customers instantly on their lock screens.' },
            { title: 'Media Rich', description: 'Send images, videos, and PDFs effortlessly.' },
        ],
        useCases: [
            { title: 'Order Updates', description: 'Shipping notifications and delivery tracking.', icon: Truck },
            { title: 'Abandoned Cart', description: 'Recover lost sales with timely reminders.', icon: RefreshCw },
            { title: 'Verification', description: 'Send OTPs securely via WhatsApp.', icon: Smartphone },
        ],
        faq: [
            { question: 'Is there a risk of getting banned?', answer: 'No, we use the official API which is fully compliant with WhatsApp policies.' },
            { question: 'Can I send promotional messages?', answer: 'Yes, using approved Marketing Templates.' },
        ]
    },
    // Fallback/Generic for other routes
    'generic': {
        id: 'generic',
        tagline: 'ENTERPRISE SOLUTIONS',
        title: 'Enterprise AI Suite',
        subtitle: 'Scalable Intelligence for Business',
        description: 'Leverage our full suite of AI tools to modernize your entire operation. From ERP automation to predictive analytics, we build the future of your business.',
        badge: 'Enterprise Grade',
        keywords: 'scalable enterprise AI suite USA, full-stack AI digital transformation UK, bespoke predictive analytics India, enterprise AI development globally',
        heroImage: '/enterprise_ai_suite.png',
        statistics: [
            {
                value: '100%',
                label: 'Efficiency Gains',
                icon: Settings,
                breakdown: [
                    { value: 65, label: 'Efficiency' },
                    { value: 25, label: 'Growth' },
                    { value: 10, label: 'Sustainability' }
                ]
            },
            {
                value: '99.9%',
                label: 'Uptime SLA',
                icon: Server,
                breakdown: [
                    { value: 90, label: 'Availability' },
                    { value: 8, label: 'Redundancy' },
                    { value: 2, label: 'Recovery' }
                ]
            },
            { value: '60%', label: 'Cost Reduction', icon: BarChart },
            {
                value: '3x',
                label: 'Faster Deployment',
                icon: Zap,
                breakdown: [
                    { value: 50, label: 'Automation' },
                    { value: 30, label: 'CI/CD Pipeline' },
                    { value: 20, label: 'Testing' }
                ]
            },
        ],
        process: [
            { step: '01', title: 'Consult', description: 'We analyze your current infrastructure.' },
            { step: '02', title: 'Architect', description: 'Design a custom AI solution.' },
            { step: '03', title: 'Execute', description: 'Agile implementation and training.' }
        ],
        features: [
            { title: 'Security First', description: 'ISO 27001 and GDPR compliant architecture.', icon: Shield },
            { title: 'Scalable', description: 'Built to handle enterprise-level loads.', icon: Database },
            { title: 'Custom LLMs', description: 'Fine-tune models on your proprietary data.', icon: Brain },
            { title: 'Real-time Analytics', description: 'Track performance with live dashboards and insights.', icon: BarChart },
            { title: 'Seamless Integration', description: 'Connect with your existing tools via REST APIs.', icon: Settings },
            { title: 'Global Reach', description: 'Multi-language support with 40+ locales.', icon: Globe },
        ],
        benefits: [
            { title: 'Future Proof', description: 'Stay ahead of the technology curve.' },
        ],
        useCases: [],
        faq: []
    }
};
