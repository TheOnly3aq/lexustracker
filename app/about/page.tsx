"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Code,
  Database,
  Zap,
  Shield,
  Info,
  Server,
  BarChart3,
  Palette,
  Smartphone,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { motion } from "framer-motion";
import { generateStructuredData, generateBreadcrumbData } from "@/lib/seo";
import Head from "next/head";

export default function About() {
  const { t } = useLanguage();

  // SEO data
  const breadcrumbData = generateBreadcrumbData([
    { name: "Home", url: "https://lexustracker.nl" },
    { name: "About", url: "https://lexustracker.nl/about" },
  ]);

  const structuredData = generateStructuredData("breadcrumb", {
    items: breadcrumbData,
  });
  const articleStructuredData = generateStructuredData("article", {
    title: "About LexusTracker - Technology & Mission | LexusTracker Nederland",
    description:
      "Learn about LexusTracker platform, our technology stack, data sources, and mission to provide comprehensive Lexus vehicle insights for Netherlands.",
    url: "https://lexustracker.nl/about",
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString(),
  });

  const cardData = [
    {
      id: 1,
      icon: Code,
      iconColor: "blue",
      title: t("about.technologyStack"),
      colSpan: "lg:col-span-1",
      sections: [
        {
          title: t("about.frontend"),
          icon: Zap,
          iconColor: "yellow",
          items: [
            t("about.technologies.nextjs"),
            t("about.technologies.react"),
            t("about.technologies.typescript"),
            t("about.technologies.tailwind"),
            t("about.technologies.recharts"),
          ],
          bulletColor: "red",
        },
        {
          title: t("about.features"),
          icon: Shield,
          iconColor: "green",
          items: [
            t("about.featuresList.ssr"),
            t("about.featuresList.responsive"),
            t("about.featuresList.darkMode"),
            t("about.featuresList.interactive"),
          ],
          bulletColor: "green",
        },
      ],
    },
    {
      id: 2,
      icon: Database,
      iconColor: "red",
      title: t("about.dataSource"),
      colSpan: "lg:col-span-1",
      sections: [
        {
          title: t("about.apiEndpoints"),
          items: [
            t("about.apiList.dailyMonthly"),
            t("about.apiList.rdwData"),
            t("about.apiList.differences"),
            t("about.apiList.realTime"),
          ],
          bulletColor: "red",
        },
        {
          title: t("about.dataProcessing"),
          items: [
            t("about.processingList.colorFilter"),
            t("about.processingList.insurance"),
            t("about.processingList.importExport"),
            t("about.processingList.search"),
          ],
          bulletColor: "yellow",
        },
      ],
    },
    {
      id: 3,
      icon: Smartphone,
      iconColor: "purple",
      title: t("about.purposeAndDesign"),
      colSpan: "lg:col-span-2",
      isSpecialCard: true,
      content: [
        {
          title: t("about.whyThisDashboard"),
          description: t("about.dashboardDescription"),
        },
        {
          title: t("about.designPhilosophy"),
          description: t("about.designPhilosophyDescription"),
        },
      ],
    },
  ];

  const getIconColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
      red: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-400",
      purple:
        "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
      yellow: "text-yellow-400",
      green: "text-green-400",
    };
    return colorMap[color as keyof typeof colorMap] || "";
  };

  const getBulletColor = (color: string) => {
    const colorMap = {
      red: "bg-red-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
    };
    return colorMap[color as keyof typeof colorMap] || "bg-red-500";
  };

  return (
    <>
      <Head>
        <title>
          About LexusTracker - Technology & Mission | LexusTracker Nederland
        </title>
        <meta
          name="description"
          content="Learn about LexusTracker platform, our technology stack, data sources, and mission to provide comprehensive Lexus IS250C insights for Netherlands. Over LexusTracker platform."
        />
        <meta
          name="keywords"
          content="Lexus IS250C, about us, technology stack, Next.js, React, RDW API, vehicle data, automotive technology, platform information, over ons, technologie, Lexus cabrio, convertible"
        />
        <link rel="canonical" href="https://lexustracker.nl/about" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About LexusTracker - Technology & Mission | LexusTracker Nederland"
        />
        <meta
          property="og:description"
          content="Learn about LexusTracker platform, our technology stack, data sources, and mission to provide comprehensive Lexus vehicle insights for Netherlands."
        />
        <meta property="og:url" content="https://lexustracker.nl/about" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="nl_NL" />
        <meta property="og:site_name" content="LexusTracker" />
        <meta
          property="og:image"
          content="https://lexustracker.nl/og-about.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="About LexusTracker - Technology Stack and Platform Information"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lexustracker" />
        <meta name="twitter:creator" content="@lexustracker" />
        <meta
          name="twitter:title"
          content="About LexusTracker - Technology & Mission | LexusTracker Nederland"
        />
        <meta
          name="twitter:description"
          content="Learn about LexusTracker platform, our technology stack, and Lexus IS250C insights."
        />
        <meta
          name="twitter:image"
          content="https://lexustracker.nl/og-about.jpg"
        />

        {/* Additional SEO meta tags */}
        <meta name="robots" content="index,follow" />
        <meta
          name="googlebot"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
        <meta name="article:author" content="LexusTracker Team" />
        <meta name="article:published_time" content="2024-01-01T00:00:00Z" />
        <meta name="article:modified_time" content={new Date().toISOString()} />
        <meta name="article:section" content="Technology" />

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
            __html: JSON.stringify(articleStructuredData),
          }}
        />
      </Head>

      <div className="space-y-8">
        <div className="ml-12 lg:ml-0">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Info className="w-8 h-8 text-red-500" />
            {t("about.title")}
          </h1>
          <p className="text-gray-400 text-lg">{t("about.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cardData.map((card, index) => (
            <motion.div
              key={card.id}
              className={card.colSpan}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <Card className="card-gradient h-full border-0 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 + 0.2, duration: 0.4 }}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`p-2 bg-gradient-to-br rounded-lg border ${getIconColorClasses(
                          card.iconColor
                        )}`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <card.icon className="w-5 h-5" />
                      </motion.div>
                      <CardTitle className="text-white text-xl">
                        {card.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                </motion.div>

                <CardContent className="space-y-6">
                  {card.isSpecialCard ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {card.content?.map((item, contentIndex) => (
                        <motion.div
                          key={contentIndex}
                          initial={{
                            opacity: 0,
                            x: contentIndex % 2 === 0 ? -20 : 20,
                          }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.15 + 0.4 + contentIndex * 0.1,
                            duration: 0.4,
                          }}
                        >
                          <h4 className="text-white font-semibold mb-3">
                            {item.title}
                          </h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    card.sections?.map((section, sectionIndex) => (
                      <motion.div
                        key={sectionIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: index * 0.15 + 0.4 + sectionIndex * 0.1,
                          duration: 0.4,
                        }}
                      >
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          {"icon" in section && section.icon && (
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <section.icon
                                className={`w-4 h-4 ${
                                  "iconColor" in section
                                    ? getIconColorClasses(section.iconColor)
                                    : ""
                                }`}
                              />
                            </motion.div>
                          )}
                          {section.title}
                        </h4>
                        <ul className="text-gray-300 space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <motion.li
                              key={itemIndex}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay:
                                  index * 0.15 +
                                  0.6 +
                                  sectionIndex * 0.1 +
                                  itemIndex * 0.05,
                                duration: 0.3,
                              }}
                              whileHover={{ x: 4 }}
                            >
                              <motion.div
                                className={`w-1.5 h-1.5 rounded-full ${getBulletColor(
                                  section.bulletColor || "red"
                                )}`}
                                whileHover={{ scale: 1.5 }}
                                transition={{ duration: 0.2 }}
                              />
                              <span
                                className={
                                  section.title === t("about.apiEndpoints")
                                    ? "text-sm"
                                    : ""
                                }
                              >
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
