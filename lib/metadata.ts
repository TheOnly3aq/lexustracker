import { Metadata } from "next";
import { generateStructuredData } from "./seo";

interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string[];
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generate comprehensive Next.js metadata for pages
 */
export function generateMetadata(config: PageSEOConfig): Metadata {
  const baseUrl = "https://lexustracker.nl";
  const fullUrl = `${baseUrl}${config.path}`;
  const ogImage = config.image || `${baseUrl}/og-image.jpg`;

  return {
    metadataBase: new URL(baseUrl),
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: "LexusTracker Team" }],
    creator: "LexusTracker Team",
    publisher: "LexusTracker",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: config.type || "website",
      locale: "nl_NL",
      url: fullUrl,
      siteName: "LexusTracker",
      title: config.title,
      description: config.description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${config.title} - LexusTracker`,
        },
      ],
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      creator: "@lexustracker",
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        "nl-NL": fullUrl,
        "en-US": fullUrl,
        "x-default": fullUrl,
      },
    },
    other: {
      robots: "index,follow",
      googlebot:
        "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
      "theme-color": "#ef4444",
      "geo.region": "NL",
      "geo.country": "Netherlands",
    },
  };
}

/**
 * Generate viewport configuration
 */
export const optimizedViewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ef4444" },
    { media: "(prefers-color-scheme: dark)", color: "#ef4444" },
  ],
  colorScheme: "dark light",
};

/**
 * Common keywords for the application
 */
export const commonKeywords = [
  // Dutch keywords
  "Lexus",
  "IS250C",
  "RDW",
  "kenteken check",
  "voertuig gegevens",
  "auto gegevens",
  "kenteken opzoeken",
  "voertuig informatie",
  "auto database",
  "Nederland",
  "auto statistieken",
  "voertuig analytics",
  "goedkope hosting",
  "betrouwbare hosting",

  // English keywords
  "car tracking",
  "Netherlands",
  "automotive data",
  "vehicle registration",
  "Lexus tracker",
  "car database",
  "vehicle analytics",
  "hosting Netherlands",

  // Hosting keywords
  "webhosting",
  "game server hosting",
  "Minecraft server",
  "FiveM server",
  "snelle servers",
  "high performance hosting",
];

/**
 * Page-specific SEO configurations
 */
export const pageConfigs = {
  home: {
    title: "LexusTracker - Track Your Lexus, Drive with Confidence | Nederland",
    description:
      "Professional Lexus IS250C tracking and analytics platform for the Netherlands. Real-time RDW data, vehicle insights, comprehensive statistics, and premium hosting services.",
    keywords: [...commonKeywords, "dashboard", "statistics", "analytics"],
    path: "",
  },

  search: {
    title: "Search Lexus Vehicles - RDW Database | LexusTracker Nederland",
    description:
      "Search through comprehensive Lexus IS250C database with real-time RDW data. Find vehicle details, registration info, and insurance status.",
    keywords: [
      ...commonKeywords,
      "search cars",
      "license plate search",
      "vehicle search",
    ],
    path: "/search",
    image: "https://lexustracker.nl/og-search.jpg",
  },

  photos: {
    title: "Lexus IS250C Photo Gallery | LexusTracker Nederland",
    description:
      "Explore our curated collection of Lexus IS250C photos. High-quality images showcasing design, interior, and details.",
    keywords: [
      ...commonKeywords,
      "Lexus photos",
      "car gallery",
      "vehicle photos",
    ],
    path: "/photos",
    image: "https://lexustracker.nl/og-photos.jpg",
  },

  about: {
    title: "About LexusTracker - Technology & Mission | LexusTracker Nederland",
    description:
      "Learn about LexusTracker platform, our technology stack, data sources, and mission to provide comprehensive vehicle insights.",
    keywords: [
      ...commonKeywords,
      "about us",
      "technology stack",
      "platform information",
    ],
    path: "/about",
    type: "article" as const,
    image: "https://lexustracker.nl/og-about.jpg",
  },
};

/**
 * Generate structured data for different page types
 */
export function generatePageStructuredData(
  pageKey: keyof typeof pageConfigs,
  additionalData?: any
) {
  const config = pageConfigs[pageKey];
  const baseUrl = "https://lexustracker.nl";

  const commonStructuredData = [
    generateStructuredData("website"),
    generateStructuredData("organization"),
  ];

  switch (pageKey) {
    case "home":
      return [
        ...commonStructuredData,
        generateStructuredData("webapp"),
        generateStructuredData("service", {
          serviceName: "Vehicle Tracking & Analytics",
          description: config.description,
          serviceType: "Automotive Analytics",
        }),
      ];

    case "search":
      return [
        ...commonStructuredData,
        generateStructuredData("service", {
          serviceName: "Vehicle Search & Database",
          description: config.description,
          serviceType: "Database Search Service",
        }),
      ];

    case "photos":
      return [
        ...commonStructuredData,
        {
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: "Lexus IS250C Photo Gallery",
          description: config.description,
          url: `${baseUrl}${config.path}`,
          mainEntity:
            additionalData?.photos?.map((photo: any) => ({
              "@type": "ImageObject",
              contentUrl: photo.image,
              name: photo.title,
              description: photo.alt,
            })) || [],
        },
      ];

    case "about":
      return [
        ...commonStructuredData,
        generateStructuredData("article", {
          title: config.title,
          description: config.description,
          url: `${baseUrl}${config.path}`,
        }),
      ];

    default:
      return commonStructuredData;
  }
}
