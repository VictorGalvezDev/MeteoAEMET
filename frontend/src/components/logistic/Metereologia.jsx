import React, { useEffect } from "react"
import "./css/Metereologia.css"

const Metereologia = (dataFetch) => {


    useEffect(()=> {
        if (dataFetch) {
            console.log(dataFetch);
        }

    },[dataFetch])

    return (
    <section>

    </section>
    )}

export default Metereologia