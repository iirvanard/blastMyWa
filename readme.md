# Node.js + Express + Prisma + PostgreSQL Boilerplate

Este é um boilerplate para projetos backend usando Node.js, Express, Prisma e PostgreSQL. Ele foi projetado para ser modular, escalável e seguir boas práticas de desenvolvimento.

# 🚀 Começando

### Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL
- Docker (opcional, para rodar o PostgreSQL em container)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/alansalvaterra/NodeExpressAPI-Boilerplate.git
   cd NodeExpressAPI-Boilerplate
2. Instale as dependências:
   ```bash
   npm install
3. Configure o banco de dados:

    - Para Desenvolvimento Local (usando .env.local):
   
     1.    Crie um arquivo .env.local na raiz do projeto e configure as variáveis de ambiente:
        
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
        PORT=3000

      2.  Substitua:
  
            USER: Nome do usuário do PostgreSQL;    
            PASSWORD: Senha do usuário do PostgreSQL (escape caracteres especiais, se necessário);  
            HOST: Endereço do banco de dados (localhost para local ou db para Docker);  
            PORT: Porta do PostgreSQL (geralmente 5432);    
            DATABASE: Nome do banco de dados (por exemplo, mydb).

    - Para Docker (usando .env.docker):
    1.    Crie um arquivo .env.docker na raiz do projeto e configure as variáveis de ambiente:
        
        DATABASE_URL="postgresql://USER:PASSWORD@db:5432/DATABASE?schema=public"
        PORT=3000

      2.  Substitua:

            USER: Nome do usuário do PostgreSQL;    
            PASSWORD: Senha do usuário do PostgreSQL (escape caracteres especiais, se necessário);  
            DATABASE: Nome do banco de dados (por exemplo, mydb).


4. Inicie o servidor:
   1. Local:    
        ```bash
        npm run dev:migrate  

   2. Docker:   
         ```bash
        docker-compose up --build

## Estrutura do Projeto

    ```bash
    src/
    ├── controllers/        # Controladores para lidar com as requisições
    ├── services/           # Lógica de negócio
    ├── repositories/       # Interações com o banco de dados
    ├── middlewares/        # Middlewares personalizados
    ├── routes/             # Definição das rotas
    ├── schemas/            # Esquemas de validação com Zod
    ├── utils/              # Utilitários (helpers, funções comuns)
    ├── app.ts              # Configuração do Express
    ├── server.ts           # Inicialização do servidor

## Rotas Disponíveis
GET /api/users: Retorna todos os usuários.

GET /api/users/:id: Retorna um usuário pelo ID.

POST /api/users: Cria um novo usuário.

PUT /api/users/:id: Atualiza um usuário pelo ID.

DELETE /api/users/:id: Deleta um usuário pelo ID.


## Segurança
Helmet: Configura cabeçalhos de segurança HTTP.

CORS: Restringe o acesso à API a origens específicas.

Zod: Validação de dados de entrada para prevenir ataques de injeção.

## Próximas Melhorias
Autenticação e Autorização com JWT.

Proteção contra Ataques de Força Bruta com express-rate-limit.

Personalização do Helmet para atender às necessidades do projeto.

Logging e Monitoramento com Winston.

## 🤝 Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:

Faça um fork do projeto.

Crie uma branch para sua feature (git checkout -b feature/newFeature).

Commit suas mudanças (git commit -m 'Add some newFeature').

Push para a branch (git push origin feature/newFeature).

Abra um Pull Request.