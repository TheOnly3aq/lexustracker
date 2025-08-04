import DashboardChart from "@/components/dashboard-chart"
import StatsCards from "@/components/stats-cards"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="ml-12 lg:ml-0">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400 text-lg">Overview of Lexus car statistics and analytics</p>
      </div>

      <div className="space-y-8">
        <DashboardChart />
        <StatsCards />
      </div>
    </div>
  )
}
