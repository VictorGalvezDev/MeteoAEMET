import React from "react";
import "./App.css";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import Filtro from "./components/logistic/Filtro";

function App() {

  return (
    <div className="container">
      <Header />
      <Filtro />
      <Footer />
    </div>
  )
}

export default App
