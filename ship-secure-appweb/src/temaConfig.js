import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#00bfa5",
      dark: "#002884",
      contrastText: "#fafafa",
    },
    secondary: {
      light: "#d1d9ff",
      main: "#9fa8da",
      dark: "#6f79a8",
      contrastText: "#1b0000",
    },
    background: {
      paper: "#00bfa5",
      default: "#3f51b5",
    },
  },
});

export default theme;
