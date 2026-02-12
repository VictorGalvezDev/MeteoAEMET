import React from "react";
import { formatearHoraDosCuatroDigitos } from "../../utils/DataFormat";
import { WiRain, WiDayRain, WiNightAltRain, WiDaySunny, WiNightClear, WiRainMix, WiThunderstorm, WiStormShowers, WiCloud } from "weather-icons-react";

const obtenerIconoClima = (periodo, valor, tipo, tipoCard) => {
    if (tipo == "diaria" || (tipo == "horaria" && tipoCard == "prob")) {
        if (valor > 65) {
            return {
                icono: WiRain
            };
        }
        if (valor > 25) {
            return {
                icono: WiRainMix
            };
        }

        return {
            icono: WiDaySunny,
            color: "#FFB300"
        };
    }
    // para probTormenta
    if (tipoCard == "probTormenta") {
        if (valor > 50) {
            return {
                icono: WiThunderstorm,
                color: "#fae20c"
            }
        }
        if (valor > 20) {
            return {
                icono: WiStormShowers,
                color: "#fae20c"
            }
        }
        return {
            icono: WiCloud,
            color: "#fae20c"
        }

    }


    // para probPrecipitacion de tipo horaria
    const esHorarioDiurno = periodo >= 6 && periodo <= 19;
    if (valor > 1) {
        return {
            icono: WiRain,
            color: "#0D47A1"
        };
    }
    if (valor > 0) {
        return {
            icono: esHorarioDiurno ? WiDayRain : WiNightAltRain,
            color: esHorarioDiurno ? "#2196F3" : "#1565C0"
        };
    }
    return {
        icono: esHorarioDiurno ? WiDaySunny : WiNightClear,
        color: esHorarioDiurno ? "#FFB300" : "#1565C0"
    };
};



const valorFormateado = (value, tipoCard) => {
    return (tipoCard == "probTormenta" || tipoCard == "probPrecipitacion") ? `${value}%` : `${value}mm`
}

const PrecipitacionCard = ({ value, periodo, tipo, tipoCard = "" }) => {

    const { icono: IconoComponente, color } = obtenerIconoClima(periodo, value, tipo, tipoCard);

    return (
        <article className="card">
            <h2 className="hora">
                {formatearHoraDosCuatroDigitos(periodo)}
            </h2>
            <div className="icono">
                <IconoComponente size={48} color={color} />
            </div>
            <p className="valor">{valorFormateado(value, tipoCard)}</p>
        </article>
    );
}

export default PrecipitacionCard