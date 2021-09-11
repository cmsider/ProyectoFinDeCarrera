import React from "react";
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
import avatar from '../imagenes/avatar.png'

const ListaMenuPPal = () => {

  return (
    <div>
      <List component="nav">
        <ListItem button
        >
          <ListItemIcon>
          <img src={avatar} width="50" height="50"/>
          </ListItemIcon>
          <ListItemText primary="@Usuario" />
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

        <ListItem button
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
