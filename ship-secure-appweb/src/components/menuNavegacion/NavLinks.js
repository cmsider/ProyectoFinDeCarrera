import React from "react";
import Contenedor from "./Contenedor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SeguimientoEnvioForm from "../pantallasUsuarioReceptor/SeguimientoEnvioForm";
import Pedido from "../pantallasUsuarioReceptor/Pedido";
import Beneficios from "../pantallasUsuarioReceptor/Beneficios";
import HistorialEnvios from "../pantallasUsuarioReceptor/HistorialEnvios";
import Home from "../pantallasUsuarioReceptor/Home";
import PerfilUsuario from "../pantallasUsuarioReceptor/PerfilUsuario";

function NavLinks() {
  return (
    <div>
      <Router>
        <Contenedor />
        <Switch>
          <Route
            path="/seguimientoEnvio"
            exact
            component={SeguimientoEnvioForm}
          />
          <Route path="/pedido" component={Pedido} />
          <Route path="/historialEnvios" component={HistorialEnvios} />
          <Route path="/home" component={Home} />
          <Route path="/beneficios" component={Beneficios} />
          <Route path="/perfilUsuario" component={PerfilUsuario} />
        </Switch>
      </Router>
    </div>
  );
}

export default NavLinks;
