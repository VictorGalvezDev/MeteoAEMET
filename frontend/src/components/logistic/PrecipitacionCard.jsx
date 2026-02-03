import React from "react";
import "./css/PrecipitacionCard.css";
const PrecipitacionCard = ({value, periodo}) => {

    return (
    <div className="contenedorPrecipitaciones">
        <div className="contendedorData">
            {value}%
            hora: {periodo}
        </div>

    </div>)
}

export default PrecipitacionCard;