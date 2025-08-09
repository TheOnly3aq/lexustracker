"use client";

import DashboardChart from "@/components/dashboard-chart";
import StatsCards from "@/components/stats-cards";
import { useLanguage } from "@/lib/i18n";
import { generateStructuredData, generateBreadcrumbData } from "@/lib/seo";
import Head from "next/head";

export default function Dashboard() {
  const { t } = useLanguage();

  const breadcrumbData = generateBreadcrumbData([
    { name: "Home", url: "https://lexustracker.nl" },
    { name: "Dashboard", url: "https://lexustracker.nl" },
  ]);

  const structuredData = generateStructuredData("breadcrumb", {
    items: breadcrumbData,
  });
  const serviceStructuredData = generateStructuredData("service", {
    serviceName: "Lexus IS250C Tracking & Analytics",
    description:
      "Professional Lexus IS250C tracking and analytics platform with real-time RDW data for the Netherlands. Track vehicle registrations, statistics, and trends.",
    serviceType: "Vehicle Analytics and Data Services",
    priceRange: "Free",
  });

  return (
    <>
      <Head>
        <title>
          Dashboard - Lexus Statistics & Analytics | LexusTracker Nederland
        </title>
        <meta
          name="description"
          content="Real-time Lexus IS250C dashboard with comprehensive statistics, charts, and analytics. Monitor vehicle registrations, insurance status, and trends in the Netherlands. Dashboard met real-time Lexus statistieken."
        />
        <meta
          name="keywords"
          content="Lexus IS250C, dashboard, statistics, analytics, Lexus dashboard, car statistics, vehicle analytics, RDW data, Netherlands car data, auto statistieken, voertuig analytics, Lexus cabrio, convertible"
        />
        <link rel="canonical" href="https://lexustracker.nl" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Dashboard - Lexus Statistics & Analytics | LexusTracker Nederland"
        />
        <meta
          property="og:description"
          content="Real-time Lexus IS250C dashboard with comprehensive statistics, charts, and analytics."
        />
        <meta property="og:url" content="https://lexustracker.nl" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="nl_NL" />
        <meta property="og:site_name" content="LexusTracker" />
        <meta
          property="og:image"
          content="https://lexustracker.nl/og-dashboard.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="LexusTracker Dashboard - Real-time Lexus Statistics & Analytics"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lexustracker" />
        <meta name="twitter:creator" content="@lexustracker" />
        <meta
          name="twitter:title"
          content="Dashboard - Lexus Statistics & Analytics | LexusTracker Nederland"
        />
        <meta
          name="twitter:description"
          content="Real-time Lexus IS250C dashboard with comprehensive statistics, charts, and analytics."
        />
        <meta
          name="twitter:image"
          content="https://lexustracker.nl/og-dashboard.jpg"
        />

        {/* Additional SEO meta tags */}
        <meta name="robots" content="index,follow" />
        <meta
          name="googlebot"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceStructuredData),
          }}
        />
      </Head>

      <div className="space-y-8">
        <div className="ml-12 lg:ml-0">
          <header>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
              {t("navigation.dashboard")}
            </h1>
            <p className="text-gray-400 text-lg">{t("dashboard.subtitle")}</p>
          </header>
        </div>

        <main className="space-y-8" aria-label="Dashboard Content">
          <section aria-labelledby="dashboard-charts" className="space-y-6">
            <h2 id="dashboard-charts" className="sr-only">
              Dashboard Charts and Analytics
            </h2>
            <DashboardChart />
          </section>

          <section aria-labelledby="stats-cards" className="space-y-6">
            <h2 id="stats-cards" className="sr-only">
              Vehicle Statistics Cards
            </h2>
            <StatsCards />
          </section>
        </main>
      </div>
    </>
  );
}
