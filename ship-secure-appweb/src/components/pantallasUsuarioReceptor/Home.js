import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import TextFiled from "@material-ui/core/TextField";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data, eventDeleteCamp) => {
    console.log(data);
    eventDeleteCamp.target.reset(); //con esto borramos los campos una vez guardados
  };
  return (
    <Fragment>
      <h2>Hello react form hook</h2>
      <form onSubmit={handleSubmit(onsubmit)}>
        <TextFiled
          variant="filled"
          margin="normal"
          fullWidth
          label="Ingrese nombres"
          type="string"
          id="nombres"
          name="nombres"
          error={!!errors.nombres}
          {...register("nombres", {
            required: { value: true, message: "Campo requerido" },
            minLength: {
              value: 2,
              message: "El nombre ingresado es demasiado corto",
            },
          })}
        ></TextFiled>

        <span className="text-danger text-small d-block mb-2">
          {errors?.nombres?.message}
          {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
        </span>

        <button className="btn btn-primary">Send</button>
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
export default Home;
