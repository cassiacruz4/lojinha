import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ quiet: true });

// Usa a porta definida em PORT ou, se não existir, a 3001.
const PORTA = process.env.PORT || 3001;

// Este arquivo é o único que "liga" o servidor.
// Separar isso do app.js permite testar a API sem abrir uma porta fixa.
app.listen(PORTA, () => {
  console.log(`API da Lojinha rodando em http://localhost:${PORTA}`);
});
