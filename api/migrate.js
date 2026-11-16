import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ quiet: true });

// Migração: script que prepara a estrutura do banco (tabelas) e os dados iniciais.
// Pode ser executado várias vezes sem duplicar nada.

const SQL_CRIAR_TABELA = `
  CREATE TABLE IF NOT EXISTS produtos (
    id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome  TEXT NOT NULL UNIQUE,
    preco NUMERIC(10, 2) NOT NULL
  )
`;

// ON CONFLICT (nome) DO NOTHING: se o produto já existir, ignora a inserção.
const SQL_INSERIR_PRODUTOS = `
  INSERT INTO produtos (nome, preco) VALUES
    ('Caderno', 19.90),
    ('Caneta', 4.50),
    ('Mochila', 89.90)
  ON CONFLICT (nome) DO NOTHING
`;

async function migrar() {
  if (!process.env.DIRECT_URL) {
    console.error("A variável DIRECT_URL não foi definida no arquivo .env.");
    process.exitCode = 1;
    return;
  }

  // Para a migração usamos um único Client com a conexão direta (sem pooler).
  const cliente = new pg.Client({ connectionString: process.env.DIRECT_URL });

  try {
    await cliente.connect();
    await cliente.query(SQL_CRIAR_TABELA);
    const resultado = await cliente.query(SQL_INSERIR_PRODUTOS);
    console.log(`Migração concluída. Produtos inseridos agora: ${resultado.rowCount}.`);
  } catch (erro) {
    // Alguns erros de conexão vêm só com o código (ex.: ECONNREFUSED)
    console.error("Erro na migração:", erro.message || erro.code);
    process.exitCode = 1;
  } finally {
    // finally sempre executa: com sucesso ou com erro, a conexão é encerrada.
    await cliente.end();
  }
}

migrar();
