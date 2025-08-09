export const defaultSEO = {
  title: "LexusTracker - Track Your Lexus, Drive with Confidence | Nederland",
  titleTemplate: "%s | LexusTracker",
  description:
    "Professional Lexus IS250C tracking and analytics platform for the Netherlands. Real-time RDW data, vehicle insights, and comprehensive statistics. Professionele Lexus tracking met real-time gegevens.",
  canonical: "https://lexustracker.nl",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://lexustracker.nl",
    siteName: "LexusTracker",
    title: "LexusTracker - Track Your Lexus, Drive with Confidence",
    description:
      "Professional Lexus IS250C tracking platform with real-time RDW data for the Netherlands. Comprehensive vehicle analytics and insights.",
    images: [
      {
        url: "https://lexustracker.nl/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LexusTracker - Professional Lexus Vehicle Tracking Platform",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@lexustracker",
    site: "@lexustracker",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "Lexus IS250C, RDW, kenteken check, voertuig gegevens, car tracking, Netherlands, Nederland, automotive data, vehicle registration, Lexus tracker, auto gegevens, kenteken opzoeken, voertuig informatie, car database, convertible, cabrio",
    },
    {
      name: "author",
      content: "LexusTracker Team",
    },
    {
      name: "robots",
      content: "index,follow",
    },
    {
      name: "googlebot",
      content:
        "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      name: "theme-color",
      content: "#ef4444",
    },
    {
      name: "msapplication-TileColor",
      content: "#ef4444",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "geo.region",
      content: "NL",
    },
    {
      name: "geo.country",
      content: "Netherlands",
    },
    {
      name: "language",
      content: "Dutch, English",
    },
    {
      name: "distribution",
      content: "global",
    },
    {
      name: "rating",
      content: "general",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "sitemap",
      type: "application/xml",
      href: "/sitemap.xml",
    },
    {
      rel: "alternate",
      hrefLang: "nl",
      href: "https://lexustracker.nl",
    },
    {
      rel: "alternate",
      hrefLang: "en",
      href: "https://lexustracker.nl/en",
    },
    {
      rel: "alternate",
      hrefLang: "x-default",
      href: "https://lexustracker.nl",
    },
  ],
};

export const pageSEO = {
  dashboard: {
    title: "Dashboard - Lexus Statistics & Analytics | LexusTracker Nederland",
    description:
      "Real-time Lexus IS250C dashboard with comprehensive statistics, charts, and analytics. Monitor vehicle registrations, insurance status, and trends in the Netherlands. Dashboard met real-time Lexus statistieken.",
    keywords:
      "Lexus IS250C, dashboard, statistics, analytics, Lexus dashboard, car statistics, vehicle analytics, RDW data, Netherlands car data, auto statistieken, voertuig analytics, convertible dashboard",
    canonical: "https://lexustracker.nl",
  },
  search: {
    title: "Search Lexus Vehicles - RDW Database | LexusTracker Nederland",
    description:
      "Search through comprehensive Lexus IS250C database with real-time RDW data. Find vehicle details, registration info, and insurance status. Zoek Lexus voertuigen in RDW database.",
    keywords:
      "Lexus IS250C, search cars, kenteken zoeken, license plate search, RDW database, vehicle search, car lookup, Lexus search, voertuig zoeken, auto database, kenteken check, convertible search",
    canonical: "https://lexustracker.nl/search",
  },
  photos: {
    title: "Lexus IS250C Photo Gallery | LexusTracker Nederland",
    description:
      "Explore our curated collection of Lexus IS250C photos. High-quality images showcasing design, interior, and details. Bekijk onze Lexus foto galerij.",
    keywords:
      "Lexus IS250C, Lexus photos, IS250C images, car gallery, vehicle photos, Lexus design, auto foto's, voertuig afbeeldingen, Lexus galerij, convertible photos, cabrio foto's",
    canonical: "https://lexustracker.nl/photos",
  },
  about: {
    title: "About LexusTracker - Technology & Mission | LexusTracker Nederland",
    description:
      "Learn about LexusTracker platform, our technology stack, data sources, and mission to provide comprehensive Lexus IS250C insights for Netherlands. Over LexusTracker platform.",
    keywords:
      "Lexus IS250C, about us, technology stack, Next.js, React, RDW API, vehicle data, automotive technology, platform information, over ons, technologie, convertible tracker",
    canonical: "https://lexustracker.nl/about",
  },
};

