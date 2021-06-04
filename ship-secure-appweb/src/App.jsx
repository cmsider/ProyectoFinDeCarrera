import { ThemeProvider } from "@material-ui/core/styles";
import Contenedor from "./components/Contenedor";
//import { Drawer, makeStyles } from "@material-ui/core";
import SeguimientoEnvioForm from "./components/SeguimientoEnvioForm";
import Pedido from "./components/Pedido";

import theme from "./temaConfig";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Contenedor />
      <SeguimientoEnvioForm />
    </ThemeProvider>
  );
}

export default App;
