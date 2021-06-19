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
    props: {
      MuiTypography: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "h2",
          subtitle2: "h3",
          body1: "span",
          body2: "span",
        },
      },
    },
  },
});

export default theme;
