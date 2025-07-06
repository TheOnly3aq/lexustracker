import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  Card,
  CircularProgress,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import MUIToolTip from "@mui/material/Tooltip";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardPagination from "./dashboardPagination";

type Interval = "daily" | "monthly";

interface CardData {
  title: string;
  icon: React.ReactNode;
  data: string | number;
  subText: string;
}

interface DashboardContentProps {
  interval: Interval;
  setInterval: (interval: Interval) => void;
  loading: boolean;
  dailyCount: Array<{ date: string; count: number }>;
  monthlyCount: Array<{ date: string; count: number }>;
  cards: CardData[];
  styles: any;
  CustomTooltip: React.ComponentType<any>;
  PageContainer: React.ComponentType<{ children: React.ReactNode }>;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  interval,
  setInterval,
  loading,
  dailyCount,
  monthlyCount,
  cards,
  styles,
  CustomTooltip,
  PageContainer,
}) => {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(0);

  const currentData = interval === "daily" ? dailyCount : monthlyCount;
  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const lastPage = Math.max(
      0,
      Math.ceil(currentData.length / ITEMS_PER_PAGE) - 1,
    );
    setCurrentPage(lastPage);
  }, [interval, currentData.length]);

  const visibleData = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return currentData.slice(startIndex, endIndex);
  }, [currentData, currentPage, ITEMS_PER_PAGE]);
  const canGoBack = currentPage > 0;
  const canGoForward = currentPage < totalPages - 1;

  const handlePrevious = () => {
    if (canGoBack) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <PageContainer>
      <Box sx={{ width: "100%" }}>
        <title>Dashboard | LexusTracker</title>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ToggleButtonGroup
              color="primary"
              sx={styles.intervalSelector}
              value={interval}
              exclusive
              className="!rounded-xl !border-none !gap-0.5"
              onChange={(_, newInterval) => {
                if (newInterval !== null) {
                  setInterval(newInterval as Interval);
                }
              }}
            >
              <ToggleButton className="!rounded-xl !border-none" value="daily">
                Dagelijks
              </ToggleButton>
              <ToggleButton
                className="!rounded-xl !border-none"
                value="monthly"
              >
                Maandelijks
              </ToggleButton>
            </ToggleButtonGroup>

            <Box className="hidden sm:flex items-center justify-end w-100 gap-1">
              <DashboardPagination
                currentPage={currentPage}
                totalPages={totalPages}
                canGoBack={canGoBack}
                canGoForward={canGoForward}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
              />
            </Box>
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 3, sm: 4, md: 5 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid sx={styles.graphStyle}>
              <Card elevation={0} sx={styles.graphStyle}>
                {loading ? (
                  <Box sx={styles.progress}>
                    <CircularProgress />
                    <Typography
                      sx={{ marginTop: "10px" }}
                      variant="body1"
                      color="text"
                    >
                      Fetching data...
                    </Typography>
                  </Box>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      width={500}
                      height={200}
                      data={visibleData}
                      syncId="anyId"
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="20%"
                            stopColor="#9d0100"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#FFFFFF"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} stroke="#DDD" />
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
              </Card>
            </Grid>
          </Grid>
          <Box className="sm:hidden flex items-center justify-center mb-4 w-100 gap-1">
            <DashboardPagination
              currentPage={currentPage}
              totalPages={totalPages}
              canGoBack={canGoBack}
              canGoForward={canGoForward}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          </Box>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Grid
            container
            rowSpacing={3}
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 6, sm: 6, md: 12 }}
          >
            {cards.map((card, idx) => (
              <Grid size={{ xs: 12, md: 3 }} key={idx}>
                <Card elevation={0} sx={styles.cardStyle}>
                  <MUIToolTip sx={styles.helpIconWrapper} title={card.title}>
                    <HelpOutlineIcon />
                  </MUIToolTip>
                  <Stack sx={styles.cardStyleWrapper}>
                    <Stack sx={styles.iconWrapper}>{card.icon}</Stack>
                    <Typography sx={styles.headerText}>{card.data}</Typography>
                    <Typography sx={styles.subText}>{card.subText}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </PageContainer>
  );
};

export default DashboardContent;
