import { carregarCSV, processarCSV } from './modules/dataReader.js';
import { criarBotoesCSV } from './modules/dinamicHtml.js';

// URL do arquivo CSV
const urlCSV = "/data/data.csv";

// Executar as funções
(async () => {
  try {
    const conteudoCSV = await carregarCSV(urlCSV);
    const dados = processarCSV(conteudoCSV);
    criarBotoesCSV(dados, "botoes-container");
  } catch (erro) {
    console.error(`Erro: ${erro.message}`);
  }
})();