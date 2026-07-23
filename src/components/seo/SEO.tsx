import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  name?: string;
  type?: string;
  schema?: string | string[];
  keywords?: string;
  noindex?: boolean;
  image?: string;
}

export default function SEO({ 
  title, 
  description, 
  path, 
  name = "Frostrek AI", 
  type = "website",
  schema,
  keywords,
  noindex = false,
  image
}: SEOProps) {
  const url = `https://www.frostrek.ai${path}`;
  const ogImage = image || "https://www.frostrek.ai/og-image.png";

  // Auto-generate BreadcrumbList schema
  const pathParts = path.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.frostrek.ai/"
    }
  ];

  let currentPath = '';
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    // Format name: capitalize first letter, replace dashes with spaces
    const formattedName = part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Use the page title for the last item if it's the exact path match
    const isLast = index === pathParts.length - 1;
    const itemName = isLast ? title.split('|')[0].trim() : formattedName;

    breadcrumbItems.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": itemName,
      "item": `https://www.frostrek.ai${currentPath}`
    });
  });

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  });

  // Handle single string or array of strings for custom schema
  const customSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex" />}
      
      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Dynamic Schemas */}
      <script type="application/ld+json">{breadcrumbSchema}</script>
      {customSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">{s}</script>
      ))}

      {/* Organization Schema for Siri & Spotlight */}
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Frostrek AI",
        "url": "https://www.frostrek.ai",
        "logo": "https://www.frostrek.ai/logo.png",
        "description": "Frostrek AI delivers AI agents, LLM training, customized applications, workflow automation, and data annotation services for enterprises and frontier AI teams.",
        "foundingDate": "2023",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Gurugram",
          "addressRegion": "Haryana",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "url": "https://www.frostrek.ai/schedule-demo"
        },
        "sameAs": [
          "https://www.wikidata.org/wiki/Q140454089",
          "https://www.linkedin.com/company/frostrek",
          "https://www.instagram.com/frostrek.ai"
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "ISO 27001"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "certification",
            "name": "ISO 9001"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "compliance",
            "name": "GDPR"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "compliance",
            "name": "HIPAA"
          },
          {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "compliance",
            "name": "SOC 2 Type II"
          }
        ]
      })}</script>
    </Helmet>
  );
}
