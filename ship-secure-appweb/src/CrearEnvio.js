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
import CheckIcon from "@material-ui/icons/Check";
import ContenedorCYR from "./components/menuNavegacionCYR/ContenedorCYR";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
  },
  colorIcon: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.background.default,
    width: 100,
    height: 100,
    borderRadius: 150,
    marginBlockEnd: 30,
    marginTop: 10,
  },
  colorTitle: {
    color: "#FFFFFF",
    marginTop: 10,
    marginBlockEnd: 10,
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
  colorText: {
    color: "#FFFFFF",
  },
  checkbox: {
    color: "#7FA3B5",
    margin: theme.spacing(0, -5, 0),
  },
  colorDivider: {
    background: "#E07D7E",
  },
  colorFondo: {
    background: "#003648",
    backgroundColor: "#003648",
    border: "#003648",
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

  const [progCheckbox, setProgCheckbox] = useState(false);

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

  //const [validacionTrue, setValidacionTrue] = useState(false);

 // const [isLoading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };
  //const enviarDatos = (event) => {
    //  event.preventDefault();
    //event.target.reset();
  //};

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
    // handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleSubmit = (e) => {
    // HERE: you always want to prevent default, so do this first
    e.preventDefault();
    if (!isFormValid()) {
      //message of error in the screen, maybe sweet alerts
      alert("Faltan campos por llenar");
      console.log("falta algo");
    } else {
      addEnvio();
      handleOpen();
      sendEmail(e);
    }
  };

  const isFormValid = () => {
    if (!datos.nombres || !datos.email || !datos.direccion) {
      return false;
    } else {
      return true;
    }
  };

  const sendEmail = (e) => {
    //  e.preventDefault();

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
    //e.target.reset();
  };
  /* */

  return (
    <div>
      <ContenedorCYR/>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
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
                  margin="dense"
                  fullWidth
                  label="Ingrese nombres"
                  type="string"
                  id="nombres"
                  name="nombres"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  error={!!errors.nombres}
                  {...register("nombres", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 2,
                      message: "El nombre ingresado es demasiado corto",
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
                  margin="dense"
                  fullWidth
                  label="Ingrese apellidos"
                  type="apellidos"
                  id="apellidos"
                  name="apellidos"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  SelectProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  {...register("apellidos", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 2,
                      message: "El apellidos ingresado no es valido",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.apellidos?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nombre*/}
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
                  margin="dense"
                  fullWidth
                  label="Ingrese fecha de nacimiento"
                  type="date"
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  color="primary"
                  required
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                    className: classes.colorLabel,
                  }}
                  inputProps={{ className: classes.colorText }}
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
                  margin="dense"
                  fullWidth
                  label="Ingrese correo electrónico"
                  type="email"
                  id="email"
                  name="email"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  {...register("email", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El nombre ingresado no es valido",
                    },
                  })}
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
                  margin="dense"
                  fullWidth
                  label="Ingrese dirección"
                  type="direccion"
                  id="direccion"
                  name="direccion"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  {...register("direccion", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El nombre ingresado no es valido",
                    },
                  })}
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
                  margin="dense"
                  fullWidth
                  label="Ingrese piso/departamento"
                  type="piso"
                  id="piso"
                  name="piso"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  {...register("piso", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El piso ingresado no es valido",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.email?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Localidad
                </Typography>

                <TextFiled
                  variant="filled"
                  margin="dense"
                  fullWidth
                  label="Ingrese localidad"
                  type="localidad"
                  id="localidad"
                  name="localidad"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  {...register("localidad", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El nombre ingresado no es valido",
                    },
                  })}
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
                  Código Postal
                </Typography>

                <TextFiled
                  variant="filled"
                  margin="dense"
                  fullWidth
                  label="Ingrese Código Postal"
                  type="codigoPostal"
                  id="codigoPostal"
                  name="codigoPostal"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  {...register("direccion", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El nombre ingresado no es valido",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.cp?.message}
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
                  fullWidth
                  label="Observaciones"
                  type="observaciones"
                  id="observaciones"
                  name="observaciones"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  {...register("observaciones", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "Las observaciones ingresadas no son validas",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.observaciones?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={5} style={{ padding: 18 }}>
                  <Typography
                    variant="body1"
                    className={(classes.props, classes.colorText)}
                  >
                    Es envío programado?
                  </Typography>
                </Grid>

                <Checkbox
                  color="primary"
                  id="progCheckbox"
                  checked={progCheckbox}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  value="1"
                  className={(classes.props, classes.checkbox)}
                  onClick={() => setProgCheckbox(!progCheckbox)}
                />
              </Grid>
              {progCheckbox && (
                <div
                  style={{
                    display: "flex",
                    padding: 11,
                    width: "100%",
                    alignItems: "center",
                    alignContent: "space-between",
                  }}
                >
                  <Grid container spacing={2}>
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
                        FormHelperTextProps={{ className: classes.colorText }}
                        inputProps={{ className: classes.colorText }}
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
                        inputProps={{ className: classes.colorText }}
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
                  </Grid>
                </div>
              )}

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
                  margin="dense"
                  fullWidth
                  label="Ingrese peso"
                  type="peso"
                  id="peso"
                  name="peso"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  {...register("peso", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El peso ingresado no es valido",
                    },
                  })}
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
                  margin="dense"
                  fullWidth
                  label="Ingrese temperatura "
                  type="temperatura"
                  id="temperatura"
                  name="temperatura"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange}
                  {...register("temperatura", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El piso ingresado no es valido",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.email?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>
              <Grid item xs={4}>
                <input
                  size="1"
                  maxLength="1"
                  type="hidden"
                  className={classes.colorFondo}
                  {...register("codEnvio")}
                  readOnly="readOnly"
                />
              </Grid>

              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    console.log("onclick");
                    setValue("codEnvio", datos.codEnvio);
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
                <div style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <CheckIcon
                    className={(classes.props, classes.colorIcon)}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  ></CheckIcon>

                  <h4
                    id="simple-modal-title"
                    className={(classes.props, classes.colorTitle)}
                  >
                    ENVÍO CREADO
                  </h4>

                  <Divider
                    className={classes.colorDivider}
                    style={{ marginTop: 30 }}
                  />

                  <p style={{ marginTop: 30, marginBlockEnd: 40 }}>
                    <Typography
                      variant="body2"
                      className={(classes.props, classes.colorText)}
                    >
                      En unos instantes le llegará un correo al mail del
                      contacto con el comprobante y los datos para acceder a su
                      cuenta.
                    </Typography>
                  </p>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Aceptar
                  </Button>
                </div>
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
/*  onSubmit={(e) => handleSubmit(e)} */
