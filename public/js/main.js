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
                // campo.css("background-color", "lightgray"); //novo
                // campo.addClass("campo-desativado");
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
    // campo.removeClass("campo-desativado");
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");

}

function inicializaMarcadores() {

    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        // var comparavel = frase.substr(0, digitado.length);

        // if (digitado == comparavel) {
        //     campo.addClass("borda-verde");
        //     campo.removeClass("borda-vermelha");
        // }
        // else {
        //     campo.addClass("borda-vermelha");
        //     campo.removeClass("borda-verde");
        // }


        //var digitouCorreto = frase.startsWith(digitado);
        // if (digitouCorreto) {
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

function inserePlacar() {
    // var placar = $(".placar");
    // var corpoTabela = placar.find("tbody");
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Silvia";
    var numPalavras = $("#contador-palavras").text();
    // var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";

    // criaçao de linha -> esse bloco vai ser substituido pela funcao novaLinha
    // var linha = "<tr>" +
    //                     "<td>" + usuario + "</td>" +
    //                     "<td>" + numPalavras + "</td>" +
    //                     "<td>" + botaoRemover + "</td>" +
    //               "<tr>";

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);
    corpoTabela.append(linha);
    // corpoTabela.prepend(linha);

}


function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href", "#").addClass("botao-remover");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    //icone dentro do <a>
    link.append(icone);

    //<a> dentro do <td>
    colunaRemover.append(link);

    //os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    $(this).parent().parent().remove();
}


// $(".botao-remover").click(function (event) {
// $(".botao-remover").click(function (event) {
$(".botao-remover").click(event, function () {
    event.preventDefault();
    $(this).parent().parent().remove();
})