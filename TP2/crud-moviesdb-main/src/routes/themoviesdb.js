// Importamos el módulo `express` para manejar rutas en el servidor
const express = require('express');

// Creamos un enrutador de Express
const router = express.Router();

// Importamos el controlador que gestiona la integración con The Movie Database (TMDb)
const themoviedbController = require('../controllers/themoviedbController');

// Definimos una ruta para obtener los detalles de una película desde TMDb
router.get('/movie/:id', themoviedbController.themoviedbDetails);
// - Método HTTP: GET
// - Ruta: /movie/:id
// - Parámetro `id`: el ID de la película que queremos consultar
// - Controlador: themoviedbDetails

// Exportamos el enrutador para que pueda ser utilizado en otros archivos
module.exports = router;

/* 
by Gabriel Muñoz
Resumen del código
Este archivo configura una ruta específica para interactuar con la API de The Movie Database (TMDb).

Ruta definida:

GET /movie/:id:
Llama a la función themoviedbDetails del controlador themoviedbController.
Recupera detalles de una película específica desde TMDb usando el ID proporcionado como parámetro en la URL (:id).
Exportación:

El enrutador se exporta para que pueda ser usado en el archivo principal de la aplicación (por ejemplo, app.js o server.js).
Este enfoque modular organiza las rutas relacionadas con la integración de TMDb, facilitando su mantenimiento y separación lógica del resto del proyecto. */