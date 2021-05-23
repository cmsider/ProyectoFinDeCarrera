import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

const FormCrud = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [entradas, setentradas] = useState([]);

  const procesarFormulario = (data, e) => {
    console.log(data);
    setentradas([...entradas, data]);
    // limpiar campos
    e.target.reset();
  };

  return (
    <Fragment>
      <h1>FORM</h1>
      <form onSubmit={handleSubmit(procesarFormulario)}>
        <input
          name="nombre"
          {...register("nombre", {
            required: { value: true, message: "Campo requerido" },
            minLength: {
              value: 2,
              message: "El nombre debe tener un minimo de 2 letras",
            },
          })}
          className="form-control my-2"
          placeholder="Ingrese nombre"
        ></input>
        <span className="text-danger text-small d-block mb-2">
          {errors?.nombre?.message}
          {/*si da error en el nombre muestra el mensaje de error en nobmre*/}
        </span>
        <input
          name="apellido"
          {...register("apellido", {
            required: { value: true, message: "Campo requerido" },
            minLength: {
              value: 2,
              message: "El apellido debe tener un minimo de 2 letras",
            },
          })}
          className="form-control my-2"
          placeholder="Ingrese apellido"
        ></input>
        <span className="text-danger text-small d-block mb-2">
          {errors?.apellido?.message}
        </span>
        <button type="submit" className="btn btn-primary">
          Agregar
        </button>
      </form>
      <ul className="mt-2">
        {entradas.map((item, index) => (
          <li key={index}>
            {item.nombre} - {item.apellido}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default FormCrud;
