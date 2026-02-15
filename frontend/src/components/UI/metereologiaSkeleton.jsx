import React from "react";
import "./css/metereologiaSkeleton.css";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';

const MetereologiaSkeleton = () => {
    return (
        <div className="metereologia-skeleton">

            <section className="cabecera-skeleton">
                <div className="skeleton-titulo-container">
                    <div className="skeleton-titulo-principal"></div>
                    <div className="skeleton-tipo-dato"></div>
                </div>
                
                <div className="skeleton-localizacion">
                    <div className="skeleton-icono"></div>
                    <div className="skeleton-texto-largo"></div>
                </div>
                
                <div className="skeleton-fecha">
                    <div className="skeleton-icono-pequeno"></div>
                    <div className="skeleton-texto-medio"></div>
                </div>
                
                <div className="skeleton-descripcion">
                    <div className="skeleton-texto-muy-largo"></div>
                </div>
            </section>

            <section className="acordeones-skeleton">
                {[1, 2, 3].map((dia) => (
                    <fieldset key={dia} className="skeleton-dia">
                        <legend className="skeleton-legend">
                            <div className="skeleton-fecha-dia"></div>
                        </legend>
                        
                        <Accordion className="skeleton-accordion" disabled>
                            <AccordionSummary 
                                sx={{
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '10px',
                                    marginTop: '5px',
                                    '& .MuiAccordionSummary-expandIconWrapper': {
                                        color: '#b0b0b0',
                                    }
                                }}
                            >
                                <div className="skeleton-titulo-acordeon">
                                    <div className="skeleton-icono-acordeon"></div>
                                    <div className="skeleton-texto-acordeon"></div>
                                </div>
                            </AccordionSummary>
                        </Accordion>
                        {[1, 2, 3, 4].map((acordeon) => (
                            <Accordion key={acordeon} className="skeleton-accordion" disabled>
                                <AccordionSummary 
                                    sx={{
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '10px',
                                        marginTop: '5px',
                                        '& .MuiAccordionSummary-expandIconWrapper': {
                                            color: '#b0b0b0',
                                        }
                                    }}
                                >
                                    <div className="skeleton-titulo-acordeon">
                                        <div className="skeleton-icono-acordeon"></div>
                                        <div className="skeleton-texto-acordeon"></div>
                                    </div>
                                </AccordionSummary>
                            </Accordion>
                        ))}
                    </fieldset>
                ))}
            </section>
        </div>
    );
};

export default MetereologiaSkeleton;