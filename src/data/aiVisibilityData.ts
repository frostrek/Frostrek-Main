export interface ServiceItem {
  id: string;
  code: string;
  cardId: string;
  name: string;
  shortDesc: string;
  activities: string;
  deliverable: string;
  stage: string;
  guardrail: string;
  category: 'seo' | 'geo' | 'aeo' | 'advanced';
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  cluster: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface PillarOverview {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string;
  iconName: 'Globe' | 'Sparkles' | 'MessageSquare' | 'Layers';
  accentColor: string;
  bgColor: string;
  borderColor: string;
}

export const PILLARS_OVERVIEW: PillarOverview[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    subtitle: 'Technical Foundations & Organic Discovery',
    description: 'We optimise technical foundations, page structure, content and legitimate authority signals for search engines. From local service businesses to Shopify stores and international SaaS sites, we focus on search intent, useful pages and measurable enquiries.',
    focus: 'Google, Bing, Search Console, Core Web Vitals, Crawl Architecture',
    iconName: 'Globe',
    accentColor: '#0284C7',
    bgColor: 'bg-[#F0F9FF]',
    borderColor: 'border-[#BAE6FD]',
  },
  {
    id: 'geo',
    title: 'Generative Engine Optimization (GEO)',
    subtitle: 'Brand Citations & AI Answer Presence',
    description: 'We examine how ChatGPT, Gemini, Perplexity and Google AI search experiences present information about your business and its competitors. We improve owned facts, helpful explanations and credible third-party references, then document observed mentions and citations over time.',
    focus: 'ChatGPT, Perplexity, Google Gemini, Claude, AI Overviews',
    iconName: 'Sparkles',
    accentColor: '#166534',
    bgColor: 'bg-[#F0FDF4]',
    borderColor: 'border-[#BBF7D0]',
  },
  {
    id: 'aeo',
    title: 'Answer Engine Optimization (AEO)',
    subtitle: 'Conversational Queries & Question-Led Answers',
    description: 'We research the questions customers ask, structure honest answers, update FAQs and help resources, and make content easy to understand. Where applicable we use valid schema markup; there is no universal special markup that guarantees AI answers or Google featured snippets.',
    focus: 'Direct Answers, Featured Snippets, Voice Phrasing, Valid Schema',
    iconName: 'MessageSquare',
    accentColor: '#6D28D9',
    bgColor: 'bg-[#F5F3FF]',
    borderColor: 'border-[#DDD6FE]',
  },
  {
    id: 'advanced',
    title: 'Advanced Measurement & Engineering',
    subtitle: 'Analytics Attribution & Next.js Technical SEO',
    description: 'For teams that need deeper implementation, Frostrek combines development, analytics and automation services with search optimisation. These modules are scoped independently when the required platform access and expertise are available.',
    focus: 'GA4 / CRM Attribution, React/Next.js SEO, CRO, Migrations',
    iconName: 'Layers',
    accentColor: '#C2410C',
    bgColor: 'bg-[#FFF7ED]',
    borderColor: 'border-[#FFEDD5]',
  },
];

