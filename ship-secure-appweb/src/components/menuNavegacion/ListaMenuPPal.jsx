import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LabelIcon from "@material-ui/icons/Label";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { NavLink, Nav } from "./stylesNavLink";
import {auth } from "../firebase";
import { useHistory } from "react-router-dom";
import avatar from '../imagenes/avatar.png';
import { db } from "../firebase";

const ListaMenuPPal = (props) => {


  var myJson = JSON.parse(localStorage.getItem("usuarios"));
  console.log(myJson);
  

   const history = useHistory();
const redirect = (view) => {
  history.push(view);
};

const handleClose =() => {
  localStorage.removeItem('usuarios');
  props.setUserState();
  logout();
}

const logout = async () =>{
  await auth.signOut().then(() => {
    redirect("/");
    console.log("LLegga");
  }).catch((error) => {
    // An error happened.
});

}
const [username, setUsername] = useState([]);


useEffect(() => {

const consultaAPI = async () => {

db.collection("usuarios")
.where("email", "==", myJson["email"])
.get()
.then((querySnapshot) => {
  querySnapshot.forEach((documentSnapshot) => {
    const us = [];
    us.push({
      ...documentSnapshot.data(),
      key: documentSnapshot.id,
      });
      setUsername(us[0].username);
  });
});

};
consultaAPI();

  
}, [username]);



  return (
    <div>
      <List component="nav">
        <ListItem button
        >
          <ListItemIcon>
          <img src={avatar} width="50" height="50"/>
          </ListItemIcon>
          <ListItemText primary={username} />
        </ListItem>

        <Divider />

        <Nav>
          <NavLink to="/home">
            <ListItem button
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
        </Nav>

        <Nav>
          <NavLink to="/editarPerfil">
            <ListItem button
            >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Editar perfil" />
            </ListItem>
          </NavLink>
        </Nav>

        <Nav>
          <NavLink to="/seguimientoEnvio"
          aria-current= "true" >
            <ListItem button
            >
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Seguir envio" />
            </ListItem>
          </NavLink>
        </Nav>

        <Nav>
          <NavLink to="/historialEnvios">
            <ListItem button
            >
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Histórico envíos" />
            </ListItem>
          </NavLink>
        </Nav>

        <Nav>
          <NavLink to="/misBeneficios">
            <ListItem button
            >
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="Mis beneficios" />
            </ListItem>
          </NavLink>
        </Nav>

        <Divider />

        <ListItem button onClick = {handleClose}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>



      </List>

      
    </div>
  );
};

export default ListaMenuPPal;
