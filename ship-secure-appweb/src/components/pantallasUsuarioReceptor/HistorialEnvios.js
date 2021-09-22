import React ,{useEffect, useState }  from "react";
import 'react-chat-elements/dist/main.css';
import Contenedor from "../menuNavegacion/Contenedor";
import { db } from "../firebase";
import { Card, List } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    alignText: "center",
    
  },
  colorText: {
    color: "#FFFFFF",
    marginTop: 10,
    width: '100%',
    marginBlockEnd: 10,
    display: "grid",
    textAlign: "left",
    marginLeft: 20,
  },
  colorTextFecha: {
    color: "#FFFFFF",
    marginTop: 10,
    width: '100%',
    marginBlockEnd: 10,
    display: "grid",
    textAlign: "center",
  },
  colorTitle: {
    color: "#FFFFFF",
    marginTop: 70,
    marginBlockEnd: 10,
  },
  colorDivider: {
    background: "#E07D7E",
  },
  listSection: {
    backgroundColor: "#0B4C5F",
    marginTop: 20,
    marginBlockEnd: 10,
  
  },
  colorIcon: {
    color: "#08AFA5",
    width: 50,
    height: 50,

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
  const [hayPedidos, setHayPedidos] = useState(false);

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
        
        var pedidoElement = {
          id : ped[0].id,
          email : ped[0].email,
          direccion : ped[0].direccion,
          localidad : ped[0].localidad,
          fechaEntrega : ped[0].fechaEntrega,
        };
        if(pedidoElement!= 'undefined'){
        pedidos.push(pedidoElement);

        }
    });
        if(pedidos){
          setHayPedidos(true);
        }
  });

};
consultaAPI();

    
}, [pedidos]);

const historicoEnvios =  pedidos.map((pedido) => (

  <Card className={classes.listSection}>
    


  <ListItem key={pedido} >
  <AssignmentTurnedInIcon className={classes.colorIcon}/>

      <ListItemText className={classes.colorTextFecha} >
        {pedido.fechaEntrega}
      </ListItemText>
    
      <ListItemText  className={classes.colorText}>
        {pedido.direccion}
          </ListItemText>
      <ListItemText className={classes.colorText}>
        {pedido.localidad }
          </ListItemText> 
          <ListItemText className={classes.colorText}>
          
         Entregado por ShipSecure
       
        
          </ListItemText>  
       
      </ListItem>
      
      </Card>
    
  ));

  return (
    <div>
         <Contenedor setUserState={() => props.setUserState(null)}/>
     <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.colorTitle}>
          Histórico de envíos
        </Typography>
        
          <Divider className={classes.colorDivider} />
     
      </Grid>  

       <ListItem>
       <ListItemText>
        {hayPedidos ? (<>{historicoEnvios}</>):( <div>NO HAY HISTORICOS, ESTO NO LO TOMA TODAVIA CREO</div>)}   
        </ListItemText>
      </ListItem>




    </Container>
    </div>
  );
};
export default HistorialEnvios;



