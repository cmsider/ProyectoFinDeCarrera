import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextFiled from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core/";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { db, rt } from "./components/firebase";
import Select from "@material-ui/core/Select"
import "firebase/firestore";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import CheckIcon from "@material-ui/icons/Check";
import ContenedorCYR from "./components/menuNavegacionCYR/ContenedorCYR";
import {ScaleLoader} from 'react-spinners';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import region from './components/pantallasUsuarioCreador/regiones.json';
import moment from 'moment'
import 'moment/locale/es'



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
  paper3: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
  },
  colorIconCheck: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.background.default,
    width: 100,
    height: 100,
    borderRadius: 150,
    marginBlockEnd: 30,
    marginTop: 10,
  },
  colorOpciones: {
    backgroundColor: "#003648",
    color: "#FFFFFF",
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
  loadingButton:{
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    alignContent: "center",
    display: "flex",
  },
  colorTitle: {
    color: "#FFFFFF",
    marginTop: 10,
    marginBlockEnd: 10,
  },
  link: {
    cursor: "pointer",
    marginTop: theme.spacing(2),
    color: "#FFFFFF",
    alingText: "Right"
  },
  icon: {
    
    marginRight: theme.spacing(1),
    color: "#FFFFFF",
    alingText: "Right"
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
  colorCombo: {
    marginTop: theme.spacing(1),
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
var precio = 700.00;

const CrearEnvio = (props) => {
  /*BASE DE DATOS */
  const history = useHistory();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openCosto, setOpenCosto] = useState(false);
  const [costoTotal, setCostoTotal] = useState(700.00);
  const redirect = (view) => {
    history.push(view);
  };

  const handleOpenCosto = () => {
    setOpenCosto(true);
  };


  const handleCloseCosto = () => {
    setOpenCosto(false);
  
  };

  const [date, setDate] = useState(new Date(Date.now() + (5 * 86400000)));
  const [desc, setDesc] = useState([]);
  var myJson = JSON.parse(localStorage.getItem("usuarios"));


  const [loading, setLoading] = useState(false);
	
  //const [precio, setPrecio] = useState(0.00);

  const [progCheckbox, setProgCheckbox] = useState(false);

  const handleOpen = () => {
    setLoading(false);
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
    provincia: "",
    temperatura: "",
    codigoPostal: "",
    localidad: "",
    codEnvio: (100000 + Math.floor(Math.random() * 900000)).toString(),
  });



  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };
  const handleInputChange2 = (event) => {
    const actualizarInfo = async () => {
      setDatos({
        ...datos,
        [event.target.name]: event.target.value,
      });
      console.log(event.target.value);
    }
    actualizarInfo();

    //console.log(precio);
  };



  const addEnvio = () => {
    var fechaEnvio;
    if(progCheckbox){      
      fechaEnvio = datos.fechaEntrega;
    }
    else{
      fechaEnvio =  (date.getDate()>9? date.getDate() : "0" + date.getDate()) + "/" + (date.getMonth()>9? date.getMonth() : "0" + date.getMonth()) + "/" + date.getFullYear() ;
    }
    db.collection("envios").doc(datos.codEnvio).set({
      id: datos.codEnvio,
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      fechaNacimiento: moment(datos.fechaNacimiento).locale('es').format('L'),
      email: datos.email,
      direccion: datos.direccion,
      piso: datos.piso,
      localidad: datos.localidad,
      codigoPostal: datos.codigoPostal,
      provincia: datos.provincia,
      observaciones: datos.observaciones,
      fechaEntrega: moment(fechaEnvio).locale('es').format('L'),
      horaEntrega: datos.horaEntrega,
      peso: datos.peso,
      temperatura: datos.temperatura,
      costo: precio,

      //estos campos seran necesarios luego para asignar un repartidor, una smartbox
      usuarioCreado: false,
      idSmartBox: "",
      idRepartidor: "",
      emailRepartidor: "juanmarivero@gmail.com",
    });
    rt.ref('/envio').update({
      idQR: datos.codEnvio,
      puerta: true,
      temperatura: parseInt(datos.temperatura)
  })
  rt.ref('/notificacion').update({
    idPedido: datos.codEnvio,
    fueReprogramado: false,
    emailRepartidor:"juanmarivero@gmail.com" 
})
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
    setLoading(true);
    if (!isFormValid()) {
      //message of error in the screen, maybe sweet alerts
      alert("Faltan campos por llenar");
      console.log("falta algo");
    
    } else {
    addEnvio();
    onSubmitPuntos();
    sendEmail(e);

    handleOpen();
    }
  };

  const isFormValid = () => {
    if (!datos.nombres || !datos.email || !datos.direccion) {
      return false;
    } else {

      calcularEnvio();
      //setCostoTotal(precio);
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
          setLoading(false); 
      handleOpen();  
        },
        (error) => {
          console.log(error.text);
          setLoading(false); 
          alert("Error al enviar el correo");
        }
      );
      
    //e.target.reset();
  };
  /* CALCULO DE PUNTOS Y DESCUENTOS*/

  const calcularEnvio = () => {
        
    var costoEnvio = 0.00;
    if(datos.peso >= 30){
      costoEnvio += 1000.00;
    }else if(datos.peso >=15){
      costoEnvio += 700.00;
    }
    else{
      costoEnvio += 500.00;
    }
    if(region[datos.provincia] === "R1"){
        costoEnvio = costoEnvio + 200.00;
    }
    else if(region[datos.provincia] === "R2"){
        costoEnvio = costoEnvio + 350.00;
    }
    else if(region[datos.provincia] === "R3"){
        costoEnvio = costoEnvio + 450.00;
    }
    else if(region[datos.provincia] === "R4"){
        costoEnvio = costoEnvio + 600.00;
    }
    else{
        costoEnvio = costoEnvio + 700.00;
    }
    if(progCheckbox){

    costoEnvio = costoEnvio + 200.00;
    }
    console.log(costoEnvio);

    //costo envio = costoRegion + costoCaja - desc + programado (si tiene)
    precio = costoEnvio * (1-desc/100.00);
    costoEnvio = costoEnvio * (1-desc/100.00);
    console.log(desc);

    setCostoTotal(costoEnvio);

    //console.log(precio);
  }


  
  useEffect(() => {

const consultaAPI = async () => {
  actualizarBeneficios();
  calcularEnvio();
}
consultaAPI();
}, [handleInputChange2]);

