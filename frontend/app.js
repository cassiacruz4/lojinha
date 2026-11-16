// Endereço da API (backend)
const URL_PRODUTOS = "http://localhost:3001/produtos";

const lista = document.getElementById("lista-produtos");
const mensagem = document.getElementById("mensagem");

// Cria um <li> para um produto: "Caderno: R$ 19,90"
function criarItemProduto(produto) {
  const item = document.createElement("li");
  item.className = "produto";
  item.dataset.cy = "produto";

  const nome = document.createElement("span");
  nome.className = "produto-nome";
  nome.dataset.cy = "produto-nome";
  // textContent insere apenas texto (nunca HTML), o que é mais seguro
  nome.textContent = produto.nome;

  const preco = document.createElement("span");
  preco.className = "produto-preco";
  preco.dataset.cy = "produto-preco";
  // O preço já chega formatado pelo backend
  preco.textContent = produto.preco;

  item.append(nome, ": ", preco);
  return item;
}

// Função assíncrona: busca os produtos na API e mostra na tela
async function carregarProdutos() {
  try {
    // 1. Faz a requisição HTTP e espera a resposta
    const resposta = await fetch(URL_PRODUTOS);

    // 2. response.ok é true para status 200 a 299
    if (!resposta.ok) {
      throw new Error(`A API respondeu com status ${resposta.status}`);
    }

    // 3. Converte o corpo da resposta de JSON para um array JavaScript
    const produtos = await resposta.json();

    // 4 e 5. Percorre o array e cria um item na lista para cada produto
    for (const produto of produtos) {
      lista.appendChild(criarItemProduto(produto));
    }

    mensagem.textContent = produtos.length === 0 ? "Nenhum produto cadastrado." : "";
  } catch (erro) {
    // Cai aqui se a API estiver desligada, sem rede, ou se respondeu com erro
    console.error("Erro ao carregar produtos:", erro);
    mensagem.textContent =
      "Não foi possível carregar os produtos. Verifique se a API está funcionando e tente novamente.";
    mensagem.classList.add("erro");
  }
}

carregarProdutos();
