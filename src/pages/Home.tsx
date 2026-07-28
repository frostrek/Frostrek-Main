import { lazy } from 'react';
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

const localBusinessSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Frostrek AI",
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
  "priceRange": "₹₹₹"
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
        title="Frostrek AI | Autonomous AI Agents & Automation"
        description="Frostrek AI builds conversational AI agents, AI video interview platforms, and enterprise workflow automation. 50+ specialists serving global startups & enterprises."
        path="/"
        keywords="enterprise AI agents, conversational AI platform, custom LLM fine-tuning, workflow automation solutions, Retrieval Augmented Generation, RAG implementation, AI data annotation services"
        schema={[websiteSchema, localBusinessSchema, personSchema]}
      />
      <HeroSection />

      {/* Our Products Section */}
      <OurProductsSection />

      {/* 2. Our two flagship AI solutions */}
      <AISolutionsShowcase />

      {/* 3. What We Do & How We Transform */}
      <WhatWeDoSection />

      {/* 4. AI-Driven Outcomes We Deliver */}
      <ImpactComparison />

      {/* 6. Why Choose Frostrek */}
      <FeaturesSection />
    </div>
  );
};

export default Home;
