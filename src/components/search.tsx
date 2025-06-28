import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbar,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import axios from "axios";
import { useState } from "react";
import { Pagination, Stack } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import { PageContainer } from "@toolpad/core/PageContainer";
import { motion } from "framer-motion";

export default function Search() {
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = React.useState([]);
  const nodejsUrl = process.env.REACT_APP_NODEJS_API_URL;

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
  const formatDate = (dateString: string): string => {
    if (dateString.length !== 8) return "Invalid Date";

    const year = dateString.slice(0, 4);

    return `${year}`;
  };

  const formatFullDate = (dateString: string | null | undefined): string => {
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
        const response = await axios.get(`${nodejsUrl}/api/stats/rdw-data/206`);
        setResults(response.data.data);
        setLoading(false);

        setRows(
          response.data.data.map((results) => ({
            modelNaam:
              results.handelsbenaming.charAt(0) +
              results.handelsbenaming.substring(1).toLowerCase(),
            id: results.kenteken,
            bouwjaar: formatDate(results.datum_eerste_toelating),
            toelatingNL: results.datum_eerste_tenaamstelling_in_nederland,
            verzekerd: results.wam_verzekerd,
            bpm: "€ " + results.bruto_bpm,
            apk: formatFullDate(results.vervaldatum_apk),
            eerste_toelating: formatDate(results.datum_eerste_toelating),
            kleur:
              results.eerste_kleur.charAt(0) +
              results.eerste_kleur.substring(1).toLowerCase(),
            geimporteerd:
              results.datum_eerste_tenaamstelling_in_nederland !==
              results.datum_eerste_toelating
                ? "Ja"
                : "Nee",
            importeerdatum:
              results.datum_eerste_tenaamstelling_in_nederland !==
              results.datum_eerste_toelating
                ? formatFullDate(
                    results.datum_eerste_tenaamstelling_in_nederland
                  )
                : "N.V.T",
          }))
        );
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
      />
    );
  }

  const PAGE_SIZE = 10;

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
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
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[PAGE_SIZE]}
            slots={{
              pagination: CustomPagination,
              toolbar: GridToolbar,
            }}
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
          />
        </Box>
      </motion.div>
    </PageContainer>
  );
}