export function generateStructuredData(
  type:
    | "website"
    | "organization"
    | "webapp"
    | "breadcrumb"
    | "article"
    | "service"
    | "localbusiness",
  data?: any
) {
  const baseUrl = "https://lexustracker.nl";

  switch (type) {
    case "website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "LexusTracker",
        alternateName: "Lexus Tracker Nederland",
        url: baseUrl,
        description:
          "Professional Lexus IS250C tracking and analytics platform for the Netherlands with real-time RDW data and comprehensive vehicle insights.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@type": "Organization",
          name: "LexusTracker",
          url: baseUrl,
        },
        inLanguage: ["nl-NL", "en-US"],
        audience: {
          "@type": "Audience",
          audienceType:
            "Car enthusiasts, Lexus owners, Vehicle tracking professionals, Lexus IS250C convertible owners",
          geographicArea: {
            "@type": "Country",
            name: "Netherlands",
          },
        },
        keywords:
          "Lexus IS250C tracking, vehicle analytics, RDW data, convertible tracking, cabrio analytics",
      };

    case "organization":
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "LexusTracker",
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description:
          "Professional Lexus IS250C vehicle tracking and analytics platform for the Netherlands market.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          areaServed: "NL",
          availableLanguage: ["Dutch", "English"],
        },
        sameAs: ["https://github.com/TheOnly3aq/lexustracker"],
        address: {
          "@type": "PostalAddress",
          addressCountry: "NL",
        },
        foundingDate: "2024",
        slogan: "Track Your Lexus, Drive with Confidence",
        knowsAbout: [
          "Lexus IS250C tracking",
          "Vehicle analytics",
          "RDW data processing",
          "Convertible car data",
          "Automotive statistics",
          "Dutch vehicle registration",
        ],
      };

    case "webapp":
      return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "LexusTracker",
        url: baseUrl,
        description:
          "Professional Lexus IS250C tracking and analytics platform with comprehensive vehicle insights.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        browserRequirements: "Requires JavaScript",
        permissions: "cookies for preferences",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
        author: {
          "@type": "Organization",
          name: "LexusTracker Team",
        },
        softwareVersion: "1.0",
        applicationSubCategory: "Vehicle Analytics",
        featureList: [
          "Real-time Lexus IS250C tracking",
          "RDW data integration",
          "Vehicle analytics dashboard",
          "License plate search functionality",
          "Photo gallery",
          "Convertible-specific insights",
        ],
      };

    case "service":
      return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: data?.serviceName || "Lexus IS250C Vehicle Tracking Services",
        description:
          data?.description ||
          "Professional Lexus IS250C tracking services with real-time RDW data and comprehensive analytics.",
        provider: {
          "@type": "Organization",
          name: "LexusTracker",
          url: baseUrl,
        },
        areaServed: "Netherlands",
        serviceType: data?.serviceType || "Vehicle Analytics Services",
        category: [
          "Automotive Technology",
          "Data Analytics",
          "Vehicle Tracking",
        ],
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceRange: data?.priceRange || "Free - Premium",
          priceCurrency: "EUR",
        },
      };

    case "localbusiness":
      return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "LexusTracker Nederland",
        url: baseUrl,
        description:
          "Professional Lexus IS250C vehicle tracking and analytics services provider in the Netherlands.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "NL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 52.1326,
          longitude: 5.2913,
        },
        areaServed: "Netherlands",
        priceRange: "Free - Premium",
        telephone: data?.telephone,
        email: data?.email,
        openingHours: "Mo-Su 00:00-24:00",
        paymentAccepted: ["Cash", "Credit Card", "PayPal"],
        currenciesAccepted: "EUR",
      };

    case "breadcrumb":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data?.items || [],
      };

    case "article":
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data?.title || "LexusTracker Platform Information",
        description:
          data?.description ||
          "Learn about our Lexus IS250C vehicle tracking services.",
        author: {
          "@type": "Organization",
          name: "LexusTracker Team",
        },
        publisher: {
          "@type": "Organization",
          name: "LexusTracker",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.png`,
          },
        },
        datePublished: data?.datePublished || new Date().toISOString(),
        dateModified: data?.dateModified || new Date().toISOString(),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data?.url || baseUrl,
        },
        image: data?.image || `${baseUrl}/og-image.jpg`,
        articleSection: "Technology",
        keywords:
          "Lexus IS250C tracking, vehicle analytics, convertible data, RDW integration",
      };

    default:
      return null;
  }
}

export function generateBreadcrumbData(
  items: Array<{ name: string; url: string }>
) {
  return items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  }));
}

// Utility function to generate page-specific SEO metadata
export function generatePageSEO(
  pageKey: keyof typeof pageSEO,
  customData?: any
) {
  const baseData = pageSEO[pageKey];

  return {
    title: customData?.title || baseData.title,
    description: customData?.description || baseData.description,
    canonical: customData?.canonical || baseData.canonical,
    openGraph: {
      title: customData?.title || baseData.title,
      description: customData?.description || baseData.description,
      url: customData?.canonical || baseData.canonical,
      type: "website",
      locale: "nl_NL",
      siteName: "LexusTracker",
      images: [
        {
          url: customData?.image || "https://lexustracker.nl/og-image.jpg",
          width: 1200,
          height: 630,
          alt: customData?.imageAlt || `${baseData.title} - LexusTracker`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: customData?.title || baseData.title,
      description: customData?.description || baseData.description,
      creator: "@lexustracker",
      images: [customData?.image || "https://lexustracker.nl/og-image.jpg"],
    },
    additionalMetaTags: [
      {
        name: "keywords",
        content: customData?.keywords || baseData.keywords,
      },
      {
        name: "author",
        content: "LexusTracker Team",
      },
      {
        name: "robots",
        content: "index,follow",
      },
      {
        name: "googlebot",
        content:
          "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      },
    ],
  };
}

// Utility function to generate multilingual meta tags
export function generateMultilingualMeta(
  englishContent: string,
  dutchContent: string
) {
  return `${englishContent} | ${dutchContent}`;
}

// SEO-optimized image metadata generator
export function generateImageSEO(src: string, alt: string, title?: string) {
  return {
    src,
    alt,
    title: title || alt,
    loading: "lazy" as const,
    decoding: "async" as const,
  };
}
