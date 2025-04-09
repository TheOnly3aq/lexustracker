import * as React from "react";
import { Container, Typography, Card, CardContent, Box } from "@mui/material";


export default function About() {

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <title>Over | LexusTracker</title>
      <Card variant="outlined" sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Over deze tracker
          </Typography>

          <Typography variant="body1">
            Deze applicatie is speciaal ontworpen om alle{" "}
            <strong>Lexus IS250C</strong> cabrio's in Nederland bij te houden.
            De gegevens worden in realtime opgehaald via de{" "}
            <strong>RDW Open Data API</strong>.
          </Typography>

          <Typography variant="body1">
            Je kunt het aantal geregistreerde IS250C’s bekijken, controleren of
            ze verzekerd zijn en zoeken op kenteken. Het doel is om een
            duidelijk overzicht te geven van dit zeldzamere model in Nederland.
          </Typography>

          <Box mt={3}>
            <Typography variant="h5" gutterBottom>
              Technologie
            </Typography>
            <Typography variant="body1">
              Deze webapplicatie is gebouwd met:
            </Typography>
            <ul>
              <li>⚛️ React + TypeScript (TSX)</li>
              <li>🎨 Material UI (MUI) voor styling</li>
              <li>📡 RDW Open Data API voor voertuiggegevens</li>
            </ul>
          </Box>

          <Box mt={3}>
            <Typography variant="h5" gutterBottom>
              RDW Data
            </Typography>
            <Typography variant="body1">
              Alle voertuiggegevens worden opgehaald via de officiële
              RDW-databronnen, waaronder import informatie, bouwjaar, APK-status
              en verzekeringsgegevens (indien beschikbaar).
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
