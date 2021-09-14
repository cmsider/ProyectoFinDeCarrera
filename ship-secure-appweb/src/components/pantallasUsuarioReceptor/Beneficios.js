import React, { useState, useEffect } from "react";
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
import avatar from '../imagenes/avatar.png'
import CircularProgress from '@material-ui/core/CircularProgress';
import { CenterFocusStrong } from "@material-ui/icons";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({

  colorTitle: {
    color: "#FFFFFF",
    marginTop: 50,
    marginBlockEnd: 10,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1),
    textAlign: "center",
    
    color: "#FFFFFF",
  },
  colorLabel: {
    color: "#E07D7E",
    margin: theme.spacing(1),
  },
  textCenter:{
    top:"0",
        left:"0",
        bottom:"0",
        right:"0",
        position:"absolute",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        color:"#FFFFFF",
  },
  colorText: {
    color: "#FFFFFF",
    marginTop:theme.spacing(20),
    textAlign: "center"
  },
  checkbox: {
    color: "#7FA3B5",
    margin: theme.spacing(0, -5, 0),
  },
  colorDivider: {
    background: "#E07D7E",
  },
  colorPuntos: {
    color: "#E07D7E",
    textAlign: "center",
    marginTop:theme.spacing(30),
  },
  colorFondo: {
    background: "#003648",
    backgroundColor: "#003648",
    border: "#003648",
  },
}));


export const Beneficios = (props) => {
  const classes = useStyles();
  const [puntos, setPuntos] = useState([]);

  var myJson = JSON.parse(localStorage.getItem("usuarios"));
  
  
  useEffect(() => {

const consultaAPI = async () => {

db.collection("usuarios")
  .where("email", "==", myJson["email"])
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      const us = [];
      us.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
        });
        setPuntos(us[0].puntos);
    });
  });

};
consultaAPI();

    
}, [puntos]);

  return (

   
    <div>  
    <Contenedor setUserState={() => props.setUserState(null)}/>
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.colorTitle}>
          Mis beneficios
        </Typography>
        
          <Divider className={classes.colorDivider} />
     
      </Grid>
      <Box position="absolute" display="inline-flex" left={0}
        right={0} mt={10} alignItems="center" justifyContent="center">
      <CircularProgress variant="determinate" value={puntos} size={150} /> 
 
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      
        <img src={avatar} width="115" height="115"/>
        </Box>
       
    </Box>
    <div className={classes.colorPuntos} >
    {puntos} puntos
    </div>
    <div>
       <Grid container spacing={2}>
              <Grid item xs={6}>
              <Typography
                  component="h6"
                  variant="h6"
                  className={classes.colorText}
                >
                  Próximos beneficios
                </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography
                  component="h6"
                  variant="h6"
                  className={classes.colorText}
                >
                  Beneficios alcanzados
                </Typography>
              </Grid>
       </Grid>
       <Grid container spacing={2}>
              <Grid item xs={6}>
              <Box position="absolute" display="inline-flex" >
      <CircularProgress variant="determinate" value={100} size={100} />
      <Box
        className={classes.textCenter}
      >
      
        100 ptos
        </Box>
        </Box>
      
        <Typography className={classes.submit}>
        <LoyaltyIcon className={classes.colorLabel}/>
                  Envío programado con 20% de descuento
                </Typography>
            </Grid>
          
              <Grid item xs={6}>
             
              <Typography
               
                  className={classes.submit}
                >
                   <LoyaltyIcon className={classes.colorLabel}/>
                  Envío programado con 10% de descuento
                </Typography>
                <Typography
               
                  className={classes.submit}
                >
                   <LoyaltyIcon className={classes.colorLabel}/>
                  $100.- pesos de descuento en tu próximo envío
                </Typography>
              </Grid>
       </Grid>
    </div>
    </Container>
    </div>
    
  );
};
export default Beneficios;
