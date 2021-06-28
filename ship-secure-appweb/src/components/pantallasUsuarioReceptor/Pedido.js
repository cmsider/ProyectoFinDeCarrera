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

import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper2: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  submit: {
    margin: theme.spacing(3, 0, 2),
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

export const Pedido = (props) => {
  const classes = useStyles();

  const [pedido, setPedido] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const { state } = props.location;
  const pedidoID = state;
  console.log(pedido);

  console.log(props.location);

  const history = useHistory();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);

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

    redirect("/home");
  };

  const listItems = pedido.map((pedido, index) => (
    <li key={index}>
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
          <Typography variant="h5" color="primary">
            Dirección
          </Typography>
          <Typography className={classes.root}>{pedido.direccion}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5" color="primary">
            Piso/Depto
          </Typography>
          <Typography className={classes.root}>{pedido.piso}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" color="primary">
            Observaciones
          </Typography>
          <Typography className={classes.root}>
            {pedido.observaciones}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5" color="primary">
            Fecha de entrega
          </Typography>
          <Typography className={classes.root}>
            {pedido.fechaEntrega}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5" color="primary">
            Hora estimada
          </Typography>
          <Typography className={classes.root}>{pedido.horaEntrega}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5" color="primary">
            Temperatura
          </Typography>
          <Typography className={classes.root}>
            {pedido.temperatura}ºC
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h5" color="primary">
            Peso
          </Typography>
          <Typography className={classes.root}>{pedido.peso} Kg</Typography>
        </Grid>
      </Grid>
    </li>
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
  }, [pedidoID]);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form}>
          <ul>
            {listItems}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                fullWidth
                onClick={handleOpen}
              >
                <EditLocationIcon />
                Reprogramar
              </Button>
            </Grid>
          </ul>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper2}>
              <h2 id="simple-modal-title">Envio creado</h2>
              <p>asdas</p>
            </div>
          </Modal>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Pedido;
