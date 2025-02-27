/*
---<Data>--------
Fevereiro/2025
---<Autor>-------
Marcelo Temporini - Estagiário de Suporte
---<Descrição>---
Arquivo .js para gerar a página "mainPage" dinâmicamente
*/

const global = { baseDeDados: null };
export async function gerarEstrutura(dados) {
    //Ao gerar estrutura é importado a base de dados da classe Main
    global.baseDeDados = await Promise.all(
        dados.map(async (item) => ({
            nome: item.nome,
            tabela: await item.tabela, // Resolve cada Promise dentro do array
        }))
    );
    showClientes();
    setModal();
}

//Define os listeners para o modal
function setModal() {
    // Get the <span> element that closes the modal
    var span = document.getElementById("modalClose");

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

//Cria botões com base na tabela de clientes
async function showClientes() {
    const tabelaClientes = await global.baseDeDados[0].tabela;
    tabelaClientes.forEach((linha) => {
        criarBotao(linha, "botoesCliente");
    });
}

//Cria botões com base na tabela de sistemas
function showSistemas(cliente) {
    global.baseDeDados[1].tabela.forEach((sistema) => {
        var idCliente = sistema.idCliente;
        if (cliente == parseInt(idCliente)) {
            criarBotao(sistema, "botoesSistema");
        }
    });
}

//Cria o botão e inclui os valores da tabela como dataset
function criarBotao(dados, containerId) {
    //Checar se o container existe
    const container = document.getElementById(containerId);
    if (!container) {
        throw new Error(`Elemento com ID "${containerId}" não encontrado.`);
    }

    //Criação do botão e suas propriedades
    const botao = document.createElement("button");

    for (var atributo in dados) {
        botao.dataset[atributo] = dados[atributo];
    }
    botao.textContent = botao.dataset.nome;
    setFuncao(botao, containerId);

    //Inclusão do botão ao container
    container.appendChild(botao);
}

//Define a função do botão
function setFuncao(botao, tipo) {
    switch (tipo) {
        //Muda e exibe o modal dependendo de qual cliente foi selecionado
        case "botoesCliente":
            botao.addEventListener("click", function () {
                showModal(botao);
                document.getElementById("modal").style.display = "block";
            });
            break;

        //Redireciona à página para gerar o relatório
        case "botoesSistema":
            botao.addEventListener("click", function () {
                sessionStorage.setItem("idCliente", botao.dataset.idCliente);
                sessionStorage.setItem("idSistema", botao.dataset.id);
                window.location.href = "/html/gerarRelatorio.html";
            });
            break;

        default:
            throw new Error(`Botão com ID "${tipo}" não encontrado.`);
    }
}

//Função para mostrar o modal
function showModal(botao) {
    var conteudo = document.getElementById("modalContent");

    conteudo.innerHTML = `
            <h1>Selecione o Sistema</h1>
            <div id="botoesSistema" class="botoes-container"></div> 
        `;
    var cliente = parseInt(botao.dataset.id);
    showSistemas(cliente);
}
