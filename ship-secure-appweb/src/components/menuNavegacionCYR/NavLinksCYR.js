import React from "react";
import ContenedorCYR from "./ContenedorCYR";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../pantallasUsuarioReceptor/Home";
import PerfilUsuario from "../pantallasUsuarioReceptor/PerfilUsuario";
import CrearEnvio from "../../CrearEnvio";

function NavLinksCYR() {
  return (
    <div>
      <Router>
        
        <Switch>

          <Route path="/home" component={Home} />
          <Route path="/editarPerfil" component={PerfilUsuario} />
          <Route path="/crearEnvio" component={CrearEnvio} />
        </Switch>
      </Router>
    </div>
  );
}

export default NavLinksCYR;
