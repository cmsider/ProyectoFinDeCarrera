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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
}));

const CrearEnvio = () => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /*
  const [entradas, setentradas] = useState({
    nombre: "",
    email: "",
    observaciones: "",
    subject: "",
  });

  const procesarFormulario = (data, e) => {
    console.log(data);
    setentradas(data);
    e.target.reset();
  };

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };
*/
  /*ENVIO DE MAIL*/

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
          <form onSubmit={sendEmail} className={classes.form}>
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
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  component="body2"
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
                  color="primary"
                  {...register("nombres", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El nombre ingresado no es valido",
                    },
                  })}
                  placeholder="Ingrese nombres"
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.nombres?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  component="body2"
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
                  component="body2"
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
                  }}
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
                  component="body2"
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
                <Divider />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  component="body2"
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
                  component="body2"
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
                  component="body2"
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
                  component="body2"
                  variant="body2"
                  className={classes.props}
                  color="secondary"
                >
                  Es envio programado?
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography
                  component="body2"
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
                    shrink: true,
                  }}
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
                  component="body2"
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
                  label="Ingrese hora de entrega"
                  type="time"
                  id="horaEntrega"
                  name="horaEntrega"
                  color="primary"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
                <Divider />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  component="body2"
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
                  component="body2"
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Tenmperatura
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  label="Ingrese temperatura "
                  type="Temperatura"
                  id="Temperatura"
                  name="Temperatura"
                  color="primary"
                  {...register("Temperatura", {
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Confirmar envio
              </Button>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};
export default CrearEnvio;
