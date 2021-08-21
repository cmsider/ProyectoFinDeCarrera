import { ThemeProvider } from "@material-ui/core/styles";

import { Route, NavLink, HashRouter } from "react-router-dom";
import NavLinks from "./components/menuNavegacion/NavLinks";
import CrearEnvio from "./CrearEnvio";
import Home from "./components/pantallasUsuarioReceptor/Home";

import theme from "./temaConfig";
import Login from "./components/pantallasRegistro/Login";
import NavLinksCYR from "./components/menuNavegacionCYR/NavLinksCYR";
import SeguimientoEnvioForm from "./components/pantallasUsuarioReceptor/SeguimientoEnvioForm";
import HistorialEnvios from "./components/pantallasUsuarioReceptor/HistorialEnvios";
import PerfilUsuario from "./components/pantallasUsuarioReceptor/PerfilUsuario";
import Beneficios from "./components/pantallasUsuarioReceptor/Beneficios";
import ListaEnvios from "./components/pantallasRepartidor/ListaEnvios";
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <div className="main">
          <div className="routing-settings">
            <span key="login">
              <NavLink exact to="/"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="crearEnvio">
              <NavLink exact to="/CrearEnvio"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="home">
              <NavLink exact to="/Home"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="nav">
              <NavLink exact to="/Nav"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="navCreador">
              <NavLink exact to="/NavCreador"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="seguimientoEnvio">
              <NavLink exact to="/SeguimientoEnvio"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="historialEnvios">
              <NavLink exact to="/HistorialEnvios"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="editarPerfil">
              <NavLink exact to="/EditarPerfil"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="misBeneficios">
              <NavLink exact to="/MisBeneficios"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="listaEnvios">
              <NavLink exact to="/ListaEnvios"></NavLink>
            </span>
          </div>
          <>
            <Route exact path="/" component={Login} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Nav" component={NavLinks} />
            <Route exact path="/CrearEnvio" component={CrearEnvio} />
            <Route exact path="/NavCreador" component={NavLinksCYR} />
            <Route exact path="/SeguimientoEnvio" component={SeguimientoEnvioForm} />
            <Route exact path="/HistorialEnvios" component={HistorialEnvios} />
            <Route exact path="/EditarPerfil" component={PerfilUsuario} />
            <Route exact path="/MisBeneficios" component={Beneficios} />
            <Route exact path="/ListaEnvios" component={ListaEnvios} />
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
