# Usar la imagen oficial de Node.js como base
FROM node:20 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
#RUN npm install --force --ignore-scripts
RUN npm install --force
# Copiar el resto de la aplicación
COPY . .
#COPY src ./src
#COPY tsconfig.json ./

# Construir la aplicación
RUN npm run build:prod

# Usar una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Crear un usuario no privilegiado
#RUN addgroup -S nginxgroup && adduser -S nginxuser -G nginxgroup

# Cambiar al nuevo usuario
#USER nginxuser

# Copiar la configuración de Nginx
#COPY nginx.conf /etc/nginx/nginx.conf

# Copiar los archivos construidos al directorio de Nginx
COPY --from=build /app/dist/berfire-frontend/browser /usr/share/nginx/html

# Copiar el archivo environment.json
COPY public/assets/environment.json /usr/share/nginx/html/assets/environment.json


# Exponer el puerto 80
EXPOSE 8080

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]


