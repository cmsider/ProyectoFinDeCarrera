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
  Card,
  CardContent,
} from "@material-ui/core";
import { LockRounded } from "@material-ui/icons";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db, auth } from "../firebase";

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

  const register = () => {

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
                        fechaNacimiento: fechaNacimiento
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
            })
            .catch((error) => {

                var errorMessage = error.message;
                alert(errorMessage)
            });

        }
        else{
            alert('Las passwords no coinciden')
        }
    
}

  return (
    <Container component="main" maxWidth="sm" className ={classes.contenedor}>
      <Card className={classes.card}>
        <CardContent>
          <ToastContainer />
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockRounded />
            </Avatar>
            <Typography component="h1" variant="h6">
              Complete los datos de registro
            </Typography>

            <ValidatorForm className={classes.form}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label="Nombre"
                    onChange={handleNombre}
                    name="nombre"
                    type="text"
                    value={nombre}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    autoComplete="off"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label="Apellido"
                    onChange={handleApellido}
                    name="apellido"
                    type="text"
                    value={apellido}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type = "date"
                    onChange={handleFechaNac}
                    name="fechaNacimiento"
                    value={fechaNacimiento}
                    validators={["required", "isDate"]}
                    errorMessages={[
                      "this field is required",
                      "fecha is not valid",
                    ]}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                    onChange={handleEmail}
                    name="email"
                    value={email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      "this field is required",
                      "email is not valid",
                    ]}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label="Password"
                    onChange={handlePassword}
                    name="password"
                    type="password"
                    value={password}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                    autoComplete="off"
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextValidator
                    variant="outlined"
                    label="Confirm password"
                    fullWidth
                    onChange={handleConfirmPassowerd}
                    name="confirmPassword"
                    type="password"
                    validators={["isPasswordMatch", "required"]}
                    errorMessages={[
                      "password mismatch",
                      "this field is required",
                    ]}
                    value={confirmPassword}
                    autoComplete="off"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={register}
              >
                Registrarme
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    onClick={props.toggle}
                    className={classes.pointer}
                    variant="body2"
                  >
                    {"Ya tenes una cuenta? Ingresa!"}
                  </Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  contenedor: {
    display: "flex",
    flexDirection: "column",

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: "linear-gradient(45deg, #003648 50%, #08AFA5 90%)",
    margin: theme.spacing(3, 0, 2),
    color: "#FFFFFF",
  },
  card: {
    marginTop: "60px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "20px",
  },
  pointer: {
    cursor: "pointer",
    color: "#FFFFFF",
  },
}));
export default SignUp;
