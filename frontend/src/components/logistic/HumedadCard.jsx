import React from "react"
import { formatearHoraDosCuatroDigitos } from "../../utils/DataFormat"

const HumedadCard = ({periodo, value}) => { 
    return (
            <article className="card">
                <h2 className="hora">
                    {formatearHoraDosCuatroDigitos(periodo)}
                </h2>
                <p className="valor">{value}%</p>
            </article>
        )
}

export default HumedadCard