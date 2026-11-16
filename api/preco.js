// Formata um valor numérico no padrão de moeda brasileiro.
// O PostgreSQL devolve colunas NUMERIC como texto (ex.: "19.90"),
// por isso convertemos com Number() antes de formatar.
export function formatarPreco(valor) {
  const numero = Number(valor);

  // toFixed(2) garante duas casas decimais: 19.9 -> "19.90"
  // replace troca o ponto pela vírgula: "19.90" -> "19,90"
  return `R$ ${numero.toFixed(2).replace(".", ",")}`;
}
