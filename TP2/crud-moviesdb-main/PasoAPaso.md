Configuración de la Base de Datos
Abrir MySQL: Asegúrate de que MySQL esté en ejecución.

Crear la base de datos:

Importa el archivo database/init.sql desde tu cliente de MySQL:
mysql -u root -p movies_system_db < database/init.sql
Verifica las tablas: Una vez importado, asegúrate de que las tablas estén creadas.

Ejecución del Proyecto
Iniciar el servidor:

Ejecuta este comando:
npm start
Si todo está bien, deberías ver:
yaml
Copiar código
Servidor corriendo en puerto 3000
Probar el servidor:

Abre tu navegador o Postman e ingresa: http://localhost:3000/api.
Endpoints Principales
A continuación, algunos endpoints clave:

Usuarios
Crear usuario:
POST /api/users
Body (JSON):

{
  "username": "usuario1",
  "email": "correo@ejemplo.com",
  "password": "contraseña123"
}

Películas
Listar todas las películas:

GET /api/movies
Buscar películas por filtros:

GET /api/movies/busqueda?titulo=Matrix
Crear película:

POST /api/movies
Body (JSON):
json
Copiar código
{
  "titulo": "Matrix",
  "director": "Wachowski",
  "anio": 1999,
  "pais": "EEUU"
}

Notas Adicionales
Autenticación:
Algunos endpoints requieren un token JWT. Consulta con el equipo cómo obtenerlo.
Errores comunes:
Si algo falla, verifica:
¿Está la base de datos corriendo?
¿Configuraste correctamente el archivo .env?
¿Instalaste las dependencias?