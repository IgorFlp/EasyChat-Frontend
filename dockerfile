FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia arquivos de dependência
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Build do Vite
RUN npm run build

# Instala servidor estático
RUN npm install -g serve

# Porta interna do container
EXPOSE 3000

# Serve o build
CMD ["serve", "-s", "dist", "-l", "3000"]