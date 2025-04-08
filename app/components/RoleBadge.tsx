import { Chip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const roleColors: Record<string, any> = {
  Admin: "primary",
  Auditor: "secondary",
  Client: "salmon",
  Developer: "success",
  Manager: "warning",
  "Super User": "info",
  System: "default",
  "Testing 2": "warning",
  User: "success",
};
declare module "@mui/material/styles" {
  interface Palette {
    salmon: Palette["primary"];
  }

  interface PaletteOptions {
    salmon?: PaletteOptions["primary"];
  }
}
let theme = createTheme({});
theme = createTheme({
  palette: {
    salmon: theme.palette.augmentColor({
      color: {
        main: "#FF5733",
      },
      name: "salmon",
    }),
    secondary: {
      main: "#FB4D46",
    },
  },
});
const RoleBadge = ({ role }: { role: string }) => {
  return (
    <ThemeProvider theme={theme}>
      <Chip
        sx={{ px: 1, py: 2, fontSize: 14 }}
        size="medium"
        label={role}
        color={roleColors[role]}
      />
    </ThemeProvider>
  );
};

export default RoleBadge;
