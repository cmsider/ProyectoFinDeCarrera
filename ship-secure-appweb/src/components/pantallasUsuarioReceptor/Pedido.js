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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
}));

export const Pedido = (props) => {
  const classes = useStyles();

  const [pedido, setPedido] = useState([]);
  //const pedidoID = props.entradas.nroSeg;
  const { state } = props.location;
  const pedidoID = state;
  console.log(props.location);

  useEffect(() => {
    if (pedidoID) {
      db.collection("envios")
        .doc("/" + pedidoID)
        .get()
        .then((querySnapshot) => {
          const pedidos = [];
          if (querySnapshot.data()) {
            pedidos.push({
              ...querySnapshot.data(),
              key: querySnapshot.id,
            });
            setPedido(pedidos);
          }
        });
    }
  }, [pedidoID]);
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form}>
          {pedido.map((item) => (
            <li key={item}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    className={(classes.props, classes.colorTitulo)}
                  >
                    Código de envio
                  </Typography>
                  <Typography
                    variant="h4"
                    className={classes.props}
                    color="primary"
                    display="inline"
                  >
                    {item.key}
                    <Divider className={classes.colorDivider} />
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h5" color="primary">
                    Dirección
                  </Typography>
                  <Typography className={classes.root}>
                    {item.direccion}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h5" color="primary">
                    Piso/Depto
                  </Typography>
                  <Typography className={classes.root}>{item.piso}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h5" color="primary">
                    Observaciones
                  </Typography>
                  <Typography className={classes.root}>
                    {item.observaciones}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h5" color="primary">
                    Fecha de entrega
                  </Typography>
                  <Typography className={classes.root}>
                    {item.fechaEntrega}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h5" color="primary">
                    Hora estimada
                  </Typography>
                  <Typography className={classes.root}>
                    {item.horaEntrega}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h5" color="primary">
                    Temperatura
                  </Typography>
                  <Typography className={classes.root}>
                    {item.temperatura}ºC
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h5" color="primary">
                    Peso
                  </Typography>
                  <Typography className={classes.root}>
                    {item.peso} Kg
                  </Typography>
                </Grid>
              </Grid>
            </li>
          ))}
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Pedido;
