import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ChatIcon from "@material-ui/icons/Chat";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LabelIcon from "@material-ui/icons/Label";
import AllInboxIcon from "@material-ui/icons/AllInbox";

const ListaMenuPPal = () => {
  const [creoEnvio, setCrearEnvio] = useState(false);
  const abrirCrearEnvio = () => {
    setCrearEnvio(!creoEnvio);
  };
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

        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem button abrirCrearEnvio={abrirCrearEnvio} open={creoEnvio}>
          <ListItemIcon>
            <AllInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Crear envio" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Seguir envio" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary="Beneficios" />
        </ListItem>

        <Divider />

        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
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
