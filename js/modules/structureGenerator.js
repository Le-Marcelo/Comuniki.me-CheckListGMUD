const global = { baseDeDados: null };
//Essa sequência de funções está aqui para ajudar na abstração da classe main
export function gerarEstrutura(dados) {
    //Ao gerar estrutura é importado a base de dados da classe Main
    global.baseDeDados = dados;
    //Cria botões com base na tabela de clientes
    global.baseDeDados[0].tabela.forEach((linha) => {
        criarBotao(linha, "botoesCliente")
    });
    setModal();
}

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

function setFuncao(botao, tipo) {
    //Funções dos botões
    switch (tipo) {
        case "botoesCliente":
            botao.addEventListener("click", function () {
                changeModal(botao);
                document.getElementById("modal").style.display = "block";
            });
            break;
        case "botoesSistema":
            botao.addEventListener("click", function () {
                //TODO
                
            });
            break;
        case "botoesAmbiente":
            botao.addEventListener("click", function () {
                //TODO
                window.location.href = "/gerarRelatorio.html";
            });
            break;
        default:
            //TODO
            break;
    }
}

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

//Função para alterar o modal dependendo do botão clicado
//Somente se aplica para o botão de cliente
function changeModal(botao) {
    var conteudo = document.getElementById("modalContent");

    if (botao.dataset.multiTenant == "TRUE") {
        conteudo.innerHTML = `
            <div id="botoesSistema" class="botoes-container"></div> 
        `;
        global.baseDeDados[1].tabela.forEach((sistema) => {
            var idCliente = sistema.idCliente;
            if(parseInt(botao.dataset.id) == parseInt(idCliente)){
                criarBotao(sistema, "botoesSistema");
            }
        });
        
    } else {
        conteudo.innerHTML = `
            <div id="botoesAmbiente" class="botoes-container"></div> 
        `;
        global.baseDeDados[2].tabela.forEach((ambiente) => {
            var idSistema = ambiente.idSistema;
            if(parseInt(botao.dataset.id) == parseInt(idSistema)){
                criarBotao(ambiente, "botoesAmbiente");
            }
        });
    }
}
