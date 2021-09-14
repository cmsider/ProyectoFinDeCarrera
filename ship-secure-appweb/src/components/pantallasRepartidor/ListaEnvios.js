import React from 'react'
import ContenedorCYR from '../menuNavegacionCYR/ContenedorCYR'

export const ListaEnvios = (props) => {
    return (
        <h1>
            <ContenedorCYR setUserState={() => props.setUserState(null)}/>
            LISTA ENVIOS
    
        </h1>
    )
};
export default ListaEnvios;
