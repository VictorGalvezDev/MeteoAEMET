import React from "react";
import { formatearHoraGeneral } from "../../utils/DataFormat";
import { WiThermometer } from "weather-icons-react";


const formarColor = (value) => {
    value = parseInt(value)
    if (value < 0) {
        return "#07e8f0";
    }
    if (value < 15) {
        return "#0787f0";
    }
    if (value < 25) {
        return "#ca9625";
    }
    if (value > 25) {
        return "#cc4814";   
    }
    if (value > 33) {
        return "#f30f0f";
    }
};

const TemperaturaCard = ({ value, periodo }) => {
    const color = formarColor(value);

    return (
        <article className="card">
            <h2 className="hora">
                {formatearHoraGeneral(periodo)}
            </h2>
            <div className="iconoTemp">
                <WiThermometer color={color} />
            </div>
            <div style={{ color: color, fontWeight:"bold", fontSize:"1.5rem"}}>
                {value}ºC
            </div>
        </article>
    );
};

export default TemperaturaCard