import {
  Box,
  Card,
  CircularProgress,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import "@fontsource/montserrat/600.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Tooltip as MUIToolTip } from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [results, setResults] = useState<any[]>([]);
  const [sameColorResults, setSameColorResults] = useState<any[]>([]);
  const [insured, setInsured] = useState<any[]>([]);
  const [imported, setImported] = useState<any[]>([]);
  const [dailyCounts, setDailyCounts] = useState<any[]>([]);
  const [monthlyCounts, setMonthlyCounts] = useState<any[]>([]);
  const [dailyDifferences, setDailyDifferences] = useState<any[]>([]);
  const [interval, setInterval] = useState<"daily" | "monthly">("monthly");
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const nodejsUrl = process.env.REACT_APP_NODEJS_API_URL;
  const car = "Lexus IS250C";

  const styles = {
    cardStyle: {
      flex: 1,
      display: "flex",
      color: "primary",
      borderRadius: "12px",
      paddingBottom: "2rem",
      flexDirection: "column",
    },
    cardStyleWrapper: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "primary",
      borderRadius: "12px",
      flexDirection: "column",
    },
    graphStyle: {
      width: "100%",
      marginBottom: "2rem",
      paddingTop: 2,
      height: "20rem",
      display: "flex",
      color: "primary",
      flex: 1,
      borderRadius: "12px",
    },
    headerText: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    subText: {
      color: "grey",
      fontSize: "1rem",
    },
    iconWrapper: {
      borderRadius: "100px",
      padding: "10px",
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.secondary.light,
    },
    helpIconWrapper: {
      color: "grey",
      marginLeft: "5px",
      marginTop: "5px",
    },
    customTooltip: {
      backgroundColor: theme.palette.background.paper,
      padding: 2,
      borderRadius: 5,
    },
    tooltipLabelTop: {
      color: theme.palette.text.primary,
      fontSize: "1rem",
    },
    tooltipLabelBottom: {
      color: theme.palette.text.primary,
      fontSize: "1rem",
    },
    intervalSelector: {
      backgroundColor: theme.palette.background.paper,
    },
    progress: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "center",
      flexDirection: "column",
    },
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${nodejsUrl}/api/stats/rdw-data`);
        const allCars = response.data.data;
        setResults(allCars);
        const sameColorCars = allCars.filter(
          (car) => car.eerste_kleur === "ROOD",
        );
        const insured = allCars.filter((car) => car.wam_verzekerd === "Ja");
        const imported = allCars.filter(
          (car) =>
            car.datum_eerste_tenaamstelling_in_nederland !==
            car.datum_eerste_toelating,
        );
        setSameColorResults(sameColorCars);
        setInsured(insured);
        setImported(imported);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    const fetchDailyCounts = async () => {
      try {
        const response = await axios.get(`${nodejsUrl}/api/stats/daily-count`);
        setLoading(false);
        setDailyCounts(response.data);
      } catch (error) {
        console.error("Error fetching daily count data:", error);
      }
    };

    const fetchMonthlyCounts = async () => {
      try {
        const response = await axios.get(
          `${nodejsUrl}/api/stats/monthly-count`,
        );
        setLoading(false);
        setMonthlyCounts(response.data);
      } catch (error) {
        console.error("Error fetching monthly count data:", error);
      }
    };
    const fetchDailyDifferences = async () => {
      try {
        const response = await axios.get(
          `${nodejsUrl}/api/stats/daily-differences`,
        );
        setLoading(false);
        const data = response.data.data || response.data;
        setDailyDifferences(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching daily differences data:", error);
        setDailyDifferences([]);
      }
    };

    fetchCars();
    fetchDailyCounts();
    fetchMonthlyCounts();
    fetchDailyDifferences();
  }, [nodejsUrl]);

  const getDifferencesByDate = (
    dailyDifferences: any[],
    formattedDate: string,
  ) => {
    if (!dailyDifferences || dailyDifferences.length === 0) {
      return null;
    }

    const matchingEntry = dailyDifferences.find((item) => {
      const dateObj = new Date(item.date);
      const formatted = dateObj
        .toLocaleDateString("nl-NL", {
          day: "2-digit",
          month: "short",
        })
        .replace(".", "")
        .toLowerCase();

      return formatted === formattedDate.toLowerCase();
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

  const cards = [
    {
      title: "Alle " + car + "'s in Nederland",
      icon: <DirectionsCarFilledIcon />,
      data: results.length,
      subText: "in totaal",
    },
    {
      title: "Alle " + car + "'s in het rood.",
      icon: <ColorLensIcon />,
      data: sameColorResults.length,
      subText: "in dezelfde kleur",
    },
    {
      title: "Alle " + car + "'s die verzekerd zijn.",
      icon: <AssignmentIcon />,
      data: insured.length,
      subText: "verzekerd",
    },
    {
      title: "Alle " + car + "'s die geimporteerd zijn.",
      icon: <ImportExportIcon />,
      data: imported.length,
      subText: "geimporteerd",
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const formattedDate = label;
      const differences = getDifferencesByDate(dailyDifferences, formattedDate);

      return (
        <Stack sx={styles.customTooltip}>
          <Typography sx={styles.tooltipLabelTop}>
            {interval === "daily" ? "Dag" : "Maand"}: {`${label}`}
          </Typography>
          <Typography sx={styles.tooltipLabelBottom}>
            Aantal: {`${payload[0].value}`}
          </Typography>
          <Typography>
            {differences && differences.totalChanges > 0 && (
              <span style={{ fontSize: "0.85em", color: "#888" }}>
                Verschillen:
                <br />
                Toegevoegd: {differences.added.length}
                <br />
                Verwijderd: {differences.removed.length}
                <br />
                Totaal wijzigingen: {differences.totalChanges}
              </span>
            )}
          </Typography>
        </Stack>
      );
    }
    return null;
  };

  const dailyCount = dailyCounts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30)
    .map((d) => ({
      date: new Date(d.date).toLocaleDateString("nl-NL", {
        day: "2-digit",
        month: "short",
      }),
      count: d.count,
    }));

  const monthlyCount = monthlyCounts
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
    .slice(-12)
    .map((d) => ({
      date: new Date(d.month).toLocaleDateString("nl-NL", {
        month: "short",
      }),
      count: d.count,
    }));

  return (
    <PageContainer>
      <Box sx={{ width: "100%" }}>
        <title>Dashboard | LexusTracker</title>
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Box sx={{ display: "flex" }}>
            <ToggleButtonGroup
              color="primary"
              sx={styles.intervalSelector}
              value={interval}
              exclusive
              className="!rounded-xl !border-none !gap-0.5"
              onChange={(e, newInterval) => {
                if (newInterval !== null) {
                  setInterval(newInterval as "daily" | "monthly");
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
          >
            <Grid sx={styles.graphStyle} size={3}>
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
                      data={interval === "daily" ? dailyCount : monthlyCount}
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
                      <CartesianGrid vertical={false} stroke="#DDD" />{" "}
                      <XAxis dataKey="date" />
                      <YAxis domain={["dataMin - 10", "dataMax + 1"]} />
                      <Tooltip content={CustomTooltip} />
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
            {cards.map((cards) => (
              <Grid size={3}>
                <Card elevation={0} sx={styles.cardStyle}>
                  <MUIToolTip sx={styles.helpIconWrapper} title={cards.title}>
                    <HelpOutlineIcon />
                  </MUIToolTip>
                  <Stack sx={styles.cardStyleWrapper}>
                    <Stack sx={styles.iconWrapper}>{cards.icon}</Stack>
                    <Typography sx={styles.headerText}>{cards.data}</Typography>
                    <Typography sx={styles.subText}>{cards.subText}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </PageContainer>
  );
}
