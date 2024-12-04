// Importamos los módulos necesarios
const express = require('express'); // Framework para construir el servidor
const cors = require('cors');       // Middleware para permitir solicitudes desde otros dominios
const helmet = require('helmet');   // Middleware para mejorar la seguridad del servidor
require('dotenv').config();         // Cargamos las variables de entorno desde el archivo .env

// Creamos la aplicación Express
const app = express();

// Middlewares globales

// Habilitamos CORS para permitir solicitudes desde otros dominios
app.use(cors());

// Usamos Helmet para establecer cabeceras HTTP seguras
app.use(helmet());

// Habilitamos la lectura de cuerpos JSON en las solicitudes
app.use(express.json());

// Importamos las rutas desde los archivos correspondientes
const themoviedbRoutes = require('./routes/themoviesdb'); // Rutas para integraciones con The Movie Database (TMDb)
const authRoutes = require('./routes/users');            // Rutas para autenticación y manejo de usuarios
const movieRoutes = require('./routes/movies');          // Rutas para manejo de películas

// Registramos las rutas con prefijos para estructurar la API
app.use('/api/themoviesdb', themoviedbRoutes); // Rutas relacionadas con TMDb
app.use('/api/users', authRoutes);            // Rutas relacionadas con usuarios
app.use('/api/movies', movieRoutes);          // Rutas relacionadas con películas

// Definimos el puerto del servidor, tomando el valor de las variables de entorno o un valor predeterminado (3000)
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor en el puerto especificado
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

/* By Gabriel Muñoz
Resumen del código
Este archivo configura un servidor básico usando Express y define los siguientes puntos clave:

Middlewares globales:

cors: Permite solicitudes entre diferentes dominios.
helmet: Mejora la seguridad del servidor al configurar cabeceras HTTP seguras.
express.json(): Permite que el servidor lea y procese cuerpos de solicitudes en formato JSON.
Rutas importadas:

themoviedbRoutes: Maneja integraciones con la API de The Movie Database (TMDb).
authRoutes: Maneja autenticación y funcionalidades relacionadas con usuarios.
movieRoutes: Maneja operaciones CRUD relacionadas con películas.
Prefijos de API:

Las rutas se agrupan bajo prefijos como /api/themoviesdb, /api/users, y /api/movies para organizar las funciones de la API.
Servidor:

El servidor escucha en un puerto definido en las variables de entorno (process.env.PORT) o utiliza el puerto 3000 por defecto.
Este archivo sirve como punto de entrada principal para la aplicación y organiza la estructura del servidor de forma clara y modular. */