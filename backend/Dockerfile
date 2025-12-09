# Backend Dockerfile
FROM node:22-alpine AS builder

# Instalar dependências necessárias para build
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar todas as dependências (incluindo dev para build)
RUN npm ci

# Copiar todo o código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Imagem de produção
FROM node:22-alpine

# Instalar dependências do sistema
RUN apk add --no-cache \
    postgresql-client \
    curl

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar build da etapa anterior
COPY --from=builder /app/build ./build

# Copiar script de inicialização
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expor porta
EXPOSE 3333

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "build/bin/server.js"]
