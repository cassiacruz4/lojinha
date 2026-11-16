# Lojinha

Projeto acadêmico de uma pequena loja virtual, com uma **API REST** em Node.js e um **frontend** em HTML, CSS e JavaScript puro, conectados a um banco **PostgreSQL** hospedado no [Neon](https://neon.com/).

O projeto será usado nas próximas aulas para estudar **Integração Contínua e Entrega Contínua (CI/CD)**, por isso já conta com testes unitários, de integração, E2E e lint.

## Tecnologias

| Parte | Tecnologias |
|---|---|
| Backend | Node.js, Express, pg (driver PostgreSQL), dotenv, cors |
| Banco de dados | PostgreSQL (Neon) |
| Frontend | HTML5, CSS3, JavaScript puro |
| Testes | `node:test` (nativo do Node.js), Cypress |
| Qualidade | ESLint |

## Estrutura das pastas

```text
Lojinha/
├── api/                          # Backend (API REST)
│   ├── app.js                    # Configura o Express e registra as rotas
│   ├── server.js                 # Inicia o servidor (porta 3001)
│   ├── db.js                     # Pool de conexões com o PostgreSQL
│   ├── migrate.js                # Cria a tabela e os produtos iniciais
│   ├── produtos.js               # Rota GET /produtos
│   ├── preco.js                  # Função formatarPreco(valor)
│   ├── health.js                 # Rota GET /health
│   ├── eslint.config.js          # Configuração do ESLint
│   ├── .env.example              # Modelo das variáveis de ambiente
│   └── tests/
│       ├── preco.test.js                  # Testes unitários
│       └── produtos.integration.test.js   # Teste de integração
├── frontend/                     # Página da loja
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── cypress/e2e/lojinha.cy.js     # Teste E2E
├── cypress.config.js
└── package.json                  # Scripts do frontend e do Cypress
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior (desenvolvido com a versão 24)
- Uma conta gratuita no [Neon](https://neon.com/)

## 1. Instalar as dependências

```bash
# Na pasta raiz (frontend e Cypress)
npm install

# Na pasta api (backend)
cd api
npm install
```

## 2. Configurar o banco no Neon

1. Crie uma conta em https://neon.com/ e clique em **New Project** (ex.: nome `lojinha`).
2. No painel do projeto, clique em **Connect** e copie duas URLs:
   - **Com** *Connection pooling* ligado → `DATABASE_URL` (o endereço contém `-pooler`).
   - **Sem** *Connection pooling* → `DIRECT_URL`.
3. Na pasta `api`, copie o modelo e preencha os valores:

   ```powershell
   Copy-Item .env.example .env     # Windows (PowerShell)
   cp .env.example .env            # Linux/macOS
   ```

   ```env
   PORT=3001
   DATABASE_URL=<URL com pooling>
   DIRECT_URL=<URL sem pooling>
   ```

> **Dica:** troque `sslmode=require` por `sslmode=verify-full` nas URLs. É o modo mais seguro e evita um aviso no terminal.

**Por que duas URLs?**
- `DATABASE_URL` passa pelo *pooler* do Neon, que gerencia muitas conexões simultâneas. É usada pela API.
- `DIRECT_URL` conecta direto ao PostgreSQL. É usada pela migração, que altera a estrutura do banco.

> ⚠️ O arquivo `.env` contém senhas e **nunca** deve ser enviado ao GitHub. Ele já está no `.gitignore`.

## 3. Executar a migração

Na pasta `api`:

```bash
npm run migrate
```

Cria a tabela `produtos` (se ainda não existir) e cadastra Caderno, Caneta e Mochila. Pode ser executado várias vezes sem duplicar dados.

## 4. Iniciar o backend

Na pasta `api`:

```bash
npm start
```

A API ficará disponível em http://localhost:3001.

## 5. Testar as rotas

Abra no navegador (ou use `curl`):

| Rota | Resposta esperada |
|---|---|
| http://localhost:3001/produtos | Lista dos produtos com preços em R$ |
| http://localhost:3001/health | `{"ok":true}` (banco acessível) ou `{"ok":false}` com status 503 |

Exemplo de `GET /produtos`:

```json
[
  { "id": 1, "nome": "Caderno", "preco": "R$ 19,90" },
  { "id": 2, "nome": "Caneta", "preco": "R$ 4,50" },
  { "id": 3, "nome": "Mochila", "preco": "R$ 89,90" }
]
```

## 6. Iniciar o frontend

Com a API rodando, em outro terminal, na pasta raiz:

```bash
npm run frontend
```

Acesse http://localhost:5500. Se a API estiver desligada, a página mostra uma mensagem de erro amigável.

## 7. Testes unitários

Na pasta `api`:

```bash
npm test
```

Testam a função `formatarPreco` isoladamente, sem banco de dados.

## 8. Testes de integração

O teste de integração usa um **banco de testes separado**, para não alterar os dados principais.

1. No Neon, abra **Branches** → **New branch** e crie a branch `testes` a partir da `main`.
2. Clique em **Connect**, **selecione a branch `testes`** e copie as duas URLs (com e sem pooling).
3. Na pasta `api`, crie o arquivo `.env.test` (copie o `.env.example`) e preencha `DATABASE_URL` e `DIRECT_URL` com as URLs da branch `testes`.
4. Execute, na pasta `api`:

   ```bash
   npm run test:integration
   ```

O comando prepara o banco de testes (`migrate:test`) e depois testa a rota `GET /produtos` com o banco real.

## 9. Testes E2E com Cypress

São necessários três terminais:

```bash
# Terminal 1 — pasta api
npm start

# Terminal 2 — pasta raiz
npm run frontend

# Terminal 3 — pasta raiz
npm run cy:run     # executa no terminal
npm run cy:open    # ou abre a interface visual do Cypress
```

## 10. Lint

Na pasta `api`:

```bash
npm run lint
```

O ESLint analisa o código e aponta erros comuns, como variáveis não usadas ou não definidas.

## Resumo dos comandos

| Pasta | Comando | Função |
|---|---|---|
| `api` | `npm start` | Inicia a API |
| `api` | `npm run migrate` | Prepara o banco principal |
| `api` | `npm run migrate:test` | Prepara o banco de testes |
| `api` | `npm test` | Testes unitários |
| `api` | `npm run test:integration` | Teste de integração |
| `api` | `npm run lint` | Lint |
| raiz | `npm run frontend` | Serve o frontend na porta 5500 |
| raiz | `npm run cy:run` | Teste E2E no terminal |
| raiz | `npm run cy:open` | Interface do Cypress |
