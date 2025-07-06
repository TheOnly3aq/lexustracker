import "@fontsource/montserrat/600.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { Stack, Typography } from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";
import axios from "axios";
import { useEffect, useState } from "react";
import DashboardContent from "./__internal/dashboardContent";
import useDashboardStyles from "./__internal/dashboardStyles";

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
  const styles = useDashboardStyles();
  const nodejsUrl = process.env.REACT_APP_NODEJS_API_URL;
  const car = "Lexus IS250C";

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
    <DashboardContent
      interval={interval}
      setInterval={setInterval}
      loading={loading}
      dailyCount={dailyCount}
      monthlyCount={monthlyCount}
      cards={cards}
      styles={styles}
      CustomTooltip={CustomTooltip}
      PageContainer={PageContainer}
    />
  );
}
