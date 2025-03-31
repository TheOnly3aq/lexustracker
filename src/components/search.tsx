import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";

export default function Search() {
  const [results, setResults] = useState<any[]>([]);
  const [imported, setImported] = useState<any[]>([]);
  const baseUrl = "https://opendata.rdw.nl/resource/m9d7-ebf2.json";
  const [rows, setRows] = React.useState([]);

  const columns: GridColDef<typeof rows[number]>[] = [
    { field: "kenteken", headerName: "Kenteken", width: 120 },
    {
      field: "bouwjaar",
      headerName: "Bouwjaar",
      width: 150,
    },
    {
      field: "verzekerd",
      headerName: "Verzekerd?",
      width: 100,
    },
    {
      field: "geimporteerd",
      headerName: "Geimporteerd?",
      width: 130,
    },
        {
      field: "kleur",
      headerName: "Kleur",
      width: 150,
    },
  ];
  const formatDate = (dateString: string): string => {
    if (dateString.length !== 8) return "Invalid Date";

    const year = dateString.slice(0, 4);

    return `${year}`;
  };
  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}?$where=contains(handelsbenaming, 'IS250C')`
        );
        setResults(response.data);

        setRows(
          response.data.map((results) => ({
            kenteken: results.kenteken,
            bouwjaar: formatDate(results.datum_eerste_toelating),
            toelatingNL: results.datum_eerste_tenaamstelling_in_nederland,
            verzekerd: results.wam_verzekerd,
            eerste_toelating: formatDate(results.datum_eerste_toelating),
            kleur: results.eerste_kleur.toLowerCase(),
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

    fetchOrders();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        getRowId={() => crypto.randomUUID()}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
