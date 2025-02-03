import { subirCSV } from "./modules/dataReader.js";
import { criarBotao } from "./modules/dinamicHtml.js";

// URL dos arquivos CSV
const CSVcliente = "/data/cliente.csv";
const CSVsistema = "/data/sistema.csv";
const CSVambiente = "/data/ambiente.csv";

// Executar as funções
(async () => {
    try {
        //Carregar, processar CSV e criar botões com base nas informações
        const dadosCliente = subirCSV(CSVcliente);
        //const dadosSistema = processarCSV(await carregarCSV(CSVsistema));
        //const dadosAmbiente = processarCSV(await carregarCSV(CSVambiente));
        criarBotao(dadosCliente, "botoesCliente");

    } catch (erro) {
        console.error(`Erro: ${erro.message}`);
    }
})();
