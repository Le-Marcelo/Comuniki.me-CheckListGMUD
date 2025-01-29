//TODO: Separar responsabilidades para apenas criação genérica de botoes com base em um CSV
//Criar uma outra classe para alterar a função do botão

// Função para criar botões dinamicamente
export function criarBotoesCSV(dados, containerId) {
  //Checar se o container existe
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`Elemento com ID "${containerId}" não encontrado.`);
  }

  dados.forEach((dado) => {
    const botao = document.createElement("button");
    botao.textContent = dado.nome;

    //Caso seja single tenant irá pular para a seleção de ambiente
    if (dado.multiTenant == "Sim") {
      botao.setAttribute("data-title", "Selecione o Sistema");
      botao.setAttribute("data-content", 'Conteúdo do primeiro botão');
    }else{
      botao.setAttribute("data-title", "Selecione o Ambiente");
      botao.setAttribute("data-content", "Conteúdo do primeiro botão");
    }

    botao.addEventListener("click", () => {
      const title = botao.getAttribute("data-title");
      const content = botao.getAttribute("data-content");

      document.getElementById("modalTitle").textContent = title;
      document.getElementById("modalContent").textContent = content;
      document.getElementById("modal").style.display = "block";
    });
    container.appendChild(botao);
  });
}
