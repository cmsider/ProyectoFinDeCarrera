import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import firebase from "firebase/app";
import "firebase/firestore";

export const Pedido = (props) => {
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
    <div>
      <ul className="mt-2">
        {pedido.map((item, index) => (
          <li key={index}>
            {item.horaEntrega} -{item.domicilio} -{item.fechaEntrega} -
            {item.observaciones} - {item.key}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pedido;
