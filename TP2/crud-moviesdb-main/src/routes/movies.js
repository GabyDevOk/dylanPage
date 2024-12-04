// Importamos el módulo `express` para manejar rutas en el servidor
const express = require('express');

// Creamos un enrutador de Express
const router = express.Router();

// Importamos las funciones del controlador de películas
const { 
  createMovie,       // Controlador para crear una película
  getAllMovies,      // Controlador para obtener todas las películas
  getMovieByFilters, // Controlador para obtener películas según filtros
  updateMovie,       // Controlador para actualizar una película
  deleteMovie        // Controlador para eliminar una película
} = require('../controllers/movieController');

// Importamos el middleware para autenticar tokens (comentado en este caso)
// const { authenticateToken } = require('../middlewares/auth');

// Definimos las rutas del enrutador

// Ruta para obtener todas las películas
router.get('/', getAllMovies);

// Ruta para buscar películas por filtros
router.get('/busqueda', getMovieByFilters);

// Ruta para crear una nueva película (requiere autenticación)
router.post('/', authenticateToken, createMovie);

// Ruta para actualizar una película por su ID (requiere autenticación)
router.put('/:id', authenticateToken, updateMovie);

// Ruta para eliminar una película por su ID (requiere autenticación)
router.delete('/:id', authenticateToken, deleteMovie);

// Exportamos el enrutador para que pueda ser usado en otros archivos
module.exports = router;

/* By Gabriel Muñoz
Resumen del código
Este archivo configura las rutas para manejar operaciones relacionadas con películas en un servidor Express. Las rutas mapean solicitudes HTTP específicas a los controladores correspondientes:

GET /:
Llama a getAllMovies para obtener todas las películas.

GET /busqueda:
Llama a getMovieByFilters para buscar películas usando filtros.

POST /:
Llama a createMovie para crear una nueva película.
Usa el middleware authenticateToken para asegurarse de que solo usuarios autenticados puedan crear películas.

PUT /:id:
Llama a updateMovie para actualizar una película específica por su ID.
También requiere autenticación con authenticateToken.

DELETE /:id:
Llama a deleteMovie para eliminar una película específica por su ID.
Requiere autenticación.
El enrutador es exportado para ser utilizado en el archivo principal de la aplicación (normalmente app.js o server.js). Este enfoque modular organiza las rutas relacionadas con películas en un único archivo, facilitando el mantenimiento y la escalabilidad del proyecto. */