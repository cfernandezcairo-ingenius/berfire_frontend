# Usa una imagen base de Node.js
FROM node:20 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install --force

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación
RUN npm run build -- --configuration production

# Usa una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos al servidor Nginx
COPY --from=build /app/dist/berfire-frontend/browser /usr/share/nginx/html

# Expone el puerto 8085
EXPOSE 8085

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
