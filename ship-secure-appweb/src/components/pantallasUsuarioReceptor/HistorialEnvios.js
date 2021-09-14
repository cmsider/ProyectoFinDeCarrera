import React ,{useEffect, useState }  from "react";
import 'react-chat-elements/dist/main.css';
import Contenedor from "../menuNavegacion/Contenedor";
import { db } from "../firebase";
import { List } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export const HistorialEnvios = (props) => {
  const classes = useStyles();

  var myJson = JSON.parse(localStorage.getItem("usuarios"));
  const [pedidos, setPedidos] = useState([]);
  useEffect(() => {

const consultaAPI = async () => {


db.collection("envios")
  .where("email", "==", myJson["email"])
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      const ped = [];
      ped.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
        });
        console.log(ped);
        
        var pedidoElement = {
          email : ped[0].email,
          direccion : ped[0].direccion,
          localidad : ped[0].localidad,
          fechaEntrega : ped[0].fechaEntrega
        };
        if(pedidoElement!= 'undefined')
        pedidos.push(pedidoElement);
    });
    console.log(pedidos);
  });

};
consultaAPI();

    
}, []);


  return (
    <div>
      <Contenedor setUserState={() => props.setUserState(null)}/>
      <List className={classes.root} subheader={<li/>}>
        
        {pedidos.map((pedido) => (
          <ListItem key={pedido}>
                <ListItemText >
                {pedido.email}
                  </ListItemText>
                  <ListItemText >
                {pedido.direccion}
                  </ListItemText>
                  <ListItemText >
                {pedido.localidad}
                  </ListItemText>
                  <ListItemText >
                {pedido.fechaEntrega}
                  </ListItemText>
              </ListItem>
          ))}
</List>
    </div>
  );
};
export default HistorialEnvios;






