import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "firebase/firestore";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import GridList from "@material-ui/core/GridList";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h2",
        h2: "h2",
        h3: "h2",
        h4: "h2",
        h5: "h2",
        h6: "h2",
        subtitle1: "h2",
        subtitle2: "h2",
        body1: "span",
        body2: "span",
      },
    },
  },
}));

export const Pedido = (props) => {
  const classes = useStyles();

  const [pedido, setPedido] = useState([]);
  const pedidoID = props.entradas.nroSeg;

  const entityRef = db.collection("envios");

  useEffect(() => {
    if (pedidoID) {
      entityRef
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form}>
          {pedido.map((item) => (
            <GridList cellHeight={50} className={classes.gridList} cols={1}>
              <Typography component="h5" variant="h8" className={classes.props}>
                Codigo de seguimiento: {item.key}
              </Typography>
              <Typography component="h5" variant="h8">
                Fecha de entrega: {item.fechaEntrega}
              </Typography>
              <Typography component="h5" variant="h8">
                Hora de entrega: {item.horaEntrega}
              </Typography>
              <Typography component="h5" variant="h8">
                Domicilio: {item.domicilio}
              </Typography>
              <Typography component="h5" variant="h8">
                Observaciones: {item.observaciones}
              </Typography>
            </GridList>
          ))}
          <Grid container>
            <Grid item xs></Grid>
            <Grid item></Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Pedido;