export const ALL_36_SERVICES: ServiceItem[] = [
  {
    "id": "seo-1",
    "code": "SEO-01",
    "cardId": "C01",
    "name": "Technical SEO",
    "shortDesc": "Crawling, index coverage, XML sitemaps, robots.txt, canonical tags, redirects, Core Web Vitals, mobile UX and JS rendering.",
    "activities": "Crawling, index coverage, XML sitemaps, robots.txt, canonical tags, redirects, Core Web Vitals, mobile UX and JS rendering.",
    "deliverable": "Technical issue register with evidence, fix instructions and validation.",
    "stage": "Audit → Implementation",
    "guardrail": "Priority P0; search eligibility cannot be guaranteed.",
    "category": "seo"
  },
  {
    "id": "seo-2",
    "code": "SEO-02",
    "cardId": "C02",
    "name": "On-Page SEO",
    "shortDesc": "Intent-led keyword research, titles, meta descriptions, heading structure, URL mapping, image alt text and internal links.",
    "activities": "Intent-led keyword research, titles, meta descriptions, heading structure, URL mapping, image alt text and internal links.",
    "deliverable": "Page-by-page optimisation sheet and approved content changes.",
    "stage": "Audit → Implementation → Monthly",
    "guardrail": "Avoid keyword stuffing and duplicate pages.",
    "category": "seo"
  },
  {
    "id": "seo-3",
    "code": "SEO-03",
    "cardId": "C03",
    "name": "SEO Content Creation",
    "shortDesc": "Service and landing pages, blogs, product copy, helpful comparisons and topic cluster briefs.",
    "activities": "Service and landing pages, blogs, product copy, helpful comparisons and topic cluster briefs.",
    "deliverable": "Editorial brief, original English copy, revision and owner approvals.",
    "stage": "Implementation → Monthly",
    "guardrail": "No unverifiable results, made-up experiences or copied content.",
    "category": "seo"
  },
  {
    "id": "seo-4",
    "code": "SEO-04",
    "cardId": "C04",
    "name": "Off-Page SEO",
    "shortDesc": "Relevant editorial outreach, genuine citations, industry directories, digital PR and brand mentions.",
    "activities": "Relevant editorial outreach, genuine citations, industry directories, digital PR and brand mentions.",
    "deliverable": "Ethical authority opportunity register, outreach tracker and confirmed publications.",
    "stage": "Implementation → Monthly",
    "guardrail": "No paid spam links, fake reviews or guaranteed placements.",
    "category": "seo"
  },
  {
    "id": "seo-5",
    "code": "SEO-05",
    "cardId": "C05",
    "name": "Local SEO",
    "shortDesc": "Google Business Profile, NAP accuracy, local intent, location page improvement and local citations.",
    "activities": "Google Business Profile, NAP accuracy, local intent, location page improvement and local citations.",
    "deliverable": "Local presence audit, profile checklist, verified listings and locally relevant copy.",
    "stage": "Audit → Implementation → Monthly",
    "guardrail": "Only genuine offices/eligible locations; no fake addresses.",
    "category": "seo"
  },
  {
    "id": "seo-6",
    "code": "SEO-06",
    "cardId": "C06",
    "name": "E-commerce SEO",
    "shortDesc": "Shopify/WooCommerce technical SEO, product/category structure, feeds, faceted pages, product schema.",
    "activities": "Shopify/WooCommerce technical SEO, product/category structure, feeds, faceted pages, product schema.",
    "deliverable": "Merchant store SEO backlog, product/category optimisation matrix.",
    "stage": "Audit → Implementation → Monthly",
    "guardrail": "Verify store access and merchant data; avoid mass low-value pages.",
    "category": "seo"
  },
  {
    "id": "geo-1",
    "code": "GEO-07",
    "cardId": "C07",
    "name": "AI Search Visibility Audit",
    "shortDesc": "Record mentions, citations and gaps across a 50–200 prompt set on selected AI search systems.",
    "activities": "Record mentions, citations and gaps across a 50–200 prompt set on selected AI search systems.",
    "deliverable": "Dated baseline with prompts, model/tool, full answer and source links.",
    "stage": "Audit → Monthly",
    "guardrail": "Sampled prompts are not platform-wide rankings.",
    "category": "geo"
  },
  {
    "id": "geo-2",
    "code": "GEO-08",
    "cardId": "C08",
    "name": "AI Competitor Analysis",
    "shortDesc": "Compare up to ten relevant competitors in selected unbranded AI answers, citations and content gaps.",
    "activities": "Compare up to ten relevant competitors in selected unbranded AI answers, citations and content gaps.",
    "deliverable": "Competitor presence matrix and opportunities ranked by intent.",
    "stage": "Audit → Monthly",
    "guardrail": "Top ten is a research shortlist, not guaranteed platform ranking.",
    "category": "geo"
  },
  {
    "id": "geo-3",
    "code": "GEO-09",
    "cardId": "C09",
    "name": "AI Search Content Optimization",
    "shortDesc": "Upgrade accurate service pages, FAQs, expert explanations and comparison content for discoverability.",
    "activities": "Upgrade accurate service pages, FAQs, expert explanations and comparison content for discoverability.",
    "deliverable": "Page-level content edits, fact/claim notes and internal link instructions.",
    "stage": "Implementation → Monthly",
    "guardrail": "Write for humans; no AI citation guarantees.",
    "category": "geo"
  },
  {
    "id": "geo-4",
    "code": "GEO-10",
    "cardId": "C10",
    "name": "Brand & Entity Optimization",
    "shortDesc": "Keep company name, products, services, locations, contact facts and trusted profiles consistent.",
    "activities": "Keep company name, products, services, locations, contact facts and trusted profiles consistent.",
    "deliverable": "Entity accuracy audit and official profile corrections register.",
    "stage": "Audit → Implementation",
    "guardrail": "Never fabricate Knowledge Panels or endorsements.",
    "category": "geo"
  },
  {
    "id": "geo-5",
    "code": "GEO-11",
    "cardId": "C11",
    "name": "AI Citation & Authority Building",
    "shortDesc": "Find genuine industry editorial mentions, legitimate directories, customer reviews and partner references.",
    "activities": "Find genuine industry editorial mentions, legitimate directories, customer reviews and partner references.",
    "deliverable": "Prioritized source targets, outreach records and earned-mention evidence.",
    "stage": "Implementation → Monthly",
    "guardrail": "No paid manufactured citations or fake reviews.",
    "category": "geo"
  },
  {
    "id": "geo-6",
    "code": "GEO-12",
    "cardId": "C12",
    "name": "AI Crawler & Technical GEO",
    "shortDesc": "Check robots.txt, OAI-SearchBot access, crawl/index eligibility, HTML readability and structured data validity.",
    "activities": "Check robots.txt, OAI-SearchBot access, crawl/index eligibility, HTML readability and structured data validity.",
    "deliverable": "Crawler/accessibility diagnostics and developer tickets.",
    "stage": "Audit → Implementation",
    "guardrail": "No special mandatory AI markup; indexability ≠ inclusion.",
    "category": "geo"
  },
  {
    "id": "geo-7",
    "code": "GEO-13",
    "cardId": "C13",
    "name": "Competitor Comparison & Recommendation Content",
    "shortDesc": "Create fair alternative guides and X-versus-Y comparisons with date-stamped feature facts.",
    "activities": "Create fair alternative guides and X-versus-Y comparisons with date-stamped feature facts.",
    "deliverable": "Comparison briefs, source links and reviewed table copy.",
    "stage": "Implementation → Monthly",
    "guardrail": "No fabricated competitor limitations, pricing or win claims.",
    "category": "geo"
  },
  {
    "id": "geo-8",
    "code": "GEO-14",
    "cardId": "C14",
    "name": "AI Search Ranking & Citation Tracking",
    "shortDesc": "Sample repeated prompts across ChatGPT, Gemini, Perplexity and Google AI experiences.",
    "activities": "Sample repeated prompts across ChatGPT, Gemini, Perplexity and Google AI experiences.",
    "deliverable": "Prompt-run logs, captured URLs, observed mentions and trends.",
    "stage": "Audit → Monthly",
    "guardrail": "No stable universal AI ranking; record date, market and version.",
    "category": "geo"
  },
  {
    "id": "geo-9",
    "code": "GEO-15",
    "cardId": "C15",
    "name": "GEO Analytics & Custom Dashboard",
    "shortDesc": "Combine AI sample counts, direct citations, GSC queries, referral sessions and attributed leads.",
    "activities": "Combine AI sample counts, direct citations, GSC queries, referral sessions and attributed leads.",
    "deliverable": "Client-specific monitoring dashboard and monthly review.",
    "stage": "Implementation → Monthly",
    "guardrail": "Distinguish manual observations from platform-reported metrics.",
    "category": "geo"
  },
  {
    "id": "geo-10",
    "code": "GEO-16",
    "cardId": "C16",
    "name": "International & Multilingual GEO",
    "shortDesc": "Research local buyer prompts and localize factual content for India, USA, UK, UAE and scoped markets.",
    "activities": "Research local buyer prompts and localize factual content for India, USA, UK, UAE and scoped markets.",
    "deliverable": "Country intent map, language QA and comparative market report.",
    "stage": "Audit → Implementation → Monthly",
    "guardrail": "No auto-generated duplicate country pages.",
    "category": "geo"
  },
  {
    "id": "aeo-1",
    "code": "AEO-17",
    "cardId": "C17",
    "name": "Conversational & Question Keyword Research",
    "shortDesc": "Collect real customer questions, natural-language and voice-like queries by intent.",
    "activities": "Collect real customer questions, natural-language and voice-like queries by intent.",
    "deliverable": "Question bank with topic, buyer journey and target URL.",
    "stage": "Audit → Monthly",
    "guardrail": "Questions grounded in real search/customer data.",
    "category": "aeo"
  },
  {
    "id": "aeo-2",
    "code": "AEO-18",
    "cardId": "C18",
    "name": "FAQ & Answer Content Optimization",
    "shortDesc": "Write helpful visible answers for service pages, product pages and informational guides.",
    "activities": "Write helpful visible answers for service pages, product pages and informational guides.",
    "deliverable": "Reviewed Q&A blocks with factual sources.",
    "stage": "Implementation → Monthly",
    "guardrail": "No expectation of Google FAQ rich results.",
    "category": "aeo"
  },
  {
    "id": "aeo-3",
    "code": "AEO-19",
    "cardId": "C19",
    "name": "Featured Snippet Optimization",
    "shortDesc": "Make eligible content directly useful through definitions, tables, lists and how-to explanations.",
    "activities": "Make eligible content directly useful through definitions, tables, lists and how-to explanations.",
    "deliverable": "Answer block updates and target-query tracker.",
    "stage": "Implementation → Monthly",
    "guardrail": "No guaranteed featured-snippet selection.",
    "category": "aeo"
  },
  {
    "id": "aeo-4",
    "code": "AEO-20",
    "cardId": "C20",
    "name": "Voice Search Optimization",
    "shortDesc": "Address spoken phrasing, local intent and concise natural answers.",
    "activities": "Address spoken phrasing, local intent and concise natural answers.",
    "deliverable": "Voice-query examples and answer edits.",
    "stage": "Implementation → Monthly",
    "guardrail": "Do not assert voice-device placement.",
    "category": "aeo"
  },
  {
    "id": "aeo-5",
    "code": "AEO-21",
    "cardId": "C21",
    "name": "Structured Data & Schema Implementation",
    "shortDesc": "Implement eligible Organization, Service, Article, Product, Breadcrumb and other relevant structured data.",
    "activities": "Implement eligible Organization, Service, Article, Product, Breadcrumb and other relevant structured data.",
    "deliverable": "Validated JSON-LD linked to visible page facts.",
    "stage": "Implementation → Monthly QA",
    "guardrail": "HowTo/FAQ markup only where valid; no guaranteed rich result.",
    "category": "aeo"
  },
  {
    "id": "aeo-6",
    "code": "AEO-22",
    "cardId": "C22",
    "name": "Answer-Focused Landing Pages",
    "shortDesc": "Improve/produce distinct pages or on-page sections for how-to, pricing, alternatives and comparison intent.",
    "activities": "Improve/produce distinct pages or on-page sections for how-to, pricing, alternatives and comparison intent.",
    "deliverable": "Page-outline, exact URL map and complete content.",
    "stage": "Implementation",
    "guardrail": "No near-duplicate keyword-targeted pages.",
    "category": "aeo"
  },
  {
    "id": "aeo-7",
    "code": "AEO-23",
    "cardId": "C23",
    "name": "Knowledge Base & Help Centre Optimization",
    "shortDesc": "Organize support FAQs, help articles and accessible documentation with practical navigation.",
    "activities": "Organize support FAQs, help articles and accessible documentation with practical navigation.",
    "deliverable": "Searchable KB taxonomy, article revisions and linking plan.",
    "stage": "Implementation → Monthly",
    "guardrail": "Human-reviewed product accuracy.",
    "category": "aeo"
  },
  {
    "id": "aeo-8",
    "code": "AEO-24",
    "cardId": "C24",
    "name": "Answer Accuracy & Content Refresh",
    "shortDesc": "Review public pricing, policies, product status and obsolete answer copy.",
    "activities": "Review public pricing, policies, product status and obsolete answer copy.",
    "deliverable": "Freshness register, revised facts and publication evidence.",
    "stage": "Monthly",
    "guardrail": "Client fact approval before publish.",
    "category": "aeo"
  },
  {
    "id": "aeo-9",
    "code": "AEO-25",
    "cardId": "C25",
    "name": "AEO Performance Tracking",
    "shortDesc": "Track question query impressions, clicks, snippet observations and AI citation samples.",
    "activities": "Track question query impressions, clicks, snippet observations and AI citation samples.",
    "deliverable": "Question-query dashboard and dated answer captures.",
    "stage": "Monthly",
    "guardrail": "Search Console metrics not directly equivalent to AI recommendations.",
    "category": "aeo"
  },
  {
    "id": "aeo-10",
    "code": "AEO-26",
    "cardId": "C26",
    "name": "Multilingual & International AEO",
    "shortDesc": "Localise answers and buyer question research for target markets and languages.",
    "activities": "Localise answers and buyer question research for target markets and languages.",
    "deliverable": "Country-specific Q&A briefs and translation review.",
    "stage": "Audit → Implementation → Monthly",
    "guardrail": "Human validation, hreflang where appropriate.",
    "category": "aeo"
  },
  {
    "id": "adv-1",
    "code": "ADV-27",
    "cardId": "C27",
    "name": "GA4, Search Console & CRM Lead Attribution",
    "shortDesc": "Connect consent-aware events and source information to enquiries, qualified leads and sales process.",
    "activities": "Connect consent-aware events and source information to enquiries, qualified leads and sales process.",
    "deliverable": "Event map, tracking QA and CRM source report.",
    "stage": "Implementation → Monthly",
    "guardrail": "Traffic source not inferred when missing.",
    "category": "advanced"
  },
  {
    "id": "adv-2",
    "code": "ADV-28",
    "cardId": "C28",
    "name": "Custom SEO + GEO Analytics Dashboards",
    "shortDesc": "Build client-specific dashboards with search, citations, queries, conversions and backlog.",
    "activities": "Build client-specific dashboards with search, citations, queries, conversions and backlog.",
    "deliverable": "Interactive or spreadsheet dashboard and data dictionary.",
    "stage": "Implementation → Monthly",
    "guardrail": "Show provenance, refresh frequency and sampling limits.",
    "category": "advanced"
  },
  {
    "id": "adv-3",
    "code": "ADV-29",
    "cardId": "C29",
    "name": "Automated AI Search Monitoring",
    "shortDesc": "Schedule supported prompt sampling and capture platform, date, answer and citations.",
    "activities": "Schedule supported prompt sampling and capture platform, date, answer and citations.",
    "deliverable": "Runbook, data capture routine and alert thresholds.",
    "stage": "Implementation → Monthly",
    "guardrail": "Respect tools' terms; do not claim closed-platform internal data.",
    "category": "advanced"
  },
  {
    "id": "adv-4",
    "code": "ADV-30",
    "cardId": "C30",
    "name": "Conversion Rate Optimization (CRO)",
    "shortDesc": "Analyze buyer journeys, landing-page clarity, forms, UX and CTA effectiveness.",
    "activities": "Analyze buyer journeys, landing-page clarity, forms, UX and CTA effectiveness.",
    "deliverable": "Conversion hypotheses, test plan and observed outcomes.",
    "stage": "Audit → Implementation → Monthly",
    "guardrail": "Conversion improvement never guaranteed.",
    "category": "advanced"
  },
  {
    "id": "adv-5",
    "code": "ADV-31",
    "cardId": "C31",
    "name": "Programmatic SEO",
    "shortDesc": "Create genuinely useful pages from quality underlying records and distinct user intent.",
    "activities": "Create genuinely useful pages from quality underlying records and distinct user intent.",
    "deliverable": "Template specification, data schema, QA and duplicate control.",
    "stage": "Implementation",
    "guardrail": "No scaled low-value / doorway pages.",
    "category": "advanced"
  },
  {
    "id": "adv-6",
    "code": "ADV-32",
    "cardId": "C32",
    "name": "React, Next.js & JavaScript SEO",
    "shortDesc": "Review server/client rendering, hydration, canonical, metadata, crawlability and indexability.",
    "activities": "Review server/client rendering, hydration, canonical, metadata, crawlability and indexability.",
    "deliverable": "Technical implementation tickets and post-release crawl checks.",
    "stage": "Audit → Implementation",
    "guardrail": "Framework version and actual rendering require developer validation.",
    "category": "advanced"
  },
  {
    "id": "adv-7",
    "code": "ADV-33",
    "cardId": "C33",
    "name": "Website Migration & SEO Recovery",
    "shortDesc": "Map old/new URLs, 301 redirects, content parity, canonicals and post-launch traffic checks.",
    "activities": "Map old/new URLs, 301 redirects, content parity, canonicals and post-launch traffic checks.",
    "deliverable": "Migration map, staging QA and monitoring checklist.",
    "stage": "Audit → Implementation → Monthly",
    "guardrail": "Traffic can fluctuate despite safeguards.",
    "category": "advanced"
  },
  {
    "id": "adv-8",
    "code": "ADV-34",
    "cardId": "C34",
    "name": "Online Reputation & Brand Visibility",
    "shortDesc": "Monitor and correct legitimate business listings, public facts and review response processes.",
    "activities": "Monitor and correct legitimate business listings, public facts and review response processes.",
    "deliverable": "Brand accuracy register and verified correction records.",
    "stage": "Implementation → Monthly",
    "guardrail": "No fake testimonials, review gating or deceptive suppression.",
    "category": "advanced"
  },
  {
    "id": "adv-9",
    "code": "ADV-35",
    "cardId": "C35",
    "name": "AI-Assisted Content Production & Automation",
    "shortDesc": "Use assisted research and drafting with human editorial, plagiarism and fact checks.",
    "activities": "Use assisted research and drafting with human editorial, plagiarism and fact checks.",
    "deliverable": "Documented editorial workflow, QA stages and publish controls.",
    "stage": "Implementation → Monthly",
    "guardrail": "Human approval required; avoid scaled unhelpful output.",
    "category": "advanced"
  },
  {
    "id": "adv-10",
    "code": "ADV-36",
    "cardId": "C36",
    "name": "Advanced E-commerce SEO & Product Visibility",
    "shortDesc": "Merchant Center, product feeds, product/category optimisation, shopping visibility and accurate markup.",
    "activities": "Merchant Center, product feeds, product/category optimisation, shopping visibility and accurate markup.",
    "deliverable": "Feed QA, category SEO plan, structured product validations.",
    "stage": "Audit → Implementation → Monthly",
    "guardrail": "Google eligibility and Merchant Center approval not guaranteed.",
    "category": "advanced"
  }
];

