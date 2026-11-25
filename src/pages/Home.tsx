import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
const OurProductsSection = lazy(() => import('../components/home/OurProductsSection'));
const AISolutionsShowcase = lazy(() => import('../components/home/AISolutionsShowcase'));
const WhatWeDoSection = lazy(() => import('../components/home/WhatWeDoSection'));
const ImpactComparison = lazy(() => import('../components/home/ImpactComparison'));
const TestimonialsSection = lazy(() => import('../components/home/TestimonialsSection'));
const FeaturesSection = lazy(() => import('../components/home/FeaturesSection'));

import SEO from '../components/seo/SEO';


const websiteSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.frostrek.ai/#website",
  "name": "Frostrek AI",
  "url": "https://www.frostrek.ai",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.frostrek.ai/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

const localBusinessSchema = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.frostrek.ai/#hq-office",
    "name": "Frostrek AI (HQ)",
    "image": "https://www.frostrek.ai/logonew.png",
    "url": "https://www.frostrek.ai",
    "telephone": "+916399999955",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Jmd Empire, 455, Golf Course Ext Rd, Sector 62",
      "addressLocality": "Gurugram",
      "addressRegion": "Haryana",
      "postalCode": "122098",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.4595,
      "longitude": 77.0266
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "₹₹₹",
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://www.frostrek.ai/#organization"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.frostrek.ai/#us-office",
    "name": "Frostrek AI (USA)",
    "image": "https://www.frostrek.ai/logonew.png",
    "url": "https://www.frostrek.ai",
    "telephone": "+17574722491",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "701 Tillery Street Unit 12-3227",
      "addressLocality": "Austin",
      "addressRegion": "Texas",
      "postalCode": "78702",
      "addressCountry": "US"
    },
    "priceRange": "$$$",
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://www.frostrek.ai/#organization"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.frostrek.ai/#uk-office",
    "name": "Frostrek AI (UK)",
    "image": "https://www.frostrek.ai/logonew.png",
    "url": "https://www.frostrek.ai",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "24-26 Arcadia Avenue, Fin009/8701",
      "addressLocality": "London",
      "postalCode": "N3 2JU",
      "addressCountry": "GB"
    },
    "priceRange": "£££",
    "parentOrganization": {
      "@type": "Organization",
      "@id": "https://www.frostrek.ai/#organization"
    }
  }
]);

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://www.frostrek.ai/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Where is Frostrek AI located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Frostrek AI is headquartered in Gurugram, India, with global offices in Austin, Texas (USA) and London (UK)."
      }
    },
    {
      "@type": "Question",
      "name": "What services does Frostrek AI provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We build enterprise AI agents, conversational AI platforms, and provide custom LLM fine-tuning and workflow automation solutions."
      }
    }
  ]
});

const personSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.frostrek.ai/#akash-mittal",
  "name": "Akash Mittal",
  "jobTitle": "Founder & CEO",
  "worksFor": {
    "@type": "Organization",
    "@id": "https://www.frostrek.ai/#organization",
    "name": "Frostrek AI"
  },
  "url": "https://www.linkedin.com/in/akash-mittal/"
});

const Home = () => {
  return (
    <div className="min-h-screen relative bg-brand-light-bg">
      <SEO
        title="Frostrek AI | Conversational AI & Workflow Automation"
        description="Frostrek AI builds conversational AI agents, AI video platforms, and enterprise workflow automation for global startups & enterprises."
        path="/"
        keywords="enterprise AI agents, conversational AI platform, custom LLM fine-tuning, workflow automation solutions, Retrieval Augmented Generation, RAG implementation, AI data annotation services"
        schema={[websiteSchema, localBusinessSchema, personSchema, faqSchema]}
      />
      <HeroSection />

      <Suspense fallback={null}>
        {/* Our Products Section */}
        <OurProductsSection />


        {/* 2. Product Features / Deep Dive */}
        <AISolutionsShowcase />

        {/* 2.5 Explore more Frostrek services (LINK-01) */}
        <section aria-label="Explore more Frostrek services" className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Explore more Frostrek services
            </h2>
            <nav aria-label="More Frostrek services" className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {[
                { name: 'Website Development', path: '/solutions/website-development' },
                { name: 'Custom Software Development', path: '/solutions/custom-software-ai-integration' },
                { name: 'AI Consulting', path: '/solutions/ai-consulting' },
                { name: 'AI Agents', path: '/solutions/ai-agents' },
                { name: 'AI Answer Review', path: '/solutions/llm-evaluation-rlhf' },
              ].map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="px-4 py-2 rounded-full border border-gray-200 bg-[#FAFCFB] hover:bg-[#F0FDF4] hover:border-[#BBF7D0] text-gray-700 hover:text-[#166534] text-xs sm:text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2"
                >
                  {service.name} &rarr;
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* 3. What We Do */}
        <WhatWeDoSection />

        {/* 4. What our customers says (Testimonials) */}
        <TestimonialsSection />

        {/* 5. Impact Comparison (AI-Driven Outcomes We Deliver) */}
        <ImpactComparison />

        {/* Answer Alignment / Visually Hidden FAQ for SEO */}
        <div className="sr-only">
          <h2>Frequently Asked Questions</h2>
          <dl>
            <dt>Where is Frostrek AI located?</dt>
            <dd>Frostrek AI is headquartered in Gurugram, India, with global offices in Austin, Texas (USA) and London (UK).</dd>
            <dt>What services does Frostrek AI provide?</dt>
            <dd>We build enterprise AI agents, conversational AI platforms, and provide custom LLM fine-tuning and workflow automation solutions.</dd>
          </dl>
        </div>

        {/* 6. Why Choose Frostrek */}
        <FeaturesSection />
      </Suspense>
    </div>
  );
};

export default Home;
