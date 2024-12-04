-- Configuraciones iniciales
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";          -- Configuración para evitar incrementos automáticos en valores nulos.
START TRANSACTION;                               -- Inicia una transacción.
SET time_zone = "+00:00";                        -- Establece la zona horaria en UTC.

-- Configuraciones de codificación
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;                  -- Configura la conexión para usar UTF-8.

-- Base de datos: `movies_system_db_prueba`

-- Estructuras de las tablas principales

-- Tabla `actores`: Almacena información sobre actores.
CREATE TABLE `actores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `nacionalidad` varchar(50) DEFAULT NULL,
  `biografia` text DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla `generos`: Almacena géneros de películas.
CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla `listas`: Permite crear listas personalizadas de películas.
CREATE TABLE `listas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `es_publica` tinyint(1) DEFAULT 1,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla `peliculas`: Almacena información detallada de las películas.
CREATE TABLE `peliculas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `titulo_original` varchar(100) DEFAULT NULL,
  `director` varchar(100) DEFAULT NULL,
  `anio` int(11) DEFAULT NULL,
  `sinopsis` text DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL,
  `pais` varchar(50) DEFAULT NULL,
  `rating_promedio` float DEFAULT 0,
  `trailer_url` varchar(255) DEFAULT NULL,
  `fecha_estreno` date DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_modificacion` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Relaciones: Tablas auxiliares para relaciones y datos adicionales.

-- Tabla `pelicula_actor`: Relaciona películas con actores.
CREATE TABLE `pelicula_actor` (
  `pelicula_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  `rol` varchar(100) DEFAULT NULL,
  `es_protagonista` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla `pelicula_genero`: Relaciona películas con géneros.
CREATE TABLE `pelicula_genero` (
  `pelicula_id` int(11) NOT NULL,
  `genero_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla `pelicula_lista`: Relaciona películas con listas personalizadas.
CREATE TABLE `pelicula_lista` (
  `lista_id` int(11) NOT NULL,
  `pelicula_id` int(11) NOT NULL,
  `orden` int(11) DEFAULT NULL,
  `fecha_agregado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla `premios`: Almacena premios relacionados con películas.
CREATE TABLE `premios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `anio` int(11) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `pelicula_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla `reviews`: Permite almacenar opiniones y calificaciones de usuarios.
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `pelicula_id` int(11) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 10),
  `comentario` text DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `contiene_spoilers` tinyint(1) DEFAULT 0,
  `likes` int(11) DEFAULT 0,
  `dislikes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla `usuarios`: Almacena información de los usuarios registrados.
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `rol` enum('admin','editor','user') DEFAULT 'user',
  `avatar_url` varchar(255) DEFAULT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp(),
  `esta_activo` tinyint(1) DEFAULT 1,
  `ultimo_login` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Índices y restricciones

-- Establece claves primarias, índices y claves foráneas en las tablas.
ALTER TABLE `actores` ADD PRIMARY KEY (`id`);
ALTER TABLE `generos` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `nombre` (`nombre`);
ALTER TABLE `listas` ADD PRIMARY KEY (`id`), ADD KEY `usuario_id` (`usuario_id`);
ALTER TABLE `peliculas` ADD PRIMARY KEY (`id`), ADD FULLTEXT KEY `pelicula_search` (`titulo`,`titulo_original`,`director`);
ALTER TABLE `pelicula_actor` ADD PRIMARY KEY (`pelicula_id`,`actor_id`), ADD KEY `actor_id` (`actor_id`);
ALTER TABLE `pelicula_genero` ADD PRIMARY KEY (`pelicula_id`,`genero_id`), ADD KEY `genero_id` (`genero_id`);
ALTER TABLE `reviews` ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `unique_review` (`pelicula_id`,`usuario_id`);

-- Relación de claves foráneas para asegurar integridad referencial.
ALTER TABLE `listas` ADD CONSTRAINT `listas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

COMMIT; -- Finaliza la transacción.

/* By Gabriel Muñoz
Resumen del archivo
Tablas principales:

actores, generos, listas, peliculas, usuarios, entre otras.
Almacenan información relacionada con películas, actores, géneros y usuarios.
Relaciones:

Tablas como pelicula_actor, pelicula_genero, y pelicula_lista establecen relaciones entre películas, actores, géneros y listas.
Restricciones e índices:

Incluye claves primarias, índices únicos y foráneos para garantizar integridad y mejorar rendimiento.
Propósito:

Diseñado para un sistema de gestión de películas, soportando funcionalidades como creación de listas, calificaciones, relaciones actor-película, entre otras.
Es un diseño robusto, preparado para integridad de datos y escalabilidad en aplicaciones relacionadas con bases de datos de películas. */