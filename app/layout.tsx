import "./globals.css";
import { ReactNode, Suspense } from "react";
import { Metadata, Viewport } from "next";
import Sidebar from "@/components/sidebar";
import { LanguageProvider } from "@/lib/i18n";
import { defaultSEO, generateStructuredData } from "@/lib/seo";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lexustracker.nl"),
  title: {
    template: "%s | LexusTracker",
    default:
      "LexusTracker - Track Your Lexus, Drive with Confidence | Nederland",
  },
  description:
    "Professional Lexus IS250C tracking and analytics platform for the Netherlands. Real-time RDW data, vehicle insights, and comprehensive statistics. Professionele Lexus tracking met real-time gegevens.",
  keywords: [
    "Lexus IS250C",
    "RDW",
    "kenteken check",
    "voertuig gegevens",
    "car tracking",
    "Netherlands",
    "Nederland",
    "automotive data",
    "vehicle registration",
    "Lexus tracker",
    "auto gegevens",
    "kenteken opzoeken",
    "voertuig informatie",
    "car database",
    "convertible",
    "cabrio",
    "Lexus cabrio",
    "IS250C convertible",
  ],
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
        alt: "LexusTracker - Professional Lexus IS250C Vehicle Tracking Platform",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LexusTracker - Track Your Lexus, Drive with Confidence",
    description:
      "Professional Lexus IS250C tracking platform with real-time RDW data for the Netherlands.",
    creator: "@lexustracker",
    images: ["https://lexustracker.nl/og-image.jpg"],
  },
  alternates: {
    canonical: "https://lexustracker.nl",
    languages: {
      "nl-NL": "https://lexustracker.nl",
      "en-US": "https://lexustracker.nl/en",
      "x-default": "https://lexustracker.nl",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // Add your verification codes here when available
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  category: "technology",
  classification: "Business",
  other: {
    "theme-color": "#ef4444",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "geo.region": "NL",
    "geo.country": "Netherlands",
    language: "Dutch, English",
    distribution: "global",
    rating: "general",
    "revisit-after": "7 days",
    coverage: "Worldwide",
    target: "all",
    HandheldFriendly: "True",
    MobileOptimized: "320",
  },
};

export const viewport: Viewport = {
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

export default function RootLayout({ children }: Props) {
  const websiteStructuredData = generateStructuredData("website");
  const organizationStructuredData = generateStructuredData("organization");
  const webappStructuredData = generateStructuredData("webapp");

  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webappStructuredData),
          }}
        />
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 lg:ml-64" role="main">
                <div className="p-4 lg:p-8">{children}</div>
              </main>
            </div>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  );
}
