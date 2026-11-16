import express from "express";
import cors from "cors";
import { rotasProdutos } from "./produtos.js";
import { rotasHealth } from "./health.js";

// Cria a aplicação Express (ainda sem iniciar o servidor).
export const app = express();

// Middlewares: funções que rodam antes das rotas.
// cors() permite que o frontend, rodando em outra porta/origem, consulte a API.
app.use(cors());
// express.json() permite ler corpos de requisição em formato JSON.
app.use(express.json());

// Registra as rotas
app.use(rotasProdutos);
app.use(rotasHealth);