const actualizarBeneficios = () =>{
  if(  myJson["puntos"] < 10 ){
    setDesc(5);
  }else if ( myJson["puntos"] >= 10 &&  myJson["puntos"] < 30){
    setDesc(10);
  }else if ( myJson["puntos"] >= 30 &&  myJson["puntos"] < 50){
    setDesc(15);
  }else if ( myJson["puntos"] >= 50 &&  myJson["puntos"] < 70){
    setDesc(20);
  }else if ( myJson["puntos"] >= 70 &&  myJson["puntos"] <90){
    setDesc(30);
  }else if ( myJson["puntos"] >= 90){
    setDesc(50);
  }
}

const onSubmitPuntos = () => {

  myJson["puntos"] = myJson["puntos"] +5;

  localStorage.setItem("usuarios", JSON.stringify(myJson));



  const updatePuntos = () => {

    db.collection("usuarios")

      .doc(myJson["idUs"])

      .update({

        puntos: myJson["puntos"],

      })

      .then(() => {

        console.log("Actualizacion correcta!");

      });

     

  };

  updatePuntos();

}


  /* FIN DE CALCULO DE PUNTOS Y DESCUENTOS */

  return (
    <div>
      <ContenedorCYR setUserState={() => props.setUserState(null)}/>
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
                  Provincia
                </Typography>

              <div className = {classes.colorCombo}>
  
              
<Select
displayEmpty
native
variant="filled"
margin="dense"
fullWidth
name = "provincia"
onChangeCapture={handleInputChange2}
inputProps={{ className: classes.colorLabel }}
required
>
<option selected disabled value="" >Seleccione provincia *</option>
<option className={classes.colorOpciones} value="Buenos Aires">Buenos Aires</option>
<option className={classes.colorOpciones} value="Catamarca">Catamarca</option>
<option className={classes.colorOpciones} value="Chaco">Chaco</option>
<option className={classes.colorOpciones} value="Chubut">Chubut</option>
<option className={classes.colorOpciones} value="Córdoba">Córdoba</option>
<option className={classes.colorOpciones} value="Corrientes">Corrientes</option>
<option className={classes.colorOpciones} value="Entre Ríos">Entre Ríos</option>
<option className={classes.colorOpciones} value="Formosa">Formosa</option>
<option className={classes.colorOpciones} value="La Pampa">La Pampa</option>
<option className={classes.colorOpciones} value="La Rioja">La Rioja</option>
<option className={classes.colorOpciones} value="Mendoza">Mendoza</option>
<option className={classes.colorOpciones} value="Misiones">Misiones</option>
<option className={classes.colorOpciones} value="Neuquén">Neuquén</option>
<option className={classes.colorOpciones} value="Río Negro">Río Negro</option>
<option className={classes.colorOpciones} value="Salta">Salta</option>
<option className={classes.colorOpciones} value="San Juan">San Juan</option>
<option className={classes.colorOpciones} value="San Luis">San Luis</option>
<option className={classes.colorOpciones} value="dumpling">Santa Cruz</option>
<option className={classes.colorOpciones} value="Santa Fe">Santa Fe</option>
<option className={classes.colorOpciones} value="Santiago del Estero">Santiago del Estero</option>
<option className={classes.colorOpciones} value="Tierra del Fuego">Tierra del Fuego</option>
<option className={classes.colorOpciones} value="Tucumán">Tucumán</option>
</Select>
</div>
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
                  {...register("codigoPostal", {
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



                <Grid item xs={6} style={{ padding: 18 }}>
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
                  label="Ingrese peso en gramos(g)"
                  type="peso"
                  id="peso"
                  name="peso"
                  color="primary"
                  required
                  InputLabelProps={{ className: classes.colorLabel }}
                  inputProps={{ className: classes.colorText }}
                  onChangeCapture={handleInputChange2}
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
                  label="Ingrese temperatura en C°"
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
                      message: "La temperatura ingresada no es valida",
                    },
                  })}
                ></TextFiled>

                <span className="text-danger text-small d-block mb-2">
                  {errors?.email?.message}
                  {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
                </span>
              </Grid>
              <Grid >
              <MonetizationOnIcon className={classes.icon}/>
              <Link
                    onClick={handleOpenCosto}
                    className={classes.link}
                    variant="body1"
                    >
                    { "Ver costo del envío"}
                  </Link>
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
                <input
                  size="1"
                  maxLength="1"
                  type="hidden"
                  className={classes.colorFondo}
                  {...register("costo")}
                  readOnly="readOnly"
                />
              </Grid>
              </Grid>
              <Grid className={classes.loadingButton}>
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
                  onClick={() => {
                    setValue("codEnvio", datos.codEnvio);
                    setValue("costo", costoTotal);
                  }}
                >
                  Confirmar envío
                </Button>
                        )} 
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

            <Modal
    open={openCosto}
    close={handleCloseCosto}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
   
    <div style={modalStyle} className={classes.paper3}>
      <div style={{ textAlign: "center", verticalAlign: "middle" }}>
      <MonetizationOnIcon
          className={(classes.props, classes.colorIconCheck)}
          style={{ textAlign: "center", verticalAlign: "middle" }}
        ></MonetizationOnIcon>
        <h6
          id="simple-modal-title"
          className={(classes.props, classes.colorTitle)}
        >
          COSTO DEL ENVÍO
        </h6>
        <h4
          id="simple-modal-title"
          className={(classes.props, classes.colorTitle)}
        >
          ${costoTotal},00 ARS
        </h4>
        <Divider
          className={classes.colorDivider}
          style={{ marginTop: 30, marginBlockEnd: 20 }}
        />
         <body2
          id="simple-modal-title"
          className={(classes.props, classes.colorTitle)}
        >
        Este valor incluye descuentos
        </body2>
        <div>
        <Button
          type="button"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => {
            handleCloseCosto();
          }}
        >
          Aceptar
        </Button>
      
        </div>

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




