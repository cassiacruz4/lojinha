// Teste de integração: testa a rota HTTP real conectada a um PostgreSQL real
// (o banco de TESTES, configurado no arquivo .env.test).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";

// Proteção: o script "test:integration" carrega o .env.test antes de tudo.
// Se a DATABASE_URL não estiver definida nele, paramos aqui para não
// cair por engano no banco principal (configurado no .env).
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definida. Configure o arquivo api/.env.test.");
}

// Importação dinâmica: só carrega o app (e o pool do banco) depois da verificação acima.
const { app } = await import("../app.js");
const { pool } = await import("../db.js");

let servidor;
let urlBase;

before(async () => {
  // Porta 0 = o sistema escolhe uma porta livre (evita conflito com a API na 3001)
  await new Promise((resolve) => {
    servidor = app.listen(0, resolve);
  });
  urlBase = `http://localhost:${servidor.address().port}`;
});

after(async () => {
  // Encerra o servidor e as conexões com o banco, para o processo terminar
  await new Promise((resolve) => servidor.close(resolve));
  await pool.end();
});

test("GET /produtos retorna os três produtos com preços formatados", async () => {
  const resposta = await fetch(`${urlBase}/produtos`);
  assert.equal(resposta.status, 200);

  const produtos = await resposta.json();
  assert.equal(produtos.length, 3);

  // Compara apenas nome e preço (o id é gerado pelo banco)
  const nomesEPrecos = produtos.map(({ nome, preco }) => ({ nome, preco }));
  assert.deepEqual(nomesEPrecos, [
    { nome: "Caderno", preco: "R$ 19,90" },
    { nome: "Caneta", preco: "R$ 4,50" },
    { nome: "Mochila", preco: "R$ 89,90" },
  ]);
});
