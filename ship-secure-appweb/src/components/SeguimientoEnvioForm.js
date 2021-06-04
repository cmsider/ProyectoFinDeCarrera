import React, { Fragment, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import { db } from "./firebase";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import Pedido from "./Pedido";

import { useForm } from "react-hook-form";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SeguimientoEnvioForm = () => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //const [nroSegPedido, setNroSegPedido] = useState([]);
  const [entradas, setentradas] = useState({
    nroSeg: "",
  });

  const procesarFormulario = (data, e) => {
    console.log(data);
    setentradas(data);
    // limpiar campos
    e.target.reset();
  };
  //Utiliza el hook useState
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  /*const procesarFormulario = (dataSeguimiento, e) => {
    setNroSegPedido(dataSeguimiento);
    console.log(nroSegPedido);
    console.log(register);
    // limpiar campos
    e.target.reset();
  };*/

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h4">
          Hola Usuario
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(procesarFormulario)}
        >
          <input
            name="nroSeg"
            {...register("nroSeg", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 2,
                message: "El nombre debe tener un minimo de 2 letras",
              },
            })}
            className="form-control my-2"
            placeholder="Ingrese numero de seguimiento"
          ></input>

          <span className="text-danger text-small d-block mb-2">
            {errors?.nroSeg?.message}
            {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
          </span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleButtonClick}
          >
            Consultar envio
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item></Grid>
          </Grid>
        </form>

        {buttonClicked ? <Pedido entradas={entradas} /> : null}
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};
export default SeguimientoEnvioForm;
