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
  Avatar,
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
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    paddingLeft: "80px",
  },
  contenedor: {
    display: "flex",
    flexDirection: "column",
    marginTop: "-630px",
    paddingLeft: "850px",
    paddingRight: "-120px",
    paddingBottom: "20px",
  },
  posImg: {
    display: "flex",
    flexDirection: "column",
    marginTop: "70px",
    paddingLeft: "120px",
    paddingRight: "20px",
    paddingBottom: "20px",
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
                const data = {
                    _id: user.uid,
                    apellido: user.apellido,
                    email: user.email,
                    fechaNacimiento: user.fechaNacimiento,      
                    nombre:user.nombre,
                }
                localStorage.setItem('usuarios', JSON.stringify(data));
                const storage = localStorage.getItem('usuarios');
                const loggedInUser = storage !== null ? JSON.parse(storage) : null;
                props.loggedIn(loggedInUser);
                setLoading(false);
                handleClose();
            }).catch(error => {
                toast.error(error.message);
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


  
      <div   className ={classes.posImg} >
      <img src={logo} width="700" height="650"/>

      
    <Container component="main" maxWidth="lg" className ={classes.contenedor} >
      <Card className={classes.card}>
        <CardContent>
        <ToastContainer/>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Bienvenido a ShipSecure!
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
                  "La direccion de email es requerida",
                  "La direccion de email es invalida",
                ]}
                autoComplete="off"
                />
              <TextValidator
                variant="outlined"
                fullWidth
                label="Password"
                onChange={handlePassword}
                name="password"
                type="password"
                value={password}
                validators={["required"]}
                errorMessages={["El password es un campo requerido"]}
                autoComplete="off"
                />
              <FormControlLabel
                control={
                  <Checkbox
                  value={rememberme}
                  onChange={(e) => handleCheck(e)}
                  color="secondary"
                  />
                }
                label="Recordarme"
                />
              {loading ? (
                            <ScaleLoader
                            css={override}
                            size={150}
                            color={"#eb4034"}
                            loading={loading}/>
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
              <Grid container>
                <Grid item>

                  <Link
                    onClick={props.toggle}
                    className={classes.pointer}
                    variant="body2"
                    >
                    {"No tienes cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
            </ValidatorForm>
          </div>
        </CardContent>
      </Card>
    </Container>
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