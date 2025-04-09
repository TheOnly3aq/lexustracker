import * as React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  Link,
} from "@mui/material";
import "@fontsource/montserrat/600.css";
import notfoundcar from "../assets/notfoundcar.png";

const styles = {
  notfoundWrapper: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <title>404 | LexusTracker</title>
      <Stack sx={styles.notfoundWrapper}>
        <Typography fontWeight={600} variant="h1">
          Oops!
        </Typography>
        <Typography fontWeight={600} variant="h6">
          Deze pagina bestaat niet.
        </Typography>
        <Link href="https://www.youtube.com/watch?v=j5a0jTc9S10">
          <Stack sx={{ width: 400 }}>
            <img src={notfoundcar} loading="lazy" />
          </Stack>
        </Link>
      </Stack>
    </Container>
  );
}
