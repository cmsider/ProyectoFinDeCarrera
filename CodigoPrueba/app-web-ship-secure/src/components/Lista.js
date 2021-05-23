import React,{useState,Fragment} from 'react';
const Lista = () => {
    const [arrayNumero,setArrayNumero] = useState([1,2,3,4,5])
    const [numero,setNumero] = useState(5)

    
    const agregarElemento = () => {
        console.log('click')
        setNumero(numero+1);
        setArrayNumero([...arrayNumero, numero])
    }
    return (
        <Fragment>
        <h1>Lista</h1>
        <button onClick={agregarElemento}>Agregar</button>
        {
            arrayNumero.map((item,index) =>
                <p key={index}>{item} - {index}</p>
            )
        }
        </Fragment>
    );
}

export default Lista;