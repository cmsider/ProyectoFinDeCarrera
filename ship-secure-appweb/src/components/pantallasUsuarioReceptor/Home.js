import React , { useState } from "react";
import { Fragment } from "react";
import TextFiled from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const redirect = (view) => {
    history.push(view);
  };

  const handleClose = () => {
    redirect("/seguimientoEnvio");
  };

  const handleCloseCreador = () => {
    redirect("/crearEnvio");
  };

  const handleCloseRepartidor = () => {
    redirect("/listaEnvios");
  };

  return (

    <Fragment>
      <h2>HOMEEEEE HAY Q EDITARLO</h2>
      <form>
        <TextFiled
          variant="filled"
          margin="normal"
          fullWidth
          label="Ingrese nombres"
          type="string"
          id="nombres"
          name="nombres"
        ></TextFiled>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            handleClose();
          }}
        >
          Seguirlo
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            handleCloseCreador();
          }}
        >
          Crearlo
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => {
            handleCloseRepartidor();
          }}
        >
          Entregarlo
        </Button>
      </form>
    </Fragment>
  );
};
export default Home;

/*
import React from "react";

export const Home = () => {
  return (
    <div>
      <h1>ESTE ES EL HOME</h1>
    </div>
  );
};
export default Home;*/
