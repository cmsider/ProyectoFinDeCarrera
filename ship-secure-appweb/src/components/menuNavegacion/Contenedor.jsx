import React from "react";
import { makeStyles, Hidden } from "@material-ui/core";
import Navbar from "./Navbar";
import DrawerContenedor from "./DrawerContenedor";

//         <DrawerContenedor variant="permanent" open={true} />
const estilos = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    primary: theme.palette.primary.main,

    padding: theme.spacing(3),
  },
}));

const Contenedor = () => {
  const classes = estilos();
  const [abrir, setAbrir] = React.useState(false);
  const accionAbrir = () => {
    setAbrir(!abrir);
  };

  return (
    <div className={classes.root}>
      <Navbar accionAbrir={accionAbrir} />

      <Hidden lgDown>
        <DrawerContenedor
          variant="temporary"
          open={abrir}
          onClose={accionAbrir}
        />
      </Hidden>

      <Hidden xlUp>
        <DrawerContenedor
          variant="temporary"
          open={abrir}
          onClose={accionAbrir}
        />
      </Hidden>

      <div className={classes.content}></div>
    </div>
  );
};

export default Contenedor;
