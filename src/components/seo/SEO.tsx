import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  name?: string;
  type?: string;
  schema?: string | string[];
}

export default function SEO({ 
  title, 
  description, 
  path, 
  name = "Frostrek", 
  type = "website",
  schema
}: SEOProps) {
  const url = `https://www.frostrek.com${path}`;
  const image = "https://www.frostrek.com/logo.png";

  // Auto-generate BreadcrumbList schema
  const pathParts = path.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.frostrek.com/"
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
      "item": `https://www.frostrek.com${currentPath}`
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
      
      {/* Canonical Link */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Dynamic Schemas */}
      <script type="application/ld+json">{breadcrumbSchema}</script>
      {customSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">{s}</script>
      ))}
    </Helmet>
  );
}
