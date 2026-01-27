import React, { useEffect, useState } from "react"
import "./css/Filtro.css"
import Select from 'react-select'

const URL_API = 'http://localhost:3200';
const TIPOS = [
    { value: "horaria", label: "Predicción por horas" },
    { value: "diaria", label: "Predicción por días" }]


const Filtro = () => {
    const [provincias, setProvincias] = useState([]);
    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
    const [municipios, setMunicipios] = useState([]);
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);
    const [tipoSeleccionado, setTipoSeleccionado] = useState(TIPOS[0]);


    useEffect(() => {
        const cargarProvincias = async () => {
            try {
                const response = await fetch(`${URL_API}/api/provincias`);
                const data = await response.json();
                const opciones = data.provincias.map((item) => ({
                    value: item.id,
                    label: item.name
                }))
                setProvincias(opciones);
            } catch (error) {
                console.error("Error cargando provincias: ", error);
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
                const opciones = data.municipios.map((item) => ({
                    value: item.id,
                    label: item.name
                }))
                setMunicipios(opciones);
            } catch (error) {
                console.log("Error al cargar los municipios: ", error);

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


    return (
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

            <button className="btnFiltro">Buscar datos meteorológicos</button>
        </section>)
}

export default Filtro