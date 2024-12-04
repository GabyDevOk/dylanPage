// Usamos `node-fetch` de forma dinámica para evitar problemas de compatibilidad entre CommonJS y ESM
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Definimos la URL base para la API de The Movie Database (TMDb)
const API_URL = 'https://api.themoviedb.org/3/';

// Clave de acceso (API Key) para autenticarnos en TMDb
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8';

// Exportamos la función para obtener detalles de una película de TMDb
exports.themoviedbDetails = async (req, res) => {
  try {
    // Obtenemos el ID de la película de los parámetros de la solicitud
    const movieId = req.params.id;

    // Hacemos una petición GET a la API de TMDb usando el ID de la película
    const response = await fetch(`${API_URL}movie/${movieId}?language=es-Es`, {
      method: 'GET', // Método HTTP para la solicitud
      headers: {
        'Accept': 'application/json', // Indicamos que esperamos una respuesta en formato JSON
        'Authorization': `Bearer ${API_KEY}` // Autorizamos la solicitud con un token Bearer
      }
    });

    // Si la respuesta no es exitosa (status !== 200), devolvemos un error 404
    if (!response.ok) {
      return res.status(404).json({ 
        message: 'Movie not found', // Mensaje de error amigable
        error: `HTTP error ${response.status}` // Código de estado HTTP de la respuesta
      });
    }

    // Convertimos la respuesta a JSON
    const data = await response.json();

    // Enviamos los datos de la película como respuesta
    res.json(data);

  } catch (error) {
    // En caso de error, lo registramos en la consola
    console.error('Error:', error);

    // Devolvemos un error 500 con detalles del problema
    res.status(500).json({ 
      message: 'Error fetching movie data', // Mensaje amigable para el cliente
      error: error.message // Mensaje del error técnico
    });
  }
};



/* by Gabriel Muñoz
Resumen del código
Este archivo define una función llamada themoviedbDetails que:

Recibe un ID de película a través de los parámetros de la solicitud (req.params.id).
Consulta la API de TMDb para obtener los detalles de esa película específica:
Utiliza un token Bearer para autenticar la solicitud.
Especifica que el lenguaje de la respuesta debe ser español (language=es-Es).
Devuelve los datos de la película al cliente si la respuesta de TMDb es exitosa.
Maneja errores:
Si la película no es encontrada, devuelve un error 404 con un mensaje amigable.
Si ocurre un error interno, como un problema de conexión, devuelve un error 500 con detalles.
Uso esperado
Esta función es útil para aplicaciones que necesitan integrar datos de películas desde TMDb. Por ejemplo, podría ser parte de un backend de una aplicación de reseñas de películas. */