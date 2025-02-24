const global = { jsPDF: null };

export async function setPDFGen(jsPDF) {
    global.jsPDF = jsPDF;
    setBotao();
}

function setBotao() {
    const botao = document.getElementById("gerarPDF");
    botao.addEventListener("click", function () {
        gerarPDF();
    });
}

function gerarPDF() {
    const doc = new global.jsPDF();

    //Adiciona a primeira página sendo a "capa"
    adicionarCapa(doc);

    //Adiciona o conteúdo principal ao PDF
    adicionarEvidencias(doc);

    //Adiciona as observações finais
    adicionarObservacoes(doc);

    // Adicionar cabeçalho e rodapé
    adicionarCabecalhoRodape(doc);

    // Salvar o PDF
    doc.save("teste.pdf");
}

function adicionarCapa(doc) {
    const img = document.getElementById("logo");
    adicionarImagem(doc, img, 60, 50, 90, 30);

    doc.line(20, 85, 190, 85, "S");

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#000000");
    doc.text("Pós Atividade", 105, 100, { align: "center" });

    doc.setFontSize(16);
    doc.text("Autor do Documento:", 20, 190);

    const nomeAutor = document.getElementById("nomeCompleto").value;
    doc.setFont("helvetica", "normal");
    doc.text(nomeAutor, 80, 190);

    doc.setFont("helvetica", "bold");
    doc.text("Data do Documento:", 20, 200);

    const agora = new Date();
    const data =
        agora.getDate() +
        "/" +
        (agora.getMonth() + 1) +
        "/" +
        agora.getFullYear();
    doc.setFont("helvetica", "normal");
    doc.text(data, 78, 200);
}

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
            if (evidencia.dataset.multiAmbiente == "TRUE") {
                const listaDeChildren = evidencia.parentElement.children;
                const label = listaDeChildren[ambiente].textContent;
                doc.text(label, 105, (y + 5), { align: "center" });
                if(ambiente >= 5){
                    ambiente = 1;
                }else{
                    ambiente += 2;
                }
            }

            adicionarImagem(doc, img, 20, (y + 10), 170, 96);

        }
    });
}

function adicionarObservacoes(doc) {
    doc.addPage();
    doc.text("Observações", 105, 30, {align: "center"});

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const observacao = document.getElementById("observacoes").value;
    doc.text(observacao,20, 40, {align: "justify", maxWidth: 169});
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
        const agora = new Date();
        const data =
            agora.getDate() +
            "/" +
            (agora.getMonth() + 1) +
            "/" +
            agora.getFullYear();
        doc.text("Gerado em: " + data, 190, 17, { align: "right" });

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
    doc.addImage(imgBase64, "PNG", x, y, width, height, "", "FAST"); // 'FAST' mantém a qualidade
}
