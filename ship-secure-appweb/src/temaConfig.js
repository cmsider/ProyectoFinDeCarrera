import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#08AFA5",
      dark: "#003648",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#d1d9ff",
      main: "#E07D7E",
      dark: "#6f79a8",
      contrastText: "#1b0000",
    },
    background: {
      paper: "#08AFA5",
      default: "#003648",
    },
    textSecondary: {
      light: "#FFFFFF",
      main: "#FFFFFF",
      dark: "#FFFFFF",
      contrastText: "#FFFFFF",
      color: "#FFFFFF",
    },
  },
});

export default theme;
