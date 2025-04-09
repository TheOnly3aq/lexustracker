import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Box, Card, Grid, Stack, Typography, useTheme } from "@mui/material";
import { Tooltip as MUIToolTip } from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import "@fontsource/montserrat/600.css";
import { PageContainer } from "@toolpad/core/PageContainer";

export default function Dashboard() {
  const [results, setResults] = useState<any[]>([]);
  const [sameColorResults, setSameColorResults] = useState<any[]>([]);
  const [insured, setInsured] = useState<any[]>([]);
  const [imported, setImported] = useState<any[]>([]);
  const theme = useTheme();

  const baseUrl = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";
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
      backgroundColor: "#ffff",
      padding: 2,
      borderRadius: 5,
    },
    tooltipLabelTop: {
      color: "black",
      fontSize: "1rem",
    },
    tooltipLabelBottom: {
      color: "black",
      fontSize: "1rem",
    },
  };

  const data = [
    {
      month: "Jan",
      amount: 130,
    },
    {
      month: "Feb",
      amount: 126,
    },
    {
      month: "Mar",
      amount: 128,
    },
    {
      month: "Apr",
      amount: 129,
    },
    {
      month: "Mei",
      amount: 125,
    },
    {
      month: "Jun",
      amount: 123,
    },
    {
      month: "Jul",
      amount: 127,
    },
    {
      month: "Aug",
      amount: 129,
    },
    {
      month: "Sep",
      amount: 130,
    },
    {
      month: "Okt",
      amount: 131,
    },
    {
      month: "Nov",
      amount: 127,
    },
    {
      month: "Dec",
      amount: 120,
    },
  ];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}?$where=contains(handelsbenaming, 'IS250C')`
        );
        const allCars = response.data;
        setResults(allCars);
        const sameColorCars = allCars.filter(
          (car) => car.eerste_kleur === "ROOD"
        );
        const insured = allCars.filter((car) => car.wam_verzekerd === "Ja");
        const imported = allCars.filter(
          (car) =>
            car.datum_eerste_tenaamstelling_in_nederland !==
            car.datum_eerste_toelating
        );

        setSameColorResults(sameColorCars);
        setInsured(insured);
        setImported(imported);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

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
      return (
        <Stack sx={styles.customTooltip}>
          <Typography sx={styles.tooltipLabelTop}>
            Maand: {`${label}`}
          </Typography>
          <Typography sx={styles.tooltipLabelBottom}>
            Aantal: {`${payload[0].value}`}
          </Typography>
        </Stack>
      );
    }
    return null;
  };
  return (
    <PageContainer>
      <Box sx={{ width: "100%" }}>
        <title>Dashboard | LexusTracker</title>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 5 }}>
          <Grid sx={styles.graphStyle} size={3}>
            <Card elevation={0} sx={styles.graphStyle}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={200}
                  data={data}
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
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={CustomTooltip} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#9d0100"
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          rowSpacing={3}
          sx={{ width: "100%", justifyContent: "center", alignItems: "center" }}
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
      </Box>
    </PageContainer>
  );
}
