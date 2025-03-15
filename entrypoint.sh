#!/bin/sh

# Aplica as migrações com o caminho correto para o schema
npx prisma migrate deploy --schema=./src/prisma/schema.prisma

# Inicia a aplicação
exec node dist/server.js