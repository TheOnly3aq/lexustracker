import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  colors,
  Grid,
  List,
  Stack,
  Typography,
} from "@mui/material";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import "@fontsource/montserrat/600.css";
export default function Dashboard() {
  const [results, setResults] = useState<any[]>([]);
  const baseUrl = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";

  const styles = {
    cardStyle: {
      width: "15vw",
      height: "15vw",
      display: "flex",
      color: "primary",
      flex: 1,
      borderRadius: "12px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    graphStyle: {
      width: "100%",
      marginBottom: "3vw",
      height: "24vw",
      display: "flex",
      color: "primary",
      flex: 1,
      borderRadius: "12px",
    },
    headerText: {
      fontSize: "3vw",
      fontWeight: 600,
    },
    subText: {
      color: "grey",
      fontSize: "1vw",
    },
    iconWrapper: {
      borderRadius: "100px",
      padding: "10px",
      color: "#9d0100",
      backgroundColor: "#ffeff0",
    },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}?$where=contains(handelsbenaming, 'IS250C')`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 4, md: 5 }}>
        <Grid sx={styles.graphStyle} size={3}>
          <Card sx={styles.graphStyle}></Card>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        sx={{ width: "100%" }}
        columnSpacing={{ xs: 3, sm: 4, md: 5 }}
      >
        <Grid size={3}>
          <Card sx={styles.cardStyle}>
            <Stack sx={styles.iconWrapper}>
              <DirectionsCarFilledIcon />
            </Stack>
            <Typography sx={styles.headerText}> {results.length}</Typography>
            <Typography sx={styles.subText}>in totaal</Typography>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card sx={styles.cardStyle}>
            <Stack sx={styles.iconWrapper}>
              <DirectionsCarFilledIcon />
            </Stack>
            <Typography sx={styles.headerText}> {results.length}</Typography>
            <Typography sx={styles.subText}>in totaal</Typography>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card sx={styles.cardStyle}>
            <Stack sx={styles.iconWrapper}>
              <DirectionsCarFilledIcon />
            </Stack>
            <Typography sx={styles.headerText}> {results.length}</Typography>
            <Typography sx={styles.subText}>in totaal</Typography>
          </Card>
        </Grid>
        <Grid size={3}>
          <Card sx={styles.cardStyle}>
            <Stack sx={styles.iconWrapper}>
              <DirectionsCarFilledIcon />
            </Stack>
            <Typography sx={styles.headerText}> {results.length}</Typography>
            <Typography sx={styles.subText}>in totaal</Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
