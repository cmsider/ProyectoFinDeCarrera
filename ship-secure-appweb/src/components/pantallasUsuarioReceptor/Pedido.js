import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "firebase/firestore";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import { useHistory } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import TextFiled from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { Info } from "@material-ui/icons";
import emailjs from "emailjs-com";
import Modal from "@material-ui/core/Modal";
import { Icon } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ForumIcon from '@material-ui/icons/Forum';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(50),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    position: "absolute",
    width: 700,
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
  colorTitle: {
    color: "#FFFFFF",
    marginTop: 10,
    marginBlockEnd: 10,
  },
  root: {
    color: "#7FA3B5",
  },
  colorTitulo: {
    color: "#FFFFFF",
  },
  colorDivider: {
    background: "#E07D7E",
  },
  colorIcon: {
    color: "#E07D7E",
    marginTop: "5px",
    marginLeft: "20px",
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
  submit: {
    margin: theme.spacing(3, 0, -1),
  },
  colorText: {
    color: "#FFFFFF",
    margin: theme.spacing(-1, 0, 0),
  },
  colorLabel: {
    color: "#7FA3B5",
    margin: theme.spacing(-1, 0, 0),
  },
  colorOption: {
    color: "#FFFFFF",
    margin: theme.spacing(1, 0, 1),
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

const Pedido = (props) => {
  const classes = useStyles();

  const [pedido, setPedido] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const { state } = props.location;
  const pedidoID = state;
  console.log(pedido);

  // console.log(props.location);

  const history = useHistory();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openChat, setOpenChat] = useState(false);

  const [progCheckbox, setProgCheckbox] = useState(false);
  const [progCheckbox2, setProgCheckbox2] = useState(false);


  const redirect = (view) => {
    history.push(view);
  };

  const pedidoTomado = () => {
    setActualizar(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);

    redirect("/pedido");
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleOpenChat = () => {
    setOpenChat(true);
  };


  const listItems = pedido.map((pedido, index) => (
    <ul key={index}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.props} color="primary">
            Código de envio
          </Typography>
          <Typography
            variant="h4"
            className={classes.colorTitulo}
            color="primary"
            display="inline"
          >
            {pedido.key}
            <Divider className={classes.colorDivider} />
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Dirección
          </Typography>
          <Typography className={classes.root}>{pedido.direccion}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Piso/Depto
          </Typography>
          <Typography className={classes.root}>{pedido.piso}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" color="primary">
            Observaciones
          </Typography>
          <Typography className={classes.root}>
            {pedido.observaciones}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Fecha de entrega
          </Typography>
          <Typography className={classes.root}>
            {pedido.fechaEntrega}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Hora estimada
          </Typography>
          <Typography className={classes.root}>{pedido.horaEntrega}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Temperatura
          </Typography>
          <Typography className={classes.root}>
            {pedido.temperatura}ºC
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Peso
          </Typography>
          <Typography className={classes.root}>{pedido.peso} Kg</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOpen}
          >
            <EditLocationIcon />
            Reprogramar
          </Button>
          </Grid>
          <Grid item xs={6}>
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOpenChat}
          >
            <ForumIcon />
            Chatear con el repartidor
          </Button>
          </Grid>
      </Grid>
    </ul>
  ));

  useEffect(() => {
    db.collection("envios")
      .doc(pedidoID)
      .get()
      .then((querySnapshot) => {
        const pedidos = [];
        if (querySnapshot.data()) {
          pedidos.push({
            ...querySnapshot.data(),
            key: querySnapshot.id,
          });
          if (!actualizar && pedidoID != "undefined") {
            setPedido(pedidos);
            pedidoTomado();
          }
        }
      });
  }, []);

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const [datos, setDatos] = useState({
    nombres: "",
    apellidos: "",
    email: "",

    direccion: "",
    piso: "",
    observaciones: "",
    codigoPostal: "",
    fechaEntrega: "",
    horaEntrega: "",
    temperatura: "",
    codEnvio: pedidoID,
  });

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();

  const sendMailReprogramar = (e) => {
    console.log(datos);
    emailjs
      .send(
        "shipSecure_service",
        "template_x2s995n",
        datos,
        "user_JYv6ZEZaGzGODUvHJ9tRm"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  };

  const handleSubmit = (e) => {
    // HERE: you always want to prevent default, so do this first
    e.preventDefault();
    if (!isFormValid()) {
      //message of error in the screen, maybe sweet alerts
      alert("Faltan campos por llenar");
      console.log("falta algo");
    } else {
      datos.nombres = pedido[0].nombres;
      datos.apellidos = pedido[0].apellidos;
      datos.email = pedido[0].email;

      updateEnvio();
      handleOpen2();
      e.target.reset();
    }
  };

  const isFormValid = () => {
    if (!datos.direccion) {
      return false;
    } else {
      return true;
    }
  };

  const updateEnvio = () => {
    db.collection("envios")
      .doc(pedidoID)
      .update({
        direccion: datos.direccion,
        piso: datos.piso,
        localidad: datos.localidad,
        codigoPostal: datos.codigoPostal,
        observaciones: datos.observaciones,
        fechaEntrega: datos.fechaEntrega,
        horaEntrega: datos.horaEntrega,
      })
      .then(() => {
        console.log("Actualizacion correcta!");
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <p>{listItems}</p>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                <div style={modalStyle} className={classes.paper2}>
                  <h4
                    id="simple-modal-title"
                    className={(classes.props, classes.colorOption)}
                  >
                    Reprogramar Enví­o
                  </h4>

                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        className={(classes.props, classes.colorOption)}
                      >
                        Quieres cambiar la dirección?
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
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
                  </Grid>
                  {progCheckbox && (
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="primary">
                        Nueva Dirección
                      </Typography>

                      <TextFiled
                        variant="filled"
                        margin="dense"
                        required
                        fullWidth
                        label="Ingrese nueva dirección"
                        type="direccion"
                        id="direccion"
                        name="direccion"
                        color="primary"
                        InputLabelProps={{ className: classes.colorLabel }}
                        inputProps={{ className: classes.colorText }}
                        onChangeCapture={handleInputChange}
                        {...register("direccion")}
                      ></TextFiled>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" color="primary">
                        Piso/Depto
                      </Typography>

                      <TextFiled
                        variant="filled"
                        margin="dense"
                        required
                        fullWidth
                        label="Ingrese piso/departamento"
                        type="piso"
                        id="piso"
                        name="piso"
                        color="primary"
                        InputLabelProps={{ className: classes.colorLabel }}
                        inputProps={{ className: classes.colorText }}
                        onChangeCapture={handleInputChange}
                        {...register("piso")}
                      ></TextFiled>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" color="primary">
                        Localidad
                      </Typography>

                      <TextFiled
                        variant="filled"
                        margin="dense"
                        required
                        fullWidth
                        label="Ingrese localidad"
                        type="localidad"
                        id="localidad"
                        name="localidad"
                        color="primary"
                        InputLabelProps={{ className: classes.colorLabel }}
                        inputProps={{ className: classes.colorText }}
                        onChangeCapture={handleInputChange}
                        {...register("localidad")}
                      ></TextFiled>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" color="primary">
                        Código Postal
                      </Typography>

                      <TextFiled
                        variant="filled"
                        margin="dense"
                        required
                        fullWidth
                        label="Ingrese código postal"
                        type="codigoPostal"
                        id="codigoPostal"
                        name="codigoPostal"
                        color="primary"
                        InputLabelProps={{ className: classes.colorLabel }}
                        inputProps={{ className: classes.colorText }}
                        onChangeCapture={handleInputChange}
                        {...register("codigoPostal")}
                      ></TextFiled>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body2" color="primary">
                      Observaciones
                    </Typography>

                    <TextFiled
                      variant="filled"
                      margin="dense"
                      required
                      fullWidth
                      label=""
                      type="observaciones"
                      id="observaciones"
                      label="Ingrese observaciones"
                      name="observaciones"
                      color="primary"
                      InputLabelProps={{ className: classes.colorLabel }}
                      inputProps={{ className: classes.colorText }}
                      onChangeCapture={handleInputChange}
                      {...register("observaciones")}
                    ></TextFiled>
                  </Grid>
                </div>)}
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        className={(classes.props, classes.colorOption)}
                      >
                        Quieres cambiar el horario?
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Checkbox
                        color="primary"
                        id="progCheckbox2"
                        checked={progCheckbox2}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        value="1"
                        className={(classes.props, classes.checkbox)}
                        onClick={() => setProgCheckbox2(!progCheckbox2)}
                      />
                    </Grid>
                  </Grid>
                {progCheckbox2 && (
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="primary">
                        Nueva Fecha
                      </Typography>

                      <TextFiled
                        variant="filled"
                        margin="dense"
                        required
                        fullWidth
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
                        {...register("fechaEntrega")}
                      ></TextFiled>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body2" color="primary">
                        Nueva Hora
                      </Typography>
                      <TextFiled
                        variant="filled"
                        margin="dense"
                        required
                        fullWidth
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
                        {...register("horaEntrega")}
                      ></TextFiled>
                    </Grid>
                  </Grid>
                  </div>)}
                  <Grid container spacing={2}>
                    <Grid item xs={1}>
                      <Info
                        className={(classes.props, classes.colorIcon)}
                      ></Info>
                    </Grid>
                    <Grid item xs={10}>
                      <small className={(classes.props, classes.colorOption)}>
                        Una vez que se envien los datos para reprogramar el
                        envío, se notificará automáticamente al repartidor y le
                        llegará a su cuenta de mail el comprobante con el
                        detalle y costo adicional del enví­o.
                      </small>
                    </Grid>
                  </Grid>
                 
                  <Grid item xs={12} align="center">
                  <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  
                >
                  Enviar
                </Button>
                </Grid>
                <Modal
              open={open2}
              onClose={handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <div style={modalStyle} className={classes.paper3}>
                <div style={{ textAlign: "center", verticalAlign: "middle" }}>
                <CheckIcon
                    className={(classes.props, classes.colorIconCheck)}
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                  ></CheckIcon>

                  <h4
                    id="simple-modal-title"
                    className={(classes.props, classes.colorTitle)}
                  >
                    ENVÍO REPROGRAMADO
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
                      Ya le avisamos al repartidor! 
                      En unos instantes te llegará un correo con el comprobante para que puedas abonarlo.
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
              </form>
            </Modal>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
};

export default Pedido;
