import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";

interface DashboardPaginationProps {
  currentPage: number;
  totalPages: number;
  canGoBack: boolean;
  canGoForward: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
}

const DashboardPagination: React.FC<DashboardPaginationProps> = ({
  currentPage,
  totalPages,
  canGoBack,
  canGoForward,
  handlePrevious,
  handleNext,
}) => (
  <>
    <IconButton
      onClick={handlePrevious}
      disabled={!canGoBack}
      size="small"
      sx={{
        borderRadius: "8px",
        width: 40,
        height: 32,
        backgroundColor: !canGoBack ? "#9e9e9e" : "#7d0100",
        color: !canGoBack ? "#616161" : "white",
        "&:hover": {
          backgroundColor: !canGoBack ? "#9e9e9e" : "#5d0100",
        },
        "&.Mui-disabled": {
          backgroundColor: "#9e9e9e",
          color: "#616161",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <ChevronLeftIcon />
    </IconButton>

    <Typography variant="body2" sx={{ minWidth: "80px", textAlign: "center" }}>
      {totalPages > 0 ? `${currentPage + 1} / ${totalPages}` : "0 / 0"}
    </Typography>

    <IconButton
      onClick={handleNext}
      disabled={!canGoForward}
      size="small"
      sx={{
        borderRadius: "8px",
        width: 40,
        height: 32,
        backgroundColor: !canGoForward ? "#9e9e9e" : "#7d0100",
        color: !canGoForward ? "#616161" : "white",
        "&:hover": {
          backgroundColor: !canGoForward ? "#9e9e9e" : "#5d0100",
        },
        "&.Mui-disabled": {
          backgroundColor: "#9e9e9e",
          color: "#616161",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <ChevronRightIcon />
    </IconButton>
  </>
);

export default DashboardPagination;
