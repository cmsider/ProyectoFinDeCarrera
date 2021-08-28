import React , { useState } from "react";
import { Fragment } from "react";
import TextFiled from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "firebase/firestore";
import "firebase/auth";
import { useForm } from "react-hook-form";
import CreateIcon from '@material-ui/icons/Create';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    
    backgroundColor: theme.palette.background.default,
    color: "#FFFFFF",
    width: 100,
    height: 100,
    borderRadius: 150,
    marginBlockEnd: 30,
    marginTop: 10,
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#08AFA5",
    color: "#FFFFFF",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
  },
  colorTitulo: {
    color: "#FFFFFF",
  },
  colorSubtitulo: {
    color: "#E07D7E",
    width: 500,
    height: 100,
    marginTop: 20,
    marginRight:-100,
    alignItems: "center",
  },
  colorHipervinculo: {
    color: "#08AFA5",
    alignItems: "center",
  },
  colorTextField: {
    color: "#FFFFFF",
    background: "#2F4A5B",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginRight:-100,
    alignItems: "center",
    margin: theme.spacing(1, 0, 2)
  },
}));



const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const redirect = (view) => {
    history.push(view);
  };

  const handleClose = () => {
    redirect("/seguimientoEnvio");
  };

  const handleCloseCreador = () => {
    redirect("/crearEnvio");
  };

  const handleCloseRepartidor = () => {
    redirect("/listaEnvios");
  };

  return (

    <div>
      <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <AccountCircleIcon className={(classes.avatar)} style={{ textAlign: "center", verticalAlign: "middle" }}>
          
        </AccountCircleIcon>
       
        <Link to={'/Beneficio'}>
        <Typography
          component="h2"
          variant="h6"
          className={classes.colorHipervinculo}
        >
          Mis Beneficios
          <LoyaltyIcon/>

        </Typography>
        </Link>

        <Typography
          component="h2"
          variant="h5"
          className={classes.colorSubtitulo}
          
        >
          ¿Qué querés hacer con tu ShipSecure? 
        
        </Typography>
        </div>
      </Container>
      <Container component="main" maxWidth="md">
        <div>
        <Grid container spacing={2}>
        <Grid item xs={4}>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            handleClose();
          }}
        >
          <RemoveRedEyeIcon className={(classes.boton)}/> 
          Seguirlo
        </Button>
        </Grid>
        <Grid item xs={4}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            handleCloseCreador();
          }}
        >
          <CreateIcon className={(classes.boton)}/>
          Crearlo
        </Button>
        </Grid>
        <Grid item xs={4}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            handleCloseRepartidor();
          }}
        >
          <LocalShippingIcon className={(classes.boton)}/>
          Entregarlo
        </Button>
        </Grid>
        </Grid>
      </div>

      </Container>
    </div>
  );
};
export default Home;

/*
import React from "react";

export const Home = () => {
  return (
    <div>
      <h1>ESTE ES EL HOME</h1>
    </div>
  );
};
export default Home;*/
