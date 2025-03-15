# Usa uma imagem base do Node.js
FROM node:18-slim

# Cria o diretório da aplicação
WORKDIR /usr/src/app

# Instalar OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o diretório prisma primeiro
COPY src/prisma ./src/prisma/

# Gerar o cliente Prisma
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Copia o arquivo .env.docker
COPY .env.docker ./.env

# Copia o script de entrypoint
COPY entrypoint.sh ./entrypoint.sh

# Define o script como executável
RUN chmod +x ./entrypoint.sh

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Define o entrypoint
ENTRYPOINT ["./entrypoint.sh"]

# Comando para rodar a aplicação
CMD ["node", "dist/server.js"]