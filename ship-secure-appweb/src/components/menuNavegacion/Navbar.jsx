import React from "react"; //rafc el hideen para oculta la lista
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),

    [theme.breakpoints.up("xxl")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up("xxl")]: {
      width: `calc(100% - ${240}px)`,
      marginLeft: 240,
    },
  },
}));
const Navbar = (props) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
          onClick={() => props.accionAbrir()}
        >
          <MenuIcon></MenuIcon>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          ShipSecure
        </Typography>
        <Button variant="text" color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
