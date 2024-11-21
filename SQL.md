-- crear una nueva base de datos

-- este comando crea una base de datos llamada "tienda"

CREATE DATABASE tienda;

-- seleccionar la base de datos con la cual vamos a trabajar
-- IMPORTANTE : es necesario seleccionar la base de datos antes de crear tablas en ella 

USE tienda;

--crear la tabla "productos"
--esta tabla almacena informacion basica de los productos

-- la tabla debe tener el nombre en plural (producto"s") y las columas en singular ("producto")
-- 1 nombre, 2 tipo de dato , 3configuracion

CREATE TABLE productos (
id_producto INT AUTO_INCREMENT PRIMARY KEY, --identificador unico para cada producto
nombre VARCHAR(255) NOT NULL,               --nombre del producto, obligatorio
descripcion TEXT,                           --descripcion del producto
precio DECIMAL (10,2) NOT NULL,              --precio del producto . con dos decimales
stock INT NOT NULL DEFAULT 0                 --cantidad disponible e inventario, por defecto 0
);

--crear la tabla "categorias"
-- esta tabla almacena las categorias disponibles para clasificar los productos

CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,    --identificador unico para cada categoria
    nombre_categoria VARCHAR(255) NOT NULL -- nombre de la categoria, obligatoria
)

crear tabla pivote "productos_categorias"
--esta tabla sirve para sociar productos con varias categorias

CREATE TABLE productos_categorias (
    id_producto INT,                 -- ID del producto (clave foranea)
    id_categoria INT,                -- ID de la categoria (clave foranea)
    primary key (id_producto ,id_categoria),  -- llave primaria compuesta por ambas columnas
    CONSTRAINT fk_producto FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE,
    -- la clave foranea fk_producto asegura que id_producto exista en la tambla "productos"
    -- si el producto es eliminado, los registros relacionados tambien se eliminan (ON DELETE CASCADE)

        CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES productos(id_categoria) ON DELETE CASCADE,
    -- la clave foranea fk_categoria asegura que id_categoria exista en la tabla "categorias"
    -- si la categoria es eliminada, los registros relacionados tambien se eliminan (ON DELETE CASCADE)
     
)



Explicación Detallada
Base de datos:

Se utiliza el comando CREATE DATABASE para crear una base de datos llamada tienda.
El comando USE tienda selecciona esta base de datos para asegurarte de que los objetos creados posteriormente se almacenarán en ella.
Tabla productos:

Tiene un identificador único id_producto como clave primaria.
Incluye campos como nombre, descripcion, precio y stock, con tipos de datos adecuados para cada uno.
Tabla categorias:

Similar a productos, pero representa las categorías disponibles.
Tabla pivote productos_categorias:

Relaciona productos con categorías de manera flexible.
Utiliza claves foráneas para garantizar la integridad referencial.
Implementa ON DELETE CASCADE para mantener consistencia si se elimina un producto o categoría.

