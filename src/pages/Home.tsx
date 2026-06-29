import { lazy, Suspense } from 'react';
import HeroSection from '../components/home/HeroSection';
const OurProductsSection = lazy(() => import('../components/home/OurProductsSection'));
const AISolutionsShowcase = lazy(() => import('../components/home/AISolutionsShowcase'));
const WhatWeDoSection = lazy(() => import('../components/home/WhatWeDoSection'));
const ImpactComparison = lazy(() => import('../components/home/ImpactComparison'));
const FeaturesSection = lazy(() => import('../components/home/FeaturesSection'));

import SEO from '../components/seo/SEO';

const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Frostrek AI",
  "url": "https://www.frostrek.ai",
  "logo": "https://www.frostrek.ai/logo.png",
  "description": "Frostrek AI builds conversational AI agents, AI-powered video interview platforms (Hiyring), and enterprise workflow automation. 50+ specialists with 5+ years of production AI deployment, serving startups to enterprises globally from Gurugram, India.",
  "foundingDate": "2019",
  "founder": {
    "@type": "Person",
    "name": "Akash Mittal"
  },
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "50"
  },
  "sameAs": [
    "https://www.linkedin.com/company/frostrek",
    "https://twitter.com/frostrek"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91 6399999955",
    "contactType": "sales",
    "areaServed": ["IN", "US", "GB"],
    "availableLanguage": ["English"]
  },
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Jmd Empire, 455, Golf Course Ext Rd, Sector 62",
      "addressLocality": "Gurugram, Nangil Umarpur",
      "addressRegion": "Haryana",
      "postalCode": "122102",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "701 Tillery Street Unit 12-3227",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78702",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "24-26 Arcadia Avenue, Fin009/8701",
      "addressLocality": "London",
      "postalCode": "N3 2JU",
      "addressCountry": "GB"
    }
  ]
});

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
  }
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
        title="Frostrek AI | Conversational AI Agents & Workflow Automation | Gurugram, India"
        description="Frostrek AI builds conversational AI agents, AI-powered video interview platforms, and enterprise workflow automation. 50+ specialists, 5+ years delivery, serving startups to enterprises globally from Gurugram, India."
        path="/"
        keywords="production-ready autonomous AI agents USA, managed RLHF alignment services UK, custom LLM fine-tuning enterprise India, conversational AI deployment globally, enterprise AI solutions USA, custom Retrieval Augmented Generation (RAG) setup, LLM dataset preparation services USA"
        schema={[organizationSchema, websiteSchema, localBusinessSchema, personSchema]}
      />
      <HeroSection />
      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
};

export default Home;
