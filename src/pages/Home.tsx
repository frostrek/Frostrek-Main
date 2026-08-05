import { lazy, Suspense } from 'react';
import HeroSection from '../components/home/HeroSection';
const OurProductsSection = lazy(() => import('../components/home/OurProductsSection'));
const AISolutionsShowcase = lazy(() => import('../components/home/AISolutionsShowcase'));
const WhatWeDoSection = lazy(() => import('../components/home/WhatWeDoSection'));
const ImpactComparison = lazy(() => import('../components/home/ImpactComparison'));
const FeaturesSection = lazy(() => import('../components/home/FeaturesSection'));

import SEO from '../components/seo/SEO';


const websiteSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
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
    "@id": "https://www.frostrek.ai/#organization",
    "name": "Frostrek AI (HQ)",
    "image": "https://www.frostrek.ai/logo.png",
    "url": "https://www.frostrek.ai",
    "telephone": "+916399999955",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Jmd Empire, 455, Golf Course Ext Rd, Sector 62",
      "addressLocality": "Gurugram",
      "addressRegion": "Haryana",
      "postalCode": "122102",
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
    "priceRange": "₹₹₹"
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.frostrek.ai/#us-office",
    "name": "Frostrek AI (USA)",
    "image": "https://www.frostrek.ai/logo.png",
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
    "priceRange": "$$$"
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.frostrek.ai/#uk-office",
    "name": "Frostrek AI (UK)",
    "image": "https://www.frostrek.ai/logo.png",
    "url": "https://www.frostrek.ai",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "24-26 Arcadia Avenue, Fin009/8701",
      "addressLocality": "London",
      "postalCode": "N3 2JU",
      "addressCountry": "GB"
    },
    "priceRange": "£££"
  }
]);

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
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
  "name": "Akash Mittal",
  "jobTitle": "Founder & CEO",
  "worksFor": {
    "@type": "Organization",
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

        {/* 2. What We Do */}
        <WhatWeDoSection />
        
        {/* 3. Product Features / Deep Dive */}
        <AISolutionsShowcase />

        {/* 4. Impact Comparison */}
        <ImpactComparison />

        {/* 5. Answer Alignment / Visually Hidden FAQ for SEO */}
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
