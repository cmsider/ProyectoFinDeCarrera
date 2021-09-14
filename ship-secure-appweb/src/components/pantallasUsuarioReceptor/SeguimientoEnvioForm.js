import React, { useState, useEffect } from "react";
import avatar from "../imagenes/avatar.png";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextFiled from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "firebase/firestore";
import "firebase/auth";
import { useForm } from "react-hook-form";
import Contenedor from "../menuNavegacion/Contenedor";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  colorTitulo: {
    color: "#FFFFFF",
  },
  colorSaludo: {
    color: "#FFFFFF",
    margin: theme.spacing(5, 0, 7),
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
    margin: theme.spacing(3, 0, 2),
  },
}));

const SeguimientoEnvioForm = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [entradas, setentradas] = useState({
    nroSeg: "",
  });

  const procesarFormulario = (data, e) => {
    console.log(data);
    setentradas(data);
    e.target.reset();
  };
  //Utiliza el hook useState
  const [buttonClicked, setButtonClicked] = useState(false);
  const [validarNroSeg, setValidarNroSeg] = useState(false);

  var myJson = JSON.parse(localStorage.getItem("usuarios"));

  const handleButtonClick = (event) => {
    setValidarNroSeg(true);
  };

  useEffect(() => {
    if (validarNroSeg) {
      const consultaAPI = async () => {
        var pedido = [
          {
            email: "",
          },
        ];

        db.collection("envios")
          .where("id", "==", entradas.nroSeg)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((documentSnapshot) => {
              const ped = [];
              ped.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
              pedido.email = ped[0].email;
            });

            if (pedido.email === myJson["email"]) {
              console.log(props.history);
              setButtonClicked(true);
            } else {
              alert("Pedido invalido, porfavor ingrese su codigo de envio");
              setValidarNroSeg(false);
            }
          });
      };
      consultaAPI();
    }
  }, [entradas.nroSeg]);

  return (
    <div>
      <Contenedor setUserState={() => props.setUserState(null)} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <img src={avatar} width="150" height="150" />
          <Typography
            component="h2"
            variant="h4"
            className={classes.colorSaludo}
          >
            ¡Hola @Usuario!
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(procesarFormulario)}
          >
            <TextFiled
              variant="filled"
              margin="normal"
              required
              fullWidth
              label="Codigo de envio"
              type="nroSeg"
              id="nroSeg"
              name="nroSeg"
              className={classes.colorTextField}
              inputProps={{ className: classes.colorTitulo }}
              InputLabelProps={{ className: classes.colorTitulo }}
              {...register("nroSeg", {
                required: { value: true, message: "Campo requerido" },
                minLength: {
                  value: 6,
                  message:
                    "El codigo de envio debe tener un minimo de 6 numeros",
                },
              })}
              placeholder="Ingrese codigo de envio"
            ></TextFiled>

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
        </div>
        {buttonClicked && entradas.nroSeg !== ""
          ? history.push({
              pathname: "/Pedido",
              state: entradas.nroSeg, // your data array of objects
            })
          : null}
        <Box mt={8}></Box>
      </Container>
    </div>
  );
};
export default SeguimientoEnvioForm;
