import { ThemeProvider } from "@material-ui/core/styles";
import React, {useEffect, useState} from 'react';
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
import Pedido from "./components/pantallasUsuarioReceptor/Pedido";
import SignUp from "./components/pantallasRegistro/SignUp";
import Canal from "./components/chatRepartidor/Canal";
const App = () => {
  const [user, setUser] = useState('');
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  }
 
  const userState = () => {
    const data = localStorage.getItem('user');
    const us = data !== null ? JSON.parse(data) : null;
    setUser(us);
  }
  useEffect(() => {
    userState();
  }, []);
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
          <div className="routing-settings">
            <span key="pedido">
              <NavLink exact to="/Pedido"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="signUp">
              <NavLink exact to="/SignUp"></NavLink>
            </span>
          </div>
          <div className="routing-settings">
            <span key="chatRepartidor">
              <NavLink exact to="/ChatRepartidor"></NavLink>
            </span>
          </div>

          <>
      {user !== null ? (
        <>
            <Route exact path="/Home" component={Home} setUserState={() => setUser(null)} />
            <Route exact path="/Nav" component={NavLinks} setUserState={() => setUser(null)} />
            <Route exact path="/CrearEnvio" component={CrearEnvio} setUserState={() => setUser(null)} />
            <Route exact path="/NavCreador" component={NavLinksCYR} setUserState={() => setUser(null)} />
            <Route exact path="/SeguimientoEnvio" component={SeguimientoEnvioForm} />
            <Route exact path="/HistorialEnvios" component={HistorialEnvios} />
            <Route exact path="/EditarPerfil" component={PerfilUsuario} />
            <Route exact path="/MisBeneficios" component={Beneficios} />
            <Route exact path="/ListaEnvios" component={ListaEnvios} />
            <Route exact path="/Pedido" component={Pedido} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/ChatRepartidor" component={Canal} />
        </>
      ) : (
         <>
         {toggleForm ? (<Login loggedIn={(user) => setUser(user)} toggle={() => formMode()}/>) 
         : ( <SignUp toggle={() => formMode()}/>)}
        
     </>
      )} 
    </>
    
 
         
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;

/*

<Route exact path="/" component={Login} />
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
