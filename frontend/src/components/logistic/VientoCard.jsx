import React from "react"
import { formatearHoraDosCuatroDigitos } from "../../utils/DataFormat";
import { BsArrowLeft, BsArrowUp, BsArrowDown, BsArrowRight,BsArrowUpLeft, BsArrowUpRight, BsArrowDownLeft, BsArrowDownRight  } from "react-icons/bs";

const iconosViento = {
    "N": BsArrowUp,
    "S": BsArrowDown,
    "E": BsArrowRight,
    "O": BsArrowLeft,
    "NO": BsArrowUpLeft,
    "NE": BsArrowUpRight,
    "SO": BsArrowDownLeft,
    "SE": BsArrowDownRight
};

const VientoCard = ({direccion, periodo, velocidad}) => {
    console.log(direccion);
    
    // Obtener el componente del icono (o null si no existe)
    const IconoComponente = direccion 
        ? iconosViento[direccion.trim().toUpperCase()] 
        : null;
    
    return (
        <article className="card">
            <h2 className="hora">
                {formatearHoraDosCuatroDigitos(periodo)}
            </h2>
            <div className="iconoViento">
                {IconoComponente 
                    ? <IconoComponente /> 
                    : "Dirección desconocida"
                }
            </div>
            <p className="valor">{velocidad} km/h</p>
        </article>
    )
}
export default VientoCard