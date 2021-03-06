import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import avatar from '../imagenes/avatar.png';
import { useEffect, useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { NavLink, Nav } from "./stylesNavLinkCYR";
import {auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

const ListaMenuPPalCYR = (props) => {
  var myJson = JSON.parse(localStorage.getItem("usuarios"));
  console.log(myJson);
  const history = useHistory();
  var myJson = JSON.parse(localStorage.getItem("usuarios"));

  const redirect = (view) => {
    history.push(view);
  };
  
const handleClose =() => {
  localStorage.removeItem('usuarios');
  props.setUserState();
  logout();
}

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

  const [username, setUsername] = useState([]);

const logout = async () =>{
  await auth.signOut().then(() => {
    redirect("/");
    console.log("LLegga");
  }).catch((error) => {
    // An error happened.
});


}
  return (
    <div>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
          <img src={avatar} width="50" height="50"/>
          </ListItemIcon>
          <ListItemText primary={myJson["username"]}/>
        </ListItem>

        <Divider />

        <Nav>
          <NavLink to="/home">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
        </Nav>

        <Nav>
          <NavLink to="/editarPerfil">
            <ListItem button >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Editar perfil" />
            </ListItem>
          </NavLink>
        </Nav>

        <Divider />

        <ListItem button onClick = {handleClose}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesi??n" />
        </ListItem>
      </List>
    </div>
  );
};

export default ListaMenuPPalCYR;
