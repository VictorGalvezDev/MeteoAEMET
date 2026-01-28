import React, {useState} from "react";
import "./App.css";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import Filtro from "./components/logistic/Filtro";
import Metereologia from "./components/logistic/Metereologia";


function App() {
  const [datosBusqueda, setDatosBusqueda] = useState(null);

  const onBusqueda = (datos) => {
    setDatosBusqueda(datos)
  }

  return (
    <div className="container">
      <Header />
      <Filtro onBusqueda={onBusqueda}/>
      <Metereologia dataFetch={datosBusqueda} />
      <Footer />
    </div>
  )
}

export default App
