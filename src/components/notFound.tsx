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
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <Typography fontWeight={600} variant="h1">
            Oops!
          </Typography>
          <Typography fontWeight={600} variant="h6">
            Deze pagina bestaat niet.
          </Typography>
        </motion.div>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
        >
          <Link href="https://www.youtube.com/watch?v=j5a0jTc9S10">
            <Stack sx={{ width: 400 }}>
              <img src={notfoundcar} loading="lazy" />
            </Stack>
          </Link>
        </motion.div>
      </Stack>
    </Container>
  );
}
