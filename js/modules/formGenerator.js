const global = { baseDeDados: null, selectedBox: null };

export async function montarPDF(dados) {
    //Ao gerar estrutura é importado a base de dados da classe Main
    global.baseDeDados = await Promise.all(
        dados.map(async (item) => ({
            nome: item.nome,
            tabela: await item.tabela, // Resolve cada Promise dentro do array
        }))
    );

    gerarCampos();
    setModal();
    setCheckbox();
}

function gerarCampos() {
    //Gerar formularios para cada especificação
    global.baseDeDados[3].tabela.forEach((especificacao) => {
        var idCliente = especificacao.idCliente;
        //Adiciona a página apenas caso a verificação seja universal (idCliente = -1) ou específica do cliente
        if (idCliente < 0 || idCliente == sessionStorage.getItem("idCliente")) {
            criarFormulario("especificacoes", especificacao);
        }
    });
}

//Cria um formulário através do JS
function criarFormulario(containerId, especificacao) {
    //Checar se o container existe
    const container = document.getElementById(containerId);
    if (!container) {
        throw new Error(`Elemento com ID "${containerId}" não encontrado.`);
    }

    //<div class="containerFormulario">
    const divContainer = document.createElement("div");
    divContainer.classList = "containerFormulario";
    container.appendChild(divContainer);

    //<label>Nome</label>
    const label = document.createElement("label");
    label.style = "grid-area: label;";
    label.textContent = especificacao.nomeVerificacao;
    divContainer.appendChild(label);

    var multiAmbiente = false;

    global.baseDeDados[1].tabela.forEach((sistema) => {
        if (
            sistema.id == sessionStorage.getItem("idSistema") &&
            sistema.multiAmbiente == "TRUE"
        ) {
            multiAmbiente = true;
        }
    });

    //Caso seja multi ambiente adiciona as verificações de acordo
    if (especificacao.multiAmbiente == "TRUE" && multiAmbiente == true) {
        var loop = 1;
        global.baseDeDados[2].tabela.forEach((ambiente) => {
            if (ambiente.idSistema == sessionStorage.getItem("idSistema")) {
                const grid = "ambiente" + loop;

                //<label>Ambiente X</label>
                const label = document.createElement("label");
                label.style = "grid-area: " + grid + ";";
                label.textContent = String(ambiente.nome);
                divContainer.appendChild(label);

                criarImageBox(divContainer, especificacao, loop);
                loop++;
            }
        });
    } else {
        criarImageBox(divContainer, especificacao, 2);
    }
}

function criarImageBox(container, especificacao, grid) {
    //<div class="image-box" onclick="openModal(this)">+ Adicionar Imagem</div>
    const div = document.createElement("div");
    div.classList.add("image-box");
    div.addEventListener("click", function () {
        openModal(div);
    });
    div.textContent = "+ Adicionar Imagem";
    for (var atributo in especificacao) {
        div.dataset[atributo] = especificacao[atributo];
    }
    div.style = "grid-area: image" + grid + ";";
    container.appendChild(div);
}

//Criar modal através do JS
function setModal() {
    const container = document.getElementById("imageModal");

    //<div class="modal-content">
    const divModalContent = document.createElement("div");
    divModalContent.classList.add("modal-content");
    container.appendChild(divModalContent);

    //<span class="close" onclick="closeModal()">&times;</span>
    const span = document.createElement("span");
    span.classList.add("close");
    span.addEventListener("click", function () {
        closeModal();
    });
    span.innerHTML = "&times;";
    divModalContent.appendChild(span);

    //<h2>Inserir Imagem</h2>
    const h2 = document.createElement("h2");
    h2.textContent = "Inserir Imagem";
    divModalContent.appendChild(h2);

    //<div id="dropArea" class="drop-area">
    const divDropArea = document.createElement("div");
    divDropArea.id = "dropArea";
    divDropArea.classList.add("drop-area");
    // Capturar evento de clique para abrir o input file
    divDropArea.addEventListener("click", () => fileInput.click());
    // Arrastar e soltar arquivos no modal
    divDropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.style.borderColor = "#0056b3";
    });
    divDropArea.addEventListener("dragleave", () => {
        dropArea.style.borderColor = "#007bff";
    });

    divDropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dropArea.style.borderColor = "#007bff";

        const file = event.dataTransfer.files[0];
        if (file) {
            previewFile(file);
        }
    });
    divModalContent.appendChild(divDropArea);

    //<p>Arraste e solte uma imagem aqui, clique ou cole uma imagem (Ctrl + V)</p>
    const p = document.createElement("p");
    p.textContent =
        "Arraste e solte uma imagem aqui, clique ou cole uma imagem (Ctrl + V)";
    divDropArea.appendChild(p);

    //<input type="file" id="fileInput" accept="image/*" hidden>
    const input = document.createElement("input");
    input.type = "file";
    input.id = "fileInput";
    input.accept = "image/*";
    input.hidden = true;
    // Capturar evento de mudança no input file
    input.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            previewFile(file);
        }
    });
    divDropArea.appendChild(input);

    //<img id="preview" class="preview" style="display: none;">
    const img = document.createElement("img");
    img.id = "preview";
    img.classList.add("preview");
    img.style = "display: none;";
    divDropArea.appendChild(img);

    //<button onclick="confirmImage()">Confirmar</button>
    const button = document.createElement("button");
    button.textContent = "Confirmar";
    button.addEventListener("click", function () {
        confirmImage();
    });
    divModalContent.appendChild(button);

    // Permitir colar imagens no modal
    document.addEventListener("paste", function (event) {
        const modal = document.getElementById("imageModal");
        if (modal.style.display === "flex") {
            const clipboardItems = event.clipboardData.items;
            for (let item of clipboardItems) {
                if (item.type.startsWith("image/")) {
                    const file = item.getAsFile();
                    previewFile(file);
                    break;
                }
            }
        }
    });
}

//Exibe o Modal
function openModal(imageBox) {
    global.selectedBox = imageBox;
    const preview = document.getElementById("preview");
    preview.style.display = "none";
    const fileInput = document.getElementById("fileInput");
    fileInput.value = "";
    const modal = document.getElementById("imageModal");
    modal.style.display = "flex";
}

// Confirmar a imagem e inseri-la na área selecionada
function confirmImage() {
    if (preview.src) {
        global.selectedBox.innerHTML = "";
        const img = document.createElement("img");
        img.src = preview.src;
        global.selectedBox.appendChild(img);
    }
    closeModal();
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Função para visualizar a imagem selecionada
function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
    };
}

function setCheckbox() {
    const check = document.getElementById("check");
    check.addEventListener("change", function () {
        const botao = document.getElementById("gerarPDF");
        botao.disabled = !this.checked;
    });
}
