const express = require('express');
const cors = require('cors');
const areas = require("./data.json");
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.AEMET_API_KEY;

// Middlewares
app.use(cors());
app.use(express.json());


// Obtener provincias
app.get('/api/provincias', async (req, res) => {
  try {
    if (!areas || areas.length == 0) {
      throw new Error("Error: La lista de datos incorrecta")
    }

    const provincias = areas.map((item) => ({
      id: item.id,
      name: item.name
    }))
    
    return res.json({
      success: true,
      provincias: provincias
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los datos de las provincias',
    });
  }
});


// Obtener mucicipios a partir de uan provincia
app.get('/api/provincia/:id/municipios', async (req, res) => {
  try {
    const { id } = req.params;

    if (!areas || areas.length == 0) {
      throw new Error("Error: La lista de datos incorrecta")
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID incorrecto',
        message: `Error con la ID de la provincia. data: ${id}, tipo: ${typeof id}`
      });
    }

    const municipios = areas.find(item => item.id == id).municipalities;

    if (!municipios || municipios.length == 0) {
      return res.status(404).json({
        success: false,
        error: 'Municipios no encontrados',
        message: `No existen municipios con código ${id}`
      });
    }

    return res.json({
      success: true,
      municipios: municipios
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener los municipios'
    });
  }
});

// AEMET
app.get('/api/aemet', async (req, res) => {
  try {

    //Extraer datos
    const { tipo, prov, mun } = req.query;

    if (!tipo || !prov || !mun) {
      return res.status(400).json({
        success: false,
        error: 'Parámetros incorrectos',
        message: 'Faltan parámetros: tipo, provincia y municipio son obligatorios'
      });
    }

    if (tipo != "horaria" && tipo != "diaria") {
      return res.status(400).json({
        success: false,
        error: 'Tipo incorrecto',
        message: 'Tipo debe ser horaria o diaria'
      });
    }

    // Si los parámetros son correctos, hacemos la petición a AEMET
    const response = await fetch(
      `https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/${tipo}/${prov}${mun}?api_key=${API_KEY}`
    );

    // Posibles respuestas de AEMET

    if (response.status == 429) {
      console.error('AEMET: Too Many Requests (429)');
      return res.status(429).json({
        success: false,
        error: 'Límite de peticiones excedido',
        message: 'Espera un minuto antes de hacer otra petición'
      });
    }

    if (response.status == 404) {
      console.error('AEMET: Not Found (404)');
      return res.status(404).json({
        success: false,
        error: 'Municipio no encontrado',
        message: `El código de provincia ${prov} o el cófigo de municipìo ${mun} no existe en AEMET`
      });
    }

    if (response.status == 401) {
      console.error('AEMET: Unauthorized (401)');
      return res.status(403).json({
        success: false,
        error: 'Acceso no autorizado',
        message: 'No tienes permisos o no funciona correctamente la API KEY de AEMET'
      });
    }

    if (!response.ok) {
      console.error(`Error HTTP en AEMET: ${response.status}`);
      return res.status(response.status).json({
        success: false,
        error: `Error al consultar AEMET: ${response.status}`
      });
    }

    const data = await response.json();
    // console.log('Respuesta: ', data);

    // Si hay datos, obtener el contenido
    if (data.datos) {
      const datosResponse = await fetch(data.datos);
      if (!datosResponse.ok) {
        throw new Error(`Error al obtener datos meteorológicos: ${datosResponse.status}`);
      }
      const meteorologia = await datosResponse.json();

      return res.json({
        success: true,
        data: meteorologia
      });
    } else {
      console.log(data.datos);
      return res.json({
        success: true,
        message: 'Respuesta directa de AEMET',
        data: data
      });
    }

  } catch (error) {
    console.error('❌ Error en endpoint AEMET:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Error al obtener datos meteorológicos',
      detalles: error.message
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado'
  });
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📝 Documentación disponible en http://localhost:${PORT}`);
});