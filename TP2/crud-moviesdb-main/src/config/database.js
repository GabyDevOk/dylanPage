// Importamos el módulo mysql2 en su modo de promesas, lo que nos permitirá usar async/await
const mysql = require('mysql2/promise');

// Importamos dotenv para cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Creamos un pool de conexiones con las configuraciones específicas
const pool = mysql.createPool({
  // Dirección del servidor donde se encuentra la base de datos
  host: process.env.DB_HOST, // Esto se lee desde las variables de entorno

  // Usuario con acceso a la base de datos
  user: process.env.DB_USER, // También definido en el archivo .env

  // Contraseña para autenticarse en la base de datos
  password: process.env.DB_PASSWORD, // Cargado desde las variables de entorno

  // Nombre de la base de datos a la que queremos conectarnos
  database: process.env.DB_NAME, // Especificado en el archivo .env

  // Configuración para mantener un número de conexiones activas
  waitForConnections: true, // Si está en true, espera a que haya una conexión disponible si todas están ocupadas.

  // Número máximo de conexiones simultáneas permitidas
  connectionLimit: 10, // Máximo 10 conexiones activas en el pool.

  // Límite de solicitudes en cola antes de que se rechacen nuevas conexiones
  queueLimit: 0 // Un valor de 0 significa que no hay límite para las solicitudes en cola.
});

// Exportamos el pool para que otros módulos de la aplicación puedan usarlo y ejecutar consultas en la base de datos
module.exports = pool;


/* By Gabriel Muñoz
Resumen del código
Este código configura un pool de conexiones a una base de datos MySQL utilizando el módulo mysql2/promise. Los parámetros de conexión (host, usuario, contraseña, nombre de la base de datos) se obtienen de un archivo .env para mantener las credenciales seguras.

El uso de un pool de conexiones mejora el rendimiento al reutilizar conexiones existentes, en lugar de abrir y cerrar una nueva conexión para cada consulta.
Este archivo exporta el pool configurado, lo que permite que otros módulos lo utilicen para interactuar con la base de datos. */