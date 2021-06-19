import React, { useState } from "react";
import emailjs from "emailjs-com";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextFiled from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { db } from "./components/firebase";
import "firebase/firestore";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  colorLabel: {
    color: "#7FA3B5",
  },
  colorTextCheckBox: {
    color: "#FFFFFF",
  },
  colorDivider: {
    background: "#E07D7E",
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const CrearEnvio = () => {
  /*BASE DE DATOS */
  const history = useHistory();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const redirect = (view) => {
    history.push(view);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    redirect("/home");
  };

  const [datos, setDatos] = useState({
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    email: "",
    direccion: "",
    piso: "",
    observaciones: "",
    fechaEntrega: "",
    horaEntrega: "",
    peso: "",
    temperatura: "",
    codEnvio: (100000 + Math.floor(Math.random() * 900000)).toString(),
  });

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };
  const enviarDatos = (event) => {
    event.preventDefault();
  };

  const addEnvio = () => {
    db.collection("envios").doc(datos.codEnvio).set({
      id: datos.codEnvio,
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      fechaNacimiento: datos.fechaNacimiento,
      email: datos.email,
      direccion: datos.direccion,
      piso: datos.piso,
      localidad: "",
      codigoPostal: "",
      provincia: "",
      observaciones: datos.observaciones,
      fechaEntrega: datos.fechaEntrega,
      horaEntrega: datos.horaEntrega,
      peso: datos.peso,
      temperatura: datos.temperatura,

      //estos campos seran necesarios luego para asignar un repartidor, una smartbox
      usuarioCreado: false,
      idSmartBox: "",
      idRepartidor: "",
    });
    console.log(datos.codEnvio);
  };

  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "shipSecure_service",
        "template_x2s995n",
        e.target,
        "user_JYv6ZEZaGzGODUvHJ9tRm"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  /* */

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <form
            className={classes.form}
            onSubmit={(e) => {
              sendEmail(e);
              handleSubmit(enviarDatos);
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  component="h6"
                  variant="h6"
                  className={classes.props}
                  color="secondary"
                >
                  DATOS DE CONTACTO
                </Typography>
                <Divider className={classes.colorDivider} />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Nombres
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese nombres"
                  type="nombres"
                  id="nombres"
                  name="nombres"
                  InputLabelProps={{ className: classes.colorLabel }}
                  onChangeCapture={handleInputChange}
                  {...register("nombres", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El nombre ingresado no es valido",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.nombres?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Apeliidos
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese apellidos"
                  type="apellidos"
                  id="apellidos"
                  name="apellidos"
                  color="primary"
                  InputLabelProps={{ className: classes.colorLabel }}
                  onChangeCapture={handleInputChange}
                  {...register("apellidos", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El apellidos ingresado no es valido",
                    },
                  })}
                  placeholder="Ingrese apellidos"
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.apellidos?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Fecha de nacimiento
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese fecha de nacimiento"
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  color="primary"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                    className: classes.colorLabel,
                  }}
                  onChangeCapture={handleInputChange}
                  {...register("fechaNacimiento", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "Fecha ingresada no es valida",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.fechaNacimiento?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Email
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese correo electrónico"
                  type="email"
                  id="email"
                  name="email"
                  color="primary"
                  InputLabelProps={{ className: classes.colorLabel }}
                  onChangeCapture={handleInputChange}
                  {...register("email", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El nombre ingresado no es valido",
                    },
                  })}
                  placeholder="Ingrese correo electronico"
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.email?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  component="h6"
                  variant="h6"
                  className={classes.props}
                  color="secondary"
                >
                  DATOS DE ENVÍO
                </Typography>
                <Divider className={classes.colorDivider} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Dirección
                </Typography>

                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese dirección"
                  type="direccion"
                  id="direccion"
                  name="direccion"
                  color="primary"
                  InputLabelProps={{ className: classes.colorLabel }}
                  onChangeCapture={handleInputChange}
                  {...register("direccion", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El nombre ingresado no es valido",
                    },
                  })}
                  placeholder="Ingrese direccion"
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.direccion?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Piso/Departamento
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese piso/departamento"
                  type="piso"
                  id="piso"
                  name="piso"
                  color="primary"
                  InputLabelProps={{ className: classes.colorLabel }}
                  onChangeCapture={handleInputChange}
                  {...register("piso", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El piso ingresado no es valido",
                    },
                  })}
                  placeholder="Ingrese piso"
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.email?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Observaciones
                </Typography>

                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Observaciones"
                  type="observaciones"
                  id="observaciones"
                  name="observaciones"
                  color="primary"
                  InputLabelProps={{ className: classes.colorLabel }}
                  onChangeCapture={handleInputChange}
                  {...register("observaciones", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "Las observaciones ingresadas no son validas",
                    },
                  })}
                  placeholder="Ingrese observaciones "
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.observaciones?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid item xs={12}>
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <Typography
                  variant="body2"
                  className={(classes.props, classes.colorTextCheckBox)}
                >
                  Es envio programado?
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Fecha de entrega
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese fecha de Entrega"
                  type="date"
                  id="fechaEntrega"
                  name="fechaEntrega"
                  color="primary"
                  className={classes.textField}
                  InputLabelProps={{
                    className: classes.colorLabel,
                    shrink: true,
                  }}
                  onChangeCapture={handleInputChange}
                  {...register("fechaEntrega", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "Fecha ingresada no es valida",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.fechaEntrega?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Hora de entrega
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese hora de entrega"
                  type="time"
                  id="horaEntrega"
                  name="horaEntrega"
                  color="primary"
                  className={classes.textField}
                  InputLabelProps={{
                    className: classes.colorLabel,
                    shrink: true,
                  }}
                  onChangeCapture={handleInputChange}
                  {...register("horaEntrega", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "La hora ingresada no es valida",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.horaEntrega?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid item xs={12}>
                <Typography
                  component="h6"
                  variant="h6"
                  className={classes.props}
                  color="secondary"
                >
                  DATOS DEL PEDIDO
                </Typography>
                <Divider className={classes.colorDivider} />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Peso
                </Typography>

                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese peso"
                  type="peso"
                  id="peso"
                  name="peso"
                  color="primary"
                  InputLabelProps={{ className: classes.colorLabel }}
                  onChangeCapture={handleInputChange}
                  {...register("peso", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El peso ingresado no es valido",
                    },
                  })}
                  placeholder="Ingrese peso"
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.peso?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Temperatura
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese temperatura "
                  type="temperatura"
                  id="temperatura"
                  name="temperatura"
                  color="primary"
                  InputLabelProps={{ className: classes.colorLabel }}
                  onChangeCapture={handleInputChange}
                  {...register("temperatura", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El piso ingresado no es valido",
                    },
                  })}
                  placeholder="Ingrese Temperatura"
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.email?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>
              <Grid item xs={4}>
                {" "}
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    addEnvio();
                    handleOpen();
                  }}
                >
                  Confirmar envío
                </Button>
              </Grid>
            </Grid>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper2}>
                <h2 id="simple-modal-title">Envio creado</h2>
                <p id="simple-modal-description">
                  Envio creado satisfactoriamente!
                </p>
              </div>
            </Modal>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default CrearEnvio;

/*
              onClick={addEnvio}

      .sendForm(
        "shipSecure_service",
        "template_x2s995n",
        e.target,
        "user_JYv6ZEZaGzGODUvHJ9tRm"
      )
onSubmit={(e) => {
              sendEmail(e);
              handleSubmit(enviarDatos);
            }}*/
