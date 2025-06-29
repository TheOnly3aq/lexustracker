import "@fontsource/montserrat/600.css";
import { Container, Link, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import notfoundcar from "../assets/notfoundcar.png";

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <title>404 | LexusTracker</title>
      <Stack className="justify-content-center align-items-center text-center">
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
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Link href="https://www.youtube.com/watch?v=j5a0jTc9S10">
            <Stack
              sx={{
          width: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
              }}
            >
              <img src={notfoundcar} alt="Rode cabrio" loading="lazy" />
            </Stack>
          </Link>
        </motion.div>
      </Stack>
    </Container>
  );
}
