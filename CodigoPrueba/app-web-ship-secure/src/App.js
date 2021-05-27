/* import logo from './logo.svg';
import './App.css';*/
//import Jsx from './components/Jsx' va abajo del FormularioEnvio-->      <Jsx />
//import Lista from './components/Lista' va abajo delFormularioEnvio--> <Lista />
//import FormularioEnvio from "./components/FormularioEnvio";
//import FormHook from "./components/FormHook";
import FormCrud from "./components/FormCrud";

function App() {
  return (
    <div className="container mt-5" className="fondoFormEnvios">
      <FormCrud />
    </div>
  );
}

export default App;
