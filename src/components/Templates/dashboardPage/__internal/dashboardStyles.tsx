import { useTheme, Theme } from "@mui/material/styles";

const useDashboardStyles = () => {
  const theme: Theme = useTheme();

  return {
    cardStyle: {
      flex: 1,
      display: "flex",
      color: "primary",
      borderRadius: "12px",
      paddingBottom: "2rem",
      flexDirection: "column",
    },
    cardStyleWrapper: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      color: "primary",
      borderRadius: "12px",
      flexDirection: "column",
    },
    graphStyle: {
      width: "100%",
      marginBottom: "2rem",
      paddingTop: 2,
      height: "20rem",
      display: "flex",
      color: "primary",
      flex: 1,
      borderRadius: "12px",
    },
    headerText: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    subText: {
      color: "grey",
      fontSize: "1rem",
    },
    iconWrapper: {
      borderRadius: "100px",
      padding: "10px",
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.secondary.light,
    },
    helpIconWrapper: {
      color: "grey",
      marginLeft: "5px",
      marginTop: "5px",
    },
    customTooltip: {
      backgroundColor: theme.palette.background.paper,
      padding: 2,
      borderRadius: 5,
    },
    tooltipLabelTop: {
      color: theme.palette.text.primary,
      fontSize: "1rem",
    },
    tooltipLabelBottom: {
      color: theme.palette.text.primary,
      fontSize: "1rem",
    },
    intervalSelector: {
      backgroundColor: theme.palette.background.paper,
    },
    progress: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "center",
      flexDirection: "column",
    },
  };
};

export default useDashboardStyles;
