import React ,{useEffect, useState }  from "react";
import 'react-chat-elements/dist/main.css';
import Contenedor from "../menuNavegacion/Contenedor";
import { db } from "../firebase";




export const HistorialEnvios = (props) => {
  var myJson = JSON.parse(localStorage.getItem("usuarios"));
  const [pedido, setPedido] = useState({

    email: "",
    direccion: "",
    localidad:"",
    fechaEntrega: "",

  });
  useEffect(() => {

const consultaAPI = async () => {


db.collection("envios")
  .where("email", "==", myJson["email"])
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      const ped = [{email: "",
      direccion: "",
      localidad:"",
      fechaEntrega: "",
        }  ];
      ped.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
        });
        console.log(ped);

        setPedido({
          ...pedido,
          ped,
        });
    });
  });

};
consultaAPI();

    
}, []);


  return (
    <div>
      <Contenedor setUserState={() => props.setUserState(null)}/>
        HISTORICO ENVIOS
    </div>
  );
};
export default HistorialEnvios;






