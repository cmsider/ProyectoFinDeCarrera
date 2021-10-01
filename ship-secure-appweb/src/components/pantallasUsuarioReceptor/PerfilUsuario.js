import React, { useState, useEffect, useRef } from "react";
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
import avatar from "../imagenes/avatar.png";
import { db, auth } from "../firebase";
import { useHistory } from "react-router-dom";
import {ScaleLoader} from 'react-spinners';
import Modal from "@material-ui/core/Modal";
import CheckIcon from "@material-ui/icons/Check";

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
  colorTitle: {
    color: "#FFFFFF",
    marginTop: 50,
    marginBlockEnd: 10,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  loadingButton:{
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    display: "flex",
  },
  colorIcon: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.background.default,
    width: 100,
    height: 100,
    borderRadius: 150,
    marginBlockEnd: 30,
    marginTop: 20,
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


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
export const PerfilUsuario = (props) => {
  const [user, setUser] = useState([]);
  var myJson = JSON.parse(localStorage.getItem("usuarios"));
  const [cambioPass, setCambioPass] = useState(false);


  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalStyle] = React.useState(getModalStyle);

  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();


  const contraseña = useRef({});
  contraseña.current = watch("contraseña", "");

  const history = useHistory();
  const redirect = (view) => {
    history.push(view);
  };
  
  const handleOpen = () => {
    setOpen(true);
    setLoading(false);
  };


  const handleClose = () => {
    setOpen(false);
    if(cambioPass){
    localStorage.removeItem('usuarios');
    props.setUserState();
    logout();
    }
    else{
    redirect("/editarPerfil");
    }
  };

  const logout = async () =>{
    await auth.signOut().then(() => {
      redirect("/");
    }).catch((error) => {
      // An error happened.
  });
  
  }

  const onSubmit = (data) => {

    setLoading(true);
   
    console.log(data.alias);
 
    if(data.alias){
    myJson["username"] = data.alias;
    localStorage.setItem("usuarios", JSON.stringify(myJson));
    }

    const updateAlias = () => {
      db.collection("usuarios")
        .doc(myJson["idUs"])
        .update({
          username: data.alias,
        })
        .then(() => {
          console.log("Actualizacion correcta!");
        });
       
    };

    if (progCheckbox) {
      const userAuth = auth.currentUser;
      const newPassword = data.contraseña;
      if(data.alias){
        
        userAuth
        .updatePassword(newPassword)
        .then(() => {
          //ESTO IRIA CUANDO ACEPTAS LA VENTANA MODAL
          setCambioPass(true);
          handleOpen();

        })
        .catch((error) => {
          // An error ocurred
          // ...
        });
        updateAlias();
     
      }else {
        userAuth
        .updatePassword(newPassword)
        .then(() => {
          handleOpen();
          setCambioPass(true);

          //ESTO IRIA CUANDO ACEPTAS LA VENTANA MODAL
 
        })
        .catch((error) => {
          // An error ocurred
          // ...
        
        });
      }
      handleOpen();
    
    } else {
      if(data.alias){
        updateAlias();
    
      }
      handleOpen();
    }
 
  };

  const [buttonClicked, setButtonClicked] = useState(false);
  const handleButtonClick = (event) => {
    console.log(localStorage.getItem("usuarios"));

    setButtonClicked(true);
  };
  const [progCheckbox, setProgCheckbox] = useState(false);

  return (
    <div>
      <Contenedor setUserState={() => props.setUserState(null)} />
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <Grid item xs={12}>
          <Typography variant="h5" className={classes.colorTitle}>
            Editar Perfil
          </Typography>

          <Divider className={classes.colorDivider} />
        </Grid>

        <div className={classes.paper}>
          <img src={avatar} width="150" height="150" />

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                  <Typography
                    variant="h6"
                    className={classes.colorLabel}
                    color="primary"
                  >
                    {myJson["nombre"]}
                  </Typography>
                  
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className={classes.props}
                    color="primary"
                  >
                    Apellidos
                  </Typography>
                  <Typography
                    variant="h6"
                    className={classes.colorLabel}
                    color="primary"
                  >
                    {myJson["apellido"]}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className={classes.props}
                    color="primary"
                  >
                    Email
                  </Typography>
                  <Typography
                    variant="h6"
                    className={classes.colorLabel}
                    color="primary"
                  >
                    {myJson["email"]}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body2"
                    className={classes.props}
                    color="primary"
                  >
                    Alias
                  </Typography>
                  <TextFiled
                    variant="filled"
                    margin="dense"
                    fullWidth
                    type="text"
                    id="alias"
                    name="alias"
                    color="primary"
                    label="Actualizar alias:"
                    defaultValue={myJson["username"]}
                    className={classes.textField}
                    InputLabelProps={{ className: classes.colorLabel }}
                    inputProps={{ className: classes.colorText }}
                    {...register("alias", {
                      minLength: {
                        value: 1,
                        message: "El alias ingresado no es valido",
                      },
                    })}
                    //onChangeCapture={handleInputChange}
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
                          type="password"
                          id="contraseña"
                          name="contraseña"
                          required
                          InputLabelProps={{ className: classes.colorLabel }}
                          inputProps={{ className: classes.colorText }}
                          //onChangeCapture={handleInputChange}
                          error={!!errors.nombres}
                          {...register("contraseña", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            minLength: {
                              value: 2,
                              message: "La contraseña debe tener mas de 2 caracteres",
                            },
                          })}
                        ></TextFiled>

                        <span className="text-danger text-small d-block mb-2">
                          {errors?.contraseña?.message}
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
                          type="password"
                          id="contraseña2"
                          name="contraseña2"
                          color="primary"
                          required
                          InputLabelProps={{ className: classes.colorLabel }}
                          inputProps={{ className: classes.colorText }}
                          SelectProps={{ className: classes.colorText }}
                          //onChangeCapture={handleInputChange}
                          {...register("contraseña2", {
                            required: {
                              value: true,
                              message: "Campo requerido",
                            },
                            validate: value =>
                              value === contraseña.current || "Las contraseñas no coinciden"
                          })}
                        ></TextFiled>

                        <span className="text-danger text-small d-block mb-2">
                          {errors?.contraseña2?.message}
                          {/*si da error en el nombre muestra el mensaje de error en nombre*/}
                        </span>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Grid>
            </div>

            <div className={classes.loadingButton}>
            {loading ? (
                            <ScaleLoader
                            size={150}
                            color={"#7FA3B5"}
                            loading={loading}
                            />
                        ) : (
                          <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Actualizar
              </Button>
                        )} 
              
            </div>
          </form>
       
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
                    ACTUALIZADO
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
                      Se actualizaron tus datos. Si modificaste tu contraseña, recordá que la próxima vez que ingreses al sistema tenés hacerlo con tu nueva clave.
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
            </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
};
export default PerfilUsuario;
