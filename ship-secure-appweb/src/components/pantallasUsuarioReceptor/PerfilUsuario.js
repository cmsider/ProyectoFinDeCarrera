import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextFiled from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import Contenedor from "../menuNavegacion/Contenedor";
import { Divider } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import avatar from '../imagenes/avatar.png'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  colorTitle: {
    color: "#FFFFFF",
    marginTop: 50,
    marginBlockEnd: 10,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    textAlign: "center",
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

export const PerfilUsuario = (props) => {

  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [buttonClicked, setButtonClicked] = useState(false);
  const handleButtonClick = (event) => {
    console.log(localStorage.getItem('usuarios'));

    setButtonClicked(true);
  };
  const [progCheckbox, setProgCheckbox] = useState(false);
 
  return (
    <div>
      <Contenedor setUserState={() => props.setUserState(null)}/>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
      

        <Grid item xs={12}>
          <Typography variant="h5" className={classes.colorTitle}>
            Editar Perfil
          </Typography>
          
            <Divider className={classes.colorDivider} />
       
        </Grid>
 
        <div className={classes.paper}>
          <img src={avatar} width="150" height="150"/>
       
        
          <form
            className={classes.form}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={classes.paper}>
            <Grid container spacing={2}>
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
                  //onChangeCapture={handleInputChange}
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
                  Apellidos
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
                  //onChangeCapture={handleInputChange}
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
                  //onChangeCapture={handleInputChange}
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
                  //onChangeCapture={handleInputChange}
                  {...register("email", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 1,
                      message: "El nombre ingresado no es valido",
                    },
                  })}
                ></TextFiled>
               </Grid>
              <Grid container spacing={1}>
                <Grid item xs={3} style={{ padding: 18 }}>
                  <Typography
                    variant="body1"
                    className={(classes.props, classes.colorText)}
                  >
                    Quiero modificar mi contraseña
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
                <span className="text-danger text-small d-block mb-2">
                  {errors?.email?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
                
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
                  Nueva Contraseña
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="dense"
                  fullWidth
                  label="Nueva Contraseña"
                  type="string"
                  id="contraseña"
                  name="contraseña"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  //onChangeCapture={handleInputChange}
                  error={!!errors.nombres}
                  {...register("contraseña", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 2,
                      message: "La contraseña ingresada no es valida",
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
                  Repita Contraseña
                </Typography>
                <TextFiled
                  variant="filled"
                  margin="dense"
                  fullWidth
                  label="Repita contraseña"
                  type="contraseña2"
                  id="contraseña2"
                  name="contraseña2"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  SelectProps={{ className: classes.colorText }}
                  //onChangeCapture={handleInputChange}
                  {...register("contraseña2", {
                    required: { value: true, message: "Campo requerido" },
                    minLength: {
                      value: 2,
                      message: "La contraseña ingresada no es valida",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.apellidos?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nombre*/}
                </span>
              </Grid>
              </Grid>
            </div>
            )}
          
            </Grid>
            </div>

            <div className={classes.submit}>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            >
            Actualizar
            </Button>
            </div>
            
            
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
};
export default PerfilUsuario;
