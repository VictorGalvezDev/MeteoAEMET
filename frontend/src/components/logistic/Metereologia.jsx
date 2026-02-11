import React, { useEffect, useState } from "react"
import "./css/Metereologia.css"
import dHoraria from "../../../horaria.json"
import dDiaria from "../../../diaria.json"
import Cabecera from "./Cabecera";
import PrecipitacionCard from "./PrecipitacionCard";
import EstadoCieloCard from "./EstadoCieloCard";
import TemperaturaCard from "./TemperaturaCard";
import VientoCard from "./VientoCard";
import HumedadCard from "./HumedadCard";
import ApiError from "../UI/ApiError";
import MetereologiaSkeleton from "../UI/metereologiaSkeleton";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FaChevronDown } from 'react-icons/fa';
import { WiRaindrop, WiHot, WiWindy, WiSunrise, WiHumidity } from "react-icons/wi";
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
    const tieneEstadoCielo = data.estadoCielo?.some(ec =>
        ec.value != undefined && ec.value != "" &&
        ec.periodo != undefined && ec.periodo != "" &&
        ec.descripcion != undefined && ec.descripcion != ""
    )
    const tieneTemperatura = tipo == "horaria" ? data.temperatura?.some(temp =>
        temp.value != undefined && temp.value != "" &&
        temp.periodo != undefined && temp.periodo != ""
    ) : data.temperatura?.dato?.length > 0 ? data.temperatura?.dato?.some(temp =>
        temp.value != undefined && temp.value != "" &&
        temp.hora != undefined && temp.hora != "") : false;

    const tieneViento = tipo == "horaria" ? data.vientoAndRachaMax?.some(viento =>
        viento.direccion[0] != undefined && viento.direccion[0] != "" &&
        viento.velocidad[0] != undefined && viento.velocidad[0] != "" &&
        viento.periodo != undefined && viento.periodo != ""
    ) : data.viento.some(viento =>
        viento.direccion != undefined && viento.direccion != "" &&
        viento.velocidad != undefined && viento.velocidad != "" &&
        viento.periodo != undefined && viento.periodo != "");

    const tieneHumedad = tipo == "horaria" ? data.humedadRelativa?.some(hum =>
        hum.value != undefined && hum.value != "" &&
        hum.periodo != undefined && hum.periodo != ""
    ) : data.humedadRelativa?.dato?.length > 0 ? data.humedadRelativa?.dato?.some(temp =>
        temp.value != undefined && temp.value != "" &&
        temp.hora != undefined && temp.hora != "") : false;

    return {
        tieneDatosPrecipitacion: tieneDatosPrecipitacion,
        tieneProbPrecipitacionHoraria: tieneProbPrecipitacionHoraria,
        tieneProbTormenta: tieneProbTormenta,
        tieneEstadoCielo: tieneEstadoCielo,
        tieneTemperatura: tieneTemperatura,
        tieneViento: tieneViento,
        tieneHumedad: tieneHumedad
    }
}


