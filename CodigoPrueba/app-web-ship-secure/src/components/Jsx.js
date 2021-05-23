import React, { Fragment } from "react";

const Jsx = () => {
  const saludo = "Hola JSX";
  const temperatura = 21;

  return (
    <Fragment>
      <h1>Soy un componente {saludo}</h1>
      <h2>{temperatura > 20 ? "Calor" : "Frio"}</h2>
    </Fragment>
  );
};

export default Jsx;
