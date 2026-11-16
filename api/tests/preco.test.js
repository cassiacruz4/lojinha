// Testes unitários: testam uma função isolada, sem banco e sem servidor.
// Usamos o test runner que já vem com o Node.js (node:test).
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatarPreco } from "../preco.js";

test("formata 19.9 como R$ 19,90", () => {
  assert.equal(formatarPreco(19.9), "R$ 19,90");
});

test("formata 4.5 como R$ 4,50", () => {
  assert.equal(formatarPreco(4.5), "R$ 4,50");
});

test("aceita o texto decimal retornado pelo PostgreSQL", () => {
  assert.equal(formatarPreco("89.90"), "R$ 89,90");
});

test("formata valores inteiros com duas casas decimais", () => {
  assert.equal(formatarPreco(10), "R$ 10,00");
});
