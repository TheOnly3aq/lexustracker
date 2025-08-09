"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Code, Database, Smartphone, Zap, Shield } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <Info className="w-8 h-8 text-red-500" />
          {t("about.title")}
        </h1>
        <p className="text-gray-400 text-lg">{t("about.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-gradient hover-lift ">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-500/30">
                <Code className="w-5 h-5 text-blue-400" />
              </div>
              <CardTitle className="text-white text-xl">
                {t("about.technologyStack")}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                {t("about.frontend")}
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {t("about.technologies.nextjs")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {t("about.technologies.react")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {t("about.technologies.typescript")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {t("about.technologies.tailwind")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {t("about.technologies.recharts")}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                {t("about.features")}
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {t("about.featuresList.ssr")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {t("about.featuresList.responsive")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {t("about.featuresList.darkMode")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {t("about.featuresList.interactive")}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card
          className="card-gradient hover-lift"
          style={{ animationDelay: "100ms" }}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30">
                <Database className="w-5 h-5 text-red-400" />
              </div>
              <CardTitle className="text-white text-xl">
                {t("about.dataSource")}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-white font-semibold mb-3">
                {t("about.apiEndpoints")}
              </h4>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {t("about.apiList.dailyMonthly")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {t("about.apiList.rdwData")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {t("about.apiList.differences")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  {t("about.apiList.realTime")}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">
                {t("about.dataProcessing")}
              </h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  {t("about.processingList.colorFilter")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  {t("about.processingList.insurance")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  {t("about.processingList.importExport")}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  {t("about.processingList.search")}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card
          className="card-gradient hover-lift lg:col-span-2"
          style={{ animationDelay: "200ms" }}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              <CardTitle className="text-white text-xl">
                {t("about.purposeAndDesign")}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-3">
                  {t("about.whyThisDashboard")}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t("about.dashboardDescription")}
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3">
                  {t("about.designPhilosophy")}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t("about.designPhilosophyDescription")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
