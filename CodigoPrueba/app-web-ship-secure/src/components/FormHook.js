import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

const FormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data,eventDeleteCamp) => {
    console.log(data);
    eventDeleteCamp.target.reset() //con esto borramos los campos una vez guardados
  };
  return (
    <Fragment>
      <h2>Hello react form hook</h2>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          className="form-control my-2"
          name="name"
          {...register("name", {required: { value: true, message: "Campo requerido" },
                }
            )
        }
        />
        <span className="text-danger text-small d-block mb-2">
          {errors.name && errors.name.message}
        </span>

        <button className="btn btn-primary">Send</button>
      </form>
    </Fragment>
  );
};
export default FormHook;
