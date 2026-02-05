import React from "react";
import "./css/ApiError.css";
import solImagen from "../../assets/sol_llorando.webp";

const ApiError = ({ errorData }) => {
    return (
        <article className="contenedorErrorAPI">
            <h1 className="errorAPI">ERROR {errorData.status}</h1>
            <h2>{errorData.error}</h2>
            <p className="errorMensajeAPI">{errorData.message}</p>
            <img className="imagenSol" src={solImagen} alt="Imágen de un sol llorando :(" />
        </article>
    )
}
export default ApiError;