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

const DataDiaria = ({ dataMetereologiaDiaria, tipo, validaciones }) => {
    return (
        <div>
            <section>
                <Cabecera
                    nombre={dataMetereologiaDiaria.nombre}
                    provincia={dataMetereologiaDiaria.provincia}
                    elaborado={dataMetereologiaDiaria.elaborado}
                    web={dataMetereologiaDiaria.origen.web}
                    tipo={tipo || 'invalido'}
                />
            </section>
            <section>
                {dataMetereologiaDiaria.prediccion.dia.map(item => {
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
                                        {(
                                            <div className="contenedorCards">
                                                {item.probPrecipitacion
                                                    ?.filter(filPrecip =>
                                                        filPrecip?.value !== undefined &&
                                                        filPrecip?.value !== null &&
                                                        filPrecip?.periodo !== undefined &&
                                                        filPrecip?.periodo !== null &&
                                                        filPrecip?.periodo !== ""
                                                    )
                                                    .map((itemPrecipitacion, idxPrecipitacion) => (
                                                        <PrecipitacionCard
                                                            key={idxPrecipitacion}
                                                            value={itemPrecipitacion.value}
                                                            periodo={itemPrecipitacion.periodo}
                                                            tipo={tipo}
                                                            tipoCard="probPrecipitacion"
                                                        />
                                                    ))
                                                }
                                            </div>)}
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
                                            {
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
                                        {item.humedadRelativa?.dato?.filter(filHumedad =>
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
    )

}

export default DataDiaria