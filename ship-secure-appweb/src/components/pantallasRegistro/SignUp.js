import React, { useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Button,
  Grid,
  Link,
  makeStyles,
  FormControlLabel,
  Card,
  CardContent,
} from "@material-ui/core";
import { LockRounded } from "@material-ui/icons";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Checkbox from "@material-ui/core/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db, auth } from "../firebase";
import {ScaleLoader} from 'react-spinners';


const SignUp = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageURL, setImageUrl] = useState('');
  const [fechaNacimiento, setAFechaNacimiento] = useState("");
  const entityRef = db.collection('usuarios')

  const [loading, setLoading] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleNombre = (event) => {
    setNombre(event.target.value);
  };
  const handleApellido = (event) => {
    setApellido(event.target.value);
  };
  const handleFechaNac = (event) => {
    setAFechaNacimiento(event.target.value);
  };
  const handleConfirmPassowerd = (event) => {
    setConfirmPassword(event.target.value);
  };

  

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
    
      if (value !== password) {
        return false;
      }
      return true;
    });
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
   
  }, [password]);

  
  const [progCheckbox, setProgCheckbox] = useState(false);


  const register = () => {
    setLoading(true);
      if(progCheckbox){
        if(password === confirmPassword){

            auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Logueado 
                var user = userCredential.user;
                user.updateProfile({
                    displayName: nombre,
                    photoURL: imageURL ? imageURL : "https://www.trackergps.com/canvas/images/icons/avatar.jpg"
                }).then(function () {
                    // Update successful. Persistimos los datos del usuario en firebase
                    entityRef.add({
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        fechaNacimiento: fechaNacimiento,
                        puntos: 0,
                        username: nombre,
                    })

                }).catch(function (error) {
                    // An error happened.
                });
                // ...
                auth.signOut().then(() => {
                    // Sign-out successful.
                    props.toggle();
          toast.success("User Registered Successfully");
                    alert('Cuenta creada con éxito, ingresa con tus datos')
                }).catch((error) => {
                    // An error happened.
                });
                setLoading(false);
            })
            .catch((error) => {

                var errorMessage = error.message;
                alert(errorMessage);
                setLoading(false);
            });
          
           
        }
        else{
            alert('Las passwords no coinciden')
            setLoading(false);
        }
      }
      else{
        alert('Debe aceptar los terminos y condiciones para registrarse')
            setLoading(false);

      }
}

  return (
    <div>
    <Container component="main" maxWidth="md">
   
       <CssBaseline />
          
    
          <div className={classes.paper2}>
          <h4
                    className={classes.colorTitle}
                  >
                    ¡Bienvenido!
                  </h4>
                  <h6
                    className={classes.props, classes.colorSubtitulo}
                  >
                     Registrate en ShipSecure:
                  </h6>
                 

            <ValidatorForm className={classes.form}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Nombres
                </Typography>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label="Ingrese Nombres"
                    onChange={handleNombre}
                    margin="dense"
                    InputLabelProps={{ className: classes.colorLabel }}
                    inputProps={{ className: classes.colorTextLabel }}
                    name="nombre"
                    type="text"
                    required
                    value={nombre}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Apellidos
                </Typography>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label="Ingrese Apellidos"
                    margin="dense"
                    onChange={handleApellido}
                    InputLabelProps={{ className: classes.colorLabel }}
                    inputProps={{ className: classes.colorTextLabel }}
                    name="apellido"
                    type="text"
                    value={apellido}
                    required
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Fecha de nacimiento
                </Typography>
                  <TextValidator
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    type = "date"
                    onChange={handleFechaNac}
                    name="fechaNacimiento"
                    required
                    value={fechaNacimiento}
                    InputLabelProps={{ className: classes.colorLabel }}
                    inputProps={{ className: classes.colorTextLabel }}
                    validators={["required", "isDate"]}
                    errorMessages={[
                      "this field is required",
                      "fecha is not valid",
                    ]}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Email
                </Typography>
                  <TextValidator
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    label="Email"
                    onChange={handleEmail}
                    name="email"
                    value={email}
                    InputLabelProps={{ className: classes.colorLabel }}
                    inputProps={{ className: classes.colorTextLabel }}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid",
                    ]}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Contraseña
                </Typography>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label="Ingrese Contraseña"
                    onChange={handlePassword}
                    name="password"
                    type="password"
                    margin="dense"
                    InputLabelProps={{ className: classes.colorLabel }}
                    inputProps={{ className: classes.colorTextLabel }}
                    value={password}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6}>
                <Typography
                  variant="body2"
                  className={classes.props}
                  color="primary"
                >
                  Repita Contraseña
                </Typography>
                  <TextValidator
                    variant="outlined"
                    label="Repita su contraseña"
                    fullWidth
                    onChange={handleConfirmPassowerd}
                    name="confirmPassword"
                    type="password"
                    margin="dense"
                    InputLabelProps={{ className: classes.colorLabel }}
                    inputProps={{ className: classes.colorTextLabel }}
                    validators={["isPasswordMatch", "required"]}
                    errorMessages={[
                      "password mismatch",
                      "this field is required",
                    ]}
                    value={confirmPassword}
                    autoComplete="off"
                  />
                  </Grid>
                 <Grid item xs={12}>
                <FormControlLabel
                control={
                  <Checkbox
                  className= {classes.checkbox}
                  id="progCheckbox"
                  backgourdColor="#E07D7E"
                  onClick={() => setProgCheckbox(!progCheckbox)}
                  />
                 
                }
                required
                label="Acepto Terminos del Servicio y Politicas de Privacidad."
                className={classes.checkbox}
                />
                </Grid>
                </Grid>
                <div className={classes.loadingButton} >
              {loading ? (
                            <ScaleLoader
                            size={150}
                            alignItems={"center"}
                            alignContent={"center"}
                            justifyContent={"center"}
                            color={"#7FA3B5"}
                            loading={loading}
                            />
                        ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={register}

              >
                Registrarme
              </Button>
              )}
            </div>
           <Grid>
              <p textAlign="center" className={classes.pointer}>Ya tienes cuenta?
                <Link
                    onClick={props.toggle}
                    className={classes.link}
                    variant="body2"
                    textAlign="center"
                    >
                    { " Ingresa"}
                  </Link> 
                  </p> 
                  </Grid> 
                 
            </ValidatorForm>
           
          </div> 
    </Container>
    </div> 
  );
};

const useStyles = makeStyles((theme) => ({
  paper2: {
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[10],
    padding: theme.spacing(4, 4, 3),
    display: "flex",
    flexDirection: "column",
  },
  colorTitle: {
    color: "#FFFFFF",
    margin: theme.spacing(1, 0, 1),
    textAlign: "center"
  },
  colorSubtitulo: {
    color: "#FFFFFF",
    margin: theme.spacing(4, 0, 1),
  },
  pointer: {
    cursor: "pointer",
    textAlign: "center",
    color: "#FFFFFF",
  },
  link: {
    cursor: "pointer",
    textAlign: "center",
    color: "#E07D7E",
  },
  checkbox: {
    color: "#E07D7E",
    textAlign: "left",
    justifyContent: "left",
    alignItems: "left",
    alignContent: "left",
    margin: theme.spacing(2, 0, 2),
  },
  loadingButton:{
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    display: "flex",
  },
  colorLabel: {
    color: "#7FA3B5",
  },
  colorTextLabel: {
    color: "#FFFFFF",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: "linear-gradient(45deg, #08AFA5 50%, #003648  90%)",
    margin: theme.spacing(1, 0, 2),
    color: "#FFFFFF",
  },

}));
export default SignUp;
