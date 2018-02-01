var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

// $(document).ready(function() substituida pelo atalho $(function() {....})
$(function () {

    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

//bloco de código responsável por atualizar o tamanho da frase, vamos envolver numa função de mesmo nome
function atualizaTamanhoFrase() {

    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

//inicializa contadores
function inicializaContadores() {

    campo.on("input", function () {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);

    });
}

//inicializa o cronometro para marcar o tempo

function inicializaCronometro() {

    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () {
        $("#botao-reiniciar").attr("disabled", true);
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if (tempoRestante < 1) {
                campo.attr("disabled", true);
                clearInterval(cronometroID);
                campo.toggleClass("campo-desativado");
                inserePlacar();
                $("#botao-reiniciar").attr("disabled", false);
            }

        }, 1000);
    });
}

//reiniciar jogo
function reiniciaJogo() {

    campo.attr("disabled", false);
    campo.val("");
    $("#contador-caracteres").text("0");
    $("#contador-palavras").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");

}

function inicializaMarcadores() {

    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        if (frase.startsWith(digitado)) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        }
        else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

$(".botao-remover").click(event, function () {
    event.preventDefault();
    $(this).parent().parent().remove();
})