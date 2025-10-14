# Use Node.js 20 Alpine como base
FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar o resto do código
COPY . .

# Expor a porta
EXPOSE 5173

# Comando padrão
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
