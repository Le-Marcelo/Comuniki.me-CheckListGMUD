import { subirCSV } from "./modules/dataReader.js";
import { gerarEstrutura } from "./modules/structuregenerator.js";

// URL dos arquivos CSV
const CSVcliente = "/data/cliente.csv";
const CSVsistema = "/data/sistema.csv";
const CSVambiente = "/data/ambiente.csv";

// Executar as funções
(async () => {
    try {
        //Carregar, processar CSV e criar estrutura com base nas informações
        const tabelaCliente = subirCSV(CSVcliente);
        const tabelaSistema = subirCSV(CSVsistema);
        const tabelaAmbiente = subirCSV(CSVambiente);
        //Decidi criar um vetor de
        const baseDeDados = [
            { nome: "Cliente", tabela: tabelaCliente },     //0
            { nome: "Sistema", tabela: tabelaSistema },     //1
            { nome: "Ambiente", tabela: tabelaAmbiente },   //2
        ];
        gerarEstrutura(baseDeDados, "botoesCliente");
    } catch (erro) {
        console.error(`Erro: ${erro.message}`);
    }
})();