const Metereologia = ({ dataFetch }) => {
    const [errorData, setErrorData] = useState({});
    const [dataMetereologia, setDataMetereologia] = useState(null);
    const [isErrorData, setIsErrorData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // UseEffect para desarrollo
    useEffect(() => {
        const aemetFetch = async () => {
            if (!dataFetch) return;
            setIsLoading(true);

            try {
                if (dataFetch.tipo === "horaria") {
                    setDataMetereologia(dHoraria.data[0]);
                } else {
                    setDataMetereologia(dDiaria.data[0]);
                }
            } catch (err) {
                setErrorData({
                    status: err.status || 500,
                    message: 'Hubo un fallo en la API de aemet'
                });
                setIsErrorData(true);
            } finally {
                setIsLoading(false);
            }
        }
        aemetFetch();
    }, [dataFetch]); 




    // useEffect(() => {
    //     const aemetFetch = async () => {
    //         try {
    //         setIsLoading(true);
    //             if (dataFetch.tipo && dataFetch.provincia && dataFetch.municipio) {   
    //                 const res = await fetch(`${URL_API}/api/aemet?tipo=${dataFetch.tipo}&prov=${dataFetch.provincia}&mun=${dataFetch.municipio}`);
    //                 if (!res.ok) {
    //                     setErrorData(res.json());
    //                     isErrorData(true);
    //                 }
    //                 const data = await res.json();
    //                 console.log("Datos AEMET recibidos:", data);
    //             }
    //         } catch (err) {
    //          setErrorData({
    //                 status: err.status || 500,
    //                 message:'Hubo un fallo en la API de aemet'
    //             });
    //             setIsError(true);
    //         } finally {
    //             setIsLoading(false)    
    //         }
    //     }
    //     aemetFetch();
    // }, [dataFetch]);



    return (
        <>
            {isLoading ? (
                <div>
                    <MetereologiaSkeleton />
                </div>
            ) : isErrorData ? (
                <ApiError errorData={errorData} />
            ) : dataMetereologia && (
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
                                tieneProbTormenta,
                                tieneEstadoCielo,
                                tieneTemperatura,
                                tieneViento,
                                tieneHumedad
                            } = comprobarExistenciaDatos(item, dataFetch?.tipo);

                            return (
                                <fieldset key={`${idx}-${dataFetch?.tipo}`}>
                                    <legend><h1>{formatearFechaSinHora(item.fecha)}</h1></legend>

                                    {/* Precipitacion */}
                                    {tieneDatosPrecipitacion &&
                                        (<Accordion>
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
                                                            {item.precipitacion?.filter(filPrecip =>
                                                                filPrecip.value != undefined &&
                                                                filPrecip.periodo != undefined &&
                                                                filPrecip.value != "" &&
                                                                filPrecip.periodo != "").map((itemPrecipitacion, idxPrecipitacion) =>
                                                                (<PrecipitacionCard
                                                                    key={idxPrecipitacion}
                                                                    value={itemPrecipitacion.value}
                                                                    periodo={itemPrecipitacion.periodo}
                                                                    tipo={dataFetch.tipo}
                                                                    tipoCard={"precipitacion"}
                                                                />)
                                                                )}
                                                        </div>

                                                        {tieneProbPrecipitacionHoraria && (
                                                            <fieldset className="contenedorCards">
                                                                <legend className="tituloFiledCards">Probabilidad de Precipitación</legend>
                                                                {item.probPrecipitacion.filter(filPrecip =>
                                                                    filPrecip.value != undefined &&
                                                                    filPrecip.periodo != undefined &&
                                                                    filPrecip.value != "" &&
                                                                    filPrecip.periodo != "").map((itemPrecipitacion, idxPrecipitacion) =>
                                                                    (<PrecipitacionCard
                                                                        key={idxPrecipitacion}
                                                                        value={itemPrecipitacion.value}
                                                                        periodo={itemPrecipitacion.periodo}
                                                                        tipo={dataFetch.tipo}
                                                                        tipoCard={"probPrecipitacion"}
                                                                    />
                                                                    ))}
                                                            </fieldset>
                                                        )}

                                                        {tieneProbTormenta && (
                                                            <fieldset className="contenedorCards">
                                                                <legend className="tituloFiledCards">Probabilidad de Tormenta</legend>
                                                                {item.probTormenta.filter(filPrecip =>
                                                                    filPrecip.value != undefined &&
                                                                    filPrecip.periodo != undefined &&
                                                                    filPrecip.value != "" &&
                                                                    filPrecip.periodo != "").map((itemPrecipitacion, idxPrecipitacion) =>
                                                                    (<PrecipitacionCard
                                                                        key={idxPrecipitacion}
                                                                        value={itemPrecipitacion.value}
                                                                        periodo={itemPrecipitacion.periodo}
                                                                        tipo={dataFetch.tipo}
                                                                        tipoCard={"probTormenta"}
                                                                    />
                                                                    ))}
                                                            </fieldset>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="contenedorCards">
                                                        {item.probPrecipitacion
                                                            ?.filter(filPrecip =>
                                                                filPrecip.value != undefined &&
                                                                filPrecip.periodo != undefined &&
                                                                filPrecip.value != "" &&
                                                                filPrecip.periodo != "").map((itemPrecipitacion, idxPrecipitacion) => (
                                                                    (<PrecipitacionCard
                                                                        key={idxPrecipitacion}
                                                                        value={itemPrecipitacion.value}
                                                                        periodo={itemPrecipitacion.periodo}
                                                                        tipo={dataFetch.tipo}
                                                                        tipoCard="probPrecipitacion"
                                                                    />)
                                                                ))}
                                                    </div>)}
                                            </AccordionDetails>
                                        </Accordion>)}


                                    {/* estadoCielo */}
                                    {tieneEstadoCielo && (
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
                                                    <WiSunrise className="estiloIconoAcordeon" />Estado Cielo
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <div className="contenedorCards">
                                                    {item.estadoCielo?.filter(filEstad =>
                                                        filEstad.value != undefined &&
                                                        filEstad.periodo != undefined &&
                                                        filEstad.descripcion != undefined &&
                                                        filEstad.value != "" &&
                                                        filEstad.periodo != "" &&
                                                        filEstad.descripcion != ""
                                                    ).map((itemEstadoCielo, idxEstadoCielo) =>
                                                    (<EstadoCieloCard
                                                        key={idxEstadoCielo}
                                                        value={itemEstadoCielo.value}
                                                        periodo={itemEstadoCielo.periodo}
                                                        descripcion={itemEstadoCielo.descripcion}
                                                    />
                                                    ))}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    )}

                                    {/* temperatura */}
                                    {tieneTemperatura &&
                                        (<Accordion>
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
                                                    <WiHot className="estiloIconoAcordeon" />Temperatura
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <div className="contenedorCards">
                                                    {dataFetch && dataFetch.tipo == "horaria" ?
                                                        item.temperatura?.filter(
                                                            filTemp =>
                                                                filTemp.value != undefined &&
                                                                filTemp.periodo != undefined &&
                                                                filTemp.value != "" &&
                                                                filTemp.periodo != "").map((itemTemperatura, idxTemperatura) => (
                                                                    <TemperaturaCard
                                                                        key={idxTemperatura}
                                                                        value={itemTemperatura.value}
                                                                        periodo={itemTemperatura.periodo}
                                                                    />
                                                                )) :
                                                        item.temperatura?.dato?.filter(
                                                            filTemp =>
                                                                filTemp.value != undefined &&
                                                                filTemp.hora != undefined &&
                                                                filTemp.value != "" &&
                                                                filTemp.hora != "").map((itemTemperatura, idxTemperatura) => (
                                                                    <TemperaturaCard
                                                                        key={idxTemperatura}
                                                                        value={itemTemperatura.value}
                                                                        periodo={itemTemperatura.hora}
                                                                    />
                                                                ))}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>)}


                                    {/* viento */}
                                    {tieneViento &&
                                        (<Accordion>
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
                                                    <WiWindy className="estiloIconoAcordeon" />Viento
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                                justifyContent: 'flex-start'
                                            }}>
                                                <div className="contenedorCards">
                                                    {dataFetch && dataFetch.tipo == "horaria" ?
                                                        item.vientoAndRachaMax?.filter(itemViento =>
                                                            itemViento.direccion?.[0] != undefined &&
                                                            itemViento.velocidad?.[0] != undefined &&
                                                            itemViento.periodo != undefined &&
                                                            itemViento.direccion?.[0] != "" &&
                                                            itemViento.velocidad?.[0] != "" &&
                                                            itemViento.periodo != ""
                                                        ).map((itemViento, idxViento) =>
                                                        (<VientoCard
                                                            key={idxViento}
                                                            direccion={itemViento.direccion[0]}
                                                            periodo={itemViento.periodo}
                                                            velocidad={itemViento.velocidad[0]}
                                                        />)) :
                                                        item.viento?.filter(filViento =>
                                                            filViento.direccion != undefined &&
                                                            filViento.velocidad != undefined &&
                                                            filViento.periodo != undefined &&
                                                            filViento.direccion != "" &&
                                                            filViento.velocidad != "" &&
                                                            filViento.periodo != ""
                                                        ).map((itemViento, idxViento) =>
                                                        (<VientoCard
                                                            key={idxViento}
                                                            direccion={itemViento.direccion}
                                                            periodo={itemViento.periodo}
                                                            velocidad={itemViento.velocidad}
                                                        />))}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>)}

                                    {/* Humedad */}
                                    {tieneHumedad && (<Accordion>
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
                                                <WiHumidity className="estiloIconoAcordeon" />Humedad Relativa
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                            justifyContent: 'flex-start'
                                        }}>
                                            <div className="contenedorCards">
                                                {dataFetch && dataFetch.tipo == "horaria" ? item.humedadRelativa?.filter(filHumedad =>
                                                    filHumedad.periodo != undefined &&
                                                    filHumedad.value != undefined &&
                                                    filHumedad.periodo != "" &&
                                                    filHumedad.value != ""
                                                ).map((itemHumedad, idxHumedad) =>

                                                (<HumedadCard
                                                    key={idxHumedad}
                                                    value={itemHumedad.value}
                                                    periodo={itemHumedad.periodo}
                                                />
                                                )) : item.humedadRelativa?.dato?.filter(filHumedad =>
                                                    filHumedad.value != undefined &&
                                                    filHumedad.hora != undefined &&
                                                    filHumedad.value != "" &&
                                                    filHumedad.hora != ""
                                                ).map((itemHumedad, idxHumedad) => (
                                                    <HumedadCard
                                                        key={idxHumedad}
                                                        value={itemHumedad.value}
                                                        periodo={itemHumedad.hora}
                                                    />
                                                ))}
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>)}
                                </fieldset>
                            );
                        })}
                    </section>
                </div >
            )}
        </>
    )
}

export default Metereologia