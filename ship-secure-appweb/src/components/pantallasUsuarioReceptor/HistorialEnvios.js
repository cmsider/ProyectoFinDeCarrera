import React from "react";
import 'react-chat-elements/dist/main.css';
import Contenedor from "../menuNavegacion/Contenedor";
// MessageBox component




export const HistorialEnvios = (props) => {
  return (
    <div>
      <Contenedor setUserState={() => props.setUserState(null)}/>
        HISTORICO ENVIOS
    </div>
  );
};
export default HistorialEnvios;






