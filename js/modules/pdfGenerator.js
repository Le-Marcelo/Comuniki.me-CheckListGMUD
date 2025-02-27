/*
---<Data>--------
Fevereiro/2025
---<Autor>-------
Marcelo Temporini - Estagiário de Suporte
---<Descrição>---
Arquivo .js para gerar o arquivo .pdf a partir das informações passadas na página
*/

const global = { baseDeDados: null , jsPDF: null };

export async function setPDFGen(dados, jsPDF) {
    global.baseDeDados = await Promise.all(
        dados.map(async (item) => ({
            nome: item.nome,
            tabela: await item.tabela, // Resolve cada Promise dentro do array
        }))
    );
    global.jsPDF = jsPDF;
    setBotao();
}

//Configura a função do botão
function setBotao() {
    const botao = document.getElementById("gerarPDF");
    botao.addEventListener("click", function () {
        const nome = document.getElementById("nomeCompleto").value;
        const textoErro = document.getElementById("inserirNome");
        if(nome != ""){
            textoErro.style = "display: none;"
            gerarPDF();
        }else{
            textoErro.style = "display: block;"
        }
        
    });
}

//Formatação do PDF
function gerarPDF() {
    const doc = new global.jsPDF();

    //Adiciona a primeira página sendo a "capa"
    adicionarCapa(doc);

    //Adiciona o conteúdo principal ao PDF
    adicionarEvidencias(doc);

    //Adiciona as observações finais
    const observacao = document.getElementById("observacoes").value;
    if (observacao != "") {
        adicionarObservacoes(doc, observacao);
    }

    // Adicionar cabeçalho e rodapé
    adicionarCabecalhoRodape(doc);

    // Salvar o PDF
    var nomeDoCliente = "";
    global.baseDeDados[0].tabela.some((cliente) => {
        var idCliente = cliente.id;
        if (idCliente == sessionStorage.getItem("idCliente")) {
            nomeDoCliente = cliente.nome;
            return true;
        }
        return false;
    });
    const nomeArquivo = diaDeHoje(true) + "_RelatorioPosAtividade_" + nomeDoCliente;
    doc.save(nomeArquivo);
}

//Formatação da Capa
function adicionarCapa(doc) {
    //Logo
    const img = document.getElementById("logo");
    adicionarImagem(doc, img, 60, 50, 90, 30);

    //Linha
    doc.line(20, 85, 190, 85, "S");

    //Título
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#000000");
    doc.text("Pós Atividade", 105, 100, { align: "center" });

    //Cliente
    var nomeDoCliente = "";
    global.baseDeDados[0].tabela.some((cliente) => {
        var idCliente = cliente.id;
        if (idCliente == sessionStorage.getItem("idCliente")) {
            nomeDoCliente = cliente.nome;
            return true;
        }
        return false;
    });
    
    doc.text(nomeDoCliente, 105, 150, { align: "center" });

    //Sistema
    var nomeDoSistema = "";
    global.baseDeDados[1].tabela.some((sistema) => {
        var idSistema = sistema.id;
        if (idSistema == sessionStorage.getItem("idSistema")) {
            nomeDoSistema = sistema.nome;
            return true;
        }
        return false;
    });

    doc.text("Sistema: " + nomeDoSistema, 105, 160, { align: "center" });

    //Autor
    doc.setFontSize(16);
    doc.text("Autor do Documento:", 20, 230);

    const nomeAutor = document.getElementById("nomeCompleto").value;
    doc.setFont("helvetica", "normal");
    doc.text(nomeAutor, 80, 230);

    //Data
    doc.setFont("helvetica", "bold");
    doc.text("Data do Documento:", 20, 240);

    doc.setFont("helvetica", "normal");
    doc.text(diaDeHoje(false), 78, 240);

    //Assinatura
    const assinatura = document.getElementById("check").nextElementSibling.textContent;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(assinatura,20, 250, { align: "justify", maxWidth: 169 });
    
}

