import React from "react";
import "./css/ProbPrecipitacionCard.css";
import { formatearHora } from "../../utils/DataFormat";
import { WiRain, WiRainMix, WiDaySunny} from "weather-icons-react";

// Función auxiliar para obtener el icono
const obtenerIconoClima = (periodo, valor) => {
    if (valor > 65) {
        return {
            icono: WiRain
        };
    }
    if (valor >25) {
        return {
            icono: WiRainMix
        };
    }

    return {
        icono: WiDaySunny,
        color: "#FFB300"
    };
};


const formatearHoraDiaria = (hora) => {
    return formatearHora(hora.split("-")[0]) +
        "-" +
        formatearHora(hora.split("-")[1])
}



const ProbPrecipitacionCard = ({ value, periodo, tipo }) => {
    const { icono: IconoComponente, color="#2196F3" } = obtenerIconoClima(periodo, value);

    return (
        <article className="card">
            <h2 className="hora">
                {tipo === "horaria" ? formatearHora(periodo) : formatearHoraDiaria(periodo)}
            </h2>
            <div className="icono">
                <IconoComponente size={48} color={color} />
            </div>
            <p className="valor">{value}%</p>
        </article>
    );
};

export default ProbPrecipitacionCard;