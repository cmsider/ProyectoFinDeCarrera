import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[700],
      light: "#00",
      contrastText: "#00",
    },
  },
});

export default theme;
