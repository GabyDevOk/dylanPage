// Importamos los modelos para manejar la base de datos relacionados con películas
const {createMovieModel, findMovieByFiltersModel} = require('../models/MovieModel');

// Importamos los esquemas de validación para las películas usando Zod
const {createMovieSchema, updateMovieSchema} = require('../utils/validators');

/* Crear una nueva película */

// Función para crear una película
const createMovie = async (req, res) => {
    try {
        // Validamos los datos enviados en el cuerpo de la solicitud usando el esquema Zod
        const validatedData = createMovieSchema.parse(req.body);

        // Guardamos la película en la base de datos llamando al modelo
        const movieId = await createMovieModel(validatedData);
        res.status(201).json({status: 'success', message: 'Película creada con éxito', movieId});
    } catch (error) {
        // Si hay un error de validación de Zod
        if (error.name === 'ZodError') {
            return res.status(400).json({
                status: 'error', 
                message: 'Datos de entrada no válidos', 
                errors: error.errors
            });
        }
        // Si ocurre cualquier otro error
        res.status(500).json({
            status: 'error', 
            message: 'Error al crear una película', 
            error: error.message
        });
    }
};

/* Obtiene una película por filtros */

// Función para buscar películas en la base de datos con filtros
const getMovieByFilters = async (req, res) => {
    try {
        // Convertimos los parámetros de la consulta en un objeto con filtros
        const filters = {
            id: req.query.id ? parseInt(req.query.id, 10) : undefined,
            titulo: req.query.titulo,
            titulo_original: req.query.titulo_original,
            director: req.query.director,
            anio: req.query.anio ? parseInt(req.query.anio, 10) : undefined,
            sinopsis: req.query.sinopsis,
            imagen_url: req.query.imagen_url,
            duracion: req.query.duracion ? parseInt(req.query.duracion, 10) : undefined,
            pais: req.query.pais,
            rating_promedio: req.query.rating_promedio ? parseFloat(req.query.rating_promedio) : undefined,
            trailer_url: req.query.trailer_url,
            fecha_estreno: req.query.fecha_estreno,
            fecha_creacion: req.query.fecha_creacion,
            fecha_modificacion: req.query.fecha_modificacion,
            usuario_id: req.query.usuario_id ? parseInt(req.query.usuario_id, 10) : undefined
        };

        // Buscamos las películas que coinciden con los filtros en la base de datos
        const movieDetails = await findMovieByFiltersModel(filters);

        // Si no se encuentran películas, devolvemos un error 404
        if (!movieDetails || movieDetails.length === 0) {
            return res.status(404).json({
                status: 'error', 
                message: 'No se encontraron películas con los filtros proporcionados'
            });
        }

        // Devolvemos los detalles de las películas encontradas
        res.json({ status: 'success', data: movieDetails });
    } catch (error) {
        // Manejamos errores genéricos
        res.status(500).json({
            status: 'error', 
            message: 'Error al buscar películas', 
            error: error.message
        });
    }
};

/* Actualiza una película */

// Función para actualizar una película
const updateMovie = async (req, res) => {
    try {
        // Obtenemos el ID de la película desde los parámetros de la URL
        const { id } = req.params;

        // Validamos los datos de entrada usando Zod
        const validatedData = updateMovieSchema.parse(req.body);

        // Actualizamos la película en la base de datos usando el modelo
        const result = await Movie.update(id, validatedData);

        // Si la película no existe, devolvemos un error 404
        if (!result) {
            return res.status(404).json({
                status: 'error', 
                message: 'Película no encontrada'
            });
        }

        // Confirmamos la actualización
        res.json({
            status: 'success', 
            message: 'Película actualizada con éxito'
        });
    } catch (error) {
        // Si hay errores de validación de Zod
        if (error.name === 'ZodError') {
            return res.status(400).json({
                status: 'error', 
                message: 'Datos de entrada no válidos', 
                errors: error.errors
            });
        }
        // Otros errores
        res.status(500).json({
            status: 'error', 
            message: 'Error al actualizar la película', 
            error: error.message
        });
    }
};

/* Elimina una película */

// Función para eliminar una película
const deleteMovie = async (req, res) => {
    try {
        // Obtenemos el ID de la película desde los parámetros de la URL
        const { id } = req.params;

        // Eliminamos la película de la base de datos usando el modelo
        const result = await Movie.delete(id);

        // Si la película no existe, devolvemos un error 404
        if (!result) {
            return res.status(404).json({
                status: 'error', 
                message: 'Película no encontrada'
            });
        }

        // Confirmamos la eliminación
        res.json({
            status: 'success', 
            message: 'Película eliminada con éxito'
        });
    } catch (error) {
        // Manejamos errores genéricos
        res.status(500).json({
            status: 'error', 
            message: 'Error al eliminar la película', 
            error: error.message
        });
    }
};

// Exportamos las funciones para que se puedan usar en otros archivos
module.exports = {createMovie, getMovieByFilters, updateMovie, deleteMovie};

/* by Gabriel Muñoz
Resumen del código
Este archivo define un controlador para gestionar películas con las siguientes funciones:

createMovie: Valida y crea una película en la base de datos.
getMovieByFilters: Busca películas por filtros (como ID, título, director, etc.).
updateMovie: Actualiza los detalles de una película existente.
deleteMovie: Elimina una película por su ID.
Cada función maneja errores, incluyendo validaciones de datos (usando Zod) y errores de servidor, devolviendo respuestas claras al cliente. Estas funciones se exportan para su uso en las rutas. */
