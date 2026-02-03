import React, { useEffect, useState } from "react"
import "./css/Metereologia.css"
import dHoraria from "../../../horaria.json"
import dDiaria from "../../../diaria.json"
import Cabecera from "./Cabecera";
import { FaChevronDown } from 'react-icons/fa';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { WiRaindrop } from "react-icons/wi";
import PrecipitacionCard from "./PrecipitacionCard";


const URL_API = import.meta.env.VITE_API_URL;

const Metereologia = ({ dataFetch }) => {
    const [dataMetereologia, setDataMetereologia] = useState(null);

    useEffect(() => {
        const aemetFetch = async () => {
            //TODO: Una vez hechos los componentes, guardar los datos en un state y mostrarlos

            // try {
            //     if (dataFetch.tipo && dataFetch.provincia && dataFetch.municipio) {   
            //         const res = await fetch(`${URL_API}/api/aemet?tipo=${dataFetch.tipo}&prov=${dataFetch.provincia}&mun=${dataFetch.municipio}`);
            //         if (!res.ok) {
            //             const errorData = res.json()
            //             console.log("Error en la respuesta: "+res.status+ errorData.message);
            //         }
            //         const data = await res.json();
            //         console.log("Datos AEMET recibidos:", data);
            //     }
            // } catch (err) {
            //     console.log("Error en el fetch de aemet: " + err);
            // }
            if (dataFetch) {
                console.log(dHoraria);
                console.log(dDiaria);
                
                setDataMetereologia(dHoraria.data[0]);
            }

        }
        aemetFetch();
    }, [dataFetch]);


    return (
        (dataMetereologia &&
            <div>
                <section>
                    <Cabecera
                        data={dataMetereologia}
                        tipo={dataFetch?.tipo || 'horaria'}
                    />
                </section>
                <section>
                    <Accordion>
                        <AccordionSummary sx={{
                            backgroundColor: '#0d47a1',
                            borderRadius: '10px',
                            marginTop: '5px',
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                            '& .MuiAccordionSummary-expandIconWrapper': {
                                color: '#ffffff',
                            }
                        }}
                            expandIcon={<FaChevronDown />}
                            aria-controls="panel1-content"
                        >
                            <div className="tituloAcordeon">
                                <WiRaindrop className="estiloIconoAcordeon"/>Precipitaciones
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            {dHoraria.data[0].prediccion.dia[0].precipitacion.map((item, idx) => {
                                return <PrecipitacionCard key={idx} value={item.value} periodo= {item.periodo}/>
                            })}


                        </AccordionDetails>
                    </Accordion>
                </section>
            </div>)
    )
}

export default Metereologia