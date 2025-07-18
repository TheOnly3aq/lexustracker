import "@fontsource/montserrat/600.css";
import {
  Chip,
  Link,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DashboardLayout,
  SidebarFooterProps,
} from "@toolpad/core/DashboardLayout";
import { Outlet } from "react-router";
function SidebarFooter({ mini }: SidebarFooterProps) {
  return (
    <Stack>
      <Typography
        variant="caption"
        sx={{
          m: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {mini ? "© KT" : `© ${new Date().getFullYear()} Made by Kars Talens`}
      </Typography>
    </Stack>
  );
}
function CustomAppTitle() {
  const theme = useTheme();
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <SvgIcon>
        <svg
          style={{ fill: theme.palette.text.primary }}
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 612 612"
        >
          <g>
            <path d="M306,522.4c101.3,0,191.2-35.4,246.9-89.9l-50.2,0.2c-47.4,39.9-116.8,65-195.4,65c-146.7,0-261.1-87.4-261.1-195.2   c0-124.4,114.5-195.2,261.1-195.2c9.3,0,16.8,4.3,11.2,12.4C288,156.4,201.2,274.5,185.4,300.1c-31.2,50.4-30.5,112.5,46,116.9H553   c16.4,0,20.6-7.7,26.5-15.7c21.5-29.1,32.5-63.2,32.4-98.7c-0.1-92.7-65.3-162.1-161.2-196.3l-14.8,22.2   c79.7,29.4,132.4,88.9,132.4,174.1c0,14.8-2.2,29.2-6.3,43.1c-3.6,12-10.5,22.2-23.7,22.2H281.7c-32.9,0-20.2-33.9-8-50.4   c17.7-31.7,114.4-163.5,137.7-188.1c5.9-9,22.6-27.7-0.4-34.8c-32.7-7.8-68.1-11.8-105-11.8C137,82.7,0.1,169.5,0,302.5   C-0.1,436.8,137,522.4,306,522.4L306,522.4z" />
          </g>
        </svg>
      </SvgIcon>
      <Link
        href="https://karstalens.nl"
        underline="none"
        color="black"
        rel="noopener noreferrer"
      >
        <Typography fontWeight={600} color="text.primary" variant="h6">
          LexusTracker
        </Typography>
      </Link>
      <Chip
        size="small"
        sx={{ justifyContent: "flex-end" }}
        label="BETA"
        color="primary"
      />
    </Stack>
  );
}

export default function Layout() {
  const theme = useTheme();
  return (
    <DashboardLayout
      slots={{
        sidebarFooter: SidebarFooter,
        appTitle: CustomAppTitle,
      }}
    >
      <title>Welkom | LexusTracker</title>
      <Outlet />
    </DashboardLayout>
  );
}