export const ALL_26_FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'What are SEO, GEO and AEO services?',
    answer: 'SEO improves discoverability of useful pages in conventional search. GEO covers brand representation and citation opportunities in generative search experiences. AEO focuses on answering relevant buyer questions clearly. They share content quality and technical foundations.',
    cluster: 'Overview',
  },
  {
    id: 2,
    question: 'Do SEO, GEO and AEO require three separate websites?',
    answer: 'No. A well-organised website with accurate service pages, original information and clear navigation can support all three. Additional pages should address genuinely distinct search intent, not repeat the same content.',
    cluster: 'Strategy',
  },
  {
    id: 3,
    question: "What does Frostrek's technical SEO service include?",
    answer: 'Depending on the agreed scope, we review indexing, crawlability, robots directives, sitemap files, redirects, canonicals, mobile usability, Core Web Vitals and JavaScript rendering, then provide developer-ready fixes.',
    cluster: 'SEO',
  },
  {
    id: 4,
    question: 'Do you provide local SEO and Google Business Profile optimisation?',
    answer: 'Yes. We review eligible Google Business Profiles, local search pages, business detail consistency and legitimate location citations. We do not create fake office locations or reviews.',
    cluster: 'Local SEO',
  },
  {
    id: 5,
    question: 'Can you improve Shopify or WooCommerce SEO?',
    answer: 'Yes. We can assess product and collection pages, filters, category content, Product structured data, Merchant Center diagnostics and technical indexation issues based on available store access.',
    cluster: 'Ecommerce',
  },
  {
    id: 6,
    question: 'Do you offer content writing and competitor comparisons?',
    answer: 'Yes. The scope can include revised service pages, original blogs, product content, FAQs and carefully sourced comparisons. Claims about competitors, prices and product features are reviewed before publishing.',
    cluster: 'Content',
  },
  {
    id: 7,
    question: 'Does Frostrek offer backlinks and digital PR?',
    answer: 'We research suitable publishers, directories, associations and partners and support ethical editorial outreach. Links and coverage cannot be guaranteed, and paid manipulative link schemes are excluded.',
    cluster: 'Off-Page',
  },
  {
    id: 8,
    question: 'What is an AI Search Visibility Audit?',
    answer: 'It is a dated assessment using a defined panel of business-relevant prompts across selected AI search experiences. We record whether the company was mentioned, the wording used and any linked citations.',
    cluster: 'GEO',
  },
  {
    id: 9,
    question: 'How many AI Search prompts will be tested?',
    answer: 'We can scope a 50–200 prompt panel based on business category, number of markets and campaign size. The free initial review is narrower; a full paid audit specifies the number of prompts and platforms.',
    cluster: 'GEO',
  },
  {
    id: 10,
    question: 'Can you guarantee my business will appear in ChatGPT, Gemini or Perplexity?',
    answer: 'No. Those systems independently select and generate results, which can vary by query, location, date and product version. We improve accessible factual sources and report observed outcomes rather than promise placement.',
    cluster: 'Trust & Limitations',
  },
  {
    id: 11,
    question: 'Does Google require special GEO schema or an llms.txt file?',
    answer: 'No special markup or AI text file is required for Google AI search visibility. We follow established technical SEO, structured-data and helpful-content guidance. Other tools may have their own requirements.',
    cluster: 'Technical GEO',
  },
  {
    id: 12,
    question: 'Can Frostrek track AI citations and competitor mentions?',
    answer: 'Yes, within a documented sampled prompt panel. We capture responses, dates, model or tool where available, mentioned companies and cited URLs, and compare runs consistently over time.',
    cluster: 'GEO',
  },
  {
    id: 13,
    question: 'What does brand and entity optimisation mean?',
    answer: 'It means ensuring important facts about your company, services, locations and official profiles are accurate and consistent on owned pages and legitimate third-party sources.',
    cluster: 'GEO',
  },
  {
    id: 14,
    question: 'Will adding FAQ schema make our FAQs appear in Google results?',
    answer: 'Not automatically. Google has reduced and discontinued general FAQ rich-result display support. We write visible helpful answers first and use schema only when appropriate and currently supported.',
    cluster: 'AEO',
  },
  {
    id: 15,
    question: 'Can you target Google featured snippets and voice queries?',
    answer: 'We can optimise clear definitions, logical lists, tables and natural-language answers around relevant questions. We cannot guarantee a featured snippet or placement in voice assistant results.',
    cluster: 'AEO',
  },
  {
    id: 16,
    question: 'Can Frostrek build a knowledge base or help centre?',
    answer: 'Yes. An agreed project may cover organising article topics, revising answers, linking help resources and keeping documented policies and product details current.',
    cluster: 'AEO',
  },
  {
    id: 17,
    question: "Can you improve our React or Next.js website's SEO?",
    answer: 'Yes. The implementation team can review rendering, metadata, canonical signals, content availability, routing, hydration and performance and create testable developer tickets.',
    cluster: 'Advanced SEO',
  },
  {
    id: 18,
    question: 'Do you offer SEO migration support?',
    answer: 'Yes. We can prepare URL mapping, redirect rules, staging checks, content parity reviews and post-launch monitoring for redesigns and domain changes. Search performance may still fluctuate.',
    cluster: 'Advanced SEO',
  },
  {
    id: 19,
    question: 'What is programmatic SEO and when should it be used?',
    answer: 'It uses structured data and templates to create pages serving distinct user needs. We recommend it only where each page provides genuine unique value and passes quality and duplication checks.',
    cluster: 'Advanced SEO',
  },
  {
    id: 20,
    question: 'Can you connect GA4, Search Console and our CRM?',
    answer: 'Where access and technical integration permit, we can map events and source data from website enquiries into analytics and CRM reporting. Missing attribution is labeled unknown rather than assumed.',
    cluster: 'Analytics',
  },
  {
    id: 21,
    question: 'Can you build a custom SEO and GEO dashboard?',
    answer: 'Yes. Dashboards can combine Google search data, manually or automatically collected AI prompt observations, referrals, content progress and qualified enquiries. Data sources and limitations are labeled.',
    cluster: 'Analytics',
  },
  {
    id: 22,
    question: 'Do you offer SEO/GEO services in India, the USA, UK and UAE?',
    answer: 'Yes. We can scope market-specific keyword research, localised messaging and language review for these and other regions. Each market’s requirements are confirmed in the proposal.',
    cluster: 'Markets',
  },
  {
    id: 23,
    question: 'What happens during the free SEO and AI visibility audit?',
    answer: 'The free stage is a focused preliminary review and discovery discussion. A large-scale crawl, full 50–200 prompt benchmark or extensive implementation is scoped separately.',
    cluster: 'Audit CTA',
  },
  {
    id: 24,
    question: 'How is SEO/GEO monthly management priced?',
    answer: 'Pricing is custom. We scope it using your websites, target regions, technical issues, number of pages, content production, monitoring requirements and reporting cadence.',
    cluster: 'Pricing',
  },
  {
    id: 25,
    question: 'How do you report results without case studies?',
    answer: 'We establish a new client-specific baseline after access is provided and report actual implemented changes, search data and dated AI prompt observations. We do not substitute invented performance statistics.',
    cluster: 'Measurement',
  },
  {
    id: 26,
    question: 'How long will SEO or GEO take to improve visibility?',
    answer: 'There is no guaranteed timeframe. Search crawling, competition, site quality and AI response variation all affect outcomes. We provide a practical plan and measured checkpoints.',
    cluster: 'Trust',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Stage 1: Free Initial Review & Paid Audit Scope',
    subtitle: 'Discovery & Opportunity Snapshot',
    description: 'Request the free preliminary SEO and AI visibility review to receive an initial opportunity discussion. If a deeper engagement is useful, we scope the technical crawl, priority pages, keyword and competitor mapping, and baseline AI-search sampling separately.',
    deliverables: [
      'Initial discoverability opportunity review',
      'Sample relevant AI-search questions & prompts',
      'Detailed scope & proposal for paid audit or monthly retainers',
    ],
  },
  {
    step: '02',
    title: 'Stage 2: Implementation & Staging QA',
    subtitle: 'Engineering & Editorial Execution',
    description: 'We turn agreed findings into developer tickets and editorial briefs. Work covers technical fixes, revised service pages, structured data, legitimate authority outreach, consent-aware measurement, and staging QA. Changes move to production only after client signoff.',
    deliverables: [
      'Prioritised developer tickets with code snippets & test steps',
      'Full editorial briefs with human-reviewed English copy',
      'Structured JSON-LD schema implementation',
      'Staging QA testing & pre-deployment verification',
    ],
  },
  {
    step: '03',
    title: 'Stage 3: Monthly Management & Measurement',
    subtitle: 'Iterative Growth & Continuous Auditing',
    description: 'We review Search Console performance, lead quality, content updates, technical health, earned mentions, and the agreed sample of AI-search prompts. Each monthly report clearly distinguishes completed actions, observed results, and next priorities.',
    deliverables: [
      'Dated AI prompt citation tracking (ChatGPT, Perplexity, Gemini)',
      'Search Console organic impressions & CTR trends',
      'Lead attribution & enquiry qualification notes',
      'Monthly roadmap with named owners and timelines',
    ],
  },
];

export const INDUSTRIES_SERVED = [
  { name: 'SaaS & B2B Technology', desc: 'Software platforms, cloud tools, API services, and enterprise vendors.' },
  { name: 'Professional Services', desc: 'Legal, accounting, management consulting, and advisory firms.' },
  { name: 'Local Businesses & Clinics', desc: 'Medical clinics, wellness centers, and regional multi-location businesses.' },
  { name: 'Education & Study Abroad', desc: 'Universities, study-abroad consultants, and training academies.' },
  { name: 'Real Estate & Property', desc: 'Commercial brokerages, residential developers, and property managers.' },
  { name: 'Shopify & WooCommerce D2C', desc: 'E-commerce merchants scaling organic search and Google Shopping presence.' },
];
