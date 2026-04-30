import HeroSection from '../components/home/HeroSection';
import AISolutionsShowcase from '../components/home/AISolutionsShowcase';
import TrustedBySection from '../components/home/TrustedBySection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

import CuteBackground from '../components/ui/CuteBackground';
import SEO from '../components/seo/SEO';

const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Frostrek",
  "url": "https://www.frostrek.com",
  "logo": "https://www.frostrek.com/logo.png",
  "description": "AI-powered enterprise solutions including conversational AI agents, automation, and AI copilots.",
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
  "name": "Frostrek",
  "url": "https://www.frostrek.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.frostrek.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

const faqSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does the AI Project Review process work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We start with a comprehensive audit of your current infrastructure and goals. Our team then designs a tailored roadmap, selecting the right models and architecture to ensure scalability and ROI."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data secure with your AI models?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Security is our top priority. We implement enterprise-grade encryption, on-premise deployment options, and strict compliance with global data protection standards (GDPR, ISO)."
      }
    },
    {
      "@type": "Question",
      "name": "Can you integrate with our existing software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our solutions are designed to be agnostic. We build custom APIs and middleware to seamlessly integrate with your CRM, ERP, or legacy systems without disrupting operations."
      }
    },
    {
      "@type": "Question",
      "name": "What is the typical timeline for an MVP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most MVPs are delivered within 4-8 weeks, depending on complexity. We use agile methodologies to ensure rapid iteration and quick time-to-market."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer post-deployment support?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide 24/7 monitoring and maintenance packages to ensure your AI systems remain efficient, secure, and up-to-date with the latest advancements."
      }
    }
  ]
});

const Home = () => {
    return (
        <div className="min-h-screen relative">
            <SEO 
                title="Frostrek | AI-Powered Enterprise Solutions & Conversational AI Agents" 
                description="Transform your business with Frostrek's cutting-edge AI solutions. Explore conversational AI agents, intelligent automation, and enterprise-grade AI copilots that enhance productivity and streamline workflows." 
                path="/" 
                schema={[organizationSchema, websiteSchema, faqSchema]}
            />
            <CuteBackground />
            <HeroSection />
            <AISolutionsShowcase />
            <TrustedBySection />
            <FeaturesSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </div>
    );
};

export default Home;
