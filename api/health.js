import { Router } from "express";
import { pool } from "./db.js";

export const rotasHealth = Router();

// GET /health -> verifica se a API consegue falar com o PostgreSQL.
// Muito usado por ferramentas de monitoramento e de deploy (CI/CD).
rotasHealth.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ ok: true });
  } catch (erro) {
    // 503 = "serviço indisponível". Não enviamos detalhes do erro ao cliente.
    console.error("Health check falhou:", erro.message || erro.code);
    res.status(503).json({ ok: false });
  }
});
