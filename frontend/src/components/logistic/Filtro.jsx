import React, { useEffect, useState } from "react"
import "./css/Filtro.css"
import Select from 'react-select'
import FiltroError from "../UI/FiltroError";

const URL_API = import.meta.env.VITE_API_URL;
const TIPOS = [
    { value: "horaria", label: "Predicción por horas" },
    { value: "diaria", label: "Predicción por días" }]


const Filtro = ({ onBusqueda }) => {
    const [provincias, setProvincias] = useState([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
    const [municipios, setMunicipios] = useState([]);
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);
    const [tipoSeleccionado, setTipoSeleccionado] = useState(TIPOS[0]);

    const [isError, setIsError] = useState(false);
    const [errorData, setErrorData] = useState({});



    useEffect(() => {
        const cargarProvincias = async () => {
            try {
                const response = await fetch(`${URL_API}/api/provincias`);
                const data = await response.json();

                if (!data.success) {
                    throw {
                        status: response.status,
                        error: data.error,
                        message: data.message
                    };
                }

                const opciones = data.provincias.map((item) => ({
                    value: item.id,
                    label: item.name
                }))
                setProvincias(opciones);
            } catch (error) {
                setErrorData({
                    status: error.status || 500,
                    error: error.error || 'Error de conexión',
                    message: error.message || 'No se pudieron cargar las provincias'
                })
                setIsError(true)
            }
        };
        cargarProvincias();
    }, []);

    useEffect(() => {
        const cargarMunicipios = async () => {
            if (!provinciaSeleccionada) {
                setMunicipios([]);
                return;
            }

            try {
                const response = await fetch(`${URL_API}/api/provincia/${provinciaSeleccionada.value}/municipios`);
                const data = await response.json();
                if (!data.success) {
                    throw {
                        status: response.status,
                        error: data.error,
                        message: data.message
                    };
                }

                const opciones = data.municipios.map((item) => ({
                    value: item.id,
                    label: item.name
                }))
                setMunicipios(opciones);
            } catch (error) {
                setErrorData({
                    status: error.status || 500,
                    error: error.error || 'Error de conexión',
                    message: error.message || 'No se pudieron cargar las provincias'
                })
                setIsError(true)
            }
        };
        cargarMunicipios();
    }, [provinciaSeleccionada])


    // Handle para los párametros seleccionados
    const handleTipo = (op) => {
        setTipoSeleccionado(op);
    };

    const handleProvincia = (op) => {
        setProvinciaSeleccionada(op)
        setMunicipioSeleccionado(null);
    };
    const handleMunicipio = (op) => {
        setMunicipioSeleccionado(op)
    };


    const onHandleBuscar = () => {
        if (tipoSeleccionado && provinciaSeleccionada && municipioSeleccionado) {
            onBusqueda({
                tipo: tipoSeleccionado.value,
                provincia: provinciaSeleccionada.value,
                municipio: municipioSeleccionado.value
            });
        }
    }


    return (
        (isError) ? <FiltroError status={errorData.status} error={errorData.error} message={errorData.message} /> : (
            <section className="filtroBase">
                <h2 className="tituloFiltro">Buscar datos meteorológicos</h2>
                <div className="formatoSelect">
                    <div className="selectWrapper">
                        <p className="labelSelect">Tipo de búsqueda</p>
                        <Select
                            isSearchable
                            options={TIPOS}
                            onChange={handleTipo}
                            value={tipoSeleccionado}
                            placeholder="Selecciona un tipo"
                            className="select">
                        </Select>
                    </div>
                    <div className="selectWrapper">
                        <p className="labelSelect">Provincia</p>
                        <Select
                            isSearchable
                            options={provincias}
                            onChange={handleProvincia}
                            value={provinciaSeleccionada}
                            placeholder="Selecciona una provincia"
                            className="select">
                        </Select>
                    </div>
                    <div className="selectWrapper">
                        <p className="labelSelect">Municipio</p>
                        <Select
                            isSearchable
                            isDisabled={!provinciaSeleccionada}
                            options={municipios}
                            onChange={handleMunicipio}
                            value={municipioSeleccionado}
                            placeholder="Selecciona un municipio"
                            className="select">
                        </Select>
                    </div>

                </div>

                <button disabled={!tipoSeleccionado || !municipioSeleccionado || !provinciaSeleccionada} className="btnFiltro" onClick={onHandleBuscar}>Buscar datos meteorológicos</button>
            </section>))
}

export default Filtro