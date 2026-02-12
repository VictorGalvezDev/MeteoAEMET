import React from "react"

import Cabecera from "./Cabecera";
import PrecipitacionCard from "./PrecipitacionCard";
import EstadoCieloCard from "./EstadoCieloCard";
import TemperaturaCard from "./TemperaturaCard";
import VientoCard from "./VientoCard";
import HumedadCard from "./HumedadCard";

import { formatearFechaSinHora } from "../../utils/DataFormat";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FaChevronDown } from 'react-icons/fa';
import { WiRaindrop, WiHot, WiWindy, WiSunrise, WiHumidity } from "react-icons/wi";

const DataHoraria = ({dataMetereologiaHoraria, tipo, validaciones}) => {

    return (
        <div>
            <section>
                <Cabecera
                    nombre={dataMetereologiaHoraria.nombre}
                    provincia={dataMetereologiaHoraria.provincia}
                    elaborado={dataMetereologiaHoraria.elaborado}
                    web={dataMetereologiaHoraria.origen.web}
                    tipo={tipo || 'invalido'}
                />
            </section>
            <section>
                {dataMetereologiaHoraria.prediccion.dia.map(item => {
                    const validacion = validaciones[item.fecha] || {};


                    const tieneAlgunDato = Object.values(validacion).some(v => v === true);
                    if (!tieneAlgunDato) {
                        return null;
                    }

                    return (
                        <fieldset key={item.fecha}>
                            <legend><h1>{formatearFechaSinHora(item.fecha)}</h1></legend>

                            {/* Precipitacion */}
                            {validacion.tieneDatosPrecipitacion &&
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
                                                        tipo={tipo}
                                                        tipoCard={"precipitacion"}
                                                    />)
                                                    )}
                                            </div>


                                            {validacion.tieneProbPrecipitacionHoraria && (
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
                                                            tipo={tipo}
                                                            tipoCard={"probPrecipitacion"}
                                                        />
                                                        ))}
                                                </fieldset>
                                            )}

                                            {validacion.tieneProbTormenta && (
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
                                                            tipo={tipo}
                                                            tipoCard={"probTormenta"}
                                                        />
                                                        ))}
                                                </fieldset>
                                            )}
                                        </>
                                    </AccordionDetails>
                                </Accordion>)}


                            {/* estadoCielo */}
                            {validacion.tieneEstadoCielo && (
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
                            {validacion.tieneTemperatura &&
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
                                            {item.temperatura?.filter(
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
                                                    ))}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>)}


                            {/* viento */}
                            {validacion.tieneViento &&
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
                                            {
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
                                                />))}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>)}

                            {/* Humedad */}
                            {validacion.tieneHumedad && (<Accordion>
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
                                        {
                                            item.humedadRelativa?.filter(filHumedad =>
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
                                            ))}
                                    </div>
                                </AccordionDetails>
                            </Accordion>)}
                        </fieldset>
                    );
                })}
            </section>
        </div >
    )
}

export default DataHoraria