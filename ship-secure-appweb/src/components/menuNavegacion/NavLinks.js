import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SeguimientoEnvioForm from "../pantallasUsuarioReceptor/SeguimientoEnvioForm";
import Pedido from "../pantallasUsuarioReceptor/Pedido";
import Beneficios from "../pantallasUsuarioReceptor/Beneficios";
import HistorialEnvios from "../pantallasUsuarioReceptor/HistorialEnvios";
import Home from "../pantallasUsuarioReceptor/Home";
import PerfilUsuario from "../pantallasUsuarioReceptor/PerfilUsuario";
import Login from "../pantallasRegistro/Login";

function NavLinks() {
 
  return (
    <div>
      <Router>

    
        
        <Switch>
     
            <Route
              path="/seguimientoEnvio"
              exact
              component={SeguimientoEnvioForm}
            />
            <Route path="/login" component={Login} />
            <Route path="/pedido" component={Pedido} />
            <Route path="/historialEnvios" component={HistorialEnvios} />
            <Route path="/home" component={Home} />
            <Route path="/beneficios" component={Beneficios} />
            <Route path="/editarPerfil" component={PerfilUsuario} />
            <Route path="/misBeneficios" component={Beneficios} />
        </Switch>

      </Router>
    </div>
  );
}

export default NavLinks;
