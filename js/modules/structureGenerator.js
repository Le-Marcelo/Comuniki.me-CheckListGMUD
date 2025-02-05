const global = { baseDeDados: null };
//Essa sequência de funções está aqui para ajudar na abstração da classe main
export function gerarEstrutura(dados) {
    //Ao gerar estrutura é importado a base de dados da classe Main
    global.baseDeDados = dados;

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
function showClientes() {
    global.baseDeDados[0].tabela.forEach((linha) => {
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

//Cria botões com base na tabela de ambientes
function showAmbientes(sistema) {
    global.baseDeDados[2].tabela.forEach((ambiente) => {
        var idSistema = ambiente.idSistema;
        if (sistema == parseInt(idSistema)) {
            criarBotao(ambiente, "botoesAmbiente");
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
                changeModal(botao);
                document.getElementById("modal").style.display = "block";
            });
            break;

        //Exibe os ambientes relacionado ao sistema selecionado
        case "botoesSistema":
            botao.addEventListener("click", function () {
                if (!document.getElementById("botoesAmbiente")) {
                    var conteudo = document.getElementById("modalContent");
                    var div = document.createElement("div");
                    div.id = "botoesAmbiente";
                    div.classList.add("botoes-container");
                    conteudo.appendChild(div);
                }

                var sistema = parseInt(botao.dataset.id);
                showAmbientes(sistema);
            });
            break;

        //Redireciona à página para gerar o relatório
        case "botoesAmbiente":
            botao.addEventListener("click", function () {
                //TODO: Salvar dados relacionados ao cliente para altrar os campos do relatório (sessionStorage)
                window.location.href = "/html/gerarRelatorio.html";
            });
            break;

        default:
            throw new Error(`Botão com ID "${tipo}" não encontrado.`);
    }
}

//Função para alterar o modal dependendo do botão clicado
function changeModal(botao) {
    var conteudo = document.getElementById("modalContent");

    if (botao.dataset.multiTenant == "TRUE") {
        conteudo.innerHTML = `
            <div id="botoesSistema" class="botoes-container"></div> 
        `;
        var cliente = parseInt(botao.dataset.id);
        showSistemas(cliente);
    } else {
        conteudo.innerHTML = `
            <div id="botoesAmbiente" class="botoes-container"></div> 
        `;
        var sistema = parseInt(botao.dataset.id);
        showAmbientes(sistema);
    }
}
