# Microservice Project (Auth and Product Services)

Este proyecto consiste en dos microservicios: uno para la **autenticación** (`auth-service`) y otro para **gestionar productos** (`product-service`), ambos utilizando **MongoDB** como base de datos y **JWT** para la autenticación.

## Estructura del Proyecto

El proyecto está dividido en dos servicios principales:

- **Auth Service**: Gestiona el registro, inicio de sesión y generación de tokens JWT para autenticación.
- **Product Service**: Permite crear, leer, actualizar y eliminar productos.

Además, ambos servicios están desplegados utilizando **Docker** y se comunican entre sí.

## Requisitos Previos

- **Node.js** (Versión 18 o superior)
- **Docker** y **Docker Compose** instalados

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url_del_repositorio>
   cd <nombre_del_repositorio>
Configura las dependencias para ambos servicios:

En el directorio raíz de ambos servicios (auth-service y product-service), instala las dependencias con npm:

bash

npm install
Configuración de Docker
Para facilitar el despliegue, el proyecto usa Docker y Docker Compose.

Estructura del Proyecto
bash

MICROSERVICE-PROJECT
├── auth-service/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── product-service/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
└── docker-compose.yml
docker-compose.yml
Este archivo define la configuración de los contenedores de Docker para los servicios de autenticación, productos y la base de datos MongoDB.

yaml

services:
  auth-service:
    build:
      context: ./auth-service
    ports:
      - "3001:3001"
    environment:
      - MONGO_URI=mongodb://mongo:27017/auth-db
      - JWT_SECRET=mi_clave_secreta
      - PORT=3001
    depends_on:
      - mongo

  product-service:
    build:
      context: ./product-service
    ports:
      - "3002:3002"
    environment:
      - MONGO_URI=mongodb://mongo:27017/product-db
      - JWT_SECRET=mi_clave_secreta
      - PORT=3002
    depends_on:
      - auth-service

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
.env (para ambos servicios)
Asegúrate de configurar las variables de entorno necesarias para cada servicio. Ejemplo para el servicio de autenticación (auth-service):

env

MONGO_URI=mongodb://mongo:27017/auth-db
JWT_SECRET=mi_clave_secreta
PORT=3001
El archivo .env para el servicio de productos (product-service) tendrá una configuración similar.

Dockerfile (para ambos servicios)
Ambos servicios utilizan un Dockerfile similar. Aquí tienes el ejemplo para el servicio de autenticación:

dockerfile

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
Iniciar el Proyecto con Docker Compose
Para levantar el proyecto, ejecuta los siguientes comandos en la raíz del proyecto:

Construir y levantar los contenedores:

bash
docker-compose up --build
Verificar que todo esté funcionando:

El servicio de autenticación estará disponible en http://localhost:3001.
El servicio de productos estará disponible en http://localhost:3002.
MongoDB estará corriendo en el puerto 27017.
Uso de la API
1. Auth Service (/api/auth)
Registro de Usuario: POST /api/auth/register

Crea un nuevo usuario con username y password.
Login de Usuario: POST /api/auth/login

Inicia sesión y devuelve un token JWT.
2. Product Service (/api/products)
Crear Producto: POST /api/products

Crea un nuevo producto (requiere autenticación).
Obtener Productos: GET /api/products

Devuelve la lista de todos los productos.
Obtener Producto por ID: GET /api/products/:id

Devuelve un producto específico por su ID.
Actualizar Producto: PUT /api/products/:id

Actualiza la información de un producto por su ID (requiere autenticación).
Eliminar Producto: DELETE /api/products/:id

Elimina un producto por su ID (requiere autenticación).
Seguridad
El servicio de autenticación utiliza JWT (JSON Web Tokens) para autenticar a los usuarios. Para acceder a las rutas protegidas del servicio de productos, se debe incluir un token JWT válido en el encabezado de la solicitud.

Ejemplo de solicitud con token:
bash
curl -X GET http://localhost:3002/api/products \
  -H "Authorization: Bearer <your_jwt_token>"
Tecnologías Usadas
Node.js: Plataforma de ejecución para el servidor.
Express.js: Framework web para Node.js.
MongoDB: Base de datos NoSQL.
JWT: Para la autenticación y autorización.
Docker: Para la contenerización y despliegue.
Docker Compose: Para gestionar la infraestructura de múltiples contenedores.
