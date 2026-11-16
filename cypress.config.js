import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Endereço do frontend (iniciado com "npm run frontend")
    baseUrl: "http://localhost:5500",
    // Não usamos arquivo de suporte, para manter o projeto simples
    supportFile: false,
    // Não grava vídeos dos testes
    video: false,
  },
});
