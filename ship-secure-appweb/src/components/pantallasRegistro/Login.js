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
  
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(-10),
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

                        localStorage.setItem('usuarios', JSON.stringify(data));
                        const storage = localStorage.getItem('usuarios');
                        const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                        props.loggedIn(loggedInUser);
                        setLoading(false);
                        handleClose();
                      });
                    });
                };
                consultaAPI();

                
            }).catch(error => {
                toast.error(error.message)
                setLoading(false);
            });
  };

  const handleCheck = (event) => {
    setRememberMe(event.target.checked);
  };
  ///MIO DEL CHAT///

  const history = useHistory();
  const redirect = (view) => {
    history.push(view);
  };

  const handleClose = () => {
    redirect("/home");
  };

  //const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);
/*
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        });
}

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((userAuth) => {
    if (userAuth!= '') {
      console.log("Logueo");
      setLoading(false);

    } else {
      setLoading(false);
      console.log("NOLOGEO");

    }
    if (initializing) {
      setInitializing(false);
      setLoading(false);
    }
  });
  return unsubscribe;
}, []);
*/


  ///FIN DE LO MIO DEL CHAT///

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
                <Grid> 
              {loading ? (
                            <ScaleLoader
                            size={150}
                            alignItems={"center"}
                            alignContent={"center"}
                            justifyContent={"center"}
                            color={"#7FA3B25"}
                            marginTop={"7"}
                            loading={loading}
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
                       </Grid>
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
              
           
            </ValidatorForm>
          </div>
      </Grid>
    </Grid>
  
    </div>
  );
};
export default Login;

/*



export const Login = () => {
  
  const history = useHistory();
  const redirect = (view) => {
    history.push(view);
  };

  const handleClose = () => {
    redirect("/home");
  };

  const [user,setUser] = useState(()=> auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>{
      if (user){
        setUser(user);
      }else {
        setUser(null);
      }
      if(initializing){
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);


  const signInWithGoogle = async () => {
    
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();
    try{
      await auth.signInWithPopup(provider);
    }catch(error){
      console.error(error);
    }

};

const signOut = async () => {
    
  try{
    await firebase.auth().signOut()
  }catch(error){
    console.error(error.message);
  }

}

if(initializing) return "Loading... ";

  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          handleClose();
        }}
      >
        Ingresar al home
      </Button>

        {user ? (
          <>
          <Button onClick={signOut} variant="contained"
        color="primary">Sign out</Button>
          <p>'Bienvenidos al chat de ShipSecure'</p>
          <Canal user= {user} db = {db}/>
          </>
          ) : (
      <Button
        onClick = {signInWithGoogle}
        variant="contained"
        color="primary"
        
      >
        Ingresar al chat (por ahora solo para probarlo)
      </Button>
          )}

    </div>
  );
};
export default Login;

*/


/*

 useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (initializing) return "Loading... ";

  */