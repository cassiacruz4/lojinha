import js from "@eslint/js";
import globals from "globals";

// Configuração do ESLint (formato "flat config", padrão das versões atuais).
export default [
  // Não analisa as dependências instaladas
  { ignores: ["node_modules/"] },

  // Regras recomendadas pelo próprio ESLint (detectam erros comuns)
  js.configs.recommended,

  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // usamos import/export
      globals: globals.node, // variáveis do Node, como process e console
    },
    rules: {
      // Aponta variáveis criadas e nunca usadas.
      // Parâmetros como "req" são exigidos pelo Express, então são ignorados.
      "no-unused-vars": ["error", { args: "none" }],
    },
  },
];
