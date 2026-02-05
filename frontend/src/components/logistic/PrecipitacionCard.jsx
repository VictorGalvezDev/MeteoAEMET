import React from "react";
import "./css/PrecipitacionCard.css";
import { formatearHora } from "../../utils/DataFormat";
import { WiRain, WiDayRain, WiNightAltRain, WiDaySunny, WiNightClear } from "weather-icons-react";

// Función auxiliar para obtener el icono
const obtenerIconoClima = (periodo, valor) => {
    const esHorarioDiurno = periodo >= 6 && periodo <= 19;
    if (valor > 0 && valor <= 1) {
        return {
            icono: esHorarioDiurno ? WiDayRain : WiNightAltRain,
            color: esHorarioDiurno ? "#2196F3" : "#1565C0"
        };
    }
    if (valor > 1) {
        return {
            icono: WiRain,
            color: "#0D47A1"
        };
    }
    return {
        icono: esHorarioDiurno ? WiDaySunny : WiNightClear,
        color: esHorarioDiurno ? "#FFB300" : "#1565C0"
    };
};


const formatearHoraDiaria = (hora) => {
    return formatearHora(hora.split("-")[0]) +
        "-" +
        formatearHora(hora.split("-")[1])
}



const PrecipitacionCard = ({ value, periodo, tipo }) => {
    const { icono: IconoComponente, color } = obtenerIconoClima(periodo, value);

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

export default PrecipitacionCard;