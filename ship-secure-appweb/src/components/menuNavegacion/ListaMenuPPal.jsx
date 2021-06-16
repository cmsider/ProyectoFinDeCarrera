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

const ListaMenuPPal = () => {
  return (
    <div>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Usuario" />
        </ListItem>

        <Divider />

        <Nav>
          <NavLink to="/home" activeStyle>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </NavLink>
        </Nav>

        <Nav>
          <NavLink to="/perfilUsuario" activeStyle>
            <ListItem button>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Editar perfil" />
            </ListItem>
          </NavLink>
        </Nav>

        <Nav>
          <NavLink to="/seguimientoEnvio" activeStyle>
            <ListItem button>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Seguir envio" />
            </ListItem>
          </NavLink>
        </Nav>

        <Nav>
          <NavLink to="/historialEnvios" activeStyle>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Histórico envíos" />
            </ListItem>
          </NavLink>
        </Nav>

        <Nav>
          <NavLink to="/beneficios" activeStyle>
            <ListItem button>
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary="Mis beneficios" />
            </ListItem>
          </NavLink>
        </Nav>

        <Divider />

        <ListItem button>
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
