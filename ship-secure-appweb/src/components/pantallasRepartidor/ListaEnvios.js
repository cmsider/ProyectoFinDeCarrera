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
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Button from "@material-ui/core/Button";
import ForumIcon from '@material-ui/icons/Forum';
import Canal from "../chatRepartidor/Canal";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    alignText: "center",
    
  },
  paper3: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 4, 3),
  },
  colorText: {
    color: "#FFFFFF",
    marginTop: 10,
    width: '5%',
    marginBlockEnd: 10,
    display: "grid",
    textAlign: "left",
    marginLeft: theme.spacing(1),
  },
  submit: {
    
    marginLeft: theme.spacing(10),
  },
  colorTextFecha: {
    color: "#FFFFFF",
    marginTop: 10,
    width: '5%',
    marginBlockEnd: 10,
    display: "grid",
    textAlign: "center",
  },
  colorTitle: {
    color: "#FFFFFF",
    marginTop: 70,
    marginBlockEnd: 10,
  },
  paperChat: {
    position: "absolute",
    width: 0,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[10],
    padding: theme.spacing(0, 0, 0),
    alignContent: "center"
    
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

export const ListaEnvios = (props) => {
  const classes = useStyles();

  var myJson = JSON.parse(localStorage.getItem("usuarios"));
  const [pedidos, setPedidos] = useState([]);
  const [hayPedidos, setHayPedidos] = useState(false);
  const [openChat, setOpenChat] = useState(false);




  const handleOpenChat = () => {
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  
  const [modalStyle] = React.useState(getModalStyle);
  function getModalStyle() {
    const top = 35;
    const left = 35;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  

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
          horaEntrega : ped[0].horaEntrega,
          observaciones : ped[0].observaciones,
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

const listaEnvios =  pedidos.map((pedido) => (

  <Card className={classes.listSection}>
    


  <ListItem key={pedido} >
  <LocalShippingIcon className={classes.colorIcon}/>

     <ListItemText className={classes.colorTextFecha} >
        {pedido.id}
      </ListItemText>
      <ListItemText className={classes.colorText} >
        {pedido.fechaEntrega}
      </ListItemText>
      <ListItemText className={classes.colorText} >
       {pedido.horaEntrega}
      </ListItemText>
      <ListItemText className={classes.colorText}>
        {pedido.localidad }
          </ListItemText> 
          <ListItemText  className={classes.colorText}>
        {pedido.direccion}
          </ListItemText>
          <ListItemText  className={classes.colorText}>
        {pedido.observaciones}
          </ListItemText>
          <ListItemText>
          
          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleOpenChat}
           
          >
            <ForumIcon />
           Chatear
          </Button>
        
          </ListItemText>  
       
      </ListItem>
      
      </Card>
    
  ));

  return (
    <div>
         <Contenedor setUserState={() => props.setUserState(null)}/>
     <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.colorTitle}>
        Tu lista de envíos de hoy: 
        </Typography>
        
          <Divider className={classes.colorDivider} />
     
      </Grid>  

       <ListItem>
       <ListItemText>
        {hayPedidos ? (<>{listaEnvios}</>):( <div></div>)}   
        </ListItemText>
      </ListItem>
      <Modal
    open={openChat}
    onClose={handleCloseChat}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <div style={modalStyle} className={classes.paperChat}>
    <Canal/>
    </div>
  </Modal>
  


    </Container>
    </div>

    
  );
};
export default ListaEnvios;



