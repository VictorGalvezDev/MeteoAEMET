import React, { useEffect, useState } from "react"
import "./css/Metereologia.css"
import dHoraria from "../../../horaria.json"
import dDiaria from "../../../diaria.json"
import Cabecera from "./Cabecera";
import PrecipitacionCard from "./PrecipitacionCard";
import ApiError from "../UI/ApiError";
import MetereologiaSkeleton from "../UI/metereologiaSkeleton";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FaChevronDown } from 'react-icons/fa';
import { WiRaindrop } from "react-icons/wi";
import { formatearFechaSinHora } from "../../utils/DataFormat";


const URL_API = import.meta.env.VITE_API_URL;

const comprobarExistenciaDatos = (data, tipo) => {

    const tieneDatosPrecipitacion = tipo == "horaria"
        ? data.precipitacion?.some(precip =>
            precip.value != undefined && precip.periodo != undefined
        )
        : data.probPrecipitacion?.some(precip =>
            precip.value != undefined && precip.periodo != undefined
        );

    const tieneProbPrecipitacionHoraria = tipo == "horaria"
        ? data.probPrecipitacion?.some(precip =>

            precip.value != undefined && precip.periodo != undefined
        ) : false;
    const tieneProbTormenta = tipo == "horaria"
        ? data.probTormenta?.some(precip =>
            precip.value != undefined && precip.periodo != undefined
        ) : false;

    return {
        tieneDatosPrecipitacion: tieneDatosPrecipitacion,
        tieneProbPrecipitacionHoraria: tieneProbPrecipitacionHoraria,
        tieneProbTormenta: tieneProbTormenta
    }
}




const Metereologia = ({ dataFetch }) => {
    const [errorData, setErrorData] = useState({});
    const [dataMetereologia, setDataMetereologia] = useState(null);
    const [isErrorData, setIsErrorData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const aemetFetch = async () => {
            //TODO: Una vez hechos los componentes, guardar los datos en un state y mostrarlos

            // try {
            // setIsLoading(true);
            //     if (dataFetch.tipo && dataFetch.provincia && dataFetch.municipio) {   
            //         const res = await fetch(`${URL_API}/api/aemet?tipo=${dataFetch.tipo}&prov=${dataFetch.provincia}&mun=${dataFetch.municipio}`);
            //         if (!res.ok) {
            //             setErrorData(res.json());
            //             isErrorData(true);
            //         }
            //         const data = await res.json();
            //         console.log("Datos AEMET recibidos:", data);
            //     }
            // } catch (err) {
            //  setErrorData({
            //         status: err.status || 500,
            //         message:'Hubo un fallo en la API de aemet'
            //     });
            //     setIsError(true);
            // } finally {
            //     setIsLoading(false)    
            // }

            if (dataFetch) {
                setIsLoading(false);
                console.log(dataFetch);

                console.log(dHoraria);
                console.log(dDiaria);
                setDataMetereologia(dHoraria.data[0]);
            }

        }
        aemetFetch();
    }, [dataFetch]);



    return (
        <>
            {isLoading ? (
                <div>
                    <MetereologiaSkeleton />
                </div>
            ) : isErrorData ? (
                <ApiError errorData={errorData} />
            ) : dataMetereologia ? (
                <div>
                    <section>
                        <Cabecera
                            nombre={dataMetereologia.nombre}
                            provincia={dataMetereologia.provincia}
                            elaborado={dataMetereologia.elaborado}
                            web={dataMetereologia.origen.web}
                            tipo={dataFetch?.tipo || 'invalido'}
                        />
                    </section>
                    <section>
                        {dataMetereologia.prediccion.dia.map((item, idx) => {

                            const {
                                tieneDatosPrecipitacion,
                                tieneProbPrecipitacionHoraria,
                                tieneProbTormenta
                            } = comprobarExistenciaDatos(item, dataFetch?.tipo);


                            if (!tieneDatosPrecipitacion) return null;

                            return (
                                <fieldset key={idx}>
                                    <legend><h1>{formatearFechaSinHora(item.fecha)}</h1></legend>
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
                                                fontSize: '1.5rem',
                                            }
                                        }}
                                            expandIcon={<FaChevronDown />}
                                            aria-controls="panel1-content"
                                        >
                                            <div className="tituloAcordeon">
                                                <WiRaindrop className="estiloIconoAcordeon" />Precipitaciones
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                            justifyContent: 'flex-start'
                                        }}>

                                            {dataFetch && dataFetch.tipo === "horaria" ? (
                                                <>
                                                    <div className="contenedorCards">
                                                        {item.precipitacion
                                                            ?.map((itemPrecipitacion, idxPrecipitacion) => (
                                                                <PrecipitacionCard
                                                                    key={idxPrecipitacion}
                                                                    value={itemPrecipitacion.value}
                                                                    periodo={itemPrecipitacion.periodo}
                                                                    tipo={dataFetch.tipo}
                                                                    tipoCard={"precipitacion"}
                                                                />
                                                            ))}
                                                    </div>
                                                    {tieneProbPrecipitacionHoraria ? (
                                                        <fieldset className="contenedorCards">
                                                            <legend className="tituloFiledCards">Probabilidad de Precipitación</legend>
                                                            {item.probPrecipitacion.map((itemPrecipitacion, idxPrecipitacion) => (
                                                                <PrecipitacionCard
                                                                    key={idxPrecipitacion}
                                                                    value={itemPrecipitacion.value}
                                                                    periodo={itemPrecipitacion.periodo}
                                                                    tipo={dataFetch.tipo}
                                                                    tipoCard={"probPrecipitacion"}
                                                                />
                                                            ))}
                                                        </fieldset>
                                                    ) : null}

                                                    {tieneProbTormenta ? (
                                                        <fieldset className="contenedorCards">
                                                            <legend className="tituloFiledCards">Probabilidad de Tormenta</legend>
                                                            {item.probTormenta.map((itemPrecipitacion, idxPrecipitacion) => (
                                                                <PrecipitacionCard
                                                                    key={idxPrecipitacion}
                                                                    value={itemPrecipitacion.value}
                                                                    periodo={itemPrecipitacion.periodo}
                                                                    tipo={dataFetch.tipo}
                                                                    tipoCard={"probTormenta"}
                                                                />
                                                            ))}
                                                        </fieldset>
                                                    ) : null}
                                                </>
                                            ) : (
                                                <div className="contenedorCards">
                                                    {item.probPrecipitacion
                                                        ?.map((itemPrecipitacion, idxPrecipitacion) => (
                                                            <PrecipitacionCard
                                                                key={idxPrecipitacion}
                                                                value={itemPrecipitacion.value}
                                                                periodo={itemPrecipitacion.periodo}
                                                                tipo={dataFetch.tipo}
                                                                tipoCard="probPrecipitacion"
                                                            />
                                                        ))}
                                                </div>)}
                                        </AccordionDetails>
                                    </Accordion>
                                </fieldset>
                            );
                        })}
                    </section>
                </div>
            ) : ""}
        </>
    )
}

export default Metereologia