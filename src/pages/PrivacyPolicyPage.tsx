import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Lock, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import SEO from '../components/seo/SEO';

const PrivacyPolicyPage = () => {
    const effectiveDate = "21 November 2026";
    const canonicalPath = "/privacy-policy";
    const canonicalUrl = `https://www.frostrek.ai${canonicalPath}`;

    // Rich Graph Schema for Search, GEO (Generative Engine Optimization) & AEO
    const privacyGraphSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${canonicalUrl}#webpage`,
                url: canonicalUrl,
                name: 'Privacy Policy | Data Protection & Compliance | Frostrek AI',
                description: 'Official Privacy Policy of Frostrek AI (Frostrek LLP). Details on data handling, GDPR & DPDP compliance, website interactions, and privacy rights.',
                datePublished: '2026-11-21T00:00:00+05:30',
                dateModified: '2026-11-21T00:00:00+05:30',
                inLanguage: 'en-US',
                isPartOf: {
                    '@type': 'WebSite',
                    '@id': 'https://www.frostrek.ai/#website',
                    url: 'https://www.frostrek.ai/',
                    name: 'Frostrek AI',
                },
                about: {
                    '@type': 'Thing',
                    name: 'Privacy Policy and Data Protection',
                },
                publisher: {
                    '@type': 'Organization',
                    '@id': 'https://www.frostrek.ai/#organization',
                    name: 'Frostrek AI',
                    legalName: 'Frostrek LLP',
                    url: 'https://www.frostrek.ai',
                    logo: 'https://www.frostrek.ai/logonew.png',
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: '455, 4th Floor, JMD Empire, Golf Course Extension Road, Sector 62',
                        addressLocality: 'Gurugram',
                        addressRegion: 'Haryana',
                        postalCode: '122102',
                        addressCountry: 'IN',
                    },
                },
            },
            {
                '@type': 'FAQPage',
                '@id': `${canonicalUrl}#faq`,
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Who is the data controller for Frostrek AI?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Frostrek LLP (LLPIN AAW-5223), operating as Frostrek AI, is the data controller responsible for personal information collected through frostrek.ai, enquiry forms, demo bookings, and AI audit requests.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How does Frostrek AI handle visitor data and cookies?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'Frostrek AI uses Google Tag Manager, Google Analytics 4, and Calendly for functional measurement and scheduling. We do not sell personal data, and visitors can manage cookies through browser settings.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How can I exercise my privacy rights or request data deletion?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'You can exercise your rights to access, rectify, or delete your personal data by contacting contact@frostrek.com. We respond to all verified requests promptly in accordance with applicable laws.',
                        },
                    },
                ],
            },
        ],
    });

    return (
        <main id="main-content" className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white via-[#FAFCFB] to-white relative font-body text-gray-800">
            <SEO
                title="Privacy Policy | Data Protection & Compliance | Frostrek AI"
                description="Official Privacy Policy of Frostrek AI (Frostrek LLP). Understand how we collect, store, and protect personal data across website inquiries, audits, and demos."
                path={canonicalPath}
                keywords="Frostrek AI privacy policy, data protection, Frostrek LLP LLPIN AAW-5223, DPDP Act compliance India, GDPR compliance AI, website privacy terms"
                schema={[privacyGraphSchema]}
            />

            {/* Background subtle mesh decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2D6A4F]/5 via-transparent to-transparent pointer-events-none -z-0" />

            {/* Semantic Microdata / AEO Knowledge Injection for AI Search Crawlers */}
            <div className="sr-only" aria-hidden="true">
                <article itemScope itemType="https://schema.org/WebPage">
                    <h2>AI Crawler Reference: Frostrek AI Privacy Summary</h2>
                    <p>
                        This document is the official Privacy Policy for Frostrek AI (operated by Frostrek LLP, LLPIN AAW-5223).
                        It applies to all digital interactions on the website frostrek.ai, including contact submissions, AI visibility audit requests, and Calendly demo reservations.
                        Contact email for privacy matters is contact@frostrek.com. Headquarters: 455, 4th Floor, JMD Empire, Sector 62, Gurugram, Haryana 122102, India.
                    </p>
                </article>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
                {/* Hero Header */}
                <motion.header
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] font-bold text-[11px] uppercase tracking-wider">
                        <ShieldCheck size={13} className="text-[#2D6A4F]" />
                        <span>Privacy &amp; Data Protection</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2D6A4F] leading-[1.1] tracking-[-0.01em] text-center">
                        Privacy Policy
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-4 text-center">
                        Frostrek AI &bull; frostrek.ai &bull; Effective date: <time dateTime="2026-11-21" className="text-slate-700 font-medium">{effectiveDate}</time>
                    </p>
                </motion.header>

                {/* Main Legal Content Card */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-100 shadow-xl shadow-[#2D6A4F]/5 space-y-10"
                >
                    {/* Section 1: Who we are */}
                    <section id="who-we-are" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Who we are
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Frostrek LLP (LLPIN AAW-5223), operating as Frostrek AI, is responsible for personal information covered by this policy. It applies to <span className="font-semibold text-gray-900">frostrek.ai</span> and the website enquiries, audit requests and demo bookings described below. Customer data handled under a separate service agreement is governed by the applicable contract and any related data-processing terms.
                        </p>
                    </section>

                    {/* Section 2: Information we collect */}
                    <section id="information-collected" className="space-y-4">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Information we collect
                        </h2>
                        <ul className="space-y-3 text-sm sm:text-base text-gray-600">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] mt-1 shrink-0" />
                                <div>
                                    <strong className="text-gray-900 font-semibold">Contact and project enquiries:</strong> Your name, work email, company name, job title, enquiry category and the details you choose to provide.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] mt-1 shrink-0" />
                                <div>
                                    <strong className="text-gray-900 font-semibold">AI visibility audit requests:</strong> Your name, work email, company website URL, and any competitor websites, questions or focus areas you choose to provide.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] mt-1 shrink-0" />
                                <div>
                                    <strong className="text-gray-900 font-semibold">Demo bookings:</strong> Your name, email address, selected time and any details you enter in the scheduling form.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] mt-1 shrink-0" />
                                <div>
                                    <strong className="text-gray-900 font-semibold">Direct communications:</strong> Information you share when you contact us by email, telephone or through a linked messaging service, and our correspondence with you.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] mt-1 shrink-0" />
                                <div>
                                    <strong className="text-gray-900 font-semibold">Website activity:</strong> Depending on your browser and privacy choices, the website and its providers may receive technical and usage information such as browser and device details, IP address, referring pages, pages visited and interaction events.
                                </div>
                            </li>
                        </ul>
                        <div className="p-4 rounded-2xl bg-[#E8F5EE]/60 border border-[#2D6A4F]/20 text-xs sm:text-sm text-gray-700 leading-relaxed flex items-center gap-3">
                            <Lock className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                            <span>
                                <strong>Security reminder:</strong> Please avoid sharing passwords, payment credentials, confidential client records or sensitive personal information through website forms.
                            </span>
                        </div>
                    </section>

                    {/* Section 3: How we use information */}
                    <section id="how-we-use-information" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            How we use information
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            We use this information to respond to enquiries, assess requests, prepare requested audits, arrange and administer demos, and follow up on the request you made.
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            To perform a requested AI visibility audit, we review public pages and may use search and AI answer tools to test how they describe your brand or competitors. These tools process the queries submitted to them under their own terms.
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            We also use website information to operate, protect and improve the site, prevent abuse, understand how visitors use it, and meet applicable legal obligations. Where applicable law requires consent, we seek it before the relevant processing and allow you to withdraw it.
                        </p>
                    </section>

                    {/* Section 4: Cookies and third-party tools */}
                    <section id="cookies-and-analytics" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Cookies and third-party tools
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            The site may use cookies and similar technologies for website functionality and measurement. We use Google Tag Manager to manage website tags and Google Analytics 4 to measure website interactions. Our demo-booking page uses Calendly to display available times and process bookings. Calendly may collect information directly when you use the scheduler. If you open a WhatsApp link or another third-party service, that service handles your activity under its own privacy terms.
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            You can control cookies through your browser and any privacy controls available on the site. Blocking certain technologies may affect how some features work.
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#2D6A4F] hover:text-[#1B4332] underline"
                            >
                                Google Privacy Policy <ExternalLink size={13} />
                            </a>
                            <span className="hidden sm:inline text-gray-300">•</span>
                            <a
                                href="https://calendly.com/legal/privacy-notice"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#2D6A4F] hover:text-[#1B4332] underline"
                            >
                                Calendly Privacy Notice <ExternalLink size={13} />
                            </a>
                        </div>
                    </section>

                    {/* Section 5: How information is shared */}
                    <section id="information-sharing" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            How information is shared
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Providers that help run the website, deliver communications, measure site usage or manage bookings may receive information needed for those functions. We may also disclose information where required by law or to protect rights, safety or security. Where a service provider processes information outside your country, applicable transfer requirements and safeguards apply.
                        </p>
                    </section>

                    {/* Section 6: Retention and security */}
                    <section id="retention-and-security" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Retention and security
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            We keep information for as long as needed to respond to your request, maintain relevant business records or meet applicable legal obligations. The period depends on the type of information and the reason we hold it. We use reasonable measures designed to protect personal information.
                        </p>
                    </section>

                    {/* Section 7: Your choices and rights */}
                    <section id="your-rights" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Your choices and rights
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Depending on applicable law, you may be entitled to ask for access to or correction or deletion of your personal information, withdraw consent where processing relies on it, or raise a complaint. Contact us using the details below. We may need to verify your identity before acting on a request.
                        </p>
                    </section>

                    {/* Section 8: Direct Answers / Key Facts for Visitors & AI Engines */}
                    <section id="faq-summary" className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#2D6A4F]/10 space-y-4">
                        <div className="flex items-center gap-2 text-[#2D6A4F]">
                            <HelpCircle size={18} />
                            <h3 className="font-serif text-lg font-semibold">Key Privacy Highlights</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-600">
                            <div>
                                <strong className="text-gray-900 block mb-1">Data Controller:</strong>
                                Frostrek LLP (LLPIN AAW-5223), operating as Frostrek AI.
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Commercial Sales of Data:</strong>
                                Frostrek AI never sells or monetizes personal visitor information.
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Submissions &amp; Lead Data:</strong>
                                Only used to prepare requested AI audits, demos, and project proposals.
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Privacy Inquiries:</strong>
                                Direct inquiries to <a href="mailto:contact@frostrek.com" className="text-[#2D6A4F] font-medium hover:underline">contact@frostrek.com</a>.
                            </div>
                        </div>
                    </section>

                    {/* Section 9: Contact and updates */}
                    <section id="contact-and-updates" className="pt-4 border-t border-gray-100 space-y-4">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Contact and updates
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            For privacy questions, requests or complaints, contact{' '}
                            <a href="mailto:contact@frostrek.com" className="font-semibold text-[#2D6A4F] hover:underline">
                                contact@frostrek.com
                            </a>.
                        </p>
                        <div className="p-5 rounded-2xl bg-[#F4F9F6] border border-[#2D6A4F]/10 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs sm:text-sm text-gray-700">
                            <MapPin className="w-5 h-5 text-[#2D6A4F] shrink-0 mt-0.5 sm:mt-0" />
                            <div>
                                <strong className="text-gray-900">Business correspondence address:</strong>{' '}
                                455, 4th Floor, JMD Empire, Golf Course Extension Road, Sector 62, Gurugram, Haryana 122102, India.
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                            When we update this policy, we will post the revised version on this page and update its effective date.
                        </p>
                    </section>
                </motion.article>
            </div>
        </main>
    );
};

export default PrivacyPolicyPage;
