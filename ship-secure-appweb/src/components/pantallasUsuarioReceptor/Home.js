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
import CreateIcon from '@material-ui/icons/Create';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import {auth } from "../firebase";
import avatar from '../imagenes/avatar.png'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperBotones: {
    marginTop: theme.spacing(4),
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  boton: {
    //backgroundColor: "#08AFA5",
    color: "#FFFFFF",
    width: 100,
    height: 100,
    alignItems: "center",
    textAlign: "center",
    textShadow: "initial",
    margin: theme.spacing(1,1,0),
  },
  colorTitulo: {
    color: "#FFFFFF",
  },
  colorSubtitulo: {
    color: "#E07D7E",
    width: 500,
    height: 100,
    marginTop: 110,
    textAlign: "center",
  },
  colorHipervinculo: {
    color: "#08AFA5",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
}));



const Home = (props) => {

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
          <img src={avatar} width="150" height="150"/>
       
        <Link to={'/misBeneficios'}>
        <Typography
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
        <Grid container spacing={10} className={classes.paperBotones}>
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