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
import ChatIcon from "@material-ui/icons/Chat";
const Listas = () => {
  return (
    <div>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Usuario" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Ubicacion" />
        </ListItem>

        <Divider />

        <ListItem button>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItem>
      </List>
    </div>
  );
};

export default Listas;
