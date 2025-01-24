import { carregarCSV, processarCSV } from './modules/dataReader.js';
import { criarBotoes } from './modules/dinamicHtml.js';

// URL do arquivo CSV
const urlCSV = "/data/data.csv";

// Executar as funções
(async () => {
  try {
    const conteudoCSV = await carregarCSV(urlCSV);
    const dados = processarCSV(conteudoCSV);
    criarBotoes(dados, "botoes-container");
  } catch (erro) {
    console.error(`Erro: ${erro.message}`);
  }
})();