"use client";

import DashboardChart from "@/components/dashboard-chart";
import StatsCards from "@/components/stats-cards";
import { useLanguage } from "@/lib/i18n";

export default function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
          {t("navigation.dashboard")}
        </h1>
        <p className="text-gray-400 text-lg">{t("dashboard.subtitle")}</p>
      </div>

      <div className="space-y-8">
        <DashboardChart />
        <StatsCards />
      </div>
    </div>
  );
}
