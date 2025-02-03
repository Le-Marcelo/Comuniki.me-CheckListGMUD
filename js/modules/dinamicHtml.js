export function criarBotao(dados, containerId) {
    //Checar se o container existe
    const container = document.getElementById(containerId);
    if (!container) {
        throw new Error(`Elemento com ID "${containerId}" não encontrado.`);
    }

    dados.forEach((dado) => {
        //Criação do botão e suas propriedades
        const botao = document.createElement("button");
        botao.textContent = dado.nome;
        setFuncao(botao, containerId);

        //Inclusão do botão ao container
        container.appendChild(botao);
    });
}

function setFuncao(botao, tipo) {
    //Funções dos botões
    botao.addEventListener("click", function () {
        switch (tipo) {
            case "botoesCliente":
                deletarBotoes("botoesSistema");
                criarBotao()
                break;
            case "botoesSistema":
                deletarBotoes("botoesAmbiente");
                break;
            case "botoesAmbiente":
                //
                break;
            default:
                //
                break;
        }
    });
}

function deletarBotoes(tipo) {
    document.getElementById(tipo).textContent = "";
}
