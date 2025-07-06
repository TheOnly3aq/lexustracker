import { GridColDef } from "@mui/x-data-grid";

export const getColumns = <T extends object>(rows: T[]): GridColDef<T>[] => [
  {
    field: "modelNaam",
    headerName: "Model naam",
    flex: 1,
    minWidth: 150,
    resizable: false,
  },
  {
    field: "id",
    headerName: "Kenteken",
    flex: 1,
    minWidth: 90,
    resizable: false,
  },
  {
    field: "bouwjaar",
    headerName: "Bouwjaar",
    flex: 1,
    minWidth: 90,
    resizable: false,
  },
  {
    field: "bpm",
    headerName: "Bruto BPM",
    flex: 1,
    minWidth: 100,
    resizable: false,
  },
  {
    field: "verzekerd",
    headerName: "Verzekerd?",
    flex: 1,
    minWidth: 90,
    resizable: false,
  },
  {
    field: "apk",
    headerName: "Vervaldatum APK",
    flex: 1,
    minWidth: 150,
    resizable: false,
  },
  {
    field: "geimporteerd",
    headerName: "Geimporteerd?",
    flex: 1,
    minWidth: 130,
    resizable: false,
  },
  {
    field: "importeerdatum",
    headerName: "Datum import",
    flex: 1,
    minWidth: 150,
    resizable: false,
  },
  {
    field: "kleur",
    headerName: "Kleur",
    flex: 1,
    minWidth: 90,
    resizable: false,
  },
];
