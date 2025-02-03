// Função para carregar o CSV do servidor
export async function carregarCSV(url) {
    const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error(
            `Erro ao carregar o arquivo CSV: ${resposta.statusText}`
        );
    }
    return await resposta.text();
}

// Função para processar o CSV e convertê-lo em um array de objetos
export function processarCSV(csv) {
    const linhas = csv
        .split("\n")
        .map((linha) => linha.trim())
        .filter((linha) => linha !== "");
    const cabecalhos = linhas[0].split(",");
    return linhas.slice(1).map((linha) => {
        const valores = linha.split(",");
        return cabecalhos.reduce((obj, cabecalho, index) => {
            obj[cabecalho] = valores[index];
            return obj;
        }, {});
    });
}

//TODO: Fundir ambas funções em uma? Ou pelo menos utiliza apenas uma na Main
export async function subirCSV(url) {
  const resposta = await fetch(url);
    if (!resposta.ok) {
        throw new Error(
            `Erro ao carregar o arquivo CSV: ${resposta.statusText}`
        );
    }
    const csv = resposta.text();

    const linhas = csv
        .split("\n")
        .map((linha) => linha.trim())
        .filter((linha) => linha !== "");
    const cabecalhos = linhas[0].split(",");
    return linhas.slice(1).map((linha) => {
        const valores = linha.split(",");
        return cabecalhos.reduce((obj, cabecalho, index) => {
            obj[cabecalho] = valores[index];
            return obj;
        }, {});
    });
}
