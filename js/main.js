import { carregarCSV, processarCSV } from './modules/dataReader.js';
import { criarBotoesCSV } from './modules/dinamicHtml.js';

// URL dos arquivos CSV
const CSVcliente = "/data/cliente.csv";
const CSVsistema = "/data/sistema.csv";

// Executar as funções
(async () => {
  try {
    //Carregar, processar CSV e criar botões com base nas informações
    const dadosCliente = processarCSV(await carregarCSV(CSVcliente));
    const dadosSistema = processarCSV(await carregarCSV(CSVsistema));
    criarBotoesCSV(dadosCliente, "botoes-cliente");

    //EventListener para o modal fechar
    document.getElementById("closeModal").addEventListener("click", () => {
      document.getElementById("modal").style.display = "none";
    });

  } catch (erro) {
    console.error(`Erro: ${erro.message}`);
  }
})();