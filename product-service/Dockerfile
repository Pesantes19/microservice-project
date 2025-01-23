# Usar una imagen oficial de Node.js como base
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos del proyecto al contenedor
COPY package*.json ./

# Instalar las dependencias de Node.js
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Exponer el puerto en el que el servidor escuchará (puerto 3002 por defecto)
EXPOSE 3002

# Establecer el comando para iniciar el servicio
CMD ["npm", "start"]
