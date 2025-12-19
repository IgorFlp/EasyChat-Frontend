# Estágio 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# --- PARTE IMPORTANTE: VARIÁVEIS DE AMBIENTE ---
ARG VITE_API_URL
ARG VITE_SOCKET_URL
ARG VITE_APP_NAME
# Adicione outras ARGs se tiver mais variáveis

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
# -----------------------------------------------

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Produção (Nginx é muito mais leve que o 'serve')
FROM nginx:stable-alpine
# Copia o resultado do build (Vite usa 'dist') para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Se você usa React Router (rotas tipo /login, /dashboard), 
# descomente a linha abaixo para não dar 404 ao atualizar a página
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]