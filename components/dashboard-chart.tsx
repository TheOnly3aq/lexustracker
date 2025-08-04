"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Activity,
  AlertCircle,
  RefreshCw,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ChartData {
  date: string;
  count: number;
  originalDate?: string;
}

interface DailyDifference {
  date: string;
  difference: number;
}

type DataSource = "monthly" | "daily";

export default function DashboardChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [dataSource, setDataSource] = useState<DataSource>("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dailyDifferences, setDailyDifferences] = useState<DailyDifference[]>(
    []
  );
  const [allData, setAllData] = useState<ChartData[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15; // Show 15 items at a time

  const fetchChartData = async (source: DataSource) => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = source === "daily" ? "daily-count" : "monthly-count";
      const url = `${process.env.NEXT_PUBLIC_API_URL}stats/${endpoint}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const rawData = await response.json();

      let dataArray: any[] = [];

      if (Array.isArray(rawData)) {
        dataArray = rawData;
      } else if (rawData && typeof rawData === "object") {
        const possibleKeys = [
          "data",
          "result",
          "results",
          "items",
          "records",
          "response",
        ];
        for (const key of possibleKeys) {
          if (rawData[key] && Array.isArray(rawData[key])) {
            dataArray = rawData[key];
            break;
          }
        }
      }

      if (dataArray.length === 0) {
        setChartData([]);
        setError(`No data available from API`);
        return;
      }

      const formattedData: ChartData[] = dataArray.map(
        (item: any, index: number) => {
          const dateFields = [
            "date",
            "month",
            "day",
            "period",
            "time",
            "timestamp",
            "_id",
            "id",
          ];
          let date = `Entry ${index + 1}`;

          for (const field of dateFields) {
            if (item[field] !== undefined && item[field] !== null) {
              date = String(item[field]);
              break;
            }
          }

          const countFields = [
            "count",
            "total",
            "value",
            "amount",
            "quantity",
            "number",
          ];
          let count = 0;

          for (const field of countFields) {
            if (item[field] !== undefined && item[field] !== null) {
              count = Number(item[field]) || 0;
              break;
            }
          }

          return { date, count };
        }
      );

      // Format data for display with proper date formatting
      let filteredData = formattedData.map((item) => ({
        ...item,
        displayDate: formatDateForDisplay(item.date, source),
        originalDate: item.date,
      }));

      if (source === "daily") {
        // Sort by date (oldest to newest)
        filteredData = filteredData
          .filter((item) => {
            const itemDate = new Date(item.originalDate);
            return !isNaN(itemDate.getTime());
          })
          .sort(
            (a, b) =>
              new Date(a.originalDate).getTime() -
              new Date(b.originalDate).getTime()
          );
      } else {
        // For monthly data, show last 12 months
        filteredData = filteredData
          .sort(
            (a, b) =>
              new Date(a.originalDate).getTime() -
              new Date(b.originalDate).getTime()
          )
          .slice(-12);
      }

      // Store all data for pagination
      setAllData(filteredData);

      // Set current page to show the latest data (last page)
      if (source === "daily") {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        setCurrentPage(Math.max(0, totalPages - 1));
      } else {
        setCurrentPage(0);
      }

      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch data";
      setError(errorMessage);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyDifferences = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}stats/daily-differences`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setDailyDifferences(
        Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []
      );
    } catch (error) {
      setDailyDifferences([]);
    }
  };
  useEffect(() => {
    fetchChartData(dataSource);
  }, [dataSource]);

  useEffect(() => {
    // Update chart data when pagination changes
    if (allData.length > 0) {
      const startIndex = currentPage * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = allData.slice(startIndex, endIndex);

      // Convert to chart format
      const chartFormattedData = paginatedData.map((item: any) => ({
        date: item.displayDate,
        count: item.count,
        originalDate: item.originalDate,
      }));

      setChartData(chartFormattedData);
    }
  }, [allData, currentPage, itemsPerPage]);

  useEffect(() => {
    if (chartData.length > 0) {
      fetchDailyDifferences();
    }
  }, [chartData]);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(allData.length / itemsPerPage);
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const getTotalPages = () => {
    return Math.ceil(allData.length / itemsPerPage);
  };

  const formatDateForDisplay = (
    dateStr: string,
    source: DataSource
  ): string => {
    try {
      const date = new Date(dateStr);

      if (source === "daily") {
        const day = date.getDate();
        const month = date
          .toLocaleString("en", { month: "short" })
          .toLowerCase();
        return `${day} ${month}`;
      } else {
        return date.toLocaleString("en", { month: "short" }).toLowerCase();
      }
    } catch (error) {
      return dateStr;
    }
  };

  const getDifferencesByDate = (
    dailyDifferences: any[],
    formattedDate: string
  ) => {
    if (!dailyDifferences || dailyDifferences.length === 0) {
      return null;
    }

    const matchingEntry = dailyDifferences.find((item) => {
      const itemDateStr = new Date(item.date).toISOString().split("T")[0];
      return itemDateStr === formattedDate;
    });

    if (!matchingEntry) {
      return null;
    }

    const changes = matchingEntry.changes || {};
    const added = Array.isArray(changes.added)
      ? changes.added
      : changes.added
      ? [changes.added]
      : [];
    const removed = Array.isArray(changes.removed)
      ? changes.removed
      : changes.removed
      ? [changes.removed]
      : [];

    return {
      added: added,
      removed: removed,
      totalChanges: matchingEntry.totalChanges || 0,
      fullDate: matchingEntry.date,
    };
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      dataKey: string;
      color: string;
      payload?: ChartData;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length && typeof label === "string") {
      const dateForLookup = payload[0]?.payload?.originalDate || label;
      const differences = getDifferencesByDate(dailyDifferences, dateForLookup);
      return (
        <div className="rounded-xl p-3 !z-50 shadow-2xl border border-white/10 bg-white/30 max-w-xs backdrop-blur-md backdrop-saturate-150">
          <h1 className="text-white font-medium text-sm mb-1">
            {dataSource === "daily" ? "Day" : "Month"}: {label}
          </h1>
          <p className="text-red-400 font-semibold text-sm mb-1">
            Count: {payload[0].value}
          </p>
          {differences && differences.totalChanges > 0 && (
            <div className="text-xs text-gray-400 mt-1">
              <span className="block">Differences:</span>
              <span className="block">Added: {differences.added.length}</span>
              <span className="block">
                Removed: {differences.removed.length}
              </span>
              <span className="block">
                Total changes: {differences.totalChanges}
              </span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };
  const handleRetry = () => {
    fetchChartData(dataSource);
  };

  return (
    <Card className="card-gradient hover-lift prevent-shift">
      <CardHeader className="pb-4">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg border border-red-500/30 flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-white text-lg sm:text-xl">
                Car Statistics
              </CardTitle>
              <p className="text-gray-400 text-xs sm:text-sm flex items-center gap-2 mt-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">
                  {dataSource === "daily"
                    ? `${chartData.length} entries (Page ${
                        currentPage + 1
                      } of ${getTotalPages()})`
                    : "Last 12 months"}{" "}
                  of registration data
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-row sm:items-center sm:justify-between space-x-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-1 sm:order-1 order-1">
                <button
                  onClick={() => setDataSource("monthly")}
                  className={`flex items-center justify-center p-2 glass-effect rounded-lg transition-colors ${
                    dataSource === "monthly"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "hover:bg-white/5 text-gray-400 border border-white/10"
                  }`}
                  aria-pressed={dataSource === "monthly"}
                  title="Show monthly data"
                >
                  Monthly
                </button>
                <button
                  onClick={() => setDataSource("daily")}
                  className={`flex items-center justify-center p-2 glass-effect rounded-lg transition-colors ${
                    dataSource === "daily"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "hover:bg-white/5 text-gray-400 border border-white/10"
                  }`}
                  aria-pressed={dataSource === "daily"}
                  title="Show daily data"
                >
                  Daily
                </button>
              </div>

              <div className="flex items-center justify-between sm:justify-end space-x-3 sm:order-2 order-2">
                <div className="flex items-center space-x-2 hidden sm:flex">
                  <button
                    onClick={handleRetry}
                    className="flex items-center justify-center p-2 glass-effect rounded-lg hover:bg-white/5 transition-colors"
                    title="Refresh data"
                  >
                    <RefreshCw className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                {dataSource === "daily" && allData.length > itemsPerPage && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 0}
                      className="flex items-center justify-center p-2 glass-effect rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-400" />
                    </button>
                    <span className="text-xs text-gray-400">
                      {currentPage + 1} / {getTotalPages()}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage >= getTotalPages() - 1}
                      className="flex items-center justify-center p-2 glass-effect rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Next page"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 !px-0">
        <div className="h-64 sm:h-80 w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="relative">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-2 border-red-500/30"></div>
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-2 border-red-500 border-t-transparent absolute top-0"></div>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 p-4">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-white font-medium mb-2 text-sm sm:text-base">
                  API Connection Issue
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 max-w-xs">
                  {error}
                </p>
                <button
                  onClick={handleRetry}
                  className="px-3 py-2 sm:px-4 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors text-xs sm:text-sm"
                >
                  Retry Connection
                </button>
              </div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Activity className="w-8 h-8 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm sm:text-base">
                  No data available
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Check API connection
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={200}
                data={chartData}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="20%"
                      stopColor="#5f1b1bff"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="#757171ff"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#2a2a2aff" />
                <XAxis dataKey="date" />
                <YAxis domain={["dataMin - 10", "dataMax + 1"]} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#9d0100"
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
