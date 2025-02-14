import { subirCSV } from "./modules/dataReader.js";
import { montarPDF } from "./modules/pdfGenerator.js";
import { gerarEstrutura } from "./modules/structureGenerator.js";

// URL dos arquivos CSV
const CSVcliente = "/data/cliente.csv";
const CSVsistema = "/data/sistema.csv";
const CSVambiente = "/data/ambiente.csv";
const CSVverificacoes = "/data/verificacoes.csv";

// Executar as funções
(async () => {
    try {
        //Detectar qual página esta carregada
        const caminho = window.location.pathname;
        const arquivo = caminho.substring(caminho.lastIndexOf("/") + 1);

        switch(arquivo){
            //MainPage
            case "":
                //Carregar, processar CSV e criar estrutura com base nas informações
                const tabelaCliente = subirCSV(CSVcliente);
                const tabelaSistema = subirCSV(CSVsistema);
                const tabelaAmbiente = subirCSV(CSVambiente); 

                //Decidi criar um vetor das tabelas para simular a base de dados
                const baseDeDados = [
                    { nome: "Cliente", tabela: tabelaCliente },     //0
                    { nome: "Sistema", tabela: tabelaSistema },     //1
                    { nome: "Ambiente", tabela: tabelaAmbiente },   //2
                ];
                gerarEstrutura(baseDeDados, "botoesCliente");
                break;
            
            //GerarRelatorio    
            case "gerarRelatorio.html":
                //Carregar, processar CSV e criar estrutura com base nas informações
                const tabelaVerificacoes = subirCSV(CSVverificacoes);

                const { jsPDF } = window.jspdf;
                montarPDF(tabelaVerificacoes, jsPDF);
                break;
        }
        
    } catch (erro) {
        console.error(`Erro: ${erro.message}`);
    }
})();
