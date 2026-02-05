import React from "react";
import "./css/Cabecera.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { formatearFecha } from "../../utils/DataFormat";

const Cabecera = ({ nombre, provincia, elaborado, web, tipo }) => {
  return (
    <div className="contenedorCabecera">
      <div className="contenedorTitulo">
        <h1>RESULTADOS DE LA BÚSQUEDA</h1>
        <span>
          {tipo == 'horaria' ? 'Datos horarios' : 'Datos diarios'}
        </span>
      </div>
      <div className="contenedorLocalizacion">
        <FaLocationDot className="iconoLocalizacion" />
        <h2>
          {nombre}, municipio de {provincia}
        </h2>
      </div>
      <h3>
        <FaCalendarAlt /> Actualizado: {formatearFecha(elaborado)}
      </h3>

      <p>
        Datos meteorológicos proporcionados por la Agencia Estatal de Meteorología.
        <a
          href={web}
          target="_blank"
          rel="noopener noreferrer"
          title="Visitar web de AEMET"
        >
          (AEMET)
        </a>
      </p>
    </div>
  );
};

export default Cabecera;