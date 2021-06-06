import React from "react";
import { Divider, Drawer, makeStyles } from "@material-ui/core";
import ListaMenuPPal from "./ListaMenuPPal";

const estilos = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}));

const DrawerContenedor = (props) => {
  const classes = estilos();

  return (
    <Drawer
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
      variant={props.variant}
      open={props.open}
      onClose={props.onClose ? props.onClose : null}
    >
      <div className={classes.toolbar}></div>
      <Divider />
      <ListaMenuPPal />
    </Drawer>
  );
};

export default DrawerContenedor;
