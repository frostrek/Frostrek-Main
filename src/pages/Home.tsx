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
    "@id": "https://www.frostrek.ai/#localbusiness-in",
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
      "latitude": "28.3995",
      "longitude": "77.0655"
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
    "@id": "https://www.frostrek.ai/#localbusiness-us",
    "name": "Frostrek AI (US Office)",
    "image": "https://www.frostrek.ai/logo.png",
    "url": "https://www.frostrek.ai",
    "telephone": "+916399999955",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "701 Tillery Street Unit 12-3227",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78702",
      "addressCountry": "US"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$$"
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.frostrek.ai/#localbusiness-uk",
    "name": "Frostrek AI (UK Office)",
    "image": "https://www.frostrek.ai/logo.png",
    "url": "https://www.frostrek.ai",
    "telephone": "+916399999955",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "24-26 Arcadia Avenue, Fin009/8701",
      "addressLocality": "London",
      "postalCode": "N3 2JU",
      "addressCountry": "GB"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "£££"
  }
]);

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

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does Frostrek AI do?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Frostrek AI is an enterprise AI company headquartered in Gurugram, India, with offices in Austin, TX and London, UK. We build conversational AI agents, workflow automation systems, and custom LLM solutions for enterprises across manufacturing, e-commerce, fintech, and healthcare. Founded in 2019, we serve 40+ enterprise clients globally with a team of 50+ engineers."
      }
    },
    {
      "@type": "Question",
      "name": "What industries do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We serve enterprises across manufacturing (with our Manufacturing OS platform), e-commerce (AI-powered search and customer support), fintech (custom wallet and loyalty systems), healthcare (precision data operations for medical AI), and autonomous driving (computer vision data pipelines). Our solutions are industry-agnostic at the infrastructure level but deeply customized at the application layer."
      }
    },
    {
      "@type": "Question",
      "name": "How does the AI Project Review process work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We start with a comprehensive audit of your current infrastructure and goals. Our team then designs a tailored roadmap, selecting the right models and architecture to ensure scalability and ROI. This typically takes 1-2 weeks and results in a detailed implementation plan with timelines, resource estimates, and expected outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data secure with your AI models?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Security is our top priority. We implement enterprise-grade encryption at rest and in transit, on-premise deployment options, and strict compliance with global data protection standards including GDPR, ISO 27001, SOC 2 Type II, and India's DPDP Act. All annotation staff undergo background checks, and we maintain complete audit logging of all data access events."
      }
    },
    {
      "@type": "Question",
      "name": "What AI models and frameworks do you use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are model-agnostic and select the best tools for each use case. Our stack includes OpenAI GPT-4, Anthropic Claude, open-source models (LLaMA, Mistral), and custom fine-tuned models. For voice AI, we use proprietary sub-200ms response pipelines. For computer vision, we work with YOLO, Detectron2, and custom architectures depending on the application."
      }
    }
  ]
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
