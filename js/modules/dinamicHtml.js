// Função para criar botões dinamicamente
export function criarBotoesCSV(dados, containerId) {
  //Checar se o container existe
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Elemento com ID "${containerId}" não encontrado.`);
  }

  dados.forEach((dado) => {
    const botao = document.createElement("button");
    botao.textContent = dado.nomeCliente;
    botao.addEventListener("click", () => {});
    container.appendChild(botao);
  });
}