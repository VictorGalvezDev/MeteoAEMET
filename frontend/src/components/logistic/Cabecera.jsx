import React from "react";
import "./css/Cabecera.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

const Cabecera = ({ data, tipo }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "Fecha no disponible";
    }

  };



  return (
    <div className="contenedorCabecera">
      <div className="contenedorTitulo">
        <h1>RESULTADOS DE LA BÚSQUEDA</h1>
        <span>
          {tipo === 'horaria' ? 'Datos horarios' : 'Datos diarios'}
        </span>
      </div>
      <div className="contenedorLocalizacion">
        <FaLocationDot className="iconoLocalizacion" />
        <h2>
          {data.nombre}, municipio de {data.provincia}
        </h2>
      </div>
      <h3>
        <FaCalendarAlt /> Actualizado: {formatDate(data.elaborado)}
      </h3>

      <p>
        Datos meteorológicos proporcionados por la Agencia Estatal de Meteorología.
        <a
          href={data.origen.web}
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