import { Router } from "express";
import { pool } from "./db.js";
import { formatarPreco } from "./preco.js";

// Um Router agrupa rotas relacionadas. Ele é registrado no app.js.
export const rotasProdutos = Router();

// GET /produtos -> lista os produtos cadastrados no banco
rotasProdutos.get("/produtos", async (req, res) => {
  try {
    // await espera o banco responder antes de continuar
    const resultado = await pool.query(
      "SELECT id, nome, preco FROM produtos ORDER BY id"
    );

    // Transforma cada linha do banco no formato que o frontend espera
    const produtos = resultado.rows.map((produto) => ({
      id: produto.id,
      nome: produto.nome,
      preco: formatarPreco(produto.preco),
    }));

    res.status(200).json(produtos);
  } catch (erro) {
    // Mostra o erro apenas no terminal do servidor (sem dados de conexão)
    // e devolve ao cliente uma mensagem genérica.
    console.error("Erro ao buscar produtos:", erro.message || erro.code);
    res.status(500).json({ erro: "Não foi possível carregar os produtos." });
  }
});
