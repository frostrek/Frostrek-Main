import { useEffect } from 'react';
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
  canonicalUrl?: string;
  excludeIsoCredentials?: boolean;
}
//Function SEO
export default function SEO({
  title,
  description,
  path,
  name = "Frostrek AI",
  type = "website",
  schema,
  keywords,
  noindex = false,
  image,
  canonicalUrl,
  excludeIsoCredentials = false
}: SEOProps) {
  const url = canonicalUrl || `https://www.frostrek.ai${path}`;
  // Ensure the image URL is absolute because social crawlers require it
  let ogImage = image || "https://www.frostrek.ai/og-image-v2.png";
  if (ogImage.startsWith('/')) {
    ogImage = `https://www.frostrek.ai${ogImage}`;
  }

  // Auto-generate BreadcrumbList schema
  // Drop intermediate levels that do not have dedicated hub pages (e.g. /solutions, /products)
  const NON_PAGE_INTERMEDIATES = new Set(['solutions', 'products']);
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
  let position = 2;
  pathParts.forEach((part, index) => {
    currentPath += `/${part}`;
    const isLast = index === pathParts.length - 1;

    // Skip intermediate segments that do not have standalone routes in sitemap
    if (!isLast && NON_PAGE_INTERMEDIATES.has(part)) {
      return;
    }

    const formattedName = part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const itemName = isLast ? title.split('|')[0].trim() : formattedName;

    breadcrumbItems.push({
      "@type": "ListItem",
      "position": position++,
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
  const usedSchemaIds = new Set<string>(['schema-breadcrumb', 'schema-org']);
  const customSchemaEntries = customSchemas.map((s, i) => {
    let schemaId = '';
    try {
      const parsed = JSON.parse(s);
      const entity = Array.isArray(parsed) ? parsed[0] : parsed;
      const type = entity?.['@type'] || entity?.['type'];
      if (type) {
        const typeStr = Array.isArray(type) ? type[0] : type;
        const slug = String(typeStr).toLowerCase().replace(/[^a-z0-9]/g, '-');
        const baseId = `schema-${slug}`;
        if (!usedSchemaIds.has(baseId)) {
          schemaId = baseId;
        } else {
          let count = 2;
          while (usedSchemaIds.has(`${baseId}-${count}`)) {
            count++;
          }
          schemaId = `${baseId}-${count}`;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    if (!schemaId) {
      const baseId = `schema-custom-${i}`;
      let count = 2;
      schemaId = baseId;
      while (usedSchemaIds.has(schemaId)) {
        schemaId = `${baseId}-${count++}`;
      }
    }
    usedSchemaIds.add(schemaId);
    return { id: schemaId, json: s };
  });

  // Cleanup effect to deduplicate canonical links and schema scripts during client hydration
  useEffect(() => {
    const deduplicateHead = () => {
      // 1. Deduplicate canonical links: ensure only 1 canonical tag exists
      const canonicals = Array.from(document.querySelectorAll('link[rel="canonical"]'));
      if (canonicals.length > 1) {
        const primary = canonicals.find(el => el.getAttribute('id') === 'canonical-url' && el.getAttribute('href') === url)
          || canonicals.find(el => el.getAttribute('id') === 'canonical-url')
          || canonicals[canonicals.length - 1];

        canonicals.forEach(el => {
          if (el !== primary) {
            el.remove();
          }
        });
      }

      // 2. Deduplicate schema scripts: remove any duplicates by id or JSON content
      const schemaScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      const seenIds = new Set<string>();
      const seenContents = new Set<string>();

      schemaScripts.forEach(script => {
        const id = script.getAttribute('id');
        const content = script.textContent ? script.textContent.trim().replace(/\s+/g, ' ') : '';

        if (id) {
          if (seenIds.has(id)) {
            script.remove();
            return;
          }
          seenIds.add(id);
        }

        if (content) {
          if (seenContents.has(content)) {
            script.remove();
            return;
          }
          seenContents.add(content);
        }
      });
    };

    deduplicateHead();
    const timer = setTimeout(deduplicateHead, 50);
    return () => clearTimeout(timer);
  }, [url, schema]);

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Frostrek AI" />
      <meta name="publisher" content="Frostrek AI" />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex" />}

      {/* Canonical Link */}
      <link rel="canonical" href={url} id="canonical-url" />

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
      <script id="schema-breadcrumb" type="application/ld+json">{breadcrumbSchema}</script>
      {customSchemaEntries.map((entry) => (
        <script key={entry.id} id={entry.id} type="application/ld+json">{entry.json}</script>
      ))}

      {/* Organization Schema for Siri & Spotlight */}
      <script id="schema-org" type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://www.frostrek.ai/#organization",
        "name": "Frostrek AI",
        "alternateName": ["Frostrek", "Frostrek LLP", "Frostrek AI Solutions"],
        "url": "https://www.frostrek.ai",
        "logo": "https://www.frostrek.ai/logonew.png",
        "description": "Frostrek AI delivers AI agents, LLM training, customized applications, workflow automation, and data annotation services for enterprises and frontier AI teams.",
        "foundingDate": "2021",
        "founder": {
          "@type": "Person",
          "name": "Akash Mittal"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4th Floor, Jmd Empire, 455, Golf Course Ext Rd, Sector 62",
          "addressLocality": "Gurugram",
          "addressRegion": "Haryana",
          "postalCode": "122098",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "telephone": "+91 6399999955",
          "email": "contact@frostrek.com",
          "url": "https://www.frostrek.ai/schedule-demo",
          "areaServed": ["IN", "US", "GB"],
          "availableLanguage": ["English"]
        },
        "sameAs": [
          "https://www.linkedin.com/company/frostrek",
          "https://www.instagram.com/frostrekai",
          "https://www.facebook.com/people/Frostrek-Ai/pfbid0VWudotryavaCWUi3utjYrUJYh35mGbSHmq73RnhksigdjJA28XQVBgNLz1Nryympl/",
          "https://www.youtube.com/@frostrekai"
        ],
        ...(!excludeIsoCredentials ? {
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
            }
          ]
        } : {})
      })}</script>
    </Helmet>
  );
}
