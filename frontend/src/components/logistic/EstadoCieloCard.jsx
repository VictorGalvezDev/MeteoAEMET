import React from "react";
import { formatearHoraDosCuatroDigitos } from "../../utils/DataFormat";
import { 
    WiDaySunny, WiNightClear, WiDayCloudy, WiNightAltCloudy, 
    WiCloud, WiCloudy, WiDayStormShowers, WiNightAltSleetStorm 
} from "weather-icons-react";

const iconoEstadoCielo = (value, periodo) => {
    const periodoNum = parseInt(periodo, 10);
    const esHorarioDiurno = periodoNum >= 7 && periodoNum <= 19;
    
    const configPorDefecto = {
        icono: null,
        color: "#cccccc"
    };
    
    if (!value || value === "") {
        return configPorDefecto;
    }
    
    const primerDigito = parseInt(value[0], 10);
    
    switch (primerDigito) {
        case 1:
            return {
                icono: esHorarioDiurno ? WiDaySunny : WiNightClear,
                color: esHorarioDiurno ? "#FFB300" : "#1565C0"
            };
        case 2:
            return {
                icono: esHorarioDiurno ? WiDayCloudy : WiNightAltCloudy,
                color: esHorarioDiurno ? "#FFB300" : "#1565C0"
            };
        case 3:
        case 4:
            return {
                icono: WiCloud,
                color: esHorarioDiurno ? "#2196F3" : "#1565C0"
            };
        case 5:
            return {
                icono: WiCloudy,
                color: esHorarioDiurno ? "#2196F3" : "#1565C0"
            };
        case 6:
            return {
                icono: esHorarioDiurno ? WiDayStormShowers : WiNightAltSleetStorm,
                color: esHorarioDiurno ? "#2196F3" : "#1565C0"
            };
        default:
            return configPorDefecto;
    }
};

const EstadoCieloCard = ({ value, periodo, descripcion }) => {
    const { icono: IconoComponente, color } = iconoEstadoCielo(value, periodo);

    return (
        <article className="card">
            <h2 className="hora">
                {formatearHoraDosCuatroDigitos(periodo)}
            </h2>
            <div className="icono">
                {IconoComponente ? (
                    <IconoComponente size={48} color={color} />
                ) : (
                    <span>No hay información</span> 
                )}
            </div>
            <div className="descripcion">
                {descripcion}
            </div>
        </article>
    );
};

export default EstadoCieloCard;