//Formatação das Evidências
function adicionarEvidencias(doc) {
    const evidencias = document.querySelectorAll(".image-box");
    var pageSpace = 0;
    var y = 0;
    var ambiente = 1;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");

    evidencias.forEach((evidencia) => {
        //Inclui apenas campos preenchidos
        if (evidencia.firstChild.src) {
            const img = evidencia.firstChild;

            //Define qual espaço será utilizado da página
            if (pageSpace == 0) {
                doc.addPage();
                y = 30;
                pageSpace++;
            } else {
                y = 150;
                pageSpace--;
            }

            const nomeVerificacao = evidencia.dataset.nomeVerificacao;
            doc.text(nomeVerificacao, 105, y, { align: "center" });

            //Caso seja multi ambiente imprimir qual é
            var multiAmbiente = false;

            global.baseDeDados[1].tabela.forEach(sistema => {
                if(sistema.id == sessionStorage.getItem("idSistema") && sistema.multiAmbiente == "TRUE"){
                    multiAmbiente = true;
                }
            });

            if (evidencia.dataset.multiAmbiente == "TRUE" && multiAmbiente == true) {
                const listaDeChildren = evidencia.parentElement.children;
                const label = listaDeChildren[ambiente].textContent;
                doc.text(label, 105, y + 5, { align: "center" });
                if (ambiente >= 5) {
                    ambiente = 1;
                } else {
                    ambiente += 2;
                }
            }

            adicionarImagem(doc, img, 20, y + 10, 170, 96);
        }
    });
}

//Adiciona as observações podendo adicionar páginas conforme o tamanho do texto
function adicionarObservacoes(doc, observacao) {
    var tamanho = observacao.length;
    var loop = 0
    do {
        doc.addPage();
        doc.text("Observações", 105, 30, { align: "center" });

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        const inicio = parseInt(3150 * loop);
        const fim = parseInt(inicio + 3150);
        console.log("Início: " + inicio + ", Fim: " + fim);
        const trecho = observacao.slice(inicio, fim);
        doc.text(trecho, 30, 40, { align: "justify", maxWidth: 149 });

        if(tamanho > 3150){
            tamanho -= 3150;
            loop++;
        }

    } while (tamanho > 3150);
}

//Função para adicionar o Cabeçalho e rodapé em todas as páginas
function adicionarCabecalhoRodape(doc) {
    const totalPaginas = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPaginas; i++) {
        //Ignorar capa
        if (i == 1) {
            continue;
        }

        doc.setPage(i);

        // Cabeçalho
        //Logo
        const img = document.getElementById("logo");
        adicionarImagem(doc, img, 20, 10, 30, 10);

        //Titulo
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor("#ed1923");
        doc.text("Relatório da GMUD", 105, 17, { align: "center" });

        //Data
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor("#000000");
        doc.text("Gerado em: " + diaDeHoje(false), 190, 17, { align: "right" });

        //Linha
        doc.line(20, 22, 190, 22, "S");

        // Rodapé com numeração de páginas
        doc.setFontSize(10);
        doc.text(`Página ${i - 1} de ${totalPaginas - 1}`, 190, 290, {
            align: "right",
        });
    }
}

//Função para converter imagem para Base64
function convertImageToBase64(img) {
    // Cria um canvas com as mesmas dimensões da imagem
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");

    // Desenha a imagem no canvas
    ctx.drawImage(img, 0, 0);

    // Converte o conteúdo do canvas para uma string Base64
    return canvas.toDataURL("image/png");
}

//Função para adicionar imagem a página
function adicionarImagem(doc, img, x, y, width, height) {
    const imgBase64 = convertImageToBase64(img);

    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const targetRatio = 16 / 9;

    // Caso a proporção for diferente de 16:9, ajustamos
    if(Math.abs(aspectRatio - targetRatio) > 0.01){
        
        if (aspectRatio > targetRatio) {
            // A imagem é mais "larga" que 16:9, ajustamos a largura e cortamos altura
            height = width / aspectRatio;
        } else {
            // A imagem é mais "alta" que 16:9, ajustamos a altura e cortamos largura
            width = height * aspectRatio;
        }
    }

    doc.addImage(imgBase64, "PNG", x, y, width, height, "", "FAST"); // 'FAST' mantém a qualidade
}

//Função para formatar o dia atual
function diaDeHoje(nomeArquivo){
    const agora = new Date();
    var data = "";
    var dia = agora.getDate().toString();
    if(dia.length == 1){
        dia = "0" + dia;
    }
    var mes = (agora.getMonth() + 1).toString();
    if(mes.length == 1){
        mes = "0" + mes;
    }

    const ano = agora.getFullYear();

    if(nomeArquivo == true){
        data = ano + "_" + mes + "_" + dia;
    }else{
        data = dia + "/" + mes + "/" + ano;
    }
    

    return data;
}