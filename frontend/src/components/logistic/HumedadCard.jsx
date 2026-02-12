import React from "react"
import { formatearHoraGeneral } from "../../utils/DataFormat"

const HumedadCard = ({periodo, value}) => { 
    return (
            <article className="card">
                <h2 className="hora">
                    {formatearHoraGeneral(periodo)}
                </h2>
                <p className="valor">{value}%</p>
            </article>
        )
}

export default HumedadCard