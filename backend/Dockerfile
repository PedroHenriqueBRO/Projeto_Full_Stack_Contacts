# Use Node.js 20 Alpine como base
FROM node:20-alpine

# Instalar dependências do sistema necessárias para o Prisma
RUN apk add --no-cache openssl

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar o resto do código
COPY . .

# Gerar o cliente Prisma
RUN npx prisma generate

# Expor a porta
EXPOSE 3001

# Comando padrão
CMD ["npm", "run", "dev"]
