"use client";

import Head from "next/head";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  ogImage?: string;
  ogImageAlt?: string;
  structuredData?: any[];
  type?: "website" | "article";
}

export default function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogImage = "https://lexustracker.nl/og-image.jpg",
  ogImageAlt = "LexusTracker - Professional Vehicle Tracking Platform",
  structuredData = [],
  type = "website",
}: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="nl_NL" />
      <meta property="og:site_name" content="LexusTracker" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@lexustracker" />
      <meta name="twitter:creator" content="@lexustracker" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index,follow" />
      <meta
        name="googlebot"
        content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      />

      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data),
          }}
        />
      ))}
    </Head>
  );
}
