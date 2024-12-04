// Importamos la configuración de la base de datos
const db = require('../config/database');

// Crear una película en la base de datos
const createMovieModel = async (movie) => {
  // Consulta SQL para insertar una nueva película en la tabla `peliculas`
  const query = `
    INSERT INTO peliculas (
      titulo, titulo_original, director, anio, sinopsis, imagen_url, duracion, 
      pais, rating_promedio, trailer_url, fecha_estreno, usuario_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Asignamos valores a los parámetros de la consulta (con valores por defecto si están ausentes)
  const values = [
    movie.titulo,
    movie.titulo_original || null,
    movie.director || null,
    movie.anio || null,
    movie.sinopsis || null,
    movie.imagen_url || null,
    movie.duracion || null,
    movie.pais || null,
    movie.rating_promedio || 0,
    movie.trailer_url || null,
    movie.fecha_estreno || null,
    movie.usuario_id || null,
  ];

  // Ejecutamos la consulta en la base de datos
  const [result] = await db.execute(query, values);

  // Retornamos el resultado de la operación (e.g., ID de la película insertada)
  return result;
};

// Obtener películas de la base de datos según filtros
const findMovieByFiltersModel = async (filters) => {
  try {
    // Base de la consulta SQL
    let query = 'SELECT * FROM peliculas';

    // Arrays para construir dinámicamente las condiciones y valores
    const values = [];
    const conditions = [];

    // Agregamos filtros dinámicamente según los valores disponibles
    if (filters.id) {
      conditions.push('id = ?');
      values.push(filters.id);
    }
    if (filters.titulo) {
      conditions.push('titulo LIKE ?');
      values.push(`%${filters.titulo}%`);
    }
    if (filters.titulo_original) {
      conditions.push('titulo_original LIKE ?');
      values.push(`%${filters.titulo_original}%`);
    }
    if (filters.director) {
      conditions.push('director LIKE ?');
      values.push(`%${filters.director}%`);
    }
    if (filters.anio) {
      conditions.push('anio = ?');
      values.push(filters.anio);
    }
    if (filters.sinopsis) {
      conditions.push('sinopsis LIKE ?');
      values.push(`%${filters.sinopsis}%`);
    }
    if (filters.imagen_url) {
      conditions.push('imagen_url = ?');
      values.push(filters.imagen_url);
    }
    if (filters.duracion) {
      conditions.push('duracion = ?');
      values.push(filters.duracion);
    }
    if (filters.pais) {
      conditions.push('pais LIKE ?');
      values.push(`%${filters.pais}%`);
    }
    if (filters.rating_promedio) {
      conditions.push('rating_promedio >= ?');
      values.push(filters.rating_promedio);
    }
    if (filters.trailer_url) {
      conditions.push('trailer_url = ?');
      values.push(filters.trailer_url);
    }
    if (filters.fecha_estreno) {
      conditions.push('fecha_estreno = ?');
      values.push(filters.fecha_estreno);
    }
    if (filters.fecha_creacion) {
      conditions.push('fecha_creacion = ?');
      values.push(filters.fecha_creacion);
    }
    if (filters.fecha_modificacion) {
      conditions.push('fecha_modificacion = ?');
      values.push(filters.fecha_modificacion);
    }
    if (filters.usuario_id) {
      conditions.push('usuario_id = ?');
      values.push(filters.usuario_id);
    }

    // Si hay condiciones, las agregamos a la consulta
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    // Ordenamos los resultados por la fecha de creación en orden descendente
    query += ' ORDER BY fecha_creacion DESC';

    // Ejecutamos la consulta y retornamos los resultados
    const [rows] = await db.execute(query, values);
    return rows;

  } catch (error) {
    // Registramos el error en la consola y lanzamos una excepción
    console.error('Error en findMovieByFiltersModel:', error.message);
    throw new Error('Error al filtrar películas');
  }
};

// Exportamos las funciones para que puedan ser utilizadas en otros módulos
module.exports = {
  createMovieModel,       // Función para insertar una película
  findMovieByFiltersModel // Función para buscar películas según filtros
  // Los métodos `findAllMovieModel`, `updateMovieModel`, y `deleteMovieModel` se mencionan pero no están implementados aquí
};

/* By Gabriel Muñoz
Resumen del código
Este archivo define dos funciones principales para interactuar con la tabla peliculas en una base de datos MySQL:

createMovieModel(movie):

Inserta una nueva película en la base de datos.
Recibe un objeto movie con los datos de la película.
Usa una consulta SQL parametrizada para evitar inyecciones SQL.
findMovieByFiltersModel(filters):

Busca películas en la base de datos basándose en un conjunto de filtros dinámicos.
Construye la consulta SQL y sus valores de forma segura según los filtros proporcionados (e.g., título, director, año, etc.).
Devuelve los resultados ordenados por la fecha de creación.
Ambas funciones son exportadas para ser utilizadas en otros módulos del proyecto. Este enfoque asegura seguridad, flexibilidad y modularidad en el manejo de la base de datos. */