import React, { useEffect, useState } from "react"
import "./css/Metereologia.css"
import ApiError from "../UI/ApiError";
import MetereologiaSkeleton from "../UI/metereologiaSkeleton";
import DataHoraria from "./DataHoraria";
import DataDiaria from "./DataDiaria";


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
    ) : data.viento?.some(viento =>
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
    const [dataMetereologiaHoraria, setDataMetereologiaHoraria] = useState(null);
    const [dataMetereologiaDiaria, setDataMetereologiaDiaria] = useState(null);
    const [isErrorData, setIsErrorData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [validaciones, setValidaciones] = useState({});

    useEffect(() => {
        const aemetFetch = async () => {
            try {
                setIsLoading(true);
                setIsErrorData(false);

                if (dataFetch?.tipo && dataFetch?.provincia && dataFetch?.municipio) {
                    const res = await fetch(`${URL_API}/api/aemet?tipo=${dataFetch.tipo}&prov=${dataFetch.provincia}&mun=${dataFetch.municipio}`);

                    if (!res.ok) {
                        const errorData = await res.json();
                        setErrorData(errorData);
                        setIsErrorData(true);
                        return;
                    }

                    const data = await res.json();

                    if (data?.data?.[0]?.prediccion?.dia) {
                        const validacionesPorDia = {};

                        data.data[0].prediccion.dia.forEach((item) => {
                            validacionesPorDia[item.fecha] = comprobarExistenciaDatos(item, dataFetch.tipo);
                        });

                        setValidaciones(validacionesPorDia);
                        dataFetch.tipo == "horaria" ? setDataMetereologiaHoraria(data.data[0]) : setDataMetereologiaDiaria(data.data[0])

                    } else {
                        throw new Error("Estructura de datos incorrecta");
                    }
                }
            } catch (err) {
                console.error("Error en fetch:", err);
                setErrorData({
                    status: err.status || 500,
                    message: err.message || 'Hubo un fallo en la API de aemet'
                });
                setIsErrorData(true);
            } finally {
                setIsLoading(false);
            }
        };

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
            ) : dataMetereologiaHoraria && dataFetch.tipo == "horaria" ? (
                <DataHoraria dataMetereologiaHoraria={dataMetereologiaHoraria} tipo={dataFetch.tipo} validaciones={validaciones} />
            ) : dataMetereologiaDiaria && dataFetch.tipo == "diaria" && (
                <DataDiaria dataMetereologiaDiaria={dataMetereologiaDiaria} tipo={dataFetch.tipo} validaciones={validaciones} />)}
        </>
    )
}

export default Metereologia