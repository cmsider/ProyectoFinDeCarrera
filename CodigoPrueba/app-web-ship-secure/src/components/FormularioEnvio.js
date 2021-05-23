import React, { useState, Fragment } from "react";

const FormularioEnvio = () => {
    const [datos,setDatos] = useState({
        nombre: '',
        apellido: ''
    })

    const handleInputChange = (event) => {
        //console.log(event.target.value)
        setDatos({
            ...datos,[event.target.name] : event.target.value //Concateno el "nombre:''" con lo ingresado en el campo (si ingreso cris queda "nombre: cris")
        })
    }
    
    const enviarDatos = (event) => {
        event.preventDefault(); //Para evitar el procesamiento automatico del formulario al presionar enviar (clickeo enviar y actua el get)
        console.log(datos.nombre + ' ' +datos.apellido)
    }
  return (
    <Fragment>
      <h1>Formulario Envio</h1>
      <form className="row" onSubmit={enviarDatos}>
        <div className="col-md-2">
         <input placeholder= "Ingrese Nombre" //Texto por defecto en el campo
                className= "form-control" //Para cambiar la apriencia del campo
                type="text" //Es necesario indicar que tipo de tados van a ingresar al campo (text,fecha,etc)
                name= "nombre" // Relaciona el nombre de arriba(nombre:'') con el campo de texto
                onChange= {handleInputChange} //Evento que el que registra cada cambio en el campo
                />
        </div>
        <div className="col-md-2">
         <input placeholder= "Ingrese Apellido"
                className= "form-control"
                type="text"
                name="apellido"
                onChange= {handleInputChange}
                />
        </div>
        <div className="col-md-2">
         <button className="btn btn-primary" type="submit">Enviar</button>
        </div>
      </form>
      <h2>{datos.nombre} - {datos.apellido}</h2>
    </Fragment>
  );
};

export default FormularioEnvio;
