window.onload = function() {
    const botao = document.getElementById("meuBotao");
    botao.addEventListener("click", teste);
}

function teste(){
    alert("O botão foi clicado com sucesso!");
    console.log("Teste do botão concluído.");
}