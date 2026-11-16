// Teste E2E (ponta a ponta): abre o navegador e usa a Lojinha como um usuário.
// Precisa do frontend (porta 5500) e da API (porta 3001) rodando, conectados ao PostgreSQL.

describe("Lojinha", () => {
  it("mostra os três produtos vindos da API", () => {
    // 1. Abre a página
    cy.visit("/");

    cy.contains("h1", "Lojinha");

    // 2 e 3. Aguarda os produtos carregarem e confere que são três.
    // O Cypress tenta novamente por alguns segundos até a condição ser verdadeira.
    cy.get("[data-cy=produto]").should("have.length", 3);

    // 4 e 5. Confere nomes e preços, na ordem
    const esperados = [
      { nome: "Caderno", preco: "R$ 19,90" },
      { nome: "Caneta", preco: "R$ 4,50" },
      { nome: "Mochila", preco: "R$ 89,90" },
    ];

    cy.get("[data-cy=produto]").each((item, indice) => {
      cy.wrap(item).find("[data-cy=produto-nome]").should("have.text", esperados[indice].nome);
      cy.wrap(item).find("[data-cy=produto-preco]").should("have.text", esperados[indice].preco);
    });

    // 6. Confere o texto completo como aparece na tela e que não há mensagem de erro
    cy.get("[data-cy=produto]").first().should("have.text", "Caderno: R$ 19,90");
    cy.get("[data-cy=mensagem]").should("be.empty");
  });
});
