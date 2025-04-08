import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useState } from 'react';
import { useTheme } from "styled-components";

export default function Search() {
  const theme = useTheme();
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";
  const [rows, setRows] = React.useState([]);

  const columns: GridColDef<(typeof rows)[number]>[] = [
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
      minWidth: 110,
      resizable: false,
    },
    {
      field: "kleur",
      headerName: "Kleur",
      flex: 1,
      minWidth: 150,
      resizable: false,
    },
  ];
  const formatDate = (dateString: string): string => {
    if (dateString.length !== 8) return "Invalid Date";

    const year = dateString.slice(0, 4);

    return `${year}`;
  };

  const formatAPKDate = (dateString: string | null | undefined): string => {
    if (!dateString || dateString.length !== 8) return "Geen APK";

    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    return `${day}/${month}/${year}`;
  };

  React.useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}?$where=contains(handelsbenaming, 'IS250C')`
        );
        setResults(response.data);
        setLoading(false);

        setRows(
          response.data.map((results) => ({
            modelNaam:
              results.handelsbenaming.charAt(0) +
              results.handelsbenaming.substring(1).toLowerCase(),
            id: results.kenteken,
            bouwjaar: formatDate(results.datum_eerste_toelating),
            toelatingNL: results.datum_eerste_tenaamstelling_in_nederland,
            verzekerd: results.wam_verzekerd,
            bpm: "€ " + results.bruto_bpm,
            apk: formatAPKDate(results.vervaldatum_apk),
            eerste_toelating: formatDate(results.datum_eerste_toelating),
            kleur:
              results.eerste_kleur.charAt(0) +
              results.eerste_kleur.substring(1).toLowerCase(),
            geimporteerd:
              results.datum_eerste_tenaamstelling_in_nederland !==
              results.datum_eerste_toelating
                ? "Ja"
                : "Nee",
          }))
        );
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
      }}
    >
      <title>Zoeken | LexusTracker</title>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={!loading ? false : true}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        sx={{
          borderRadius: 4,
          backgroundColor: (theme) => theme.palette.background.paper,
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: (theme) => theme.palette.background.paper,
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: (theme) => theme.palette.background.paper,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
      />
    </Box>
  );
}
