# Desafio Fullstack Incuca - O Teste Sádico

## Visão Geral

Este projeto consiste em uma Single Page Application (SPA) desenvolvida para o desafio técnico "O Teste Sádico". A aplicação gerencia o "humor" da interface, interagindo com uma API externa de piadas geek para melhorar o estado de espírito do usuário/aplicação.

O sistema é composto por um backend em AdonisJS que serve como proxy para a Geek Joke API e gerencia autenticação, e um frontend em Vue.js que consome este backend.

## Tecnologias Utilizadas

### Frontend

- **Framework**: Vue.js 3 (Composition API)
- **UI Toolkit**: Vuetify 3
- **Gerenciamento de Estado**: Pinia
- **Roteamento**: Vue Router
- **Build Tool**: Vite
- **Testes**: Vitest
- **HTTP Client**: Axios

### Backend

- **Framework**: AdonisJS 6
- **Banco de Dados**: PostgreSQL
- **ORM**: Lucid
- **Autenticação**: JWT (via `@adonisjs/auth`)
- **Testes**: Vitest
- **HTTP Client**: Axios

### Infraestrutura

- **Containerização**: Docker & Docker Compose

## Funcionalidades Implementadas

- [x] **Login com JWT**: Autenticação segura com persistência de sessão.
- [x] **Fluxo de Humor**: Transição de rotas `/inicial`, `/triste`, `/poker-face` e `/feliz`.
- [x] **API Proxy**: Backend consome a Geek Joke API para evitar CORS e centralizar a lógica.
- [x] **Testes**: Testes unitários implementados em ambas as camadas.
- [x] **Dockerizado**: Ambiente completo levantado com um único comando.

## Pré-requisitos

- Docker e Docker Compose instalados.
- (Opcional para desenvolvimento local) Node.js v20+ e npm.

## Como Rodar o Projeto

### Opção 1: Via Docker (Recomendado)

O projeto está totalmente configurado para rodar em containers.

1.  Clone o repositório.
2.  Na raiz do projeto, execute:
    ```bash
    docker-compose up --build
    ```
3.  Acesse a aplicação em: `http://localhost:80` (ou apenas `http://localhost`).
    - Backend estará rodando em: `http://localhost:3333`
    - Banco de dados exposto em: `localhost:5432`

**Nota:** As migrações e seeds do banco de dados devem rodar automaticamente na inicialização do container backend (verifique o `entrypoint` ou logs se necessário. Caso contrário, acesse o container e rode `node ace migration:run --force` e `node ace db:seed`).

### Opção 2: Manualmente (Desenvolvimento)

#### Backend

1.  Entre na pasta `backend`:
    ```bash
    cd backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure o arquivo `.env` (baseado no `.env.example` se existir, ou use as configurações do `docker-compose.yml`).
4.  Rode as migrações (necessita de um Postgres rodando):
    ```bash
    node ace migration:run
    node ace db:seed
    ```
5.  Inicie o servidor:
    ```bash
    npm run dev
    ```

#### Frontend

1.  Entre na pasta `frontend`:
    ```bash
    cd frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## Credenciais de Acesso

Para acessar a aplicação, utilize o usuário padrão criado pela migration/seed:

- **E-mail**: `cliente@incuca.com.br`
- **Senha**:
  ```text
  seumamesapossuirtrespernaschamadasqualidadeprecobaixoevelocidadeelaseriacapenga
  ```

## Estrutura do Projeto

```
/
├── backend/         # API REST em AdonisJS
├── frontend/        # SPA em Vue.js
├── docker-compose.yml
└── README.md
```

## Estimativa de Desenvolvimento

Conforme solicitado no desafio, segue a estimativa de tempo para a implementação da solução:

| Etapa                                         | Estimativa (Horas) | Realizado (Horas) |
| :-------------------------------------------- | :----------------: | :---------------: |
| Configuração Ambiente (Docker, Setup Inicial) |         1          |         1         |
| Backend (Auth, Migrations, API Proxy)         |         2          |         2         |
| Frontend (Login, Store, Rotas, UI/UX)         |         2          |         2         |
| Integração & Testes                           |         1          |         1         |
| Refinamento e Documentação                    |         1          |         1         |
| **Total**                                     |       **7**        |       **7**       |

## Decisões de Projeto e Justificativas

- **Testes**: Foi utilizado Vitest para testes, ao invés de Jest, pela fácil compatibilidade com Vite.
