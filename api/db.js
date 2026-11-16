import dotenv from "dotenv";
import pg from "pg";

// Carrega as variáveis do arquivo .env para process.env.
// Variáveis que já existem não são substituídas.
dotenv.config({ quiet: true });

const { Pool } = pg;

// Pool de conexões: em vez de abrir uma conexão nova a cada requisição,
// o pool mantém algumas conexões abertas e as reaproveita.
// A configuração SSL exigida pelo Neon vem na própria URL (?sslmode=require),
// e a validação do certificado continua ativa.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
