import { ThemeProvider } from "@material-ui/core/styles";
import React, {useEffect, useState} from 'react';
import firebase from "firebase/";
import { msg, rt } from "./components/firebase";
import logo from './components/imagenes/avatar.png';
import { Route, NavLink, HashRouter } from "react-router-dom";
import NavLinks from "./components/menuNavegacion/NavLinks";
import CrearEnvio from "./CrearEnvio";
import Home from "./components/pantallasUsuarioReceptor/Home";
import { makeStyles } from "@material-ui/core/styles";
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
import ListaMenuPPal from "./components/menuNavegacion/ListaMenuPPal";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
  
    boxShadow: theme.shadows[0],
    padding: theme.spacing(0, 0, 0),
    marginTop: theme.spacing(5),
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    
  },
}));

const App = () => {

  const [cerr, setCerradura] = useState(false);

  useEffect(() => {
    const consultaAPI = async () => {

      rt.ref('/sensores').on('value', snapshot => {
        const cerradura = {
          puertaAbierta: snapshot.val().fueForzada,
          }
          setCerradura(cerradura.puertaAbierta);
        

      })}
      consultaAPI();
  }, []);

  useEffect(()=>{
    if(cerr){
    msg.requestPermission().then(()=>{
      return msg.getToken();
    }).then((data)=>{
      console.warn("token",data)
      let body = {
        to: data,
        notification:{
          title: "ATENCION!",
          body: "LA CAJA ESTA SIENDO FORZADA",
          icon: logo,
        }
      
      }
      let options ={
        method: "POST",
          
        headers: {
        "Authorization":"key=AAAAigDMkeo:APA91bGv1BPlSgQ-PfTgCT1IOqupeDbSWvnGpwAM1a8tiLgsbZ0v8myrHSKDybuuVhexrp3F5nHc8ERJVSVaJm4DHKHuFSXvRtP7nNnKlHlUY7rsmYCAFSuJT_9-LepNzZNwyodn-Qh9",
        "Content-Type" : "application/json"
        },
        body: JSON.stringify(body)
      }
      console.log(options);

    fetch("https://fcm.googleapis.com/fcm/send",options).then(res=>{
      console.log(res)
      console.log('ENVIADA')
    }).catch(e => console.log(e))
    })
  
    }
  }, [cerr])



  const classes = useStyles();

  const [user, setUser] = useState('');
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
    handleOpen();
  }
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setToggleForm(!toggleForm);
  };
  const handleOpen = () => {
    setOpen(true);
  };
 
  const userState = () => {
    const data = localStorage.getItem('usuarios');
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
          <div className="routing-settings">
            <span key="list">
              <NavLink exact to="/List"></NavLink>
            </span>
          </div>

          <>
      {user !== null ? (
        <>
            <Route exact path="/Home">
              <Home setUserState={() => setUser(null)}/>
              </Route>
            <Route exact path="/Nav" component={NavLinks}  />
            <Route exact path="/CrearEnvio" >
              <CrearEnvio setUserState={() => setUser(null)}/>
              </Route>
            <Route exact path="/NavCreador" component={NavLinksCYR}  />
            <Route exact path="/SeguimientoEnvio" >
              <SeguimientoEnvioForm setUserState={() => setUser(null)}/>
            </Route>
            <Route exact path="/HistorialEnvios">
              <HistorialEnvios setUserState={() => setUser(null)}/>
              </Route>
            <Route exact path="/EditarPerfil" >
              <PerfilUsuario setUserState={() => setUser(null)}/>
              </Route>
            <Route exact path="/MisBeneficios" >
              <Beneficios setUserState={() => setUser(null)}/>
              </Route>
            <Route exact path="/ListaEnvios" >
              <ListaEnvios setUserState={() => setUser(null)}/>
              </Route>
              <Route exact path="/">
              <Home setUserState={() => setUser(null)}/>
              </Route>
            <Route exact path="/Pedido" component={Pedido} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/ChatRepartidor" component={Canal} />
            <Route exact path="/List" component={ListaMenuPPal}  />

        </>
      ) : (
         <>
         {toggleForm ? (<Login loggedIn={(user) => setUser(user)} toggle={() => formMode()}/>) 
         : ( <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper} >
          <SignUp toggle={() => formMode()}/>
          </div>
        </Modal> )}
        
     </>
      )} 
    </>
   
         
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;

