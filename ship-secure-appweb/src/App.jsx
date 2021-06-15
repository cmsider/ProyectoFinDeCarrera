import { ThemeProvider } from "@material-ui/core/styles";

import { Route, NavLink, HashRouter } from "react-router-dom";
import NavLinks from "./components/menuNavegacion/NavLinks";
import CrearEnvio from "./CrearEnvio";

import theme from "./temaConfig";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <div className="main">
          <div className="routing-settings">
            <span key="NavLinks">
              <NavLink exact to="/"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="crearEnvio">
              <NavLink exact to="/CrearEnvio"></NavLink>
            </span>
          </div>
          <>
            <Route exact path="/" component={NavLinks} />
            <Route exact path="/CrearEnvio" component={CrearEnvio} />
          </>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;

/*
 return (
    <ThemeProvider theme={theme}>
      <Contenedor />
    </ThemeProvider>
  );
 */
/*
            <span key="seguimiento-envio-form">
              <NavLink exact to="/seguimientoEnvioForm"></NavLink>
            </span>
            <span key="pedido">
              <NavLink exact to="/Pedido"></NavLink>
            </span>

              <Route
              exact
              path="/seguimientoEnvioForm"
              component={SeguimientoEnvioForm}
            />
            <Route exact path="/pedido" component={Pedido} />
            */
