import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db, auth } from "../firebase";
import Canal from "../chatRepartidor/Canal";
import Button from "@material-ui/core/Button";
import {
  Container,
  CssBaseline,
  Typography,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";
import Contenedor from "../menuNavegacion/Contenedor";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Form } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import { LockRounded } from "@material-ui/icons";
import logo from '../imagenes/shipsecure.png'
import {ScaleLoader} from 'react-spinners';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    display: "flex",
  },
  colorText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: theme.spacing(3),
    marginBlockEnd: theme.spacing(5),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    colorText: "#FFFFFF",
    display: "grid",
  },
  submit: {
    background: "linear-gradient(45deg, #08AFA5 50%, #003648  90%)",
    margin: theme.spacing(3, 0, 2),
    color: "#FFFFFF",
    marginTop: theme.spacing(7),
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
  link1: {
    cursor: "pointer",
    textAlign: "right",
    color: "#FFFFFF",
    marginTop: theme.spacing(2),
  },
  contenedor: {
    display: "grid",
    flexDirection: "column",
    //margin: theme.spacing(1, 0, 1),
  },
  colorLabel: {
    color: "#7FA3B5",
  },
  colorTextLabel: {
    color: "#FFFFFF",
  },
}));

export const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);



  const override = `
  display: block;
  margin-left: 140px;
  border-color: red;
`;
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlerLogin = () => {

    setLoading(true);

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const {user} =  response;
                var data = {
                    _id: user.uid,
                    apellido: user.apellido,
                    email: user.email,
                    fechaNacimiento: user.fechaNacimiento,      
                    nombre:user.nombre,
                    username: user.username,
                    idUs: user.idUs,
                    puntos: user.puntos,
                    
                }
                

                const consultaAPI = async () => {
                  db.collection("usuarios")
                    .where("email", "==", data.email)
                    .get()
                    .then((querySnapshot) => {
                      querySnapshot.forEach((documentSnapshot) => {
                        const usuario = [];
                        usuario.push({
                          ...documentSnapshot.data(),
                          key: documentSnapshot.id,
                        });
                        console.log(usuario);
                        data.apellido = usuario[0].apellido;
                        data.fechaNacimiento = usuario[0].fechaNacimiento;
                        data.nombre = usuario[0].nombre;
                        data.username = usuario[0].username;
                        data.idUs = usuario[0].key;
                        data.puntos = usuario[0].puntos;

                        localStorage.setItem('usuarios', JSON.stringify(data));
                        const storage = localStorage.getItem('usuarios');
                        const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                        props.loggedIn(loggedInUser);
                        
                        handleClose();
                      });
                    });
                };

                consultaAPI();
                setLoading(false);
                
            }).catch(error => {
                toast.error(error.message)
                setLoading(false);
            });
  };

  const handleCheck = (event) => {
    setRememberMe(event.target.checked);
  };


  const history = useHistory();
  const redirect = (view) => {
    history.push(view);
  };

  const handleClose = () => {
    redirect("/home");
  };

  const [initializing, setInitializing] = useState(true);

  return (
  
      <div className={classes.paper}>

          <Grid container spacing={2} className={classes.paper}>
          <Grid item xs={6} justifyContent= "center"
    alignItems= "center"
    textAlign= "center"
    alignContent= "center"
    display= "grid" >
       
      <img src={logo} width="450" height="350"/>
      
      </Grid>
  
    <Grid item xs={4}>

        <ToastContainer/>
          <CssBaseline />
          <div display="grid">
            <Typography component="h5" variant="h5"  className={classes.colorText}>
              ¡Bienvenido a ShipSecure!
            </Typography>
            
            <ValidatorForm
              onSubmit={handlerLogin}
              onError={(errors) => {
                for (const err of errors) {
                  console.log(err.props.errorMessages[0]);
                }
              }}
              className={classes.form}
              >
                <Grid>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label= "Email"
                color= "primary"
                InputLabelProps={{ className: classes.colorLabel }}
                inputProps={{ className: classes.colorTextLabel }}
                onChange={handleEmail}
                name="email"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "La direccion de email es requerida",
                  "La direccion de email es invalida",
                ]}
                autoComplete="off"
                />
                 
              <TextValidator
                variant="outlined"
                fullWidth
                label="Contraseña"
                onChange={handlePassword}
                name="password"
                type="password"
                color= "primary"
                InputLabelProps={{ className: classes.colorLabel }}
                inputProps={{ className: classes.colorTextLabel }}
                value={password}
                validators={["required"]}
                errorMessages={["El password es un campo requerido"]}
                autoComplete="off"
                />
                </Grid>
                
                <Link
                    onClick={props.toggle}
                    className={classes.link1}
                    variant="body2"
                    textAlign="right"
                    >
                    { "¿Olvidaste tu contraseña?"}
                  </Link>  
              <Grid>
              {loading ? (
                            <ScaleLoader
                            size={150}
                            color={"#7FA3B5"}
                            loading={loading}
                            marginTop={"7"}
                            />
                        ) : (
                             <Button
                             type="submit"
                             fullWidth
                             variant="contained"
                             className={classes.submit}
                         >
                             Ingresar
                         </Button>
                        )}
                       
                        <p textAlign="center" className={classes.pointer}>No tienes cuenta?
                <Link
                    onClick={props.toggle}
                    className={classes.link}
                    variant="body2"
                    textAlign="center"
                    >
                    { " Registrate"}
                  </Link> 
                  </p>        
                  </Grid>
                  
            </ValidatorForm>
          </div>
      </Grid>
    </Grid>
  
    </div>
  );
};
export default Login;

