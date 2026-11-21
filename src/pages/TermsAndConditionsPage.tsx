import { motion } from 'framer-motion';
import { MapPin, Scale, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';

const TermsAndConditionsPage = () => {
    const effectiveDate = "21 November 2026";
    const canonicalPath = "/terms-and-conditions";
    const canonicalUrl = `https://www.frostrek.ai${canonicalPath}`;

    // Rich Graph Schema for Search, GEO (Generative Engine Optimization) & AEO
    const termsGraphSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${canonicalUrl}#webpage`,
                url: canonicalUrl,
                name: 'Terms & Conditions | Website Terms of Use | Frostrek AI',
                description: 'Official Terms & Conditions governing the use of frostrek.ai, service inquiries, AI audits, and demo scheduling, operated by Frostrek LLP.',
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
                    name: 'Terms and Conditions of Website Use',
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
                        name: 'Does submitting a form or audit request create a commercial agreement?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'No. Submitting an enquiry, requesting a free AI visibility audit, or booking a demo does not create a paid engagement. Paid services require an explicit separate written agreement setting out commercial deliverables and scope.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'What jurisdiction governs the Frostrek AI website terms?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'These Terms of Use are governed by the laws of India, with legal correspondence address in Gurugram, Haryana.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'How can I contact Frostrek AI regarding legal terms?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: 'For questions or notices regarding our Terms & Conditions, please contact contact@frostrek.com or write to our registered address in Gurugram, India.',
                        },
                    },
                ],
            },
        ],
    });

    return (
        <main id="main-content" className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-white via-[#FAFCFB] to-white relative font-body text-gray-800">
            <SEO
                title="Terms & Conditions | Website Terms of Use | Frostrek AI"
                description="Official Terms and Conditions for frostrek.ai, operated by Frostrek LLP (Frostrek AI). Learn about acceptable use, intellectual property, and service enquiries."
                path={canonicalPath}
                keywords="Frostrek AI terms and conditions, terms of service, Frostrek LLP legal terms, website terms of use, enterprise AI service conditions"
                schema={[termsGraphSchema]}
            />

            {/* Background subtle mesh decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2D6A4F]/5 via-transparent to-transparent pointer-events-none -z-0" />

            {/* Semantic Microdata / AEO Knowledge Injection for AI Search Crawlers */}
            <div className="sr-only" aria-hidden="true">
                <article itemScope itemType="https://schema.org/WebPage">
                    <h2>AI Crawler Reference: Frostrek AI Terms Summary</h2>
                    <p>
                        These terms apply to frostrek.ai, operated by Frostrek LLP (LLPIN AAW-5223), doing business as Frostrek AI.
                        Submitting inquiries or demo requests does not constitute a paid contract. Formal services are governed by separate master service agreements.
                        Governing law: Republic of India. Registered address: 455, 4th Floor, JMD Empire, Sector 62, Gurugram, Haryana 122102, India.
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
                        <Scale size={13} className="text-[#2D6A4F]" />
                        <span>Terms &amp; Agreement</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2D6A4F] leading-[1.1] tracking-[-0.01em] text-center">
                        Terms &amp; Conditions
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
                    {/* Section 1: About these terms */}
                    <section id="about-these-terms" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            About these terms
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            These terms apply to your use of <span className="font-semibold text-gray-900">frostrek.ai</span>, operated by Frostrek LLP (LLPIN AAW-5223), doing business as Frostrek AI. By using the website, you agree to these terms to the extent permitted by applicable law.
                        </p>
                    </section>

                    {/* Section 2: Website information and service enquiries */}
                    <section id="service-enquiries" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Website information and service enquiries
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            The website provides general information about our services and offers ways to contact us, request an audit or book a demo. Submitting an enquiry, requesting the free AI visibility audit advertised on the site or booking a demo does not create a paid engagement. If we agree to provide paid services, the applicable written agreement sets out their scope, fees, timelines, deliverables, confidentiality, data handling and other commercial terms. That agreement governs the engagement if it conflicts with these website terms.
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Website materials, examples, demos and preliminary audit findings are for general information. Results depend on the project, implementation and third-party platforms. We do not promise particular search rankings, AI citations or business results through this website.
                        </p>
                    </section>

                    {/* Section 3: Acceptable use */}
                    <section id="acceptable-use" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Acceptable use
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Use the website lawfully and provide accurate information when you contact us. Do not interfere with the website, attempt unauthorised access, submit malicious material or use the website to send spam. Only submit materials you are authorised to share. If you need to discuss confidential project details, contact us first so we can agree on how to exchange them.
                        </p>
                    </section>

                    {/* Section 4: Intellectual property */}
                    <section id="intellectual-property" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Intellectual property
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Frostrek AI and its licensors retain their rights in website content, branding, graphics and other materials. You may view and use the website for ordinary informational and business-evaluation purposes. Any broader reproduction, republication or commercial use requires permission where the law requires it. Third-party marks belong to their respective owners.
                        </p>
                    </section>

                    {/* Section 5: External links and booking tools */}
                    <section id="external-links-and-tools" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            External links and booking tools
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            The site may link to third-party websites or use third-party tools, including Calendly for demo bookings. Third-party services operate under their own terms and privacy policies. Booking availability and confirmations are handled through the scheduling tool.
                        </p>
                    </section>

                    {/* Section 6: Availability and liability */}
                    <section id="availability-and-liability" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Availability and liability
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            We aim to keep the website available and its information accurate, but availability and content may change. To the extent permitted by applicable law, we are not responsible for indirect or consequential losses arising from use of the website. These terms do not limit rights or remedies that applicable law prevents us from limiting.
                        </p>
                    </section>

                    {/* Section 7: Privacy */}
                    <section id="privacy-reference" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Privacy
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Our{' '}
                            <Link to="/privacy-policy" className="font-semibold text-[#2D6A4F] hover:underline">
                                Privacy Policy
                            </Link>{' '}
                            explains how we handle personal information when you browse the website, submit an enquiry, request an audit or book a demo.
                        </p>
                    </section>

                    {/* Section 8: Governing law and disputes */}
                    <section id="governing-law" className="space-y-3">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Governing law and disputes
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            These Terms are governed by the laws of India. Nothing in these Terms limits any rights or remedies that cannot be excluded under applicable law.
                        </p>
                    </section>

                    {/* Section 9: Key Highlights for Visitors & AI Engines */}
                    <section id="terms-highlights" className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#2D6A4F]/10 space-y-4">
                        <div className="flex items-center gap-2 text-[#2D6A4F]">
                            <HelpCircle size={18} />
                            <h3 className="font-serif text-lg font-semibold">Terms Summary &amp; Governance</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-gray-600">
                            <div>
                                <strong className="text-gray-900 block mb-1">Operating Entity:</strong>
                                Frostrek LLP (LLPIN AAW-5223), operating as Frostrek AI.
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Audit &amp; Enquiry Nature:</strong>
                                Informational only; commercial terms governed by written service contracts.
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Applicable Jurisdiction:</strong>
                                Republic of India (Gurugram, Haryana).
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-1">Support &amp; Inquiries:</strong>
                                Reach our team directly at <a href="mailto:contact@frostrek.com" className="text-[#2D6A4F] font-medium hover:underline">contact@frostrek.com</a>.
                            </div>
                        </div>
                    </section>

                    {/* Section 10: Changes and contact */}
                    <section id="changes-and-contact" className="pt-4 border-t border-gray-100 space-y-4">
                        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#2D6A4F] leading-snug">
                            Changes and contact
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            We may revise these terms by posting an updated version and effective date on this page. For questions about these terms, contact{' '}
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
                    </section>
                </motion.article>
            </div>
        </main>
    );
};

export default TermsAndConditionsPage;
