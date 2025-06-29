import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import content from "../assets/content.json";

export default function About() {
  const about = content.about;
  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <title>Over | LexusTracker</title>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card variant="outlined" sx={{ borderRadius: 4, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Over deze tracker
            </Typography>
            <Typography variant="body1">{about.intro}</Typography>
            <Typography variant="body1">{about.features[0]}</Typography>
            <Box mt={3}>
              <Typography variant="h5" gutterBottom>
                Technologie
              </Typography>
              <Typography variant="body1">
                Deze webapplicatie is gebouwd met:
              </Typography>
              <ul>
                {about.technologie.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
            </Box>
            <Box mt={3}>
              <Typography variant="h5" gutterBottom>
                RDW Data
              </Typography>
              <Typography variant="body1">{about.rdw}</Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
