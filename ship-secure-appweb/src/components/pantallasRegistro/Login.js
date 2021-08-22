import React , { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

export const Login = () => {
  const history = useHistory();
  const redirect = (view) => {
    history.push(view);
  };

  const handleClose = () => {
    redirect("/home");
  };

  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          handleClose();
        }}
      >
        Aceptar
      </Button>
    </div>
  );
};
export default Login;
