// Importamos el middleware para limitar la cantidad de solicitudes que puede realizar un cliente
const rateLimiter = require('express-rate-limit');

// Importamos Zod, una biblioteca para validar y estructurar datos
const { z } = require('zod');

/* Middleware para validar datos de entrada */

// Función para validar datos de entrada según un esquema de Zod
const validateSchema = (schema) => (req, res, next) => {
    try {
        // Validamos el cuerpo de la solicitud usando el esquema proporcionado
        schema.parse(req.body);
        // Si los datos son válidos, continuamos con la siguiente función middleware o controlador
        next();
    } catch (error) {
        // Si hay errores de validación, devolvemos un error 400 con los detalles
        res.status(400).json({
            status: 'error',
            message: 'Entrada no válida',
            error: error.errors
        });
    }
};

/* Configuración del limitador de solicitudes */

// Configuración para limitar el número de solicitudes a rutas sensibles como el inicio de sesión
const loginRateLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // Ventana de tiempo de 15 minutos
    max: 10, // Máximo de 10 intentos permitidos por IP en la ventana de tiempo
    message: {
        status: 'error',
        message: 'Demasiados intentos de inicio de sesión. Intente más tarde.'
    }
});

/* Esquemas de validación con Zod */

// Esquema para validar datos al crear un usuario
const createUserSchema = z.object({
    username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    email: z.string().email('Formato de correo electrónico no válido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

// Esquema para validar datos al actualizar un usuario (los campos son opcionales)
const updateUserSchema = createUserSchema.partial();

/* Esquemas para películas */

// Esquema para validar datos al crear una película
const createMovieSchema = z.object({
    titulo: z.string().min(1, "Se requiere título"), // Título obligatorio
    titulo_original: z.string().optional(), // Título original es opcional
    director: z.string().min(1, "Se requiere director"), // Director obligatorio
    anio: z.number()
        .int()
        .min(1900, "El año debe ser posterior a 1900")
        .max(new Date().getFullYear(), `Year can't be in the future`), // Año debe estar entre 1900 y el año actual
    sinopsis: z.string().min(10, "La sinopsis debe tener al menos 10 caracteres"), // Sinopsis obligatoria
    imagen_url: z.string().url("URL no válida para la imagen"), // URL válida para la imagen
    duracion: z.number().int().positive("La duración debe ser un número positivo"), // Duración positiva en minutos
    pais: z.string().min(1, "Se requiere el país"), // País obligatorio
    trailer_url: z.string().url("URL no válida para el tráiler"), // URL válida para el tráiler
    fecha_estreno: z.string()
        .refine(date => !isNaN(Date.parse(date)), "Fecha de lanzamiento no válida"), // Fecha de estreno válida
    usuario_id: z.number()
        .int()
        .positive("El ID de usuario debe ser un número positivo")
        .min(1, "Se requiere asociar la película a un usuario") // ID de usuario válido
});

// Esquema para validar datos al actualizar una película (los campos son opcionales)
const updateMovieSchema = createMovieSchema.partial();

/* Exportaciones */

// Exportamos los middlewares y esquemas para ser utilizados en otras partes del proyecto
module.exports = {
    validateSchema,       // Middleware de validación basado en Zod
    loginRateLimiter,     // Limitador de solicitudes
    createUserSchema,     // Esquema de validación para creación de usuarios
    updateUserSchema,     // Esquema de validación para actualización de usuarios
    createMovieSchema,    // Esquema de validación para creación de películas
    updateMovieSchema     // Esquema de validación para actualización de películas
};


/* By Gabriel Muñoz

Este archivo proporciona utilidades clave para validar datos y proteger rutas sensibles en un proyecto Express:

validateSchema(schema):

Middleware para validar datos de entrada usando Zod.
Lanza un error si los datos no cumplen con el esquema.
loginRateLimiter:

Middleware que limita la cantidad de solicitudes que un cliente puede realizar en un período de tiempo.
Configurado para permitir hasta 10 intentos de inicio de sesión en 15 minutos.
Esquemas de validación con Zod:

createUserSchema: Valida los datos al crear un usuario (e.g., nombre, correo electrónico, contraseña).
updateUserSchema: Valida datos al actualizar un usuario, permitiendo que los campos sean opcionales.
createMovieSchema: Valida los datos al crear una película (e.g., título, director, sinopsis, año).
updateMovieSchema: Similar a createMovieSchema, pero permite que los campos sean opcionales.
Estos elementos aseguran que los datos ingresados sean consistentes y protegen las rutas sensibles contra abusos, como ataques de fuerza bruta. Este enfoque modular facilita el mantenimiento y la reutilización de las validaciones en diferentes partes del proyecto. */